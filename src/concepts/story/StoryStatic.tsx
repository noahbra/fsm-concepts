import { brand } from '../../content/media';
import { ctaHref, siteConfig } from '../../content/config';
import { StaticScene, type SceneState } from './TownScene';

const FRAMES: { state: SceneState; viewBox: string; title: string; line: string }[] = [
  { state: 'quiet', viewBox: '0 0 1600 900', title: "What if families don't know you're here?", line: 'A wonderful school, a quiet street, and no reason for anyone to look twice.' },
  { state: 'signage', viewBox: '900 0 1600 900', title: "Let's change that.", line: 'It starts with a clear identity and a sign that says who you are.' },
  { state: 'spreading', viewBox: '1800 0 1600 900', title: 'Give families a reason to notice.', line: 'Posters, search, social and wayfinding light up, and one family becomes several.' },
  { state: 'full', viewBox: '2800 0 1600 900', title: 'Great schools deserve to be seen. And chosen.', line: 'Families find the route, walk through the door, and the school fills with life.' },
];

/** Reduced-motion and paused alternative: the same world as four still frames, same words, same CTA. */
export function StoryStatic() {
  return (
    <section className="story-static" data-testid="story-static" aria-labelledby="story-static-title">
      <div className="story-static__lockup">
        <picture className="story__logo">
          <source type="image/webp" srcSet={brand.logoStacked.webp} />
          <img src={brand.logoStacked.src} width={brand.logoStacked.width} height={brand.logoStacked.height} alt="Full School Marketing" />
        </picture>
        <p className="story__tagline"><span>grow your own</span><span className="story-period">.</span></p>
      </div>
      <h2 id="story-static-title" className="story-static__title">The Invisible School</h2>
      <p className="story-static__intro">Many excellent schools are simply under-discovered. Here is how that changes.</p>
      <ol className="story-static__frames">
        {FRAMES.map((f, i) => (
          <li className="story-static__frame" key={f.state}>
            <div className="story-static__art"><StaticScene state={f.state} viewBox={f.viewBox} /></div>
            <div className="story-static__text">
              <span className="story-static__num">{i + 1}</span>
              <h3>{f.title}</h3>
              <p>{f.line}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="story-static__final">
        <h3>Let's fill your school.</h3>
        <div className="story__final-actions">
          <a className="btn btn--primary" data-testid="cta-primary" href={ctaHref} target="_blank" rel="noopener noreferrer">{siteConfig.primaryCta}</a>
          <a className="btn btn--ghost" href="#work">{siteConfig.secondaryCta}</a>
        </div>
      </div>
    </section>
  );
}
