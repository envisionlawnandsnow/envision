import Link from "next/link";
import { company, reviews } from "../company";
import MobileNav from "../components/MobileNav";

export const metadata = {
  title: "Customer Reviews",
  description: `See why customers rate ${company.name} 5 stars on Google.`,
};

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function LeafMark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path d="M33 6C18 7 8 15 8 27c0 4 3 7 7 7 12 0 19-13 18-28Z" />
      <path d="M8 34c5-9 11-15 20-21" />
    </svg>
  );
}

export default function ReviewsPage() {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    name: company.name,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "2118 240th Ave",
      addressLocality: "Luck",
      addressRegion: "WI",
      postalCode: "54853",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: company.googleRating,
      reviewCount: company.googleReviewCount,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
      <header className="site-header">
        <Link className="brand" href="/" aria-label={`${company.name} home`}>
          <LeafMark />
          <span>{company.shortName}</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/#services">Services</Link>
          <Link href="/#about">Our approach</Link>
          <Link href="/#work">Our work</Link>
          <Link className="active" href="/reviews">Reviews</Link>
        </nav>
        <Link className="header-cta" href="/#contact">Request a quote <ArrowIcon /></Link>
        <MobileNav />
      </header>

      <section className="reviews-hero">
        <div>
          <p className="eyebrow"><span /> Customer reviews</p>
          <h1>Good work<br /><em>gets noticed.</em></h1>
        </div>
        <p>
          We are proud to earn the trust of the people we serve. See what customers have to say about working with Envision LawnCare.
        </p>
      </section>

      <section className="reviews-content">
        <div className="rating-banner">
          <div className="rating-score">
            <strong>{company.googleRating}</strong>
            <div>
              <span className="rating-stars" aria-label="5 out of 5 stars">★★★★★</span>
              <p>{company.googleReviewCount} reviews on <b>Google</b></p>
            </div>
          </div>
          <a
            className="button button-dark"
            href={company.googleUrl}
            target="_blank"
            rel="noreferrer"
          >
            Review us on Google <ArrowIcon />
          </a>
        </div>

        {reviews.length > 0 ? (
          <div className="reviews-grid">
            {reviews.map((review) => (
              <article className="review-card" key={`${review.name}-${review.date}`}>
                <header>
                  <span className="review-avatar" aria-hidden="true">{review.name.charAt(0)}</span>
                  <div><h2>{review.name}</h2><p>{review.date}</p></div>
                </header>
                <div className="card-stars" aria-label={`${review.rating} out of 5 stars`}>
                  {"★".repeat(review.rating)}
                </div>
                <blockquote>{review.text}</blockquote>
                <div className="review-meta">
                  {review.priceAssessment && (
                    <p><span>Price assessment</span>{review.priceAssessment}</p>
                  )}
                  {review.services && (
                    <p><span>Services</span>{review.services}</p>
                  )}
                </div>
                <a href={company.googleUrl} target="_blank" rel="noreferrer">View on Google <ArrowIcon /></a>
              </article>
            ))}
          </div>
        ) : (
          <div className="reviews-empty">
            <p className="eyebrow"><span /> Real feedback</p>
            <h2>Read all {company.googleReviewCount} customer reviews on Google.</h2>
            <p>Selected customer stories will be added here soon. In the meantime, visit our live Google profile for every verified review.</p>
            <a href={company.googleUrl} target="_blank" rel="noreferrer">See customer reviews <ArrowIcon /></a>
          </div>
        )}
      </section>

      <section className="reviews-cta">
        <p className="eyebrow eyebrow-light"><span /> Ready when you are</p>
        <h2>Put five-star care<br /><em>to work for you.</em></h2>
        <Link className="button review-quote-button" href="/#contact">Get a free quote <ArrowIcon /></Link>
      </section>

      <footer>
        <div className="footer-main">
          <Link className="brand footer-brand" href="/"><LeafMark /><span>{company.shortName}</span></Link>
          <p>Reliable lawn care.<br />Done right, every visit.</p>
          <div className="footer-links">
            <Link href="/#services">Services</Link>
            <Link href="/#about">Our approach</Link>
            <Link href="/#work">Our work</Link>
            <Link href="/reviews">Reviews</Link>
            <Link href="/#contact">Request a quote</Link>
            <a href={company.facebookUrl} target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {company.name} All rights reserved.</p>
          <p>Serving {company.serviceArea}</p>
          <Link href="/">Home ↑</Link>
        </div>
      </footer>
    </main>
  );
}
