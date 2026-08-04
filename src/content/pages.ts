/**
 * Long-form content for the six detail pages.
 *
 * The home page sections are the summary; these are the full explanations that
 * the "Explore details" buttons lead to. Kept separate from site.ts so the
 * home page's bundle isn't carrying all of this copy.
 */

export type Detail = {
  kicker?: string;
  title: string;
  body?: string;
  /** Labelled sub-points — the "why / how / what you get" pattern. */
  facets?: { label: string; text: string }[];
  points?: string[];
};

export type DetailPage = {
  slug: string;
  index: string;
  eyebrow: string;
  title: string;
  lede: string;
  /** Anchor back to the matching section on the home page. */
  backTo: string;
  sections: Detail[];
  closing?: { title: string; body: string; cta: string };
};

/* ------------------------------------------------------------- services --- */

export const servicesPage: DetailPage = {
  slug: 'services',
  index: '01',
  eyebrow: 'Services in full',
  title: 'What we actually do, and why each part earns its place.',
  lede:
    'Four services, and none of them exist for their own sake. A website that ' +
    'looks good but never gets found is decoration. Traffic that lands on a page ' +
    'with nothing to do is wasted. Here is how each piece works and what it is for.',
  backTo: 'services',
  sections: [
    {
      kicker: '01',
      title: 'Website Design',
      body:
        'A custom-designed site built around your business — not a template with ' +
        'your logo dropped in the corner.',
      facets: [
        {
          label: 'Why it matters',
          text:
            'People decide whether to trust a business in a few seconds, and for most ' +
            'of them the website is the first thing they ever see. A dated or awkward ' +
            'site quietly tells them you are smaller, newer, or less careful than the ' +
            'competitor whose site felt effortless. That judgement happens before they ' +
            'have read a single word about what you do.',
        },
        {
          label: 'How we handle it',
          text:
            'We start with your customers, not your homepage. What they are worried ' +
            'about, what they need to know before they call, what makes them choose ' +
            'one business over another. That shapes the structure, the order of the ' +
            'page, and the visual direction. Then we design it mobile-first, because ' +
            'that is where most of your traffic actually is.',
        },
        {
          label: 'What you get',
          text:
            'A custom visual direction, a layout that works on every screen, real ' +
            'contact and quote forms wired to your inbox, and a site you are not ' +
            'embarrassed to put on a business card.',
        },
      ],
      points: [
        'Custom visual direction, not a theme',
        'Mobile-first design',
        'Contact and quote forms',
        'Copy organised around what customers ask',
      ],
    },
    {
      kicker: '02',
      title: 'Lead Generation',
      body:
        'The tools that turn a visitor into someone you can actually follow up with.',
      facets: [
        {
          label: 'Why it matters',
          text:
            'Most small-business sites leak. Someone arrives ready to book, cannot ' +
            'immediately see how, and leaves. Or they send an enquiry that sits ' +
            'unanswered for six hours while they call the next business on the list. ' +
            'The gap between interest and contact is where most jobs are lost, and it ' +
            'is almost always fixable.',
        },
        {
          label: 'How we handle it',
          text:
            'We make the next step obvious on every screen — tap to call, request a ' +
            'quote, book a slot. Enquiries trigger an automatic reply immediately, so ' +
            'nobody is left wondering whether it went through. And we track which ' +
            'pages and sources actually produce enquiries, so you stop guessing.',
        },
        {
          label: 'What you get',
          text:
            'Booking or quote systems that fit how you actually work, automated ' +
            'first responses, and conversion tracking that tells you what is working ' +
            'instead of leaving you to assume.',
        },
      ],
      points: [
        'Booking and quote systems',
        'Automated first response',
        'Conversion tracking',
        'Clear next step on every screen',
      ],
    },
    {
      kicker: '03',
      title: 'Local Visibility',
      body: 'Being findable by the people who are already looking for you nearby.',
      facets: [
        {
          label: 'Why it matters',
          text:
            'For a local service business, most demand starts with someone searching ' +
            'for what you do plus where they are. If you are not in those results — or ' +
            'your listing has the wrong hours, no photos and three reviews — that ' +
            'demand goes to whoever is. This is not abstract long-term marketing; it ' +
            'is the difference between the phone ringing this week and not.',
        },
        {
          label: 'How we handle it',
          text:
            'We set up and clean your Google Business Profile properly: correct ' +
            'categories, service areas, hours, photos, and a description that reads ' +
            'like a business rather than a keyword list. On the site we handle the ' +
            'basics search engines look for — page titles, structure, location ' +
            'signals, and a Maps embed so people can see you are actually nearby.',
        },
        {
          label: 'What you get',
          text:
            'A Google Business Profile that works, local SEO foundations on the site, ' +
            'and Maps integration. On the higher plans, ongoing profile management and ' +
            'a review-request system that keeps new reviews coming in.',
        },
      ],
      points: [
        'Google Business Profile setup and optimization',
        'Google Maps integration',
        'Local SEO foundations',
        'Review-request system (on higher plans)',
      ],
    },
    {
      kicker: '04',
      title: 'Website Care',
      body: 'Keeping the thing running after launch, so it stays an asset.',
      facets: [
        {
          label: 'Why it matters',
          text:
            'Websites decay. Certificates expire, plugins break, forms silently stop ' +
            'delivering, hosting goes down on a Saturday. The worst version of this is ' +
            'the one nobody notices — a contact form that has been swallowing enquiries ' +
            'for a month. A site you cannot rely on is worse than no site, because you ' +
            'think you are covered.',
        },
        {
          label: 'How we handle it',
          text:
            'Managed hosting with uptime monitoring and automated backups, so problems ' +
            'get caught rather than reported by a customer. Regular security checks. ' +
            'Form testing, so we know enquiries are still landing. And a set amount of ' +
            'edit time each month so small changes actually get made instead of sitting ' +
            'on a list.',
        },
        {
          label: 'What you get',
          text:
            'Hosting, SSL, monitoring and backups as standard. On higher plans, edit ' +
            'time, performance checks, analytics summaries, and someone who answers ' +
            'when you need something changed.',
        },
      ],
      points: [
        'Managed hosting, SSL, uptime monitoring',
        'Automated backups and security checks',
        'Monthly edit time',
        'Form testing and performance checks',
      ],
    },
  ],
  closing: {
    title: 'Not sure which parts you need?',
    body:
      'Most businesses do not need all four on day one. Tell us where you are and ' +
      'we will tell you honestly what would move the needle first — even if that ' +
      'is a smaller project than you expected.',
    cta: 'Get a free consultation',
  },
};

/* -------------------------------------------------------------- pricing --- */

export const pricingPage: DetailPage = {
  slug: 'pricing',
  index: '02',
  eyebrow: 'Pricing explained',
  title: 'What separates a $499 site from a $1,799 one.',
  lede:
    'The honest answer is scope and how hard the site is expected to work. A ' +
    'Starter site exists to make you look real and let people reach you. A Lead ' +
    'Engine exists to capture, respond to and track enquiries without you touching ' +
    'it. Here is exactly where the line falls.',
  backTo: 'pricing',
  sections: [
    {
      kicker: '$499',
      title: 'Starter — look established, fast',
      body:
        'One page, up to six sections, live in about a week. This is the right ' +
        'choice when the problem is simply that you do not have a credible web ' +
        'presence yet.',
      facets: [
        {
          label: 'Who it suits',
          text:
            'New businesses, sole traders, and anyone currently sending customers to ' +
            'a Facebook page. If your work comes from referrals and you just need ' +
            'somewhere legitimate for people to land, this does the job.',
        },
        {
          label: 'What it will not do',
          text:
            'It will not rank for competitive local searches, and it has no booking ' +
            'system, automation or tracking. It is a strong front door, not a ' +
            'lead-generation machine. One revision round is included, so it works best ' +
            'when you know roughly what you want.',
        },
      ],
      points: [
        'One page, up to six sections',
        'Mobile-first design',
        'Tap-to-call and contact form',
        'Google Maps + social links',
        'Basic SEO setup, domain connected',
        'One revision round',
      ],
    },
    {
      kicker: '$999',
      title: 'Growth — get found, get calls',
      body:
        'Up to five pages, around two weeks, plus the local search work that makes ' +
        'you findable. This is the tier most businesses should be on.',
      facets: [
        {
          label: 'What the extra $500 buys',
          text:
            'Four more pages of room, so services get their own explanations instead ' +
            'of one crowded paragraph. A gallery or testimonials section, which is ' +
            'usually the single most persuasive thing on a service site. Google ' +
            'Business Profile optimization and local SEO — the part that actually ' +
            'brings strangers to the site. Analytics, so you can see what is happening. ' +
            'A second revision round and two weeks of support after launch.',
        },
        {
          label: 'Who it suits',
          text:
            'Established local businesses with real competitors who are already ' +
            'showing up in search. If someone in your area is outranking you on Google ' +
            'and you are losing work to them, this is the tier that addresses it.',
        },
      ],
      points: [
        'Everything in Starter',
        'Up to five pages',
        'Gallery or testimonials',
        'Quote or appointment form',
        'Google Business Profile optimization',
        'Local SEO + Google Analytics',
        'Two revisions, 14 days support',
      ],
    },
    {
      kicker: '$1,799',
      title: 'Lead Engine — the site books the work',
      body:
        'Up to eight fully custom pages plus the automation and tracking layer. ' +
        'This is where the site stops being a brochure and starts being a system.',
      facets: [
        {
          label: 'What the extra $800 buys',
          text:
            'A real booking or quote system, so people schedule without a phone call. ' +
            'Automatic email response the moment someone enquires — the single biggest ' +
            'factor in whether a lead converts. An AI chatbot handling common questions ' +
            'at 11pm. Lead and conversion tracking, so you know which pages and which ' +
            'ad spend produce actual jobs. A review-request system, and Meta Pixel if ' +
            'you advertise. Three revisions and a month of support.',
        },
        {
          label: 'Why it costs more',
          text:
            'The design is fully custom rather than an adapted direction, and the ' +
            'automation has to be configured, connected and tested against how your ' +
            'business actually runs. That is discovery and integration work, not just ' +
            'more pages. It is also the tier where we expect the site to pay for itself, ' +
            'which changes how much thinking goes into it.',
        },
      ],
      points: [
        'Everything in Growth',
        'Up to eight pages, fully custom design',
        'Booking or quote system',
        'Automatic email response',
        'AI chatbot',
        'Lead and conversion tracking',
        'Review-request system, Meta Pixel',
        'Three revisions, 30 days support',
      ],
    },
    {
      kicker: 'Custom',
      title: 'Custom — scoped to the project',
      body:
        'Multi-location, e-commerce, interactive and 3D builds, or anything that ' +
        'does not fit a tier.',
      facets: [
        {
          label: 'How it works',
          text:
            'We talk through what you are trying to build, what it needs to connect ' +
            'to, and what success looks like. You get a written scope and a fixed ' +
            'quote before anything starts. No hourly surprises.',
        },
        {
          label: 'What lands here',
          text:
            'Online stores, booking systems tied to real inventory or staff calendars, ' +
            'multi-location businesses that need separate local pages, membership or ' +
            'login areas, and experiences like the one on this homepage.',
        },
      ],
      points: [
        'Scoped and quoted before work starts',
        'Custom integrations and systems',
        'Interactive and 3D experiences',
        'Multi-location or e-commerce',
        'Ongoing partnership options',
      ],
    },
    {
      kicker: 'Monthly',
      title: 'What happens after launch',
      body:
        'Every plan is optional and cancellable. Hosting has to live somewhere, but ' +
        'you are not obliged to keep it with us.',
      facets: [
        {
          label: 'Hosting — $29/mo',
          text:
            'Managed hosting, SSL certificate, uptime monitoring and automated ' +
            'backups. The floor: the site stays up, stays secure, and is recoverable.',
        },
        {
          label: 'Website Care — $79/mo',
          text:
            'Everything in Hosting, plus security checks, 30 minutes of edits, form ' +
            'testing and a performance check. For businesses that need occasional ' +
            'changes and want someone watching.',
        },
        {
          label: 'Growth Care — $149/mo',
          text:
            'Everything in Website Care, plus an hour of edits, an analytics summary, ' +
            'Google Business Profile updates, a new promotion or section each month, ' +
            'and basic SEO checks. This is the one most active businesses want.',
        },
        {
          label: 'Local Growth — $249/mo',
          text:
            'Everything in Growth Care, plus two hours of updates, full Google ' +
            'Business Profile management, two Google posts a month, a review-request ' +
            'system and a monthly lead report. Effectively an ongoing local marketing ' +
            'retainer.',
        },
      ],
    },
    {
      kicker: 'Fine print',
      title: 'What is not included',
      body:
        'These prices are starting prices, and we would rather say so up front than ' +
        'surprise you at invoice.',
      points: [
        'Domain registration and renewal',
        'Premium software licences and subscriptions',
        'Advertising spend',
        'Pages beyond the tier limit',
        'Custom features outside the agreed scope',
        'Rush delivery',
      ],
    },
  ],
  closing: {
    title: 'Still unsure which tier fits?',
    body:
      'Tell us what you do and what you want the site to achieve. We will tell you ' +
      'which tier is right — including when the cheaper one is genuinely enough.',
    cta: 'Ask us directly',
  },
};

/* -------------------------------------------------------------- process --- */

export const processPage: DetailPage = {
  slug: 'process',
  index: '03',
  eyebrow: 'The process in detail',
  title: 'Four steps, and exactly what happens in each.',
  lede:
    'No mystery, no long silences. You will know what we need from you, what we ' +
    'are doing, and roughly when. Most delays on web projects come from waiting ' +
    'on content, so we tell you early what to gather.',
  backTo: 'process',
  sections: [
    {
      kicker: '01',
      title: 'Discover',
      body: 'Understanding the business before designing anything.',
      facets: [
        {
          label: 'What happens',
          text:
            'A conversation about your business, your customers, your services, your ' +
            'pricing, and what is working or not working right now. We look at your ' +
            'current site if you have one, and at what your competitors are doing — ' +
            'mostly to find the gap you can own.',
        },
        {
          label: 'What we need from you',
          text:
            'Your service list, contact details, hours, service area, logo if you have ' +
            'one, and any photos of real work. Real photos beat stock every time. If ' +
            'you do not have them, say so early and we will plan around it.',
        },
        {
          label: 'What you get',
          text: 'A clear scope, a fixed price, and a realistic timeline. Then we start.',
        },
      ],
    },
    {
      kicker: '02',
      title: 'Create',
      body: 'Structure and direction, before a single final pixel.',
      facets: [
        {
          label: 'What happens',
          text:
            'We plan the page structure and the order information appears in — what a ' +
            'visitor sees first, what convinces them, where the call to action sits. ' +
            'Then the visual direction: type, colour, spacing, how it should feel. We ' +
            'help organise and sharpen your copy at this stage too.',
        },
        {
          label: 'What we need from you',
          text:
            'Feedback, reasonably promptly. This is the cheapest point in the project ' +
            'to change direction, and the most expensive one to stay quiet.',
        },
        {
          label: 'What you get',
          text:
            'An agreed structure and design direction, so nothing in the build phase ' +
            'is a surprise.',
        },
      ],
    },
    {
      kicker: '03',
      title: 'Build',
      body: 'Making it real, on every screen.',
      facets: [
        {
          label: 'What happens',
          text:
            'We build the site, wire up the forms and any booking or automation, and ' +
            'test it on phones, tablets, laptops and desktops. We check load speed, ' +
            'that forms actually deliver, that links work, and that it reads correctly ' +
            'at every width.',
        },
        {
          label: 'What we need from you',
          text:
            'Your revision rounds. Each tier includes a set number — one, two or three ' +
            '— and it helps enormously to gather all your notes into a single pass ' +
            'rather than sending them piecemeal.',
        },
        {
          label: 'What you get',
          text:
            'A working site on a preview link you can share with whoever needs to see ' +
            'it before launch.',
        },
      ],
    },
    {
      kicker: '04',
      title: 'Launch',
      body: 'Going live, and making sure it works after you do.',
      facets: [
        {
          label: 'What happens',
          text:
            'We connect your domain, set up SSL, submit the site to Google, configure ' +
            'analytics and Google Business Profile, and confirm forms deliver from the ' +
            'live domain rather than just the preview.',
        },
        {
          label: 'What we need from you',
          text:
            'Domain access, or the ability to update DNS. If you do not know where ' +
            'your domain lives, tell us early — tracking it down is the single most ' +
            'common cause of a delayed launch.',
        },
        {
          label: 'What you get',
          text:
            'A live site, plus post-launch support — 14 days on Growth, 30 on Lead ' +
            'Engine — and the option of a monthly care plan if you want it maintained.',
        },
      ],
    },
  ],
  closing: {
    title: 'Ready to start at step one?',
    body:
      'Discovery is a conversation, not a commitment. Tell us about the business ' +
      'and we will tell you what we would do.',
    cta: 'Start the conversation',
  },
};

/* --------------------------------------------------------------- faq ------ */

export const faqPage = {
  slug: 'faq',
  index: '05',
  eyebrow: 'Questions, in depth',
  title: 'Everything people ask before they hire us.',
  lede:
    'Including the awkward ones. If your question is not here, ask it — we would ' +
    'rather answer honestly up front than have you find out later.',
  backTo: 'faq',
  groups: [
    {
      title: 'Timing and process',
      items: [
        {
          q: 'How long does a website take?',
          a:
            'Starter sites typically take 7–10 business days. Growth sites take around ' +
            '14. Lead Engine and Custom projects run to a bespoke timeline. The single ' +
            'biggest variable is not our workload — it is how quickly content, photos ' +
            'and feedback come back. Projects that stall almost always stall there.',
        },
        {
          q: 'What do you need from me to start?',
          a:
            'Your service list, contact details, hours, service area, logo, and any ' +
            'photos of real work. You do not need finished copy — we help organise and ' +
            'sharpen what you give us. You do need to be reachable for feedback.',
        },
        {
          q: 'How many revisions do I get?',
          a:
            'One round on Starter, two on Growth, three on Lead Engine. A round means ' +
            'one consolidated set of changes, so it is worth collecting all your notes ' +
            'before sending. Further rounds are available and quoted separately.',
        },
        {
          q: 'Can you rush a project?',
          a:
            'Sometimes. Rush delivery is charged separately because it means displacing ' +
            'other work. Tell us the deadline early and we will say honestly whether it ' +
            'is achievable rather than agreeing and then missing it.',
        },
      ],
    },
    {
      title: 'Pricing and payment',
      items: [
        {
          q: 'Are the displayed prices final?',
          a:
            'They are starting prices. Additional pages, premium software, special ' +
            'integrations, advanced booking systems, custom features and rush delivery ' +
            'can increase the final figure. You get a fixed quote before any work ' +
            'starts, so the number you agree is the number you pay.',
        },
        {
          q: 'What is not included in the price?',
          a:
            'Domain registration and renewal, premium software licences and ' +
            'subscriptions, advertising spend, pages beyond your tier limit, and custom ' +
            'features outside the agreed scope. We flag these during discovery rather ' +
            'than at invoice.',
        },
        {
          q: 'Do I have to take a monthly plan?',
          a:
            'No. Monthly plans are optional and cancellable. Hosting does have to live ' +
            'somewhere, and you are welcome to host elsewhere — we will hand over what ' +
            'you need.',
        },
        {
          q: 'Do you take payment up front?',
          a:
            'Projects are split across a deposit and a balance on completion. The exact ' +
            'split is confirmed in writing with your quote before anything begins.',
        },
      ],
    },
    {
      title: 'The site itself',
      items: [
        {
          q: 'Will the website work on mobile phones?',
          a:
            'Yes, on every package. We design mobile-first rather than shrinking a ' +
            'desktop layout, because for most local businesses the majority of traffic ' +
            'arrives on a phone. It is tested on phones, tablets, laptops and desktops ' +
            'before launch.',
        },
        {
          q: 'Do I own the website?',
          a:
            'Yes. Once the project is paid in full, the site and its content are yours. ' +
            'You are not renting it from us and you are not locked in.',
        },
        {
          q: 'Can I edit the site myself?',
          a:
            'Depending on the build, yes — we will show you how to make routine content ' +
            'changes. For structural or design changes, monthly care plans include edit ' +
            'time, or we can quote one-off work.',
        },
        {
          q: 'Can you redesign my existing website?',
          a:
            'Yes. We will review what you have and tell you honestly whether it should ' +
            'be improved, redesigned, or rebuilt from scratch. Sometimes the answer is ' +
            'that your current site is fine and the real problem is visibility.',
        },
        {
          q: 'What happens to my old site and its rankings?',
          a:
            'We map your existing pages to the new ones and set up redirects, so search ' +
            'engines and anyone with an old link land in the right place instead of on ' +
            'an error page. Skipping this step is the usual reason a redesign tanks ' +
            'someone traffic.',
        },
      ],
    },
    {
      title: 'Results and expectations',
      items: [
        {
          q: 'Will this get me to the top of Google?',
          a:
            'Nobody can honestly promise a position, and anyone who does is selling ' +
            'you something. What we can do is put the foundations in place — a fast, ' +
            'well-structured site, a properly configured Google Business Profile, local ' +
            'signals and reviews — which is what actually moves local rankings. That ' +
            'compounds over months, not days.',
        },
        {
          q: 'How soon will I see leads?',
          a:
            'If you already have traffic from referrals or an existing profile, a better ' +
            'site can lift enquiries almost immediately, because you stop losing people ' +
            'who arrive and bounce. If you are starting from no visibility at all, local ' +
            'SEO takes time to build. We will tell you which situation you are in.',
        },
        {
          q: 'What if I do not like the design?',
          a:
            'That is what the Create stage exists to prevent — we agree structure and ' +
            'direction before building, so you are not seeing the look for the first ' +
            'time at the end. If it still misses, that is what your revision rounds are ' +
            'for.',
        },
        {
          q: 'Do you work with businesses outside Phoenix?',
          a:
            'Yes. We are based in Phoenix and know the local market well, but the work ' +
            'is remote-friendly and we build for businesses elsewhere too. Local SEO ' +
            'work targets wherever your customers actually are.',
        },
      ],
    },
    {
      title: 'Support and aftercare',
      items: [
        {
          q: 'Do you provide support after launch?',
          a:
            'Every project includes a support window — 14 days on Growth, 30 on Lead ' +
            'Engine — for anything that needs adjusting once it is live. Beyond that, ' +
            'optional monthly plans cover hosting, updates, monitoring, analytics, local ' +
            'SEO and Google Business Profile management.',
        },
        {
          q: 'What if something breaks?',
          a:
            'On a care plan, uptime monitoring alerts us rather than you, and automated ' +
            'backups mean we can roll back. Off a plan, get in touch and we will quote ' +
            'the fix.',
        },
        {
          q: 'Can I add features later?',
          a:
            'Yes. Sites are built so booking systems, extra pages, tracking or a chatbot ' +
            'can be added afterwards without a rebuild. Plenty of clients start on ' +
            'Starter or Growth and add to it as the business grows.',
        },
      ],
    },
  ],
  closing: {
    title: 'Question not answered?',
    body:
      'Ask it directly. You will get a straight answer, including when the answer ' +
      'is that we are not the right fit.',
    cta: 'Ask a question',
  },
};

/* ------------------------------------------------------------- projects --- */

export type ProjectDetail = {
  slug: string;
  name: string;
  category: string;
  href: string;
  image: string;
  tier: string;
  summary: string;
  highlights: string[];
  features: string[];
  whyItCosts: string;
};

export const projectDetails: ProjectDetail[] = [
  {
    slug: 'sutton',
    name: 'Sutton Signature Detail',
    category: 'Automotive Detailing · Phoenix, AZ',
    href: 'https://sutton-signature-detail.vercel.app/',
    image: '/assets/projects/sutton.webp',
    tier: 'Lead Engine tier',
    summary:
      'A premium detailing business competing on craft rather than price, which ' +
      'meant the site had to feel as considered as the work. Cinematic dark ' +
      'visuals, interactive pricing, and a conversion path built around getting a ' +
      'quote request rather than a phone call.',
    highlights: [
      'Full-bleed cinematic video hero that establishes the standard immediately',
      'Interactive pricing that lets customers build their own package',
      'Persistent quote CTA that follows the whole scroll',
      'Live chat widget for out-of-hours questions',
      'Service-area messaging front and centre — Phoenix + 50 mile radius',
    ],
    features: [
      'Fully custom design direction',
      'Multi-page structure with dedicated service pages',
      'Interactive pricing configurator',
      'Quote request system with automated reply',
      'Gallery and reviews sections',
      'AI chat widget',
      'Conversion tracking',
    ],
    whyItCosts:
      'The interactive pricing and quote flow are custom-built, not a plugin — ' +
      'they had to match how Sutton actually packages work. Combined with a bespoke ' +
      'visual direction and the automation layer behind enquiries, this sits firmly ' +
      'in Lead Engine territory.',
  },
  {
    slug: 'vaughan',
    name: 'Vaughan Family Plumbing',
    category: 'Plumbing & Water Heaters · Phoenix, AZ',
    href: 'https://vaughan-family-plumbing.vercel.app/',
    image: '/assets/projects/vaughan.webp',
    tier: 'Lead Engine tier',
    summary:
      'An emergency trade business where the customer is often stressed, often ' +
      'mobile, and often searching at an unsociable hour. Everything is built ' +
      'around one job: get them to call, fast, with confidence about price.',
    highlights: [
      'Interactive 3D water heater that disassembles as you scroll',
      'Open-24-hours banner and phone number pinned to every screen',
      'Up-front pricing stated before the customer has to ask',
      'Google review count and rating surfaced high on the page',
      'Call-first mobile layout with a fixed bottom action bar',
    ],
    features: [
      'Custom 3D product visualisation',
      'Scroll-driven interactive sequence',
      'Multi-page service structure',
      'Quote request and instant callback flow',
      'Local SEO and Google Business Profile work',
      'Review-request system',
    ],
    whyItCosts:
      'The 3D water heater is genuinely custom work — modelling, scroll ' +
      'choreography and performance tuning so it stays smooth on a mid-range ' +
      'phone. That is well beyond a template, and it is the thing that makes an ' +
      'unglamorous trade feel modern and trustworthy.',
  },
  {
    slug: 'seduction',
    name: 'Seduction Nails & Spa',
    category: 'Nail Salon · Phoenix, AZ',
    href: 'https://seduction-nails-demo.vercel.app/',
    image: '/assets/projects/seduction.webp',
    tier: 'Growth tier',
    summary:
      'A salon whose customers choose with their eyes. The brief was to make the ' +
      'visual work the hero and get people to book, with a mobile experience that ' +
      'felt as considered as the desktop one.',
    highlights: [
      'Editorial photography-led design with restrained type',
      'Service discovery organised the way customers actually browse',
      'Appointment request flow rather than a bare phone number',
      'Gallery built to show off nail work at full quality',
      '4.6 rating and 469+ reviews used as social proof up front',
    ],
    features: [
      'Custom visual direction',
      'Five-page structure',
      'Appointment request form',
      'Full gallery',
      'Google Business Profile optimization',
      'Local SEO and Analytics',
    ],
    whyItCosts:
      'Growth tier: five pages, a booking-style enquiry flow, gallery, and the ' +
      'local search work — but without the custom automation and tracking layer ' +
      'that pushes a project into Lead Engine.',
  },
  {
    slug: 'concrete',
    name: 'Concrete Moving',
    category: 'Moving Company · Phoenix, AZ',
    href: 'https://concrete-moving-demo.vercel.app/',
    image: '/assets/projects/concrete.webp',
    tier: 'Growth tier',
    summary:
      'Moving is a category where customers are actively price-comparing and ' +
      'nervous about hidden fees. The whole site is built around pricing clarity ' +
      'and visible trust signals.',
    highlights: [
      'Pricing stated plainly instead of hidden behind a form',
      'Trust signals — licensing, insurance, reviews — placed early',
      'Quote request built for fast comparison shopping',
      'Straightforward service breakdown with no upsell maze',
    ],
    features: [
      'Custom design direction',
      'Multi-page structure',
      'Quote request system',
      'Local SEO foundations',
      'Google Maps integration',
      'Analytics setup',
    ],
    whyItCosts:
      'A focused Growth build. The value here is in structure and messaging rather ' +
      'than technical complexity — knowing what to put first is most of the work in ' +
      'a category this competitive.',
  },
  {
    slug: 'valorant',
    name: 'VALORANT Fan Concept',
    category: 'Interactive Experience · Concept',
    href: 'https://valorant-demo-wine.vercel.app/',
    image: '/assets/projects/valorant.webp',
    tier: 'Custom tier',
    summary:
      'A self-directed concept piece, and the clearest demonstration of what we can ' +
      'do when there is no ceiling. Parallax environments, cinematic motion, ' +
      'draggable content and interactive storytelling — running entirely in a ' +
      'browser, on a phone. This is the experience playing on the phone at the top ' +
      'of our homepage.',
    highlights: [
      'Layered parallax environments with real depth',
      'Scroll-driven cinematic transitions between chapters',
      'Draggable, explorable content panels',
      'Agent, map and rank sections each with their own visual language',
      'Holds up at full quality on mobile — no stripped-back version',
    ],
    features: [
      '3D and parallax environment work',
      'Scroll-choreographed motion design',
      'Custom interaction patterns',
      'Performance tuning for mobile',
      'Original art direction throughout',
    ],
    whyItCosts:
      'Work at this level is quoted per project. The cost is in choreography and ' +
      'optimisation — making something this heavy feel weightless on a phone takes ' +
      'far longer than making it look good on a desktop.',
  },
];

export const projectsPage = {
  slug: 'projects',
  index: '04',
  eyebrow: 'The work, in detail',
  title: 'Every project, what went into it, and what it cost.',
  lede:
    'All of these are live — open them and judge for yourself. For each one, here ' +
    'is what the business needed, what we built, and honestly why it sat at the ' +
    'tier it did.',
  backTo: 'projects',
};

/* -------------------------------------------------------------- contact --- */

export const contactPage = {
  slug: 'contact',
  index: '06',
  eyebrow: 'Get in touch',
  title: 'Tell us what you need — whatever the reason.',
  lede:
    'New project, existing customer, or something that has gone wrong. Pick the ' +
    'reason you are writing and the form adjusts to only ask for what is relevant.',
  backTo: 'contact',
  purposes: [
    { value: 'consultation', label: 'Free consultation' },
    { value: 'interested', label: 'Interested in a project' },
    { value: 'problem', label: 'Reporting a problem' },
    { value: 'complaint', label: 'Making a complaint' },
    { value: 'support', label: 'Support request' },
    { value: 'other', label: 'Something else' },
  ],
  statuses: [
    { value: 'current', label: 'Current customer' },
    { value: 'past', label: 'Past customer' },
    { value: 'interested', label: 'Interested, not yet a customer' },
    { value: 'none', label: 'Not a customer' },
  ],
  urgency: [
    { value: 'whenever', label: 'No rush' },
    { value: 'weeks', label: 'Next few weeks' },
    { value: 'asap', label: 'As soon as possible' },
    { value: 'urgent', label: 'Urgent — site is down or broken' },
  ],
  reassurance: [
    { title: 'A real reply', text: 'Written by a person, usually within one business day.' },
    { title: 'No obligation', text: 'A consultation is a conversation, not a commitment.' },
    { title: 'Straight answers', text: 'Including when the answer is that you do not need us.' },
  ],
};

export const detailPages = [servicesPage, pricingPage, processPage];
