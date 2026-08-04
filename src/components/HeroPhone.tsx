import { useEffect, useRef } from 'react';
import { usePointerTilt } from '../lib/motion';
import { onFrame, prefersReducedMotion } from '../lib/scroll';

/**
 * Hero device.
 *
 * The supplied render, isolated from its studio backdrop by
 * scripts/isolate-object.mjs so only the phone, its rim light and its own
 * spill remain — dropped in unaltered it carries a grey box that reads as a
 * hard-edged media container on the black page.
 *
 * No screen compositing: the screen content is baked into the render. The only
 * motion is a few degrees of lean toward the pointer and a little scroll drift,
 * both damped heavily so the object feels weighted rather than animated.
 */
export default function HeroPhone({
  className = '',
  drift = 34,
}: {
  className?: string;
  drift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pointer = usePointerTilt(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let rx = 0;
    let ry = 0;
    let ty = 0;

    return onFrame(({ vh }) => {
      const rect = el.getBoundingClientRect();
      const centre = rect.top + rect.height / 2;
      const p = (centre - vh / 2) / vh;

      const targetRy = pointer.current.x * 4;
      const targetRx = pointer.current.y * -2.5;
      const targetTy = p * -drift;

      rx += (targetRx - rx) * 0.045;
      ry += (targetRy - ry) * 0.045;
      ty += (targetTy - ty) * 0.09;

      el.style.transform =
        `translate3d(0, ${ty.toFixed(2)}px, 0) ` +
        `rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`;
    });
  }, [pointer, drift]);

  return (
    <div className={`relative ${className}`} style={{ perspective: '2400px' }}>
      <div ref={ref} className="will-change-transform">
        <img
          src="/assets/devices/hero-phone.webp"
          alt="A website built by HTT Marketing Agency, shown on a phone"
          width={820}
          height={1230}
          loading="eager"
          {...{ fetchpriority: 'high' }}
          decoding="async"
          className="pointer-events-none block h-auto w-full select-none"
        />
      </div>
    </div>
  );
}
