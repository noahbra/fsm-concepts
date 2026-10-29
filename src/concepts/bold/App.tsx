import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { siteConfig, url } from '../../content/config';
import { caseStudies, headlineMetric, type CaseStudy } from '../../content/caseStudies';
import { services } from '../../content/services';
import { team, teamSource } from '../../content/team';
import { ReviewRibbon, ReviewPill } from '../../components/ReviewChrome';
import { ResponsiveMedia } from '../../components/ResponsiveMedia';
import { siteMedia } from '../../content/media';
import { MetricInline, ProofNote, SourceLink } from '../../components/CaseStudyProof';
import { SkipLink } from '../../components/SkipLink';
import { useReducedMotion } from '../../lib/motion';
import { ServiceIcon } from '../visible/ServiceIcons';
import { FsmForm } from '../visible/FsmForm';
import { Header, Footer } from './Chrome';
import { Opener } from './Opener';

/**
 * Concept 06: Bold, rebuilt. Concept 02's page forked on October 28, 2026 (docs/CONCEPT_06_BRIEF.md): the hero, reel
 * and energy on the kit's blue and green, then what we do, the work, who you work with, how we partner and the form.
 * No opening story, no results section, no ledger. Section order is the brand owner's; the components below the reel
 * are Concept 05's, restyled to this chrome.
 */
export function App() {
  const reduced = useReducedMotion();

  // Concept 05's reveal: campaign photos enter desaturated and faded and come into full color as they reach the viewport.
  // Full color is the default; the pre-state class is added only once the observer exists, and never under reduced motion.
  useEffect(() => {
    if (reduced || typeof IntersectionObserver === 'undefined') return;
    const root = document.documentElement;
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
      { threshold: 0.3 },
    );
    root.classList.add('reveal-ready');
    targets.forEach((t) => io.observe(t));
    return () => { io.disconnect(); root.classList.remove('reveal-ready'); };
  }, [reduced]);

  return (
    <>
      <Opener />
      <SkipLink />
      <ReviewRibbon conceptId="bold" />
      <Header />
      <main id="main">
        <Hero />
        <Reel />
        <Services />
        <Work />
        <Team />
        <Partner />
        <Contact />
      </main>
      <Footer />
      <ReviewPill conceptId="bold" />
    </>
  );
}

/* Hero: one photograph beside the statement (round 2, October 29: both reviewers asked for the collage to go). The photograph
   is the one the project owner chose from filmtwist.com on October 29; no caption, since it is not a case-study asset. */
const heroPhoto = siteMedia(
  'hero-school-steps',
  'Four young students in red polo shirts sitting on school steps, laughing and clapping',
  { sourceUrl: 'https://cdn.prod.website-files.com/66cf053fc0fd9e79e5290cf5/680bbaaa31d7b9b9f1bc8dda_Screenshot%202025-04-25%20at%2011.38.54%E2%80%AFAM.png' },
);

function Hero() {
  const reduced = useReducedMotion();
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

        <figure className="cr-hero-photo" style={{ aspectRatio: `${heroPhoto.width} / ${heroPhoto.height}` }}>
          <ResponsiveMedia asset={heroPhoto} sizes="(max-width: 960px) 92vw, 44vw" priority />
        </figure>
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

type ReelItem = (typeof reelItems)[number];

/**
 * Round 2 (October 29): every creative is shown whole, at its own proportion, on the reel's dark surface (the brand owner
 * noted the cropping). Hovering a tile enlarges it in place; a click, tap or Enter opens the full creative in a dialog
 * that Escape, the Close button or the backdrop dismisses. The marquee pauses while a tile is hovered or focused.
 */
function ReelTile({ m, dup, onOpen, sizes }: { m: ReelItem; dup: boolean; onOpen: (m: ReelItem) => void; sizes: string }) {
  const label = `${m.caption ?? 'School photography'}, ${m.school}`;
  return (
    <li aria-hidden={dup || undefined} style={{ '--ar': `${m.width} / ${m.height}` } as React.CSSProperties}>
      <button type="button" className="cr-reel-item" onClick={() => onOpen(m)} tabIndex={dup ? -1 : 0} aria-label={`Enlarge: ${label}`} data-testid={dup ? undefined : 'reel-item'}>
        <ResponsiveMedia asset={m} sizes={sizes} alt={dup ? '' : undefined} />
      </button>
      <span>{label}</span>
    </li>
  );
}

function Reel() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState<ReelItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const onBackdrop = (e: MouseEvent<HTMLDialogElement>) => { if (e.target === e.currentTarget) setOpen(null); };
  const lightbox = (
    <dialog ref={dialog} className="cr-lightbox" aria-label={open ? `${open.caption ?? 'School photography'}, ${open.school}` : 'Campaign creative'} onClose={() => setOpen(null)} onClick={onBackdrop} data-testid="lightbox">
      {open && (
        <figure className="cr-lightbox-figure">
          <ResponsiveMedia asset={open} sizes="min(92vw, 1100px)" />
          <figcaption>{open.caption ?? 'School photography'}, {open.school}</figcaption>
        </figure>
      )}
      <button type="button" className="cr-lightbox-close" onClick={() => setOpen(null)} data-testid="lightbox-close" aria-label="Close">Close</button>
    </dialog>
  );

  if (reduced) {
    return (
      <section className="cr-reel cr-reel--static" aria-label="Campaign creative reel">
        <div className="cr-wrap">
          <div className="cr-reel-head">
            <span className="cr-eyebrow cr-eyebrow--light">Three campaign types, one team</span>
          </div>
          <ul className="cr-reel-grid">
            {reelItems.map((m, i) => <ReelTile m={m} dup={false} onOpen={setOpen} sizes="(max-width: 700px) 50vw, 20vw" key={i} />)}
          </ul>
        </div>
        {lightbox}
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
          {[0, 1].map((dup) => reelItems.map((m, i) => <ReelTile m={m} dup={dup === 1} onOpen={setOpen} sizes="340px" key={`${dup}-${i}`} />))}
        </ul>
      </div>
      {lightbox}
    </section>
  );
}

/* 3. What we do: five services in the client's order, one line each (the outcome field). Concept 05's tiles on this chrome. */
function Services() {
  return (
    <section id="services" className="cr-services" aria-labelledby="services-title" data-testid="services">
      <div className="cr-wrap">
        <div className="cr-section-head">
          <span className="cr-eyebrow">Services</span>
          <h2 id="services-title" className="cr-h2">
            What <span className="cr-accent">we do.</span>
          </h2>
        </div>
        <ul className="cr-service-list">
          {services.map((s) => (
            <li className="cr-service" key={s.id}>
              <span className="cr-service-icon"><ServiceIcon id={s.id} /></span>
              <h3>{s.title}</h3>
              <p>{s.outcome}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 4. Work: three photo-led cards, one sourced headline metric each, each opening its case page on this site. */
function Work() {
  return (
    <section id="work" className="cr-work" aria-labelledby="work-title">
      <div className="cr-wrap">
        <div className="cr-section-head cr-section-head--row">
          <div>
            <span className="cr-eyebrow">Work</span>
            <h2 id="work-title" className="cr-h2">
              Schools that got seen. <span className="cr-accent">And chosen.</span>
            </h2>
          </div>
          <p className="cr-lede">{siteConfig.filmtwist.attribution}</p>
        </div>
        <div className="cr-case-row">
          {caseStudies.map((c) => <CaseCard c={c} key={c.id} />)}
        </div>
        <ProofNote className="cr-proofnote" />
      </div>
    </section>
  );
}

/** One case study: photo, descriptor, school, the headline metric with its period and source, and the link to its page here. */
function CaseCard({ c }: { c: CaseStudy }) {
  const m = headlineMetric(c);
  return (
    <article className="cr-case" data-testid="case-study">
      <a className="cr-case-media" href={url(`bold/work/${c.id}/`)} aria-label={`${c.school}: read the case study`} tabIndex={-1} data-reveal>
        <ResponsiveMedia asset={c.hero} sizes="(max-width: 900px) 100vw, 33vw" />
      </a>
      <div className="cr-case-body">
        <p className="cr-case-desc">{c.descriptor}</p>
        <h3 className="cr-case-title">{c.school}</h3>
        <p className="cr-case-metric">
          <span className="cr-case-big">{m.display}</span>
          <MetricInline m={m} c={c} className="cr-case-metric-line" />
        </p>
        <p className="cr-case-source">
          <SourceLink c={c}>Source</SourceLink>
        </p>
        <a className="cr-link-arrow" href={url(`bold/work/${c.id}/`)} data-testid="case-link">Read the case study</a>
      </div>
    </article>
  );
}

/* 5. Who you work with: the agency behind the brand, as published on the FilmTwist About page. Concept 05's cut-outs. */
function Team() {
  return (
    <section id="team" className="cr-team" aria-labelledby="team-title">
      <div className="cr-wrap">
        <div className="cr-section-head cr-section-head--row">
          <div>
            <span className="cr-eyebrow">Team</span>
            <h2 id="team-title" className="cr-h2">
              Who you <span className="cr-accent">work with.</span>
            </h2>
          </div>
          <p className="cr-lede">{siteConfig.teamLine}</p>
        </div>
        <ul className="cr-team-grid" data-testid="team-grid">
          {team.map((p) => (
            <li className="cr-member" key={p.slug} data-testid="team-member">
              <span className="cr-member-photo">
                <picture>
                  <source type="image/webp" srcSet={p.photo.webp} />
                  <img src={p.photo.png} width={p.photo.width} height={p.photo.height} alt="" loading="lazy" />
                </picture>
              </span>
              <span className="cr-member-name">{p.name}</span>
              <span className="cr-member-role">{p.role}</span>
            </li>
          ))}
        </ul>
        <p className="cr-team-note">
          Campaigns above: {caseStudies.map((c) => c.school).join(', ')}. Team photos and roles from{' '}
          <a href={teamSource.url} target="_blank" rel="noopener noreferrer">filmtwist.com/about</a>. Reuse approval pending.
        </p>
      </div>
    </section>
  );
}

/* 6. How we partner: Concept 02's four steps, one line each, under 60 words in all. */
const steps = [
  { t: 'Discover', d: 'Your enrollment goals, grade bands, neighborhoods and the families you most want to reach.' },
  { t: 'Create', d: 'Film and photo days, ad creative, print, out-of-home and landing pages. Your school, not stock.' },
  { t: 'Launch', d: 'Campaigns go live where families already are, timed to your application windows.' },
  { t: 'Improve', d: 'We read leads, applications and cost per lead, and adjust as the season moves.' },
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

/* 7. Work with us: the final call on kit blue, Concept 05's intro copy, and the FSM form posting to FilmTwist's form service. */
function Contact() {
  return (
    <section id="contact" className="cr-cta" aria-labelledby="cta-title" data-testid="contact">
      <div className="cr-wrap cr-cta-inner">
        <div className="cr-cta-copy">
          <span className="cr-eyebrow cr-eyebrow--light">Contact</span>
          <h2 id="cta-title" className="cr-h1 cr-h1--cta">
            Let&rsquo;s fill <span className="cr-accent">your school.</span>
          </h2>
          <p>{siteConfig.contactLine}</p>
          <p className="cr-cta-note">The form goes straight to the team.</p>
        </div>
        <div className="cr-cta-form" data-testid="contact-form">
          <FsmForm />
        </div>
      </div>
    </section>
  );
}
