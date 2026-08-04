import { type ReactNode } from 'react';
import { useReveal } from '../lib/motion';

/**
 * Section shell.
 *
 * One ground for the whole site — the rhythm comes from spacing, rule weight
 * and scale, not from alternating background colours. Headers use an editorial
 * two-column split: label and index on the left, statement on the right.
 *
 * No scroll-margin here: scrollToId computes the landing offset from the
 * measured nav height and this section's padding, and Lenis honours
 * scroll-margin on top of that — the two stack into a dead band.
 */
export default function Section({
  id,
  index,
  label,
  heading,
  sub,
  children,
  className = '',
  align = 'split',
}: {
  id: string;
  index?: string;
  label?: string;
  heading?: string;
  sub?: string;
  children: ReactNode;
  className?: string;
  align?: 'split' | 'stack';
}) {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id={id}
      ref={ref}
      data-inview="false"
      className={`relative py-20 md:py-32 ${className}`}
    >
      <div className="shell relative">
        {(label || heading) && (
          <header
            className={
              align === 'split'
                ? 'mb-12 grid gap-6 md:mb-20 md:grid-cols-[14rem_1fr] md:gap-12'
                : 'mb-12 md:mb-20'
            }
          >
            <div className="reveal">
              {index && (
                <span className="mb-3 block font-display text-[0.6rem] font-700 tracking-wide2 text-cobalt">
                  {index}
                </span>
              )}
              {label && (
                <span className="font-display text-[0.6rem] font-600 uppercase tracking-wide3 text-chalk-faint">
                  {label}
                </span>
              )}
              <span className="mt-5 hidden h-px w-full bg-white/10 md:block" />
            </div>

            <div>
              {heading && <h2 className="display-2 reveal reveal-1 ink-gradient">{heading}</h2>}
              {sub && <p className="lede reveal reveal-2 mt-6">{sub}</p>}
            </div>
          </header>
        )}

        {children}
      </div>
    </section>
  );
}
