import { useState } from 'react';
import { ReviewPill, ReviewRibbon } from '../../components/ReviewChrome';
import { SkipLink } from '../../components/SkipLink';
import { ResponsiveMedia } from '../../components/ResponsiveMedia';
import { SourceLink } from '../../components/CaseStudyProof';
import { SocialLinks } from '../../components/SocialLinks';
import { caseStudies, proofDisclaimer, assetsNote } from '../../content/caseStudies';
import { services, approach } from '../../content/services';
import { ctaHref, siteConfig } from '../../content/config';
import { brand } from '../../content/media';
import { Worksheet } from './Worksheet';
import { campaigns, fmt, fmtMoney, pct, type Worksheet as WS } from './funnel';

/** Which worksheet row each funnel step moves. Ids match `approach` in content/services.ts. */
const MOVES: Record<string, { row: string; line: string }> = {
  ads: { row: '03 Inquiries', line: 'Ads on Google, Meta, TikTok and streaming are how inquiries arrive. Creative made for your school, not a template, is what makes the cost per lead fall.' },
  landing: { row: '02 Applications', line: 'The landing page is where an inquiry becomes an application. It answers the first questions, takes contact details, and starts enrollment on the spot.' },
  email: { row: '02 Applications', line: 'Families who looked and did not apply get an email campaign. It is the cheapest application you will ever get, because the inquiry is already paid for.' },
  enroll: { row: '01 Seats', line: 'Leads, applications and enrollments reported against the campaign window, so the number you started with is the number we report against.' },
};

const FIRST_CALL = [
  'Seats to fill, by grade, and the date you need them filled by',
  'Inquiries, applications and enrollments for the last two or three years, by month if you have them',
  'Your application windows and lottery or decision dates',
  'What families say when they find you, and why families leave',
  'Where inquiries come from today (search, referrals, events, walk-ins)',
  'What you spent on outreach last year, if anything',
];

export default function App() {
  const [ws, setWs] = useState<WS | null>(null);
  const seats = ws?.seats ?? 60;
  const maxLeads = Math.max(...campaigns.map((c) => c.leads));

  return (
    <>
      <SkipLink target="#main" label="Skip to content" />
      <ReviewRibbon conceptId="original" />

      <header className="nm-header">
        <a className="nm-brand" href="#main" aria-label="Full School Marketing, home">
          <img src={brand.emblemColor} width={36} height={36} alt="" />
          <span>Full School Marketing</span>
        </a>
        <nav className="nm-nav" aria-label="Site">
          <a href="#number">Your number</a>
          <a href="#proof">Proof</a>
          <a href="#how">How it works</a>
          <a href="#services">Services</a>
          <a className="nm-nav__cta" href={ctaHref} target="_blank" rel="noopener noreferrer">Let's talk</a>
        </nav>
      </header>

      <main id="main">
        {/* 1. Your number */}
        <section id="number" className="nm-hero" aria-labelledby="hero-title">
          <div className="nm-wrap nm-hero__grid">
            <div className="nm-hero__copy">
              <p className="nm-kicker">Start with your number</p>
              <h1 id="hero-title">How many seats do you need to fill?</h1>
              <p className="nm-lede">
                Every other agency page starts with the agency. This one starts with the one number you already know, and works
                out what it takes, using only the campaigns we can show you.
              </p>
              <p className="nm-hero__mission">{siteConfig.missionLine}</p>
            </div>
            <div className="nm-hero__sheet">
              <Worksheet onChange={setWs} />
            </div>
          </div>
        </section>

        {/* 2. Where the numbers come from */}
        <section id="proof" className="nm-proof" aria-labelledby="proof-title">
          <div className="nm-wrap">
            <div className="nm-sectionhead">
              <p className="nm-kicker">Where the numbers come from</p>
              <h2 id="proof-title">Three campaigns, reported as funnels.</h2>
              <p className="nm-lede">{siteConfig.filmtwist.attribution} Each line is the published figure for that school and that window, with the source.</p>
            </div>
            <ol className="nm-funnels">
              {caseStudies.map((c) => {
                const r = campaigns.find((x) => x.id === c.id)!;
                const bar = (v: number) => ({ width: `${Math.max(2, (v / maxLeads) * 100)}%` });
                return (
                  <li className="nm-funnel" key={c.id} data-testid="case-study">
                    <div className="nm-funnel__media">
                      <ResponsiveMedia asset={c.hero} sizes="(max-width: 760px) 100vw, 280px" />
                      {c.assetsReady !== 'approved' && <span className="nm-rights">Campaign creative, reuse approval pending</span>}
                    </div>
                    <div className="nm-funnel__body">
                      <p className="nm-funnel__descriptor">{c.descriptor}</p>
                      <h3>{c.school}</h3>
                      <p className="nm-funnel__period">{c.period.label}</p>
                      <dl className="nm-bars">
                        <div className="nm-bar">
                          <dt>Leads</dt>
                          <dd><span className="nm-bar__fill nm-bar__fill--leads" style={bar(r.leads)} /><span className="nm-bar__num">{fmt.format(r.leads)}</span></dd>
                        </div>
                        <div className="nm-bar">
                          <dt>Applications</dt>
                          <dd><span className="nm-bar__fill nm-bar__fill--apps" style={bar(r.applications)} /><span className="nm-bar__num">{fmt.format(r.applications)} <small>({pct(r.applicationRate)} of leads)</small></span></dd>
                        </div>
                        {r.enrollments ? (
                          <div className="nm-bar">
                            <dt>Confirmed enrollments</dt>
                            <dd><span className="nm-bar__fill nm-bar__fill--enroll" style={bar(r.enrollments)} /><span className="nm-bar__num">{fmt.format(r.enrollments)} <small>({pct(r.enrollmentYield!)} of applications)</small></span></dd>
                          </div>
                        ) : (
                          <div className="nm-bar nm-bar--na">
                            <dt>Confirmed enrollments</dt>
                            <dd><span className="nm-bar__num nm-bar__num--na">Not reported for this campaign</span></dd>
                          </div>
                        )}
                      </dl>
                      <p className="nm-funnel__cpl"><strong>{fmtMoney.format(r.costPerLead)}</strong> average cost per lead</p>
                      <p className="nm-funnel__summary">{c.summary}</p>
                      <SourceLink c={c} className="nm-link" />
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="nm-proofnote">
              <p>{proofDisclaimer}</p>
              <p>{assetsNote}</p>
              <p>Published ROI percentages are intentionally not shown. Figures above are leads, applications, confirmed enrollments and average cost per lead only.</p>
            </div>
          </div>
        </section>

        {/* 3. What moves each number */}
        <section id="how" className="nm-how" aria-labelledby="how-title">
          <div className="nm-wrap">
            <div className="nm-sectionhead">
              <p className="nm-kicker">How it works</p>
              <h2 id="how-title">Four steps. Each one moves a line on your worksheet.</h2>
              <p className="nm-lede">The funnel we run for every school, tied to the number it changes.</p>
            </div>
            <ol className="nm-steps">
              {approach.map((a, i) => (
                <li className="nm-step" key={a.id}>
                  <span className="nm-step__num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="nm-step__body">
                    <h3>{a.title}</h3>
                    <p className="nm-step__line">{a.line}</p>
                    <p className="nm-step__moves"><span>Moves</span> {MOVES[a.id].row}</p>
                    <p className="nm-step__why">{MOVES[a.id].line}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. What we'll ask on the first call */}
        <section id="call" className="nm-call" aria-labelledby="call-title">
          <div className="nm-wrap nm-call__grid">
            <div>
              <p className="nm-kicker">The first call</p>
              <h2 id="call-title">We ask for your numbers before we show you anything.</h2>
              <p className="nm-lede">
                Bring what you have. If you do not have these yet, that is the first thing we fix together, and it costs nothing to find out.
              </p>
              <a className="nm-btn nm-btn--primary" data-testid="cta-primary" href={ctaHref} target="_blank" rel="noopener noreferrer">{siteConfig.primaryCta}</a>
            </div>
            <ol className="nm-checklist">
              {FIRST_CALL.map((item, i) => (
                <li key={i}><span className="nm-checklist__num">{String(i + 1).padStart(2, '0')}</span><span>{item}</span></li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5. Services */}
        <section id="services" className="nm-services" aria-labelledby="services-title" data-testid="services">
          <div className="nm-wrap">
            <div className="nm-sectionhead">
              <p className="nm-kicker">What we do</p>
              <h2 id="services-title">Everything between the first ad and the first day of school.</h2>
            </div>
            <ul className="nm-servicelist">
              {services.map((s, i) => (
                <li className="nm-service" key={s.id}>
                  <span className="nm-service__num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p className="nm-service__outcome">{s.outcome}</p>
                    <p className="nm-service__desc">{s.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. Invitation */}
        <section className="nm-final" aria-labelledby="final-title">
          <div className="nm-wrap nm-final__inner">
            <p className="nm-kicker">Your number was {fmt.format(seats)}</p>
            <h2 id="final-title">Bring your number. We'll bring ours.</h2>
            <p className="nm-lede">A 30-minute conversation about your seats, your windows and what the campaigns above would look like at your school.</p>
            <div className="nm-final__actions">
              <a className="nm-btn nm-btn--primary nm-btn--big" data-testid="cta-final" href={ctaHref} target="_blank" rel="noopener noreferrer">{siteConfig.primaryCta}</a>
              <a className="nm-btn nm-btn--ghost" href="#number">Back to the worksheet</a>
            </div>
            <p className="nm-final__note">{siteConfig.filmtwist.relationship}</p>
          </div>
        </section>
      </main>

      <footer className="nm-footer">
        <div className="nm-wrap nm-footer__inner">
          <div className="nm-footer__brand">
            <picture>
              <source type="image/webp" srcSet={brand.logoHorizontalWhite.webp} />
              <img src={brand.logoHorizontalWhite.src} width={brand.logoHorizontalWhite.width} height={brand.logoHorizontalWhite.height} alt="Full School Marketing" loading="lazy" />
            </picture>
            <p>{siteConfig.missionLine}</p>
          </div>
          <nav className="nm-footer__nav" aria-label="Footer">
            <a href="#number">Your number</a>
            <a href="#proof">Proof</a>
            <a href="#how">How it works</a>
            <a href="#services">Services</a>
            <a href={ctaHref} target="_blank" rel="noopener noreferrer">Let's talk</a>
          </nav>
          <div className="nm-footer__meta">
            <p>Powered by the team at <a href={siteConfig.filmtwist.url} target="_blank" rel="noopener noreferrer">{siteConfig.filmtwist.name}</a>.</p>
            <SocialLinks className="nm-social" />
            <p className="nm-footer__legal">© 2026 {siteConfig.legal.copyrightHolder}. Privacy policy and terms to be supplied.</p>
          </div>
        </div>
      </footer>

      <ReviewPill conceptId="original" />
    </>
  );
}
