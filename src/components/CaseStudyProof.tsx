import type { CaseStudy, Metric } from '../content/caseStudies';
import { proofDisclaimer, assetsNote } from '../content/caseStudies';
import { siteConfig } from '../content/config';

/** Source link for a case. Always external, always labeled. */
export function SourceLink({ c, className, children }: { c: CaseStudy; className?: string; children?: React.ReactNode }) {
  return (
    <a className={className} href={c.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Explore the ${c.school} case study on filmtwist.com (opens in a new tab)`}>
      {children ?? 'Explore case study'}
    </a>
  );
}

/** "3,034 leads · July 2022 to June 2023". Keeps unit and period glued to the number. */
export function MetricInline({ m, c, className }: { m: Metric; c: CaseStudy; className?: string }) {
  return (
    <span className={className}>
      <strong>{m.display}</strong> {m.label.toLowerCase()} <span className="metric-period">({c.period.label})</span>
    </span>
  );
}

/** Standard attribution + disclaimer block. Use once per page near the proof section. */
export function ProofNote({ className, showAssetsNote = true }: { className?: string; showAssetsNote?: boolean }) {
  return (
    <div className={className}>
      <p>
        {siteConfig.filmtwist.attribution} {proofDisclaimer}{' '}
        Sources: <a href={siteConfig.filmtwist.workUrl} target="_blank" rel="noopener noreferrer">filmtwist.com/work</a>.
      </p>
      {showAssetsNote && <p>{assetsNote}</p>}
    </div>
  );
}
