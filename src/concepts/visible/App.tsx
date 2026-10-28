import { useEffect, useState } from 'react';
import { SkipLink } from '../../components/SkipLink';
import { ReviewPill, ReviewRibbon } from '../../components/ReviewChrome';
import { ResponsiveMedia } from '../../components/ResponsiveMedia';
import { MetricInline, ProofNote, SourceLink } from '../../components/CaseStudyProof';
import { SocialLinks } from '../../components/SocialLinks';
import { caseStudies, headlineMetric, type CaseStudy } from '../../content/caseStudies';
import { services } from '../../content/services';
import { ctaHref, siteConfig } from '../../content/config';
import { brand } from '../../content/media';
import { useReducedMotion } from '../../lib/motion';
import { StoryScroll } from './StoryScroll';
import { StoryStatic } from './StoryStatic';

type MotionPref = 'auto' | 'on' | 'off';

export function App() {
  const reduced = useReducedMotion();
  const [motion, setMotion] = useState<MotionPref>('auto');
  const showStatic = motion === 'off' || (motion === 'auto' && reduced);

  // The reveal: photos enter desaturated and faded and come into full color as they reach the viewport.
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

  // The mobile CTA bar hides over the footer; in the static (reduced-motion) version it appears once the first frame scrolls away.
  useEffect(() => {
    const root = document.documentElement;
    const footer = document.querySelector('.site-footer');
    if (!footer || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((entries) => root.classList.toggle('is-at-footer', entries.some((e) => e.isIntersecting)), { threshold: 0.05 });
    io.observe(footer);
    let onScroll: (() => void) | undefined;
    if (showStatic) {
      onScroll = () => root.classList.toggle('is-past-intro', window.scrollY > window.innerHeight * 0.6);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    return () => { io.disconnect(); root.classList.remove('is-at-footer'); if (onScroll) window.removeEventListener('scroll', onScroll); };
  }, [showStatic]);

  return (
    <>
      <SkipLink target="#site-content" label="Skip to services and proof" />
      <ReviewRibbon conceptId="visible" />

      <header className="site-header">
        <a className="site-header__brand" href="#top" aria-label="Full School Marketing, home">
          <img src={brand.emblemColor} width={40} height={40} alt="" />
          <span>Full School Marketing</span>
        </a>
        <nav className="site-header__nav" aria-label="Site">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
          <a className="site-header__cta" href={ctaHref} target="_blank" rel="noopener noreferrer">Let's talk</a>
        </nav>
      </header>

      {/* Below 700px: one primary button per viewport. Shown from the moment the first frame's button fades; hidden over the footer. */}
      <div className="mobile-cta" data-testid="mobile-cta">
        <a className="btn btn--primary" href={ctaHref} target="_blank" rel="noopener noreferrer">{siteConfig.primaryCta}</a>
      </div>

      <main id="main">
        <section id="top" className="story-section" aria-label="The Invisible School, a short story">
          <p className="sr-only">
            The page opens with the Full School Marketing logo, the line "Ads, video and landing pages that bring families to your school," a button
            to start a conversation, and a link to skip the story. Then a short illustrated story: the period from the tagline grow your own becomes a
            small character who walks through a quiet town where a wonderful school sits unnoticed. A sign comes alive, then digital ads on phones,
            search and streaming reach families where they already are, a landing page lets them share their details and start enrollment, an email
            nudges the family that hesitated, and the school fills with families and light. The character returns to its place as the period, and the
            story closes with "Let's fill your school," one button, and a link to watch it again.
          </p>
          <div className="story-controls">
            <button type="button" className="story-controls__btn" aria-pressed={showStatic} onClick={() => setMotion(showStatic ? 'on' : 'off')}>
              {showStatic ? 'Play the animated story' : 'Pause motion'}
            </button>
          </div>
          {showStatic ? <StoryStatic /> : <StoryScroll />}
        </section>

        <div id="site-content" tabIndex={-1} className="site-content">
          {/* 2. What we do: five services in the client's order, one line each (the outcome field). No paragraphs, no stage labels. */}
          <section id="services" className="services" aria-labelledby="services-title" data-testid="services">
            <div className="wrap">
              <p className="eyebrow">Services</p>
              <h2 id="services-title">What we do.</h2>
              <ul className="services__list">
                {services.map((s) => (
                  <li className="service" key={s.id}>
                    <h3>{s.title}</h3>
                    <p className="service__outcome">{s.outcome}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 3. Schools that got seen: three photo-led cards, one sourced headline metric each, expanding in place. */}
          <section id="work" className="work" aria-labelledby="work-title">
            <div className="wrap">
              <p className="eyebrow">Work</p>
              <h2 id="work-title">Schools that got seen. And chosen.</h2>
              <p className="lede">{siteConfig.filmtwist.attribution}</p>
              <div className="work__list">
                {caseStudies.map((c) => <CaseCard c={c} key={c.id} />)}
              </div>
              <ProofNote className="proof-note" />
            </div>
          </section>

          {/* 4. Who you work with: a real agency, real people, real schools. No placeholder copy. */}
          <section id="team" className="team" aria-labelledby="team-title">
            <div className="wrap team__inner">
              <p className="eyebrow">Team</p>
              <h2 id="team-title">Who you work with.</h2>
              <p className="team__line">{siteConfig.teamLine}</p>
              <p className="team__schools">
                Campaigns above: {caseStudies.map((c) => c.school).join(', ')}.
              </p>
            </div>
          </section>

          {/* 5. The first conversation: what the call covers and what to bring. No figures, one button. */}
          <section id="contact" className="contact" aria-labelledby="contact-title">
            <div className="wrap contact__inner">
              <p className="eyebrow">Contact</p>
              <h2 id="contact-title">The first conversation.</h2>
              <p className="contact__line">{siteConfig.contactLine}</p>
              <a className="btn btn--primary btn--big" data-testid="cta-final" href={ctaHref} target="_blank" rel="noopener noreferrer">{siteConfig.primaryCta}</a>
            </div>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <div className="wrap site-footer__inner">
          <div className="site-footer__brand">
            <picture>
              <source type="image/webp" srcSet={brand.logoHorizontalWhite.webp} />
              <img src={brand.logoHorizontalWhite.src} width={brand.logoHorizontalWhite.width} height={brand.logoHorizontalWhite.height} alt="Full School Marketing" loading="lazy" />
            </picture>
            <p>{siteConfig.missionLine}</p>
          </div>
          <nav className="site-footer__nav" aria-label="Footer">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#team">Team</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="site-footer__meta">
            <p>
              Powered by the team at <a href={siteConfig.filmtwist.url} target="_blank" rel="noopener noreferrer">{siteConfig.filmtwist.name}</a>.
            </p>
            <SocialLinks className="social" />
            <p className="site-footer__legal">© 2026 {siteConfig.legal.copyrightHolder}. Privacy policy and terms to be supplied.</p>
          </div>
        </div>
      </footer>
      <ReviewPill conceptId="visible" />
    </>
  );
}

/** One case study: photo, descriptor, school, the headline metric with its source, and a button that expands the card in place. */
function CaseCard({ c }: { c: CaseStudy }) {
  const [open, setOpen] = useState(false);
  const m = headlineMetric(c);
  const panelId = `case-${c.id}-more`;
  return (
    <article className={`case${open ? ' is-open' : ''}`} data-testid="case-study">
      <figure className="case__figure">
        <div className="case__media" data-reveal>
          <ResponsiveMedia asset={c.hero} sizes="(max-width: 760px) 100vw, 56vw" />
        </div>
        {c.assetsReady !== 'approved' && <figcaption className="case__rights">Campaign creative from the published case study. Reuse approval pending.</figcaption>}
      </figure>
      <div className="case__body">
        <p className="case__descriptor">{c.descriptor}</p>
        <h3>{c.school}</h3>
        <p className="case__metric"><MetricInline m={m} c={c} /></p>
        <button type="button" className="case__toggle" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((v) => !v)}>
          {open ? 'Show less' : 'What the campaign did'}
        </button>
        <div id={panelId} className="case__more" hidden={!open}>
          <p className="case__summary">{c.summary}</p>
          <ul className="case__story">
            {c.story.map((line) => <li key={line}>{line}</li>)}
          </ul>
          <ul className="case__secondary">
            {c.metrics.filter((x) => x !== m).map((x) => <li key={x.unit}><strong>{x.display}</strong> {x.label.toLowerCase()}</li>)}
          </ul>
          <SourceLink c={c} className="textlink" />
        </div>
      </div>
    </article>
  );
}
