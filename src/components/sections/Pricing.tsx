import { useState } from 'react';
import { Link } from 'react-router-dom';
import Section from '../Section';
import { pricing, carePlans } from '../../content/site';
import { scrollToId } from '../../lib/scroll';

/**
 * Pricing.
 *
 * A comparison rail, not four stacked brochures. Each tier is a column with a
 * shared baseline so prices line up and the ladder is readable at a glance; the
 * featured tier is lifted with a cobalt edge rather than a filled block.
 * Care plans sit behind a toggle so they never compete with the build packages.
 */
export default function Pricing() {
  const [showCare, setShowCare] = useState(false);

  return (
    <Section
      id="pricing"
      index={pricing.index}
      label="Investment"
      heading={pricing.heading}
      sub={pricing.sub}
    >
      {/* Four separate cards with real gaps — a shared hairline grid reads as
          one table, which flattens the ladder between the tiers. */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
        {pricing.tiers.map((t, i) => (
          <article
            key={t.name}
            className={[
              'reveal group relative flex flex-col rounded-[16px] border p-7 transition-all duration-600 ease-cine hover:-translate-y-1.5 md:p-8',
              t.featured
                ? 'border-cobalt/45 shadow-cobalt xl:-translate-y-3 xl:hover:-translate-y-4'
                : 'border-white/[0.08] hover:border-white/20',
            ].join(' ')}
            style={{
              transitionDelay: `${i * 70}ms`,
              background: t.featured
                ? 'linear-gradient(180deg, rgba(47,94,240,0.16) 0%, rgba(14,14,19,1) 58%)'
                : 'linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.008) 42%, rgba(13,13,19,1) 100%)',
              boxShadow: t.featured ? undefined : 'inset 0 1px 0 0 rgba(255,255,255,0.07)',
            }}
          >
            {t.featured && <span className="absolute inset-x-7 top-0 h-px bg-cobalt" />}

            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-700 tracking-tighter text-chalk">
                {t.name}
              </h3>
              {t.featured && (
                <span className="shrink-0 rounded-full border border-cobalt/50 px-2.5 py-1 font-display text-[0.48rem] font-700 uppercase tracking-wide2 text-cobalt-light">
                  Popular
                </span>
              )}
            </div>

            <p className="mt-1.5 font-display text-[0.72rem] font-600 text-cobalt-light">
              {t.promise}
            </p>

            <div className="mt-7 flex min-h-[3.25rem] items-baseline gap-2">
              <span
                className={`font-display font-800 tracking-tightest text-chalk ${
                  t.price.startsWith('$') ? 'text-[2.5rem]' : 'text-[1.7rem]'
                }`}
              >
                {t.price}
              </span>
              <span className="font-display text-[0.52rem] font-600 uppercase tracking-wide2 text-chalk-ghost">
                {t.priceNote}
              </span>
            </div>

            <p className="mt-3 min-h-[3.5rem] text-[0.8rem] leading-relaxed text-chalk-muted">
              {t.forWho}
            </p>

            <p className="mt-5 border-t border-white/[0.08] pt-4 font-display text-[0.52rem] font-600 uppercase tracking-wide2 text-chalk-ghost">
              {t.timeline}
            </p>

            <ul className="mt-5 flex-1 space-y-2">
              {t.inheritsFrom && (
                <li className="mb-3 font-display text-[0.6rem] font-700 uppercase tracking-wide2 text-cobalt-light">
                  Everything in {t.inheritsFrom}, plus
                </li>
              )}
              {t.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-cobalt/70" />
                  <span className="text-[0.8rem] leading-snug text-chalk-soft">{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => scrollToId('contact')}
              className={`mt-7 w-full rounded-full py-3 font-display text-[0.62rem] font-700 uppercase tracking-wide2 transition-all duration-400 ease-cine ${
                t.featured
                  ? 'bg-cobalt text-white hover:bg-cobalt-bright'
                  : 'border border-white/15 text-chalk hover:border-white/40'
              }`}
            >
              {t.cta}
            </button>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
        <p className="max-w-[54ch] text-[0.74rem] leading-relaxed text-chalk-ghost">
          {pricing.disclaimer}
        </p>
        <Link to="/pricing" className="btn btn-ghost shrink-0">
          What separates the tiers
        </Link>
      </div>

      {/* ---------------------------------------------------- care plans -- */}
      <div className="mt-16 border-t border-white/[0.08] pt-10">
        <button
          onClick={() => setShowCare((v) => !v)}
          aria-expanded={showCare}
          className="flex w-full items-center justify-between gap-6 text-left"
        >
          <span>
            <span className="font-display text-xl font-700 tracking-tighter text-chalk">
              {carePlans.heading}
            </span>
            <span className="ml-4 font-display text-[0.6rem] font-600 uppercase tracking-wide2 text-chalk-ghost">
              Optional · from $29/mo
            </span>
          </span>
          <span
            className="relative block h-3 w-3 shrink-0 transition-transform duration-600 ease-cine"
            style={{ transform: showCare ? 'rotate(135deg)' : 'none' }}
            aria-hidden
          >
            <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-chalk" />
            <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-chalk" />
          </span>
        </button>

        <div
          className="grid transition-[grid-template-rows] duration-600 ease-cine"
          style={{ gridTemplateRows: showCare ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <div className="grid gap-3 pt-8 sm:grid-cols-2 xl:grid-cols-4">
              {carePlans.plans.map((p) => (
                <article
                  key={p.name}
                  className={`panel p-5 ${p.featured ? 'border-cobalt/40' : ''}`}
                >
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-display text-[0.88rem] font-700 tracking-tight text-chalk">
                      {p.name}
                    </h4>
                    {p.featured && (
                      <span className="font-display text-[0.46rem] font-700 uppercase tracking-wide2 text-cobalt-light">
                        Best value
                      </span>
                    )}
                  </div>
                  <p className="mt-2 font-display text-xl font-800 tracking-tightest text-chalk">
                    {p.price}
                    <span className="ml-1 font-display text-[0.52rem] font-600 uppercase tracking-wide2 text-chalk-ghost">
                      /month
                    </span>
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {'inheritsFrom' in p && p.inheritsFrom && (
                      <li className="font-display text-[0.55rem] font-700 uppercase tracking-wide2 text-cobalt-light/80">
                        Everything in {p.inheritsFrom}, plus
                      </li>
                    )}
                    {p.features.map((f) => (
                      <li key={f} className="text-[0.76rem] leading-snug text-chalk-muted">
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
