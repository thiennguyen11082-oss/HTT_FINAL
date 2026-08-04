import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { nav, site } from '../content/site';
import { scrollToId, onFrame, scrollToTop } from '../lib/scroll';
import { useStage } from '../lib/useStage';
import Logo from './Logo';

/**
 * Navigation.
 *
 * Fully transparent over the hero, transitioning into dark glass once the page
 * moves. Nothing else is fixed on desktop — no floating rails, no bottom bars.
 */
export default function Header() {
  const { phase } = useStage();
  const [active, setActive] = useState('');
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isHome = pathname === '/';

  useEffect(() => onFrame(({ y }) => setSolid((v) => (v === y > 40 ? v : y > 40))), []);

  useEffect(() => {
    if (!isHome) {
      setActive(pathname.slice(1));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 }
    );
    nav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [isHome, pathname]);

  // Body scroll is owned by the menu while it is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    if (isHome) scrollToId(id);
    else navigate(`/#${id}`);
  };

  const hidden = isHome && phase === 'loading';

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[opacity,transform] duration-900 ease-cine"
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
      }}
    >
      <div
        className="transition-all duration-600 ease-cine"
        style={{
          background: solid || open ? 'rgba(8,8,11,0.72)' : 'transparent',
          backdropFilter: solid || open ? 'blur(20px) saturate(140%)' : 'none',
          WebkitBackdropFilter: solid || open ? 'blur(20px) saturate(140%)' : 'none',
          borderBottom: `1px solid ${solid && !open ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
        }}
      >
        <div
          className="shell flex items-center justify-between gap-8"
          style={{ height: 'var(--nav-h)' }}
        >
          {/* On the home page this eases back to the top rather than doing a
              route change that would land there instantly. */}
          <Link
            to="/"
            aria-label="HTT Marketing Agency — back to top"
            className="shrink-0"
            onClick={(e) => {
              if (!isHome) return;
              e.preventDefault();
              setOpen(false);
              scrollToTop();
            }}
          >
            <Logo size={46} />
          </Link>

          <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
            {nav.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="group relative py-2 font-display text-[0.66rem] font-600 uppercase tracking-wide2 transition-colors duration-400"
                style={{ color: active === id ? '#F2F3F5' : 'rgba(242,243,245,0.45)' }}
              >
                {label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px bg-cobalt transition-[width] duration-600 ease-cine"
                  style={{ width: active === id ? '100%' : '0%' }}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${site.phoneHref}`}
              className="hidden font-display text-[0.66rem] font-600 uppercase tracking-wide2 text-chalk-muted transition-colors duration-400 hover:text-chalk xl:block"
            >
              {site.phone}
            </a>
            <Link
              to="/contact"
              className="hidden rounded-full border border-white/20 px-6 py-2.5 font-display text-[0.62rem] font-700 uppercase tracking-wide2 text-chalk transition-all duration-400 ease-cine hover:border-cobalt hover:bg-cobalt hover:text-white sm:block"
            >
              Start a project
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              className="relative flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span
                className="block h-px w-6 bg-chalk transition-transform duration-400 ease-cine"
                style={{ transform: open ? 'translateY(3.5px) rotate(45deg)' : 'none' }}
              />
              <span
                className="block h-px w-6 bg-chalk transition-transform duration-400 ease-cine"
                style={{ transform: open ? 'translateY(-3.5px) rotate(-45deg)' : 'none' }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Full-height mobile menu — a sheet, not a cramped dropdown. */}
      <div
        className="fixed inset-0 top-[var(--nav-h)] bg-obsidian-deep/95 backdrop-blur-2xl transition-[opacity,visibility] duration-600 ease-cine lg:hidden"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
        }}
      >
        <nav className="shell flex h-full flex-col justify-center pb-24" aria-label="Mobile">
          {nav.map(({ id, label, index }, i) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="flex items-baseline gap-5 border-b border-white/[0.07] py-5 text-left transition-all duration-600 ease-cine"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(16px)',
                transitionDelay: `${open ? 60 + i * 45 : 0}ms`,
              }}
            >
              <span className="font-display text-[0.6rem] font-600 tracking-wide2 text-cobalt">
                {index}
              </span>
              <span className="font-display text-3xl font-800 tracking-tighter text-chalk">
                {label}
              </span>
            </button>
          ))}

          <div className="mt-10 flex flex-col gap-3">
            <Link to="/contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
              Start a project
            </Link>
            <a href={`tel:${site.phoneHref}`} className="btn btn-ghost w-full">
              {site.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
