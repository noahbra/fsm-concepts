/**
 * Custom vector town for The Invisible School. Four layers:
 *  bg  (sky, hills, distant school)      parallax 0.3x in scroll mode
 *  mid (street, buildings, school, sign) 1x, desaturated by a mix-blend "mute" rect until color spreads
 *  top (signage, posters, glow, family dots) 1x, never muted
 *  fg  (fence, lamppost, tumbleweed)      1.4x
 * Scroll mode renders each layer as its own <svg> so GSAP can translate them in pixels.
 * Static mode (reduced motion) composes all four in one <svg> with a cropped viewBox and a data-state.
 * Purely decorative: every <svg> is aria-hidden; the narrative is in DOM text.
 */

export type SceneState = 'quiet' | 'signage' | 'spreading' | 'full';

const FAM_COLORS = ['#32b67a', '#3d6ea3', '#22cf50', '#3da39b', '#f0b429', '#e9643b'];

/** Family dots: first 5 live near the posters (beat 3), the rest gather near the school (beats 4-5). */
export const FAMILY_DOTS: { cx: number; cy: number; r: number; group: 'poster' | 'left' | 'right' }[] = [
  ...[2350, 2480, 2620, 2760, 2880].map((cx, i) => ({ cx, cy: 748 - (i % 2) * 6, r: 16, group: 'poster' as const })),
  ...Array.from({ length: 10 }, (_, i) => ({ cx: 3260 + i * 36, cy: 740 + (i % 3) * 10, r: 15, group: 'left' as const })),
  ...Array.from({ length: 11 }, (_, i) => ({ cx: 3640 + i * 34, cy: 742 + (i % 3) * 9, r: 15, group: 'right' as const })),
];

function House({ x, w, h, fill, roof, door = true }: { x: number; w: number; h: number; fill: string; roof: string; door?: boolean }) {
  const y = 720 - h;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} />
      <polygon points={`${x - 12},${y} ${x + w / 2},${y - 70} ${x + w + 12},${y}`} fill={roof} />
      {door && <rect x={x + w / 2 - 16} y={720 - 56} width={32} height={56} rx={3} fill="#5b6b7c" />}
      <rect x={x + 18} y={y + 28} width={30} height={34} rx={2} fill="#bcd6ea" />
      <rect x={x + w - 48} y={y + 28} width={30} height={34} rx={2} fill="#bcd6ea" />
    </g>
  );
}

function Tree({ x, s = 1 }: { x: number; s?: number }) {
  return (
    <g transform={`translate(${x} 720) scale(${s})`}>
      <rect x={-6} y={-60} width={12} height={60} fill="#8b6b4a" />
      <circle cx={0} cy={-80} r={42} fill="#5fbf7a" />
      <circle cx={-26} cy={-62} r={30} fill="#4ea86a" />
      <circle cx={28} cy={-66} r={28} fill="#6fcb88" />
    </g>
  );
}

function SideStreet({ x }: { x: number }) {
  return <polygon points={`${x + 20},440 ${x + 60},440 ${x + 110},740 ${x - 30},740`} fill="#9aa3b2" />;
}

export function BgLayer() {
  return (
    <g className="w-bg-g">
      <rect x={0} y={0} width={7000} height={900} fill="url(#story-sky)" />
      <circle cx={560} cy={170} r={70} fill="#ffe08a" />
      {/* far hills */}
      <path d="M0 640 C 400 520, 800 560, 1200 600 S 2000 520, 2600 600 S 3400 540, 4000 620 S 4800 560, 5600 620 S 6600 600, 7000 640 L7000 900 L0 900Z" fill="#bcd7c6" />
      {/* distant school on the hill: lovely, quiet, far away */}
      <g transform="translate(1180 470)">
        <rect x={0} y={60} width={200} height={70} fill="#f3e3c9" />
        <polygon points="-10,60 100,10 210,60" fill="#3d6ea3" />
        <rect x={86} y={30} width={28} height={30} fill="#f3e3c9" />
        <rect x={92} y={0} width={4} height={34} fill="#555" />
        <polygon points="96,0 130,8 96,16" fill="#32b67a" />
        {[18, 58, 130, 170].map((wx) => <rect key={wx} x={wx} y={78} width={18} height={22} fill="#9ec5e6" />)}
        <rect x={90} y={96} width={20} height={34} fill="#2b527c" />
      </g>
      <path d="M0 720 C 300 650, 700 680, 1000 700 S 1700 640, 2200 700 S 3000 660, 3600 710 S 4300 650, 5000 700 S 6200 660, 7000 720 L7000 900 L0 900Z" fill="#9fcbb0" />
      {[300, 900, 2000, 2900, 4300, 5200, 6100].map((x) => <Tree key={x} x={x} s={0.6} />)}
      <rect className="w-mute" x={0} y={0} width={7000} height={900} fill="#c9ced6" style={{ mixBlendMode: 'saturation' }} />
    </g>
  );
}

export function MidLayer() {
  return (
    <g className="w-mid-g">
      <rect x={0} y={700} width={5200} height={200} fill="#cfe6d4" />
      <rect x={0} y={720} width={5200} height={22} fill="#dfe3e8" />
      <rect x={0} y={742} width={5200} height={70} fill="#7f8898" />
      <line x1={0} y1={777} x2={5200} y2={777} stroke="#e8e8e8" strokeWidth={4} strokeDasharray="60 40" />
      {/* quiet neighborhood */}
      <House x={180} w={190} h={210} fill="#e8d7c3" roof="#7d8ba3" />
      <House x={420} w={160} h={170} fill="#d6dfeb" roof="#5f6f8a" />
      <House x={640} w={220} h={250} fill="#efdede" roof="#8a6f7a" />
      <Tree x={940} />
      <House x={1020} w={180} h={190} fill="#dde7d2" roof="#6c8a6a" />
      <House x={1240} w={150} h={150} fill="#e8d7c3" roof="#7d8ba3" />
      {/* blank sign (board gets a colorful banner from the top layer) */}
      <g className="w-sign">
        <rect x={1496} y={600} width={10} height={122} fill="#8b6b4a" />
        <rect x={1436} y={534} width={130} height={76} rx={6} fill="#f4f4f2" stroke="#9aa0a6" strokeWidth={3} />
      </g>
      <Tree x={1640} s={0.9} />
      {/* poster wall */}
      <rect x={1700} y={470} width={440} height={250} fill="#e3d9cb" />
      <rect x={1700} y={470} width={440} height={18} fill="#b8a98f" />
      <House x={2200} w={200} h={220} fill="#d6dfeb" roof="#5f6f8a" />
      <Tree x={2470} />
      {/* shops with a wayfinding post */}
      <House x={2540} w={240} h={200} fill="#f1e2c8" roof="#a0785a" door={false} />
      <rect x={2560} y={560} width={200} height={100} rx={4} fill="#bcd6ea" />
      <House x={2830} w={200} h={240} fill="#dde7d2" roof="#6c8a6a" />
      <SideStreet x={3080} />
      {/* the school */}
      <g className="w-school">
        <rect x={3300} y={480} width={600} height={240} fill="#f5e6cc" />
        <rect x={3300} y={480} width={600} height={14} fill="#3d6ea3" />
        <polygon points="3288,480 3600,380 3912,480" fill="#3d6ea3" />
        <rect x={3556} y={392} width={88} height={88} fill="#f5e6cc" />
        <polygon points="3546,392 3600,340 3654,392" fill="#2b527c" />
        <circle cx={3600} cy={436} r={22} fill="#fff" stroke="#2b527c" strokeWidth={4} />
        <line x1={3600} y1={436} x2={3600} y2={422} stroke="#2b527c" strokeWidth={3} />
        <line x1={3600} y1={436} x2={3610} y2={440} stroke="#2b527c" strokeWidth={3} />
        <rect x={3598} y={286} width={4} height={56} fill="#555" />
        <polygon className="w-flag" points="3602,286 3650,296 3602,308" fill="#32b67a" />
        {[0, 1].map((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => {
            const wx = 3330 + col * 96 + (col > 2 ? 44 : 0);
            return <rect key={`${row}-${col}`} className="w-win" x={wx} y={520 + row * 84} width={44} height={54} rx={3} fill="#9ec5e6" />;
          }),
        )}
        <rect className="w-door" x={3572} y={640} width={56} height={80} rx={4} fill="#2b527c" />
        <rect x={3540} y={520} width={120} height={40} rx={4} fill="#2b527c" />
        <text x={3600} y={549} textAnchor="middle" fontFamily="Josefin Sans Variable, Josefin Sans, sans-serif" fontWeight={700} fontSize={26} fill="#fff" letterSpacing={3}>SCHOOL</text>
        <rect x={3560} y={722} width={80} height={6} fill="#dfe3e8" />
      </g>
      <Tree x={3240} s={0.8} />
      <Tree x={3960} s={0.8} />
      <SideStreet x={4080} />
      <House x={4240} w={180} h={200} fill="#efdede" roof="#8a6f7a" />
      <House x={4470} w={200} h={230} fill="#e8d7c3" roof="#7d8ba3" />
      <Tree x={4720} />
      <House x={4800} w={170} h={170} fill="#d6dfeb" roof="#5f6f8a" />
      <rect className="w-mute" x={0} y={0} width={5200} height={900} fill="#c9ced6" style={{ mixBlendMode: 'saturation' }} />
    </g>
  );
}

export function TopLayer() {
  return (
    <g className="w-top-g">
      {/* colorful banner that replaces the blank sign */}
      <g className="w-banner">
        <rect x={1436} y={534} width={130} height={76} rx={6} fill="#32b67a" />
        <text x={1501} y={566} textAnchor="middle" fontFamily="Josefin Sans Variable, Josefin Sans, sans-serif" fontWeight={700} fontSize={22} fill="#fff">OUR</text>
        <text x={1501} y={594} textAnchor="middle" fontFamily="Josefin Sans Variable, Josefin Sans, sans-serif" fontWeight={700} fontSize={22} fill="#fff">SCHOOL</text>
      </g>
      {/* posters on the wall */}
      {[1740, 1850, 1960, 2070].map((x, i) => (
        <g key={x} className="w-signal">
          <rect x={x} y={520} width={76} height={100} rx={4} fill={['#3d6ea3', '#22cf50', '#3da39b', '#32b67a'][i]} />
          <rect x={x + 10} y={534} width={56} height={40} rx={3} fill="#fff" opacity={0.85} />
          <rect x={x + 10} y={586} width={40} height={6} rx={3} fill="#fff" />
          <rect x={x + 10} y={598} width={28} height={6} rx={3} fill="#fff" />
        </g>
      ))}
      {/* wayfinding sign */}
      <g className="w-signal">
        <rect x={2496} y={590} width={8} height={132} fill="#8b6b4a" />
        <polygon points="2440,566 2560,566 2580,588 2560,610 2440,610" fill="#3d6ea3" />
        <text x={2500} y={595} textAnchor="middle" fontFamily="Josefin Sans Variable, Josefin Sans, sans-serif" fontWeight={700} fontSize={20} fill="#fff">TOURS</text>
      </g>
      {/* a phone with a search result, floating above the shops */}
      <g className="w-signal">
        <rect x={2640} y={330} width={120} height={210} rx={18} fill="#fff" stroke="#3d6ea3" strokeWidth={6} />
        <rect x={2656} y={356} width={88} height={24} rx={12} fill="#e8eff7" />
        <circle cx={2670} cy={368} r={6} fill="none" stroke="#3d6ea3" strokeWidth={3} />
        <rect x={2656} y={396} width={88} height={54} rx={6} fill="#e4f6ec" />
        <rect x={2664} y={404} width={60} height={8} rx={4} fill="#32b67a" />
        <rect x={2664} y={420} width={72} height={6} rx={3} fill="#9fcbb0" />
        <rect x={2664} y={432} width={48} height={6} rx={3} fill="#9fcbb0" />
        <rect x={2656} y={462} width={88} height={54} rx={6} fill="#e8eff7" />
        <rect x={2664} y={470} width={50} height={8} rx={4} fill="#3d6ea3" />
        <rect x={2664} y={486} width={72} height={6} rx={3} fill="#bcd6ea" />
      </g>
      {/* lightbox over the shop door */}
      <g className="w-signal">
        <rect x={2860} y={470} width={180} height={60} rx={8} fill="#3da39b" />
        <text x={2950} y={509} textAnchor="middle" fontFamily="Josefin Sans Variable, Josefin Sans, sans-serif" fontWeight={700} fontSize={26} fill="#fff" letterSpacing={2}>ENROLL</text>
      </g>
      {/* school windows glow */}
      {[0, 1].map((row) =>
        [0, 1, 2, 3, 4, 5].map((col) => {
          const wx = 3330 + col * 96 + (col > 2 ? 44 : 0);
          return <rect key={`g${row}-${col}`} className="w-glow" x={wx} y={520 + row * 84} width={44} height={54} rx={3} fill="#ffd36b" />;
        }),
      )}
      <rect className="w-glow" x={3572} y={640} width={56} height={80} rx={4} fill="#ffb84d" />
      {/* families */}
      <g className="w-dots">
        {FAMILY_DOTS.map((d, i) => (
          <circle key={i} className={`w-fam w-fam--${d.group}`} cx={d.cx} cy={d.cy} r={d.r} fill={FAM_COLORS[i % FAM_COLORS.length]} />
        ))}
      </g>
    </g>
  );
}

export function FgLayer() {
  return (
    <g className="w-fg-g">
      {[60, 140, 220, 300, 380].map((x) => <rect key={x} x={x} y={760} width={14} height={60} rx={3} fill="#a98b66" />)}
      <rect x={50} y={776} width={350} height={8} fill="#a98b66" />
      <g className="w-tumble" transform="translate(1500 790)">
        <circle r={28} fill="none" stroke="#b59a6a" strokeWidth={5} strokeDasharray="14 9" />
        <circle r={16} fill="none" stroke="#b59a6a" strokeWidth={4} strokeDasharray="7 7" />
        <line x1={-24} y1={-10} x2={24} y2={10} stroke="#b59a6a" strokeWidth={3} />
        <line x1={-10} y1={24} x2={10} y2={-24} stroke="#b59a6a" strokeWidth={3} />
      </g>
      <g transform="translate(2300 0)">
        <rect x={-5} y={560} width={10} height={260} fill="#4a5261" />
        <rect x={-26} y={540} width={52} height={28} rx={6} fill="#4a5261" />
      </g>
      {[3000, 3060].map((x) => <circle key={x} cx={x} cy={800} r={30} fill="#7fbf8f" />)}
      <g transform="translate(4000 0)">
        <rect x={-5} y={560} width={10} height={260} fill="#4a5261" />
        <rect x={-26} y={540} width={52} height={28} rx={6} fill="#4a5261" />
      </g>
      {[4800, 4900, 5000, 5100].map((x) => <rect key={x} x={x} y={760} width={14} height={60} rx={3} fill="#a98b66" />)}
    </g>
  );
}

export function SkyDefs() {
  return (
    <defs>
      <linearGradient id="story-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#dbeaf6" />
        <stop offset="1" stopColor="#f7fbff" />
      </linearGradient>
    </defs>
  );
}

/** One composed scene for the static (reduced-motion) frames. */
export function StaticScene({ state, viewBox, className }: { state: SceneState; viewBox: string; className?: string }) {
  return (
    <svg className={`town town--static ${className ?? ''}`} data-state={state} viewBox={viewBox} aria-hidden="true" focusable="false">
      <SkyDefs />
      <BgLayer />
      <MidLayer />
      <TopLayer />
      <FgLayer />
    </svg>
  );
}
