/**
 * Verified FilmTwist K-12 case studies. Every figure below was re-read from the live source page on 10/26/2026
 * (Alpha on 11/2/2026) and matches the build brief. Metrics are FilmTwist-reported, historical, and attributed to the specific case
 * and reporting window. Never combine them, never relabel leads or applications as enrollments.
 * Published ROI percentages are intentionally omitted (definitions unvalidated; see docs/CONTENT_AND_CLAIMS.md).
 */
import { campaignMedia, type MediaAsset, type GalleryCategory } from './media';
import type { ServiceId } from './services';

export type MetricUnit = 'leads' | 'applications' | 'enrollments' | 'cost-per-lead';

export interface Metric {
  unit: MetricUnit;
  label: string;
  value: number;
  /** Pre-formatted display string, e.g. "3,034" or "$31.21" */
  display: string;
  /** Use for the single headline metric on a card */
  headline?: boolean;
}

export interface CaseStudy {
  id: 'aspire' | 'friendship' | 'alpha';
  school: string;
  shortName: string;
  /** From the FilmTwist source page */
  descriptor: string;
  location: string;
  gradeBand: string;
  /** Services as named on the source page */
  servicesDescribed: string[];
  /** Mapped to the provisional FSM service ids */
  services: ServiceId[];
  period: { start: string; end: string; label: string };
  metrics: Metric[];
  /** Short summary of what the creative did (plain language, from the source page) */
  summary: string;
  /** 2-3 proof points about the creative work, from the source page */
  story: string[];
  channels: string[];
  sourceUrl: string;
  caption: string;
  /** Rights state for the media below */
  assetsReady: 'approved' | 'pending-approval' | 'concept-art';
  hero: MediaAsset;
  gallery: MediaAsset[];
  tags: GalleryCategory[];
}

const A = 'https://www.filmtwist.com/work/aspire-public-schools';
const F = 'https://www.filmtwist.com/work/friendship-pcs';
const AL = 'https://www.filmtwist.com/work/alpha-public-schools';

export const caseStudies: CaseStudy[] = [
  {
    id: 'aspire',
    school: 'Aspire Public Schools',
    shortName: 'Aspire',
    descriptor: 'Public charter network, 36 schools, tuition-free TK through grade 12',
    location: 'California', // inferred from campaign creative ("Aspire Public Schools Bay Area" ad); not stated on the source page. REQUIRES_CLIENT_CONFIRMATION
    gradeBand: 'TK-12',
    servicesDescribed: ['Student/Staff Recruitment', 'Photo/Video Creative', 'Digital Advertising', 'Organic Social'],
    services: ['strategy', 'creative', 'advertising', 'outreach'],
    period: { start: '2022-07', end: '2023-06', label: 'July 2022 to June 2023' },
    metrics: [
      { unit: 'leads', label: 'Leads', value: 3034, display: '3,034', headline: true },
      { unit: 'applications', label: 'Applications', value: 895, display: '895' },
      { unit: 'cost-per-lead', label: 'Average cost per lead', value: 38, display: '$38' },
    ],
    summary: 'A full campaign year of family-facing digital advertising, school photography and video, and nurture email across a 36-school network.',
    story: [
      'Google, Facebook and Instagram campaigns highlighting Aspire programs to prospective families.',
      'Photo and video days capturing special events, sports days, classrooms and graduations.',
      'A new motto announcement video produced with the Aspire team.',
      'Targeted email to interested parents through the application window.',
    ],
    channels: ['Google', 'Facebook', 'Instagram', 'Email', 'Photo/Video', 'Mailers', 'Bus ads'],
    sourceUrl: A,
    caption: 'FilmTwist-reported results, July 2022 to June 2023.',
    assetsReady: 'approved', // campaign photos approved by the brand owner, November 3, 2026
    // The playground group leads the card since November 4, 2026 (the project owner's pick); Math Field Day led it on November 3
    // (the chalk still before that, faces down, read as weak against the other two cards). Note the card crops the wide frame to 4:3.
    hero: campaignMedia('aspire', 'playground-wide', 'Aspire students lined up on playground equipment, smiling', { sourceUrl: A, category: 'video-photo' }),
    gallery: [
      campaignMedia('aspire', 'social-ads-mockup', 'Phone mockups of Aspire Public Schools Facebook ad and Instagram grid', { sourceUrl: A, category: 'digital-ads', caption: 'Social ads' }),
      campaignMedia('aspire', 'mailer-and-bus-ads', 'Aspire mailer design examples and bus advertisement designs', { sourceUrl: A, category: 'print-ooh', caption: 'Mailers and bus ads' }),
      campaignMedia('aspire', 'math-field-day', 'Aspire students building a structure during Math Field Day', { sourceUrl: A, category: 'video-photo', caption: 'School photography' }),
      campaignMedia('aspire', 'student-portrait', 'Aspire student in a CHA hoodie writing at a desk', { sourceUrl: A, category: 'video-photo', caption: 'School photography' }),
      campaignMedia('aspire', 'classroom-photo', 'Two Aspire students drawing a large chalk numeral on blacktop', { sourceUrl: A, category: 'video-photo', caption: 'School photography' }),
      campaignMedia('aspire', 'graduation', 'Aspire graduate in cap and gown with a family member', { sourceUrl: A, category: 'video-photo', caption: 'Graduation' }),
      campaignMedia('aspire', 'sports-day', 'Aspire student crouched at a starting line on sports day', { sourceUrl: A, category: 'video-photo', caption: 'Sports day' }),
      campaignMedia('aspire', 'uniform-portrait', 'Two Aspire students in green uniforms at an outdoor event', { sourceUrl: A, category: 'enrollment', caption: 'Enrollment campaign' }),
    ],
    tags: ['enrollment', 'video-photo', 'digital-ads', 'print-ooh'],
  },
  {
    id: 'friendship',
    school: 'Friendship Public Charter School',
    shortName: 'Friendship PCS',
    descriptor: 'Public charter network, 16 campuses, tuition-free PK3 through grade 12',
    location: 'Washington, D.C.',
    gradeBand: 'PK3-12',
    servicesDescribed: ['Student/Staff Recruitment', 'Digital Advertising', 'Distribution'],
    services: ['strategy', 'advertising', 'outreach', 'creative'],
    // Figures from FilmTwist's 2025 leads report (February to September 2025; October to December were brand-awareness months and
    // are not counted), supplied by the brand owner on November 3, 2026 in place of the published December 2021 to September 2022
    // results (1,134 leads, 102 applications, 78 confirmed enrollments, $31.21). The leads report carries no enrollment count; the 43
    // enrollments are the client's conservative figure for this window, supplied November 4, 2026 (Version 3.13).
    period: { start: '2025-02', end: '2025-09', label: 'February to September 2025' },
    metrics: [
      { unit: 'leads', label: 'Leads', value: 1022, display: '1,022', headline: true },
      { unit: 'applications', label: 'Applications', value: 51, display: '51' },
      { unit: 'enrollments', label: 'Enrollments', value: 43, display: '43' },
      { unit: 'cost-per-lead', label: 'Average cost per lead', value: 26.01, display: '$26.01' },
    ],
    summary: 'Five campaigns across a 16-campus network, pairing digital advertising with direct mail and transit creative so families saw the school online and in their neighborhood.',
    story: [
      'Google, TikTok and Meta campaigns tailored to the needs of different campuses.',
      'Direct mail to target households, plus transit ads on bike-share units, metro stations and shelters.',
      'Email follow-up to interested parents, so online and physical touchpoints told one story.',
    ],
    channels: ['Google', 'TikTok', 'Meta', 'Email', 'Direct mail', 'Transit ads'],
    sourceUrl: F,
    caption: 'FilmTwist-reported results from the 2025 leads campaign, February to September 2025.',
    assetsReady: 'approved', // campaign photos approved by the brand owner, November 3, 2026
    // The classroom photograph leads the card since November 4, 2026 (the project owner's pick): the Woodridge ad exists only at
    // 686 px and its type and logo went soft on large screens. It moves to the gallery.
    hero: campaignMedia('friendship', 'classroom-group', 'Friendship PCS students and teacher gathered in a classroom, waving', { sourceUrl: F, category: 'video-photo' }),
    gallery: [
      campaignMedia('friendship', 'ad-education-starts-at-woodridge', 'Friendship PCS ad: two smiling students with the headline Education starts at Woodridge', { sourceUrl: F, category: 'digital-ads', caption: 'Digital ad' }),
      campaignMedia('friendship', 'ad-learn-and-make-memories', 'Friendship PCS ad with a young cheerleader framed in a phone screen: Learn and make memories', { sourceUrl: F, category: 'digital-ads', caption: 'Digital ad' }),
      campaignMedia('friendship', 'ad-innovation-in-education', 'Friendship PCS ad: three young students painting, headline Innovation in Education', { sourceUrl: F, category: 'digital-ads', caption: 'Digital ad' }),
      campaignMedia('friendship', 'transit-shelter-and-rail-poster', 'Friendship PCS transit shelter ad designs and 2-sheet rail poster', { sourceUrl: F, category: 'print-ooh', caption: 'Transit shelter ads and rail poster' }),
      campaignMedia('friendship', 'direct-mail', 'Friendship PCS direct mail designs with Apply Today headline', { sourceUrl: F, category: 'print-ooh', caption: 'Direct mail' }),
    ],
    tags: ['enrollment', 'digital-ads', 'print-ooh'],
  },
  {
    id: 'alpha',
    school: 'Alpha Public Schools',
    shortName: 'Alpha',
    descriptor: 'Public charter network, four schools, tuition-free kindergarten through grade 12',
    location: 'San Jose, California', // not stated on the source page; from the school's public job-board page (edjoin.org/alphaps: "San Jose, CA 95122"), read 11/2/2026. REQUIRES_CLIENT_CONFIRMATION
    gradeBand: 'K-12',
    servicesDescribed: ['Student/Staff Recruitment', 'Photo/Video Creative', 'Digital Advertising', 'Organic Social'],
    services: ['strategy', 'creative', 'advertising', 'outreach'],
    period: { start: '2022-07', end: '2023-06', label: 'July 2022 to June 2023' },
    metrics: [
      { unit: 'leads', label: 'Leads', value: 417, display: '417', headline: true },
      { unit: 'applications', label: 'Applications', value: 118, display: '118' },
      { unit: 'cost-per-lead', label: 'Average cost per lead', value: 44, display: '$44' },
    ],
    summary: 'Digital ads and an email campaign that kept interested families engaged, built on photo and video from Alpha’s own classrooms, events and graduations.',
    story: [
      'Google, Facebook and Instagram campaigns showcasing Alpha’s programs to prospective families.',
      'An email campaign to the families who had shown interest, answering common questions and keeping Alpha top of mind.',
      'Photo and video capturing special events, sports days, classroom life and graduations, used across the digital ads.',
    ],
    channels: ['Google', 'Facebook', 'Instagram', 'Email', 'Organic social', 'Photo/Video', 'Mailers'],
    sourceUrl: AL,
    caption: 'FilmTwist-reported results, July 2022 to June 2023.',
    assetsReady: 'approved', // campaign photos approved by the brand owner, November 3, 2026
    hero: campaignMedia('alpha', 'student-smiling', 'Alpha student in a black and gold school jersey, smiling at a classroom desk', { sourceUrl: AL, category: 'video-photo' }),
    gallery: [
      campaignMedia('alpha', 'social-ads', 'Alpha Public Schools Facebook enrollment ad and Instagram feed', { sourceUrl: AL, category: 'digital-ads', caption: 'Social ads and organic feed' }),
      campaignMedia('alpha', 'mailers', 'Two Alpha Public Schools mailers with Enroll Today headlines', { sourceUrl: AL, category: 'print-ooh', caption: 'Mailers' }),
      campaignMedia('alpha', 'folklorico-dancer', 'Alpha student in a blue folklorico dress, dancing at an evening event', { sourceUrl: AL, category: 'video-photo', caption: 'School events' }),
      campaignMedia('alpha', 'winter-concert', 'Alpha students playing flute and clarinet at a winter concert', { sourceUrl: AL, category: 'video-photo', caption: 'School events' }),
      campaignMedia('alpha', 'volleyball', 'Alpha students holding volleyballs on the field', { sourceUrl: AL, category: 'video-photo', caption: 'Sports' }),
      campaignMedia('alpha', 'elementary-classroom', 'Young Alpha students in maroon uniforms in a classroom', { sourceUrl: AL, category: 'video-photo', caption: 'Classroom' }),
      campaignMedia('alpha', 'student-laughing', 'Alpha student laughing with classmates at a classroom table', { sourceUrl: AL, category: 'video-photo', caption: 'Classroom' }),
      campaignMedia('alpha', 'student-writing', 'Alpha student writing at a desk in front of a poster wall', { sourceUrl: AL, category: 'video-photo', caption: 'Classroom' }),
      campaignMedia('alpha', 'student-running', 'Alpha student running across the blacktop', { sourceUrl: AL, category: 'video-photo', caption: 'School photography' }),
      campaignMedia('alpha', 'campus-walkway', 'Walkway between classroom buildings on an Alpha campus', { sourceUrl: AL, category: 'video-photo', caption: 'Campus' }),
    ],
    tags: ['enrollment', 'video-photo', 'digital-ads', 'print-ooh'],
  },
];


export const proofDisclaimer =
  'Results are FilmTwist-reported for the named school and reporting window. Leads, applications and enrollments are separate outcomes and are never combined across campaigns. Past results do not guarantee future outcomes.';

export const assetsNote =
  'Campaign creative shown is from FilmTwist’s published case studies. Client approval for reuse on the FSM site is pending.';

export const headlineMetric = (c: CaseStudy) => c.metrics.find((m) => m.headline) ?? c.metrics[0];

/** All gallery items across cases, for portfolio views. */
export const galleryItems = caseStudies.flatMap((c) => [c.hero, ...c.gallery].map((m) => ({ ...m, caseId: c.id, school: c.school })));
