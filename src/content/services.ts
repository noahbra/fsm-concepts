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

export const approach = [
  { id: 'seen', title: 'Get seen', line: 'Reach the families who are looking for a school like yours.' },
  { id: 'trust', title: 'Build trust', line: 'Real classrooms, real students, real stories. Not stock photos.' },
  { id: 'action', title: 'Turn interest into action', line: 'Clear next steps: inquiry, tour, application.' },
  { id: 'measure', title: 'Measure what works', line: 'Leads, applications, and cost per lead, reported honestly.' },
] as const;
