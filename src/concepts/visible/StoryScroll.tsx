import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brand } from '../../content/media';
import { siteConfig } from '../../content/config';
import { BackLayer, BgLayer, FgLayer, GY, MidLayer, PALETTE, TopLayer, mixPalette } from './TownScene';

gsap.registerPlugin(ScrollTrigger);

export const BEATS = [
  { id: 1, text: "What if families don't know you're here?", sub: 'A wonderful school on a quiet street, and no reason for anyone to look twice.' },
  { id: 2, text: "Let's change that.", sub: 'It starts with a clear identity and a sign that says who you are.' },
  { id: 3, text: 'Ads where families already are.', sub: 'Google, Facebook, Instagram, TikTok and streaming carry your school to the parents who are looking.' },
  { id: 4, text: 'A landing page that starts enrollment.', sub: 'Families share their details and begin the application. The ones who hesitate get a nudge by email.' },
  { id: 5, text: 'Great schools deserve to be seen. And chosen.', sub: '' },
];

const PARALLAX = { bg: 0.15, back: 0.45, mid: 1, fg: 1.5 };

/**
 * The pinned, scroll-scrubbed narrative. One ScrollTrigger timeline (0 to 100), built inside gsap.matchMedia
 * so desktop and mobile get their own framing and everything reverts cleanly on unmount.
 * The character is the period of the tagline (a DOM element), never a letter of the wordmark.
 */
export function StoryScroll({ onRewatchRef }: { onRewatchRef?: (fn: () => void) => void }) {
  const stage = useRef<HTMLDivElement>(null);
  /** Scroll back to the start of the pin. Lives inside the final frame (Concept 05), not below it. */
  const rewatch = () => {
    const stageEl = stage.current!;
    const st = ScrollTrigger.getAll().find((t) => t.trigger === stageEl);
    window.scrollTo({ top: st ? st.start : stageEl.offsetTop, behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    const stageEl = stage.current!;
    const q = <T extends Element>(sel: string, root: ParentNode = stageEl) => root.querySelector<T>(sel)!;
    const pin = q<HTMLElement>('.story__pin');
    const lockupWrap = q<HTMLElement>('.story__lockupWrap');
    const lockup = q<HTMLElement>('.story__lockup');
    const period = q<HTMLElement>('.story-period');
    const char = q<HTMLElement>('.story-char');
    const dot = q<HTMLElement>('.story-char__dot');
    const shadow = q<HTMLElement>('.story-char__shadow');
    const world = q<HTMLElement>('.story__world');
    const layers = {
      bg: q<SVGSVGElement>('.w-bg', world),
      back: q<SVGSVGElement>('.w-back', world),
      mid: q<SVGSVGElement>('.w-mid', world),
      top: q<SVGSVGElement>('.w-top', world),
      fg: q<SVGSVGElement>('.w-fg', world),
    };
    const finalBlock = q<HTMLElement>('.story__final');
    const intro = q<HTMLElement>('.story__intro');
    const cue = q<HTMLElement>('.story__cue');

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
        const DOT_FRAC = isMobile ? 0.3 : 0.32; // where the character stands on screen while walking

        /** Live measurements, re-read on every refresh through function-based values. */
        const m = () => {
          const W = pin.clientWidth;
          const scale = layers.mid.clientHeight / 900; // px per scene unit
          const ground = world.clientHeight - (900 - GY) * scale;
          const R = dot.offsetWidth / 2;
          const s = gsap.utils.clamp(0.16, 1, (period.offsetWidth * 0.62) / dot.offsetWidth); // dot scale that matches the period glyph
          const px = lockup.offsetLeft + period.offsetLeft + period.offsetWidth / 2;
          const py = lockup.offsetTop + period.offsetTop + period.offsetHeight * 0.76;
          return { W, scale, ground, R, s, px, py, lift: pin.clientHeight * 0.1 };
        };
        /** Pixel translation of the 1x layers so that scene x lands at screen fraction `frac`. */
        const worldX = (sceneX: number, frac: number) => () => frac * m().W - sceneX * m().scale;

        const top = layers.top;
        const signals = gsap.utils.toArray<SVGGElement>('.w-signal', top);
        const glows = gsap.utils.toArray<SVGRectElement>('.w-glow', top);
        const bunting = gsap.utils.toArray<SVGElement>('.w-bunting', top);
        const banner = q<SVGGElement>('.w-banner', top);
        const landing = q<SVGGElement>('.w-landing', top);
        const mail = q<SVGGElement>('.w-mail', top);
        const enroll = q<SVGGElement>('.w-enroll', top);
        const famAds = gsap.utils.toArray<SVGGElement>('.w-fam--ads', top);
        const famLeft = gsap.utils.toArray<SVGGElement>('.w-fam--left', top);
        const famRight = gsap.utils.toArray<SVGGElement>('.w-fam--right', top);
        const famLate = q<SVGGElement>('.w-fam--late', top);
        const mover = (g: SVGGElement) => g.querySelector<SVGGElement>('.w-fam__m')!;
        const famLeftM = famLeft.map(mover);
        const famRightM = famRight.map(mover);
        const famLateM = mover(famLate);
        const mailM = q<SVGGElement>('.w-mail__m', top);
        const flag = q<SVGElement>('.w-flag', layers.mid);
        const captions = gsap.utils.toArray<HTMLElement>('.story__caption', pin);

        // ---- initial states
        // Palette: one number drives every fill. GSAP's CSS-variable support proved unreliable for color strings,
        // so the mix is computed in JS and written with setProperty.
        const palette = { t: 0 };
        const applyPalette = () => {
          const p = mixPalette(palette.t);
          (Object.keys(p) as (keyof typeof p)[]).forEach((k) => world.style.setProperty(k, p[k]));
        };
        applyPalette();
        gsap.set(world, { opacity: 0, y: 40 });
        gsap.set(Object.values(layers), { x: 0 });
        gsap.set(char, { x: () => m().px, y: () => m().py + m().R * m().s });
        gsap.set(dot, { scale: () => m().s, opacity: 0, transformOrigin: '50% 100%' });
        gsap.set(shadow, { opacity: 0, scaleX: 1, transformOrigin: '50% 50%' });
        gsap.set([banner, ...signals, landing, mail, enroll, ...famAds, famLate], { opacity: 0, scale: 0.6, transformOrigin: '50% 100%' });
        gsap.set(glows, { opacity: 0 });
        gsap.set(bunting, { scale: 0, transformOrigin: '50% 0%' });
        gsap.set([...famLeft, ...famRight], { opacity: 0 });
        gsap.set(famLeftM, { x: -420 });
        gsap.set(famRightM, { x: 420 });
        gsap.set(captions, { opacity: 0, y: 28 });
        gsap.set(captions.map((c) => c.querySelector('.story__caption-rule')), { scaleX: 0, transformOrigin: '0 50%' });
        // autoAlpha (opacity + visibility) keeps the hidden frame out of the tab order; nothing invisible can take focus.
        gsap.set(finalBlock, { autoAlpha: 0, y: 16 });
        gsap.set(intro, { autoAlpha: 1, y: 0, display: 'grid' });
        gsap.set(lockup, { opacity: 1, y: 0 });
        gsap.set(lockupWrap, { y: 0 });
        gsap.set(period, { opacity: 1 });
        gsap.set(cue, { opacity: 1 });

        // Concept 05: the pin is 350% (Concept 03 ran 600%). The story timeline keeps its 13 to 100 positions untouched
        // and is nested in a master timeline. Version 2.1: no opening hold. The first scroll moves the brand at once
        // (the Version 1 hold read as the page being stuck), so HOLD stays at 0 and the opening runs in 0 to 13.
        const HOLD = 0;
        const tl = gsap.timeline({ defaults: { ease: 'none' } });
        const master = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stageEl,
            pin,
            start: 'top top',
            end: '+=350%',
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              period.classList.toggle('is-pulsing', self.progress < (HOLD + 0.3) / (HOLD + 100));
              // the mobile CTA bar appears once the intro layer's button has dissolved (timeline position 3), never before
              document.documentElement.classList.toggle('is-past-intro', self.progress >= (HOLD + 3) / (HOLD + 100));
            },
          },
        });
        master.to({}, { duration: HOLD }, 0);

        // ---- helpers
        /** Dolly the camera so scene x `sceneX` arrives at screen fraction `frac`. */
        const travel = (sceneX: number, frac: number, dur: number, pos: number, ease = 'none') => {
          (Object.keys(layers) as (keyof typeof layers)[]).forEach((k) => {
            const ratio = k === 'top' ? PARALLAX.mid : PARALLAX[k as keyof typeof PARALLAX];
            tl.to(layers[k], { x: () => worldX(sceneX, frac)() * ratio, duration: dur, ease }, pos);
          });
        };
        /** The character walks: a run of small hops with squash on landing; the shadow tightens while it is in the air. */
        const walk = (n: number, dur: number, pos: number, height = 30) => {
          const seg = dur / n;
          for (let i = 0; i < n; i++) {
            const t0 = pos + i * seg;
            tl.to(dot, { y: -height, scaleX: 0.96, scaleY: 1.06, duration: seg * 0.45, ease: 'power1.out' }, t0);
            tl.to(shadow, { scaleX: 0.6, opacity: 0.5, duration: seg * 0.45, ease: 'power1.out' }, t0);
            tl.to(dot, { y: 0, duration: seg * 0.4, ease: 'power1.in' }, t0 + seg * 0.45);
            tl.to(shadow, { scaleX: 1, opacity: 1, duration: seg * 0.4, ease: 'power1.in' }, t0 + seg * 0.45);
            tl.to(dot, { scaleX: 1.14, scaleY: 0.88, duration: seg * 0.15, ease: 'power2.out' }, t0 + seg * 0.85);
          }
          tl.to(dot, { scaleX: 1, scaleY: 1, duration: 0.4, ease: 'power2.out' }, pos + dur);
        };
        const caption = (i: number, show: number, hide: number) => {
          const el = captions[i];
          const rule = el.querySelector('.story__caption-rule');
          tl.to(el, { opacity: 1, y: 0, duration: 1.6, ease: 'power3.out' }, show);
          tl.to(rule, { scaleX: 1, duration: 1.4, ease: 'power3.out' }, show + 0.3);
          tl.to(el, { opacity: 0, y: -18, duration: 1.1, ease: 'power2.in' }, hide);
        };
        const pop = (target: gsap.TweenTarget, pos: number, dur = 1.2, stagger = 0) =>
          tl.to(target, { opacity: 1, scale: 1, transformOrigin: '50% 100%', duration: dur, stagger, ease: 'back.out(1.7)' }, pos);

        // ---- 0 to 13: the first scroll moves the brand at once. The lockup rises, the H1 and buttons dissolve, and the
        // period lets go of the dot in the same motion: the dot keeps the period's place while the logo lifts away, then
        // drops into the world. The wrap stays lifted for the whole story; the ending reconstitutes the logo in that place.
        tl.to(lockupWrap, { y: () => -m().lift, duration: 4, ease: 'power2.out' }, 0);
        tl.to(intro, { autoAlpha: 0, y: -16, duration: 3, ease: 'power1.in' }, 0);
        tl.set(intro, { display: 'none' }, 3.2); // out of the layout so the reconstituted lockup sits where the final frame expects it
        tl.to(cue, { opacity: 0, duration: 1 }, 0);
        tl.set(period, { opacity: 0 }, 0.3);
        tl.set(dot, { opacity: 1 }, 0.3);
        tl.to(dot, { scaleX: () => m().s * 0.9, scaleY: () => m().s * 1.25, duration: 0.8, ease: 'power2.out' }, 0.3); // stretches as it pulls away
        tl.to(char, { y: () => m().py + 24, duration: 2.5, ease: 'power1.in' }, 0.3); // a slow slip while the logo lifts
        tl.to(lockup, { opacity: 0, duration: 2.4, ease: 'power2.in' }, 2); // the logo fades as it rises
        tl.to(world, { opacity: 1, y: 0, duration: 4, ease: 'power2.out' }, 3);
        tl.to(char, { y: () => m().ground, duration: 4.4, ease: 'power2.in' }, 2.8); // the drop
        tl.to(char, { x: () => m().W * DOT_FRAC, duration: 6, ease: 'power1.inOut' }, 1);
        tl.to(dot, { scaleX: 1, scaleY: 1, duration: 4.4, ease: 'power1.in' }, 2.8);
        tl.to(shadow, { opacity: 1, duration: 1, ease: 'power2.in' }, 6.2);
        tl.to(dot, { scaleX: 1.4, scaleY: 0.66, duration: 0.4, ease: 'power2.out' }, 7.2); // lands
        tl.to(dot, { scaleX: 0.92, scaleY: 1.12, duration: 0.5, ease: 'power2.out' }, 7.6);
        tl.to(dot, { scaleX: 1, scaleY: 1, duration: 0.9, ease: 'elastic.out(1, 0.5)' }, 8.1);

        // ---- Beat 1 (14 to 28): a lovely school nobody sees
        caption(0, 14, 27);
        travel(850, DOT_FRAC, 12, 15);
        walk(6, 12, 15);

        // ---- Beat 2 (28 to 40): the sign on the corner comes alive
        caption(1, 29, 39.5);
        travel(1180, DOT_FRAC, 7, 28);
        walk(4, 7, 28);
        tl.to(dot, { y: -70, scaleX: 0.9, scaleY: 1.15, duration: 0.9, ease: 'power2.out' }, 35.6);
        tl.to(shadow, { scaleX: 0.5, opacity: 0.4, duration: 0.9, ease: 'power2.out' }, 35.6);
        tl.to(dot, { y: 0, scaleX: 1, scaleY: 1, duration: 0.9, ease: 'bounce.out' }, 36.5);
        tl.to(shadow, { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.in' }, 36.5);
        pop(banner, 36.3, 1.4);
        // color begins to arrive, and keeps arriving until the school is full
        tl.to(palette, { t: 1, duration: 40, ease: 'none', onUpdate: applyPalette }, 36);

        // ---- Beat 3 (40 to 58): digital ads light up along main street
        caption(2, 41, 57);
        travel(2520, DOT_FRAC, 16, 40);
        walk(7, 16, 40);
        pop(signals[0], 44.5);
        pop(signals[1], 47.5);
        pop(signals[2], 50.5);
        pop(signals[3], 53.5);
        pop(famAds, 52, 1.2, 2.2);

        // ---- Beat 4 (58 to 78): the landing page, families arrive, the email nudge
        caption(3, 59, 77);
        travel(isMobile ? 3120 : 3330, DOT_FRAC, 14, 58);
        walk(6, 14, 58);
        pop(landing, 60.5, 1.5);
        tl.to(famLeft, { opacity: 1, duration: 1.2, stagger: 0.8 }, 62);
        tl.to(famLeftM, { x: 0, duration: 10, stagger: 0.8, ease: 'power1.inOut' }, 62);
        tl.to(famRight, { opacity: 1, duration: 1.2, stagger: 0.8 }, 63.5);
        tl.to(famRightM, { x: 0, duration: 10, stagger: 0.8, ease: 'power1.inOut' }, 63.5);
        [...famLeftM, ...famRightM].forEach((f, i) => tl.to(f, { y: -6, duration: 0.5, repeat: 17, yoyo: true, ease: 'sine.inOut' }, 62 + i * 0.4));
        pop(enroll, 64.5, 1.4);
        tl.to(bunting, { scale: 1, transformOrigin: '50% 0%', duration: 0.8, stagger: 0.18, ease: 'back.out(2)' }, 66);
        tl.to(glows, { opacity: 1, duration: 1.4, stagger: { each: 0.3, from: 'random' }, ease: 'power2.out' }, 68);
        pop(famLate, 66.5, 1.2);
        pop(mail, 71, 1.2);
        tl.to(mailM, { y: -10, duration: 0.6, repeat: 3, yoyo: true, ease: 'sine.inOut' }, 72.2);
        tl.to(mail, { opacity: 0, scale: 0.6, duration: 1, ease: 'power2.in' }, 74.8);
        tl.to(famLateM, { x: -190, duration: 4, ease: 'power1.inOut' }, 74.5);
        tl.to(famLateM, { y: -6, duration: 0.5, repeat: 7, yoyo: true, ease: 'sine.inOut' }, 74.5);

        // ---- Beat 5 (78 to 90): the full school
        caption(4, 79, 89.5);
        travel(3500, 0.5, 7, 78, 'power1.inOut');
        tl.to(char, { x: () => m().W * 0.5 - 60 * m().scale, duration: 7, ease: 'power1.inOut' }, 78);
        walk(3, 7, 78);
        for (let i = 0; i < 6; i++) tl.to(flag, { skewY: i % 2 ? -8 : 8, transformOrigin: '0% 50%', duration: 1, ease: 'sine.inOut' }, 80 + i);
        tl.to(flag, { skewY: 0, transformOrigin: '0% 50%', duration: 1, ease: 'sine.inOut' }, 86);

        // ---- 90 to 100: the school scrolls up and away first (90 to 95), the character rides up with it and rejoins
        // the logo as the period once the town has cleared (95 to 98), then the invitation
        tl.to(world, { y: () => -pin.clientHeight * 1.05, duration: 5, ease: 'power2.in' }, 90);
        tl.to(world, { opacity: 0, duration: 1.2, ease: 'power1.in' }, 93.8);
        tl.to(shadow, { opacity: 0, duration: 1 }, 90);
        tl.set(lockup, { opacity: 0, y: 0 }, 90);
        tl.set(lockupWrap, { y: () => -m().lift }, 90);
        tl.to(char, { x: () => m().px, duration: 6, ease: 'power1.inOut' }, 91);
        tl.to(char, { y: () => m().py - m().lift - 150, duration: 3.5, ease: 'power2.out' }, 91.5);
        tl.to(char, { y: () => m().py - m().lift + m().R * m().s, duration: 2.5, ease: 'power2.in' }, 95);
        tl.to(dot, { scale: () => m().s, duration: 6, ease: 'power1.inOut' }, 91);
        tl.to(lockup, { opacity: 1, duration: 2.5, ease: 'power1.out' }, 95);
        tl.to(dot, { scaleX: () => m().s * 1.3, scaleY: () => m().s * 0.72, duration: 0.4, ease: 'power2.out' }, 97.5);
        tl.to(dot, { scaleX: () => m().s, scaleY: () => m().s, duration: 0.7, ease: 'elastic.out(1, 0.5)' }, 97.9);
        tl.set(dot, { opacity: 0 }, 98.6);
        tl.set(period, { opacity: 1 }, 98.6);
        tl.to(finalBlock, { autoAlpha: 1, y: 0, duration: 2, ease: 'power2.out' }, 97.5);
        tl.to({}, { duration: 0.5 }, 99.5);
        master.add(tl, HOLD);

        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready.then(refresh);
        return () => {
          period.classList.remove('is-pulsing');
          Object.keys(PALETTE.quiet).forEach((k) => world.style.removeProperty(k));
        };
      },
    );

    return () => mm.revert();
  }, [onRewatchRef]);

  return (
    <div className="story" data-testid="story-stage" ref={stage}>
      <div className="story__pin">
        <div className="story__world" aria-hidden="true">
          <svg className="w-layer w-bg" viewBox="0 0 7000 900" preserveAspectRatio="xMinYMin meet" focusable="false"><BgLayer /></svg>
          <svg className="w-layer w-back" viewBox="0 0 6400 900" preserveAspectRatio="xMinYMin meet" focusable="false"><BackLayer /></svg>
          <svg className="w-layer w-mid" viewBox="0 0 5600 900" preserveAspectRatio="xMinYMin meet" focusable="false"><MidLayer /></svg>
          <svg className="w-layer w-top" viewBox="0 0 5600 900" preserveAspectRatio="xMinYMin meet" focusable="false"><TopLayer /></svg>
          <svg className="w-layer w-fg" viewBox="0 0 8400 900" preserveAspectRatio="xMinYMin meet" focusable="false"><FgLayer /></svg>
        </div>

        <div className="story__lockupWrap">
          <div className="story__lockup">
            <picture className="story__logo">
              <source type="image/webp" srcSet={brand.logoStacked.webp} />
              <img src={brand.logoStacked.src} width={brand.logoStacked.width} height={brand.logoStacked.height} alt="Full School Marketing" fetchPriority="high" />
            </picture>
            <p className="story__tagline">
              <span aria-hidden="true">grow your own</span>
              <span className="story-period" aria-hidden="true">.</span>
            </p>
          </div>
          {/* Concept 05 first frame: the offer in one line, the primary button and the one visible skip control.
              A sibling of the lockup (not a child) so the period-dot measurement and the lockup's return are untouched. */}
          <div className="story__intro">
            <h1 className="story__h1">{siteConfig.heroLine}</h1>
            <div className="story__intro-actions">
              <a className="btn btn--primary" data-testid="cta-intro" href="#contact">{siteConfig.primaryCta}</a>
              <a className="story__skip" data-testid="skip-story" href="#services">Skip the story</a>
            </div>
          </div>
        </div>

        <div className="story-char" aria-hidden="true">
          <span className="story-char__shadow" />
          <span className="story-char__dot" />
        </div>

        {BEATS.map((b, i) => (
          <div className={`story__caption ${i === 4 ? 'story__caption--big' : ''}`} key={b.id} data-beat={b.id}>
            <span className="story__caption-rule" />
            <h2>{b.text}</h2>
            {b.sub && <p>{b.sub}</p>}
          </div>
        ))}

        <div className="story__cue" aria-hidden="true">
          <span>Scroll</span>
          <span className="story__cue-chevron" />
        </div>

        <div className="story__final">
          <h2>Let's fill your school.</h2>
          <p>Enrollment strategy, standout creative, and campaigns that help families find you.</p>
          <div className="story__final-actions">
            <a className="btn btn--primary" data-testid="cta-primary" href="#contact">{siteConfig.primaryCta}</a>
            <button type="button" className="story__rewatch" onClick={rewatch}>Rewatch the story</button>
          </div>
        </div>
      </div>
    </div>
  );
}
