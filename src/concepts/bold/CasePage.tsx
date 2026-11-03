import { SkipLink } from '../../components/SkipLink';
import { ReviewPill, ReviewRibbon } from '../../components/ReviewChrome';
import { ResponsiveMedia } from '../../components/ResponsiveMedia';
import { SourceLink } from '../../components/CaseStudyProof';
import { caseStudies, proofDisclaimer, type CaseStudy } from '../../content/caseStudies';
import { services } from '../../content/services';
import { siteConfig } from '../../content/config';
import { Header, Footer } from './Chrome';

const HOME = '../../';

/** One published campaign, on this site, in Concept 06's chrome. Every figure keeps its unit, its period and its source. */
export function CasePage({ c }: { c: CaseStudy }) {
  const i = caseStudies.indexOf(c);
  const prev = caseStudies[(i + caseStudies.length - 1) % caseStudies.length];
  const next = caseStudies[(i + 1) % caseStudies.length];
  const serviceNames = c.services.map((id) => services.find((s) => s.id === id)?.short ?? id);
  return (
    <>
      <SkipLink />
      <ReviewRibbon conceptId="bold" />
      <Header home={HOME} />
      <main id="main" className="cr-casepage">
        <article aria-labelledby="case-title">
          <header className="cr-casepage-head">
            <div className="cr-wrap">
              <a className="cr-link-arrow cr-link-arrow--back" href={`${HOME}#work`} data-testid="case-back">All work</a>
              <span className="cr-eyebrow cr-eyebrow--light">{c.descriptor}</span>
              <h1 id="case-title" className="cr-h1">{c.school}</h1>
              <p className="cr-casepage-lede">{c.summary}</p>
              <dl className="cr-facts">
                <div><dt>Where</dt><dd>{c.location}</dd></div>
                <div><dt>Grades</dt><dd>{c.gradeBand}</dd></div>
                <div><dt>Campaign period</dt><dd>{c.period.label}</dd></div>
                <div><dt>Services</dt><dd>{serviceNames.join(', ')}</dd></div>
              </dl>
            </div>
          </header>

          <figure className="cr-wrap cr-casepage-hero">
            <ResponsiveMedia asset={c.hero} sizes="(max-width: 1320px) 100vw, 1320px" priority />
            {c.assetsReady !== 'approved' && <figcaption className="cr-rights">Campaign creative from the published case study. Reuse approval pending.</figcaption>}
          </figure>

          <section className="cr-wrap cr-casepage-section" aria-labelledby="results-title">
            <h2 id="results-title" className="cr-h2">What the <span className="cr-accent">campaign did.</span></h2>
            <ul className="cr-metrics" data-testid="case-metrics">
              {c.metrics.map((m) => (
                <li key={m.unit}><strong>{m.display}</strong> {m.label}</li>
              ))}
            </ul>
            <p className="cr-casepage-period">{c.caption} {proofDisclaimer}</p>
          </section>

          <section className="cr-wrap cr-casepage-section" aria-labelledby="work-title">
            <h2 id="work-title" className="cr-h2">The <span className="cr-accent">work.</span></h2>
            <ul className="cr-casepage-story">
              {c.story.map((line) => <li key={line}>{line}</li>)}
            </ul>
            <p className="cr-casepage-channels"><strong>Channels:</strong> {c.channels.join(', ')}.</p>
          </section>

          <section className="cr-wrap cr-casepage-section" aria-labelledby="creative-title">
            <h2 id="creative-title" className="cr-h2">Campaign <span className="cr-accent">creative.</span></h2>
            <ul className="cr-casepage-gallery" data-testid="case-gallery">
              {c.gallery.map((g) => (
                <li key={g.src}>
                  <figure>
                    <ResponsiveMedia asset={g} sizes="(max-width: 700px) 100vw, 33vw" />
                    {g.caption && <figcaption>{g.caption}</figcaption>}
                  </figure>
                </li>
              ))}
            </ul>
            {c.assetsReady !== 'approved' && <p className="cr-rights">Campaign creative from the published case study. Reuse approval pending.</p>}
          </section>

          <section className="cr-casepage-cta" aria-labelledby="cta-title">
            <div className="cr-wrap cr-cta-inner cr-cta-inner--one">
              <div className="cr-cta-copy">
                <h2 id="cta-title" className="cr-h1 cr-h1--cta">Let&rsquo;s fill <span className="cr-accent">your school.</span></h2>
                <p>{siteConfig.contactLine}</p>
                <div className="cr-hero-actions">
                  <a className="cr-btn cr-btn--primary" href={`${HOME}#contact`} data-testid="cta-final">{siteConfig.primaryCta}</a>
                </div>
              </div>
            </div>
          </section>

          <nav className="cr-wrap cr-casepage-nav" aria-label="More campaigns">
            <a className="cr-link-arrow cr-link-arrow--back" href={`../${prev.id}/`} data-testid="case-prev">Previous: {prev.shortName}</a>
            <a className="cr-link-arrow" href={`../${next.id}/`} data-testid="case-next">Next: {next.shortName}</a>
          </nav>

          <p className="cr-wrap cr-casepage-source" data-testid="case-source">
            Figures and creative are from <SourceLink c={c}>the published FilmTwist case study</SourceLink>.
          </p>
        </article>
      </main>
      <Footer home={HOME} />
      <ReviewPill conceptId="bold" />
    </>
  );
}
