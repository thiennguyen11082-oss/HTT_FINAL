import { useState } from 'react';
import PageShell from '../components/PageShell';
import { seo } from '../lib/seo';
import { sendEnquiry, type SendState } from '../lib/contact';
import { contactPage as p } from '../content/pages';
import { contact, site } from '../content/site';

const field =
  'w-full border-b border-white/20 bg-transparent py-3 text-[0.95rem] text-chalk placeholder:text-chalk-ghost transition-colors duration-300 focus:border-cobalt';

const label = 'block font-display text-[0.6rem] font-600 uppercase tracking-wide2 text-chalk-faint';

export default function ContactPage() {
  const [purpose, setPurpose] = useState('consultation');
  const [state, setState] = useState<SendState>('idle');

  // Project-shaped enquiries ask about budget; complaints and support do not.
  const isProjectEnquiry = purpose === 'consultation' || purpose === 'interested';
  const isIssue = purpose === 'problem' || purpose === 'complaint' || purpose === 'support';

  /**
   * Posts to the mail endpoint, exactly as the home page form does.
   *
   * This previously built a mailto: and handed the enquiry to the visitor's own
   * mail client, so nothing reached the inbox unless they then pressed send in
   * whatever application opened — and on a phone with no mail account set up,
   * nothing happened at all. sendEnquiry still falls back to mailto: by itself
   * if the endpoint is missing or unconfigured.
   */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    /*
     * The honeypot is deliberately NOT short-circuited here. Bailing out in the
     * client leaves the button dead with no state change, so a real visitor
     * whose browser autofilled the trap gets a form that does nothing at all
     * and no way to tell why. The server already answers a tripped honeypot
     * with {ok:true} and drops it, so let it decide and always give feedback.
     */
    setState('sending');
    const result = await sendEnquiry(
      data,
      `${data.purpose} — ${data.business || data.name}`
    );
    setState(result);

    if (result === 'sent') {
      form.reset();
      // The purpose pills are controlled, so form.reset() cannot restore them.
      setPurpose('consultation');
    }
  };

  const buttonLabel =
    state === 'sending'
      ? 'Sending request…'
      : state === 'sent'
        ? 'Request sent'
        : state === 'fallback'
          ? 'Opening your email…'
          : 'Send message';

  return (
    <PageShell
      index={p.index}
      eyebrow={p.eyebrow}
      title={p.title}
      lede={p.lede}
      backTo={p.backTo}
      seo={seo.contact}
    >
      <div className="shell py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Direct lines first — plenty of people would rather not use a form. */}
          <aside>
            <dl className="space-y-8">
              <div>
                <dt className={label}>Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="font-display text-lg font-700 tracking-tight text-chalk underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={label}>Phone</dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="font-display text-lg font-700 tracking-tight text-chalk underline-offset-4 hover:underline"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={label}>Service area</dt>
                <dd className="mt-2 font-display text-lg font-700 tracking-tight text-chalk">
                  {site.serviceArea}
                </dd>
              </div>
            </dl>

            <div className="mt-12 space-y-6 border-t border-white/12 pt-8">
              {p.reassurance.map((r) => (
                <div key={r.title}>
                  <h3 className="font-display text-[0.68rem] font-700 uppercase tracking-wide2 text-chalk">
                    {r.title}
                  </h3>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-chalk-muted">{r.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex gap-4 border-t border-white/12 pt-8">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[0.65rem] font-600 uppercase tracking-wide2 text-chalk-faint transition-colors hover:text-chalk"
              >
                Instagram
              </a>
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[0.65rem] font-600 uppercase tracking-wide2 text-chalk-faint transition-colors hover:text-chalk"
              >
                TikTok
              </a>
            </div>
          </aside>

          <form onSubmit={onSubmit}>
            {/*
              * Honeypot. `hidden` rather than a zero-sized visible box: Chrome
              * skips fields it does not render, but happily autofills a 0x0
              * opacity-0 one — and the old name, company_fax, matched its
              * address-profile heuristic for a fax number, so autofilling a
              * real visitor's details tripped the trap and killed the form.
              * autocomplete="off" does not prevent this on its own.
              */}
            <input
              type="text"
              name="contact_ref"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            {/* Purpose drives which fields below are relevant. */}
            <fieldset className="mb-10">
              <legend className={`${label} mb-4`}>What is this about? *</legend>
              <div className="flex flex-wrap gap-2.5">
                {p.purposes.map((o) => (
                  <label key={o.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="purpose"
                      value={o.label}
                      checked={purpose === o.value}
                      onChange={() => setPurpose(o.value)}
                      className="peer sr-only"
                      required
                    />
                    <span className="block rounded-full border border-white/20 px-4 py-2 font-display text-[0.66rem] font-600 uppercase tracking-wide2 text-chalk-muted transition-colors duration-300 peer-checked:border-cobalt peer-checked:bg-cobalt peer-checked:text-white">
                      {o.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mb-10">
              <legend className={`${label} mb-4`}>Are you already a customer? *</legend>
              <div className="flex flex-wrap gap-2.5">
                {p.statuses.map((o) => (
                  <label key={o.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={o.label}
                      defaultChecked={o.value === 'interested'}
                      className="peer sr-only"
                      required
                    />
                    <span className="block rounded-full border border-white/20 px-4 py-2 font-display text-[0.66rem] font-600 uppercase tracking-wide2 text-chalk-muted transition-colors duration-300 peer-checked:border-cobalt peer-checked:bg-cobalt peer-checked:text-white">
                      {o.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-7 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="name">
                  Your name *
                </label>
                <input id="name" name="name" required className={field} placeholder="Jane Smith" />
              </div>

              <div>
                <label className={label} htmlFor="email">
                  Email address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={field}
                  placeholder="jane@smithco.com"
                />
              </div>

              <div>
                <label className={label} htmlFor="phone">
                  Phone number (optional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={field}
                  placeholder="(602) 555-0134"
                />
              </div>

              <div>
                <label className={label} htmlFor="business">
                  Business name (optional)
                </label>
                <input
                  id="business"
                  name="business"
                  className={field}
                  placeholder="Smith &amp; Co."
                />
              </div>

              <div>
                <label className={label} htmlFor="type">
                  Business type (optional)
                </label>
                <select id="type" name="type" className={field} defaultValue="">
                  <option value="">Select one</option>
                  {contact.businessTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={label} htmlFor="website">
                  Current website (optional)
                </label>
                <input id="website" name="website" className={field} placeholder="smithco.com" />
              </div>

              {isProjectEnquiry && (
                <div>
                  <label className={label} htmlFor="budget">
                    Estimated budget (optional)
                  </label>
                  <select id="budget" name="budget" className={field} defaultValue="">
                    <option value="">Select one</option>
                    {contact.budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {isIssue && (
                <div>
                  <label className={label} htmlFor="urgency">
                    How urgent is this? *
                  </label>
                  <select id="urgency" name="urgency" required className={field} defaultValue="">
                    <option value="" disabled>
                      Select one
                    </option>
                    {p.urgency.map((u) => (
                      <option key={u.value} value={u.label}>
                        {u.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="sm:col-span-2">
                <label className={label} htmlFor="message">
                  {isIssue ? 'Describe the problem *' : 'Tell us about your project *'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className={`${field} resize-none`}
                  placeholder={
                    isIssue
                      ? 'What is happening, when it started, and what you have already tried.'
                      : 'What are you trying to build, and what does success look like?'
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={state === 'sending' || state === 'sent'}
                  className={`btn w-full sm:w-auto sm:px-12 ${
                    state === 'sent' ? 'btn-sent' : 'btn-primary'
                  } disabled:cursor-not-allowed`}
                >
                  {buttonLabel}
                </button>

                <p aria-live="polite" className="sr-only">
                  {state === 'sent' ? 'Your request has been sent.' : ''}
                </p>

                {state === 'sent' && (
                  <p className="mt-4 text-[0.82rem] text-success-light">
                    Thanks — that landed in our inbox. We reply within one business day.
                  </p>
                )}
                {state === 'error' && (
                  <p className="mt-4 text-[0.82rem] text-chalk-soft">
                    That did not go through. Email us directly at{' '}
                    <a href={`mailto:${site.email}`} className="underline">
                      {site.email}
                    </a>
                    .
                  </p>
                )}

                <p className="mt-5 max-w-[46ch] text-[0.72rem] leading-relaxed text-chalk-faint">
                  {contact.privacy}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageShell>
  );
}

