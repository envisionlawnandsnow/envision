"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
      </button>
      <div className={`mobile-menu ${open ? "is-open" : ""}`} id="mobile-menu">
        <nav aria-label="Mobile navigation">
          <Link href="/#services" onClick={close}>Services</Link>
          <Link href="/#about" onClick={close}>Our approach</Link>
          <Link href="/#work" onClick={close}>Our work</Link>
          <Link href="/reviews" onClick={close}>Reviews</Link>
          <Link href="/#contact" onClick={close}>Request a quote</Link>
        </nav>
        <p>Reliable care. A better-looking lawn.</p>
      </div>
    </>
  );
}
