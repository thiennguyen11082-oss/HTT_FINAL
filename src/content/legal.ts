/**
 * Privacy Policy and Terms of Use.
 *
 * Kept apart from pages.ts because this is not marketing copy — it makes factual
 * claims about how the site behaves and what the business commits to, and it has
 * to stay true when either one changes.
 *
 * Every statement here was checked against the build on the date below:
 *   - the only third-party request the site makes is Google Fonts (index.html)
 *   - no analytics, no cookies, no localStorage/sessionStorage anywhere in src/
 *   - the contact form posts to api/contact.ts, which emails and stores nothing
 * If any of that changes, this file changes with it.
 */

import type { Detail } from './pages';

export type LegalDoc = {
  slug: string;
  index: string;
  eyebrow: string;
  title: string;
  lede: string;
  /** Human-readable effective date, shown at the top of the page. */
  updated: string;
  sections: Detail[];
};

const UPDATED = 'August 4, 2026';

/* --------------------------------------------------------------- privacy --- */

export const privacyPage: LegalDoc = {
  slug: 'privacy',
  index: '07',
  eyebrow: 'Privacy Policy',
  title: 'What we collect, and what we do not.',
  updated: UPDATED,
  lede:
    'This site has no analytics, no tracking pixels and no cookies. The only ' +
    'personal information we hold is what you type into the contact form and ' +
    'send us on purpose. This page explains exactly what happens to it.',
  sections: [
    {
      kicker: '01',
      title: 'Who this covers',
      body:
        'HTT Marketing Agency, a web design business operating from Phoenix, ' +
        'Arizona. In this policy "we" and "us" mean HTT Marketing Agency, and ' +
        '"you" means anyone visiting httmarketing.com or enquiring through it.',
      facets: [
        {
          label: 'Scope',
          text:
            'This policy covers httmarketing.com and the enquiries we receive ' +
            'through it. It does not cover websites we build for clients — those ' +
            'are operated by the client, under the client’s own policy.',
        },
        {
          label: 'Contact',
          text:
            'Questions about this policy, or any request about your data, go to ' +
            'contact@httmarketing.com.',
        },
      ],
    },
    {
      kicker: '02',
      title: 'What you give us',
      body:
        'The contact form is the only place this site asks for personal ' +
        'information. Nothing is collected before you choose to submit it.',
      facets: [
        {
          label: 'Fields we accept',
          text:
            'Your name, business name, email address, phone number, project ' +
            'type, budget range, existing website address, and your message. ' +
            'Depending on the form, also the purpose of your enquiry, the ' +
            'status of your current site, and how urgent it is. Everything ' +
            'except name, email and message is optional.',
        },
        {
          label: 'Where it goes',
          text:
            'Straight to our business inbox as an email. It is not written to a ' +
            'database, not added to a marketing list, and not passed to any ' +
            'advertising platform. If you reply to our reply, that thread lives ' +
            'in the same inbox.',
        },
        {
          label: 'A note on what you send',
          text:
            'Please do not send payment card details, passwords or account ' +
            'credentials through the contact form. It is ordinary email and is ' +
            'not the right channel for that. We will never ask you for them by ' +
            'email either.',
        },
      ],
    },
    {
      kicker: '03',
      title: 'What is collected automatically',
      body:
        'The site itself runs no tracking. Two things still happen at the ' +
        'infrastructure layer, and you should know about both.',
      facets: [
        {
          label: 'Server logs',
          text:
            'The site is hosted on Vercel, which keeps standard request logs — ' +
            'IP address, timestamp, requested page, browser user agent. This is ' +
            'ordinary web server operation, used for delivering the site, ' +
            'security and diagnosing faults. We do not use those logs to build ' +
            'any profile of you.',
        },
        {
          label: 'Google Fonts',
          text:
            'Typefaces are loaded from Google’s font service. That request ' +
            'necessarily tells Google your IP address and browser, because that ' +
            'is how any file is fetched from any server. Google’s handling ' +
            'of it is governed by Google’s own privacy policy, not ours.',
        },
        {
          label: 'No cookies',
          text:
            'This site sets no cookies and writes nothing to your browser’s ' +
            'local or session storage. There is no consent banner because there ' +
            'is nothing to consent to.',
        },
      ],
    },
    {
      kicker: '04',
      title: 'Why we hold it, and for how long',
      facets: [
        {
          label: 'Purpose',
          text:
            'To answer your enquiry, quote for work, and carry out a project if ' +
            'you hire us. That is the whole list. We do not sell personal ' +
            'information, we do not rent it, and we do not share it for anyone ' +
            'else’s advertising.',
        },
        {
          label: 'Retention',
          text:
            'Enquiries that do not become projects are kept while there is a ' +
            'live conversation and deleted on request. Records tied to paid work ' +
            '— quotes, invoices, project correspondence — are kept for as long as ' +
            'tax and accounting rules require.',
        },
        {
          label: 'Marketing',
          text:
            'Submitting the form does not subscribe you to anything. If we ever ' +
            'start a mailing list, joining it will be a separate, deliberate ' +
            'action on your part.',
        },
      ],
    },
    {
      kicker: '05',
      title: 'Who else can see it',
      body:
        'Only the providers that make email and hosting work. Each sees the ' +
        'minimum required to do its job.',
      facets: [
        {
          label: 'Service providers',
          text:
            'Vercel hosts the site and runs the form endpoint. Porkbun provides ' +
            'the mailbox that receives and stores enquiry emails. Google serves ' +
            'the fonts. None of them are given your information for their own ' +
            'marketing by us.',
        },
        {
          label: 'Legal disclosure',
          text:
            'We will disclose information if the law genuinely requires it — a ' +
            'valid legal request, or to establish or defend a legal claim. Not ' +
            'otherwise.',
        },
        {
          label: 'If the business changes hands',
          text:
            'If the business is ever sold or merged, client records may transfer ' +
            'to the new owner, who would be bound by this policy until they gave ' +
            'you notice of a different one.',
        },
      ],
    },
    {
      kicker: '06',
      title: 'Your rights',
      body:
        'You can ask us what we hold about you, ask us to correct it, or ask us ' +
        'to delete it. Email contact@httmarketing.com and we will action it ' +
        'within 30 days.',
      facets: [
        {
          label: 'Arizona and US visitors',
          text:
            'Arizona has no general consumer privacy statute at the time of ' +
            'writing. We extend access, correction and deletion to everyone who ' +
            'asks regardless of where they live, rather than only where a law ' +
            'compels it.',
        },
        {
          label: 'If you are in the EU, UK or California',
          text:
            'Those regimes give you rights of access, rectification, erasure, ' +
            'portability and objection, and the right to complain to your ' +
            'supervisory authority. We honour those requests on the same terms. ' +
            'We do not sell or share personal information as those laws define ' +
            'the phrase.',
        },
        {
          label: 'Limits',
          text:
            'We may keep what we are legally required to keep — invoices and tax ' +
            'records, principally — and will tell you if that applies to your ' +
            'request.',
        },
      ],
    },
    {
      kicker: '07',
      title: 'Security, children, and changes',
      facets: [
        {
          label: 'Security',
          text:
            'The site is served over HTTPS and form submissions are sent to the ' +
            'mail server over an encrypted connection. Mailbox credentials are ' +
            'held as environment variables and are not in the site’s source ' +
            'code. No system is perfectly secure and we will not pretend ' +
            'otherwise, but enquiries are held no longer than needed.',
        },
        {
          label: 'Children',
          text:
            'This is a service for businesses and is not directed at children ' +
            'under 13. We do not knowingly collect their information. If you ' +
            'believe a child has sent us something, tell us and we will delete it.',
        },
        {
          label: 'Changes',
          text:
            'If this policy changes, the date at the top of the page changes with ' +
            'it. Material changes affecting existing clients will be sent by ' +
            'email rather than only posted here.',
        },
      ],
    },
  ],
};

/* ----------------------------------------------------------------- terms --- */

export const termsPage: LegalDoc = {
  slug: 'terms',
  index: '08',
  eyebrow: 'Terms of Use',
  title: 'The terms we work under.',
  updated: UPDATED,
  lede:
    'Two things live here: the rules for using this website, and the terms that ' +
    'apply when you hire us to build something. Your signed quote always wins ' +
    'over this page if the two ever disagree.',
  sections: [
    {
      kicker: '01',
      title: 'Using this website',
      facets: [
        {
          label: 'What you agree to',
          text:
            'By using httmarketing.com you accept these terms. If you do not ' +
            'accept them, please do not use the site.',
        },
        {
          label: 'Our content',
          text:
            'The design, text, code and images on this site belong to HTT ' +
            'Marketing Agency or to the clients whose work is shown. You may ' +
            'read, share and link to it. You may not copy it wholesale to build ' +
            'a competing site, or present it as your own work.',
        },
        {
          label: 'Fair use',
          text:
            'Do not attempt to break, overload or gain unauthorised access to ' +
            'the site, and do not use the contact form to send bulk, automated ' +
            'or unsolicited commercial messages.',
        },
        {
          label: 'Availability',
          text:
            'We aim to keep the site up but do not guarantee uninterrupted ' +
            'access. It may be unavailable during maintenance or for reasons ' +
            'outside our control.',
        },
      ],
    },
    {
      kicker: '02',
      title: 'Quotes and pricing',
      body:
        'Prices shown on this site are starting prices, and this is stated ' +
        'wherever they appear. The figure that binds either of us is the one on ' +
        'your written quote.',
      facets: [
        {
          label: 'Fixed quote before work starts',
          text:
            'You receive a written quote before any work begins. Once you accept ' +
            'it, that is the price for the scope described — the number you agree ' +
            'is the number you pay.',
        },
        {
          label: 'What moves the price',
          text:
            'Additional pages, premium software, special integrations, advanced ' +
            'booking systems, custom features and rush delivery. These are ' +
            'raised during discovery, not at invoice.',
        },
        {
          label: 'Changing scope mid-project',
          text:
            'Work outside the agreed scope is quoted separately and starts only ' +
            'once you approve it in writing. We will not add charges to an ' +
            'invoice you have not seen coming.',
        },
        {
          label: 'Not included',
          text:
            'Domain registration and renewal, premium software licences and ' +
            'subscriptions, advertising spend, pages beyond your tier limit, and ' +
            'custom features outside the agreed scope.',
        },
      ],
    },
    {
      kicker: '03',
      title: 'Payment',
      facets: [
        {
          label: 'Deposit and balance',
          text:
            'Projects are split across a deposit and a balance due on ' +
            'completion. The exact split is confirmed in writing with your quote ' +
            'before anything begins.',
        },
        {
          label: 'The deposit',
          text:
            'The deposit reserves your place in the schedule and covers work ' +
            'already carried out. It is non-refundable once discovery and design ' +
            'work has started, because that time cannot be recovered.',
        },
        {
          label: 'Late payment',
          text:
            'If a balance goes unpaid we may pause work and withhold launch or ' +
            'handover until it is settled. We will always tell you before we do ' +
            'that, not after.',
        },
        {
          label: 'Monthly plans',
          text:
            'Every project runs on one of the monthly care plans, and the tier ' +
            'is agreed in writing with your quote. Plans bill monthly from ' +
            'launch. Cancelling stops future billing rather than refunding the ' +
            'month in progress, and ends the hosting, monitoring and support ' +
            'that plan provides.',
        },
      ],
    },
    {
      kicker: '04',
      title: 'What each side does',
      body:
        'Most projects that run late run late for one reason: waiting on ' +
        'material. Setting the expectation plainly is fairer than discovering it ' +
        'halfway through.',
      facets: [
        {
          label: 'What we do',
          text:
            'Design and build the site described in your quote, keep you ' +
            'informed at each stage, test it across phones, tablets, laptops and ' +
            'desktops before launch, and hand over what you need to run it.',
        },
        {
          label: 'What you do',
          text:
            'Provide your content — text, images, logos, service details — and ' +
            'be reachable for feedback. You do not need finished copy; we help ' +
            'organise and sharpen what you give us. Timelines assume you are ' +
            'responsive, and pause when we are waiting on you.',
        },
        {
          label: 'Content you supply',
          text:
            'You confirm you have the right to use the text, images and logos ' +
            'you send us. We cannot verify licensing on material we did not ' +
            'source, so anything you provide is supplied on that basis.',
        },
        {
          label: 'Revisions',
          text:
            'One round on Starter, two on Growth, three on Lead Engine. A round ' +
            'is one consolidated set of changes, so it is worth collecting all ' +
            'your notes before sending. Further rounds are available and quoted ' +
            'separately.',
        },
      ],
    },
    {
      kicker: '05',
      title: 'Timing',
      facets: [
        {
          label: 'Typical durations',
          text:
            'Starter sites typically take 7–10 business days. Multi-page and ' +
            'custom projects run to roughly 14 business days or longer depending ' +
            'on features, revisions and how quickly content arrives. These are ' +
            'estimates, not guarantees.',
        },
        {
          label: 'Rush work',
          text:
            'Rush delivery is charged separately because it means displacing ' +
            'other work. Tell us the deadline early and we will say honestly ' +
            'whether it is achievable rather than agreeing and then missing it.',
        },
        {
          label: 'Delays outside our control',
          text:
            'Neither side is liable for delay caused by events beyond reasonable ' +
            'control — provider outages, illness, or third-party services failing.',
        },
      ],
    },
    {
      kicker: '06',
      title: 'Ownership',
      body:
        'You own what you paid for. That is the plain version, and the detail ' +
        'below does not walk it back.',
      facets: [
        {
          label: 'The finished site',
          text:
            'Once the project is paid in full, the site and its content are ' +
            'yours. You are not renting it from us and you are not locked in. ' +
            'Until final payment, ownership stays with us.',
        },
        {
          label: 'Hosting and domains',
          text:
            'Hosting has to live somewhere, and you are welcome to host ' +
            'elsewhere — we will hand over what you need. Where a domain is ' +
            'registered in your name, it stays yours throughout.',
        },
        {
          label: 'Third-party components',
          text:
            'Some builds include third-party software, fonts or plugins licensed ' +
            'rather than owned. Those stay under their own licence terms, which ' +
            'we identify at handover.',
        },
        {
          label: 'Showing the work',
          text:
            'We may display completed projects in our portfolio and on social ' +
            'media, including screenshots and a link. If you would rather we did ' +
            'not, tell us and we will leave your project out — no argument, and ' +
            'no effect on your price.',
        },
      ],
    },
    {
      kicker: '07',
      title: 'What we can and cannot promise',
      body:
        'The honest boundaries. Anyone guaranteeing the things in the second ' +
        'row is guessing.',
      facets: [
        {
          label: 'What we stand behind',
          text:
            'That the site matches the agreed scope, works on current major ' +
            'browsers and on mobile, and that faults in our own build reported ' +
            'within your support window are fixed at no charge.',
        },
        {
          label: 'What nobody can guarantee',
          text:
            'Search rankings, traffic volumes, lead counts or revenue. Local SEO ' +
            'and Google Business Profile work improves your chances; it does not ' +
            'buy a position. Google controls its results and changes them without ' +
            'notice.',
        },
        {
          label: 'Third-party services',
          text:
            'Where a build depends on an external service — booking, payments, ' +
            'maps, hosting — that service’s own uptime and terms apply. We ' +
            'integrate them carefully but do not control them.',
        },
        {
          label: 'Limitation of liability',
          text:
            'To the extent the law allows, our total liability for any claim ' +
            'connected to a project is limited to the amount you paid us for it. ' +
            'We are not liable for indirect or consequential loss, including lost ' +
            'profits or lost data. Nothing here excludes liability that cannot ' +
            'lawfully be excluded.',
        },
      ],
    },
    {
      kicker: '08',
      title: 'Ending a project',
      facets: [
        {
          label: 'If you cancel',
          text:
            'You can stop a project at any time. You are charged for work ' +
            'completed to that point, the deposit is not refunded once work has ' +
            'started, and anything already paid beyond that is returned.',
        },
        {
          label: 'If we cancel',
          text:
            'We may end a project if the scope becomes something we cannot ' +
            'deliver well, or if the working relationship stops being workable. ' +
            'You receive the work completed and a refund of anything paid for ' +
            'work not done.',
        },
        {
          label: 'Care plans',
          text:
            'A care plan runs for as long as we host and maintain the site. You ' +
            'may cancel, effective at the end of the current billing month; that ' +
            'ends our hosting and support, and we will hand over what you need to ' +
            'move elsewhere. Ownership of the site itself is unaffected — once it ' +
            'is paid for it stays yours.',
        },
      ],
    },
    {
      kicker: '09',
      title: 'Legal',
      facets: [
        {
          label: 'Governing law',
          text:
            'These terms are governed by the laws of the State of Arizona, and ' +
            'disputes fall to the state and federal courts of Maricopa County, ' +
            'Arizona.',
        },
        {
          label: 'Talk first',
          text:
            'Before anything formal, email us. Nearly everything is a ' +
            'misunderstanding that a conversation resolves faster and cheaper ' +
            'than a filing.',
        },
        {
          label: 'If part of this is unenforceable',
          text:
            'The rest still stands. An unenforceable clause is treated as ' +
            'removed rather than invalidating the whole agreement.',
        },
        {
          label: 'Changes',
          text:
            'We may update these terms; the date at the top changes when we do. ' +
            'Changes are not retroactive — the terms in force when you accepted ' +
            'your quote are the ones that govern that project.',
        },
        {
          label: 'Contact',
          text:
            'HTT Marketing Agency, Phoenix, Arizona. contact@httmarketing.com, ' +
            '(623) 999-6330.',
        },
      ],
    },
  ],
};
