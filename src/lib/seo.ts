import { useEffect } from 'react';

const SITE = 'https://httmarketing.com';
const DEFAULT_OG = `${SITE}/assets/og.jpg`;

type Seo = {
  title: string;
  description: string;
  /** Path without domain, e.g. "/pricing". */
  path: string;
};

function setMeta(selector: string, attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

/**
 * Per-route title, description, canonical and Open Graph tags.
 *
 * This is a client-rendered SPA, so these are written on navigation rather than
 * served in the initial HTML. Google renders JS and picks them up; other
 * crawlers may not, which is the known trade-off of this architecture. The
 * static tags in index.html cover the home page for everything else.
 */
export function useSeo({ title, description, path }: Seo) {
  useEffect(() => {
    const url = `${SITE}${path}`;

    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:image"]', 'property', 'og:image', DEFAULT_OG);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', DEFAULT_OG);
  }, [title, description, path]);
}

export const seo = {
  home: {
    title: 'HTT Marketing Agency — Premium Web Design in Phoenix, Arizona',
    description:
      'Premium websites, lead generation and local visibility for ambitious Phoenix businesses. Packages from $499. Free consultation.',
    path: '/',
  },
  services: {
    title: 'Web Design & Lead Generation Services — HTT Marketing Agency',
    description:
      'Website design, lead generation, local visibility and website care — what each service does, why it matters and how we handle it.',
    path: '/services',
  },
  pricing: {
    title: 'Website Pricing — $499 to $1,799 | HTT Marketing Agency',
    description:
      'What separates a $499 site from a $1,799 one. Starter, Growth, Lead Engine and Custom explained in full, plus monthly care plans from $29.',
    path: '/pricing',
  },
  process: {
    title: 'Our Process — Discover, Create, Build, Launch | HTT Marketing Agency',
    description:
      'Four steps and exactly what happens in each: what we need from you, what we are doing, and what you get at every stage.',
    path: '/process',
  },
  projects: {
    title: 'Our Work — Live Website Projects | HTT Marketing Agency',
    description:
      'Sutton Signature Detail, Vaughan Family Plumbing, Seduction Nails & Spa and more. What went into each build and why it cost what it did.',
    path: '/projects',
  },
  faq: {
    title: 'Frequently Asked Questions — HTT Marketing Agency',
    description:
      'Timing, pricing, ownership, rankings and aftercare. Straight answers to everything people ask before hiring a web designer.',
    path: '/faq',
  },
  contact: {
    title: 'Contact & Free Consultation — HTT Marketing Agency Phoenix',
    description:
      'Start a project, report a problem or ask a question. Free consultation, no obligation. Phoenix, Arizona and beyond.',
    path: '/contact',
  },
} as const;
