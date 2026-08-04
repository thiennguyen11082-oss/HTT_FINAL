import { useState } from 'react';
import PageShell from '../components/PageShell';
import { seo } from '../lib/seo';
import { contactPage as p } from '../content/pages';
import { contact, site } from '../content/site';

const field =
  'w-full border-b border-ink/20 bg-transparent py-3 text-[0.95rem] text-ink placeholder:text-ink-hair transition-colors duration-300 focus:border-ink';

const label = 'block font-display text-[0.6rem] font-600 uppercase tracking-wide2 text-ink-faint';

export default function ContactPage() {
  const [purpose, setPurpose] = useState('consultation');
  const [sent, setSent] = useState(false);

  // Project-shaped enquiries ask about budget; complaints and support do not.
  const isProjectEnquiry = purpose === 'consultation' || purpose === 'interested';
  const isIssue = purpose === 'problem' || purpose === 'complaint' || purpose === 'support';

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get('company_fax')) return; // honeypot

    const lines = [
      `Purpose: ${data.get('purpose')}`,
      `Customer status: ${data.get('status')}`,
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || '�'}`,
      `Business name: ${data.get('business') || '�'}`,
      `Business type: ${data.get('type') || '�'}`,
      `Current website: ${data.get('website') || '�'}`,
    ];
    if (isProjectEnquiry) lines.push(`Budget: ${data.get('budget') || '�'}`);
    if (isIssue) lines.push(`Urgency: ${data.get('urgency') || '�'}`);
    lines.push('', String(data.get('message')));

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `${data.get('purpose')} � ${data.get('business') || data.get('name')}`
    )}&body=${encodeURIComponent(lines.join('\n'))}`;
    setSent(true);
  };

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
          {/* Direct lines first � plenty of people would rather not use a form. */}
          <aside>
            <dl className="space-y-8">
              <div>
                <dt className={label}>Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="font-display text-lg font-700 tracking-tight text-ink underline-offset-4 hover:underline"
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
                    className="font-display text-lg font-700 tracking-tight text-ink underline-offset-4 hover:underline"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={label}>Service area</dt>
                <dd className="mt-2 font-display text-lg font-700 tracking-tight text-ink">
                  {site.serviceArea}
                </dd>
              </div>
            </dl>

            <div className="mt-12 space-y-6 border-t border-ink/12 pt-8">
              {p.reassurance.map((r) => (
                <div key={r.title}>
                  <h3 className="font-display text-[0.68rem] font-700 uppercase tracking-wide2 text-ink">
                    {r.title}
                  </h3>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-muted">{r.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex gap-4 border-t border-ink/12 pt-8">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[0.65rem] font-600 uppercase tracking-wide2 text-ink-faint transition-colors hover:text-ink"
              >
                Instagram
              </a>
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[0.65rem] font-600 uppercase tracking-wide2 text-ink-faint transition-colors hover:text-ink"
              >
                TikTok
              </a>
            </div>
          </aside>

          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="company_fax"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute h-0 w-0 opacity-0"
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
                    <span className="block rounded-full border border-ink/20 px-4 py-2 font-display text-[0.66rem] font-600 uppercase tracking-wide2 text-ink-muted transition-colors duration-300 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-ambient">
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
                    <span className="block rounded-full border border-ink/20 px-4 py-2 font-display text-[0.66rem] font-600 uppercase tracking-wide2 text-ink-muted transition-colors duration-300 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-ambient">
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
                  className="w-full rounded-full bg-ink py-4 font-display text-[0.72rem] font-700 uppercase tracking-wide2 text-ambient transition-transform duration-300 ease-elite hover:scale-[1.01] sm:w-auto sm:px-10"
                >
                  {sent ? 'Opening your email⬦' : 'Send message'}
                </button>
                <p className="mt-5 max-w-[46ch] text-[0.72rem] leading-relaxed text-ink-faint">
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

