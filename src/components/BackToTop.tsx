import { useEffect, useState } from 'react';
import { onFrame, scrollToTop } from '../lib/scroll';

/**
 * Floating back-to-top control.
 *
 * Appears only once there is somewhere to go back to. Sits above the safe-area
 * inset on phones and clears the right gutter on desktop, so it never lands on
 * top of content.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(
    () =>
      onFrame(({ y, vh }) => {
        const next = y > vh * 1.2;
        setShow((prev) => (prev === next ? prev : next));
      }),
    []
  );

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-obsidian/80 text-chalk backdrop-blur-xl transition-all duration-600 ease-cine hover:border-cobalt hover:bg-cobalt hover:text-white md:right-8 md:h-12 md:w-12"
      style={{
        bottom: 'calc(1.25rem + env(safe-area-inset-bottom))',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.92)',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
