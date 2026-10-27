import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../content/config';
import { concepts, hubPath } from '../content/concepts';
import { copyText, drawQr } from '../lib/share';

/**
 * Reviewer-only chrome: a top ribbon ("Design concept 02 of 4 · Compare all four") and a floating
 * review pill with Compare / Review / Copy link / QR. Hidden entirely when VITE_REVIEW_MODE=false.
 * Deliberately off-brand (purple) so the client reads it as scaffolding, not part of the design.
 */
export function ReviewRibbon({ conceptId }: { conceptId: 'clean' | 'creative' | 'story' | 'original' }) {
  if (!siteConfig.reviewMode) return null;
  const c = concepts.find((x) => x.id === conceptId)!;
  return (
    <div className="review-ribbon" role="region" aria-label="Review navigation">
      <div className="review-ribbon__inner">
        <span className="review-ribbon__tag">Concept {c.number} of 4</span>
        <span>{c.name}</span>
        <span className="review-ribbon__hide-sm">Design concept for review, not a live business site.</span>
        <span className="review-ribbon__spacer" />
        <a href={hubPath}>Compare all four</a>
        <a href={`${hubPath}#feedback?concept=${c.id}`}>Review this concept</a>
      </div>
    </div>
  );
}

export function ReviewPill({ conceptId }: { conceptId: 'clean' | 'creative' | 'story' | 'original' }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [qr, setQr] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const c = concepts.find((x) => x.id === conceptId)!;
  const shareUrl = typeof window !== 'undefined' ? window.location.origin + c.path : c.path;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (qr && canvas.current) drawQr(canvas.current, shareUrl).catch(() => setStatus('QR could not be generated.'));
  }, [qr, shareUrl]);

  if (!siteConfig.reviewMode) return null;

  return (
    <div className="review-pill">
      {open && (
        <div className="review-panel" role="dialog" aria-label={`Review ${c.name}`}>
          <h2>Concept {c.number}: {c.name}</h2>
          <p>Design concept for review. Not a live business site.</p>
          <a href={hubPath}>Compare all four concepts</a>
          <a href={`${hubPath}#feedback?concept=${c.id}`}>Rate and comment on this concept</a>
          <button type="button" onClick={async () => setStatus((await copyText(shareUrl)) ? 'Link copied.' : 'Copy failed. Select the address bar instead.')}>Copy shareable link</button>
          <button type="button" onClick={() => setQr((v) => !v)} aria-expanded={qr}>{qr ? 'Hide QR code' : 'Show QR code for phone testing'}</button>
          {qr && <canvas ref={canvas} width={180} height={180} aria-label={`QR code linking to ${shareUrl}`} role="img" />}
          <div className="review-panel__status" role="status" aria-live="polite">{status}</div>
        </div>
      )}
      <button ref={btn} type="button" className="review-pill__btn" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className="review-pill__dot" aria-hidden="true" /> Review
      </button>
    </div>
  );
}
