import { concepts } from '../../content/concepts';

export type Decision = 'prefer' | 'combine' | 'reject' | 'undecided' | '';
export interface ConceptFeedback {
  overall: number; brandFit: number; serviceClarity: number; distinctiveness: number;
  favorite: string; change: string; decision: Decision;
}
export interface FeedbackState { reviewer: string; concepts: Record<string, ConceptFeedback>; updatedAt: string }

export const STORAGE_KEY = 'fsm-review-feedback-v1';
export const emptyConcept = (): ConceptFeedback => ({ overall: 0, brandFit: 0, serviceClarity: 0, distinctiveness: 0, favorite: '', change: '', decision: '' });
export const emptyState = (): FeedbackState => ({ reviewer: '', concepts: Object.fromEntries(concepts.map((c) => [c.id, emptyConcept()])), updatedAt: '' });

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
