/**
 * Single source of truth for every word on the site.
 * Components read from here — no copy is hardcoded in JSX.
 */

export const site = {
  name: 'HTT Marketing Agency',
  shortName: 'HTT',
  tagline: 'Phoenix web design & digital growth',
  email: 'contact@httmarketing.com',
  phone: '(623) 999-6330',
  phoneHref: '+16239996330',
  serviceArea: 'Phoenix, Arizona and beyond',
  social: {
    instagram: 'https://www.instagram.com/httmarketingagency/',
    tiktok: 'https://www.tiktok.com/@httmarketingagency',
  },
} as const;

export const nav = [
  { id: 'services', label: 'Services', index: '01' },
  { id: 'pricing', label: 'Pricing', index: '02' },
  { id: 'process', label: 'Process', index: '03' },
  { id: 'projects', label: 'Projects', index: '04' },
  { id: 'faq', label: 'FAQ', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
] as const;

/* ---------------------------------------------------------------- hero --- */

export const hero = {
  eyebrow: 'Phoenix web design & digital growth',
  title: ['We build', 'digital masterpieces.'],
  body:
    'HTT Marketing Agency creates premium websites for ambitious businesses ' +
    'that want to look established, stand apart from competitors, and turn ' +
    'attention into real customers.',
  primaryCta: { label: 'Start Your Project', href: '#contact' },
  secondaryCta: { label: 'Explore Our Work', href: '#projects' },
  stats: [
    { value: '100%', label: 'Responsive' },
    { value: 'PHX', label: 'Arizona' },
  ],
} as const;

/**
 * Copy that swaps as the 3D device turns.
 * Titles are pre-split per line so they never wrap into the device on the right.
 */
export const heroActs = [
  {
    eyebrow: 'Phoenix web design & digital growth',
    title: ['We build', 'digital', 'masterpieces.'],
    body:
      'HTT Marketing Agency creates premium websites for ambitious businesses ' +
      'that want to look established, stand apart from competitors, and turn ' +
      'attention into real customers.',
  },
  {
    eyebrow: 'Every screen, every time',
    title: ['Built to hold', 'attention.'],
    body:
      'The same care goes into the phone in your customer’s hand as the ' +
      'desktop on their desk. Most of them will only ever see the small one.',
  },
  {
    eyebrow: 'Mobile is not the afterthought',
    title: ['Designed for', 'the small', 'screen first.'],
    body:
      'Most of your customers will only ever see the phone version. So that is ' +
      'the one we design first, and the desktop grows out of it — never the ' +
      'other way round.',
  },
  {
    eyebrow: 'Our signature',
    title: ['Where craft', 'stops being', 'decoration.'],
    body:
      'Interactive 3D, real-time materials, motion that responds to the ' +
      'visitor. Not effects for their own sake — the reason people stay on the ' +
      'page long enough to become customers.',
  },
  {
    eyebrow: 'And this is the ceiling',
    title: ['If we can build', 'this, we can', 'build yours.'],
    body:
      'A local service site or something nobody has tried yet — the same ' +
      'craft goes into both. Tell us which one you need.',
  },
] as const;

/* ------------------------------------------------------------ services --- */

export const services = {
  index: '01',
  heading: 'More than just a website.',
  items: [
    {
      title: 'Website Design',
      body:
        'Bold, mobile-friendly websites designed to make your business look ' +
        'established, trustworthy, and easy to contact.',
      points: ['Custom visual direction', 'Mobile-first design', 'Contact and quote forms'],
    },
    {
      title: 'Lead Generation',
      body:
        'Customer-focused tools that help visitors call, book appointments, ' +
        'request quotes, and become qualified leads.',
      points: ['Booking and quote systems', 'Conversion tracking', 'Automated responses'],
    },
    {
      title: 'Local Visibility',
      body:
        'Improve your local online presence so nearby customers can find your ' +
        'business, understand what you offer, and contact you.',
      points: ['Google Business Profile', 'Google Maps integration', 'Basic local SEO'],
    },
    {
      title: 'Website Care',
      body:
        'Ongoing support that keeps your website secure, monitored, maintained, ' +
        'and ready to serve new customers.',
      points: ['Website updates', 'Backups and monitoring', 'Performance checks'],
    },
  ],
} as const;

/* ------------------------------------------------------------- pricing --- */

export type Tier = {
  name: string;
  promise: string;
  price: string;
  priceNote: string;
  timeline: string;
  forWho: string;
  inheritsFrom?: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const pricing = {
  index: '02',
  heading: 'Straight pricing. No surprises.',
  sub:
    'Every package below is a complete, launched website — not a template ' +
    'you finish yourself. Pick the one that matches how hard you need it to work.',
  tiers: [
    {
      name: 'Starter',
      promise: 'Look established, fast.',
      price: '$499',
      priceNote: 'starting',
      timeline: '7–10 business days',
      forWho: 'New businesses that need to exist online, properly, this month.',
      features: [
        'One page, up to six sections',
        'Designed mobile-first',
        'Tap-to-call button',
        'Contact form straight to your inbox',
        'Google Maps + social links',
        'Basic SEO setup',
        'Your domain connected',
        'One revision round',
      ],
      cta: 'Start with Starter',
    },
    {
      name: 'Growth',
      promise: 'Get found. Get calls.',
      price: '$999',
      priceNote: 'starting',
      timeline: 'about 14 business days',
      forWho:
        'Businesses ready to show up in local search instead of just having a URL.',
      inheritsFrom: 'Starter',
      features: [
        'Up to five pages — room for the full story',
        'Gallery or testimonials section',
        'Quote or appointment request form',
        'Google Business Profile optimized',
        'Local SEO so nearby customers find you',
        'Google Analytics — see who is visiting',
        'Two revision rounds',
        '14 days of post-launch support',
      ],
      cta: 'Choose Growth',
      featured: true,
    },
    {
      name: 'Lead Engine',
      promise: 'The site books the work.',
      price: '$1,799',
      priceNote: 'starting',
      timeline: 'custom project timeline',
      forWho:
        'Established businesses that want the website earning its keep every day.',
      inheritsFrom: 'Growth',
      features: [
        'Up to eight pages, fully custom design',
        'Online booking or quote system',
        'Automatic email reply the second someone inquires',
        'AI chatbot answering questions 24/7',
        'Lead and conversion tracking — know what works',
        'Review-request system',
        'Meta Pixel for advertising',
        'Three revision rounds',
        '30 days of support',
      ],
      cta: 'Build the engine',
    },
    {
      name: 'Custom',
      promise: 'Anything above this line.',
      price: "Let's talk",
      priceNote: 'scoped to you',
      timeline: 'defined together',
      forWho:
        'Multi-location, e-commerce, 3D and interactive builds, or something nobody has asked for yet.',
      features: [
        'Scoped and quoted to your project',
        'Custom integrations and systems',
        'Interactive and 3D experiences',
        'Multi-location or e-commerce builds',
        'Ongoing partnership options',
        'Revisions defined in your scope',
      ],
      cta: 'Tell us the idea',
    },
  ] satisfies Tier[],
  disclaimer:
    'Domain registration, premium software, subscriptions, advertising, ' +
    'additional pages, and custom features may be charged separately.',
} as const;

export type CarePlan = {
  name: string;
  price: string;
  inheritsFrom?: string;
  features: string[];
  featured?: boolean;
};

export const carePlans = {
  index: '02b',
  heading: 'After launch',
  sub: '',
  plans: [
    {
      name: 'Hosting',
      price: '$29',
      features: ['Managed hosting', 'SSL certificate', 'Uptime monitoring', 'Automated backups'],
    },
    {
      name: 'Website Care',
      price: '$79',
      inheritsFrom: 'Hosting',
      features: ['Security checks', '30 minutes of edits', 'Form testing', 'Performance check'],
    },
    {
      name: 'Growth Care',
      price: '$149',
      inheritsFrom: 'Website Care',
      features: [
        'One hour of edits',
        'Analytics summary',
        'Google Business Profile updates',
        'New promotion or section',
        'Basic SEO checks',
      ],
      featured: true,
    },
    {
      name: 'Local Growth',
      price: '$249',
      inheritsFrom: 'Growth Care',
      features: [
        'Two hours of updates',
        'Google Business Profile management',
        'Two Google posts per month',
        'Review-request system',
        'Monthly lead report',
      ],
    },
  ] satisfies CarePlan[],
} as const;

/* ------------------------------------------------------------- process --- */

export const process = {
  index: '03',
  heading: 'Five steps. One powerful result.',
  steps: [
    {
      n: '01',
      title: 'Discover',
      body:
        'Tell us about your business, customers, services, goals, and current ' +
        'online presence.',
    },
    {
      n: '02',
      title: 'Create',
      body:
        'We plan the website structure, design direction, messaging, and ' +
        'customer journey.',
    },
    {
      n: '03',
      title: 'Build',
      body:
        'We build, test, optimize, and complete the revisions included in your ' +
        'package.',
    },
    {
      n: '04',
      title: 'Launch',
      body:
        'We connect your domain, launch the website, and prepare it for real ' +
        'customers.',
    },
    {
      n: '05',
      title: 'Serve & Grow',
      body:
        'Your website is live and working. You focus on serving your customers ' +
        'while we remain available for support, improvements and future growth.',
    },
  ],
} as const;

/* ------------------------------------------------------------ projects --- */

export const projects = {
  index: '04',
  heading: 'Proof lives in the experience.',
  sub: 'Every one of these is live. Open them.',
  items: [
    {
      slug: 'sutton',
      name: 'Sutton Signature Detail',
      category: 'Automotive Detailing',
      body:
        'A flagship lead-generation experience with cinematic visuals, ' +
        'interactive pricing, premium mobile UX, and conversion strategy.',
      href: 'https://sutton-signature-detail.vercel.app/',
      image: '/assets/projects/sutton.webp',
    },
    {
      slug: 'vaughan',
      name: 'Vaughan Family Plumbing',
      category: 'Plumbing & Water Heaters',
      body:
        'A 24/7 emergency service site with an interactive 3D water heater, ' +
        'upfront pricing, and a call-first mobile experience.',
      href: 'https://vaughan-family-plumbing.vercel.app/',
      image: '/assets/projects/vaughan.webp',
    },
    {
      slug: 'seduction',
      name: 'Seduction Nails & Spa',
      category: 'Nail Salon',
      body:
        'Luxury visual storytelling, service discovery, appointment conversion, ' +
        'galleries, and a fully designed mobile experience.',
      href: 'https://seduction-nails-demo.vercel.app/',
      image: '/assets/projects/seduction.webp',
    },
    {
      slug: 'concrete',
      name: 'Concrete Moving',
      category: 'Moving Company',
      body:
        'A focused local-service website built around pricing clarity, customer ' +
        'trust, calls, and quote requests.',
      href: 'https://concrete-moving-demo.vercel.app/',
      image: '/assets/projects/concrete.webp',
    },
    {
      slug: 'valorant',
      name: 'VALORANT Fan Concept',
      category: 'Interactive Experience',
      body:
        'An experimental 3D web experience using parallax environments, ' +
        'cinematic motion, draggable content, and interactive storytelling.',
      href: 'https://valorant-demo-wine.vercel.app/',
      image: '/assets/projects/valorant.webp',
    },
  ],
} as const;

/* -------------------------------------------------------------- why HTT -- */

export const whyHtt = {
  heading: 'Creativity with commercial purpose.',
  body:
    'A great website should feel memorable, but every creative decision still ' +
    'needs to support credibility, customer experience, visibility, and ' +
    'business growth.',
  points: [
    'Custom direction',
    'Mobile-first design',
    'Conversion strategy',
    'Local SEO foundation',
    'Direct communication',
    'Ongoing support',
  ],
} as const;

/* ------------------------------------------------------------------ faq -- */

export const faq = {
  index: '05',
  heading: 'Questions, answered.',
  items: [
    {
      q: 'How long does a website take?',
      a:
        'Starter websites typically take 7–10 business days. Multi-page and ' +
        'custom projects may take approximately 14 business days or longer, ' +
        'depending on features, revisions, and how quickly you provide content.',
    },
    {
      q: 'Will you help with website content?',
      a:
        'Yes. You provide key business information, services, contact details, ' +
        'photos, and your logo. We help organize and refine that information for ' +
        'the website.',
    },
    {
      q: 'Are the displayed prices final?',
      a:
        'The displayed prices are starting prices. Additional pages, premium ' +
        'software, special integrations, advanced booking systems, custom ' +
        'features, and urgent delivery may increase the final price.',
    },
    {
      q: 'Will the website work on mobile phones?',
      a:
        'Yes. Every website package includes mobile optimization for phones, ' +
        'tablets, laptops, and desktop computers.',
    },
    {
      q: 'Can you redesign my existing website?',
      a:
        'Yes. We can review your current website and recommend whether it should ' +
        'be improved, redesigned, or completely rebuilt.',
    },
    {
      q: 'Do you provide support after launch?',
      a:
        'Yes. Optional monthly plans are available for hosting, updates, ' +
        'monitoring, analytics, local SEO, and Google Business Profile support.',
    },
  ],
} as const;

/* -------------------------------------------------------------- contact -- */

export const contact = {
  index: '06',
  heading: 'Tell us what you want to build.',
  sub: 'Free consultation. No obligation, no pressure.',
  businessTypes: [
    'Nail Salon',
    'Car Detailing',
    'Plumber',
    'Moving Company',
    'Dental Office',
    'Other Business',
  ],
  budgets: ['$499 – $998', '$999 – $1,798', '$1,799 or more', 'Not sure yet'],
  submitLabel: 'Request Free Consultation',
  privacy:
    'Your information is used only to respond to your consultation request. ' +
    'By submitting this form, you agree to our Privacy Policy and Terms of Use.',
} as const;

/* --------------------------------------------------------------- footer -- */

export const footer = {
  blurb:
    'Premium websites, lead-generation systems, local visibility, and digital ' +
    'experiences for ambitious businesses.',
  /** `href` starting with `#` scrolls the home page; anything else is a route. */
  columns: [
    {
      title: 'Explore',
      links: [
        { label: 'Services', href: '/services' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Process', href: '/process' },
        { label: 'Projects', href: '/projects' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact & Support', href: '/contact' },
        { label: 'Free Consultation', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} HTT Marketing Agency. All rights reserved.`,
} as const;
