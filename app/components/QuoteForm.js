"use client";

import { useState } from "react";
import { serviceCategories } from "../serviceData";
import ArrowIcon from "./ArrowIcon";

export default function QuoteForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [servicesOpen, setServicesOpen] = useState(false);

  function toggleService(title) {
    setSelectedServices((current) => (
      current.includes(title)
        ? current.filter((service) => service !== title)
        : [...current, title]
    ));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setError("");

    if (selectedServices.length === 0) {
      setError("Please select at least one service.");
      setStatus("error");
      setServicesOpen(true);
      return;
    }

    const form = event.currentTarget;
    const data = {
      ...Object.fromEntries(new FormData(form)),
      services: selectedServices,
    };

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
      setSelectedServices([]);
      setServicesOpen(false);
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
      <div className="quote-service-field">
        <span className="quote-field-label">How can we help?</span>
        <button
          className={`quote-service-trigger${servicesOpen ? " is-open" : ""}`}
          type="button"
          aria-expanded={servicesOpen}
          aria-controls="quote-service-options"
          onClick={() => setServicesOpen((open) => !open)}
        >
          <span>
            {selectedServices.length === 0
              ? "Select one or more services"
              : selectedServices.length <= 2
                ? selectedServices.join(", ")
                : `${selectedServices.length} services selected`}
          </span>
          <span className="quote-service-chevron" aria-hidden="true" />
        </button>
        <div className="quote-service-options" id="quote-service-options" hidden={!servicesOpen}>
          {[...serviceCategories, { number: "other", title: "Something else" }].map((service) => (
            <label className="quote-service-option" key={service.number}>
              <input
                name="services"
                type="checkbox"
                value={service.title}
                checked={selectedServices.includes(service.title)}
                onChange={() => toggleService(service.title)}
              />
              <span className="quote-checkbox" aria-hidden="true" />
              <span>{service.title}</span>
            </label>
          ))}
          <button className="quote-service-done" type="button" onClick={() => setServicesOpen(false)}>
            Done
          </button>
        </div>
      </div>
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
