import { caseStudies, headlineMetric } from '../../content/caseStudies';
import type { SeasonId } from './seasons';

/**
 * Plots the three verified FilmTwist reporting windows on a real calendar axis
 * (July 2021 to June 2023, two school years). Nothing is combined or extrapolated.
 */
const START = new Date(2021, 6, 1); // July 2021
const MONTHS_TOTAL = 24;
const monthIndex = (ym: string) => {
  const [y, m] = ym.split('-').map(Number);
  return (y - START.getFullYear()) * 12 + (m - 1 - START.getMonth());
};
const SEASON_OF_MONTH: Record<number, SeasonId> = { 8: 'fall', 9: 'fall', 10: 'fall', 11: 'winter', 0: 'winter', 1: 'winter', 2: 'spring', 3: 'spring', 4: 'spring', 5: 'summer', 6: 'summer', 7: 'summer' };

export function CampaignWindows({ lead, season }: { lead: string; season: SeasonId }) {
  const ordered = [...caseStudies].sort((a, b) => (a.id === lead ? -1 : b.id === lead ? 1 : 0));
  return (
    <figure className="windows" aria-describedby="windows-desc">
      <figcaption className="windows__title">Campaign windows, on the calendar</figcaption>
      <p id="windows-desc" className="windows__desc">
        Each bar is one FilmTwist school campaign and its reporting window. Shaded columns mark the season you selected.
      </p>
      <div className="windows__grid" role="table" aria-label="Reporting windows of the three featured campaigns">
        <div className="windows__axis" role="row" aria-hidden="true">
          {Array.from({ length: MONTHS_TOTAL }, (_, i) => {
            const d = new Date(START.getFullYear(), START.getMonth() + i, 1);
            const m = d.getMonth();
            return (
              <div key={i} className={`windows__cell${SEASON_OF_MONTH[m] === season ? ' is-season' : ''}${m === 6 ? ' is-year' : ''}`}>
                {(m === 6 || m === 0) && <span className="windows__year">{d.toLocaleString('en-US', { month: 'short' })} {d.getFullYear()}</span>}
              </div>
            );
          })}
        </div>
        {ordered.map((c) => {
          const s = monthIndex(c.period.start); const e = monthIndex(c.period.end) + 1;
          const m = headlineMetric(c);
          return (
            <div key={c.id} className="windows__row" role="row">
              <div
                role="cell"
                className={`windows__bar${c.id === lead ? ' is-lead' : ''}`}
                style={{ gridColumn: `${s + 1} / ${e + 1}` }}
              >
                <span className="windows__bar-school">{c.shortName}</span>
                <span className="windows__bar-metric">{m.display} {m.label.toLowerCase()}</span>
                <span className="sr-only">, {c.period.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </figure>
  );
}
