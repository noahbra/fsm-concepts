import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brand } from '../../content/media';
import { ctaHref, siteConfig } from '../../content/config';
import { BgLayer, FgLayer, MidLayer, SkyDefs, TopLayer } from './TownScene';

gsap.registerPlugin(ScrollTrigger);

export const BEATS = [
  { id: 1, text: "What if families don't know you're here?" },
  { id: 2, text: "Let's change that." },
  { id: 3, text: 'Give families a reason to notice.' },
  { id: 4, text: 'Turn discovery into connection.' },
  { id: 5, text: 'Great schools deserve to be seen. And chosen.' },
];

/**
 * The pinned, scroll-scrubbed narrative. One ScrollTrigger timeline, built inside gsap.matchMedia so
 * desktop and mobile get their own framing and everything reverts cleanly on unmount.
 * The character is the period of the tagline (a real DOM span), not any letter of the wordmark.
 */
export function StoryScroll({ onRewatchRef }: { onRewatchRef?: (fn: () => void) => void }) {
  const stage = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stageEl = stage.current!;
    const pin = stageEl.querySelector<HTMLElement>('.story__pin')!;
    const lockupWrap = pin.querySelector<HTMLElement>('.story__lockupWrap')!;
    const lockup = pin.querySelector<HTMLElement>('.story__lockup')!;
    const period = pin.querySelector<HTMLElement>('.story-period')!;
    const dot = pin.querySelector<HTMLElement>('.story-dot')!;
    const world = pin.querySelector<HTMLElement>('.story__world')!;
    const bg = world.querySelector<SVGSVGElement>('.w-bg')!;
    const mid = world.querySelector<SVGSVGElement>('.w-mid')!;
    const top = world.querySelector<SVGSVGElement>('.w-top')!;
    const fg = world.querySelector<SVGSVGElement>('.w-fg')!;
    const finalBlock = pin.querySelector<HTMLElement>('.story__final')!;

    onRewatchRef?.(() => {
      const st = ScrollTrigger.getAll().find((t) => t.trigger === stageEl);
      window.scrollTo({ top: st ? st.start : stageEl.offsetTop, behavior: 'smooth' });
    });

    const mm = gsap.matchMedia(stageEl);

    mm.add(
      {
        isDesktop: '(min-width: 760px) and (prefers-reduced-motion: no-preference)',
        isMobile: '(max-width: 759px) and (prefers-reduced-motion: no-preference)',
      },
      (ctx) => {
        const { isMobile } = ctx.conditions as { isMobile: boolean };
        const DOT_FRAC = isMobile ? 0.3 : 0.35; // where the character stands on screen
        const PUSH = isMobile ? 2.2 : 2.8; // camera push toward the period

        /** Live measurements (re-read on every ScrollTrigger refresh via function-based values). */
        const m = () => {
          const W = pin.clientWidth;
          const scale = mid.clientHeight / 900;
          const svgTop = world.offsetTop;
          const ground = svgTop + 752 * scale;
          const px = lockup.offsetLeft + period.offsetLeft + period.offsetWidth / 2;
          const py = lockup.offsetTop + period.offsetTop + period.offsetHeight * 0.8;
          const originX = period.offsetLeft + period.offsetWidth / 2;
          const originY = period.offsetTop + period.offsetHeight * 0.8;
          return { W, scale, ground, px, py, originX, originY };
        };
        const dotScaleAtPeriod = () => Math.max(0.28, (period.offsetWidth * 0.6 * PUSH) / dot.offsetWidth);
        /** Pixel translation of the 1x layers so that svg x lands at screen fraction `frac`. */
        const worldX = (svgX: number, frac: number) => () => {
          const { W, scale } = m();
          return frac * W - svgX * scale;
        };

        const dots = gsap.utils.toArray<SVGCircleElement>('.w-fam', top);
        const posterDots = dots.filter((d) => d.classList.contains('w-fam--poster'));
        const leftDots = dots.filter((d) => d.classList.contains('w-fam--left'));
        const rightDots = dots.filter((d) => d.classList.contains('w-fam--right'));
        const signals = gsap.utils.toArray<SVGGElement>('.w-signal', top);
        const glows = gsap.utils.toArray<SVGRectElement>('.w-glow', top);
        const banner = top.querySelector('.w-banner')!;
        const sign = mid.querySelector('.w-sign')!;
        const tumble = fg.querySelector('.w-tumble')!;
        const mutes = gsap.utils.toArray<SVGRectElement>('.w-mute', world);
        const captions = gsap.utils.toArray<HTMLElement>('.story__caption', pin);

        // Initial states
        gsap.set(dot, { xPercent: -50, yPercent: -50, x: () => m().px, y: () => m().py, scale: dotScaleAtPeriod, opacity: 0, transformOrigin: '50% 100%' });
        gsap.set(world, { opacity: 0 });
        gsap.set([bg, mid, top, fg], { x: 0 });
        gsap.set(mutes, { opacity: 0.85 });
        gsap.set(banner, { opacity: 0, scale: 0.5, transformOrigin: '50% 100%' });
        gsap.set(signals, { opacity: 0, scale: 0.6, transformOrigin: '50% 100%' });
        gsap.set(glows, { opacity: 0 });
        gsap.set(posterDots, { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
        gsap.set(leftDots, { opacity: 0, scale: 0.35, x: (i, el: SVGCircleElement) => 3135 + (i % 3) * 14 - +el.getAttribute('cx')!, y: (i) => 570 + (i % 4) * 22 - 745 });
        gsap.set(rightDots, { opacity: 0, scale: 0.35, x: (i, el: SVGCircleElement) => 4135 + (i % 3) * 14 - +el.getAttribute('cx')!, y: (i) => 570 + (i % 4) * 22 - 745 });
        gsap.set(captions, { opacity: 0, y: 14 });
        gsap.set(finalBlock, { opacity: 0, y: 10, pointerEvents: 'none' });
        gsap.set(lockup, { scale: 1, opacity: 1 });
        gsap.set(lockupWrap, { y: 0 });
        const lift = () => pin.clientHeight * 0.1; // the logo rises a little at the end to make room for the CTA
        gsap.set(period, { opacity: 1 });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stageEl,
            pin,
            start: 'top top',
            end: '+=650%',
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => period.classList.toggle('is-pulsing', self.progress < 0.04),
          },
        });

        /** Move all parallax layers so svg x `svgX` arrives at screen fraction `frac`. */
        const travel = (svgX: number, frac: number, dur: number, pos: string | number) => {
          tl.to(mid, { x: worldX(svgX, frac), duration: dur }, pos);
          tl.to(top, { x: worldX(svgX, frac), duration: dur }, pos);
          tl.to(bg, { x: () => worldX(svgX, frac)() * 0.3, duration: dur }, pos);
          tl.to(fg, { x: () => worldX(svgX, frac)() * 1.4, duration: dur }, pos);
        };
        const hop = (n: number, dur: number, pos: number, height = 54) => {
          const seg = dur / n;
          for (let i = 0; i < n; i++) {
            tl.to(dot, { y: () => m().ground - height, duration: seg / 2, ease: 'power1.out' }, pos + i * seg);
            tl.to(dot, { y: () => m().ground, duration: seg / 2, ease: 'power1.in' }, pos + i * seg + seg / 2);
          }
        };
        const caption = (i: number, show: number, hold: number) => {
          tl.to(captions[i], { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, show);
          tl.to(captions[i], { opacity: 0, y: -8, duration: 0.8, ease: 'power2.in' }, show + hold);
        };

        // Beat 0: hold, then the camera pushes toward the period
        tl.to({}, { duration: 4 }, 0);
        tl.to(lockup, { scale: PUSH, transformOrigin: () => `${m().originX}px ${m().originY}px`, duration: 6, ease: 'power2.inOut' }, 4);
        // The period pops free and becomes the character
        tl.to(period, { opacity: 0, duration: 0.3 }, 10);
        tl.to(dot, { opacity: 1, duration: 0.3 }, 10);
        tl.to(dot, { scaleY: 1.25, scaleX: 0.85, duration: 0.8, ease: 'power2.out' }, 10.2);
        tl.to(lockup, { opacity: 0, duration: 2.5, ease: 'power1.in' }, 11);
        tl.to(world, { opacity: 1, duration: 3 }, 12);
        // Fall, squash, rebound, settle at character size
        tl.to(dot, { y: () => m().ground, scaleX: 1, scaleY: 1, duration: 3.2, ease: 'power2.in' }, 12);
        tl.to(dot, { x: () => m().W * DOT_FRAC, duration: 4, ease: 'power1.inOut' }, 12);
        tl.to(dot, { scaleX: 1.45, scaleY: 0.55, duration: 0.5, ease: 'power2.out' }, 15.2);
        tl.to(dot, { scaleX: 0.9, scaleY: 1.15, duration: 0.6, ease: 'power2.out' }, 15.7);
        tl.to(dot, { scaleX: 1, scaleY: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' }, 16.3);

        // Beat 1: lonely road
        caption(0, 18, 12);
        tl.to(tumble, { x: -1500, rotation: -900, duration: 14, ease: 'none' }, 17);
        tl.to(sign, { rotation: -2, transformOrigin: '50% 100%', duration: 3, ease: 'sine.inOut' }, 22)
          .to(sign, { rotation: 2, duration: 3, ease: 'sine.inOut' }, 25)
          .to(sign, { rotation: -1.5, duration: 3, ease: 'sine.inOut' }, 28)
          .to(sign, { rotation: 0, duration: 2, ease: 'sine.inOut' }, 31);
        travel(1520, DOT_FRAC + 0.02, 14, 20);
        hop(5, 14, 20);

        // Beat 2: the character taps the blank sign and it comes alive
        tl.to(dot, { scaleY: 1.4, scaleX: 0.8, y: () => m().ground - 90, duration: 1, ease: 'power2.out' }, 34);
        tl.to(dot, { scaleY: 1, scaleX: 1, y: () => m().ground, duration: 1, ease: 'bounce.out' }, 35);
        tl.to(banner, { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(2)' }, 35);
        caption(1, 34, 9);

        // Beat 3: signals spread, one becomes several
        travel(2700, 0.55, 14, 42);
        hop(4, 14, 42, 46);
        tl.to(signals, { opacity: 1, scale: 1, duration: 1.2, stagger: 1.4, ease: 'back.out(1.8)' }, 46);
        tl.to(mutes, { opacity: 0.45, duration: 12, ease: 'power1.inOut' }, 46);
        tl.to(posterDots, { opacity: 1, scale: 1, duration: 1, stagger: 0.8, ease: 'back.out(2)' }, 50);
        caption(2, 45, 11);

        // Beat 4: families arrive from the side streets
        travel(3600, 0.5, 14, 58);
        hop(3, 14, 58, 40);
        tl.to(posterDots, { x: (i) => 1000 + i * 40, duration: 10, ease: 'power1.inOut' }, 58);
        tl.to(leftDots, { opacity: 1, scale: 1, x: 0, y: 0, duration: 8, stagger: 0.5, ease: 'power1.inOut' }, 60);
        tl.to(rightDots, { opacity: 1, scale: 1, x: 0, y: 0, duration: 8, stagger: 0.5, ease: 'power1.inOut' }, 62);
        tl.to(mutes, { opacity: 0, duration: 12, ease: 'power1.inOut' }, 58);
        caption(3, 59, 11);

        // Beat 5: full school
        tl.to(dot, { x: () => m().W * 0.5 - 70 * m().scale, duration: 6, ease: 'power1.inOut' }, 72);
        tl.to(glows, { opacity: 1, duration: 2, stagger: 0.25, ease: 'power2.out' }, 73);
        tl.to(dots, {
          x: (_i, el: SVGCircleElement) => 3600 - +el.getAttribute('cx')!,
          y: (_i, el: SVGCircleElement) => 690 - +el.getAttribute('cy')!,
          scale: 0,
          duration: 2.2,
          stagger: { each: 0.35, from: 'random' },
          ease: 'power2.in',
        }, 75);
        caption(4, 73, 11);

        // Beat 6: the character returns to its place as the period, the logo reconstitutes, CTA appears
        tl.to(world, { opacity: 0, duration: 4, ease: 'power1.in' }, 86);
        tl.set(lockup, { scale: 1, opacity: 0 }, 86);
        tl.set(lockupWrap, { y: () => -lift() }, 86);
        tl.to(dot, { x: () => m().px, duration: 6, ease: 'power1.inOut' }, 86);
        tl.to(dot, { y: () => m().py - lift() - 160, duration: 3, ease: 'power2.out' }, 86);
        tl.to(dot, { y: () => m().py - lift(), duration: 3, ease: 'power2.in' }, 89);
        tl.to(dot, { scale: () => Math.max(0.3, period.offsetWidth * 0.6 / dot.offsetWidth), duration: 6, ease: 'power1.inOut' }, 86);
        tl.to(lockup, { opacity: 1, duration: 3, ease: 'power1.out' }, 89);
        tl.to(dot, { scaleX: 1.3, scaleY: 0.75, duration: 0.4, ease: 'power2.out' }, 92);
        tl.to(dot, { scaleX: 1, scaleY: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' }, 92.4);
        tl.to(dot, { opacity: 0, duration: 0.3 }, 93.2);
        tl.to(period, { opacity: 1, duration: 0.3 }, 93.2);
        tl.to(finalBlock, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 3, ease: 'power2.out' }, 93.5);
        tl.to({}, { duration: 3 }, 97);

        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready.then(refresh);
        return () => period.classList.remove('is-pulsing');
      },
    );

    return () => mm.revert();
  }, [onRewatchRef]);

  return (
    <div className="story" data-testid="story-stage" ref={stage}>
      <div className="story__pin">
        <a className="story__skip" data-testid="skip-story" href="#site-content">
          Skip the story
        </a>

        <div className="story__world" aria-hidden="true">
          <svg className="w-layer w-bg" viewBox="0 0 7000 900" preserveAspectRatio="xMinYMin meet" focusable="false"><SkyDefs /><BgLayer /></svg>
          <svg className="w-layer w-mid" viewBox="0 0 5200 900" preserveAspectRatio="xMinYMin meet" focusable="false"><MidLayer /></svg>
          <svg className="w-layer w-top" viewBox="0 0 5200 900" preserveAspectRatio="xMinYMin meet" focusable="false"><TopLayer /></svg>
          <svg className="w-layer w-fg" viewBox="0 0 5200 900" preserveAspectRatio="xMinYMin meet" focusable="false"><FgLayer /></svg>
        </div>

        <div className="story__lockupWrap">
          <div className="story__lockup">
            <picture className="story__logo">
              <source type="image/webp" srcSet={brand.logoStacked.webp} />
              <img src={brand.logoStacked.src} width={brand.logoStacked.width} height={brand.logoStacked.height} alt="Full School Marketing" fetchPriority="high" />
            </picture>
            <p className="story__tagline" aria-label={siteConfig.tagline}>
              <span aria-hidden="true">grow your own</span>
              <span className="story-period" aria-hidden="true">.</span>
            </p>
          </div>
        </div>

        <div className="story-dot" aria-hidden="true" />

        {BEATS.map((b, i) => (
          <div className="story__caption" key={b.id} data-beat={b.id}>
            <h2 className={i === 4 ? 'story__caption-big' : undefined}>{b.text}</h2>
          </div>
        ))}

        <div className="story__final">
          <h2>Let's fill your school.</h2>
          <p>Enrollment strategy, standout creative, and campaigns that help families find you.</p>
          <div className="story__final-actions">
            <a className="btn btn--primary" data-testid="cta-primary" href={ctaHref} target="_blank" rel="noopener noreferrer">{siteConfig.primaryCta}</a>
            <a className="btn btn--ghost" href="#work">{siteConfig.secondaryCta}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
