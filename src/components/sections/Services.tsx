import { Link } from 'react-router-dom';
import Section from '../Section';
import { services, whyHtt } from '../../content/site';

/**
 * Services.
 *
 * A numbered editorial index rather than a card grid — rows that behave like a
 * table of contents, opening up on hover. The shard render anchors the "why"
 * coda so it does not read as an afterthought paragraph.
 */
export default function Services() {
  return (
    <Section
      id="services"
      index={services.index}
      label="What we do"
      heading={services.heading}
    >
      <div className="border-t border-white/[0.08]">
        {services.items.map((s, i) => (
          <article
            key={s.title}
            className="reveal group relative grid gap-4 border-b border-white/[0.08] py-8 transition-colors duration-600 ease-cine hover:bg-white/[0.02] md:grid-cols-[4rem_1fr_1.15fr] md:items-baseline md:gap-10 md:py-10"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {/* Cobalt edge that draws in on hover. */}
            <span className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-cobalt transition-transform duration-600 ease-cine group-hover:scale-y-100" />

            <span className="font-display text-[0.62rem] font-700 tracking-wide2 text-cobalt md:pl-5">
              {String(i + 1).padStart(2, '0')}
            </span>

            <h3 className="font-display text-2xl font-700 tracking-tighter text-chalk transition-transform duration-600 ease-cine group-hover:translate-x-1 md:text-[1.9rem]">
              {s.title}
            </h3>

            <div>
              <p className="max-w-[46ch] text-[0.92rem] leading-relaxed text-chalk-muted">
                {s.body}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="font-display text-[0.58rem] font-600 uppercase tracking-wide2 text-chalk-faint"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Link to="/services" className="btn btn-ghost">
          Explore every service
        </Link>
      </div>

      {/* ------------------------------------------------------- why HTT -- */}
      <div className="mt-24 grid items-center gap-12 md:mt-32 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <div className="reveal relative">
          <div
            className="pointer-events-none absolute inset-0 -z-10 scale-110 blur-[70px]"
            style={{
              background:
                'radial-gradient(closest-side, rgba(47,94,240,0.22) 0%, transparent 70%)',
            }}
          />
          <img
            src="/assets/scene/shard.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="mx-auto w-[78%] max-w-[380px] animate-drift md:w-full"
          />
        </div>

        <div>
          <h3 className="display-3 reveal ink-gradient">{whyHtt.heading}</h3>
          <p className="lede reveal reveal-1 mt-6">{whyHtt.body}</p>
          <ul className="reveal reveal-2 mt-9 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
            {whyHtt.points.map((p) => (
              <li
                key={p}
                className="flex items-center gap-3 border-b border-white/[0.07] pb-3 font-display text-[0.64rem] font-600 uppercase tracking-wide2 text-chalk-soft"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-cobalt" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
