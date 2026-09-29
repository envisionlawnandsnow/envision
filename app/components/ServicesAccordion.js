"use client";

import { useState } from "react";
import ArrowIcon from "./ArrowIcon";

export default function ServicesAccordion({ services }) {
  const [openService, setOpenService] = useState(0);

  return (
    <div className="service-list">
      {services.map((service, index) => {
        const isOpen = openService === index;
        const panelId = `service-panel-${index}`;

        return (
          <article className={`service-item${isOpen ? " is-open" : ""}`} key={service.number}>
            <button
              className="service-trigger"
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenService(isOpen ? null : index)}
            >
              <span className="service-title">{service.title}</span>
              <span className="service-toggle" aria-hidden="true"><span /><span /></span>
            </button>
            <div
              className="service-panel"
              id={panelId}
              aria-hidden={!isOpen}
              inert={!isOpen}
            >
              <div className="service-panel-inner">
                <div className="service-panel-content">
                  <ul>
                    {service.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <a href="#contact">
                    Ask about {service.title} <ArrowIcon />
                  </a>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
