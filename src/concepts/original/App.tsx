import { useEffect, useMemo, useState } from 'react';
import { siteConfig, ctaHref } from '../../content/config';
import { services, approach } from '../../content/services';
import { caseStudies, headlineMetric } from '../../content/caseStudies';
import { brand } from '../../content/media';
import { ReviewRibbon, ReviewPill } from '../../components/ReviewChrome';
import { ResponsiveMedia } from '../../components/ResponsiveMedia';
import { SourceLink, MetricInline, ProofNote } from '../../components/CaseStudyProof';
import { SocialLinks } from '../../components/SocialLinks';
import { SkipLink } from '../../components/SkipLink';
import { useRevealOnScroll } from '../../lib/motion';
import { SeasonDial } from './SeasonDial';
import { CampaignWindows } from './CampaignWindows';
import { seasons, seasonById, seasonForMonth, type SeasonId } from './seasons';

const NAV = [
  { href: '#season', label: 'This season' },
  { href: '#services', label: 'Services' },
  { href: '#proof', label: 'Proof' },
  { href: '#how', label: 'How it works' },
];

export default function App() {
  const [seasonId, setSeasonId] = useState<SeasonId>(() => seasonForMonth(new Date().getMonth()));
  const season = seasonById(seasonId);
  useRevealOnScroll();
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero || !('IntersectionObserver' in window)) { setPastHero(true); return; }
    const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { threshold: 0.05 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => { document.documentElement.dataset.season = seasonId; }, [seasonId]);

  const orderedServices = useMemo(
    () => season.serviceOrder.map((id) => services.find((s) => s.id === id)!),
    [season],
  );
  const orderedCases = useMemo(
    () => [...caseStudies].sort((a, b) => (a.id === season.leadCase ? -1 : b.id === season.leadCase ? 1 : 0)),
    [season],
  );
  const serviceById = (id: string) => services.find((s) => s.id === id)!;

  return (
    <>
      <SkipLink />
      <ReviewRibbon conceptId="original" />
      <p className="sr-only" aria-live="polite">Planning view: {season.label}, {season.moment.toLowerCase()}</p>

      <header className="site-header">
        <a className="site-header__brand" href="#top" aria-label="Full School Marketing, home">
          <picture>
            <source type="image/webp" srcSet={brand.logoHorizontal.webp} />
            <img src={brand.logoHorizontal.src} width={brand.logoHorizontal.width} height={brand.logoHorizontal.height} alt="Full School Marketing" />
          </picture>
        </a>
        <nav className="site-nav" aria-label="Primary">
          <ul>
            {NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}
          </ul>
        </nav>
        <a className="btn btn--primary site-header__cta" href={ctaHref} target="_blank" rel="noopener noreferrer">Let&rsquo;s talk</a>
      </header>

      <main id="main">
        {/* 1. Hero with season dial */}
        <section id="top" className="hero">
          <div className="hero__copy">
            <p className="eyebrow">Full School Marketing</p>
            <div className="swap" key={`h-${seasonId}`}>
              <h1 className="hero__title" data-testid="season-headline">{season.headline}</h1>
              <p className="hero__sub">{season.sub}</p>
            </div>
            <div className="hero__actions">
              <a className="btn btn--primary btn--season" data-testid="cta-primary" href={ctaHref} target="_blank" rel="noopener noreferrer">{season.cta}</a>
              <a className="btn btn--ghost" href="#proof">{siteConfig.secondaryCta}</a>
            </div>
            <p className="hero__note">Enrollment strategy, creative, advertising and follow-through for K-12 schools, planned around your calendar.</p>
          </div>
          <div className="hero__dial" id="season">
            <p className="dial__prompt"><span className="label">Start here</span> Where is your school in the enrollment year?</p>
            <SeasonDial value={seasonId} onChange={setSeasonId} />
          </div>
        </section>

        {/* 2. What to do now */}
        <section className="now" aria-labelledby="now-title">
          <div className="section-head">
            <p className="label">{season.label}: {season.moment}</p>
            <h2 id="now-title">What to do now</h2>
            <p className="section-head__sub">Four moves that matter most in {season.label.toLowerCase()}. Your dates vary by state, district and school type.</p>
          </div>
          <ol className="now__list swap" key={`n-${seasonId}`}>
            {season.checklist.map((item, i) => (
              <li key={i} className="now__item">
                <span className="now__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <p className="now__text">{item.text}</p>
                <a className="now__service" href="#services">{serviceById(item.service).short}</a>
              </li>
            ))}
          </ol>
        </section>

        {/* 3. Services, reordered by season */}
        <section id="services" className="services" data-testid="services" aria-labelledby="services-title">
          <div className="section-head">
            <p className="label">Services</p>
            <h2 id="services-title">From your first impression to the first day of school.</h2>
            <p className="section-head__sub">Five ways we help, ordered by what matters most in {season.label.toLowerCase()}.</p>
          </div>
          <ol className="services__list swap" key={`s-${seasonId}`}>
            {orderedServices.map((s, i) => (
              <li key={s.id} className={`service${i === 0 ? ' service--first' : ''}`}>
                <div className="service__rank" aria-hidden="true">{i + 1}</div>
                <div className="service__body">
                  <h3>{s.title}</h3>
                  <p className="service__why"><span className="label">Why now</span> {season.whyNow[s.id]}</p>
                  <p className="service__desc">{s.description}</p>
                  <ul className="service__includes">
                    {s.includes.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 4. Proof */}
        <section id="proof" className="proof" aria-labelledby="proof-title">
          <div className="section-head">
            <p className="label">Proof</p>
            <h2 id="proof-title">Real campaigns, on a real calendar.</h2>
            <p className="section-head__sub">{siteConfig.filmtwist.attribution}</p>
          </div>
          <CampaignWindows lead={season.leadCase} season={seasonId} />
          <p className="proof__lead-reason swap" key={`r-${seasonId}`}><span className="label">Leading for {season.label.toLowerCase()}</span> {season.leadReason}</p>
          <div className="cases swap" key={`c-${seasonId}`}>
            {orderedCases.map((c, i) => {
              const m = headlineMetric(c);
              return (
                <article key={c.id} className={`case${i === 0 ? ' case--lead' : ''}`} data-testid="case-study" data-case={c.id}>
                  <div className="case__media">
                    <ResponsiveMedia asset={c.hero} sizes={i === 0 ? '(max-width: 900px) 100vw, 60vw' : '(max-width: 900px) 100vw, 30vw'} priority />
                  </div>
                  <div className="case__body">
                    <p className="case__period label">{c.period.label}</p>
                    <h3 className="case__school">{c.school}</h3>
                    <p className="case__descriptor">{c.descriptor}</p>
                    <p className="case__metric"><MetricInline m={m} c={c} /></p>
                    <ul className="case__metrics" aria-label="Other reported results">
                      {c.metrics.filter((x) => x !== m).map((x) => <li key={x.unit}><strong>{x.display}</strong> {x.label.toLowerCase()}</li>)}
                    </ul>
                    <ul className="tags" aria-label="Services">
                      {c.services.map((id) => <li key={id}>{serviceById(id).short}</li>)}
                    </ul>
                    <SourceLink c={c} className="case__link">Explore case study</SourceLink>
                  </div>
                </article>
              );
            })}
          </div>
          <ProofNote className="proof__note" />
        </section>

        {/* 5. How it works across the year */}
        <section id="how" className="how" aria-labelledby="how-title">
          <div className="section-head">
            <p className="label">How it works</p>
            <h2 id="how-title">The same four steps, every season.</h2>
          </div>
          <ol className="how__steps">
            {approach.map((a, i) => (
              <li key={a.id} className="how__step">
                <span className="how__num" aria-hidden="true">{i + 1}</span>
                <h3>{a.title}</h3>
                <p>{a.line}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 6. About */}
        <section className="about" aria-labelledby="about-title">
          <div className="about__inner">
            <p className="label">The creative team behind FSM</p>
            <h2 id="about-title">Built by a creative agency that has been filling school seats for years.</h2>
            <p>{siteConfig.filmtwist.relationship} The same team plans the campaign, shoots the footage, designs the ads and reports what happened. <a href={siteConfig.filmtwist.url} target="_blank" rel="noopener noreferrer">Visit {siteConfig.filmtwist.shortName}</a>.</p>
          </div>
        </section>

        {/* 7. CTA band */}
        <section className="cta-band" aria-labelledby="cta-title">
          <div className="cta-band__inner swap" key={`cta-${seasonId}`}>
            <p className="label label--light">{season.label}: {season.moment}</p>
            <h2 id="cta-title">{season.cta}.</h2>
            <p>Thirty minutes about your enrollment goals, your calendar and what we would do first.</p>
            <a className="btn btn--light" href={ctaHref} target="_blank" rel="noopener noreferrer">{siteConfig.primaryCta}</a>
            <p className="cta-band__alt">Not sure which season you are in? Start a conversation anyway.</p>
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <footer className="site-footer">
        <div className="site-footer__brand">
          <picture>
            <source type="image/webp" srcSet={brand.logoHorizontal.webp} />
            <img src={brand.logoHorizontal.src} width={brand.logoHorizontal.width} height={brand.logoHorizontal.height} alt="Full School Marketing" />
          </picture>
          <p>{siteConfig.missionLine}</p>
          <p className="site-footer__ft">{siteConfig.filmtwist.relationship} <a href={siteConfig.filmtwist.url} target="_blank" rel="noopener noreferrer">filmtwist.com</a></p>
        </div>
        <nav className="site-footer__nav" aria-label="Footer">
          <ul>
            {NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}
            <li><a href={ctaHref} target="_blank" rel="noopener noreferrer">Let&rsquo;s talk</a></li>
          </ul>
        </nav>
        <div className="site-footer__meta">
          <SocialLinks className="social" />
          <p>Privacy policy and terms to be supplied.</p>
          <p>&copy; 2026 {siteConfig.legal.copyrightHolder}</p>
        </div>
      </footer>

      <a className={`btn btn--primary sticky-cta${pastHero ? ' is-shown' : ''}`} href={ctaHref} target="_blank" rel="noopener noreferrer" aria-label={season.cta}>{seasons.find((s) => s.id === seasonId)!.label}: let&rsquo;s talk</a>
      <ReviewPill conceptId="original" />
    </>
  );
}
