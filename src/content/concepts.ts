import { url } from './config';

export interface ConceptMeta {
  id: 'clean' | 'creative' | 'story' | 'original';
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
    name: 'The Enrollment Year',
    label: 'Wildcard / Original',
    workingTitle: 'The Enrollment Year',
    path: url('original/'),
    proposition: 'Pick where your school is in the enrollment year and the whole page re-plans itself around that moment.',
    toneTags: ['Planning desk', 'Seasonal', 'Interactive'],
    distinguishing: 'A season dial that re-sorts services, proof and the CTA around the reader’s own calendar.',
    matrix: { brandFeel: 'Advisor, not vendor', motion: 'Low to moderate', strength: 'Speaks to deadlines school leaders already feel', tradeoff: 'Asks the visitor to make a choice first', conferenceFit: 'Strong: one tap personalizes the pitch' },
    screenshotDesktop: url('assets/screenshots/original-desktop.webp'),
    screenshotMobile: url('assets/screenshots/original-mobile.webp'),
  },
];

export const hubPath = url('');
