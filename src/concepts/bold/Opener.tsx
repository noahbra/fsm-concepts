import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { prefersReducedMotion } from '../../lib/motion';

gsap.registerPlugin(MorphSVGPlugin);

/**
 * The opener: the FSM mark as FilmTwist animates it at the top of their module videos, shortened for the web, then the
 * statement, then the page. A kit-blue dot bounces across a white field, squashes into the hand, the leaves grow out of
 * it while the wordmark wipes in, the headline rises under the mark, and the whole field slides up off a page that was
 * rendered underneath from the first paint. About 3.9 seconds; any scroll, tap, click or key skips it.
 *
 * It plays on every load while the site is in review (`REPLAY_EVERY_LOAD`), once per session at launch, never under reduced motion, and `?opener=1` / `?opener=0` force it on
 * or off for captures and tests. The overlay is decorative (`aria-hidden`); the H1, the sections and the form are in the
 * document the whole time, so assistive tech, search and the LCP measurement see the page, not the overlay.
 *
 * Paths and gradient stops are the brand kit's emblem (`fsm-emblem-color.svg`); the hand and the leaves are its two paths.
 */
export const OPENER_KEY = 'fsm-bold-opener-seen';
/**
 * Review mode (October 29, 2026, project owner's call): the opener replays on every load so reviewers who refresh see it
 * again. At launch set this to false and it plays once per session: the flag below is then written after the first play.
 * A page that sets the flag itself (the test suite, `?opener=0`) still suppresses it in either mode.
 */
export const REPLAY_EVERY_LOAD = true;
export const OPENER_DURATION = 4.0;

const HAND = 'M666,816.5c1.1,0.7,1.4,1,1.8,1.1c29.4,9.5,58.7,19.1,88.2,28.3c16.1,5,32.3,10.4,49.4,8.9c8.6-0.7,17.4-2.7,25.4-6c20.7-8.3,37.9-22.6,56-35.2c18-12.6,35.7-25.5,53.8-37.9c19.6-13.5,40.5-24.6,64.5-27.9c7.9-1.1,16-1.1,24-0.7c4.3,0.2,8.8,1.9,12.8,3.8c11.5,5.3,15.4,13.3,11.2,25.2c-2.9,8-6.8,16.1-11.9,22.8c-12.4,16-26,31-38.6,46.9c-8.6,10.7-16.8,21.8-24.3,33.3c-17.1,26.4-39.5,47.8-62.9,68.4c-23.1,20.5-48.2,38.2-74.8,53.8c-18,10.5-37.2,18.8-57.2,24.9c-11.1,3.3-22.1,2.1-33-0.1c-20.3-4.1-40.5-8.4-60.6-13.4c-35.5-8.9-70.9-18.5-106.3-27.8c-15.7-4.1-31.3-8.4-47-12.4c-2.6-0.6-5.5-0.4-8.2,0.2c-27,5.3-54,10.6-80.9,16.4c-14.8,3.1-27.6-0.2-39.8-8.8c-18.1-12.8-31.8-29.3-42.2-48.6c-16.3-30.3-24.4-62.3-19.4-96.9c1.9-13.2,6.3-25.2,16.4-34.5c5.2-4.8,10.2-10.1,16.1-13.9c30.3-20.1,61.2-39.1,94.1-54.7c20.4-9.7,41.7-17.8,63.9-21.5c18.2-3,36.9-3.4,55.4-4.5c55.4-3.4,110.6-0.1,165.7,5.2c22.4,2.1,44.7,5.6,67.1,8.8c8,1.1,15.7,3.4,21.9,9.2c13.1,12.2,13.2,32.5,0.8,46.3c-19.3,21.5-43.3,32.4-72,34.7c-19.9,1.6-39.8,1.9-59.7,0.6c-15.5-1-30.9-0.8-45.8,4.8C669,815.4,667.8,815.8,666,816.5z';
const LEAVES = 'M686.6,498.5c0.4-0.5,0.8-0.9,1-1.4c26.6-46.7,65.8-79.9,112.9-104.1c54.7-28.1,113.1-40.8,174.6-38.9c2.3,0.1,4.6,0.3,7.6,0.5c-0.8,6.4-1.3,12.7-2.4,18.8c-7.2,38.4-22.9,73.3-44.6,105.6c-34.6,51.5-76.1,96.5-126.7,132.8c-18,12.9-37.2,23.9-57.8,32c-8.9,3.5-18,5.5-27.6,5c-8.4-0.5-11.7-2.9-13.9-11c-3.6-13-2.1-26.1,0.6-39c3.8-18.4,11.7-35.1,21.1-51.2c0.9-1.5,1.8-3.1,2-5c-0.6,0.6-1.4,1.1-1.9,1.8c-21,24.5-34.6,52.3-36.9,84.8c-1.2,16.5,1.1,32.6,12.7,45.6c4.5,5,10.5,8.8,15.3,12.7c-14.4,3.1-29.5-3.3-40-17.7c-7.9-10.9-15.8-21.8-23.8-32.5c-11-14.8-26.4-24.4-41.8-34.1c17.2,22,36.2,42.9,46,70.6c-2.7,0.3-4.7,0.6-6.8,0.7c-29.9,0.8-56.6-8.1-80-26.9c-14.2-11.4-27.1-24.1-37.5-39c-12.7-18.1-24.4-37-37-56.1c1.5-0.2,2.1-0.4,2.7-0.4c36.5,4.9,72.7,10.9,107.3,24.5c20.1,7.9,36.9,20.6,52.8,34.6c0.7,0.6,1.3,1.2,2.2,2c0.3-0.6,0.6-1,0.5-1.3c-4.6-21.6-2-43.4-1.9-65.2c0.2-21.3-2-42.2-8.6-62.5c-0.6-1.9-1.4-3.8-2.1-5.6c-0.2-0.4-0.5-0.7-1.3-1.7c4.2,22.8,6.2,45.1,5.4,68.1c-9.4-3.8-17.1-9.2-23-17c-22.9-30.6-32-64.9-26.6-102.6c2.9-19.7,7.4-39.1,10.9-58.8c1.4-7.7,1.8-15.6,2.7-23.4c0.5-0.5,1-0.9,1.5-1.4c1.1,1.8,2.1,3.7,3.4,5.3c10.3,13.3,21.3,26.1,30.6,40.1c6.6,9.9,12.2,20.8,16.1,32.1C683.1,444.8,688.1,471,686.6,498.5z';
/** Where the dot lands and becomes the hand, in the emblem's 1370-unit space: the hand's visual center and a dot that reads as the video's. */
const DOT = { cx: 745, cy: 830, r: 105 };
const STEM = '690 520';

function shouldShow(): boolean {
  if (typeof window === 'undefined') return false;
  const q = new URLSearchParams(window.location.search).get('opener');
  if (q === '0') return false;
  if (q === '1') return true;
  if (prefersReducedMotion()) return false;
  try { if (sessionStorage.getItem(OPENER_KEY)) return false; } catch { /* storage blocked: play it */ }
  return true;
}

declare global {
  interface Window { __fsmOpener?: { seek(t: number): void; duration: number } }
}

const LINES: Array<{ text: string; cls: string }> = [
  { text: 'FULL SCHOOL', cls: 'cr-opener-l1' },
  { text: 'MARKETING', cls: 'cr-opener-l2' },
];

export function Opener() {
  const [show, setShow] = useState(shouldShow);
  const overlay = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const hand = useRef<SVGPathElement>(null);
  const leaves = useRef<SVGPathElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const statement = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!show) return;
    const ov = overlay.current, d = dot.current, s = svg.current, h = hand.current, l = leaves.current, w = word.current, st = statement.current;
    if (!ov || !d || !s || !h || !l || !w || !st) return;
    const html = document.documentElement;
    html.classList.add('cr-opener-lock', 'cr-opener-playing');
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      if (!REPLAY_EVERY_LOAD) { try { sessionStorage.setItem(OPENER_KEY, '1'); } catch { /* ignore */ } }
      html.classList.remove('cr-opener-lock', 'cr-opener-playing');
      gsap.set('.cr-header, .review-ribbon, .review-pill', { clearProps: 'opacity' });
      delete window.__fsmOpener;
      setShow(false);
    };

    // The dot ends exactly where the hand's circle sits, so the swap from DOM dot to SVG path is invisible.
    const box = s.getBoundingClientRect();
    const k = box.width / 1370;
    const cx = box.left + DOT.cx * k, cy = box.top + DOT.cy * k, size = DOT.r * 2 * k;
    gsap.set(d, { width: size, height: size, x: -size, y: cy - size / 2 - window.innerHeight * 0.3, xPercent: -50, yPercent: -50 });
    const circle = `M${DOT.cx - DOT.r},${DOT.cy} a${DOT.r},${DOT.r} 0 1,0 ${DOT.r * 2},0 a${DOT.r},${DOT.r} 0 1,0 ${-DOT.r * 2},0 Z`;
    gsap.set(h, { attr: { d: circle }, autoAlpha: 0 });
    const letters = Array.from(w.querySelectorAll<HTMLElement>('.cr-opener-letter'));

    const floor = cy, startX = -size, startY = cy - window.innerHeight * 0.3;
    const tl = gsap.timeline({ onComplete: finish });
    // 1. Three arcs across the field, each lower than the last, landing on the hand's spot. x is linear; y falls and rises
    //    as plain sequential tweens (a keyframes array stalled at the first apex in Chromium).
    const vh = window.innerHeight;
    tl.fromTo(d, { x: startX, y: startY }, { x: cx, duration: 1.2, ease: 'none' }, 0);
    const arcs: Array<[number, number]> = [[floor, 0.3], [floor - vh * 0.22, 0.22], [floor, 0.22], [floor - vh * 0.11, 0.14], [floor, 0.14], [floor - vh * 0.04, 0.09], [floor, 0.09]];
    let at = 0;
    arcs.forEach(([y, duration], i) => { tl.to(d, { y, duration, ease: i % 2 === 0 ? 'power2.in' : 'power2.out' }, at); at += duration; });
    for (const t of [0.3, 0.74, 1.02]) {
      tl.to(d, { scaleX: 1.3, scaleY: 0.7, duration: 0.06 }, t);
      tl.to(d, { scaleX: 1, scaleY: 1, duration: 0.1 }, t + 0.06);
    }
    // 2. The dot becomes the hand.
    tl.set(d, { autoAlpha: 0 }, 1.2);
    tl.set(h, { autoAlpha: 1 }, 1.2);
    tl.to(h, { morphSVG: { shape: HAND, shapeIndex: 'auto' }, duration: 0.4, ease: 'power2.inOut' }, 1.2);
    // 3. The leaves grow from the stem while the wordmark rises in, letter by letter.
    tl.fromTo(l, { scale: 0, opacity: 0, svgOrigin: STEM }, { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.6)', svgOrigin: STEM }, 1.45);
    tl.fromTo(letters, { y: '0.5em', opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.028, ease: 'power2.out' }, 1.5);
    // 4. The statement.
    tl.fromTo(st, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 2.45);
    // 5. The field slides up and the page is there.
    // 5. The landing: the mark and wordmark shrink and glide into the header's logo spot while the statement fades, the white
    //    field dissolves to reveal the page, and the header fades in around the logo that just arrived. One logo, one motion.
    const landing = (duration: number) => {
      const seq = gsap.timeline();
      const mark = w.parentElement as HTMLElement; // .cr-opener-mark: the svg and the wordmark together
      // Measured when the landing tween first renders (function-based values), not when the timeline is built: at build time
      // the brand font may not have loaded, and a wider fallback wordmark shifts the centered mark by tens of pixels.
      let aimed: { x: number; y: number; scale: number } | null = null;
      const aim = () => {
        if (aimed) return aimed;
        const target = document.querySelector<HTMLElement>('.cr-header .cr-logo img');
        const g = mark.getBoundingClientRect(), sv = s.getBoundingClientRect();
        if (!target || g.width === 0) return (aimed = { x: 0, y: 0, scale: 1 });
        const t = target.getBoundingClientRect();
        const scale = t.height / g.height;
        // left edges align so the hand lands exactly on the header logo's hand; the mark box can be wider than its content, so aim the svg itself
        return (aimed = { x: t.left - g.left - (sv.left - g.left) * scale, y: t.top - g.top, scale });
      };
      seq.to(mark, { x: () => aim().x, y: () => aim().y, scale: () => aim().scale, transformOrigin: '0 0', duration: duration * 0.8, ease: 'power3.inOut' }, 0);
      seq.to(st, { opacity: 0, y: -12, duration: duration * 0.35, ease: 'power2.in' }, 0);
      // the field stays white until the mark is most of the way up, then dissolves to the page beneath
      seq.to(ov, { backgroundColor: 'rgba(255,255,255,0)', duration: duration * 0.45, ease: 'power2.inOut' }, duration * 0.55);
      // once the mark has landed, the header (and, in review, the ribbon and pill) fades in around it; a tween, not a class
      // flip, so a seek shows the same frame a viewer gets. finish() clears the inline opacity after the class comes off.
      const chrome = Array.from(document.querySelectorAll<HTMLElement>('.cr-header, .review-ribbon, .review-pill'));
      seq.to(chrome, { opacity: 1, duration: 0.4, ease: 'power2.out' }, duration * 0.8);
      seq.to(mark, { opacity: 0, duration: duration * 0.2, ease: 'power1.in' }, duration * 0.8);
      return seq;
    };
    tl.add(landing(0.75), OPENER_DURATION - 0.75);

    const skip = () => {
      if (done) return;
      tl.kill();
      landing(0.35).eventCallback('onComplete', finish);
    };
    const opts: AddEventListenerOptions = { passive: true };
    window.addEventListener('wheel', skip, opts);
    window.addEventListener('touchstart', skip, opts);
    window.addEventListener('pointerdown', skip, opts);
    window.addEventListener('keydown', skip, opts);
    window.__fsmOpener = { seek: (t) => { tl.pause(t); }, duration: OPENER_DURATION }; // returns nothing: a timeline handed back through page.evaluate serializes a cyclic graph and kills the renderer
    return () => {
      window.removeEventListener('wheel', skip);
      window.removeEventListener('touchstart', skip);
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
      tl.kill();
      html.classList.remove('cr-opener-lock', 'cr-opener-playing');
      gsap.set('.cr-header, .review-ribbon, .review-pill', { clearProps: 'opacity' });
      delete window.__fsmOpener;
    };
  }, [show]);

  if (!show) return null;
  return (
    <div className="cr-opener" ref={overlay} aria-hidden="true" data-testid="opener">
      <div className="cr-opener-dot" ref={dot} />
      <div className="cr-opener-stage">
        <div className="cr-opener-mark">
          <svg ref={svg} viewBox="0 0 1370 1370" focusable="false">
            <defs>
              <linearGradient id="cr-opener-leaf" gradientUnits="userSpaceOnUse" x1="743.4976" y1="700.004" x2="741.0678" y2="218.9821">
          <stop offset="0" stopColor="#3BA794" />
          <stop offset="0.1374" stopColor="#34B380" />
          <stop offset="0.3581" stopColor="#2AC365" />
          <stop offset="0.5547" stopColor="#24CD55" />
          <stop offset="0.7061" stopColor="#22D04F" />
              </linearGradient>
            </defs>
            <path ref={hand} fill="#3d6ea3" d="" />
            <path ref={leaves} fill="url(#cr-opener-leaf)" d={LEAVES} style={{ opacity: 0 }} />
          </svg>
          <div className="cr-opener-word" ref={word}>
            {LINES.map((line) => (
              <span key={line.text} className={line.cls}>
                {line.text.split('').map((ch, i) => (
                  <span key={i} className="cr-opener-letter" style={{ opacity: 0 }}>{ch}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
        <p className="cr-opener-statement" ref={statement} style={{ opacity: 0 }}>
          Make your school the one families <em>remember.</em>
        </p>
      </div>
    </div>
  );
}
