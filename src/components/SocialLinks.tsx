import { siteConfig } from '../content/config';

const icons: Record<string, string> = {
  Instagram: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.5 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z',
  Facebook: 'M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3z',
  YouTube: 'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z',
};

/** Renders only verified FSM social profiles. Nothing is inferred from the brand name. */
export function SocialLinks({ className, itemClassName }: { className?: string; itemClassName?: string }) {
  const links = siteConfig.social.filter((s) => s.verified);
  if (!links.length) return null;
  return (
    <ul className={className} aria-label="Full School Marketing on social media">
      {links.map((s) => (
        <li key={s.label}>
          <a className={itemClassName} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`}>
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d={icons[s.label]} /></svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
