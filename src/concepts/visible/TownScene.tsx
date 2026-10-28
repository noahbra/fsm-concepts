/**
 * The town for The Invisible School, drawn as layered paper cut-outs. Every fill is a CSS custom
 * property so the whole scene can move from a quiet, desaturated dusk to full brand color as one
 * continuous tween (scroll mode) or sit at a fixed point on that journey (static frames).
 *
 *  bg   (sky, clouds, hills)             parallax 0.15x
 *  back (distant rooftops, tree line)    parallax 0.45x
 *  mid  (street, houses, shops, school)  1x
 *  top  (ads, landing page, email, families, bunting, window glow) 1x, drawn in brand color
 *  fg   (lamps, bench, bushes)           parallax 1.5x
 *
 * Purely decorative: every <svg> is aria-hidden; the narrative lives in DOM text.
 */
import type { CSSProperties, ReactNode } from 'react';

export type SceneState = 'quiet' | 'signage' | 'spreading' | 'full';

/** Ground line in scene units (viewBox height is 900). */
export const GY = 700;
export const LAYER_WIDTH = { bg: 7000, back: 6400, mid: 5600, fg: 8400 } as const;

export const PALETTE = {
  // Concept 05: the quiet state leans on the kit's blue and teal tints (#e8eff7, #e2f2f0) instead of neutral gray,
  // so the brand is present before the color arrives. Everything else on the journey is unchanged.
  quiet: {
    '--sky-top': '#cfdae6', '--sky-bot': '#e8eff7', '--cloud': '#e2f2f0', '--sun': 'rgba(255,224,138,0)',
    '--hill-far': '#b9c9cf', '--hill': '#a7bbbf', '--far-bld': '#9eacb8', '--far-tree': '#93a5ab',
    '--b1': '#c8cfd6', '--b2': '#b8c0c9', '--b3': '#d4dae0', '--roof': '#7e8894', '--roof2': '#8a949f',
    '--win': '#adb7c2', '--door': '#6f7985', '--awning': '#909aa6', '--walk': '#c1c8d0', '--road': '#89929d',
    '--grass': '#abb6b8', '--tree': '#95a4a8', '--trunk': '#818b95', '--school': '#d1d7dd', '--school-roof': '#73818d',
    '--school-trim': '#bbc3cb', '--fg': '#6e7884', '--bush': '#8b9a9d', '--sign': '#a0aab6', '--clock': '#e3e8ec',
  },
  day: {
    '--sky-top': '#b7dbf3', '--sky-bot': '#eef7fb', '--cloud': '#ffffff', '--sun': 'rgba(255,224,138,1)',
    '--hill-far': '#b2d8c5', '--hill': '#8dc8a5', '--far-bld': '#a6bed5', '--far-tree': '#72b38b',
    '--b1': '#f4e7d3', '--b2': '#dfe9f3', '--b3': '#f7dcd2', '--roof': '#3d6ea3', '--roof2': '#3da39b',
    '--win': '#bfdcef', '--door': '#2b527c', '--awning': '#32b67a', '--walk': '#e6eaee', '--road': '#6e7b8c',
    '--grass': '#a3d6b3', '--tree': '#4ea86a', '--trunk': '#8b6b4a', '--school': '#f8edd9', '--school-roof': '#3d6ea3',
    '--school-trim': '#e5d4b7', '--fg': '#3f4b5a', '--bush': '#5bb37c', '--sign': '#32b67a', '--clock': '#ffffff',
  },
} as const;

export type PaletteVars = Record<keyof typeof PALETTE.quiet, string>;

function parse(c: string): [number, number, number, number] {
  if (c.startsWith('#')) return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16), 1];
  const m = c.match(/rgba?\(([^)]+)\)/)!;
  const [r, g, b, a = '1'] = m[1].split(',').map((s) => s.trim());
  return [+r, +g, +b, +a];
}

/** Linear mix of the two palettes, used by the static frames. t = 0 quiet, 1 day. */
export function mixPalette(t: number): PaletteVars {
  const out = {} as PaletteVars;
  (Object.keys(PALETTE.quiet) as (keyof PaletteVars)[]).forEach((k) => {
    const a = parse(PALETTE.quiet[k]);
    const b = parse(PALETTE.day[k]);
    const v = a.map((x, i) => x + (b[i] - x) * t);
    out[k] = `rgba(${Math.round(v[0])},${Math.round(v[1])},${Math.round(v[2])},${v[3].toFixed(2)})`;
  });
  return out;
}

/**
 * School windows: three each side of the tower and door, mirrored about the building's center (x 3500). Body spans
 * 3220 to 3780; both groups keep a 36 unit margin from the wall and a 40 unit gap to the door (3470 to 3530).
 * (Version 2 derived the right-hand group from a formula that put the last window past the wall.)
 */
const SCHOOL_WIN_X = [3256, 3322, 3388, 3570, 3636, 3702];

const BRAND = { blue: '#3d6ea3', green: '#32b67a', bright: '#22cf50', teal: '#3da39b', ink: '#1f2a33', gold: '#f0b429', coral: '#e9643b' };
const FAM_TONES = [BRAND.teal, BRAND.blue, BRAND.green, BRAND.coral, BRAND.gold, BRAND.bright];
const FONT = 'Josefin Sans Variable, Josefin Sans, sans-serif';

/* ------------------------------------------------------------------ pieces */

function House({ x, w, h, tone, roof = 'var(--roof)', cols = 2 }: { x: number; w: number; h: number; tone: string; roof?: string; cols?: number }) {
  const y = GY - h;
  const peak = Math.min(86, Math.max(48, h * 0.3));
  const winW = 30;
  const gap = (w - cols * winW) / (cols + 1);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={tone} />
      <polygon points={`${x - 10},${y} ${x + w / 2},${y - peak} ${x + w + 10},${y}`} fill={roof} />
      {Array.from({ length: cols }, (_, c) => (
        <rect key={c} x={x + gap + c * (winW + gap)} y={y + 34} width={winW} height={38} rx={2} fill="var(--win)" />
      ))}
      {h > 170 && Array.from({ length: cols }, (_, c) => (
        <rect key={`b${c}`} x={x + gap + c * (winW + gap)} y={y + 108} width={winW} height={38} rx={2} fill="var(--win)" />
      ))}
      <rect x={x + w / 2 - 16} y={GY - 58} width={32} height={58} rx={2} fill="var(--door)" />
    </g>
  );
}

function Shop({ x, w, h, tone, awning = true }: { x: number; w: number; h: number; tone: string; awning?: boolean }) {
  const y = GY - h;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={tone} />
      <rect x={x - 6} y={y - 10} width={w + 12} height={14} rx={2} fill="var(--roof)" />
      {h > 200 && [0, 1, 2].map((c) => <rect key={c} x={x + 24 + c * ((w - 48 - 30) / 2)} y={y + 36} width={30} height={40} rx={2} fill="var(--win)" />)}
      {awning && <rect x={x - 8} y={GY - 118} width={w + 16} height={20} rx={3} fill="var(--awning)" />}
      <rect x={x + 18} y={GY - 94} width={w - 36 - 44} height={74} rx={3} fill="var(--win)" />
      <rect x={x + w - 54} y={GY - 64} width={34} height={64} rx={2} fill="var(--door)" />
    </g>
  );
}

function Tree({ x, s = 1, tone = 'var(--tree)' }: { x: number; s?: number; tone?: string }) {
  return (
    <g transform={`translate(${x} ${GY}) scale(${s})`}>
      <rect x={-7} y={-64} width={14} height={64} rx={3} fill="var(--trunk)" />
      <circle cx={0} cy={-96} r={46} fill={tone} />
      <circle cx={-32} cy={-74} r={32} fill={tone} />
      <circle cx={32} cy={-78} r={30} fill={tone} />
    </g>
  );
}

function Lamp({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x={-5} y={GY - 230} width={10} height={320} rx={3} fill="var(--fg)" />
      <rect x={-24} y={GY - 252} width={48} height={26} rx={7} fill="var(--fg)" />
    </g>
  );
}

function Bench({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} ${GY + 70})`}>
      <rect x={0} y={0} width={150} height={12} rx={4} fill="var(--fg)" />
      <rect x={0} y={-30} width={150} height={10} rx={4} fill="var(--fg)" />
      <rect x={10} y={10} width={8} height={30} fill="var(--fg)" />
      <rect x={132} y={10} width={8} height={30} fill="var(--fg)" />
    </g>
  );
}

function Bush({ x, s = 1 }: { x: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${GY + 110}) scale(${s})`}>
      <circle cx={0} cy={0} r={34} fill="var(--bush)" />
      <circle cx={34} cy={8} r={28} fill="var(--bush)" />
      <circle cx={-32} cy={10} r={26} fill="var(--bush)" />
    </g>
  );
}

function Figure({ x, h, tone }: { x: number; h: number; tone: string }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x={-h * 0.17} y={-h * 0.62} width={h * 0.34} height={h * 0.62} rx={h * 0.17} fill={tone} />
      <circle cx={0} cy={-h * 0.77} r={h * 0.14} fill={tone} />
    </g>
  );
}

/** A family: two adults and, usually, a child. `kind` drives when they appear in the story. */
export function Family({ x, i, kind }: { x: number; i: number; kind: 'ads' | 'left' | 'right' | 'late' }) {
  const t1 = FAM_TONES[i % FAM_TONES.length];
  const t2 = FAM_TONES[(i + 2) % FAM_TONES.length];
  const t3 = FAM_TONES[(i + 4) % FAM_TONES.length];
  return (
    <g className={`w-fam w-fam--${kind}`} transform={`translate(${x} ${GY})`}>
      <g className="w-fam__m">
        <Figure x={-22} h={66} tone={t1} />
        <Figure x={4} h={60} tone={t2} />
        {i % 3 !== 1 && <Figure x={26} h={40} tone={t3} />}
      </g>
    </g>
  );
}

/** Where each family ends up. Left and right groups walk in during beat 4; ads groups appear at the ads. */
export const FAMILIES: { x: number; kind: 'ads' | 'left' | 'right' | 'late' }[] = [
  { x: 2040, kind: 'ads' },
  { x: 2400, kind: 'ads' },
  { x: 3270, kind: 'left' },
  { x: 3350, kind: 'left' },
  { x: 3420, kind: 'left' },
  { x: 3590, kind: 'right' },
  { x: 3660, kind: 'right' },
  { x: 3740, kind: 'right' },
  { x: 3990, kind: 'late' },
];

/* ------------------------------------------------------------------ layers */

export function BgLayer() {
  const W = LAYER_WIDTH.bg;
  return (
    <g className="w-bg-g">
      <circle cx={1500} cy={190} r={70} fill="var(--sun)" />
      {[[380, 170, 1], [1180, 120, 0.8], [2500, 200, 1.1], [3900, 140, 0.9], [5200, 180, 1], [6300, 130, 0.8]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`} fill="var(--cloud)">
          <ellipse cx={0} cy={0} rx={110} ry={34} />
          <ellipse cx={-50} cy={-14} rx={60} ry={40} />
          <ellipse cx={40} cy={-18} rx={70} ry={46} />
        </g>
      ))}
      <path d={`M0 560 C 500 470, 900 520, 1400 540 S 2300 450, 3000 530 S 3900 470, 4600 540 S 5500 470, 6200 530 S 6800 540, ${W} 560 L${W} 900 L0 900Z`} fill="var(--hill-far)" />
      <path d={`M0 660 C 400 600, 800 640, 1200 650 S 2000 590, 2600 650 S 3400 600, 4000 660 S 4900 600, 5600 650 S 6500 620, ${W} 660 L${W} 900 L0 900Z`} fill="var(--hill)" />
    </g>
  );
}

export function BackLayer() {
  const blocks = [
    [80, 180, 150], [300, 120, 110], [520, 220, 190], [900, 160, 130], [1120, 260, 230], [1500, 140, 120], [1720, 200, 160],
    [2100, 240, 210], [2440, 150, 120], [2700, 300, 250], [3160, 170, 140], [3420, 220, 180], [3760, 260, 220], [4120, 150, 110],
    [4360, 230, 190], [4720, 180, 150], [5000, 280, 240], [5400, 160, 120], [5700, 220, 180], [6050, 180, 140],
  ];
  return (
    <g className="w-back-g">
      {blocks.map(([x, w, h], i) => (
        <g key={i} fill="var(--far-bld)">
          <rect x={x} y={GY - h} width={w} height={h} />
          {i % 3 === 0 && <polygon points={`${x - 6},${GY - h} ${x + w / 2},${GY - h - 40} ${x + w + 6},${GY - h}`} />}
        </g>
      ))}
      {[220, 760, 1340, 1960, 2560, 3040, 3620, 4260, 4900, 5560, 6200].map((x) => (
        <g key={x} fill="var(--far-tree)">
          <circle cx={x} cy={GY - 60} r={52} />
          <circle cx={x + 60} cy={GY - 44} r={40} />
          <circle cx={x - 48} cy={GY - 40} r={36} />
        </g>
      ))}
      <rect x={0} y={GY - 10} width={LAYER_WIDTH.back} height={40} fill="var(--far-bld)" />
    </g>
  );
}

export function MidLayer() {
  const W = LAYER_WIDTH.mid;
  return (
    <g className="w-mid-g">
      {/* ground */}
      <rect x={0} y={GY} width={W} height={16} fill="var(--walk)" />
      <rect x={0} y={GY + 16} width={W} height={64} fill="var(--road)" />
      <rect x={0} y={GY + 80} width={W} height={120} fill="var(--grass)" />

      {/* quiet neighborhood */}
      <House x={120} w={200} h={210} tone="var(--b1)" />
      <Tree x={372} s={0.9} />
      <House x={430} w={170} h={170} tone="var(--b2)" roof="var(--roof2)" />
      <House x={660} w={250} h={260} tone="var(--b3)" cols={3} />
      <Tree x={970} />
      <House x={1030} w={190} h={200} tone="var(--b1)" roof="var(--roof2)" />
      {/* the blank sign at the corner */}
      <g className="w-sign">
        <rect x={1256} y={GY - 130} width={10} height={130} rx={2} fill="var(--fg)" />
        <rect x={1166} y={GY - 196} width={190} height={70} rx={8} fill="var(--sign)" />
      </g>
      <House x={1380} w={160} h={160} tone="var(--b2)" />

      {/* main street */}
      <Shop x={1640} w={260} h={230} tone="var(--b2)" />
      <Shop x={1930} w={300} h={300} tone="var(--b1)" />
      <Shop x={2260} w={220} h={220} tone="var(--b3)" />
      <Tree x={2540} s={0.85} />
      {/* bus shelter */}
      <g className="w-shelter">
        <rect x={2600} y={GY - 200} width={10} height={200} fill="var(--fg)" />
        <rect x={2740} y={GY - 200} width={10} height={200} fill="var(--fg)" />
        <rect x={2580} y={GY - 216} width={190} height={16} rx={4} fill="var(--fg)" />
        <rect x={2612} y={GY - 190} width={126} height={150} rx={4} fill="var(--win)" />
      </g>
      <Shop x={2800} w={280} h={250} tone="var(--b2)" awning={false} />

      {/* the school */}
      <g className="w-school">
        <Tree x={3140} s={1.1} />
        <rect x={3220} y={GY - 300} width={560} height={300} fill="var(--school)" />
        <rect x={3208} y={GY - 310} width={584} height={14} rx={3} fill="var(--school-trim)" />
        <rect x={3220} y={GY - 254} width={560} height={6} fill="var(--school-trim)" />
        <rect x={3450} y={GY - 400} width={100} height={100} fill="var(--school)" />
        <polygon points="3436,300 3500,246 3564,300" fill="var(--school-roof)" />
        <rect x={3498} y={186} width={4} height={62} fill="var(--fg)" />
        <polygon className="w-flag" points="3502,188 3546,198 3502,210" fill="var(--sign)" />
        <circle cx={3500} cy={344} r={24} fill="var(--clock)" />
        <path d="M3500 330 L3500 344 L3510 350" stroke="var(--school-roof)" strokeWidth={3} fill="none" strokeLinecap="round" />
        <text x={3500} y={386} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={14} letterSpacing={3} fill="var(--school-roof)">SCHOOL</text>
        {[0, 1].map((row) =>
          SCHOOL_WIN_X.map((wx, c) => (
            <rect key={`w${row}${c}`} x={wx} y={GY - 236 + row * 100} width={42} height={60} rx={3} fill="var(--win)" />
          )),
        )}
        <rect x={3470} y={GY - 90} width={60} height={90} rx={4} fill="var(--door)" />
        <rect x={3456} y={GY} width={88} height={8} fill="var(--school-trim)" />
        <rect x={3442} y={GY + 8} width={116} height={8} fill="var(--school-trim)" />
        <Tree x={4150} s={1.1} />
      </g>

      {/* after the school: a park and more homes */}
      <House x={4300} w={180} h={190} tone="var(--b3)" roof="var(--roof2)" />
      <Tree x={4560} />
      <House x={4640} w={220} h={230} tone="var(--b1)" />
      <Tree x={4940} s={0.9} />
      <House x={5020} w={160} h={160} tone="var(--b2)" />
      <Tree x={5260} />
      <House x={5340} w={200} h={200} tone="var(--b3)" roof="var(--roof2)" />
    </g>
  );
}

function AdCard({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children: ReactNode }) {
  return (
    <g className="w-signal">
      <rect x={x + 6} y={y + 10} width={w} height={h} rx={14} fill={BRAND.ink} opacity={0.08} />
      <rect x={x} y={y} width={w} height={h} rx={14} fill="#fff" />
      {children}
    </g>
  );
}

export function TopLayer() {
  return (
    <g className="w-top-g">
      {/* the sign comes alive */}
      <g className="w-banner">
        <rect x={1166} y={GY - 196} width={190} height={70} rx={8} fill={BRAND.green} />
        <text x={1246} y={GY - 153} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={20} fill="#fff">OUR SCHOOL</text>
        <polygon points={`1322,${GY - 170} 1342,${GY - 161} 1322,${GY - 152}`} fill="#fff" />
      </g>

      {/* digital ads: a social video ad on a phone */}
      <AdCard x={1960} y={320} w={120} h={210}>
        <rect x={1972} y={344} width={96} height={110} rx={8} fill={BRAND.green} />
        <polygon points="2010,384 2010,414 2036,399" fill="#fff" />
        <rect x={1972} y={466} width={70} height={9} rx={4} fill={BRAND.ink} opacity={0.8} />
        <rect x={1972} y={482} width={96} height={7} rx={3} fill={BRAND.ink} opacity={0.3} />
        <rect x={1972} y={496} width={60} height={7} rx={3} fill={BRAND.ink} opacity={0.3} />
        <rect x={1972} y={512} width={54} height={12} rx={6} fill={BRAND.blue} />
      </AdCard>
      {/* a search result */}
      <AdCard x={2170} y={380} w={240} h={130}>
        <rect x={2186} y={396} width={208} height={28} rx={14} fill="#eef2f6" />
        <circle cx={2204} cy={410} r={7} fill="none" stroke={BRAND.blue} strokeWidth={3} />
        <rect x={2186} y={438} width={208} height={56} rx={8} fill="#e4f6ec" />
        <rect x={2198} y={450} width={120} height={10} rx={5} fill={BRAND.green} />
        <rect x={2198} y={468} width={170} height={7} rx={3} fill={BRAND.ink} opacity={0.3} />
        <rect x={2198} y={480} width={130} height={7} rx={3} fill={BRAND.ink} opacity={0.3} />
      </AdCard>
      {/* a streaming audio spot */}
      <AdCard x={2470} y={330} w={170} h={110}>
        <circle cx={2510} cy={385} r={22} fill={BRAND.teal} />
        <polygon points="2503,373 2503,397 2522,385" fill="#fff" />
        {[10, 22, 14, 28, 18, 24, 12].map((hgt, i) => (
          <rect key={i} x={2548 + i * 12} y={385 - hgt / 2} width={6} height={hgt} rx={3} fill={BRAND.blue} />
        ))}
      </AdCard>
      {/* the bus shelter poster */}
      <g className="w-signal">
        <rect x={2612} y={GY - 190} width={126} height={150} rx={4} fill={BRAND.blue} />
        <rect x={2626} y={GY - 174} width={98} height={70} rx={4} fill="#fff" opacity={0.9} />
        <text x={2675} y={GY - 74} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={18} fill="#fff" letterSpacing={2}>VISIT US</text>
      </g>

      {/* the landing page: contact details and the start of enrollment */}
      <g className="w-landing">
        <rect x={2906} y={300} width={290} height={210} rx={14} fill={BRAND.ink} opacity={0.08} />
        <rect x={2900} y={290} width={290} height={210} rx={14} fill="#fff" />
        <path d="M2900 304 a14 14 0 0 1 14 -14 h262 a14 14 0 0 1 14 14 v14 h-290 z" fill="#eef2f6" />
        {[0, 1, 2].map((i) => <circle key={i} cx={2918 + i * 14} cy={304} r={4} fill={BRAND.ink} opacity={0.25} />)}
        <rect x={2920} y={334} width={160} height={14} rx={6} fill={BRAND.ink} opacity={0.8} />
        <rect x={2920} y={356} width={250} height={8} rx={4} fill={BRAND.ink} opacity={0.3} />
        <rect x={2920} y={382} width={250} height={26} rx={6} fill="#fff" stroke="#c9d2db" strokeWidth={2} />
        <rect x={2920} y={416} width={250} height={26} rx={6} fill="#fff" stroke="#c9d2db" strokeWidth={2} />
        <rect x={2920} y={454} width={210} height={30} rx={15} fill={BRAND.green} />
        <text x={3025} y={474} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={14} fill="#fff" letterSpacing={1}>START ENROLLMENT</text>
      </g>

      {/* the email nudge, for the family that looked but did not apply */}
      <g className="w-mail">
        <g className="w-mail__m">
          <rect x={3954} y={560} width={72} height={48} rx={8} fill={BRAND.blue} />
          <polyline points="3958,566 3990,590 4022,566" fill="none" stroke="#fff" strokeWidth={4} strokeLinejoin="round" />
          <circle cx={4026} cy={562} r={10} fill={BRAND.bright} />
        </g>
      </g>

      {/* the school fills with light */}
      {[0, 1].map((row) =>
        SCHOOL_WIN_X.map((wx, c) => (
          <rect key={`g${row}${c}`} className="w-glow" x={wx} y={GY - 236 + row * 100} width={42} height={60} rx={3} fill="#ffd36b" />
        )),
      )}
      <rect className="w-glow" x={3470} y={GY - 90} width={60} height={90} rx={4} fill="#ffb84d" />
      <g className="w-bunting-g">
        {Array.from({ length: 14 }, (_, i) => (
          <polygon key={i} className="w-bunting" points={`${3222 + i * 40},${GY - 296} ${3262 + i * 40},${GY - 296} ${3242 + i * 40},${GY - 262}`} fill={[BRAND.blue, BRAND.green, BRAND.teal, BRAND.bright][i % 4]} />
        ))}
      </g>
      <g className="w-enroll">
        <rect x={3846} y={GY - 110} width={8} height={110} fill="var(--fg)" />
        <rect x={4074} y={GY - 110} width={8} height={110} fill="var(--fg)" />
        <rect x={3842} y={GY - 100} width={244} height={54} rx={6} fill={BRAND.green} />
        <text x={3964} y={GY - 65} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={22} fill="#fff" letterSpacing={2}>NOW ENROLLING</text>
      </g>

      {/* families */}
      {FAMILIES.map((f, i) => <Family key={i} x={f.x} i={i} kind={f.kind} />)}
    </g>
  );
}

export function FgLayer() {
  return (
    <g className="w-fg-g">
      <Bush x={260} s={1.1} />
      <Lamp x={700} />
      <Bush x={1500} s={0.9} />
      <Bench x={2000} />
      <Lamp x={2900} />
      <Lamp x={4000} />
      <Bush x={4700} />
      <Bush x={5200} s={1.15} />
      <Bench x={5900} />
      <Lamp x={6600} />
      <Bush x={7400} />
      <Lamp x={8100} />
    </g>
  );
}

/** One composed scene for the static (reduced-motion) frames, parked at a point on the quiet-to-day journey. */
export function StaticScene({ state, viewBox, className }: { state: SceneState; viewBox: string; className?: string }) {
  const t = { quiet: 0, signage: 0.25, spreading: 0.6, full: 1 }[state];
  return (
    <svg className={`town town--static ${className ?? ''}`} data-state={state} viewBox={viewBox} aria-hidden="true" focusable="false" style={mixPalette(t) as CSSProperties}>
      <rect x={-2000} y={0} width={10000} height={900} fill="var(--sky-top)" />
      <BgLayer />
      <BackLayer />
      <MidLayer />
      <TopLayer />
      <FgLayer />
    </svg>
  );
}
