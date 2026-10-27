/**
 * Provisional FSM service categories. These map to FilmTwist's public service portfolio
 * (filmtwist.com: Brand Strategy, Creative Content, Web Design, Digital Advertising, Distribution,
 * Social Media Marketing, K-12 Student Recruitment). Labels are proposed; REQUIRES_CLIENT_CONFIRMATION.
 */
export type ServiceId = 'strategy' | 'creative' | 'advertising' | 'web' | 'outreach';

export interface Service {
  id: ServiceId;
  title: string;
  short: string;
  /** One-line, outcome-oriented. */
  outcome: string;
  /** Two or three sentences in plain language. */
  description: string;
  /** Customer-facing examples of what the work looks like. */
  includes: string[];
  /** Which stage of the family journey this mostly serves. */
  stage: 'seen' | 'trust' | 'action' | 'measure';
}

export const services: Service[] = [
  {
    id: 'strategy',
    title: 'Enrollment Strategy & Positioning',
    short: 'Strategy',
    outcome: 'Know exactly who you are trying to reach, and what will make them choose you.',
    description:
      'We start with your enrollment goals, your grade bands, and the families you most want to serve. Then we shape a message and a plan around what makes your school worth choosing.',
    includes: ['Enrollment goals and target neighborhoods', 'Positioning and messaging', 'Campaign calendar built around your application windows'],
    stage: 'seen',
  },
  {
    id: 'creative',
    title: 'Creative Content: Video, Photography & Design',
    short: 'Creative',
    outcome: 'Show families what a day at your school actually looks like.',
    description:
      'Film and photo days capture classrooms, events, sports days, and graduations. The footage and stills become ads, social content, print pieces, and the images on your website.',
    includes: ['School photography and video days', 'Short-form and vertical video', 'Print, mailer, transit, and billboard design'],
    stage: 'trust',
  },
  {
    id: 'advertising',
    title: 'Digital Advertising & Campaign Management',
    short: 'Advertising',
    outcome: 'Put your school in front of the right families, at the right time, on the platforms they already use.',
    description:
      'Targeted campaigns on Google, Meta, and other platforms, managed through the enrollment season and tuned against cost per lead and application volume.',
    includes: ['Google, Facebook, Instagram, and TikTok campaigns', 'Audience targeting by geography and grade', 'Ongoing optimization and reporting'],
    stage: 'seen',
  },
  {
    id: 'web',
    title: 'School Websites & Landing Pages',
    short: 'Web',
    outcome: 'Give interested families a clear next step the moment they land.',
    description:
      'Campaign landing pages and website improvements that answer the questions families ask first, and make it simple to request a tour or start an application.',
    includes: ['Enrollment landing pages', 'Website refresh and content', 'Inquiry and tour forms'],
    stage: 'action',
  },
  {
    id: 'outreach',
    title: 'Family Outreach, Nurture & Conversion Support',
    short: 'Outreach',
    outcome: 'Turn interest into applications with timely, human follow-up.',
    description:
      'Email sequences, direct mail, and community distribution that keep your school top of mind from first click to first day.',
    includes: ['Nurture email to interested families', 'Direct mail and community distribution', 'Open-house and application reminders'],
    stage: 'action',
  },
];

/**
 * How it works: FilmTwist's published K-12 recruitment funnel workflow
 * (https://www.filmtwist.com/k-12-student-recruitment, read 10/27/2026). Digital ads across Google, Meta
 * (Facebook and Instagram), TikTok and streaming (Spotify, Roku) send interested parents to a landing page
 * that collects contact information and lets them start enrollment; families who do not submit the form
 * get an email campaign. Wording here is adapted for schools; the steps are FilmTwist's.
 */
export const approach = [
  { id: 'ads', title: 'Ads where families already are', line: 'Digital ads made for your school, running on Google, Facebook, Instagram, TikTok and streaming platforms like Spotify and Roku.' },
  { id: 'landing', title: 'A landing page that starts enrollment', line: 'Interested parents land on a page built to answer their first questions, share their contact details, and begin the enrollment process.' },
  { id: 'email', title: 'Follow-up for families who need a nudge', line: 'Families who look but do not apply get an email campaign that brings them back when they are ready.' },
  { id: 'enroll', title: 'Applications you can count', line: 'Leads, applications and enrollments, reported against the campaign window so you can see what the work produced.' },
] as const;
