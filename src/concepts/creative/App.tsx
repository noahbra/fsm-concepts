import { useEffect, useRef, useState } from 'react';
import { siteConfig, ctaHref } from '../../content/config';
import { services } from '../../content/services';
import { caseStudies, headlineMetric } from '../../content/caseStudies';
import { brand } from '../../content/media';
import { ReviewRibbon, ReviewPill } from '../../components/ReviewChrome';
import { ResponsiveMedia } from '../../components/ResponsiveMedia';
import { MetricInline, ProofNote, SourceLink } from '../../components/CaseStudyProof';
import { SocialLinks } from '../../components/SocialLinks';
import { SkipLink } from '../../components/SkipLink';
import { useReducedMotion } from '../../lib/motion';
import { Gallery } from './Gallery';

const NAV = [
  { href: '#work', label: 'Work' },
  { href: '#make', label: 'What we make' },
  { href: '#results', label: 'Results' },
  { href: '#partner', label: 'Partner' },
];

export function App() {
  return (
    <>
      <SkipLink />
      <ReviewRibbon conceptId="creative" />
      <Header />
      <main id="main">
        <Hero />
        <Reel />
        <Cases />
        <Gallery />
        <Make />
        <Results />
        <Partner />
        <FinalCta />
      </main>
      <Footer />
      <ReviewPill conceptId="creative" />
    </>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="cr-header">
      <div className="cr-wrap cr-header-inner">
        <a href="#top" className="cr-logo" aria-label="Full School Marketing home">
          <picture>
            <source type="image/webp" srcSet={brand.logoHorizontalWhite.webp} />
            <img src={brand.logoHorizontalWhite.src} width={brand.logoHorizontalWhite.width} height={brand.logoHorizontalWhite.height} alt="Full School Marketing" />
          </picture>
        </a>
        <button
          type="button"
          className="cr-menu-btn"
          aria-expanded={open}
          aria-controls="cr-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="cr-nav" className={`cr-nav${open ? ' is-open' : ''}`} aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a className="cr-btn cr-btn--small" href={ctaHref} target="_blank" rel="noopener noreferrer">
            Let&rsquo;s talk
          </a>
        </nav>
      </div>
    </header>
  );
}

/* Hero collage: four real campaign assets, layered. */
const collage = [
  { item: caseStudies[1].hero, label: 'Digital ad, Friendship PCS', cls: 'cr-panel--a' },
  { item: caseStudies[0].gallery[0], label: 'Social ads, Aspire Public Schools', cls: 'cr-panel--b' },
  { item: caseStudies[2].gallery[0], label: 'Billboard and bus ads, Envision Education', cls: 'cr-panel--c' },
  { item: caseStudies[2].hero, label: 'School photography, Envision Education', cls: 'cr-panel--d' },
];

function Hero() {
  const reduced = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = stage.current;
    if (!el) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      tx = Math.max(-1, Math.min(1, x));
      ty = Math.max(-1, Math.min(1, y));
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const apply = () => {
      raf = 0;
      el.style.setProperty('--tilt-x', `${(-ty * 6).toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${(tx * 8).toFixed(2)}deg`);
      el.style.setProperty('--shift-x', `${(tx * 14).toFixed(1)}px`);
      el.style.setProperty('--shift-y', `${(ty * 14).toFixed(1)}px`);
    };
    const onLeave = () => {
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
      el.style.setProperty('--shift-x', '0px');
      el.style.setProperty('--shift-y', '0px');
    };
    const hero = el.closest('section') ?? el;
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const words = 'Make your school the one families remember.'.split(' ');

  return (
    <section id="top" className="cr-hero" aria-labelledby="hero-title">
      <div className="cr-wrap cr-hero-inner">
        <div className="cr-hero-copy">
          <span className="cr-eyebrow cr-eyebrow--light">School enrollment marketing</span>
          <h1 id="hero-title" className={`cr-h1${reduced ? '' : ' cr-kinetic'}`}>
            {words.map((w, i) => (
              <span key={i}>
                <span className="cr-word" style={{ '--i': i } as React.CSSProperties}>
                  {w}
                </span>
                {i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>
          <p className="cr-hero-offer">
            Creative, campaigns and enrollment strategy for K-12 schools, built by the team behind FilmTwist. The goal is
            enrolled students, not just clicks.
          </p>
          <div className="cr-hero-actions">
            <a className="cr-btn cr-btn--primary" href={ctaHref} target="_blank" rel="noopener noreferrer" data-testid="cta-primary">
              {siteConfig.primaryCta}
            </a>
            <a className="cr-btn cr-btn--ghost" href="#work">
              {siteConfig.secondaryCta}
            </a>
          </div>
          <p className="cr-hero-foot">
            Featured work:{' '}
            <a href={siteConfig.filmtwist.workUrl} target="_blank" rel="noopener noreferrer">
              FilmTwist Creative Agency
            </a>
            , the team behind FSM.
          </p>
        </div>

        <div className="cr-collage" ref={stage} aria-label="Campaign creative from FilmTwist school enrollment work" role="group">
          {collage.map((p, i) => (
            <figure key={i} className={`cr-panel ${p.cls}`}>
              <ResponsiveMedia asset={p.item} sizes="(max-width: 900px) 60vw, 30vw" priority={i < 2} />
              <figcaption>{p.label}</figcaption>
            </figure>
          ))}
          <span className="cr-collage-sticker" aria-hidden="true">
            Real<br />work
          </span>
        </div>
      </div>
    </section>
  );
}

/* Marquee reel of campaign thumbnails. Static grid under reduced motion. */
const reelItems = [
  caseStudies[1].gallery[0],
  caseStudies[0].hero,
  caseStudies[2].gallery[2],
  caseStudies[1].hero,
  caseStudies[0].gallery[2],
  caseStudies[2].gallery[3],
  caseStudies[1].gallery[1],
  caseStudies[0].gallery[5],
  caseStudies[2].hero,
  caseStudies[0].gallery[0],
].map((m) => ({
  ...m,
  school: caseStudies.find((c) => [c.hero, ...c.gallery].includes(m))!.shortName,
}));

function Reel() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  if (reduced) {
    return (
      <section className="cr-reel cr-reel--static" aria-label="Campaign creative reel">
        <div className="cr-wrap">
          <div className="cr-reel-head">
            <span className="cr-eyebrow cr-eyebrow--light">Three campaign types, one team</span>
          </div>
          <ul className="cr-reel-grid">
            {reelItems.map((m, i) => (
              <li key={i}>
                <ResponsiveMedia asset={m} sizes="(max-width: 700px) 50vw, 20vw" />
                <span>
                  {m.caption ?? 'School photography'}, {m.school}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="cr-reel" aria-label="Campaign creative reel">
      <div className="cr-wrap cr-reel-head">
        <span className="cr-eyebrow cr-eyebrow--light">Photo and video, digital ads, print and out-of-home</span>
        <button type="button" className="cr-reel-pause" aria-pressed={paused} onClick={() => setPaused((v) => !v)}>
          {paused ? 'Play reel' : 'Pause reel'}
        </button>
      </div>
      <div className={`cr-marquee${paused ? ' is-paused' : ''}`}>
        <ul className="cr-marquee-track">
          {[0, 1].map((dup) =>
            reelItems.map((m, i) => (
              <li key={`${dup}-${i}`} aria-hidden={dup === 1 || undefined}>
                <ResponsiveMedia asset={m} sizes="280px" alt={dup === 1 ? '' : undefined} />
                <span>
                  {m.caption ?? 'School photography'}, {m.school}
                </span>
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section className="cr-cases" aria-labelledby="cases-title">
      <div className="cr-wrap">
        <div className="cr-section-head cr-section-head--row">
          <h2 id="cases-title" className="cr-h2">
            Three schools. <span className="cr-accent">Three full campaigns.</span>
          </h2>
          <p className="cr-lede">
            Public charter schools and networks that needed more families to find them. Results are FilmTwist-reported
            for the period shown.
          </p>
        </div>
        <div className="cr-case-row">
          {caseStudies.map((c, i) => {
            const hm = headlineMetric(c);
            return (
              <article key={c.id} className={`cr-case cr-case--${i}`} data-testid="case-study">
                <div className="cr-case-media">
                  <ResponsiveMedia asset={c.hero} sizes="(max-width: 900px) 100vw, 33vw" />
                  <span className="cr-case-num" aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>
                <div className="cr-case-body">
                  <h3 className="cr-case-title">{c.school}</h3>
                  <p className="cr-case-desc">{c.descriptor}</p>
                  <p className="cr-case-metric">
                    <span className="cr-case-big">{hm.display}</span>
                    <MetricInline m={hm} c={c} className="cr-case-metric-line" />
                  </p>
                  <ul className="cr-tags" aria-label="Services">
                    {c.servicesDescribed.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <SourceLink c={c} className="cr-link-arrow">
                    Explore case study
                  </SourceLink>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Make() {
  return (
    <section id="make" className="cr-make" aria-labelledby="make-title" data-testid="services">
      <div className="cr-wrap">
        <div className="cr-section-head">
          <span className="cr-eyebrow">Services</span>
          <h2 id="make-title" className="cr-h2">
            What we make. <span className="cr-accent">What it does.</span>
          </h2>
        </div>
        <div className="cr-ledger" role="table" aria-label="What we make and what it does for enrollment">
          <div className="cr-ledger-head" role="row">
            <span role="columnheader">What we make</span>
            <span role="columnheader">What it does for enrollment</span>
          </div>
          {services.map((s, i) => (
            <div key={s.id} className="cr-ledger-row" role="row">
              <div role="cell" className="cr-ledger-make">
                <span className="cr-ledger-idx" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{s.title}</h3>
                <ul>
                  {s.includes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div role="cell" className="cr-ledger-does">
                <p className="cr-ledger-outcome">{s.outcome}</p>
                <p>{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section id="results" className="cr-results" aria-labelledby="results-title">
      <div className="cr-wrap">
        <div className="cr-section-head">
          <span className="cr-eyebrow cr-eyebrow--light">Results</span>
          <h2 id="results-title" className="cr-h2">
            Numbers with <span className="cr-accent">names and dates</span> attached.
          </h2>
        </div>
        <div className="cr-tiles">
          {caseStudies.map((c) => {
            const hm = headlineMetric(c);
            const rest = c.metrics.filter((m) => m !== hm);
            return (
              <div key={c.id} className="cr-tile-proof">
                <span className="cr-tile-period">{c.period.label}</span>
                <span className="cr-tile-num">{hm.display}</span>
                <span className="cr-tile-label">{hm.label}</span>
                <span className="cr-tile-school">{c.school}</span>
                <dl className="cr-tile-rest">
                  {rest.map((m) => (
                    <div key={m.unit}>
                      <dt>{m.label}</dt>
                      <dd>{m.display}</dd>
                    </div>
                  ))}
                </dl>
                <SourceLink c={c} className="cr-tile-src">
                  Source
                </SourceLink>
              </div>
            );
          })}
        </div>
        <ProofNote className="cr-proofnote" />
      </div>
    </section>
  );
}

const steps = [
  { t: 'Discover', d: 'Your enrollment goals, grade bands, neighborhoods and the families you most want to reach.' },
  { t: 'Create', d: 'Film and photo days, ad creative, print and out-of-home, landing pages. Your school, not stock.' },
  { t: 'Launch', d: 'Campaigns go live on the platforms families already use, timed to your application windows.' },
  { t: 'Improve', d: 'We read leads, applications and cost per lead honestly and adjust the work as the season moves.' },
];

function Partner() {
  return (
    <section id="partner" className="cr-partner" aria-labelledby="partner-title">
      <div className="cr-wrap">
        <div className="cr-section-head">
          <span className="cr-eyebrow">How we partner</span>
          <h2 id="partner-title" className="cr-h2">
            Four steps, <span className="cr-accent">one season at a time.</span>
          </h2>
        </div>
        <ol className="cr-steps">
          {steps.map((s, i) => (
            <li key={s.t}>
              <span className="cr-step-num" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="cr-cta" aria-labelledby="cta-title">
      <div className="cr-wrap cr-cta-inner">
        <h2 id="cta-title" className="cr-h1 cr-h1--cta">
          Your school deserves work that <span className="cr-accent">stands out.</span>
        </h2>
        <p>Tell us about your enrollment challenge. We will come back with what we would make, and why.</p>
        <div className="cr-hero-actions">
          <a className="cr-btn cr-btn--primary" href={ctaHref} target="_blank" rel="noopener noreferrer">
            {siteConfig.primaryCtaAlt}
          </a>
          <a className="cr-btn cr-btn--ghost" href="#work">
            {siteConfig.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="cr-footer">
      <div className="cr-wrap cr-footer-inner">
        <div className="cr-footer-brand">
          <picture>
            <source type="image/webp" srcSet={brand.logoHorizontalWhite.webp} />
            <img src={brand.logoHorizontalWhite.src} width={brand.logoHorizontalWhite.width} height={brand.logoHorizontalWhite.height} alt="Full School Marketing" />
          </picture>
          <p>
            {siteConfig.missionLine} Part of{' '}
            <a href={siteConfig.filmtwist.url} target="_blank" rel="noopener noreferrer">
              {siteConfig.filmtwist.name}
            </a>
            .
          </p>
          <SocialLinks className="cr-social" itemClassName="cr-social-link" />
        </div>
        <nav className="cr-footer-nav" aria-label="Footer">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
          <a href={ctaHref} target="_blank" rel="noopener noreferrer">
            Let&rsquo;s talk
          </a>
          <a href={siteConfig.filmtwist.workUrl} target="_blank" rel="noopener noreferrer">
            FilmTwist work
          </a>
        </nav>
        <div className="cr-footer-legal">
          <p>Privacy policy and terms to be supplied.</p>
          <p>&copy; 2026 {siteConfig.legal.copyrightHolder}. Campaign creative shown with reuse approval pending.</p>
        </div>
      </div>
    </footer>
  );
}
