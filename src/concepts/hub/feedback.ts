import { concepts } from '../../content/concepts';
import { siteConfig } from '../../content/config';

export type Decision = 'prefer' | 'combine' | 'reject' | 'undecided' | '';
export interface ConceptFeedback {
  overall: number; brandFit: number; serviceClarity: number; distinctiveness: number;
  favorite: string; change: string; decision: Decision;
}
export interface FeedbackState { reviewer: string; concepts: Record<string, ConceptFeedback>; updatedAt: string; sentAt: string }

export const STORAGE_KEY = 'fsm-review-feedback-v1';
export const emptyConcept = (): ConceptFeedback => ({ overall: 0, brandFit: 0, serviceClarity: 0, distinctiveness: 0, favorite: '', change: '', decision: '' });
export const emptyState = (): FeedbackState => ({ reviewer: '', concepts: Object.fromEntries(concepts.map((c) => [c.id, emptyConcept()])), updatedAt: '', sentAt: '' });

export function loadState(): FeedbackState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as Partial<FeedbackState>;
    const base = emptyState();
    return { ...base, ...parsed, concepts: { ...base.concepts, ...(parsed.concepts ?? {}) } };
  } catch { return emptyState(); }
}
export function saveState(s: FeedbackState): boolean {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); return true; } catch { return false; }
}
export function clearState() { try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ } }

export const ratingFields: { key: keyof Pick<ConceptFeedback, 'overall' | 'brandFit' | 'serviceClarity' | 'distinctiveness'>; label: string }[] = [
  { key: 'overall', label: 'Overall direction' },
  { key: 'brandFit', label: 'Brand fit' },
  { key: 'serviceClarity', label: 'Service clarity' },
  { key: 'distinctiveness', label: 'Creative distinctiveness' },
];

export function hasAnyInput(f: ConceptFeedback) {
  return ratingFields.some((r) => f[r.key] > 0) || f.favorite.trim() || f.change.trim() || f.decision;
}

export function toMarkdown(s: FeedbackState): string {
  const lines = ['# Full School Marketing: website direction feedback', '', `Reviewer: ${s.reviewer || '(not given)'}`, `Saved: ${s.updatedAt || '(unsaved)'}`, `Page: ${typeof location !== 'undefined' ? location.href.split('#')[0] : ''}`, ''];
  for (const c of concepts) {
    const f = s.concepts[c.id];
    lines.push(`## Concept ${c.number}: ${c.name}`);
    if (!f || !hasAnyInput(f)) { lines.push('', '(no feedback recorded)', ''); continue; }
    lines.push('');
    for (const r of ratingFields) lines.push(`- ${r.label}: ${f[r.key] ? `${f[r.key]}/5` : 'not rated'}`);
    lines.push(`- Decision: ${f.decision || 'not set'}`);
    lines.push(`- Favorite element: ${f.favorite.trim() || '(none)'}`);
    lines.push(`- Change request: ${f.change.trim() || '(none)'}`);
    lines.push('');
  }
  return lines.join('\n');
}

export function toJson(s: FeedbackState): string {
  return JSON.stringify({ ...s, concepts: Object.fromEntries(concepts.map((c) => [c.id, { number: c.number, name: c.name, ...s.concepts[c.id] }])) }, null, 2);
}

/** Form-encoded body for the Google Form in siteConfig.feedbackForm: one entry per send, all four concepts. */
export function toFormBody(s: FeedbackState, submittedAt: string): URLSearchParams {
  const f = siteConfig.feedbackForm.fields;
  const body = new URLSearchParams();
  body.set(f.reviewer, s.reviewer.trim());
  body.set(f.submittedAt, submittedAt);
  body.set(f.page, typeof location !== 'undefined' ? location.href.split('#')[0] : '');
  for (const c of concepts) {
    const ids = f.concepts[c.id];
    const v = s.concepts[c.id];
    if (!ids || !v || !hasAnyInput(v)) continue;
    body.set(ids.decision, v.decision || 'not set');
    body.set(ids.overall, v.overall ? String(v.overall) : 'not rated');
  }
  body.set(f.markdown, toMarkdown(s));
  body.set(f.json, toJson(s));
  return body;
}

/**
 * POST the answers to the Google Form. The form endpoint has no CORS headers, so the request runs in no-cors mode and
 * the response is opaque: "sent" means the request left the browser without a network error. No field on the form is
 * required, so a well-formed post is accepted. Verified end to end against the live form; see docs/QA_REPORT.md.
 */
export async function sendFeedback(s: FeedbackState, submittedAt: string): Promise<boolean> {
  try {
    await fetch(siteConfig.feedbackForm.action, { method: 'POST', mode: 'no-cors', body: toFormBody(s, submittedAt) });
    return true;
  } catch { return false; }
}
