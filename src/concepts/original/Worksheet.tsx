import { useEffect, useId, useRef, useState } from 'react';
import { useReducedMotion } from '../../lib/motion';
import { DEFAULT_YIELD, SEATS, YIELD, compute, fmt, fmtMoney, yieldSource, type Worksheet as WS } from './funnel';

/** A number that eases to its new value (instant under reduced motion). */
function Figure({ value, money = false, testId }: { value: number; money?: boolean; testId?: string }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (reduced) { setShown(value); from.current = value; return; }
    const start = performance.now();
    const a = from.current;
    const dur = 480;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(a + (value - a) * e));
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduced]);
  return <span className="ws-figure" data-testid={testId}>{money ? fmtMoney.format(shown) : fmt.format(shown)}</span>;
}

/** A range bar with the three campaigns plotted on it. */
function RangeBar({ low, high, points, money = false, label }: { low: number; high: number; points: { id: string; name: string; value: number }[]; money?: boolean; label: string }) {
  const span = Math.max(1, high - low);
  const f = (v: number) => (money ? fmtMoney.format(v) : fmt.format(v));
  const sorted = [...points].sort((a, b) => a.value - b.value);
  return (
    <div className="ws-range" role="img" aria-label={`${label}: ${points.map((p) => `${p.name} ${f(p.value)}`).join(', ')}`}>
      <div className="ws-range__track">
        {points.map((p) => (
          <span key={p.id} className={`ws-range__dot ws-range__dot--${p.id} ${p === sorted[0] ? 'is-first' : ''} ${p === sorted[sorted.length - 1] ? 'is-last' : ''}`} style={{ left: `${((p.value - low) / span) * 100}%` }}>
            <span className="ws-range__tip">{p.name}<br />{f(p.value)}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Worksheet({ onChange }: { onChange?: (w: WS) => void }) {
  const [seats, setSeats] = useState(SEATS.default);
  const [yieldPct, setYieldPct] = useState(DEFAULT_YIELD);
  const w = compute(seats, yieldPct);
  const seatsId = useId();
  const yieldId = useId();
  useEffect(() => { onChange?.(w); }, [seats, yieldPct]); // eslint-disable-line react-hooks/exhaustive-deps

  const points = (key: 'inquiries' | 'budget') => w.scenarios.map((s) => ({ id: s.campaign.id, name: s.campaign.shortName, value: s[key] }));

  return (
    <div className="ws" data-testid="worksheet">
      <div className="ws__inputs">
        <div className="ws__field">
          <label htmlFor={seatsId} className="ws__label">Seats to fill</label>
          <div className="ws__control">
            <input
              id={seatsId}
              className="ws__number"
              data-testid="seat-input"
              type="number"
              inputMode="numeric"
              min={SEATS.min}
              max={SEATS.max}
              step={1}
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value) || SEATS.min)}
              onBlur={() => setSeats(Math.min(SEATS.max, Math.max(SEATS.min, seats)))}
            />
            <input
              className="ws__slider"
              data-testid="seat-slider"
              type="range"
              aria-label="Seats to fill, slider"
              min={SEATS.min}
              max={SEATS.max}
              step={SEATS.step}
              value={Math.min(SEATS.max, Math.max(SEATS.min, seats))}
              onChange={(e) => setSeats(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="ws__field">
          <label htmlFor={yieldId} className="ws__label">Applications that become enrollments</label>
          <div className="ws__control">
            <output className="ws__number ws__number--out" htmlFor={yieldId}>{w.yieldPct}%</output>
            <input
              id={yieldId}
              className="ws__slider"
              data-testid="yield-slider"
              type="range"
              min={YIELD.min}
              max={YIELD.max}
              step={YIELD.step}
              value={yieldPct}
              onChange={(e) => setYieldPct(Number(e.target.value))}
            />
          </div>
          <p className="ws__hint">
            Starts at {DEFAULT_YIELD}%: {yieldSource.school} reported {fmt.format(yieldSource.enrollments!)} confirmed enrollments from{' '}
            {fmt.format(yieldSource.applications)} applications. Set your own if you know it.
          </p>
        </div>
      </div>

      <div className="ws__rows" aria-live="polite" aria-atomic="true">
        <div className="ws__row">
          <div className="ws__rowhead">
            <span className="ws__index">01</span>
            <span className="ws__name">Seats to fill</span>
          </div>
          <div className="ws__value"><Figure value={w.seats} /></div>
          <p className="ws__note">Your number. Everything below is computed from it.</p>
        </div>
        <div className="ws__row">
          <div className="ws__rowhead">
            <span className="ws__index">02</span>
            <span className="ws__name">Applications needed</span>
          </div>
          <div className="ws__value"><Figure value={w.applications} testId="seat-output-apps" /></div>
          <p className="ws__note">{fmt.format(w.seats)} seats at {w.yieldPct}% application-to-enrollment yield.</p>
        </div>
        <div className="ws__row">
          <div className="ws__rowhead">
            <span className="ws__index">03</span>
            <span className="ws__name">Inquiries needed</span>
          </div>
          <div className="ws__value ws__value--range">
            <Figure value={w.inquiries.low} /> <span className="ws__to">to</span> <Figure value={w.inquiries.high} />
          </div>
          <RangeBar low={w.inquiries.low} high={w.inquiries.high} points={points('inquiries')} label="Inquiries needed, by campaign" />
          <p className="ws__note">
            At the application rates the three campaigns reported ({w.scenarios.map((s) => `${s.campaign.shortName} ${Math.round(s.campaign.applicationRate * 100)}%`).join(', ')}).
          </p>
        </div>
        <div className="ws__row">
          <div className="ws__rowhead">
            <span className="ws__index">04</span>
            <span className="ws__name">Media budget at those campaigns' cost per lead</span>
          </div>
          <div className="ws__value ws__value--range">
            <Figure value={w.budget.low} money /> <span className="ws__to">to</span> <Figure value={w.budget.high} money />
          </div>
          <RangeBar low={w.budget.low} high={w.budget.high} points={points('budget')} money label="Media budget, by campaign" />
          <p className="ws__note">
            Inquiries multiplied by each campaign's average cost per lead ({w.scenarios.map((s) => `${s.campaign.shortName} ${fmtMoney.format(s.campaign.costPerLead)}`).join(', ')}). Media only; no fees.
          </p>
        </div>
      </div>

      <p className="ws__disclaimer">
        Arithmetic on three published FilmTwist campaigns, 2021 to 2023. Historical results from other schools, not a forecast for yours and not a guarantee.
        Your market, grades and timing change every line. That is what the first call is for.
      </p>
    </div>
  );
}
