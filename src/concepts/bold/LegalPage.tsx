import { Fragment, type ReactNode } from 'react';
import { SkipLink } from '../../components/SkipLink';
import { ReviewPill, ReviewRibbon } from '../../components/ReviewChrome';
import { siteConfig } from '../../content/config';
import { legalDocs, type LegalBlock, type LegalDoc } from '../../content/legal';
import { Header, Footer } from './Chrome';

/** bold/terms/ and bold/privacy/ sit one level under the Concept 06 page. */
const HOME = '../';

/** Where `[label](href)` shorthands in the content resolve. Anything else is a real href. */
const HREFS: Record<string, string> = {
  terms: `${HOME}${siteConfig.legal.termsUrl}`,
  privacy: `${HOME}${siteConfig.legal.privacyUrl}`,
  home: HOME,
};

/** `[label](href)` and `**bold**`, nothing else. The content is ours, so no sanitizing is needed; the result is React nodes, never HTML. */
function inline(text: string): ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const href = HREFS[link[2]] ?? link[2];
      const external = /^https?:/.test(href);
      return (
        <a key={i} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {link[1]}
        </a>
      );
    }
    const bold = /^\*\*([^*]+)\*\*$/.exec(part);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function Block({ b }: { b: LegalBlock }) {
  const L = siteConfig.legal;
  switch (b.type) {
    case 'p':
      return <p>{inline(b.text)}</p>;
    case 'h3':
      return <h3>{b.text}</h3>;
    case 'ul':
      return (
        <ul>
          {b.items.map((it) => <li key={it}>{inline(it)}</li>)}
        </ul>
      );
    case 'notice':
      return <p className="cr-legal-notice">{inline(b.text)}</p>;
    case 'contact':
      return (
        <address className="cr-legal-address">
          <strong>{L.dba}</strong>
          <br />
          {L.entity}
          <br />
          {L.address.map((line) => <Fragment key={line}>{line}<br /></Fragment>)}
          <a href={`tel:${L.phone.replace(/[^+\d]/g, '')}`}>{L.phone}</a>
          <br />
          <a href={`mailto:${L.email}`}>{L.email}</a>
        </address>
      );
  }
}

/**
 * One legal document in Concept 06's chrome: a blue head with the title and date, a table of contents, then every section
 * with its plain summary first and the operative text under it. The content is src/content/legal.ts.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const other = doc.id === 'terms' ? legalDocs.privacy : legalDocs.terms;
  return (
    <>
      <SkipLink />
      <ReviewRibbon conceptId="bold" />
      <Header home={HOME} />
      <main id="main" className="cr-casepage cr-legal">
        <article aria-labelledby="legal-title">
          <header className="cr-casepage-head cr-legal-head">
            <div className="cr-wrap">
              <a className="cr-link-arrow cr-link-arrow--back" href={`${HOME}#top`} data-testid="legal-home">Full School Marketing</a>
              <span className="cr-eyebrow cr-eyebrow--light">Legal</span>
              <h1 id="legal-title" className="cr-h1">{doc.title}</h1>
              <p className="cr-casepage-lede">{doc.lede}</p>
              <p className="cr-legal-updated" data-testid="legal-updated">Last updated {doc.updated}</p>
            </div>
          </header>

          <div className="cr-wrap cr-legal-body">
            <nav className="cr-legal-toc" aria-labelledby="legal-toc-title" data-testid="legal-toc">
              <p id="legal-toc-title" className="cr-legal-toc-title">On this page</p>
              <ol>
                {doc.sections.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`}>{s.title.replace(/^\d+\.\s/, '')}</a></li>
                ))}
              </ol>
              <p className="cr-legal-toc-other">
                See also the <a href={`${HOME}${other.id === 'terms' ? siteConfig.legal.termsUrl : siteConfig.legal.privacyUrl}`} data-testid="legal-other">{other.title.toLowerCase()}</a>.
              </p>
            </nav>

            <div className="cr-legal-text">
              <section className="cr-legal-intro" aria-label="Introduction">
                {doc.intro.map((b, i) => <Block key={i} b={b} />)}
              </section>
              {doc.sections.map((s) => (
                <section key={s.id} id={s.id} className="cr-legal-section" aria-labelledby={`${s.id}-title`}>
                  <h2 id={`${s.id}-title`}>{s.title}</h2>
                  <p className="cr-legal-short"><span>In short</span> {s.short}</p>
                  {s.blocks.map((b, i) => <Block key={i} b={b} />)}
                </section>
              ))}
              <p className="cr-legal-foot">
                <a className="cr-link-arrow cr-link-arrow--back" href={`${HOME}#top`}>Back to the site</a>
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer home={HOME} />
      <ReviewPill conceptId="bold" />
    </>
  );
}
