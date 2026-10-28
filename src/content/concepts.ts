import { url } from './config';

export type ConceptId = 'clean' | 'creative' | 'story' | 'original';

export interface ConceptMeta {
  /** The four original directions, plus 'visible' for the merged direction (kept out of `concepts` on purpose). */
  id: ConceptId | 'visible';
  number: string;
  name: string;
  label: string;
  workingTitle: string;
  path: string;
  proposition: string;
  toneTags: string[];
  distinguishing: string;
  matrix: { brandFeel: string; motion: string; strength: string; tradeoff: string; conferenceFit: string };
  screenshotDesktop: string;
  screenshotMobile: string;
}

export const concepts: ConceptMeta[] = [
  {
    id: 'clean',
    number: '01',
    name: 'Clean & Modern',
    label: 'Clean & Modern',
    workingTitle: 'A Clearer Path to Enrollment',
    path: url('clean/'),
    proposition: 'Editorial clarity with oversized real campaign work as the visual punctuation. Competence first, nothing to decode.',
    toneTags: ['Understated', 'Editorial', 'Authoritative'],
    distinguishing: 'Asymmetric hero and wide, art-directed case thumbnails that outperform the clean reference sites.',
    matrix: { brandFeel: 'Calm, credible, brand-guide faithful', motion: 'Low', strength: 'Fastest to understand services', tradeoff: 'Least surprising', conferenceFit: 'Strong: reads instantly on a phone' },
    screenshotDesktop: url('assets/screenshots/clean-desktop.webp'),
    screenshotMobile: url('assets/screenshots/clean-mobile.webp'),
  },
  {
    id: 'creative',
    number: '02',
    name: 'Bold & Creative',
    label: 'Bold & Creative',
    workingTitle: 'Creative That Fills Classrooms',
    path: url('creative/'),
    proposition: 'A campaign showcase first, an agency second. The work makes the argument before the copy does.',
    toneTags: ['Expressive', 'High contrast', 'Gallery'],
    distinguishing: 'Layered media hero, working portfolio filters, and inline campaign expansion.',
    matrix: { brandFeel: 'Confident studio energy', motion: 'Moderate', strength: 'Proves production quality fastest', tradeoff: 'Heavier page, busier first screen', conferenceFit: 'Good: visual proof in one swipe' },
    screenshotDesktop: url('assets/screenshots/creative-desktop.webp'),
    screenshotMobile: url('assets/screenshots/creative-mobile.webp'),
  },
  {
    id: 'story',
    number: '03',
    name: 'The Invisible School',
    label: 'The Invisible School',
    workingTitle: 'The Invisible School',
    path: url('story/'),
    proposition: 'A scroll-driven story: the period from the tagline becomes a character that helps an undiscovered school get found.',
    toneTags: ['Playful', 'Narrative', 'Memorable'],
    distinguishing: 'Pinned side-scrolling illustrated town that fills with color, with a full service site beneath.',
    matrix: { brandFeel: 'Warm, clever, distinctive', motion: 'High (with skip and reduced-motion versions)', strength: 'Most memorable; a conversation starter', tradeoff: 'Longest path to services; animation maintenance', conferenceFit: 'Mixed: delightful, but scroll cost is highest' },
    screenshotDesktop: url('assets/screenshots/story-desktop.webp'),
    screenshotMobile: url('assets/screenshots/story-mobile.webp'),
  },
  {
    id: 'original',
    number: '04',
    name: 'Start With Your Number',
    label: 'Wildcard / Original',
    workingTitle: 'Start With Your Number',
    path: url('original/'),
    proposition: 'The page opens with the one number a school leader already knows, the seats to fill, and works out what it takes from three published campaigns.',
    toneTags: ['Worksheet', 'Data-first', 'Consultative'],
    distinguishing: 'The only concept where the reader does something: a live worksheet, proof shown as funnels, and the first-call checklist.',
    matrix: { brandFeel: 'The agency that asks for your numbers first', motion: 'Low (figures ease to new values)', strength: 'Makes the visitor\'s school the subject; proof is comparable, sourced data', tradeoff: 'Ranges are wide and honest; needs client sign-off on using campaign figures this way', conferenceFit: 'Strong: one slider at the booth, a number to leave with' },
    screenshotDesktop: url('assets/screenshots/original-desktop.webp'),
    screenshotMobile: url('assets/screenshots/original-mobile.webp'),
  },
];

/**
 * Concept 05, the merged direction built from the October 27, 2026 review (docs/CONCEPT_05_BRIEF.md).
 * Deliberately NOT in `concepts`: the hub presents it above the four originals with its own question
 * ("does this resolve your notes?") instead of inviting a five-way vote.
 */
export const mergedDirection: ConceptMeta = {
  id: 'visible',
  number: '05',
  name: 'Visible',
  label: 'The merged direction',
  workingTitle: 'Visible',
  path: url('visible/'),
  proposition: "Concept 03's opening story, shortened and skippable, over Concept 01's structure: what we do, the schools, who you work with, the first conversation. One motion rule, no numbers up front.",
  toneTags: ['Story opener', 'Clear', 'One system'],
  distinguishing: 'The first screen names the offer; the story is the brand; everything below it is one card, one palette, one reveal.',
  matrix: { brandFeel: 'The story as the brand, with the kit as referee', motion: 'Moderate (shorter story, skippable, one reveal rule)', strength: 'Answers the first-round notes in one page', tradeoff: 'Distinctiveness lives in the opener', conferenceFit: 'First screen names the offer and carries the button' },
  screenshotDesktop: url('assets/screenshots/visible-desktop.webp'),
  screenshotMobile: url('assets/screenshots/visible-mobile.webp'),
};

export const hubPath = url('');

/** The merged direction's version label and the checklist of reviewer notes it answers, shown on the hub. */
export const mergedVersion = { label: 'Version 2', date: 'October 28, 2026' };

export type ChecklistState = 'done' | 'partly' | 'not-done';
export interface ChecklistItem { note: string; state: ChecklistState; how: string }
export const mergedChecklist: { round: string; items: ChecklistItem[] }[] = [
  {
    round: 'First-round reviews, October 27',
    items: [
      { note: 'Keep the animated opener, but shorter, and let people skip it', state: 'done', how: 'The story runs at about half of Concept 03\'s length, with a skip link on the first screen.' },
      { note: 'Put what we do right under the hero, then the case studies', state: 'done', how: 'Services are the first section after the opener; the three campaigns follow.' },
      { note: 'Simpler graphics, like Concept 01\'s photos', state: 'done', how: 'One card style, photo-led. Concept 02\'s collage, marquee and kinetic type are not used.' },
      { note: 'Bring out more of the brand colors', state: 'done', how: 'Headings in the kit blue, kit-blue buttons, brand tints in the story\'s quiet palette, kit green and teal as accents.' },
      { note: 'Keep the fonts and the interactivity', state: 'partly', how: 'Josefin Sans, the brand guide\'s typeface, throughout rather than Concept 02\'s Archivo. Interactivity is one system: the story, a reveal on photos, cards that expand in place.' },
      { note: 'No hard numbers or estimates up front', state: 'done', how: 'No figures until the case studies, where each number carries its unit, period and source.' },
      { note: 'Less text; no wall of text after the work', state: 'done', how: 'One line per service, under 60 words per section below the hero.' },
      { note: 'The story as a pop-up video instead of the opener', state: 'not-done', how: 'Kept as the opener because the brand review rated it as the brand; the skip makes it optional. A one-screen hero with a "Watch the story" button is ready to build if the pop-up is still wanted.' },
      { note: 'Better thumbnail photos', state: 'partly', how: 'The cards lead with the strongest published campaign photos. New photography is a production item.' },
    ],
  },
  {
    round: 'Project review of Version 1, October 28',
    items: [
      { note: 'Service cells the same size, as a visual', state: 'done', how: 'Five equal tiles, each with an icon.' },
      { note: 'Case studies as pages on this site, not links to filmtwist.com', state: 'done', how: 'Each campaign has its own page here: results, the work, campaign creative. The published source is cited at the foot.' },
      { note: 'Cut-out photos of the team for "Who you work with"', state: 'done', how: 'Eleven team members from the FilmTwist About page, names and roles as published. Reuse to confirm.' },
      { note: 'A work-with-us form wired to FilmTwist\'s form system', state: 'done', how: 'FilmTwist\'s LeadConnector contact form is embedded in the Contact section; submissions go to the FilmTwist account.' },
      { note: 'Headers in FSM colors', state: 'done', how: 'Section headings use the kit blue (5.3:1 on white, passes AA).' },
    ],
  },
];
