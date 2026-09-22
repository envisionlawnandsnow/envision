import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const RATE_LIMIT = 2;
const RATE_LIMIT_WINDOW_SECONDS = 24 * 60 * 60;

const reserveSlotScript = `
  local current = tonumber(redis.call("GET", KEYS[1]) or "0")
  local limit = tonumber(ARGV[1])

  if current >= limit then
    return {0, current, redis.call("TTL", KEYS[1])}
  end

  current = redis.call("INCR", KEYS[1])
  if current == 1 then
    redis.call("EXPIRE", KEYS[1], ARGV[2])
  end

  return {1, current, redis.call("TTL", KEYS[1])}
`;

const releaseSlotScript = `
  local current = tonumber(redis.call("GET", KEYS[1]) or "0")
  if current <= 1 then
    return redis.call("DEL", KEYS[1])
  end
  return redis.call("DECR", KEYS[1])
`;

const services = new Set([
  "Recurring lawn care",
  "Landscaping",
  "Snow removal",
  "Something else",
]);

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);
}

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return request.headers.get("x-real-ip") || forwarded?.split(",")[0]?.trim() || "unknown";
}

async function releaseRateLimitSlot(redis, key) {
  try {
    await redis.eval(releaseSlotScript, [key], []);
  } catch {
    console.error("Could not release a failed quote request rate-limit slot.");
  }
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots commonly fill hidden fields. Return success without sending an email.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const validName = name.length >= 2 && name.length <= 100 && !/[\r\n]/.test(name);
  const validPhone = /^[0-9+().\-\s]{7,30}$/.test(phone);
  const validEmail = email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validService = services.has(service);
  const validMessage = message.length <= 2000;

  if (!validName || !validPhone || !validEmail || !validService || !validMessage) {
    return NextResponse.json(
      { error: "Please check your information and try again." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.QUOTE_RECIPIENT_EMAIL;
  const sender = process.env.QUOTE_FROM_EMAIL;
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!apiKey || !recipient || !sender || !redisUrl || !redisToken) {
    console.error("Quote form environment variables are not configured.");
    return NextResponse.json(
      { error: "Quote requests are temporarily unavailable. Please call us instead." },
      { status: 503 },
    );
  }

  const redis = new Redis({ url: redisUrl, token: redisToken });
  const clientIp = getClientIp(request);
  const ipHash = createHmac("sha256", apiKey).update(clientIp).digest("hex");
  const rateLimitKey = `quote-rate:${ipHash}`;
  let rateLimitResult;

  try {
    rateLimitResult = await redis.eval(
      reserveSlotScript,
      [rateLimitKey],
      [RATE_LIMIT, RATE_LIMIT_WINDOW_SECONDS],
    );
  } catch {
    console.error("Upstash could not be reached while checking the quote rate limit.");
    return NextResponse.json(
      { error: "Quote requests are temporarily unavailable. Please call us instead." },
      { status: 503 },
    );
  }

  const [allowed, , ttl] = rateLimitResult.map(Number);

  if (!allowed) {
    const retryAfter = Math.max(ttl, 1);
    return NextResponse.json(
      {
        error: `You’ve reached today’s quote request limit. Please try again tomorrow or call us at (715) 419-9504.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      },
    );
  }

  const safe = {
    name: escapeHtml(name),
    phone: escapeHtml(phone),
    email: escapeHtml(email),
    service: escapeHtml(service),
    message: escapeHtml(message).replace(/\n/g, "<br />"),
  };

  let response;

  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: recipient,
        reply_to: email,
        subject: `New website quote request: ${service}`,
        text: [
          "New quote request from the Envision LawnCare website",
          "",
          `Name: ${name}`,
          `Phone: ${phone}`,
          `Email: ${email}`,
          `Service: ${service}`,
          `Message: ${message || "No additional details provided."}`,
        ].join("\n"),
        html: `
          <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6; max-width: 620px; margin: 0 auto;">
            <div style="background: #c82026; color: #fff; padding: 20px 24px;">
              <h1 style="font-size: 22px; margin: 0;">New quote request</h1>
              <p style="margin: 4px 0 0;">Envision LawnCare website</p>
            </div>
            <div style="border: 1px solid #ddd; border-top: 0; padding: 24px;">
              <p><strong>Name:</strong> ${safe.name}</p>
              <p><strong>Phone:</strong> <a href="tel:${safe.phone}">${safe.phone}</a></p>
              <p><strong>Email:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
              <p><strong>Service:</strong> ${safe.service}</p>
              <p><strong>Property details:</strong><br />${safe.message || "No additional details provided."}</p>
            </div>
          </div>
        `,
      }),
    });
  } catch {
    await releaseRateLimitSlot(redis, rateLimitKey);
    console.error("Resend could not be reached while sending a quote email.");
    return NextResponse.json(
      { error: "We could not send your request. Please try again or call us directly." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    await releaseRateLimitSlot(redis, rateLimitKey);
    console.error(`Resend rejected quote email with status ${response.status}.`);
    return NextResponse.json(
      { error: "We could not send your request. Please try again or call us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
