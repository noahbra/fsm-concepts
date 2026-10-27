import type { ServiceId } from '../../content/services';

/** Small hand-drawn line glyphs, one per service. Decorative; hidden from assistive tech. */
export function ServiceGlyph({ id }: { id: ServiceId }) {
  const common = { width: 44, height: 44, viewBox: '0 0 44 44', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (id) {
    case 'strategy':
      return (
        <svg {...common}>
          <circle cx="22" cy="22" r="16" />
          <circle cx="22" cy="22" r="9" />
          <circle cx="22" cy="22" r="2.5" fill="currentColor" stroke="none" />
          <path d="M22 6v6M22 32v6M6 22h6M32 22h6" />
        </svg>
      );
    case 'creative':
      return (
        <svg {...common}>
          <rect x="6" y="12" width="26" height="20" rx="2.5" />
          <path d="M32 19l7-4v14l-7-4" />
          <circle cx="14" cy="22" r="3.5" />
          <path d="M11 32l4-5 3 3 4-6 5 8" />
        </svg>
      );
    case 'advertising':
      return (
        <svg {...common}>
          <path d="M8 18v8h6l12 7V11l-12 7H8z" />
          <path d="M30 17c2 2 2 8 0 10M34 13c4 4 4 14 0 18" />
        </svg>
      );
    case 'web':
      return (
        <svg {...common}>
          <rect x="6" y="9" width="32" height="24" rx="2.5" />
          <path d="M6 15h32M11 12h.5M15 12h.5M19 12h.5" />
          <path d="M12 22h11M12 27h7" />
          <rect x="26" y="20" width="8" height="8" rx="1.5" />
          <path d="M16 36h12" />
        </svg>
      );
    case 'outreach':
      return (
        <svg {...common}>
          <path d="M6 14l16 10 16-10" />
          <rect x="6" y="12" width="32" height="20" rx="2.5" />
          <path d="M33 6c3 0 5 2 5 5M33 2c5 0 9 4 9 9" />
        </svg>
      );
  }
}
