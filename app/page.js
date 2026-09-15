import { company, services } from "./company";
import MobileNav from "./components/MobileNav";
import QuoteForm from "./components/QuoteForm";

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

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={`${company.name} home`}>
          <LeafMark />
          <span>{company.shortName}</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#about">Our approach</a>
          <a href="#work">Our work</a>
          <a href="/reviews">Reviews</a>
        </nav>
        <a className="header-cta" href="#contact">Request a quote <ArrowIcon /></a>
        <MobileNav />
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Lawn & property care</p>
          <h1>More time<br /><em>enjoying it.</em><br />Less time mowing.</h1>
          <p className="hero-intro">
            Straightforward, dependable lawn care that keeps your property ready to enjoy.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#contact">Get a free quote <ArrowIcon /></a>
            <a className="text-link" href={`tel:${company.phoneHref}`}>or call {company.phone}</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image" role="img" aria-label="Beautifully maintained green lawn beside a modern home" />
          <div className="availability-card">
            <span className="status-dot" />
            <p><strong>Now booking</strong><br />Weekly service in {company.city}</p>
          </div>
          <p className="image-caption">Dependable lawn care in Luck, Wisconsin</p>
        </div>
        <p className="hero-index">LUCK,<br />WI</p>
      </section>

      <section className="trust-strip" aria-label="Company qualities">
        <p>Locally owned</p><span>/</span>
        <p>Consistent scheduling</p><span>/</span>
        <p>Careful, complete work</p><span>/</span>
        <p>5-star reviewed</p>
      </section>

      <section className="services section-pad" id="services">
        <div className="section-heading">
          <p className="eyebrow"><span /> What we do</p>
          <h2>Keep it green.<br /><em>Lose the chores.</em></h2>
        </div>
        <p className="section-lead">
          We handle the mowing, trimming, and cleanup so your property stays sharp without taking time out of your week.
        </p>
        <div className="service-list">
          {services.map((service) => (
            <article className="service-item" key={service.number}>
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a href="#contact" aria-label={`Ask about ${service.title}`}><ArrowIcon /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="approach" id="about">
        <div className="approach-image" role="img" aria-label="Lawn care professional creating a precise edge" />
        <div className="approach-copy">
          <p className="eyebrow eyebrow-light"><span /> The Envision standard</p>
          <h2>Hard-working care.<br /><em>No fuss.</em></h2>
          <p>
            Good lawn care takes more than a quick pass with a mower. We pay attention to the edges, obstacles, cleanup, and details that finish the job.
          </p>
          <div className="principles">
            <div><strong>01</strong><span><b>We show up</b>Clear schedules and a heads-up when weather gets in the way.</span></div>
            <div><strong>02</strong><span><b>A complete finish</b>Trees, fences, beds, edges, and hard surfaces all get proper attention.</span></div>
            <div><strong>03</strong><span><b>Local and straightforward</b>Honest work, clear pricing, and no complicated contracts.</span></div>
          </div>
        </div>
      </section>

      <section className="work section-pad" id="work">
        <div className="work-intro">
          <p className="eyebrow"><span /> In the field</p>
          <h2>Good work.<br /><em>Out in the open.</em></h2>
          <p>A look at the equipment, effort, and reliable work behind every visit.</p>
        </div>
        <div className="video-placeholder">
          <div className="video-shade" />
          <div className="play-mark" aria-hidden="true"><span>▶</span></div>
          <div className="video-label">
            <span>Featured film</span>
            <p>See Envision LawnCare in action</p>
          </div>
          <p className="coming-soon">Company film coming soon</p>
        </div>
      </section>

      <section className="testimonial section-pad" aria-labelledby="reviews-title">
        <p className="eyebrow review-eyebrow"><span /> Trusted locally</p>
        <div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
        <h2 id="reviews-title">Five-star service,<br /><em>according to our customers.</em></h2>
        <p className="review-summary">
          <strong>{company.googleRating} rating</strong> from {company.googleReviewCount} Google reviews
        </p>
        <a
          className="button button-dark review-link"
          href={company.googleUrl}
          target="_blank"
          rel="noreferrer"
        >
          Read our Google reviews <ArrowIcon />
        </a>
        <p className="testimonial-count">Google reviews</p>
      </section>

      <section className="contact" id="contact">
        <div className="contact-copy">
          <p className="eyebrow eyebrow-light"><span /> Start a conversation</p>
          <h2>Let’s get your<br />property <em>handled.</em></h2>
          <p>Tell us where the property is and what needs doing. We’ll follow up, take a look, and give you a clear quote.</p>
          <div className="contact-details">
            <a href={`tel:${company.phoneHref}`}><small>Call</small>{company.phone}</a>
            <a href={company.googleUrl} target="_blank" rel="noreferrer"><small>Address</small>{company.address}</a>
            <div><small>Serving</small>{company.serviceArea}</div>
          </div>
        </div>
        <QuoteForm />
      </section>

      <footer>
        <div className="footer-main">
          <a className="brand footer-brand" href="#top"><LeafMark /><span>{company.shortName}</span></a>
          <p>Reliable lawn care.<br />Done right, every visit.</p>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#about">Our approach</a>
            <a href="#work">Our work</a>
            <a href="/reviews">Reviews</a>
            <a href="#contact">Request a quote</a>
            <a href={company.facebookUrl} target="_blank" rel="noreferrer">Facebook</a>
            <a href={company.googleUrl} target="_blank" rel="noreferrer">Google reviews</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {company.name} All rights reserved.</p>
          <p>Serving {company.serviceArea}</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
