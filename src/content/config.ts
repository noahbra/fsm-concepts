/**
 * Site-wide, client-editable configuration.
 * Anything marked REQUIRES_CLIENT_CONFIRMATION is a provisional value; see docs/CONTENT_AND_CLAIMS.md.
 */
export const BASE = import.meta.env.BASE_URL; // "/" locally, "/fsm-concepts/" on GitHub Pages

/** Base-aware URL for anything under public/ or another page in this repo. */
export const url = (path: string) => BASE.replace(/\/$/, '') + '/' + path.replace(/^\//, '');

export const siteConfig = {
  brandName: 'Full School Marketing',
  shortName: 'FSM',
  /** Tagline wording from the build brief's logo reference. The V2 logo files supplied by FilmTwist on 10/26/2026
   *  do not carry a tagline lockup, so concepts render it as live text. REQUIRES_CLIENT_CONFIRMATION. */
  tagline: 'grow your own.',
  missionLine: 'We help schools grow their own.', // from the FSM Brand Guide, "Our Mission"

  /** Active consultation destination. The public FilmTwist consulting page is used until the client approves a booking link. */
  consultationUrl: 'https://www.filmtwist.com/consulting',
  /** Source-supported booking link found on the FilmTwist consulting page (10/26/2026). REQUIRES_CLIENT_CONFIRMATION before use. */
  provisionalBookingUrl: 'https://calendly.com/dpathak/30min',
  consultationApproved: false,

  primaryCta: "Let's Fill Your School",
  primaryCtaAlt: 'Talk Enrollment Strategy',
  secondaryCta: 'See Our Work',

  filmtwist: {
    name: 'FilmTwist Creative Agency',
    shortName: 'FilmTwist',
    url: 'https://www.filmtwist.com/',
    workUrl: 'https://www.filmtwist.com/work',
    consultingUrl: 'https://www.filmtwist.com/consulting',
    attribution: 'Featured school recruitment campaigns delivered by the FilmTwist team.',
    relationship: 'Full School Marketing is the school enrollment practice of FilmTwist Creative Agency.', // REQUIRES_CLIENT_CONFIRMATION (wording)
  },

  /** Supplied by FilmTwist (Jackie Costanzo, 10/26/2026) and verified to resolve (HTTP 200) the same day. */
  social: [
    { label: 'Instagram', url: 'https://www.instagram.com/fullschoolmarketing', verified: true },
    { label: 'Facebook', url: 'https://www.facebook.com/fullschoolmarketing', verified: true },
    { label: 'YouTube', url: 'https://www.youtube.com/@FullSchoolMarketingCourse', verified: true },
  ],

  /** Review chrome (ribbon + floating review pill). Set VITE_REVIEW_MODE=false for production output. */
  reviewMode: import.meta.env.VITE_REVIEW_MODE !== 'false',
  /** Optional real submission endpoint (Formspree, Tally webhook, etc.). Empty = copy/download only. */
  feedbackEndpoint: (import.meta.env.VITE_FEEDBACK_ENDPOINT as string | undefined) || '',

  /** Legal placeholders. Do not fabricate policy text. */
  legal: {
    privacyUrl: '', // REQUIRES_CLIENT_CONFIRMATION
    termsUrl: '', // REQUIRES_CLIENT_CONFIRMATION
    copyrightHolder: 'Full School Marketing',
  },
} as const;

export const ctaHref = siteConfig.consultationApproved ? siteConfig.provisionalBookingUrl : siteConfig.consultationUrl;
