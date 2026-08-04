import { useEffect, useRef, useState } from 'react';
import { onFrame, prefersReducedMotion, isCoarsePointer } from './scroll';

/**
 * Marks an element `data-inview` once it enters the viewport, driving the
 * masked-reveal CSS. One-shot: content does not re-hide on scroll back, which
 * reads as a glitch rather than an effect.
 */
export function useReveal<T extends HTMLElement>(rootMargin = '0px 0px -12% 0px') {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.dataset.inview = 'true';
      return;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.inview = 'true';
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return ref;
}

/**
 * Scroll-linked translation.
 *
 * `speed` is how far the element moves relative to the scroll, as a fraction:
 * 0.1 drifts gently, negative moves against the scroll. Writes transforms
 * directly rather than through React state — this runs every frame.
 */
export function useParallax<T extends HTMLElement>(speed = 0.12, scale = false) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let raf = 0;
    let current = 0;

    return onFrame(({ y, vh }) => {
      const rect = el.getBoundingClientRect();
      // Progress of the element through the viewport, -1 (below) to 1 (above).
      const centre = rect.top + rect.height / 2;
      const p = (centre - vh / 2) / vh;

      const target = p * vh * speed * -1;
      current += (target - current) * 0.12;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = scale
          ? `translate3d(0, ${current.toFixed(2)}px, 0) scale(${(1 + Math.abs(p) * 0.04).toFixed(4)})`
          : `translate3d(0, ${current.toFixed(2)}px, 0)`;
      });
      void y;
    });
  }, [speed, scale]);

  return ref;
}

/**
 * Progress of an element through the viewport, 0 → 1, sampled per frame.
 * Used for scroll-linked rotation on the device composite.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const value = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return onFrame(({ vh }) => {
      const rect = el.getBoundingClientRect();
      const total = rect.height + vh;
      const seen = vh - rect.top;
      value.current = Math.min(1, Math.max(0, seen / total));
    });
  }, []);

  return { ref, value };
}

/** Pointer position in -1..1, for subtle device tilt. Desktop only. */
export function usePointerTilt(strength = 1) {
  const value = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isCoarsePointer() || prefersReducedMotion()) return;
    const onMove = (e: PointerEvent) => {
      value.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * strength;
      value.current.y = (-(e.clientY / window.innerHeight) * 2 + 1) * strength;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [strength]);

  return value;
}

/** Tracks whether the page has scrolled past a threshold. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(
    () => onFrame(({ y }) => setScrolled((prev) => (prev === y > threshold ? prev : y > threshold))),
    [threshold]
  );
  return scrolled;
}
