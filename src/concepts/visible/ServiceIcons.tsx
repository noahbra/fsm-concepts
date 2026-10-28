import type { ServiceId } from '../../content/services';

/** One line icon per service, drawn in the current color so the tile's palette is set in CSS. */
export function ServiceIcon({ id }: { id: ServiceId }) {
  const common = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, focusable: false };
  switch (id) {
    case 'strategy': // a target: who you are trying to reach
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
        </svg>
      );
    case 'creative': // a camera: video, photography and design
      return (
        <svg {...common}>
          <path d="M4 8.5h3l1.5-2.5h7L17 8.5h3a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1Z" />
          <circle cx="12" cy="13.5" r="3.5" />
        </svg>
      );
    case 'advertising': // a megaphone: in front of the right families
      return (
        <svg {...common}>
          <path d="M4 10v4a1 1 0 0 0 1 1h3l8 4V5L8 9H5a1 1 0 0 0-1 1Z" />
          <path d="M19 9.5a3.5 3.5 0 0 1 0 5" />
          <path d="M8 15v4" />
        </svg>
      );
    case 'web': // a browser window: a clear next step the moment they land
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 9h18" />
          <circle cx="6.5" cy="7" r=".6" fill="currentColor" stroke="none" />
          <circle cx="8.8" cy="7" r=".6" fill="currentColor" stroke="none" />
          <path d="M7 13h6M7 16h4" />
        </svg>
      );
    case 'outreach': // an envelope: timely, human follow-up
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="m3.5 7.5 8.5 6 8.5-6" />
        </svg>
      );
  }
}
