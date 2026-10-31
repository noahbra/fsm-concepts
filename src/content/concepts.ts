import { url } from './config';

export type ConceptId = 'clean' | 'creative' | 'story' | 'original';

export interface ConceptMeta {
  /** The four original directions, plus 'visible' for the merged direction (kept out of `concepts` on purpose). */
  id: ConceptId | 'visible' | 'bold';
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
  label: 'The merged direction, superseded',
  workingTitle: 'Visible',
  path: url('visible/'),
  proposition: "Concept 03's opening story, shortened and skippable, over Concept 01's structure: what we do, the schools, who you work with, the first conversation. One motion rule, no numbers up front.",
  toneTags: ['Story opener', 'Clear', 'One system'],
  distinguishing: 'The first screen names the offer; the story is the brand; everything below it is one card, one palette, one reveal.',
  matrix: { brandFeel: 'The story as the brand, with the kit as referee', motion: 'Moderate (shorter story, skippable, one reveal rule)', strength: 'Answers the first-round notes in one page', tradeoff: 'Distinctiveness lives in the opener', conferenceFit: 'First screen names the offer and carries the button' },
  screenshotDesktop: url('assets/screenshots/visible-desktop.webp'),
  screenshotMobile: url('assets/screenshots/visible-mobile.webp'),
};

/** Concept 06, the current direction (October 28, 2026): Concept 02 rebuilt per docs/CONCEPT_06_BRIEF.md. Kept out of `concepts`. */
export const currentDirection: ConceptMeta = {
  id: 'bold',
  number: '06',
  name: 'Bold, rebuilt',
  label: 'The current direction',
  workingTitle: 'Bold, rebuilt',
  path: url('bold/'),
  proposition: "Concept 02's hero, reel and energy on the kit's blue and green, with what we do right under the hero, the case studies as pages, the team, and a form. No opening story.",
  toneTags: ['Bold', 'Brand color', 'No story'],
  distinguishing: 'The Concept 02 collage and marquee, retokened to the kit, with the Concept 05 services tiles, case pages, team and form.',
  matrix: { brandFeel: 'Confident studio energy in brand color', motion: 'Moderate', strength: 'Keeps what the decision maker rated highest', tradeoff: 'Busier first screen than 01 or 05', conferenceFit: 'Good: visual proof in one swipe' },
  screenshotDesktop: url('assets/screenshots/bold-desktop.webp'),
  screenshotMobile: url('assets/screenshots/bold-mobile.webp'),
};

export const hubPath = url('');

/** The merged direction's version label and the checklist of reviewer notes it answers, shown on the hub. */
export const mergedVersion = { label: 'Version 2.1', date: 'October 28, 2026' };

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
      { note: 'A work-with-us form wired to FilmTwist\'s form system', state: 'done', how: 'The Contact form posts to FilmTwist\'s LeadConnector contact form; submissions land in the FilmTwist account (rebuilt in Version 2.1, below).' },
      { note: 'Headers in FSM colors', state: 'done', how: 'Section headings use the kit blue (5.3:1 on white, passes AA).' },
    ],
  },
  {
    round: 'Project review of Version 2, October 28',
    items: [
      { note: 'The embedded FilmTwist form is confusing; make it an FSM form', state: 'done', how: 'A Full School Marketing form in the site\'s own type and colors, with the same fields, options and consent text as FilmTwist\'s form. It still posts to FilmTwist\'s form service, so leads land in the same place. One real submission is needed to confirm the lead arrives.' },
      { note: 'The first scroll should move the brand at once; it feels stuck', state: 'done', how: 'No opening hold. On the first scroll the logo rises, the tagline dissolves and the dot drops from the period in one motion.' },
      { note: 'Revise the tagline under the logo', state: 'done', how: 'Now "Enrollment marketing for K-12 schools." Wording to confirm.' },
      { note: 'At the end, the school scrolls up and the dot rejoins the logo', state: 'done', how: 'The town scrolls up and out first, then the dot rises into the reconstituted logo as its period.' },
      { note: 'The school\'s windows are wrong; check every object\'s orientation', state: 'done', how: 'The right-hand windows sat past the wall; both rows are now three a side, mirrored about the door. Every other object in the scene was checked (roofs, doors, awnings, bench, lamps, trees, clock, flag, cards, envelope, banners) and sits as drawn.' },
    ],
  },
];

/** The current direction's version label and the checklist of reviewer notes it answers, shown on the hub. No names. */
export const currentVersion = { label: 'Concept 06c (Version 3.3)', date: 'October 30, 2026' };
/** Earlier versions of Concept 06, each a frozen build of the commit the client reviewed, served at its own address without review chrome. */
export const previousVersions: { label: string; detail: string; path: string }[] = [
  { label: 'Concept 06a', detail: 'Version 1, October 28', path: '6a/bold/' },
  { label: 'Concept 06b', detail: 'Version 2, October 29', path: '6b/bold/' },
];
export const currentChecklist: { round: string; items: ChecklistItem[] }[] = [
  {
    round: 'Reviews of Version 3, October 30',
    items: [
      { note: 'Does the site read as if FSM has worked with only three schools?', state: 'done', how: 'A "Schools we\'ve worked with" strip now sits above the three case studies with every school on the brand owner\'s list (eleven), one logo tile each. Logos are from each school\'s public site; reuse needs the schools\' and FSM\'s approval.' },
      { note: 'Schools strip: lower on the page, scrolling, every logo on white', state: 'done', how: 'Now below the three case studies as one slow looping row (pauses under the pointer; static rows when the device asks for reduced motion). Aspire\'s wordmark is set in its own purple and Education for Change\'s in the blue of its dark version, so no tile needs a dark backstop.' },
      { note: 'Two more schools: Morgan Autism Center and Visions In Education', state: 'done', how: 'Added October 30 at the project owner\'s request, logos from each site\'s own vector. With Pathways Charter School, fourteen tiles.' },
      { note: 'Pathways Charter School', state: 'done', how: 'Added October 30 once the brand owner named it (pathwayscharter.org, TK-12 independent study). The logo is the site\'s own mark and wordmark set side by side, as its header sets them.' },
      { note: 'Aspire logo', state: 'done', how: 'Now Aspire\'s own purple-on-white horizontal file from FSM\'s brand folder (October 30), in place of the recolored web version.' },
      { note: 'Anawakalmekak and Washington Yu Ying: include them?', state: 'done', how: 'Both in, per the brand owner (October 30). Anawakalmekak\'s only public logo is small; a larger file is still welcome.' },
      { note: 'Education for Change logo', state: 'partly', how: 'Only the light version (cream lettering) is published and FSM has no file for the current logo (October 30), so the wordmark stays recolored in the blue of its own dark version. It swaps the day a file turns up.' },
      { note: 'Full names for Rhett, David, Kien and Stefan?', state: 'done', how: 'First names only, per the decision maker (October 30). The roster is unchanged.' },
      { note: 'Pat Angeles\'s title', state: 'done', how: 'Studio Administrator, confirmed by the decision maker on October 30.' },
    ],
  },
  {
    round: 'Reviews of Version 2, October 29',
    items: [
      { note: 'Is that green in the brand guide? It feels off; do not lean into that much green', state: 'done', how: 'It was not a guide color: the kit green darkened so white type stayed readable. The hero is back on the kit blue, as in Version 1, with the guide\'s greens as accents only. The one-photo hero stays.' },
      { note: 'Staff: remove Jesse, Sunny and Alec; add Pat Angeles in Alec\'s place', state: 'done', how: 'Done as sent, with the headshot from the email. Her title, Studio Administrator, was confirmed on October 30.' },
      { note: 'Keep the opening animation; it is short enough to keep people engaged', state: 'done', how: 'Kept. It no longer carries its own headline; the page headline is the first thing on screen when the mark lands.' },
    ],
  },
  {
    round: 'Reviews of Version 1, October 29',
    items: [
      { note: 'The opening is still a little busy; open with a logo animation, then a bold statement, then the page', state: 'done', how: 'The opener is the mark as it animates at the top of the FSM module videos, rebuilt for the web: the dot, the hand, the leaves, the wordmark, then the mark settles into the header and the page is there, headline first. It replays on every load while the site is in review; any scroll or tap skips it, nothing under reduced motion.' },
      { note: 'Not a fan of the three little thumbnails in the hero', state: 'done', how: 'The collage is gone. The hero is the statement beside one campaign photograph.' },
      { note: 'Lean more into the brand colors at the open, and into the greens', state: 'partly', how: 'The opener is the mark in its own colors on white. The green hero field this produced was read as too much green in the next review and is back on the kit blue.' },
      { note: 'The reel crops the creatives; enlarge on hover', state: 'done', how: 'Every creative shows whole at its own proportion. Hovering enlarges it in place; a click or tap opens it full size.' },
      { note: 'The staff list is out of date', state: 'done', how: 'Updated from the brand owner\'s note the same day: nine people, with Pat Angeles added.' },
      { note: 'The headline type works', state: 'done', how: 'Unchanged.' },
    ],
  },
  {
    round: 'Review of Concept 05, October 28',
    items: [
      { note: 'Drop the opening video; it is confusing', state: 'done', how: 'No story on this page: not as an opener, a pop-up or a link. Concepts 03 and 05 stay on the hub for the record.' },
      { note: 'Too far from Concept 02; the best of it was lost', state: 'done', how: 'Concept 02\'s code is the base: its hero, headline face, kinetic headline, collage, reel and four partner steps are back.' },
      { note: 'Concept 05 feels too plain', state: 'done', how: 'Display type at full weight, the collage with its pointer tilt, the marquee, and the brand blue as the surface of the hero, the reel and the final call.' },
    ],
  },
  {
    round: 'First-round notes on Concept 02, October 27',
    items: [
      { note: 'Change a few colors to bring out the brand', state: 'done', how: 'Kit blue takes over from black on the hero, reel and final call; kit green is the accent and the button; teal sits in the gradients. Light sections use the kit blue for headings.' },
      { note: 'The graphics are busy; borrow the simplicity of Concept 01\'s photos', state: 'partly', how: 'Three collage panels instead of four, no sticker, no numbered badges, one photo per card, no photo filters. The marquee and the tilt are kept on purpose.' },
      { note: 'Keep the fonts and the interactivity', state: 'partly', how: 'Concept 02\'s headline face stays for every heading; the brand guide\'s Josefin Sans replaces it for everything read (body, tiles, form, footer). The kinetic headline, tilt and marquee are kept.' },
      { note: 'Only the hero worked; too much information after the work; no hard numbers up front', state: 'done', how: 'The hero is kept. The ledger and the results tiles are gone: five service tiles with one line each come right under the reel, and the first figure on the page is on the case cards, each with its period and source.' },
      { note: 'What we do under the hero, then the case studies', state: 'done', how: 'Hero, reel, what we do, work, who you work with, how we partner, work with us.' },
    ],
  },
  {
    round: 'Standing asks from the project reviews, October 28',
    items: [
      { note: 'Service cells the same size, as a visual', state: 'done', how: 'Five equal tiles with icons, from Concept 05.' },
      { note: 'Case studies as pages on this site', state: 'done', how: 'Each campaign has its own page here in this chrome: results, the work, campaign creative, the published source at the foot.' },
      { note: 'Cut-out photos of the team', state: 'done', how: 'The eleven cut-outs from Concept 05, names and roles as published. Reuse to confirm.' },
      { note: 'An FSM form that posts to FilmTwist\'s form system', state: 'done', how: 'Concept 05\'s form, restyled: same fields, options and consent text, posting to FilmTwist\'s form service. One real submission is still needed to confirm the lead arrives.' },
      { note: 'Headers in FSM colors; revised tagline', state: 'done', how: 'Light-section headings carry the kit blue; the hero eyebrow is "Enrollment marketing for K-12 schools". Wording to confirm.' },
    ],
  },
];
