import { useEffect, useMemo, useRef, useState } from 'react';
import { concepts, currentChecklist, currentDirection, currentVersion, mergedChecklist, mergedDirection, mergedVersion, type ConceptId, type ConceptMeta, previousVersions } from '../../content/concepts';
import { siteConfig, url } from '../../content/config';
import { brand } from '../../content/media';
import { SkipLink } from '../../components/SkipLink';
import { copyText, downloadFile, drawQr } from '../../lib/share';
import {
  clearCurrent, clearMerged, clearState, currentAsks, currentToMarkdown, emptyConcept, hasAnyInput, hasCurrentInput, hasMergedInput, loadCurrent, loadMerged, loadState,
  mergedAsks, mergedToMarkdown, ratingFields, saveCurrent, saveMerged, saveState, sendCurrent, sendFeedback, sendMerged, toJson, toMarkdown,
  type CurrentFeedback, type Decision, type FeedbackState, type MergedFeedback, type Resolves,
} from './feedback';

const REVIEW_DATE = 'October 2026';

function parseConceptFromHash(): ConceptId | null {
  const h = window.location.hash; // "#feedback?concept=clean"
  const m = h.match(/concept=(clean|creative|story|original)/);
  return m ? (m[1] as ConceptId) : null;
}

function ConceptCard({ c, direction }: { c: ConceptMeta; direction?: 'merged' | 'current' }) {
  const [status, setStatus] = useState('');
  const [qr, setQr] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const absolute = window.location.origin + c.path;
  useEffect(() => { if (qr && canvas.current) drawQr(canvas.current, absolute).catch(() => setStatus('QR could not be generated.')); }, [qr, absolute]);
  return (
    <article className={`card${direction ? ` card--${direction}` : ''}`} aria-labelledby={`card-${c.id}`}>
      <div className="card__media">
        <img src={c.screenshotDesktop} width={1440} height={900} alt={`Desktop screenshot of Concept ${c.number}, ${c.name}`} loading="lazy" />
        <img className="card__mobile" src={c.screenshotMobile} width={390} height={844} alt="" loading="lazy" />
        <span className="card__num" aria-hidden="true">{c.number}</span>
      </div>
      <div className="card__body">
        <span className="card__label">Concept {c.number}: {c.label}</span>
        <h3 id={`card-${c.id}`}>{c.name}</h3>
        <p>{c.proposition}</p>
        <ul className="card__tags" aria-label="Tone">{c.toneTags.map((t) => <li key={t}>{t}</li>)}</ul>
        <p className="card__feature"><strong>Distinguishing feature.</strong> {c.distinguishing}</p>
        <div className="card__actions">
          {direction === 'current' ? (
            <>
              <a className="btn btn--primary" href={c.path} data-testid="open-current">Open the current direction</a>
              <a className="btn btn--accent" href="#current-form">Does this resolve your notes?</a>
            </>
          ) : direction === 'merged' ? (
            <>
              <a className="btn btn--primary" href={c.path} data-testid="open-merged">Open the merged direction</a>
              <a className="btn btn--accent" href="#merged-form">Does this resolve your notes?</a>
            </>
          ) : (
            <>
              <a className="btn btn--primary" href={c.path} data-testid="open-concept" data-concept={c.id}>Open concept</a>
              <a className="btn btn--accent" href={`#feedback?concept=${c.id}`} onClick={() => window.dispatchEvent(new CustomEvent('fsm:select-concept', { detail: c.id }))}>Review concept</a>
            </>
          )}
        </div>
        <div className="card__util">
          <a className="btn btn--ghost btn--small" href={c.path} target="_blank" rel="noopener noreferrer">Open in new tab</a>
          <button type="button" className="btn btn--ghost btn--small" onClick={async () => setStatus((await copyText(absolute)) ? 'Link copied.' : 'Copy failed; use the address bar.')}>Copy link</button>
          <button type="button" className="btn btn--ghost btn--small" aria-expanded={qr} onClick={() => setQr((v) => !v)}>{qr ? 'Hide QR' : 'QR code'}</button>
        </div>
        <div className="card__status" role="status" aria-live="polite">{status}</div>
        {qr && <div className="card__qr"><canvas ref={canvas} width={180} height={180} role="img" aria-label={`QR code linking to ${absolute}`} /><span>Scan to open on a phone</span></div>}
      </div>
    </article>
  );
}

function Rating({ conceptId, field, label, value, onChange }: { conceptId: string; field: string; label: string; value: number; onChange: (v: number) => void }) {
  const name = `${conceptId}-${field}`;
  return (
    <fieldset className="rating">
      <legend className="form__legend">{label}</legend>
      <div className="rating__scale">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} style={{ flex: 1, position: 'relative', display: 'flex' }}>
            <input type="radio" id={`${name}-${n}`} name={name} value={n} checked={value === n} onChange={() => onChange(n)} data-testid={`rating-${field}`} />
            <label htmlFor={`${name}-${n}`} style={{ flex: 1 }}>{n}</label>
          </span>
        ))}
      </div>
      <div className="rating__hint" aria-hidden="true"><span>1 = weak</span><span>5 = strong</span></div>
    </fieldset>
  );
}

/** The current direction's own form: one question, two targeted asks, its own send. Never touches the earlier answers. */
function CurrentFeedbackForm() {
  const [m, setM] = useState<CurrentFeedback>(() => loadCurrent());
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const reuseName = () => setM((cur) => (cur.reviewer.trim() ? cur : { ...cur, reviewer: loadMerged().reviewer || loadState().reviewer }));
  useEffect(() => {
    const onHash = () => { if (location.hash.startsWith('#current')) reuseName(); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const firstTouch = useRef(true);
  const justSent = useRef(false);
  useEffect(() => {
    if (firstTouch.current) { firstTouch.current = false; return; }
    const next = { ...m, updatedAt: new Date().toISOString() };
    const ok = saveCurrent(next);
    if (justSent.current) { justSent.current = false; return; }
    setStatus(ok ? `Saved on this device at ${new Date(next.updatedAt).toLocaleTimeString()}.` : 'Could not save on this device (private mode?). Copy before leaving.');
  }, [m]);
  const update = (patch: Partial<CurrentFeedback>) => setM((s) => ({ ...s, ...patch }));
  const submit = async () => {
    if (!siteConfig.feedbackEnabled) return;
    if (!m.reviewer.trim()) { setStatus('Add your name first, so we know whose feedback this is.'); document.getElementById('current-reviewer')?.focus(); return; }
    if (!hasCurrentInput(m)) { setStatus('Answer the question or leave a note before sending.'); return; }
    setSubmitting(true);
    const submittedAt = new Date().toISOString();
    const ok = await sendCurrent(m, submittedAt);
    setSubmitting(false);
    if (ok) { justSent.current = true; setM((s) => ({ ...s, sentAt: submittedAt })); setStatus(`Sent at ${new Date(submittedAt).toLocaleTimeString()}. You can revise and send again; each send is a new entry.`); }
    else setStatus('Could not send (network). Copy instead and email it to the project owner.');
  };
  return (
    <div className="form" id="current-form">
      <fieldset className="rating">
        <legend className="form__legend">Does the current direction resolve your notes?</legend>
        <div className="decision">
          {([['yes', 'Yes'], ['mostly', 'Mostly'], ['no', 'No']] as [Resolves, string][]).map(([v, l]) => (
            <label key={v}><input type="radio" name="current-resolves" value={v} checked={m.resolves === v} onChange={() => update({ resolves: v })} data-testid="current-resolves" /><span>{l}</span></label>
          ))}
        </div>
      </fieldset>
      <div className="form__row">
        <label htmlFor="current-notes">What still needs to change?</label>
        <textarea id="current-notes" value={m.notes} onChange={(e) => update({ notes: e.target.value })} data-testid="current-notes" placeholder="Anything, in your words." />
      </div>
      <div className="form__grid">
        {currentAsks.map((a) => (
          <div className="form__row" key={a.key}>
            <label htmlFor={`current-${a.key}`}>{a.label}</label>
            <p className="form__hint">{a.hint}</p>
            <input id={`current-${a.key}`} type="text" value={m[a.key]} onChange={(e) => update({ [a.key]: e.target.value })} data-testid={`current-${a.key}`} />
          </div>
        ))}
      </div>
      <div className="form__row">
        <label htmlFor="current-reviewer">Reviewer name</label>
        <input id="current-reviewer" type="text" required value={m.reviewer} onChange={(e) => update({ reviewer: e.target.value })} onFocus={reuseName} data-testid="current-reviewer" autoComplete="name" placeholder="So we know whose feedback this is" />
      </div>
      <div className="form__actions">
        {siteConfig.feedbackEnabled && <button type="button" className="btn btn--primary" onClick={submit} disabled={submitting} data-testid="submit-current">{submitting ? 'Sending' : 'Send'}</button>}
        <button type="button" className="btn btn--ghost" onClick={async () => setStatus((await copyText(currentToMarkdown(m))) ? 'Copied to the clipboard.' : 'Copy failed.')} data-testid="copy-current">Copy</button>
        <button type="button" className="btn btn--ghost btn--small" onClick={() => { if (confirm('Clear your saved answers about the current direction on this device?')) { clearCurrent(); setM(loadCurrent()); setStatus('Cleared.'); } }}>Clear</button>
      </div>
      <div className="form__status" role="status" aria-live="polite" data-testid="current-status">{status}</div>
      {m.sentAt && <p className="form__note" data-testid="current-sent">Last sent {new Date(m.sentAt).toLocaleString()}.</p>}
      <p className="form__note">This sends only your answers about the current direction. Your earlier answers are not resent.</p>
    </div>
  );
}

/** The merged direction's own form: one question, three targeted asks, its own send. Never touches the four-concept answers. */
function MergedFeedbackForm() {
  const [m, setM] = useState<MergedFeedback>(() => loadMerged());
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // The name typed into the four-concept form on this same visit is reused here; both forms mount at once,
  // so re-read it when the reviewer arrives at this section or focuses the empty name field.
  const reuseName = () => setM((cur) => (cur.reviewer.trim() ? cur : { ...cur, reviewer: loadState().reviewer }));
  useEffect(() => {
    const onHash = () => { if (location.hash.startsWith('#merged')) reuseName(); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const firstTouch = useRef(true);
  const justSent = useRef(false);
  useEffect(() => {
    if (firstTouch.current) { firstTouch.current = false; return; }
    const next = { ...m, updatedAt: new Date().toISOString() };
    const ok = saveMerged(next);
    if (justSent.current) { justSent.current = false; return; }
    setStatus(ok ? `Saved on this device at ${new Date(next.updatedAt).toLocaleTimeString()}.` : 'Could not save on this device (private mode?). Copy before leaving.');
  }, [m]);
  const update = (patch: Partial<MergedFeedback>) => setM((s) => ({ ...s, ...patch }));
  const submit = async () => {
    if (!siteConfig.feedbackEnabled) return;
    if (!m.reviewer.trim()) { setStatus('Add your name first, so we know whose feedback this is.'); document.getElementById('merged-reviewer')?.focus(); return; }
    if (!hasMergedInput(m)) { setStatus('Answer the question or leave a note before sending.'); return; }
    setSubmitting(true);
    const submittedAt = new Date().toISOString();
    const ok = await sendMerged(m, submittedAt);
    setSubmitting(false);
    if (ok) { justSent.current = true; setM((s) => ({ ...s, sentAt: submittedAt })); setStatus(`Sent at ${new Date(submittedAt).toLocaleTimeString()}. You can revise and send again; each send is a new entry.`); }
    else setStatus('Could not send (network). Copy instead and email it to the project owner.');
  };
  return (
    <div className="form" id="merged-form">
      <fieldset className="rating">
        <legend className="form__legend">Does the merged direction resolve your notes from the first round?</legend>
        <div className="decision">
          {([['yes', 'Yes'], ['mostly', 'Mostly'], ['no', 'No']] as [Resolves, string][]).map(([v, l]) => (
            <label key={v}><input type="radio" name="merged-resolves" value={v} checked={m.resolves === v} onChange={() => update({ resolves: v })} data-testid="merged-resolves" /><span>{l}</span></label>
          ))}
        </div>
      </fieldset>
      <div className="form__row">
        <label htmlFor="merged-notes">What still needs to change?</label>
        <textarea id="merged-notes" value={m.notes} onChange={(e) => update({ notes: e.target.value })} data-testid="merged-notes" placeholder="Anything, in your words." />
      </div>
      <div className="form__grid">
        {mergedAsks.map((a) => (
          <div className="form__row" key={a.key}>
            <label htmlFor={`merged-${a.key}`}>{a.label}</label>
            <p className="form__hint">{a.hint}</p>
            <input id={`merged-${a.key}`} type="text" value={m[a.key]} onChange={(e) => update({ [a.key]: e.target.value })} data-testid={`merged-${a.key}`} />
          </div>
        ))}
      </div>
      <div className="form__row">
        <label htmlFor="merged-reviewer">Reviewer name</label>
        <input id="merged-reviewer" type="text" required value={m.reviewer} onChange={(e) => update({ reviewer: e.target.value })} onFocus={reuseName} data-testid="merged-reviewer" autoComplete="name" placeholder="So we know whose feedback this is" />
      </div>
      <div className="form__actions">
        {siteConfig.feedbackEnabled && <button type="button" className="btn btn--primary" onClick={submit} disabled={submitting} data-testid="submit-merged">{submitting ? 'Sending' : 'Send'}</button>}
        <button type="button" className="btn btn--ghost" onClick={async () => setStatus((await copyText(mergedToMarkdown(m))) ? 'Copied to the clipboard.' : 'Copy failed.')} data-testid="copy-merged">Copy</button>
        <button type="button" className="btn btn--ghost btn--small" onClick={() => { if (confirm('Clear your saved answers about the merged direction on this device?')) { clearMerged(); setM(loadMerged()); setStatus('Cleared.'); } }}>Clear</button>
      </div>
      <div className="form__status" role="status" aria-live="polite" data-testid="merged-status">{status}</div>
      {m.sentAt && <p className="form__note" data-testid="merged-sent">Last sent {new Date(m.sentAt).toLocaleString()}.</p>}
      <p className="form__note">This sends only your answers about the merged direction. Your ratings of the four original concepts are not resent.</p>
    </div>
  );
}

function FeedbackForm() {
  const [state, setState] = useState<FeedbackState>(() => loadState());
  const [selected, setSelected] = useState<ConceptId>(() => parseConceptFromHash() ?? 'clean');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const firstTouch = useRef(true);
  const justSent = useRef(false);

  useEffect(() => {
    const onHash = () => { const id = parseConceptFromHash(); if (id) setSelected(id); };
    const onSelect = (e: Event) => setSelected((e as CustomEvent).detail);
    window.addEventListener('hashchange', onHash);
    window.addEventListener('fsm:select-concept', onSelect);
    return () => { window.removeEventListener('hashchange', onHash); window.removeEventListener('fsm:select-concept', onSelect); };
  }, []);

  // Autosave on every change (after initial load).
  useEffect(() => {
    if (firstTouch.current) { firstTouch.current = false; return; }
    const next = { ...state, updatedAt: new Date().toISOString() };
    const ok = saveState(next);
    if (justSent.current) { justSent.current = false; return; } // keep the "sent" message on screen
    setStatus(ok ? `Saved on this device at ${new Date(next.updatedAt).toLocaleTimeString()}.` : 'Could not save on this device (private mode?). Copy or download before leaving.');
  }, [state]);

  const c = concepts.find((x) => x.id === selected)!;
  const f = state.concepts[selected] ?? emptyConcept();
  const update = (patch: Partial<typeof f>) => setState((s) => ({ ...s, concepts: { ...s.concepts, [selected]: { ...f, ...patch } } }));
  const filled = useMemo(() => concepts.filter((x) => hasAnyInput(state.concepts[x.id] ?? emptyConcept())), [state]);

  const copyAll = async () => setStatus((await copyText(toMarkdown(state))) ? 'Feedback for all four concepts copied to the clipboard.' : 'Copy failed. Use Download instead.');
  const dlMd = () => { downloadFile('fsm-website-feedback.md', toMarkdown(state), 'text/markdown'); setStatus('Downloaded fsm-website-feedback.md.'); };
  const dlJson = () => { downloadFile('fsm-website-feedback.json', toJson(state), 'application/json'); setStatus('Downloaded fsm-website-feedback.json.'); };
  const submit = async () => {
    if (!siteConfig.feedbackEnabled) return;
    if (!state.reviewer.trim()) { setStatus('Add your name first, so we know whose feedback this is.'); document.getElementById('reviewer')?.focus(); return; }
    if (filled.length === 0) { setStatus('Rate or comment on at least one concept before sending.'); return; }
    setSubmitting(true);
    const submittedAt = new Date().toISOString();
    const ok = await sendFeedback(state, submittedAt);
    setSubmitting(false);
    if (ok) {
      justSent.current = true;
      setState((s) => ({ ...s, sentAt: submittedAt }));
      setStatus(`Feedback sent at ${new Date(submittedAt).toLocaleTimeString()}. You can keep editing and send again; each send is a new entry.`);
    } else {
      setStatus('Could not send (network). Copy or download instead and email it to the project owner.');
    }
  };

  return (
    <div className="form" id="feedback-form">
      <div className="form__row">
        <span className="form__legend" id="concept-picker-label">Concept</span>
        <div className="concept-tabs" role="group" aria-labelledby="concept-picker-label">
          {concepts.map((x) => (
            <button key={x.id} type="button" aria-pressed={x.id === selected} onClick={() => setSelected(x.id as ConceptId)} data-testid="feedback-concept" data-concept={x.id}>
              {x.number} {x.name}{hasAnyInput(state.concepts[x.id] ?? emptyConcept()) && <span className="dot" aria-label="has feedback" />}
            </button>
          ))}
        </div>
      </div>

      <div className="form__grid">
        {ratingFields.map((r) => (
          <Rating key={r.key} conceptId={c.id} field={r.key} label={r.label} value={f[r.key]} onChange={(v) => update({ [r.key]: v })} />
        ))}
      </div>

      <div className="form__grid">
        <div className="form__row">
          <label htmlFor={`fav-${c.id}`}>Favorite element</label>
          <textarea id={`fav-${c.id}`} value={f.favorite} onChange={(e) => update({ favorite: e.target.value })} data-testid="favorite" placeholder={`What works best in ${c.name}?`} />
        </div>
        <div className="form__row">
          <label htmlFor={`chg-${c.id}`}>Change request</label>
          <textarea id={`chg-${c.id}`} value={f.change} onChange={(e) => update({ change: e.target.value })} data-testid="change" placeholder="What should change?" />
        </div>
      </div>

      <fieldset className="rating">
        <legend className="form__legend">Decision</legend>
        <div className="decision">
          {([['prefer', 'Prefer'], ['combine', 'Combine with another'], ['reject', 'Reject'], ['undecided', 'Undecided']] as [Decision, string][]).map(([v, l]) => (
            <label key={v}><input type="radio" name={`${c.id}-decision`} value={v} checked={f.decision === v} onChange={() => update({ decision: v })} data-testid="decision" /><span>{l}</span></label>
          ))}
        </div>
      </fieldset>

      <div className="form__row">
        <label htmlFor="reviewer">Reviewer name</label>
        <input id="reviewer" type="text" required value={state.reviewer} onChange={(e) => setState((s) => ({ ...s, reviewer: e.target.value }))} data-testid="reviewer" autoComplete="name" placeholder="So we know whose feedback this is" />
      </div>

      <div className="form__actions">
        {siteConfig.feedbackEnabled && <button type="button" className="btn btn--primary" onClick={submit} disabled={submitting} data-testid="submit-feedback">{submitting ? 'Sending' : 'Send feedback'}</button>}
        <button type="button" className="btn btn--ghost" onClick={copyAll} data-testid="copy-feedback">Copy feedback</button>
        <button type="button" className="btn btn--ghost" onClick={dlMd} data-testid="download-md">Download .md</button>
        <button type="button" className="btn btn--ghost" onClick={dlJson} data-testid="download-json">Download .json</button>
        <button type="button" className="btn btn--ghost btn--small" onClick={() => { if (confirm('Clear all saved feedback on this device?')) { clearState(); setState(loadState()); setStatus('Cleared.'); } }}>Clear</button>
      </div>
      <div className="form__status" role="status" aria-live="polite" data-testid="feedback-status">{status}</div>

      {state.sentAt && <p className="form__note" data-testid="feedback-sent">Last sent {new Date(state.sentAt).toLocaleString()}.</p>}
      <p className="form__note">
        {siteConfig.feedbackEnabled
          ? 'Send delivers your answers for all four concepts to the project owner in one entry. Your answers also stay saved in this browser, so you can come back, revise and send again. Copy and Download are there as a backup.'
          : 'Sending is turned off in this build. Your answers are saved in this browser only. Use Copy feedback or Download and send the result to the project owner.'}
      </p>

      {filled.length > 0 && (
        <div>
          <span className="form__legend">Recorded so far</span>
          <div className="summary" style={{ marginTop: '.5rem' }}>
            {filled.map((x) => { const v = state.concepts[x.id]; return (
              <div key={x.id}><strong>{x.number} {x.name}</strong>
                {ratingFields.map((r) => `${r.label.split(' ')[0]} ${v[r.key] || '-'}`).join(' / ')}<br />Decision: {v.decision || 'not set'}</div>
            ); })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  useEffect(() => {
    if (window.location.hash.startsWith('#feedback')) document.getElementById('feedback')?.scrollIntoView();
    if (window.location.hash === '#merged') document.getElementById('merged')?.scrollIntoView();
    if (window.location.hash === '#current') document.getElementById('current')?.scrollIntoView();
  }, []);
  return (
    <div className="hub">
      <SkipLink />
      <header className="hub__top">
        <div className="hub__wrap">
          <a className="hub__logo" href={siteConfig.filmtwist.url} target="_blank" rel="noopener noreferrer" aria-label="Full School Marketing (FilmTwist site opens in a new tab)">
            <picture><source type="image/webp" srcSet={brand.logoHorizontal.webp} /><img src={brand.logoHorizontal.src} width={brand.logoHorizontal.width} height={brand.logoHorizontal.height} alt="Full School Marketing" /></picture>
          </a>
          <span className="hub__badge">Design concepts for review</span>
          <span style={{ fontSize: '.85rem', color: '#555', marginLeft: 'auto' }}>{REVIEW_DATE}</span>
        </div>
      </header>

      <main id="main">
        <section className="hub__wrap hub__title">
          <h1>Full School Marketing: <span>Website Direction Review</span></h1>
          <p>The current direction, built from your notes on the merged direction; the merged direction it replaces; and the four original concepts. Open the current direction on your phone and on a desktop, scroll the whole page, then record what you think below.</p>
          <p className="hub__notice"><span aria-hidden="true">!</span><span>These are design concepts, not a live business site. Copy, links and campaign images are drafts for review. Campaign creative shown is from FilmTwist's published case studies; client approval for reuse is pending.</span></p>
        </section>

        <section className="hub__wrap hub__section hub__merged" id="current" aria-labelledby="current-h">
          <h2 id="current-h">The current direction</h2>
          <p style={{ maxWidth: '62ch', color: '#444', lineHeight: 1.5 }}>
            Built from the October 28 review of the merged direction: Concept 02 as you rated it, in the brand's blue and green, with no opening story. What we do sits right under the hero as five tiles; the three campaigns follow as cards that open their own pages here; then the team, the four steps and a form. No figures until the case cards.
          </p>
          <div className="cards cards--one"><ConceptCard c={currentDirection} direction="current" /></div>
          <h3 className="hub__subhead">What {currentVersion.label} addresses <span className="hub__version">({currentVersion.date})</span></h3>
          <p className="hub__previous" data-testid="previous-versions">
            Earlier versions, frozen so you can compare:{' '}
            {previousVersions.map((v, i) => (
              <span key={v.path}>{i > 0 ? ' · ' : ''}<a href={url(v.path)}>{v.label}</a> <span className="hub__version">({v.detail})</span></span>
            ))}
          </p>
          <div className="checklist" data-testid="current-checklist">
            {currentChecklist.map((r) => (
              <section key={r.round} aria-label={r.round}>
                <h4>{r.round}</h4>
                <ul>
                  {r.items.map((it) => (
                    <li key={it.note} className={`checklist__item is-${it.state}`}>
                      <span className="checklist__mark">{it.state === 'done' ? 'Done' : it.state === 'partly' ? 'Partly' : 'Not yet'}</span>
                      <span><strong>{it.note}.</strong> {it.how}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <h3 className="hub__subhead">Does this resolve your notes?</h3>
          <CurrentFeedbackForm />
        </section>

        <section className="hub__wrap hub__section hub__merged hub__merged--superseded" id="merged" aria-labelledby="merged-h">
          <h2 id="merged-h">The merged direction <span className="hub__version">({mergedVersion.label}, superseded)</span></h2>
          <p style={{ maxWidth: '62ch', color: '#444', lineHeight: 1.5 }}>
            Superseded by the current direction on October 28 and kept for the record. Built from the October 27 feedback: Concept 03's opening story, shortened and skippable; Concept 01's structure and clarity below it; one motion rule instead of Concept 02's devices; no numbers up front. The team section uses your published wording and is yours to correct. Campaign photos still carry the reuse note until approval.
          </p>
          <div className="cards cards--one"><ConceptCard c={mergedDirection} direction="merged" /></div>
          <h3 className="hub__subhead">What {mergedVersion.label} addresses <span className="hub__version">({mergedVersion.date})</span></h3>
          <div className="checklist" data-testid="merged-checklist">
            {mergedChecklist.map((r) => (
              <section key={r.round} aria-label={r.round}>
                <h4>{r.round}</h4>
                <ul>
                  {r.items.map((it) => (
                    <li key={it.note} className={`checklist__item is-${it.state}`}>
                      <span className="checklist__mark">{it.state === 'done' ? 'Done' : it.state === 'partly' ? 'Partly' : 'Not yet'}</span>
                      <span><strong>{it.note}.</strong> {it.how}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <h3 className="hub__subhead">Does this resolve your notes?</h3>
          <MergedFeedbackForm />
        </section>

        <section className="hub__wrap hub__section" aria-labelledby="concepts-h">
          <h2 id="concepts-h">The four original concepts</h2>
          <div className="cards">{concepts.map((c) => <ConceptCard key={c.id} c={c} />)}</div>
        </section>

        <section className="hub__wrap hub__section" aria-labelledby="matrix-h">
          <h2 id="matrix-h">Side by side</h2>
          <div className="matrix-wrap">
            <table className="matrix">
              <thead><tr><th scope="col">Concept</th><th scope="col">Brand feel</th><th scope="col">Motion level</th><th scope="col">Primary strength</th><th scope="col">Potential tradeoff</th><th scope="col">Conference / mobile fit</th></tr></thead>
              <tbody>{concepts.map((c) => (
                <tr key={c.id}><th scope="row">{c.number} {c.name}</th><td>{c.matrix.brandFeel}</td><td>{c.matrix.motion}</td><td>{c.matrix.strength}</td><td>{c.matrix.tradeoff}</td><td>{c.matrix.conferenceFit}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section className="hub__wrap hub__section" aria-labelledby="questions-h">
          <h2 id="questions-h">Questions to answer while you look</h2>
          <ol className="questions">
            <li>Which concept best represents Full School Marketing?</li>
            <li>Which helps you understand the services most quickly?</li>
            <li>Which best displays the FilmTwist work?</li>
            <li>Which would persuade a school leader to reach out?</li>
            <li>What should change, in the direction you prefer?</li>
          </ol>
        </section>

        <section className="hub__wrap hub__section" id="feedback" aria-labelledby="feedback-h">
          <h2 id="feedback-h">Record your feedback</h2>
          <p style={{ maxWidth: '62ch', color: '#444', lineHeight: 1.5 }}>Rate each concept from 1 to 5, note your favorite element and what you would change, then choose a decision. Answers save on this device as you type.</p>
          <FeedbackForm />
        </section>

        <section className="hub__wrap hub__section" aria-labelledby="guide-h">
          <h2 id="guide-h">Decision guide</h2>
          <p style={{ maxWidth: '62ch', color: '#444', lineHeight: 1.5 }}>A neutral rubric. It does not steer toward any concept; it names what to weigh. Score each concept 1 to 5 per row if it helps.</p>
          <table className="rubric">
            <thead><tr><th scope="col">Criterion</th><th scope="col">Weight</th><th scope="col">What to evaluate</th></tr></thead>
            <tbody>
              <tr><th scope="row">Brand fit</th><td>25%</td><td>Feels like FSM and FilmTwist, not a random template.</td></tr>
              <tr><th scope="row">Service clarity</th><td>20%</td><td>A school leader immediately understands what is offered.</td></tr>
              <tr><th scope="row">Creative distinction</th><td>20%</td><td>Demonstrates standout work and a unique point of view.</td></tr>
              <tr><th scope="row">Credibility and proof</th><td>15%</td><td>Trustworthy, legible case studies with attributable outcomes.</td></tr>
              <tr><th scope="row">Conference and mobile impact</th><td>10%</td><td>Compelling for a QR-driven first visit on a phone.</td></tr>
              <tr><th scope="row">Feasibility and maintenance</th><td>10%</td><td>Performance, accessibility, realistic production cost.</td></tr>
            </tbody>
          </table>
        </section>
      </main>

      <footer className="hub__wrap hub__footer">
        <p>Prepared for Full School Marketing and <a href={siteConfig.filmtwist.url} target="_blank" rel="noopener noreferrer">FilmTwist Creative Agency</a>. Case-study figures are FilmTwist-reported for the named school and period; sources are linked on every concept. This review page is publicly reachable by anyone with the link; do not add confidential notes here.</p>
      </footer>
    </div>
  );
}
