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

  /** Concept 05 first-frame H1: names the offer, no sentiment, no numbers. New copy, REQUIRES_CLIENT_CONFIRMATION. */
  heroLine: 'Enrollment marketing for K-12 schools.',
  /** Concept 05 "Who you work with": built only from FilmTwist's published phrases (agency name, the "K-12 Student
   *  Recruitment" service name, the Brand Guide mission line, roles on filmtwist.com/about) plus "is," "practice,"
   *  "Our team covers." The 2020 date is the project owner's ruling (10/28/2026). REQUIRES_CLIENT_CONFIRMATION. */
  teamLine:
    "Full School Marketing is Filmtwist Creative Agency's K-12 student recruitment practice, started in 2020. We help schools grow their own. Our team covers strategy, design, photography, video, websites and paid advertising.",
  /** Concept 05 "The first conversation": what the call covers and what to bring. "Free 30-minute" is FilmTwist's own
   *  wording (filmtwist.com/consulting). No figures, no estimate. New copy, REQUIRES_CLIENT_CONFIRMATION. */
  contactLine:
    "A free 30-minute call. Tell us how many seats you need to fill, where last year's families came from, and what you have tried. We'll say what we would do first and what it takes. No proposal before we understand your school.",
  /** FilmTwist's contact form, embedded exactly as filmtwist.com/contact embeds it (LeadConnector inline widget,
   *  read 10/28/2026). Submissions land in FilmTwist's LeadConnector account; this site handles nothing. It is the
   *  agency's general "RFI Contact Form"; an FSM-specific form in the same account would let FilmTwist tag school
   *  leads separately. REQUIRES_CLIENT_CONFIRMATION. */
  leadConnector: {
    formId: 'DveY4KWgzKqaGiHAAA2e',
    formName: 'RFI Contact Form',
    /** FilmTwist's LeadConnector location (sub-account), from the widget configuration. */
    locationId: '6DjFgiECQC0Tt8gNX4vT',
    height: 993,
    widgetBase: 'https://api.leadconnectorhq.com/widget/form/',
    embedScript: 'https://link.msgsndr.com/js/form_embed.js',
    /** The forms service the widget itself posts to (multipart: formData JSON, locationId, formId). */
    submitUrl: 'https://backend.leadconnectorhq.com/forms/submit',
    sourcePage: 'https://www.filmtwist.com/contact',
    /** 'fsm' renders the FSM-branded form that posts to the service above; 'embed' renders FilmTwist's widget frame. */
    mode: 'fsm' as 'fsm' | 'embed',
    /** Custom-field tags from the form configuration. Standard fields use their own names (full_name, email, phone, terms_and_conditions). */
    fields: { services: 'EJestVkia960oHxT9PxO', leadSource: 'XrSIkifPP25CWRXwy0t6', budget: 'MgHxET4F4WHl8USXu65T', needs: '7FmoBx7Yyarn8ptrhdUe' },
    /** The form's own option lists, verbatim (they are picklist values on FilmTwist's contact record, so they are not reworded). */
    options: {
      services: ['Marketing Services', 'Photo/Video Creative Content Services', 'Website Design', 'Website Mgmt. Services', 'Social Media Mgmt. Services', 'Consulting', 'Commercial Campaign', 'Live Event Services', 'Other'],
      leadSource: ['Google', 'LinkedIn', 'Facebook', 'Instagram', 'Yelp', 'Referral', 'Other'],
      budget: ['< $1,000', '$1,000 - $2,000', '$2,000 - $3,000', '$3,000 - $5,000', '$5,000 - $7,000', '$7,000 - $10,000', '> $10,000', 'Not sure yet'],
    },
    termsUrl: 'https://www.filmtwist.com/terms-and-conditions',
    privacyUrl: 'http://filmtwist.com/privacy-policy',
    /** The form's configured thank-you text, verbatim. */
    thankYouText: 'Thank you for taking the time to complete this form. Please check your email for next steps.',
  },
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
  /** Review feedback sink: a Google Form owned by the project owner (Drive: Client Work/FilmTwist/03 - Discovery &
   *  Research, "FilmTwist - FSM Website Feedback - v1 - 2026-10-27"). The hub posts form-encoded answers to it; the ids
   *  below are public form field ids, not secrets. Set VITE_FEEDBACK=off to disable sending. */
  feedbackEnabled: import.meta.env.VITE_FEEDBACK !== 'off',
  feedbackForm: {
    action: 'https://docs.google.com/forms/d/e/1FAIpQLSfxLQn7be7vDlioYzPOruaodBO59_7rQhT5m-xlKPTJjT2hTg/formResponse',
    fields: {
      reviewer: 'entry.94783242',
      submittedAt: 'entry.689904670',
      page: 'entry.1299720284',
      markdown: 'entry.146796121',
      json: 'entry.958974456',
      concepts: {
        clean: { decision: 'entry.553541415', overall: 'entry.1171737971' },
        creative: { decision: 'entry.1585371997', overall: 'entry.944882537' },
        story: { decision: 'entry.1440135353', overall: 'entry.335769173' },
        original: { decision: 'entry.738929427', overall: 'entry.721860725' },
      },
      /** Concept 05, the merged direction: its own fields and its own send (added to the same form 10/28/2026). */
      merged: {
        resolves: 'entry.1136712824',
        notes: 'entry.741865373',
        fonts: 'entry.528543258',
        storyLength: 'entry.569794535',
        teamSection: 'entry.1582022351',
        markdown: 'entry.988458610',
      },
      /** Concept 06, the current direction: its own fields and its own send (added to the same form 10/28/2026). */
      current: {
        resolves: 'entry.586107830',
        notes: 'entry.535067219',
        type: 'entry.764680778',
        color: 'entry.1637215238',
        markdown: 'entry.1912088952',
      },
    },
  },

  /** Legal placeholders. Do not fabricate policy text. */
  legal: {
    privacyUrl: '', // REQUIRES_CLIENT_CONFIRMATION
    termsUrl: '', // REQUIRES_CLIENT_CONFIRMATION
    copyrightHolder: 'Full School Marketing',
  },
} as const;

export const ctaHref = siteConfig.consultationApproved ? siteConfig.provisionalBookingUrl : siteConfig.consultationUrl;
