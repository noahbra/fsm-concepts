import { useRef } from 'react';
import { seasons, type SeasonId } from './seasons';
import { brand } from '../../content/media';

interface Props { value: SeasonId; onChange: (id: SeasonId) => void }

const CX = 170, CY = 170, R = 126;
const pt = (deg: number, r = R) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
};
const arc = (a0: number, a1: number) => {
  const [x0, y0] = pt(a0); const [x1, y1] = pt(a1);
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${R} ${R} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
};
/** Ring runs clockwise from the top: Sep Oct Nov | Dec Jan Feb | Mar Apr May | Jun Jul Aug */
const MONTHS = ['S', 'O', 'N', 'D', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A'];
const MONTH_NAMES = ['September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];

function Stage({ stage }: { stage: 0 | 1 | 2 | 3 }) {
  if (stage === 3) return <image href={brand.emblemColor} x={CX - 44} y={CY - 44} width={88} height={88} />;
  return (
    <g transform={`translate(${CX} ${CY})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M -30 34 Q 0 42 30 34" stroke="var(--fsm-blue)" strokeWidth="5" />
      <ellipse cx="0" cy="26" rx="9" ry="6" fill="var(--fsm-green-deep)" />
      {stage >= 1 && <path d="M 0 26 C 0 10 0 2 0 -6" stroke="var(--fsm-green)" strokeWidth="4" />}
      {stage >= 1 && <path d="M 0 2 C -10 -2 -18 -10 -16 -20 C -6 -18 0 -10 0 2 Z" fill="var(--fsm-green)" />}
      {stage >= 2 && <path d="M 0 -6 C 0 -16 0 -24 0 -32" stroke="var(--fsm-green)" strokeWidth="4" />}
      {stage >= 2 && <path d="M 0 -8 C 10 -12 20 -22 18 -34 C 6 -32 0 -22 0 -8 Z" fill="var(--fsm-green-bright)" />}
      {stage >= 2 && <path d="M 0 -26 C -12 -30 -22 -40 -18 -52 C -6 -48 0 -38 0 -26 Z" fill="var(--fsm-green)" />}
    </g>
  );
}

export function SeasonDial({ value, onChange }: Props) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const idx = seasons.findIndex((s) => s.id === value);
  const current = seasons[idx];

  const move = (next: number) => {
    const n = (next + seasons.length) % seasons.length;
    onChange(seasons[n].id);
    refs.current[n]?.focus();
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); move(i + 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); move(i - 1); }
    else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onChange(seasons[i].id); }
  };

  return (
    <div className="dial" data-season={value}>
      <svg className="dial__ring" viewBox="0 0 340 340" aria-hidden="true" focusable="false">
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#e6e2d8" strokeWidth="22" />
        {seasons.map((s, i) => (
          <path
            key={s.id}
            d={arc(i * 90 + 2.5, (i + 1) * 90 - 2.5)}
            className={`dial__arc dial__arc--${s.id}${s.id === value ? ' is-active' : ''}`}
            onClick={() => onChange(s.id)}
          />
        ))}
        {MONTHS.map((m, i) => {
          const [x, y] = pt(i * 30 + 15, R + 28);
          const [tx0, ty0] = pt(i * 30, R - 11); const [tx1, ty1] = pt(i * 30, R + 11);
          return (
            <g key={i}>
              <line x1={tx0} y1={ty0} x2={tx1} y2={ty1} stroke="#fbfaf7" strokeWidth="2" />
              <text x={x} y={y} className="dial__month" textAnchor="middle" dominantBaseline="middle">{m}</text>
            </g>
          );
        })}
        <circle cx={CX} cy={CY} r={R - 24} fill="#fff" stroke="#e6e2d8" />
        <Stage stage={current.stage} />
        <text x={CX} y={CY + 70} className="dial__hub-label" textAnchor="middle">{current.monthLabel}</text>
      </svg>

      <div className="dial__controls" role="radiogroup" aria-label="Where is your school in the enrollment year?">
        {seasons.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="radio"
            aria-checked={s.id === value}
            tabIndex={s.id === value ? 0 : -1}
            data-testid="season-control"
            data-season={s.id}
            className={`dial__radio dial__radio--${s.id}`}
            onClick={() => onChange(s.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="dial__radio-season">{s.label}</span>
            <span className="dial__radio-moment">{s.moment}</span>
            <span className="sr-only">, {MONTH_NAMES[i * 3]} to {MONTH_NAMES[i * 3 + 2]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
