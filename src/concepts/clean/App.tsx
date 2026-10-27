import { useEffect, useState } from 'react';
import { siteConfig, ctaHref } from '../../content/config';
import { services, approach } from '../../content/services';
import { caseStudies, headlineMetric } from '../../content/caseStudies';
import { brand } from '../../content/media';
import { ReviewRibbon, ReviewPill } from '../../components/ReviewChrome';
import { ResponsiveMedia } from '../../components/ResponsiveMedia';
import { SourceLink, MetricInline, ProofNote } from '../../components/CaseStudyProof';
import { SocialLinks } from '../../components/SocialLinks';
import { SkipLink } from '../../components/SkipLink';
import { ServiceGlyph } from './ServiceGlyph';

const nav = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#approach', label: 'Approach' },
  { href: '#about', label: 'About' },
];

function Logo({ className }: { className?: string }) {
  const l = brand.logoHorizontal;
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={l.webp} />
      <img src={l.src} width={l.width} height={l.height} alt="Full School Marketing" />
    </picture>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  return (
    <header className="cl-header">
      <div className="cl-wrap cl-header__inner">
        <a href="#top" className="cl-header__logo" aria-label="Full School Marketing, back to top">
          <Logo />
        </a>
        <button
          type="button"
          className="cl-header__toggle"
          aria-expanded={open}
          aria-controls="cl-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="cl-header__toggle-bar" aria-hidden="true" />
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden="true">Menu</span>
        </button>
        <nav id="cl-nav" className={`cl-nav ${open ? 'is-open' : ''}`} aria-label="Primary">
          <ul>
            {nav.map((n) => (
              <li key={n.href}><a href={n.href} onClick={() => setOpen(false)}>{n.label}</a></li>
            ))}
            <li className="cl-nav__cta"><a href={ctaHref} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Let's Talk</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const c = caseStudies[0];
  return (
    <section className="cl-hero" aria-labelledby="hero-title">
      <div className="cl-wrap cl-hero__grid">
        <div className="cl-hero__copy">
          <p className="cl-eyebrow">School enrollment marketing</p>
          <h1 id="hero-title" className="cl-hero__title">Great schools deserve full classrooms.</h1>
          <p className="cl-hero__lede">
            We combine standout creative, targeted campaigns, and enrollment strategy to help more families discover and choose your school.
          </p>
          <div className="cl-hero__actions">
            <a className="cl-btn cl-btn--primary" href={ctaHref} target="_blank" rel="noopener noreferrer" data-testid="cta-primary">{siteConfig.primaryCta}</a>
            <a className="cl-btn cl-btn--ghost" href="#work">{siteConfig.secondaryCta}</a>
          </div>
        </div>
        <figure className="cl-hero__media">
          <div className="cl-frame cl-frame--hero">
            <ResponsiveMedia asset={c.hero} priority sizes="(max-width: 900px) 100vw, 58vw" />
          </div>
          <figcaption className="cl-caption">
            Campaign creative: {c.school}, FilmTwist. <span className="cl-caption__muted">Reuse approval pending.</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="cl-trust" aria-label="About the team">
      <div className="cl-wrap cl-trust__inner">
        <p className="cl-trust__line">Enrollment strategy meets standout creative.</p>
        <p className="cl-trust__note">
          Powered by the team at{' '}
          <a href={siteConfig.filmtwist.url} target="_blank" rel="noopener noreferrer">FilmTwist</a>
        </p>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="cl-work" aria-labelledby="work-title">
      <div className="cl-wrap">
        <div className="cl-section-head">
          <p className="cl-eyebrow">Featured school campaigns</p>
          <h2 id="work-title" className="cl-h2">Real creative. Real campaigns. Measurable outcomes.</h2>
          <p className="cl-section-head__note">{siteConfig.filmtwist.attribution}</p>
        </div>
        <ol className="cl-cases">
          {caseStudies.map((c, i) => {
            const m = headlineMetric(c);
            return (
              <li key={c.id} className={`cl-case cl-case--${i + 1}`} data-testid="case-study">
                <a className="cl-case__link" href={c.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`${c.school}: explore case study on filmtwist.com (opens in a new tab)`}>
                  <div className="cl-frame cl-case__frame">
                    <ResponsiveMedia asset={i === 0 ? c.gallery[2] : i === 1 ? c.gallery[0] : c.hero} sizes="(max-width: 900px) 100vw, 66vw" />
                  </div>
                </a>
                <div className="cl-case__body">
                  <span className="cl-case__index" aria-hidden="true">0{i + 1}</span>
                  <h3 className="cl-case__title">{c.school}</h3>
                  <p className="cl-case__descriptor">{c.descriptor}</p>
                  <ul className="cl-tags" aria-label="Services delivered">
                    {c.servicesDescribed.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                  <p className="cl-case__metric"><MetricInline m={m} c={c} /></p>
                  <SourceLink c={c} className="cl-textlink">Explore case study</SourceLink>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="cl-services" aria-labelledby="services-title" data-testid="services">
      <div className="cl-wrap">
        <div className="cl-section-head">
          <p className="cl-eyebrow">Services</p>
          <h2 id="services-title" className="cl-h2">From your first impression to the first day of school.</h2>
        </div>
        <ul className="cl-services__list">
          {services.map((s, i) => (
            <li key={s.id} className="cl-service">
              <span className="cl-service__glyph"><ServiceGlyph id={s.id} /></span>
              <div>
                <span className="cl-service__num" aria-hidden="true">0{i + 1}</span>
                <h3 className="cl-service__title">{s.title}</h3>
                <p className="cl-service__outcome">{s.outcome}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" className="cl-approach" aria-labelledby="approach-title">
      <div className="cl-wrap">
        <div className="cl-section-head">
          <p className="cl-eyebrow">Approach</p>
          <h2 id="approach-title" className="cl-h2">A clear path from overlooked to chosen.</h2>
        </div>
        <ol className="cl-timeline">
          {approach.map((a, i) => (
            <li key={a.id} className="cl-timeline__step">
              <span className="cl-timeline__dot" aria-hidden="true" />
              <span className="cl-timeline__num" aria-hidden="true">{i + 1}</span>
              <h3 className="cl-timeline__title">{a.title}</h3>
              <p className="cl-timeline__line">{a.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Proof() {
  const picks = [
    { c: caseStudies[0], m: caseStudies[0].metrics[0] },
    { c: caseStudies[1], m: caseStudies[1].metrics[0] },
    { c: caseStudies[2], m: caseStudies[2].metrics[2] },
  ];
  return (
    <section id="proof" className="cl-proof" aria-labelledby="proof-title">
      <div className="cl-wrap">
        <div className="cl-section-head">
          <p className="cl-eyebrow">Proof</p>
          <h2 id="proof-title" className="cl-h2">Outcomes you can check, not claims you have to trust.</h2>
        </div>
        <ul className="cl-stats">
          {picks.map(({ c, m }) => (
            <li key={c.id} className="cl-stat">
              <span className="cl-stat__value">{m.display}</span>
              <span className="cl-stat__label">{m.label}</span>
              <span className="cl-stat__case">{c.school}</span>
              <span className="cl-stat__period">{c.period.label}</span>
              <SourceLink c={c} className="cl-textlink cl-textlink--small">Source</SourceLink>
            </li>
          ))}
        </ul>
        <ProofNote className="cl-proof__note" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="cl-about" aria-labelledby="about-title">
      <div className="cl-wrap cl-about__grid">
        <div>
          <p className="cl-eyebrow">About</p>
          <h2 id="about-title" className="cl-h2">The creative team behind FSM.</h2>
        </div>
        <div className="cl-about__copy">
          <p>{siteConfig.filmtwist.relationship}</p>
          <p>
            The same producers, photographers, designers and campaign managers who built the school recruitment work shown above bring that experience to every FSM engagement. Film days, photography, ad campaigns and follow-up are planned and delivered by one team, so your message stays consistent from the first ad to the first day of school.
          </p>
          <a className="cl-textlink" href={siteConfig.filmtwist.url} target="_blank" rel="noopener noreferrer">Visit filmtwist.com</a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="cl-contact" aria-labelledby="contact-title">
      <div className="cl-wrap cl-contact__inner">
        <div>
          <h2 id="contact-title" className="cl-contact__title">Tell us about your enrollment challenge.</h2>
          <p className="cl-contact__lede">
            A new campus, open seats in a specific grade band, or a story families have not heard yet. A short conversation is the easiest place to start.
          </p>
        </div>
        <a className="cl-btn cl-btn--primary cl-btn--large" href={ctaHref} target="_blank" rel="noopener noreferrer">{siteConfig.primaryCtaAlt}</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="cl-footer">
      <div className="cl-wrap cl-footer__grid">
        <div>
          <Logo className="cl-footer__logo" />
          <p className="cl-footer__tag">
            {siteConfig.brandName}. {siteConfig.missionLine}
          </p>
          <p className="cl-footer__ft">
            An enrollment practice of{' '}
            <a href={siteConfig.filmtwist.url} target="_blank" rel="noopener noreferrer">{siteConfig.filmtwist.name}</a>.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="cl-footer__nav">
            {nav.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}
            <li><a href={ctaHref} target="_blank" rel="noopener noreferrer">Let's Talk</a></li>
            <li><a href={siteConfig.filmtwist.workUrl} target="_blank" rel="noopener noreferrer">FilmTwist work</a></li>
          </ul>
        </nav>
        <div>
          <SocialLinks className="cl-footer__social" itemClassName="cl-footer__social-link" />
        </div>
      </div>
      <div className="cl-wrap cl-footer__legal">
        <span>© 2026 Full School Marketing</span>
        <span>Privacy policy and terms to be supplied.</span>
      </div>
    </footer>
  );
}

function MobileCta() {
  return (
    <div className="cl-mobile-cta" aria-hidden="false">
      <a className="cl-btn cl-btn--primary" href={ctaHref} target="_blank" rel="noopener noreferrer">{siteConfig.primaryCta}</a>
    </div>
  );
}

export function App() {
  return (
    <div id="top" className="cl">
      <SkipLink />
      <ReviewRibbon conceptId="clean" />
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Work />
        <Services />
        <Approach />
        <Proof />
        <About />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
      <ReviewPill conceptId="clean" />
    </div>
  );
}
