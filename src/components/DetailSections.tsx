import { Link } from 'react-router-dom';
import type { Detail } from '../content/pages';
import { useReveal } from '../lib/motion';

/** Shared renderer for the "kicker / title / facets / points" detail blocks. */
export function DetailBlocks({ sections }: { sections: Detail[] }) {
  return (
    <div className="shell py-16 md:py-24">
      <div className="space-y-16 md:space-y-24">
        {sections.map((s) => (
          <Block key={s.title} s={s} />
        ))}
      </div>
    </div>
  );
}

function Block({ s }: { s: Detail }) {
  const ref = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      data-inview="false"
      className="grid gap-7 border-t border-white/[0.08] pt-10 md:grid-cols-[minmax(0,19rem)_1fr] md:gap-14 md:pt-14"
    >
      <div className="reveal md:sticky md:top-[calc(var(--nav-h)+2rem)] md:self-start">
        {s.kicker && (
          <span className="mb-3 block font-display text-[0.62rem] font-700 uppercase tracking-wide2 text-cobalt">
            {s.kicker}
          </span>
        )}
        <h2 className="display-3 text-chalk">{s.title}</h2>
        {s.body && (
          <p className="mt-4 text-[0.92rem] leading-relaxed text-chalk-muted">{s.body}</p>
        )}
      </div>

      <div className="reveal reveal-1">
        {s.facets && (
          <dl className="space-y-8">
            {s.facets.map((f) => (
              <div key={f.label}>
                <dt className="mb-2.5 font-display text-[0.62rem] font-700 uppercase tracking-wide2 text-chalk">
                  {f.label}
                </dt>
                <dd className="max-w-[64ch] leading-relaxed text-chalk-muted">{f.text}</dd>
              </div>
            ))}
          </dl>
        )}

        {s.points && (
          <ul
            className={`grid gap-x-10 gap-y-3 sm:grid-cols-2 ${
              s.facets ? 'mt-10 border-t border-white/[0.08] pt-8' : ''
            }`}
          >
            {s.points.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-cobalt" />
                <span className="text-[0.88rem] leading-snug text-chalk-soft">{p}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

/** Closing call-to-action band, shared across detail pages. */
export function ClosingBand({
  title,
  body,
  cta,
}: {
  title: string;
  body: string;
  cta: string;
}) {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      data-inview="false"
      className="relative overflow-hidden border-t border-white/[0.07]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-40%] h-[90%]"
        style={{
          background:
            'radial-gradient(55% 100% at 50% 100%, rgba(47,94,240,0.18) 0%, transparent 70%)',
        }}
        aria-hidden
      />
      <div className="shell relative py-20 text-center md:py-28">
        <h2 className="display-2 reveal ink-gradient mx-auto max-w-[20ch]">{title}</h2>
        <p className="reveal reveal-1 mx-auto mt-6 max-w-[54ch] leading-relaxed text-chalk-muted">
          {body}
        </p>
        <Link to="/contact" className="btn btn-primary reveal reveal-2 mt-10">
          {cta}
        </Link>
      </div>
    </section>
  );
}
