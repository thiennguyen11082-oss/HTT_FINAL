import { useReveal } from '../lib/motion';
import { scrollToId } from '../lib/scroll';
import { hero, site } from '../content/site';
import Backdrop from './Backdrop';
import HeroPhone from './HeroPhone';

/**
 * Hero.
 *
 * Editorial split: type holds the left, the device composite holds the right.
 * The device is a photoreal render with a live screen inside it, leaning a few
 * degrees toward the pointer — the only movement in the section.
 */
export default function Hero() {
  const ref = useReveal<HTMLElement>('0px');

  return (
    <section ref={ref} data-inview="false" className="relative isolate overflow-hidden">
      <Backdrop />

      <div className="shell relative flex min-h-[100svh] flex-col justify-center pb-20 pt-[calc(var(--nav-h)+3rem)] lg:pb-28 lg:pt-[var(--nav-h)]">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* ------------------------------------------------------ type -- */}
          <div className="relative z-10 max-w-[42rem]">
            <p className="kicker reveal">{hero.eyebrow}</p>

            {/* "obvious choice." must hold one line at desktop — whitespace-nowrap
                rather than a smaller cap, so the statement keeps its weight. */}
            <h1 className="display-1 reveal reveal-1 mt-7">
              <span className="block ink-gradient">Websites that</span>
              <span className="block ink-gradient">make you the</span>
              <span className="block whitespace-nowrap text-cobalt-bright">obvious choice.</span>
            </h1>

            <p className="lede reveal reveal-2 mt-8">{hero.body}</p>

            <div className="reveal reveal-3 mt-11 flex flex-wrap items-center gap-3">
              <button onClick={() => scrollToId('contact')} className="btn btn-primary">
                {hero.primaryCta.label}
              </button>
              <button onClick={() => scrollToId('projects')} className="btn btn-ghost">
                {hero.secondaryCta.label}
              </button>
            </div>

            <dl className="reveal reveal-4 mt-14 hidden gap-12 sm:flex">
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl font-800 tracking-tighter text-chalk">
                    {s.value}
                  </dt>
                  <dd className="mt-1.5 font-display text-[0.58rem] font-600 uppercase tracking-wide2 text-chalk-faint">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---------------------------------------------------- device -- */}
          <div className="relative">
            {/* Pool of light under the device, so it sits in the scene rather
                than floating on top of it. */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80%] w-[120%] -translate-x-1/2 -translate-y-1/2 blur-[80px]"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(47,94,240,0.22) 0%, transparent 72%)',
              }}
            />
            <HeroPhone className="reveal reveal-2 mx-auto w-[72%] max-w-[330px] lg:w-full lg:max-w-[420px]" />
          </div>
        </div>

        {/* Baseline: scroll cue left, direct line right. */}
        <div className="reveal reveal-4 mt-16 flex items-end justify-between lg:absolute lg:inset-x-[var(--shell-x)] lg:bottom-10 lg:mt-0">
          <div className="flex items-center gap-3">
            <span className="relative block h-8 w-px overflow-hidden bg-white/12">
              <span className="absolute inset-x-0 top-0 h-3 animate-scan bg-cobalt" />
            </span>
            <span className="font-display text-[0.56rem] font-600 uppercase tracking-wide3 text-chalk-faint">
              Scroll
            </span>
          </div>
          <a
            href={`tel:${site.phoneHref}`}
            className="hidden font-display text-[0.62rem] font-600 uppercase tracking-wide2 text-chalk-faint transition-colors duration-400 hover:text-chalk sm:block"
          >
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
