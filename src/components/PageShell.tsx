import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Backdrop from './Backdrop';
import { useSeo } from '../lib/seo';
import { useReveal } from '../lib/motion';

/**
 * Layout for the six detail pages.
 *
 * Same nav and footer as home, with a cinematic masthead so a detail page still
 * opens like part of the same site rather than a documentation page.
 */
export default function PageShell({
  index,
  eyebrow,
  title,
  lede,
  backTo,
  seo,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lede: string;
  /** Home-page section id this page expands on. */
  backTo: string;
  seo: { title: string; description: string; path: string };
  children: ReactNode;
}) {
  useSeo(seo);
  const ref = useReveal<HTMLElement>('0px');

  return (
    <>
      <Header />

      <main className="relative min-h-screen">
        <header ref={ref} data-inview="false" className="relative overflow-hidden">
          <Backdrop />

          <div className="shell relative pb-16 pt-[calc(var(--nav-h)+5rem)] md:pb-24 md:pt-[calc(var(--nav-h)+8rem)]">
            <div className="grid gap-6 md:grid-cols-[14rem_1fr] md:gap-12">
              <div className="reveal">
                <span className="mb-3 block font-display text-[0.6rem] font-700 tracking-wide2 text-cobalt">
                  {index}
                </span>
                <span className="font-display text-[0.6rem] font-600 uppercase tracking-wide3 text-chalk-faint">
                  {eyebrow}
                </span>
                <span className="mt-5 hidden h-px w-full bg-white/10 md:block" />
              </div>

              <div>
                <h1 className="display-2 reveal reveal-1 ink-gradient max-w-[22ch]">{title}</h1>
                <p className="lede reveal reveal-2 mt-7">{lede}</p>

                <Link
                  to={`/#${backTo}`}
                  className="reveal reveal-3 group mt-10 inline-flex items-center gap-2.5 font-display text-[0.62rem] font-700 uppercase tracking-wide2 text-chalk-faint transition-colors duration-400 hover:text-chalk"
                >
                  <span className="inline-block transition-transform duration-600 ease-cine group-hover:-translate-x-1.5">
                    ←
                  </span>
                  Back to overview
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="relative border-t border-white/[0.07]">{children}</div>
      </main>

      <Footer />
    </>
  );
}
