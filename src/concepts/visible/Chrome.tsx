import { useEffect, useRef, useState } from 'react';
import { SocialLinks } from '../../components/SocialLinks';
import { siteConfig } from '../../content/config';
import { brand } from '../../content/media';

/**
 * Header, footer, mobile bar and the embedded form, shared by the main page and the case-study pages.
 * `home` is the relative path back to the main page: '' on the page itself, '../../' from visible/work/<case>/.
 */
export function SiteHeader({ home = '' }: { home?: string }) {
  return (
    <header className="site-header">
      <a className="site-header__brand" href={`${home}#top`} aria-label="Full School Marketing, home">
        <img src={brand.emblemColor} width={40} height={40} alt="" />
        <span>Full School Marketing</span>
      </a>
      <nav className="site-header__nav" aria-label="Site">
        <a href={`${home}#services`}>Services</a>
        <a href={`${home}#work`}>Work</a>
        <a href={`${home}#team`}>Team</a>
        <a href={`${home}#contact`}>Contact</a>
        <a className="site-header__cta" href={`${home}#contact`}>Let's talk</a>
      </nav>
    </header>
  );
}

/** Below 700px: one primary button per viewport. Shown once the first frame's button fades; hidden over the form and the footer. */
export function MobileCta({ home = '' }: { home?: string }) {
  return (
    <div className="mobile-cta" data-testid="mobile-cta">
      <a className="btn btn--primary" href={`${home}#contact`}>{siteConfig.primaryCta}</a>
    </div>
  );
}

export function SiteFooter({ home = '' }: { home?: string }) {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <div className="site-footer__brand">
          <picture>
            <source type="image/webp" srcSet={brand.logoHorizontalWhite.webp} />
            <img src={brand.logoHorizontalWhite.src} width={brand.logoHorizontalWhite.width} height={brand.logoHorizontalWhite.height} alt="Full School Marketing" loading="lazy" />
          </picture>
          <p>{siteConfig.missionLine}</p>
        </div>
        <nav className="site-footer__nav" aria-label="Footer">
          <a href={`${home}#services`}>Services</a>
          <a href={`${home}#work`}>Work</a>
          <a href={`${home}#team`}>Team</a>
          <a href={`${home}#contact`}>Contact</a>
        </nav>
        <div className="site-footer__meta">
          <p>
            Powered by the team at <a href={siteConfig.filmtwist.url} target="_blank" rel="noopener noreferrer">{siteConfig.filmtwist.name}</a>.
          </p>
          <SocialLinks className="social" />
          <p className="site-footer__legal">© 2026 {siteConfig.legal.copyrightHolder}. Privacy policy and terms to be supplied.</p>
        </div>
      </div>
    </footer>
  );
}

/**
 * FilmTwist's own contact form, embedded exactly as filmtwist.com/contact embeds it (LeadConnector inline widget plus
 * its resize script). Submissions go to FilmTwist's LeadConnector account; nothing is handled on this site.
 *
 * The widget is heavy (its page pulls in a bot check, fonts and scripts: about 120 requests), so it mounts only once the
 * reader is within a screen of the contact section; until then the box holds its height. Nothing third-party loads with
 * the page itself (the opener plays on load and the page's own load event stays its own).
 */
export function LeadConnectorForm() {
  const { formId, formName, height, embedScript, widgetBase } = siteConfig.leadConnector;
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setNear(true); return; }
    const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) { setNear(true); io.disconnect(); } }, { rootMargin: '100% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!near || document.querySelector(`script[src="${embedScript}"]`)) return;
    const s = document.createElement('script');
    s.src = embedScript;
    s.async = true;
    document.body.appendChild(s);
  }, [near, embedScript]);
  const iframeId = `inline-${formId}`;
  return (
    <div ref={box} style={{ minHeight: `${height}px` }} data-testid="leadconnector-box">
      {near && (
        <iframe
          src={`${widgetBase}${formId}`}
          style={{ width: '100%', height: `${height}px`, border: 'none', borderRadius: '10px', display: 'block' }}
          id={iframeId}
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name={formName}
          data-height={height}
          data-layout-iframe-id={iframeId}
          data-form-id={formId}
          title="Work with Full School Marketing"
          data-testid="leadconnector-form"
        />
      )}
    </div>
  );
}
