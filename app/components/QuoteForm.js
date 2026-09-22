"use client";

import { useState } from "react";
import ArrowIcon from "./ArrowIcon";

export default function QuoteForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "We could not send your request.");
      }

      form.reset();
      setStatus("success");
    } catch (submissionError) {
      setError(submissionError.message || "We could not send your request. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <span>Request received</span>
        <h3>Thank you. We’ll be in touch shortly.</h3>
        <p>
          Your quote request has been sent to Envision LawnCare. We typically
          reply within one business day.
        </p>
        <button type="button" className="text-button" onClick={() => setStatus("idle")}>
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit} aria-busy={status === "submitting"}>
      <label className="form-honeypot" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex="-1" autoComplete="off" />
      </label>
      <div className="field-row">
        <label>
          <span>Your name</span>
          <input name="name" type="text" placeholder="Jane Smith" autoComplete="name" required />
        </label>
        <label>
          <span>Phone number</span>
          <input name="phone" type="tel" placeholder="(555) 000-0000" autoComplete="tel" required />
        </label>
      </div>
      <label>
        <span>Email address</span>
        <input name="email" type="email" placeholder="jane@example.com" autoComplete="email" required />
      </label>
      <label>
        <span>How can we help?</span>
        <select name="service" defaultValue="" required>
          <option value="" disabled>Select a service</option>
          <option>Recurring lawn care</option>
          <option>Landscaping</option>
          <option>Snow removal</option>
          <option>Something else</option>
        </select>
      </label>
      <label>
          <span>Tell us about your property <em>Optional</em></span>
        <textarea name="message" rows="3" placeholder="Property size, timing, access, or anything else we should know..." />
      </label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-light form-submit" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending request..." : "Request my quote"} <ArrowIcon />
      </button>
      <p className="form-note">No pressure, no obligation. We typically reply within one business day.</p>
    </form>
  );
}
