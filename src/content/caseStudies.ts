/**
 * Verified FilmTwist K-12 case studies. Every figure below was re-read from the live source page on 10/26/2026
 * and matches the build brief. Metrics are FilmTwist-reported, historical, and attributed to the specific case
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
  id: 'aspire' | 'friendship' | 'envision';
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
const E = 'https://www.filmtwist.com/work/envision-education-2';

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
    assetsReady: 'pending-approval',
    hero: campaignMedia('aspire', 'classroom-photo', 'Two Aspire students drawing a large chalk numeral on blacktop', { sourceUrl: A, category: 'video-photo' }),
    gallery: [
      campaignMedia('aspire', 'social-ads-mockup', 'Phone mockups of Aspire Public Schools Facebook ad and Instagram grid', { sourceUrl: A, category: 'digital-ads', caption: 'Social ads' }),
      campaignMedia('aspire', 'mailer-and-bus-ads', 'Aspire mailer design examples and bus advertisement designs', { sourceUrl: A, category: 'print-ooh', caption: 'Mailers and bus ads' }),
      campaignMedia('aspire', 'playground-wide', 'Aspire students lined up on playground equipment, smiling', { sourceUrl: A, category: 'video-photo', caption: 'School photography' }),
      campaignMedia('aspire', 'student-portrait', 'Aspire student in a CHA hoodie writing at a desk', { sourceUrl: A, category: 'video-photo', caption: 'School photography' }),
      campaignMedia('aspire', 'math-field-day', 'Aspire students building a structure during Math Field Day', { sourceUrl: A, category: 'enrollment', caption: 'Event coverage' }),
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
    period: { start: '2021-12', end: '2022-09', label: 'December 2021 to September 2022' },
    metrics: [
      { unit: 'enrollments', label: 'Confirmed enrollments', value: 78, display: '78', headline: true },
      { unit: 'leads', label: 'Leads', value: 1134, display: '1,134' },
      { unit: 'applications', label: 'Applications', value: 102, display: '102' },
      { unit: 'cost-per-lead', label: 'Average cost per lead', value: 31.21, display: '$31.21' },
    ],
    summary: 'Five campaigns across a 16-campus network, pairing digital advertising with direct mail and transit creative so families saw the school online and in their neighborhood.',
    story: [
      'Google, TikTok and Meta campaigns tailored to the needs of different campuses.',
      'Direct mail to target households, plus transit ads on bike-share units, metro stations and shelters.',
      'Email follow-up to interested parents, so online and physical touchpoints told one story.',
    ],
    channels: ['Google', 'TikTok', 'Meta', 'Email', 'Direct mail', 'Transit ads'],
    sourceUrl: F,
    caption: 'FilmTwist-reported results, December 2021 to September 2022.',
    assetsReady: 'pending-approval',
    hero: campaignMedia('friendship', 'ad-education-starts-at-woodridge', 'Friendship PCS ad: two smiling students with the headline Education starts at Woodridge', { sourceUrl: F, category: 'digital-ads' }),
    gallery: [
      campaignMedia('friendship', 'ad-learn-and-make-memories', 'Friendship PCS ad with a young cheerleader framed in a phone screen: Learn and make memories', { sourceUrl: F, category: 'digital-ads', caption: 'Digital ad' }),
      campaignMedia('friendship', 'ad-innovation-in-education', 'Friendship PCS ad: three young students painting, headline Innovation in Education', { sourceUrl: F, category: 'digital-ads', caption: 'Digital ad' }),
      campaignMedia('friendship', 'transit-shelter-and-rail-poster', 'Friendship PCS transit shelter ad designs and 2-sheet rail poster', { sourceUrl: F, category: 'print-ooh', caption: 'Transit shelter ads and rail poster' }),
      campaignMedia('friendship', 'direct-mail', 'Friendship PCS direct mail designs with Apply Today headline', { sourceUrl: F, category: 'print-ooh', caption: 'Direct mail' }),
      campaignMedia('friendship', 'classroom-group', 'Friendship PCS students and teacher gathered in a classroom, waving', { sourceUrl: F, category: 'enrollment', caption: 'Enrollment campaign' }),
    ],
    tags: ['enrollment', 'digital-ads', 'print-ooh'],
  },
  {
    id: 'envision',
    school: 'Envision Education',
    shortName: 'Envision',
    descriptor: 'Public charter schools, three campuses, grades 6 through 12',
    location: 'California', // inferred from campaign creative (510 area code, SF graduation assets); not stated on the source page. REQUIRES_CLIENT_CONFIRMATION
    gradeBand: '6-12',
    servicesDescribed: ['Student/Staff Recruitment', 'Photo/Video Creative', 'Digital Advertising'],
    services: ['strategy', 'creative', 'advertising'],
    period: { start: '2022-07', end: '2023-06', label: 'July 2022 to June 2023' },
    metrics: [
      { unit: 'leads', label: 'Leads', value: 723, display: '723', headline: true },
      { unit: 'applications', label: 'Applications', value: 101, display: '101' },
      { unit: 'cost-per-lead', label: 'Average cost per lead', value: 64, display: '$64' },
    ],
    summary: 'Campaign messaging built around Envision’s college outcomes, brought to life with school footage, and carried from digital ads to billboards, bus ads and door hangers.',
    story: [
      'Google, Facebook and Instagram campaigns highlighting Envision programs and college acceptance outcomes.',
      'Photo and video capturing events, sports days, classroom life and graduations.',
      'Billboard, bus, door-hanger and mailer creative integrated with the digital campaign.',
    ],
    channels: ['Google', 'Facebook', 'Instagram', 'Photo/Video', 'Billboards', 'Bus ads', 'Door hangers'],
    sourceUrl: E,
    caption: 'FilmTwist-reported results, July 2022 to June 2023.',
    assetsReady: 'pending-approval',
    hero: campaignMedia('envision', 'students-trio', 'Three Envision students smiling in a classroom', { sourceUrl: E, category: 'video-photo' }),
    gallery: [
      campaignMedia('envision', 'bus-and-billboard-ads', 'Envision Academy bus advertisement and billboard design examples', { sourceUrl: E, category: 'print-ooh', caption: 'Bus ads and billboards' }),
      campaignMedia('envision', 'door-hanger-and-mailer', 'Envision Academy door hanger and mailer design examples', { sourceUrl: E, category: 'print-ooh', caption: 'Door hangers and mailers' }),
      campaignMedia('envision', 'college-pennants', 'Three Envision students holding Stanford and Cornell pennants', { sourceUrl: E, category: 'enrollment', caption: 'Enrollment campaign' }),
      campaignMedia('envision', 'graduate', 'Envision graduate in a purple gown and flower crown, smiling', { sourceUrl: E, category: 'video-photo', caption: 'Graduation' }),
      campaignMedia('envision', 'graduation-speaker', 'Speaker at an Envision graduation ceremony', { sourceUrl: E, category: 'video-photo', caption: 'Graduation' }),
      campaignMedia('envision', 'campus-atrium', 'Envision campus atrium with arched balconies', { sourceUrl: E, category: 'video-photo', caption: 'Campus' }),
      campaignMedia('envision', 'teacher-and-students', 'Envision teacher working with two students at a table', { sourceUrl: E, category: 'video-photo', caption: 'Classroom' }),
      campaignMedia('envision', 'classroom-laptop', 'Two Envision students talking over a laptop', { sourceUrl: E, category: 'enrollment', caption: 'Enrollment campaign' }),
      campaignMedia('envision', 'students-outdoor', 'Three Envision students outdoors', { sourceUrl: E, category: 'video-photo', caption: 'School photography' }),
      campaignMedia('envision', 'hug', 'Two Envision students hugging', { sourceUrl: E, category: 'video-photo', caption: 'School photography' }),
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
