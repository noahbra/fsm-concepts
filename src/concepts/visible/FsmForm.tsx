import { useRef, useState, type FormEvent } from 'react';
import { siteConfig } from '../../content/config';

/**
 * The site's own "Work with us" form. It posts one JSON document per submission to the Apps Script web app named in
 * siteConfig.inquiryForm (scripts/inquiry-form.gs), which appends a row to the "FSM Website Inquiries" Google Sheet and
 * emails the team. Nothing is stored on this site. The field set, option lists, required flags and consent text match
 * FilmTwist's RFI Contact Form (read from the widget configuration on October 28, 2026); only the presentation is FSM's.
 * A hidden honeypot field and the seconds-since-shown count let the script drop bot submissions without a captcha.
 */
type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

/** Where the consent line's two links go. Default: FilmTwist's own pages (the form's configured targets); Concept 06 passes its own terms and privacy pages. */
export type LegalLinks = { terms: string; privacy: string };

export function FsmForm({ legal }: { legal?: LegalLinks } = {}) {
  const lc = siteConfig.leadConnector;
  const f = siteConfig.inquiryForm;
  const links: LegalLinks = legal ?? { terms: lc.termsUrl, privacy: lc.privacyUrl };
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const fd = new FormData(form);
    const value = (k: string) => String(fd.get(k) ?? '').trim();
    const payload = {
      full_name: value('full_name'),
      email: value('email'),
      phone: value('phone'),
      services: value('services'),
      lead_source: value('lead_source'),
      budget: value('budget'),
      needs: value('needs'),
      consent: fd.get('terms_and_conditions') === 'on',
      /** the hidden honeypot field; people never fill it, so the script drops any submission that does */
      website: value('website'),
      seconds: Math.round((Date.now() - startedAt.current) / 1000),
      page: window.location.href,
      referrer: document.referrer,
    };
    setStatus({ kind: 'sending' });
    try {
      // text/plain keeps the request "simple" (no CORS preflight, which the script host does not answer); the web app
      // redirects once and answers JSON with an open CORS header, so the result is readable here.
      const res = await fetch(f.endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload), redirect: 'follow' });
      if (!res.ok) throw new Error(`The form service answered ${res.status}.`);
      const answer = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!answer?.ok) throw new Error(answer?.error || 'The form service did not confirm the message.');
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
        <p>{f.thankYouText}</p>
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
            {f.options.services.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
      </div>
      <div className="fsm-form__row fsm-form__row--2">
        <label className="fsm-form__field">
          <span>How did you hear about us? <abbr title="required">*</abbr></span>
          <select name="lead_source" required defaultValue="" data-testid="fsm-source">
            <option value="" disabled>Select one</option>
            {f.options.leadSource.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
        <label className="fsm-form__field">
          <span>Budget <abbr title="required">*</abbr></span>
          <select name="budget" required defaultValue="" data-testid="fsm-budget">
            <option value="" disabled>Select one</option>
            {f.options.budget.map((o) => <option key={o} value={o}>{o}</option>)}
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
          I agree to the <a href={links.terms} target="_blank" rel="noopener noreferrer" data-testid="fsm-terms-link">terms and conditions</a> provided by Filmtwist Creative Agency. By providing my phone
          number, I agree to receive text messages from the business. For more information please visit the <a href={links.privacy} target="_blank" rel="noopener noreferrer" data-testid="fsm-privacy-link">privacy policy</a>.
        </span>
      </label>
      <label className="fsm-form__hp" aria-hidden="true">
        Leave this field empty
        <input name="website" type="text" tabIndex={-1} autoComplete="off" data-testid="fsm-hp" />
      </label>
      <div className="fsm-form__actions">
        <button type="submit" className="btn btn--primary btn--big" disabled={status.kind === 'sending'} data-testid="fsm-submit">
          {status.kind === 'sending' ? 'Sending' : siteConfig.primaryCta}
        </button>
        <p className="fsm-form__status" role="status" aria-live="polite" data-testid="fsm-status">
          {status.kind === 'error' ? `${status.message} Please try again, or write to ${siteConfig.legal.email}.` : ''}
        </p>
      </div>
    </form>
  );
}
