import { Link } from 'react-router-dom';
import Section from '../Section';
import { process } from '../../content/site';

/**
 * Process — five steps on a timeline.
 *
 * The connector belongs to each step rather than being one rule behind the
 * whole grid. A single full-width line always overshoots the final node, and
 * at medium widths — where the grid wraps to 3 + 2 — it floats over the second
 * row unattached. Per-step segments stop exactly at the last dot at every
 * breakpoint, and each one bridges its own grid gap.
 */
export default function Process() {
  const last = process.steps.length - 1;

  return (
    <Section
      id="process"
      index={process.index}
      label="How it runs"
      heading={process.heading}
    >
      <ol className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 md:gap-y-14 xl:grid-cols-5 xl:gap-8">
        {process.steps.map((s, i) => (
          <li
            key={s.n}
            className="reveal relative pl-12 xl:pl-0 xl:pt-12"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            {/* Segment to the next step. Absent on the final step, which is
                what stops the line at the last dot. */}
            {i !== last && (
              <>
                {/* Vertical, below xl. Extends past the cell to cross the gap. */}
                <span
                  className="absolute left-[13px] top-9 w-px bg-gradient-to-b from-cobalt/50 via-white/20 to-white/[0.07] xl:hidden"
                  style={{ height: 'calc(100% - 2.25rem + 2.5rem)' }}
                  aria-hidden
                />
                {/* Horizontal, at xl where all five sit on one row. */}
                <span
                  className="absolute left-[30px] top-[13px] hidden h-px bg-gradient-to-r from-cobalt/50 via-white/20 to-white/[0.07] xl:block"
                  style={{ width: 'calc(100% - 30px + 2rem)' }}
                  aria-hidden
                />
              </>
            )}

            {/* Node. The final one is filled, so the sequence reads as closed. */}
            <span
              className={`absolute left-0 top-1.5 flex h-[27px] w-[27px] items-center justify-center rounded-full border bg-obsidian xl:top-0 ${
                i === last ? 'border-cobalt/70' : 'border-white/12'
              }`}
            >
              <span
                className={`rounded-full bg-cobalt ${i === last ? 'h-2.5 w-2.5' : 'h-1.5 w-1.5'}`}
              />
            </span>

            <span className="font-display text-[0.58rem] font-700 uppercase tracking-wide2 text-chalk-ghost">
              Step {s.n}
            </span>
            <h3 className="mt-3 font-display text-xl font-700 tracking-tighter text-chalk md:text-2xl">
              {s.title}
            </h3>
            <p className="mt-3 max-w-[34ch] text-[0.88rem] leading-relaxed text-chalk-muted">
              {s.body}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-14">
        <Link to="/process" className="btn btn-ghost">
          What happens in each step
        </Link>
      </div>
    </Section>
  );
}
