import { useState } from 'react';
import { siteConfig } from '../../content/config';
import { brand } from '../../content/media';
import { SocialLinks } from '../../components/SocialLinks';

/**
 * Header and footer shared by the Concept 06 page and its case-study pages.
 * `home` is the relative path back to the main page: '' on the page itself, '../../' from bold/work/<case>/.
 */
export const NAV = [
  { href: '#services', label: 'What we do' },
  { href: '#work', label: 'Work' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
];

export function Header({ home = '' }: { home?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="cr-header">
      <div className="cr-wrap cr-header-inner">
        <a href={`${home}#top`} className="cr-logo" aria-label="Full School Marketing home">
          <picture>
            <source type="image/webp" srcSet={brand.logoHorizontalWhite.webp} />
            <img src={brand.logoHorizontalWhite.src} width={brand.logoHorizontalWhite.width} height={brand.logoHorizontalWhite.height} alt="Full School Marketing" />
          </picture>
        </a>
        <button type="button" className="cr-menu-btn" aria-expanded={open} aria-controls="cr-nav" onClick={() => setOpen((v) => !v)}>
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="cr-nav" className={`cr-nav${open ? ' is-open' : ''}`} aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.href} href={`${home}${n.href}`} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a className="cr-btn cr-btn--small" href={`${home}#contact`}>
            Let&rsquo;s talk
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Footer({ home = '' }: { home?: string }) {
  return (
    <footer className="cr-footer">
      <div className="cr-wrap cr-footer-inner">
        <div className="cr-footer-brand">
          <picture>
            <source type="image/webp" srcSet={brand.logoHorizontalWhite.webp} />
            <img src={brand.logoHorizontalWhite.src} width={brand.logoHorizontalWhite.width} height={brand.logoHorizontalWhite.height} alt="Full School Marketing" loading="lazy" />
          </picture>
          <p>
            {siteConfig.missionLine} Powered by the team at{' '}
            <a href={siteConfig.filmtwist.url} target="_blank" rel="noopener noreferrer">
              {siteConfig.filmtwist.name}
            </a>
            .
          </p>
          <SocialLinks className="cr-social" itemClassName="cr-social-link" />
        </div>
        <nav className="cr-footer-nav" aria-label="Footer">
          {NAV.map((n) => (
            <a key={n.href} href={`${home}${n.href}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="cr-footer-legal">
          <p>Privacy policy and terms to be supplied.</p>
          <p>&copy; 2026 {siteConfig.legal.copyrightHolder}. Campaign creative shown with reuse approval pending.</p>
        </div>
      </div>
    </footer>
  );
}
