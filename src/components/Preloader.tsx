import { useEffect, useState } from 'react';
import { setStage, prefersReducedMotion } from '../lib/stage';
import { useStage } from '../lib/useStage';
import { lockScroll, resetScroll } from '../lib/scroll';
import Logo from './Logo';

/**
 * Opening.
 *
 * A count and a hairline that fills, then the whole panel lifts away as two
 * halves. No spinner, no bouncing dots — the restraint is the point.
 */
const MIN_MS = 1500;

const HERO_ASSETS = [
  '/assets/devices/phone.webp',
  '/assets/scene/plate.webp',
  '/assets/projects/sutton.webp',
];

export default function Preloader() {
  const { phase } = useStage();
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);

  /**
   * No "have I already run" guard here. Under StrictMode the effect runs, is
   * cleaned up, then runs again — and a guard would let the cleanup cancel the
   * first loop while blocking the second from ever starting, leaving the
   * counter frozen at zero. Re-running the whole body is safe and idempotent.
   */
  useEffect(() => {
    lockScroll(true);
    // The opening only makes sense from the top. Re-assert next frame too:
    // layout settles after mount and can re-clamp the offset.
    resetScroll();
    const raf = requestAnimationFrame(resetScroll);

    if (prefersReducedMotion()) {
      setStage({ phase: 'live' });
      lockScroll(false);
      return () => cancelAnimationFrame(raf);
    }

    const started = performance.now();
    let loaded = 0;

    const done = () => {
      loaded += 1;
    };
    HERO_ASSETS.forEach((src) => {
      const img = new Image();
      // Resolve on error too: a missing asset must never wedge the page.
      img.onload = img.onerror = done;
      img.src = src;
    });

    let frame = 0;
    const tick = () => {
      const byTime = (performance.now() - started) / MIN_MS;
      const byAsset = loaded / HERO_ASSETS.length;
      // Whichever is slower gates the bar, so it never outruns reality and
      // never finishes before the floor.
      const p = Math.min(byTime, Math.max(byAsset, byTime * 0.55));
      setPct(Math.min(99, Math.round(p * 99)));

      if (p >= 1) {
        setLeaving(true);
        setTimeout(() => {
          setStage({ phase: 'live' });
          lockScroll(false);
        }, 900);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (phase === 'live') return null;

  return (
    <div className="fixed inset-0 z-[100]" aria-hidden={leaving}>
      {/* Two halves that part, revealing the hero already composed beneath. */}
      {(['top', 'bottom'] as const).map((half) => (
        <div
          key={half}
          className="absolute inset-x-0 h-1/2 bg-obsidian-deep transition-transform duration-[900ms] ease-cine"
          style={{
            [half]: 0,
            transform: leaving
              ? `translateY(${half === 'top' ? '-100%' : '100%'})`
              : 'translateY(0)',
          }}
        />
      ))}

      <div
        className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-400 ease-cine"
        style={{ opacity: leaving ? 0 : 1 }}
      >
        <Logo size={64} className="mb-10 opacity-90" />

        <div className="relative h-px w-[min(320px,58vw)] overflow-hidden bg-white/12">
          <span
            className="absolute inset-y-0 left-0 bg-cobalt"
            style={{ width: `${pct}%`, transition: 'width 120ms linear' }}
          />
        </div>

        <div className="mt-5 flex w-[min(320px,58vw)] items-center justify-between">
          <span className="font-display text-[0.55rem] font-600 uppercase tracking-wide3 text-chalk-ghost">
            HTT Marketing Agency
          </span>
          <span className="font-display text-[0.62rem] font-600 tabular-nums tracking-wide2 text-chalk-muted">
            {String(pct).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
