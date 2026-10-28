import { useEffect, useState } from 'react';
import { SkipLink } from '../../components/SkipLink';
import { ReviewPill, ReviewRibbon } from '../../components/ReviewChrome';
import { ResponsiveMedia } from '../../components/ResponsiveMedia';
import { MetricInline, ProofNote } from '../../components/CaseStudyProof';
import { caseStudies, headlineMetric, type CaseStudy } from '../../content/caseStudies';
import { services } from '../../content/services';
import { siteConfig, url } from '../../content/config';
import { team, teamSource } from '../../content/team';
import { useReducedMotion } from '../../lib/motion';
import { StoryScroll } from './StoryScroll';
import { StoryStatic } from './StoryStatic';
import { ServiceIcon } from './ServiceIcons';
import { LeadConnectorForm, MobileCta, SiteFooter, SiteHeader } from './Chrome';
import { FsmForm } from './FsmForm';

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

  // The mobile CTA bar hides over the form and the footer; in the static (reduced-motion) version it appears once the first frame scrolls away.
  useEffect(() => {
    const root = document.documentElement;
    const footer = document.querySelector('.site-footer');
    const contact = document.getElementById('contact');
    if (!footer || !contact || typeof IntersectionObserver === 'undefined') return;
    const seen = new Map<Element, boolean>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target, e.isIntersecting));
      root.classList.toggle('is-at-footer', Boolean(seen.get(footer)) || Boolean(seen.get(contact)));
    }, { threshold: 0.05 });
    io.observe(footer);
    io.observe(contact);
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

      <SiteHeader />
      <MobileCta />

      <main id="main">
        <section id="top" className="story-section" aria-label="The Invisible School, a short story">
          <p className="sr-only">
            The page opens with the Full School Marketing logo, the line "Enrollment marketing for K-12 schools," a button
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
                    <span className="service__icon"><ServiceIcon id={s.id} /></span>
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

          {/* 4. Who you work with: a real agency, real people, real schools. Photos and roles as published on the FilmTwist About page. */}
          <section id="team" className="team" aria-labelledby="team-title">
            <div className="wrap team__inner">
              <p className="eyebrow">Team</p>
              <h2 id="team-title">Who you work with.</h2>
              <p className="team__line">{siteConfig.teamLine}</p>
              <ul className="team__grid" data-testid="team-grid">
                {team.map((p) => (
                  <li className="team__member" key={p.slug} data-testid="team-member">
                    <span className="team__photo">
                      <picture>
                        <source type="image/webp" srcSet={p.photo.webp} />
                        <img src={p.photo.png} width={p.photo.width} height={p.photo.height} alt="" loading="lazy" />
                      </picture>
                    </span>
                    <span className="team__name">{p.name}</span>
                    <span className="team__role">{p.role}</span>
                  </li>
                ))}
              </ul>
              <p className="team__schools">
                Campaigns above: {caseStudies.map((c) => c.school).join(', ')}.
              </p>
              <p className="team__rights">Team photos and roles from <a className="textlink" href={teamSource.url} target="_blank" rel="noopener noreferrer">filmtwist.com/about</a>. Reuse approval pending.</p>
            </div>
          </section>

          {/* 5. Work with us: what the call covers, and FilmTwist's own contact form so the lead lands in their system. */}
          <section id="contact" className="contact" aria-labelledby="contact-title" data-testid="contact">
            <div className="wrap contact__inner">
              <div className="contact__copy">
                <p className="eyebrow">Contact</p>
                <h2 id="contact-title">Work with us.</h2>
                <p className="contact__line">{siteConfig.contactLine}</p>
                <p className="contact__note">The form goes straight to the team.</p>
              </div>
              <div className={`contact__form${siteConfig.leadConnector.mode === 'fsm' ? ' contact__form--fsm' : ''}`} data-testid="contact-form">
                {siteConfig.leadConnector.mode === 'fsm' ? <FsmForm /> : <LeadConnectorForm />}
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
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
        </div>
        <a className="textlink case__link" href={url(`visible/work/${c.id}/`)} data-testid="case-link">Read the case study</a>
      </div>
    </article>
  );
}
