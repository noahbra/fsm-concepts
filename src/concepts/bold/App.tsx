import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../../content/config';
import { caseStudies } from '../../content/caseStudies';
import { brand } from '../../content/media';
import { ReviewRibbon, ReviewPill } from '../../components/ReviewChrome';
import { ResponsiveMedia } from '../../components/ResponsiveMedia';
import { SocialLinks } from '../../components/SocialLinks';
import { SkipLink } from '../../components/SkipLink';
import { useReducedMotion } from '../../lib/motion';

/**
 * Concept 06: Bold, rebuilt. Concept 02's page forked on October 28, 2026 (docs/CONCEPT_06_BRIEF.md). Step 1 of the build:
 * header, hero and reel on the retokened surfaces. Sections 3 to 8 (what we do, work, team, how we partner, work with us)
 * follow in step 2 once the project owner has seen the hero.
 */
const NAV = [
  { href: '#services', label: 'What we do' },
  { href: '#work', label: 'Work' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
];

export function App() {
  return (
    <>
      <SkipLink />
      <ReviewRibbon conceptId="bold" />
      <Header />
      <main id="main">
        <Hero />
        <Reel />
      </main>
      <Footer />
      <ReviewPill conceptId="bold" />
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
        <button type="button" className="cr-menu-btn" aria-expanded={open} aria-controls="cr-nav" onClick={() => setOpen((v) => !v)}>
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="cr-nav" className={`cr-nav${open ? ' is-open' : ''}`} aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a className="cr-btn cr-btn--small" href="#contact">
            Let&rsquo;s talk
          </a>
        </nav>
      </div>
    </header>
  );
}

/* Hero collage: three real campaign assets, layered (Concept 02 had four and a sticker; the brief asks for simpler frames). */
const collage = [
  { item: caseStudies[1].hero, label: 'Digital ad, Friendship PCS', cls: 'cr-panel--a' },
  { item: caseStudies[0].gallery[0], label: 'Social ads, Aspire Public Schools', cls: 'cr-panel--b' },
  { item: caseStudies[2].hero, label: 'School photography, Envision Education', cls: 'cr-panel--c' },
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
          <span className="cr-eyebrow cr-eyebrow--light">{siteConfig.heroLine.replace(/\.$/, '')}</span>
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
            <a className="cr-btn cr-btn--primary" href="#contact" data-testid="cta-primary">
              {siteConfig.primaryCta}
            </a>
            <a className="cr-btn cr-btn--ghost" href="#work">
              {siteConfig.secondaryCta}
            </a>
          </div>
        </div>

        <div className="cr-collage" ref={stage} aria-label="Campaign creative from FilmTwist school enrollment work" role="group">
          {collage.map((p, i) => (
            <figure key={i} className={`cr-panel ${p.cls}`}>
              <ResponsiveMedia asset={p.item} sizes="(max-width: 900px) 60vw, 30vw" priority={i < 2} />
              <figcaption>{p.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Marquee reel of campaign thumbnails. Static grid under reduced motion. Unchanged from Concept 02. */
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
            {siteConfig.missionLine} Powered by the team at{' '}
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
        </nav>
        <div className="cr-footer-legal">
          <p>Privacy policy and terms to be supplied.</p>
          <p>&copy; 2026 {siteConfig.legal.copyrightHolder}. Campaign creative shown with reuse approval pending.</p>
        </div>
      </div>
    </footer>
  );
}
