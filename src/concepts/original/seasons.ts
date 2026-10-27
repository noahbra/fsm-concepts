import type { ServiceId } from '../../content/services';
import type { CaseStudy } from '../../content/caseStudies';

export type SeasonId = 'fall' | 'winter' | 'spring' | 'summer';

export interface ChecklistItem { text: string; service: ServiceId }

export interface Season {
  id: SeasonId;
  label: string;
  moment: string;
  /** Calendar months (0 = January) that belong to this season */
  months: number[];
  monthLabel: string;
  headline: string;
  sub: string;
  checklist: ChecklistItem[];
  serviceOrder: ServiceId[];
  whyNow: Record<ServiceId, string>;
  leadCase: CaseStudy['id'];
  leadReason: string;
  cta: string;
  /** Growth stage shown at the hub of the ring */
  stage: 0 | 1 | 2 | 3;
}

export const seasons: Season[] = [
  {
    id: 'fall',
    label: 'Fall',
    moment: 'Open house season',
    months: [8, 9, 10],
    monthLabel: 'September to November',
    headline: 'Open house season is here. Is your school on the list?',
    sub: 'Fall is when families start looking. The schools they tour are the schools they already know about. This is the season to get seen before the calendars fill up.',
    checklist: [
      { text: 'Make sure families searching for a school nearby can find yours.', service: 'advertising' },
      { text: 'Capture this year’s classrooms, events and faces while they are full and lively.', service: 'creative' },
      { text: 'Put open house dates and a tour request on one clear mobile-friendly page.', service: 'web' },
      { text: 'Start a short email series for everyone who visits or inquires.', service: 'outreach' },
    ],
    serviceOrder: ['advertising', 'creative', 'web', 'outreach', 'strategy'],
    whyNow: {
      advertising: 'Families are searching now. Be in the results before they build their shortlist.',
      creative: 'Film and photo days early in the year give you a full season of fresh content.',
      web: 'Tour sign-ups and open house dates belong on one page families can find from an ad.',
      outreach: 'A visitor who hears from you within a day is a family who remembers you.',
      strategy: 'Set the target grades and neighborhoods now, so every fall dollar has a job.',
    },
    leadCase: 'friendship',
    leadReason: 'A campaign that ran from early winter through the following fall, across digital, mail and transit.',
    cta: 'Plan your fall open-house push',
    stage: 0,
  },
  {
    id: 'winter',
    label: 'Winter',
    moment: 'Application window',
    months: [11, 0, 1],
    monthLabel: 'December to February',
    headline: 'Application windows are open. Make yours the one families finish.',
    sub: 'Interest without an application is a seat you do not get. Winter is about reminders, clear steps and a reason to act before the deadline.',
    checklist: [
      { text: 'Run deadline-aware ads to the families who already showed interest.', service: 'advertising' },
      { text: 'Send plain-language reminders about what to submit and when.', service: 'outreach' },
      { text: 'Make the application page work on a phone, start to finish.', service: 'web' },
      { text: 'Reach households that search less: mail and transit in your own neighborhoods.', service: 'creative' },
    ],
    serviceOrder: ['advertising', 'outreach', 'web', 'creative', 'strategy'],
    whyNow: {
      advertising: 'Retarget fall visitors and inquiries with the deadline in the headline.',
      outreach: 'Email and direct mail carry the deadline to families who are not online every day.',
      web: 'Every extra step on the application page is a family who meant to finish and did not.',
      creative: 'Transit, mailers and door hangers put your school in the neighborhood, not just the feed.',
      strategy: 'Watch cost per lead and application volume weekly, and move budget to what is working.',
    },
    leadCase: 'friendship',
    leadReason: 'The strongest confirmed-enrollment proof, from a campaign built around an application push.',
    cta: 'Talk about your application window',
    stage: 1,
  },
  {
    id: 'spring',
    label: 'Spring',
    moment: 'Acceptance and decisions',
    months: [2, 3, 4],
    monthLabel: 'March to May',
    headline: 'Offers are out. Now families decide.',
    sub: 'Between acceptance and the first day, families compare, hesitate and change their minds. Spring is when trust gets built or lost.',
    checklist: [
      { text: 'Welcome accepted families with video that shows the school they chose.', service: 'creative' },
      { text: 'Keep a steady drumbeat of events, deadlines and next steps.', service: 'outreach' },
      { text: 'Keep ads running for grades with open seats and second-round lists.', service: 'advertising' },
      { text: 'Review what worked this cycle and set next year’s targets.', service: 'strategy' },
    ],
    serviceOrder: ['creative', 'outreach', 'advertising', 'strategy', 'web'],
    whyNow: {
      creative: 'A welcome video and graduation coverage show accepted families what they said yes to.',
      outreach: 'Accepted families need a reason to stay excited between the offer and registration.',
      advertising: 'Open seats in specific grades still need families. Narrow the campaign, do not stop it.',
      strategy: 'Results are fresh. This is the moment to plan next year’s calendar and budget.',
      web: 'An accepted-families page with dates and FAQs answers questions before they become doubts.',
    },
    leadCase: 'envision',
    leadReason: 'Campaign messaging built around outcomes families weigh when they decide.',
    cta: 'Plan your spring decision campaign',
    stage: 2,
  },
  {
    id: 'summer',
    label: 'Summer',
    moment: 'Registration and the first day',
    months: [5, 6, 7],
    monthLabel: 'June to August',
    headline: 'Summer melt is real. The first day is the finish line.',
    sub: 'Accepted is not enrolled. Summer is registration, reminders and a warm welcome, plus the planning that sets up next year’s campaign.',
    checklist: [
      { text: 'Make registration steps obvious, mobile-friendly and short.', service: 'web' },
      { text: 'Send a welcome sequence that answers first-day questions before they are asked.', service: 'outreach' },
      { text: 'Plan next year’s full campaign calendar while this year’s results are fresh.', service: 'strategy' },
      { text: 'Schedule a film and photo day for the first weeks of school.', service: 'creative' },
    ],
    serviceOrder: ['web', 'outreach', 'strategy', 'creative', 'advertising'],
    whyNow: {
      web: 'Registration that works on a phone is the difference between accepted and enrolled.',
      outreach: 'Reminders, welcome notes and first-day details keep families from drifting.',
      strategy: 'Build the full-year plan now so fall campaigns launch on day one, not week six.',
      creative: 'Book the first-weeks film day now and you will have content for the whole year.',
      advertising: 'Late-summer campaigns can still reach families whose plans changed.',
    },
    leadCase: 'aspire',
    leadReason: 'A full campaign year, July to June, across a 36-school network.',
    cta: 'Talk about summer registration and melt',
    stage: 3,
  },
];

export const seasonForMonth = (month: number): SeasonId =>
  seasons.find((s) => s.months.includes(month))?.id ?? 'fall';

export const seasonById = (id: SeasonId) => seasons.find((s) => s.id === id)!;
