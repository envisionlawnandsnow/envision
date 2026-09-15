"use client";

import { useState } from "react";

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span>Request received</span>
        <h3>Thank you. We’ll be in touch shortly.</h3>
        <p>
          This is currently a demonstration form. Connect it to your preferred
          form provider before launch to receive submissions.
        </p>
        <button type="button" className="text-button" onClick={() => setSubmitted(false)}>
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
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
          <option>Seasonal cleanup</option>
          <option>Property upkeep</option>
          <option>Something else</option>
        </select>
      </label>
      <label>
          <span>Tell us about your property <em>Optional</em></span>
        <textarea name="message" rows="3" placeholder="Property size, timing, access, or anything else we should know..." />
      </label>
      <button className="button button-light form-submit" type="submit">
        Request my quote <span aria-hidden="true">↗</span>
      </button>
      <p className="form-note">No pressure, no obligation. We typically reply within one business day.</p>
    </form>
  );
}
