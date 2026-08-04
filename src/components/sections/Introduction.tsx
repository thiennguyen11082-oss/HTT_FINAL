import { useEffect, useRef, useState } from 'react';
import { introStages } from '../../content/intro';
import { onFrame, prefersReducedMotion } from '../../lib/scroll';
import { useReveal } from '../../lib/motion';

/**
 * Introduction — four scroll-driven stages.
 *
 * Desktop pins a single asset stage and cross-dissolves between the four
 * renders as you scroll, so the object reads as one thing transforming rather
 * than four unrelated pictures appearing. All four are stacked in the same box
 * and only their opacity, scale and rotation change, which keeps the handover
 * continuous and costs nothing per frame beyond a transform.
 *
 * Mobile drops the pin entirely: text above, asset below, each stage its own
 * block. Pinning on a phone fights the browser's own scroll and the assets end
 * up travelling further than the viewport is tall.
 */

const COUNT = introStages.length;

export default function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [narrow, setNarrow] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setNarrow(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Progress through the pinned run, 0 → 1, sampled on the shared frame.
  useEffect(() => {
    if (narrow || prefersReducedMotion()) return;
    const el = sectionRef.current;
    if (!el) return;

    return onFrame(({ vh }) => {
      const rect = el.getBoundingClientRect();
      const travel = rect.height - vh;
      if (travel <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / travel));
      setProgress(p);
      setActive(Math.min(COUNT - 1, Math.floor(p * COUNT + 0.001)));
    });
  }, [narrow]);

  if (narrow) return <IntroStacked />;

  return (
    <section
      id="introduction"
      ref={sectionRef}
      className="relative"
      style={{ height: `${COUNT * 100}vh` }}
      aria-label="Introduction"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="shell grid w-full grid-cols-2 items-center gap-16">
          {/*
           * The brief alternates which side the asset sits on per stage. Rather
           * than reordering the grid — which would jump — both columns slide a
           * full cell width, so the swap is part of the transformation.
           */}
          {/* ------------------------------------------------------ asset -- */}
          <div
            className="relative flex h-[62vh] items-center justify-center transition-transform duration-900 ease-cine"
            style={{
              transform: `translateX(${introStages[active].side === 'left' ? '0%' : 'calc(100% + 4rem)'})`,
            }}
          >
            {/* One pool of light for the whole stage, so the object never
                arrives without its own lighting. */}
            <div
              className="pointer-events-none absolute inset-0 blur-[90px]"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(47,94,240,0.34) 0%, rgba(47,94,240,0.08) 45%, transparent 72%)',
              }}
            />
            {introStages.map((s, i) => {
              const d = i - progress * COUNT + 0.5;
              const near = Math.max(0, 1 - Math.abs(d) * 1.6);
              return (
                <img
                  key={s.id}
                  src={s.asset}
                  alt=""
                  width={620}
                  height={620}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="absolute max-h-full w-[74%] max-w-[430px] object-contain will-change-transform"
                  style={{
                    opacity: near,
                    transform: `translate3d(0, ${(d * -34).toFixed(1)}px, 0) scale(${(
                      0.9 + near * 0.1
                    ).toFixed(3)}) rotate(${(d * 5).toFixed(2)}deg)`,
                    transition: 'none',
                  }}
                />
              );
            })}
          </div>

          {/* ------------------------------------------------------- copy -- */}
          <div
            className="relative h-[52vh] transition-transform duration-900 ease-cine"
            style={{
              transform: `translateX(${introStages[active].side === 'left' ? '0%' : 'calc(-100% - 4rem)'})`,
            }}
          >
            {introStages.map((s, i) => {
              const on = i === active;
              return (
                <div
                  key={s.id}
                  aria-hidden={!on}
                  className="absolute inset-0 flex flex-col justify-center transition-all duration-600 ease-cine"
                  style={{
                    opacity: on ? 1 : 0,
                    transform: on ? 'translateY(0)' : 'translateY(22px)',
                    pointerEvents: on ? 'auto' : 'none',
                  }}
                >
                  <StageCopy stage={s} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage counter, doubling as a progress rail. */}
        <div className="absolute bottom-12 left-[var(--shell-x)] flex items-center gap-3">
          {introStages.map((s, i) => (
            <span
              key={s.id}
              className="h-px transition-all duration-600 ease-cine"
              style={{
                width: i === active ? 40 : 16,
                background: i === active ? '#2F5EF0' : 'rgba(255,255,255,0.18)',
              }}
            />
          ))}
          <span className="ml-3 font-display text-[0.58rem] font-600 tracking-wide2 text-chalk-faint">
            {String(active + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}

/** Text block, shared by both layouts. */
function StageCopy({ stage: s }: { stage: (typeof introStages)[number] }) {
  return (
    <>
      <span className="kicker mb-5">{s.kicker}</span>
      <h2 className="display-2 ink-gradient">
        {s.title.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>
      <p className="lede mt-6">{s.body}</p>
      <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-2.5">
        {s.points.map((p) => (
          <li
            key={p}
            className="flex items-center gap-2.5 font-display text-[0.6rem] font-600 uppercase tracking-wide2 text-chalk-soft"
          >
            <span className="h-1 w-1 shrink-0 rounded-full bg-cobalt" />
            {p}
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * Mobile: one stage at a time, stepped rather than stacked.
 *
 * Four full blocks ran nearly four screens for what is a single argument in
 * four beats, and the repeated copy-then-asset rhythm made it read as four
 * unrelated sections. Stepping through them in place keeps it one unit and one
 * screen. Copy sits above the asset — the words are the point, and a phone
 * shows what is at the top first.
 *
 * Both the copy and the asset stack every stage into a single grid cell, so the
 * block is as tall as its tallest stage and stepping never reflows the page
 * under the reader's thumb.
 */
function IntroStacked() {
  const ref = useReveal<HTMLElement>('0px 0px -12% 0px');
  const [active, setActive] = useState(0);
  const touchX = useRef<number | null>(null);

  const step = (dir: number) =>
    setActive((i) => Math.min(COUNT - 1, Math.max(0, i + dir)));

  return (
    <section
      id="introduction"
      ref={ref}
      data-inview="false"
      className="shell relative border-t border-white/[0.06] py-14"
      aria-label="Introduction"
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* ------------------------------------------------------------ copy -- */}
      <div className="reveal grid">
        {introStages.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== active}
            className="col-start-1 row-start-1 flex flex-col transition-opacity duration-500 ease-cine"
            style={{
              opacity: i === active ? 1 : 0,
              pointerEvents: i === active ? 'auto' : 'none',
            }}
          >
            <StageCopy stage={s} />
          </div>
        ))}
      </div>

      {/* ------------------------------------------------------------ dots -- */}
      <div className="reveal reveal-1 mt-9 flex items-center gap-2.5">
        {introStages.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            aria-label={`Stage ${i + 1}: ${s.kicker}`}
            aria-current={i === active}
            className="h-6 shrink-0 py-[11px]"
            style={{ width: i === active ? 34 : 18 }}
          >
            <span
              className="block h-px w-full transition-colors duration-500 ease-cine"
              style={{
                background: i === active ? '#2F5EF0' : 'rgba(255,255,255,0.18)',
              }}
            />
          </button>
        ))}
        <span className="ml-2 font-display text-[0.58rem] font-600 tracking-wide2 text-chalk-faint">
          {String(active + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
        </span>
      </div>

      {/* ----------------------------------------------------------- asset -- */}
      <div className="relative mt-8 grid justify-items-center">
        <div
          className="pointer-events-none absolute inset-0 blur-[60px]"
          style={{
            background:
              'radial-gradient(closest-side, rgba(47,94,240,0.20) 0%, transparent 70%)',
          }}
        />
        {introStages.map((s, i) => (
          <img
            key={s.id}
            src={s.asset}
            alt=""
            width={620}
            height={620}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="col-start-1 row-start-1 w-[62%] max-w-[280px] object-contain transition-all duration-600 ease-cine"
            style={{
              opacity: i === active ? 1 : 0,
              transform: i === active ? 'scale(1)' : 'scale(0.94)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
