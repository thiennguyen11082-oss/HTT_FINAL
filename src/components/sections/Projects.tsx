import { Link } from 'react-router-dom';
import Section from '../Section';
import { useReveal } from '../../lib/motion';
import { projects } from '../../content/site';

/**
 * Projects — homepage summary.
 *
 * Three cards only; the full set lives on /projects. Desktop staggers the
 * centre card upward for an editorial composition, mobile stacks them straight
 * down — the stagger is a wide-screen device and only creates awkward gaps once
 * the cards are full width.
 */

const FEATURED = ['sutton', 'vaughan', 'valorant'] as const;

const META: Record<string, { year: string; scope: string }> = {
  sutton: { year: '2026', scope: 'Design · Build · Conversion' },
  vaughan: { year: '2026', scope: 'Design · Build · 3D · Local SEO' },
  valorant: { year: '2025', scope: 'Concept · 3D · Interaction' },
};

export default function Projects() {
  const items = FEATURED.map((slug) => projects.items.find((p) => p.slug === slug)).filter(
    (p): p is (typeof projects.items)[number] => Boolean(p)
  );

  return (
    <Section id="projects" index={projects.index} label="Selected work" align="stack">
      <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="display-2 reveal ink-gradient max-w-[18ch]">{projects.heading}</h2>
          <p className="lede reveal reveal-1 mt-5">{projects.sub}</p>
        </div>
        <Link to="/projects" className="btn btn-ghost reveal reveal-2 shrink-0">
          Explore our work
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3 md:gap-5">
        {items.map((item, i) => (
          <Card key={item.slug} item={item} i={i} />
        ))}
      </div>
    </Section>
  );
}

function Card({ item, i }: { item: (typeof projects.items)[number]; i: number }) {
  const ref = useReveal<HTMLElement>('0px 0px -12% 0px');
  const meta = META[item.slug];

  return (
    <article
      ref={ref}
      data-inview="false"
      // Centre card lifts on wide screens only.
      className={`group relative flex flex-col ${i === 1 ? 'md:-translate-y-10' : ''}`}
    >
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="reveal block overflow-hidden rounded-[14px] border border-white/[0.09] bg-obsidian-raised transition-all duration-600 ease-cine hover:-translate-y-1.5 hover:border-white/20"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={item.image}
            alt={`${item.name} — ${item.category}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-1200 ease-cine group-hover:scale-[1.05]"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(8,8,11,0.85) 0%, rgba(8,8,11,0.12) 45%, transparent 70%)',
            }}
          />
          <span className="absolute left-4 top-4 font-display text-[0.55rem] font-700 uppercase tracking-wide3 text-cobalt-light">
            {item.category}
          </span>
        </div>
      </a>

      <div className="reveal reveal-1 flex flex-1 flex-col pt-6">
        <h3 className="font-display text-xl font-700 tracking-tighter text-chalk">{item.name}</h3>
        <p className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-chalk-muted">{item.body}</p>

        {meta && (
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/[0.08] pt-5">
            <div>
              <dt className="font-display text-[0.5rem] font-600 uppercase tracking-wide2 text-chalk-ghost">
                Year
              </dt>
              <dd className="mt-1 text-[0.78rem] text-chalk-soft">{meta.year}</dd>
            </div>
            <div>
              <dt className="font-display text-[0.5rem] font-600 uppercase tracking-wide2 text-chalk-ghost">
                Scope
              </dt>
              <dd className="mt-1 text-[0.78rem] leading-snug text-chalk-soft">{meta.scope}</dd>
            </div>
          </dl>
        )}

        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mt-5 inline-flex items-center gap-2.5 font-display text-[0.6rem] font-700 uppercase tracking-wide2 text-chalk transition-colors duration-400 hover:text-cobalt-light"
        >
          Visit live site
          <span className="inline-block transition-transform duration-600 ease-cine group-hover/link:translate-x-1.5">
            ↗
          </span>
        </a>
      </div>
    </article>
  );
}
