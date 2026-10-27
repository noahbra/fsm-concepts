import { useEffect, useId, useRef, useState } from 'react';
import { caseStudies, galleryItems, headlineMetric } from '../../content/caseStudies';
import { galleryCategories, type GalleryCategory } from '../../content/media';
import { ResponsiveMedia } from '../../components/ResponsiveMedia';
import { SourceLink } from '../../components/CaseStudyProof';

type Filter = 'all' | GalleryCategory;
type Item = (typeof galleryItems)[number];

const isWide = (i: Item) => i.width / i.height > 1.6;

export function Gallery() {
  const [filter, setFilter] = useState<Filter>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const groupId = useId();

  const visible = galleryItems.filter((i) => filter === 'all' || i.category === filter);

  const open = (idx: number, el: HTMLElement) => {
    triggerRef.current = el;
    setOpenIndex(idx);
  };
  const close = () => {
    setOpenIndex(null);
    const t = triggerRef.current;
    // Restore focus to the trigger on the next frame (after the dialog unmounts).
    requestAnimationFrame(() => t?.focus());
  };

  return (
    <section id="work" className="cr-work" aria-labelledby="work-title">
      <div className="cr-wrap">
        <div className="cr-section-head">
          <span className="cr-eyebrow">Featured work</span>
          <h2 id="work-title" className="cr-h2">
            Real campaigns. <span className="cr-accent">Real schools.</span>
          </h2>
          <p className="cr-lede">
            School enrollment campaigns by the team behind Full School Marketing. Every piece below ran for a public
            charter school. Tap any tile to see the campaign and its reported results.
          </p>
        </div>

        <div className="cr-filters" role="group" aria-label="Filter featured work by type" id={groupId}>
          {galleryCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              className="cr-filter"
              data-testid="gallery-filter"
              data-filter={c.id}
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id)}
            >
              {c.label}
            </button>
          ))}
          <span className="cr-filter-count" role="status" aria-live="polite">
            {visible.length} of {galleryItems.length}
          </span>
        </div>

        <ul className="cr-grid" aria-label="Campaign creative">
          {visible.map((item) => {
            const globalIndex = galleryItems.indexOf(item);
            return (
              <li
                key={`${item.caseId}-${item.src}`}
                className={`cr-tile${isWide(item) ? ' cr-tile--wide' : ''}`}
                data-testid="gallery-item"
                data-category={item.category}
              >
                <button
                  type="button"
                  className="cr-tile-btn"
                  onClick={(e) => open(globalIndex, e.currentTarget)}
                  aria-label={`${item.caption ?? 'Campaign creative'}, ${item.school}. Open details.`}
                >
                  <ResponsiveMedia asset={item} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" className="cr-tile-media" />
                  <span className="cr-tile-meta">
                    <span className="cr-tile-school">{item.school}</span>
                    <span className="cr-tile-caption">{item.caption ?? 'School photography'}</span>
                    <span className="cr-tile-tag">FilmTwist campaign creative</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {openIndex !== null && <ItemDialog item={galleryItems[openIndex]} onClose={close} />}
    </section>
  );
}

function ItemDialog({ item, onClose }: { item: Item; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const cs = caseStudies.find((c) => c.id === item.caseId)!;
  const hm = headlineMetric(cs);

  useEffect(() => {
    closeBtn.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && ref.current) {
        const focusables = ref.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div className="cr-dialog-backdrop" onClick={onClose}>
      <div
        ref={ref}
        className="cr-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-testid="gallery-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeBtn} type="button" className="cr-dialog-close" onClick={onClose} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="cr-dialog-media">
          <ResponsiveMedia asset={item} sizes="(max-width: 900px) 100vw, 60vw" priority />
        </div>
        <div className="cr-dialog-body">
          <span className="cr-eyebrow">{item.caption ?? 'School photography'}</span>
          <h3 id={titleId} className="cr-dialog-title">
            {cs.school}
          </h3>
          <p className="cr-dialog-desc">{cs.descriptor}</p>
          <p className="cr-dialog-period">
            <strong>{cs.period.label}</strong>
          </p>
          <div className="cr-dialog-metric">
            <span className="cr-dialog-num">{hm.display}</span>
            <span className="cr-dialog-label">
              {hm.label}
              <br />
              <small>FilmTwist-reported, {cs.period.label}</small>
            </span>
          </div>
          <ul className="cr-dialog-story">
            {cs.story.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="cr-dialog-rights">Campaign creative from FilmTwist's published case study. Reuse approval pending.</p>
          <SourceLink c={cs} className="cr-btn cr-btn--ghost-dark">
            Explore the full case study
          </SourceLink>
        </div>
      </div>
    </div>
  );
}
