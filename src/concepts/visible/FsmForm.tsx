import { useRef, useState, type FormEvent } from 'react';
import { siteConfig } from '../../content/config';

/**
 * The FSM-branded "Work with us" form. It posts to FilmTwist's LeadConnector forms service with the same multipart
 * payload their embedded widget sends (field values keyed by the form's field tags inside a `formData` JSON part,
 * plus `locationId` and `formId`), so the lead lands in FilmTwist's account exactly as a widget submission would.
 * Nothing is stored on this site. The field set, option lists, required flags and consent text are the form's own
 * (read from the widget configuration on October 28, 2026); only the presentation is FSM's.
 */
type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

export function FsmForm() {
  const lc = siteConfig.leadConnector;
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const fd = new FormData(form);
    const value = (k: string) => String(fd.get(k) ?? '').trim();
    const fields: Record<string, unknown> = {
      full_name: value('full_name'),
      email: value('email'),
      phone: value('phone'),
      [lc.fields.services]: value('services'),
      [lc.fields.leadSource]: value('lead_source'),
      [lc.fields.budget]: value('budget'),
      [lc.fields.needs]: value('needs'),
      terms_and_conditions: fd.get('terms_and_conditions') === 'on',
      formId: lc.formId,
      location_id: lc.locationId,
      eventData: {
        source: 'Full School Marketing website',
        url: window.location.href,
        page: { url: window.location.href, title: document.title },
        referrer: document.referrer,
        medium: 'form',
        mediumId: lc.formId,
        timestamp: Date.now(),
      },
      Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeSpent: (Date.now() - startedAt.current) / 1000,
      disqualified: false,
    };
    const body = new FormData();
    body.set('formData', JSON.stringify(fields));
    body.append('locationId', lc.locationId);
    body.append('formId', lc.formId);
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch(`${lc.submitUrl}?formId=${lc.formId}&locationId=${lc.locationId}`, { method: 'POST', body });
      if (!res.ok) throw new Error(`The form service answered ${res.status}.`);
      setStatus({ kind: 'sent' });
      form.reset();
    } catch (err) {
      setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'The form could not be sent.' });
    }
  }

  if (status.kind === 'sent') {
    return (
      <div className="fsm-form fsm-form--sent" role="status" aria-live="polite" data-testid="fsm-form-sent">
        <h3>Thank you.</h3>
        <p>{lc.thankYouText}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="fsm-form" onSubmit={submit} noValidate={false} data-testid="fsm-form" aria-label="Work with Full School Marketing">
      <div className="fsm-form__row fsm-form__row--2">
        <label className="fsm-form__field">
          <span>Full name <abbr title="required">*</abbr></span>
          <input name="full_name" type="text" autoComplete="name" required data-testid="fsm-name" />
        </label>
        <label className="fsm-form__field">
          <span>Email <abbr title="required">*</abbr></span>
          <input name="email" type="email" autoComplete="email" required data-testid="fsm-email" />
        </label>
      </div>
      <div className="fsm-form__row fsm-form__row--2">
        <label className="fsm-form__field">
          <span>Phone <abbr title="required">*</abbr></span>
          <input name="phone" type="tel" autoComplete="tel" required data-testid="fsm-phone" />
        </label>
        <label className="fsm-form__field">
          <span>What do you need help with? <abbr title="required">*</abbr></span>
          <select name="services" required defaultValue="" data-testid="fsm-services">
            <option value="" disabled>Select one</option>
            {lc.options.services.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
      </div>
      <div className="fsm-form__row fsm-form__row--2">
        <label className="fsm-form__field">
          <span>How did you hear about us? <abbr title="required">*</abbr></span>
          <select name="lead_source" required defaultValue="" data-testid="fsm-source">
            <option value="" disabled>Select one</option>
            {lc.options.leadSource.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
        <label className="fsm-form__field">
          <span>Budget <abbr title="required">*</abbr></span>
          <select name="budget" required defaultValue="" data-testid="fsm-budget">
            <option value="" disabled>Select one</option>
            {lc.options.budget.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
      </div>
      <label className="fsm-form__field">
        <span>Tell us about your school <abbr title="required">*</abbr></span>
        <textarea name="needs" rows={4} required placeholder="How many seats, which grades, and what you have tried." data-testid="fsm-needs" />
      </label>
      <label className="fsm-form__consent">
        <input name="terms_and_conditions" type="checkbox" required data-testid="fsm-terms" />
        <span>
          I agree to the <a href={lc.termsUrl} target="_blank" rel="noopener noreferrer">terms and conditions</a> provided by Filmtwist Creative Agency. By providing my phone
          number, I agree to receive text messages from the business. For more information please visit the <a href={lc.privacyUrl} target="_blank" rel="noopener noreferrer">privacy policy</a>.
        </span>
      </label>
      <div className="fsm-form__actions">
        <button type="submit" className="btn btn--primary btn--big" disabled={status.kind === 'sending'} data-testid="fsm-submit">
          {status.kind === 'sending' ? 'Sending' : siteConfig.primaryCta}
        </button>
        <p className="fsm-form__status" role="status" aria-live="polite" data-testid="fsm-status">
          {status.kind === 'error' ? `${status.message} Please try again, or write to the team through filmtwist.com/contact.` : ''}
        </p>
      </div>
    </form>
  );
}
