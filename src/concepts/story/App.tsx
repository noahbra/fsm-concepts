import { useCallback, useRef, useState } from 'react';
import { ReviewPill, ReviewRibbon } from '../../components/ReviewChrome';
import { SkipLink } from '../../components/SkipLink';
import { ResponsiveMedia } from '../../components/ResponsiveMedia';
import { MetricInline, ProofNote, SourceLink } from '../../components/CaseStudyProof';
import { SocialLinks } from '../../components/SocialLinks';
import { caseStudies, headlineMetric } from '../../content/caseStudies';
import { services, approach } from '../../content/services';
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
  const rewatch = useRef<() => void>(() => window.scrollTo({ top: 0 }));
  const setRewatch = useCallback((fn: () => void) => { rewatch.current = fn; }, []);
  const serviceById = (id: string) => services.find((s) => s.id === id)!;

  return (
    <>
      <SkipLink target="#site-content" label="Skip to services and proof" />
      <ReviewRibbon conceptId="story" />

      <header className="site-header">
        <a className="site-header__brand" href="#top" aria-label="Full School Marketing, home">
          <img src={brand.emblemColor} width={40} height={40} alt="" />
          <span>Full School Marketing</span>
        </a>
        <nav className="site-header__nav" aria-label="Site">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#approach">Approach</a>
          <a className="site-header__cta" href={ctaHref} target="_blank" rel="noopener noreferrer">Let's talk</a>
        </nav>
      </header>

      <main id="main">
        <section id="top" className="story-section" aria-label="The Invisible School, a short story">
          <p className="sr-only">
            A short illustrated story: the period from the tagline grow your own becomes a small character who walks through a quiet town
            where a wonderful school sits unnoticed. As signs, posters, search results and social posts come alive, more families appear,
            find the route to the school, and fill it with life. The character returns to its place as the period, and we invite you to fill your school.
          </p>
          <div className="story-controls">
            <button type="button" className="story-controls__btn" aria-pressed={showStatic} onClick={() => setMotion(showStatic ? 'on' : 'off')}>
              {showStatic ? 'Play the animated story' : 'Pause motion'}
            </button>
          </div>
          {showStatic ? <StoryStatic /> : <StoryScroll onRewatchRef={setRewatch} />}
          {!showStatic && (
            <div className="story-after">
              <button type="button" className="btn btn--ghost btn--small" onClick={() => rewatch.current()}>Rewatch the story</button>
            </div>
          )}
        </section>

        <div id="site-content" tabIndex={-1} className="site-content">
          <section id="work" className="work" aria-labelledby="work-title">
            <div className="wrap">
              <p className="eyebrow">Real schools, real campaigns</p>
              <h2 id="work-title">Schools that got seen. And chosen.</h2>
              <p className="lede">{siteConfig.filmtwist.attribution} Each result is tied to the school, the outcome, and the reporting window.</p>
              <div className="work__list">
                {caseStudies.map((c, i) => {
                  const m = headlineMetric(c);
                  return (
                    <article className={`case ${i % 2 ? 'case--flip' : ''}`} key={c.id} data-testid="case-study">
                      <div className="case__media">
                        <ResponsiveMedia asset={c.hero} sizes="(max-width: 760px) 100vw, 56vw" />
                        {c.assetsReady !== 'approved' && <span className="case__rights">Campaign creative from the published case study. Reuse approval pending.</span>}
                      </div>
                      <div className="case__body">
                        <p className="case__descriptor">{c.descriptor}</p>
                        <h3>{c.school}</h3>
                        <p className="case__metric"><MetricInline m={m} c={c} /></p>
                        <ul className="case__secondary">
                          {c.metrics.filter((x) => x !== m).map((x) => <li key={x.unit}><strong>{x.display}</strong> {x.label.toLowerCase()}</li>)}
                        </ul>
                        <p className="case__summary">{c.summary}</p>
                        <ul className="tags" aria-label="Services">
                          {c.services.map((id) => <li key={id}>{serviceById(id).short}</li>)}
                        </ul>
                        <SourceLink c={c} className="textlink" />
                      </div>
                    </article>
                  );
                })}
              </div>
              <ProofNote className="proof-note" />
            </div>
          </section>

          <section id="services" className="services" aria-labelledby="services-title" data-testid="services">
            <div className="wrap">
              <p className="eyebrow">What we do</p>
              <h2 id="services-title">From your first impression to the first day of school.</h2>
              <ul className="services__grid">
                {services.map((s, i) => (
                  <li className="service" key={s.id}>
                    <span className="service__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{s.title}</h3>
                    <p className="service__outcome">{s.outcome}</p>
                    <p className="service__desc">{s.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="approach" className="approach" aria-labelledby="approach-title">
            <div className="wrap">
              <p className="eyebrow">How it works</p>
              <h2 id="approach-title">From visibility to enrollment.</h2>
              <ol className="path">
                {approach.map((a, i) => (
                  <li className="path__step" key={a.id}>
                    <span className="path__dot" aria-hidden="true" style={{ ['--i' as string]: i }} />
                    <h3>{a.title}</h3>
                    <p>{a.line}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="final" aria-labelledby="final-title">
            <div className="wrap final__inner">
              <span className="final__dot" aria-hidden="true" />
              <h2 id="final-title">Let's fill your school.</h2>
              <p>Tell us about your enrollment goals and what families say when they find you. We'll talk through what could move the numbers.</p>
              <a className="btn btn--primary btn--big" data-testid="cta-final" href={ctaHref} target="_blank" rel="noopener noreferrer">{siteConfig.primaryCta}</a>
              <p className="final__note">{siteConfig.filmtwist.relationship}</p>
            </div>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <div className="wrap site-footer__inner">
          <div className="site-footer__brand">
            <picture>
              <source type="image/webp" srcSet={brand.logoHorizontal.webp} />
              <img src={brand.logoHorizontal.src} width={brand.logoHorizontal.width} height={brand.logoHorizontal.height} alt="Full School Marketing" loading="lazy" />
            </picture>
            <p>{siteConfig.missionLine}</p>
          </div>
          <nav className="site-footer__nav" aria-label="Footer">
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#approach">Approach</a>
            <a href={ctaHref} target="_blank" rel="noopener noreferrer">Let's talk</a>
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

      <ReviewPill conceptId="story" />
    </>
  );
}
