import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../../lib/motion';
import { sendEnquiry, type SendState } from '../../lib/contact';
import { contact, site } from '../../content/site';

/*
 * chalk-ghost measured 1.89:1 against the panel — below WCAG's 4.5:1 for body
 * text and barely legible in practice. Labels and the privacy note are real
 * content and move to chalk-muted (6.82:1). Placeholders go to chalk-faint
 * (3.54:1) rather than the same step, so an empty field still reads as empty
 * next to entered text set in full chalk.
 */
const field =
  'w-full border-b border-white/12 bg-transparent py-3 text-[0.92rem] text-chalk placeholder:text-chalk-faint transition-colors duration-400 focus:border-cobalt';

const label =
  'block font-display text-[0.55rem] font-600 uppercase tracking-wide2 text-chalk-muted';

/**
 * Contact.
 *
 * Closing statement rather than a form dropped at the bottom of a page. The
 * left column makes the offer and gives the direct lines; the form sits on a
 * raised panel so it reads as the one place to act.
 */
export default function Contact() {
  const ref = useReveal<HTMLElement>();
  const [state, setState] = useState<SendState>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    /*
     * The honeypot is deliberately NOT short-circuited here — bailing out in
     * the client leaves the button dead with no state change. The server
     * answers a tripped honeypot with {ok:true} and drops it, so let it decide
     * and always give the visitor feedback.
     */
    setState('sending');
    const result = await sendEnquiry(
      data,
      `New project enquiry — ${data.business || data.name}`
    );
    setState(result);
    if (result === 'sent') form.reset();
  };

  const buttonLabel =
    state === 'sending'
      ? 'Sending request…'
      : state === 'sent'
        ? 'Request sent'
        : state === 'fallback'
          ? 'Opening your email…'
          : contact.submitLabel;

  return (
    <section
      id="contact"
      ref={ref}
      data-inview="false"
      className="relative overflow-hidden py-20 md:py-32"
    >
      {/* One wash of cobalt at the base, closing the page. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-30%] h-[80%]"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 100%, rgba(47,94,240,0.16) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          {/* ------------------------------------------------- statement -- */}
          <div>
            <span className="reveal mb-6 block font-display text-[0.6rem] font-700 tracking-wide2 text-cobalt">
              {contact.index}
            </span>
            <h2 className="display-2 reveal reveal-1 ink-gradient">{contact.heading}</h2>
            <p className="lede reveal reveal-2 mt-6">{contact.sub}</p>

            {/* Phone and service area pair up on a phone — stacked, three
                full-width rows ran most of a screen for six words of content.
                The desktop column is narrow, so it goes back to a stack there. */}
            <dl className="reveal reveal-3 mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/[0.08] pt-7 md:mt-12 md:gap-y-7 md:pt-9 lg:grid-cols-1">
              <div className="col-span-2 lg:col-span-1">
                <dt className={label}>Email</dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${site.email}`}
                    className="font-display text-[0.95rem] font-700 tracking-tight text-chalk transition-colors duration-400 hover:text-cobalt-light md:text-base"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={label}>Phone</dt>
                <dd className="mt-1.5">
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="font-display text-[0.95rem] font-700 tracking-tight text-chalk transition-colors duration-400 hover:text-cobalt-light md:text-base"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={label}>Service area</dt>
                <dd className="mt-1.5 font-display text-[0.95rem] font-700 tracking-tight text-chalk md:text-base">
                  {site.serviceArea}
                </dd>
              </div>
            </dl>

            <div className="reveal reveal-4 mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.08] pt-6 md:mt-9 md:pt-7">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[0.6rem] font-600 uppercase tracking-wide2 text-chalk-faint transition-colors duration-400 hover:text-cobalt-light"
              >
                Instagram
              </a>
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[0.6rem] font-600 uppercase tracking-wide2 text-chalk-faint transition-colors duration-400 hover:text-cobalt-light"
              >
                TikTok
              </a>
              <Link
                to="/contact"
                className="font-display text-[0.6rem] font-600 uppercase tracking-wide2 text-chalk-faint transition-colors duration-400 hover:text-cobalt-light"
              >
                Full contact form ↗
              </Link>
            </div>
          </div>

          {/* ------------------------------------------------------ form -- */}
          <div className="panel reveal reveal-2 p-7 md:p-10">
            <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
              {/* Honeypot — `hidden`, not a zero-sized visible box, or Chrome
                  autofills it along with the real fields. See ContactPage. */}
              <input
                type="text"
                name="contact_ref"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div>
                <label className={label} htmlFor="name">Your name *</label>
                <input id="name" name="name" required className={field} placeholder="Jane Smith" />
              </div>
              <div>
                <label className={label} htmlFor="business">Business name *</label>
                <input id="business" name="business" required className={field} placeholder="Smith &amp; Co." />
              </div>
              <div>
                <label className={label} htmlFor="email">Email address *</label>
                <input id="email" name="email" type="email" required className={field} placeholder="jane@smithco.com" />
              </div>
              <div>
                <label className={label} htmlFor="phone">Phone number *</label>
                <input id="phone" name="phone" type="tel" required className={field} placeholder="(602) 555-0134" />
              </div>
              <div>
                <label className={label} htmlFor="type">Business type *</label>
                <select id="type" name="type" required className={field} defaultValue="">
                  <option value="" disabled>Select one</option>
                  {contact.businessTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label} htmlFor="budget">Estimated budget *</label>
                <select id="budget" name="budget" required className={field} defaultValue="">
                  <option value="" disabled>Select one</option>
                  {contact.budgets.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="website">Current website (optional)</label>
                <input id="website" name="website" className={field} placeholder="smithco.com" />
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="message">Tell us about your project *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  className={`${field} resize-none`}
                  placeholder="What are you trying to build, and what does success look like?"
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
                  {state === 'sent' ? 'Your enquiry has been sent.' : ''}
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

                <p className="mt-5 max-w-[48ch] text-[0.7rem] leading-relaxed text-chalk-muted">
                  {contact.privacy}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
