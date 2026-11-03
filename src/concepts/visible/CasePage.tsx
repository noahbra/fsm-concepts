import { SkipLink } from '../../components/SkipLink';
import { ReviewPill, ReviewRibbon } from '../../components/ReviewChrome';
import { ResponsiveMedia } from '../../components/ResponsiveMedia';
import { SourceLink } from '../../components/CaseStudyProof';
import { caseStudies, proofDisclaimer, type CaseStudy } from '../../content/caseStudies';
import { services } from '../../content/services';
import { siteConfig } from '../../content/config';
import { MobileCta, SiteFooter, SiteHeader } from './Chrome';

const HOME = '../../';

/** One published campaign, on this site. Every figure keeps its unit, its period and its source. */
export function CasePage({ c }: { c: CaseStudy }) {
  const i = caseStudies.indexOf(c);
  const prev = caseStudies[(i + caseStudies.length - 1) % caseStudies.length];
  const next = caseStudies[(i + 1) % caseStudies.length];
  const serviceNames = c.services.map((id) => services.find((s) => s.id === id)?.short ?? id);
  return (
    <>
      <SkipLink />
      <ReviewRibbon conceptId="visible" />
      <SiteHeader home={HOME} />
      <MobileCta home={HOME} />
      <main id="main" className="case-page">
        <article aria-labelledby="case-title">
          <header className="wrap case-page__head">
            <a className="textlink case-page__back" href={`${HOME}#work`} data-testid="case-back">All work</a>
            <p className="eyebrow">{c.descriptor}</p>
            <h1 id="case-title">{c.school}</h1>
            <p className="lede">{c.summary}</p>
            <dl className="case-page__facts">
              <div><dt>Where</dt><dd>{c.location}</dd></div>
              <div><dt>Grades</dt><dd>{c.gradeBand}</dd></div>
              <div><dt>Campaign period</dt><dd>{c.period.label}</dd></div>
              <div><dt>Services</dt><dd>{serviceNames.join(', ')}</dd></div>
            </dl>
          </header>

          <figure className="wrap case-page__hero">
            <ResponsiveMedia asset={c.hero} sizes="(max-width: 1200px) 100vw, 1160px" priority />
            {c.assetsReady !== 'approved' && <figcaption className="case__rights">Campaign creative from the published case study. Reuse approval pending.</figcaption>}
          </figure>

          <section className="wrap" aria-labelledby="results-title">
            <h2 id="results-title">What the campaign did</h2>
            <ul className="case-page__metrics" data-testid="case-metrics">
              {c.metrics.map((m) => (
                <li key={m.unit}><strong>{m.display}</strong> {m.label}</li>
              ))}
            </ul>
            <p className="case-page__period">{c.caption} {proofDisclaimer}</p>
          </section>

          <section className="wrap" aria-labelledby="work-title">
            <h2 id="work-title">The work</h2>
            <ul className="case-page__story">
              {c.story.map((line) => <li key={line}>{line}</li>)}
            </ul>
            <p className="case-page__channels"><strong>Channels:</strong> {c.channels.join(', ')}.</p>
          </section>

          <section className="wrap" aria-labelledby="creative-title">
            <h2 id="creative-title">Campaign creative</h2>
            <ul className="case-page__gallery" data-testid="case-gallery">
              {c.gallery.map((g) => (
                <li key={g.src}>
                  <figure>
                    <ResponsiveMedia asset={g} sizes="(max-width: 700px) 100vw, 33vw" />
                    {g.caption && <figcaption>{g.caption}</figcaption>}
                  </figure>
                </li>
              ))}
            </ul>
            {c.assetsReady !== 'approved' && <p className="case__rights">Campaign creative from the published case study. Reuse approval pending.</p>}
          </section>

          <section className="wrap case-page__cta" aria-labelledby="cta-title">
            <h2 id="cta-title">Let's fill your school.</h2>
            <p>{siteConfig.contactLine}</p>
            <a className="btn btn--primary btn--big" href={`${HOME}#contact`} data-testid="cta-final">{siteConfig.primaryCta}</a>
          </section>

          <nav className="wrap case-page__nav" aria-label="More campaigns">
            <a className="textlink" href={`../${prev.id}/`} data-testid="case-prev">Previous: {prev.shortName}</a>
            <a className="textlink" href={`../${next.id}/`} data-testid="case-next">Next: {next.shortName}</a>
          </nav>

          <p className="wrap case-page__source">
            Figures and creative are from <SourceLink c={c} className="textlink">the published FilmTwist case study</SourceLink>.
          </p>
        </article>
      </main>
      <SiteFooter home={HOME} />
      <ReviewPill conceptId="visible" />
    </>
  );
}
