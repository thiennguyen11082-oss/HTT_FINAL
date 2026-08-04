import Lenis from 'lenis';

/**
 * Scroll layer.
 *
 * Lenis owns the scroll position and a single rAF loop drives every
 * scroll-linked effect on the page. Subscribers read from one shared frame
 * rather than each attaching their own listener, so parallax stays in lockstep
 * and there is exactly one layout read per frame.
 */

let lenis: Lenis | null = null;
let raf = 0;

type Frame = { y: number; vh: number };
const listeners = new Set<(f: Frame) => void>();

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isCoarsePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

function tick(time: number) {
  lenis?.raf(time);
  const frame: Frame = { y: window.scrollY, vh: window.innerHeight };
  listeners.forEach((fn) => fn(frame));
  raf = requestAnimationFrame(tick);
}

export function initScroll() {
  if (raf) return;

  if (!prefersReducedMotion()) {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    // Anything restored before this ran would be inherited as the start point.
    lenis.scrollTo(0, { immediate: true, force: true });
  }

  raf = requestAnimationFrame(tick);
}

export function destroyScroll() {
  cancelAnimationFrame(raf);
  raf = 0;
  lenis?.destroy();
  lenis = null;
  listeners.clear();
}

/**
 * Subscribe to the shared scroll frame.
 * The unsubscribe returns void so it can be used directly as an effect cleanup.
 */
export function onFrame(fn: (f: Frame) => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function lockScroll(locked: boolean) {
  document.body.dataset.locked = String(locked);
  if (!lenis) return;
  locked ? lenis.stop() : lenis.start();
}

/** Forces the page back to the very top instantly, even while Lenis is stopped. */
export function resetScroll() {
  window.scrollTo(0, 0);
  lenis?.scrollTo(0, { immediate: true, force: true });
}

/** Eases back to the top — for the logo and the back-to-top control. */
export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.3 });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

const GAP_BELOW_NAV = 28;

/**
 * Scrolls so a section's first content line sits just below the nav.
 *
 * Aligning to the section's top edge instead leaves a dead band the height of
 * its own padding. Both values are measured rather than hardcoded so this stays
 * correct across breakpoints. Do not add `scroll-mt-*` to sections — Lenis
 * honours scroll-margin on top of this and the two stack.
 */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const navH = document.querySelector('header')?.getBoundingClientRect().height ?? 84;
  const padTop = parseFloat(getComputedStyle(el).paddingTop) || 0;
  const offset = padTop - navH - GAP_BELOW_NAV;

  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.5 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
