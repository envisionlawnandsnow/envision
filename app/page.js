import Image from "next/image";
import { company, reviews, services } from "./company";
import ArrowIcon from "./components/ArrowIcon";
import Brand from "./components/Brand";
import MobileNav from "./components/MobileNav";
import QuoteForm from "./components/QuoteForm";
import VideoShowcase from "./components/VideoShowcase";

const projects = [
  { src: "/images/lakeside-patio.jpeg", alt: "Completed lakeside patio and restored lawn", label: "Lakeside patio" },
  { src: "/images/finished-patio-cropped.jpeg", alt: "Finished paver patio beside a home", label: "Paver installation" },
  { src: "/images/landscape-steps-cropped.jpeg", alt: "Landscaped hillside with stone steps and fresh mulch", label: "Landscape refresh" },
  { src: "/images/property-clearing.jpeg", alt: "Envision operator clearing a tree with compact equipment", label: "Property clearing" },
  { src: "/images/lakeside-lawn.jpeg", alt: "Maintained lawn overlooking a Wisconsin lake", label: "Lawn care" },
  { src: "/images/mulch-bed.jpeg", alt: "Freshly mulched landscape bed with stone edging", label: "Mulch and bed care" },
  { src: "/images/flower-bed.jpeg", alt: "Maintained flower bed along a front walkway", label: "Landscape maintenance" },
  { src: "/images/cleared-walkway-night.jpeg", alt: "Walkway cleared after a heavy overnight snowfall", label: "Walkway clearing" },
  { src: "/images/plowed-driveway.jpeg", alt: "Residential driveway cleared after snowfall", label: "Driveway plowing" },
  { src: "/images/winter-driveway.jpeg", alt: "Long residential driveway cleared through deep snow", label: "Residential snow removal" },
  { src: "/images/cleared-walkway.jpeg", alt: "Cleared walkway alongside a home in winter", label: "Sidewalk clearing" },
  { src: "/images/snow-blower.jpeg", alt: "Envision team member clearing snow with a snow blower", label: "Detailed snow clearing" },
  { src: "/images/truck-plowing.jpeg", alt: "Plow truck clearing a snow-covered property", label: "Snow plowing" },
  { src: "/images/loader-snow-removal.jpeg", alt: "Loader moving deep snow from a large driveway", label: "Heavy snow removal" },
  { src: "/images/ice-control.jpeg", alt: "Ice control treatment being applied to a driveway", label: "Ice control" },
  { src: "/images/envision-truck-lawn.jpeg", alt: "Envision LawnCare truck and mowers beside a striped lawn", label: "Local and equipped" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={`${company.name} home`}>
          <Brand />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#about">Our approach</a>
          <a href="#work">Our work</a>
          <a href="#reviews">Reviews</a>
        </nav>
        <a className="header-cta" href="#contact">Request a quote <ArrowIcon /></a>
        <MobileNav />
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Year-round grounds maintenance</p>
          <h1>Property care.<br /><em>Every season.</em><br />One trusted team.</h1>
          <p className="hero-intro">
            Professional lawn care, landscaping, and snow and ice management for homes and businesses across Polk County.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#contact">Get a free quote <ArrowIcon /></a>
            <a className="text-link" href="#services">Explore our services</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image">
            <div className="hero-image-panel hero-image-main">
              <Image
                src="/images/envision-truck-lawn.jpeg"
                alt="Envision LawnCare truck beside a freshly striped lawn"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 38vw"
              />
              <span>Lawn care</span>
            </div>
            <div className="hero-image-panel">
              <Image
                src="/images/landscape-steps-cropped.jpeg"
                alt="Completed landscape installation with stone steps"
                fill
                priority
                sizes="(max-width: 900px) 50vw, 18vw"
              />
              <span>Landscaping</span>
            </div>
            <div className="hero-image-panel">
              <Image
                src="/images/truck-plowing.jpeg"
                alt="Snow plow clearing a customer property"
                fill
                priority
                sizes="(max-width: 900px) 50vw, 18vw"
              />
              <span>Snow removal</span>
            </div>
          </div>
          <div className="availability-card">
            <span className="status-dot" />
            <p><strong>Now booking</strong><br />Lawn, landscape & snow services</p>
          </div>
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
          <h2>Every season.<br /><em>Handled.</em></h2>
        </div>
        <p className="section-lead">
          From summer mowing and landscape projects to winter snow removal, we keep your property ready without taking time out of your week.
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
        <div className="approach-image">
          <Image
            src="/images/patio-installation.jpeg"
            alt="Envision LawnCare installing a custom stone patio"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
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
        <VideoShowcase />
      </section>

      <section className="project-gallery" aria-labelledby="project-gallery-title">
        <div className="gallery-heading">
          <p className="eyebrow eyebrow-light"><span /> Recent projects</p>
          <h2 id="project-gallery-title">Work that speaks<br /><em>for itself.</em></h2>
          <p>Real properties. Real results. A look at some of the work completed by Envision LawnCare.</p>
        </div>
        <div className="gallery-grid">
          {projects.map((project) => (
            <figure className="gallery-item" key={project.src}>
              <Image src={project.src} alt={project.alt} fill sizes="(max-width: 700px) 100vw, 50vw" />
              <figcaption>{project.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="home-reviews section-pad" id="reviews" aria-labelledby="reviews-title">
        <div className="home-reviews-heading">
          <div>
            <p className="eyebrow"><span /> Trusted locally</p>
            <h2 id="reviews-title">Five-star service,<br /><em>in their own words.</em></h2>
          </div>
          <p>Real feedback from customers who trusted Envision LawnCare with their properties.</p>
        </div>
        <div className="rating-banner">
          <div className="rating-score">
            <strong>{company.googleRating}</strong>
            <div>
              <span className="rating-stars" aria-label="5 out of 5 stars">★★★★★</span>
              <p>{company.googleReviewCount} reviews on <b>Google</b></p>
            </div>
          </div>
          <a className="button button-dark" href={company.googleUrl} target="_blank" rel="noreferrer">
            Review us on Google <ArrowIcon />
          </a>
        </div>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <article className="review-card" key={`${review.name}-${review.date}`}>
              <header>
                <span className="review-avatar" aria-hidden="true">{review.name.charAt(0)}</span>
                <div><h3>{review.name}</h3><p>{review.date}</p></div>
              </header>
              <div className="card-stars" aria-label={`${review.rating} out of 5 stars`}>
                {"★".repeat(review.rating)}
              </div>
              <blockquote>{review.text}</blockquote>
              <div className="review-meta">
                {review.priceAssessment && <p><span>Price assessment</span>{review.priceAssessment}</p>}
                {review.services && <p><span>Services</span>{review.services}</p>}
              </div>
              <a href={company.googleUrl} target="_blank" rel="noreferrer">View on Google <ArrowIcon /></a>
            </article>
          ))}
        </div>
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
          <a className="brand footer-brand" href="#top" aria-label={`${company.name} home`}><Brand footer /></a>
          <p>Reliable lawn care.<br />Done right, every visit.</p>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#about">Our approach</a>
            <a href="#work">Our work</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Request a quote</a>
            <a href={company.facebookUrl} target="_blank" rel="noreferrer">Facebook</a>
            <a href={company.googleUrl} target="_blank" rel="noreferrer">Google reviews</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {company.name} All rights reserved.</p>
          <p>Serving {company.serviceArea}</p>
          <a className="back-to-top" href="#top">Back to top <ArrowIcon direction="up" /></a>
        </div>
      </footer>
    </main>
  );
}
