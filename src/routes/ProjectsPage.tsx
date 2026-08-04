import PageShell from '../components/PageShell';
import BrowserFrame from '../components/BrowserFrame';
import { ClosingBand } from '../components/DetailSections';
import { seo } from '../lib/seo';
import { useReveal, useParallax } from '../lib/motion';
import { projectsPage as p, projectDetails, type ProjectDetail } from '../content/pages';

function Case({ proj, i }: { proj: ProjectDetail; i: number }) {
  const ref = useReveal<HTMLElement>('0px 0px -15% 0px');
  const shot = useParallax<HTMLDivElement>(0.05);

  return (
    <article
      ref={ref}
      data-inview="false"
      className="group border-t border-white/[0.08] pt-12 md:pt-16"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div className="reveal">
          <span className="mb-3 block font-display text-[0.6rem] font-700 uppercase tracking-wide3 text-cobalt">
            {String(i + 1).padStart(2, '0')} — {proj.category}
          </span>
          <h2 className="display-2 text-chalk">{proj.name}</h2>
        </div>
        <span className="reveal reveal-1 shrink-0 rounded-full border border-white/15 px-4 py-1.5 font-display text-[0.56rem] font-700 uppercase tracking-wide2 text-chalk-muted">
          {proj.tier}
        </span>
      </div>

      <div ref={shot} className="reveal reveal-1 will-change-transform">
        <a href={proj.href} target="_blank" rel="noopener noreferrer" className="block">
          <BrowserFrame
            src={proj.image}
            alt={`${proj.name} — ${proj.category}`}
            url={proj.href.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            aspect="16/9"
          />
        </a>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.15fr_1fr] md:gap-16">
        <div className="reveal reveal-2">
          <p className="lede mb-9">{proj.summary}</p>

          <h3 className="mb-4 font-display text-[0.62rem] font-700 uppercase tracking-wide2 text-chalk">
            What makes it work
          </h3>
          <ul className="space-y-3">
            {proj.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-cobalt" />
                <span className="text-[0.9rem] leading-snug text-chalk-soft">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal reveal-3 space-y-4">
          <div className="panel p-6">
            <h3 className="mb-4 font-display text-[0.62rem] font-700 uppercase tracking-wide2 text-chalk">
              Included in this build
            </h3>
            <ul className="space-y-2">
              {proj.features.map((f) => (
                <li key={f} className="text-[0.85rem] leading-snug text-chalk-muted">
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel border-cobalt/30 p-6">
            <h3 className="mb-3 font-display text-[0.62rem] font-700 uppercase tracking-wide2 text-cobalt-light">
              Why it sits at this tier
            </h3>
            <p className="text-[0.85rem] leading-relaxed text-chalk-muted">{proj.whyItCosts}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <PageShell
      index={p.index}
      eyebrow={p.eyebrow}
      title={p.title}
      lede={p.lede}
      backTo={p.backTo}
      seo={seo.projects}
    >
      <div className="shell py-16 md:py-24">
        <div className="space-y-20 md:space-y-28">
          {projectDetails.map((proj, i) => (
            <Case key={proj.slug} proj={proj} i={i} />
          ))}
        </div>
      </div>

      <ClosingBand
        title="Want something in this company?"
        body="Tell us what you are building. We will tell you which tier it lands in and what it would take."
        cta="Start your project"
      />
    </PageShell>
  );
}
