import { useState } from 'react';
import PageShell from '../components/PageShell';
import { seo } from '../lib/seo';
import { ClosingBand } from '../components/DetailSections';
import { faqPage as p } from '../content/pages';

export default function FaqPage() {
  // Keyed by "groupIndex:itemIndex" so groups open independently.
  const [open, setOpen] = useState<string | null>('0:0');

  return (
    <PageShell
      index={p.index}
      eyebrow={p.eyebrow}
      title={p.title}
      lede={p.lede}
      backTo={p.backTo}
      seo={seo.faq}
    >
      <div className="shell py-20 md:py-28">
        <div className="space-y-16 md:space-y-20">
          {p.groups.map((group, gi) => (
            <section key={group.title}>
              <div className="mb-8 flex items-center gap-4">
                <h2 className="font-display text-[0.7rem] font-700 uppercase tracking-wide3 text-ink-faint">
                  {group.title}
                </h2>
                <span className="h-px flex-1 bg-ink/12" />
              </div>

              <div className="border-t border-ink/12">
                {group.items.map((item, ii) => {
                  const key = `${gi}:${ii}`;
                  const isOpen = open === key;
                  return (
                    <div key={item.q} className="border-b border-ink/12">
                      <h3>
                        <button
                          onClick={() => setOpen(isOpen ? null : key)}
                          aria-expanded={isOpen}
                          className="flex w-full items-start justify-between gap-6 py-6 text-left"
                        >
                          <span className="font-display text-lg font-700 tracking-tight text-ink md:text-xl">
                            {item.q}
                          </span>
                          <span
                            className="relative mt-2 block h-3 w-3 shrink-0 transition-transform duration-500 ease-elite"
                            style={{ transform: isOpen ? 'rotate(135deg)' : 'none' }}
                            aria-hidden
                          >
                            <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-ink" />
                            <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-ink" />
                          </span>
                        </button>
                      </h3>

                      <div
                        className="grid transition-[grid-template-rows] duration-500 ease-elite"
                        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                      >
                        <div className="overflow-hidden">
                          <p className="max-w-[68ch] pb-7 leading-relaxed text-ink-muted">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      <ClosingBand {...p.closing} />
    </PageShell>
  );
}

