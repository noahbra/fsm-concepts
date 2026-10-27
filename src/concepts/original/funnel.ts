/**
 * Concept 04 worksheet math. Pure arithmetic on the three verified FilmTwist campaigns in
 * src/content/caseStudies.ts. Nothing here is a forecast: each scenario answers "if a campaign for this school
 * ran at the published ratios of campaign X, what would the numbers be?" and the page shows all three.
 */
import { caseStudies, type CaseStudy } from '../../content/caseStudies';

export interface CampaignRatios {
  id: CaseStudy['id'];
  school: string;
  shortName: string;
  leads: number;
  applications: number;
  enrollments?: number;
  costPerLead: number;
  /** applications / leads */
  applicationRate: number;
  /** enrollments / applications, only where the campaign reported confirmed enrollments */
  enrollmentYield?: number;
  period: string;
  sourceUrl: string;
}

const metric = (c: CaseStudy, unit: CaseStudy['metrics'][number]['unit']) => c.metrics.find((m) => m.unit === unit)?.value;

export const campaigns: CampaignRatios[] = caseStudies.map((c) => {
  const leads = metric(c, 'leads')!;
  const applications = metric(c, 'applications')!;
  const enrollments = metric(c, 'enrollments');
  return {
    id: c.id,
    school: c.school,
    shortName: c.shortName,
    leads,
    applications,
    enrollments,
    costPerLead: metric(c, 'cost-per-lead')!,
    applicationRate: applications / leads,
    enrollmentYield: enrollments ? enrollments / applications : undefined,
    period: c.period.label,
    sourceUrl: c.sourceUrl,
  };
});

/** The one campaign that reported confirmed enrollments (Friendship PCS, 78 of 102). */
export const yieldSource = campaigns.find((c) => c.enrollmentYield)!;
export const DEFAULT_YIELD = Math.round(yieldSource.enrollmentYield! * 100); // 76

export interface Scenario {
  campaign: CampaignRatios;
  inquiries: number;
  budget: number;
}

export interface Worksheet {
  seats: number;
  yieldPct: number;
  applications: number;
  scenarios: Scenario[];
  inquiries: { low: number; high: number };
  budget: { low: number; high: number };
}

export const SEATS = { min: 10, max: 600, step: 5, default: 60 };
export const YIELD = { min: 30, max: 100, step: 1 };

export function compute(seats: number, yieldPct: number): Worksheet {
  const s = Math.min(SEATS.max, Math.max(SEATS.min, Math.round(seats)));
  const y = Math.min(YIELD.max, Math.max(YIELD.min, Math.round(yieldPct))) / 100;
  const applications = Math.ceil(s / y);
  const scenarios = campaigns.map((campaign) => {
    const inquiries = Math.ceil(applications / campaign.applicationRate);
    return { campaign, inquiries, budget: Math.round(inquiries * campaign.costPerLead) };
  });
  const inq = scenarios.map((x) => x.inquiries);
  const bud = scenarios.map((x) => x.budget);
  return {
    seats: s,
    yieldPct: Math.round(y * 100),
    applications,
    scenarios,
    inquiries: { low: Math.min(...inq), high: Math.max(...inq) },
    budget: { low: Math.min(...bud), high: Math.max(...bud) },
  };
}

export const fmt = new Intl.NumberFormat('en-US');
export const fmtMoney = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
export const pct = (x: number) => `${Math.round(x * 100)}%`;
