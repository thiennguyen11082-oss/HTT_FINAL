import { useState } from 'react';
import { Link } from 'react-router-dom';
import Section from '../Section';
import { faq } from '../../content/site';

/**
 * FAQ.
 *
 * Numbered rows on a hairline grid. The open row gets a cobalt spine and the
 * question shifts right slightly, so the active item is obvious without any
 * box or fill. No accordion chrome.
 */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" index={faq.index} label="Before you ask" heading={faq.heading}>
      <div className="border-t border-white/[0.08]">
        {faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="relative border-b border-white/[0.08]">
              <span
                className="absolute inset-y-0 left-0 w-px origin-top bg-cobalt transition-transform duration-600 ease-cine"
                style={{ transform: isOpen ? 'scaleY(1)' : 'scaleY(0)' }}
              />

              <h3>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-start gap-5 py-6 pl-0 text-left transition-[padding] duration-600 ease-cine md:gap-8"
                  style={{ paddingLeft: isOpen ? '1.75rem' : '0' }}
                >
                  <span
                    className={`mt-1 shrink-0 font-display text-[0.58rem] font-700 tracking-wide2 transition-colors duration-400 ${
                      isOpen ? 'text-cobalt' : 'text-chalk-ghost'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span
                    className={`flex-1 font-display text-lg font-700 tracking-tight transition-colors duration-400 md:text-xl ${
                      isOpen ? 'text-chalk' : 'text-chalk-soft group-hover:text-chalk'
                    }`}
                  >
                    {item.q}
                  </span>

                  <span
                    className="relative mt-2 block h-3 w-3 shrink-0 transition-transform duration-600 ease-cine"
                    style={{ transform: isOpen ? 'rotate(135deg)' : 'none' }}
                    aria-hidden
                  >
                    <span
                      className={`absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 transition-colors duration-400 ${isOpen ? 'bg-cobalt' : 'bg-chalk-faint'}`}
                    />
                    <span
                      className={`absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 transition-colors duration-400 ${isOpen ? 'bg-cobalt' : 'bg-chalk-faint'}`}
                    />
                  </span>
                </button>
              </h3>

              <div
                className="grid transition-[grid-template-rows] duration-600 ease-cine"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <p className="max-w-[62ch] pb-7 pl-[1.75rem] text-[0.9rem] leading-relaxed text-chalk-muted md:pl-[4.25rem]">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <Link to="/faq" className="btn btn-ghost">
          Read the full Q&amp;A
        </Link>
      </div>
    </Section>
  );
}
