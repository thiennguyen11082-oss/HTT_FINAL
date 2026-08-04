import { Link } from 'react-router-dom';
import { nav, site } from '../content/site';
import { scrollToId } from '../lib/scroll';
import Logo from './Logo';

/**
 * Footer.
 *
 * Four groups: identity, where to reach us, where to go, and the legal tail.
 * Location, email and socials are deliberately kept together as one contact
 * block rather than scattered across columns.
 */
export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-obsidian-deep">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.35fr_1fr_1fr] md:gap-14">
          {/* --------------------------------------------------- identity -- */}
          <div>
            <Logo size={54} className="mb-6" />
            <p className="font-display text-base font-700 tracking-tight text-chalk">
              HTT Marketing Agency
            </p>
            <p className="mt-3 max-w-[32ch] text-[0.85rem] leading-relaxed text-chalk-faint">
              Premium websites, lead-generation systems and local visibility for ambitious
              businesses.
            </p>
          </div>

          {/* ---------------------------------------------------- contact -- */}
          <div>
            <h3 className="mb-5 font-display text-[0.55rem] font-700 uppercase tracking-wide3 text-chalk-ghost">
              Get in touch
            </h3>
            <address className="not-italic">
              <p className="text-[0.85rem] text-chalk-faint">Phoenix, AZ</p>

              <a
                href={`tel:${site.phoneHref}`}
                className="mt-3 block font-display text-lg font-700 tracking-tight text-chalk transition-colors duration-400 hover:text-cobalt-light"
              >
                {site.phone}
              </a>

              <a
                href={`mailto:${site.email}`}
                className="mt-2 block break-all text-[0.85rem] text-chalk-soft transition-colors duration-400 hover:text-cobalt-light"
              >
                {site.email}
              </a>
            </address>

            <ul className="mt-5 space-y-2">
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.82rem] text-chalk-faint transition-colors duration-400 hover:text-chalk"
                >
                  Instagram: @httmarketingagency
                </a>
              </li>
              <li>
                <a
                  href={site.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.82rem] text-chalk-faint transition-colors duration-400 hover:text-chalk"
                >
                  TikTok: @httmarketingagency
                </a>
              </li>
            </ul>
          </div>

          {/* ------------------------------------------------- navigation -- */}
          <div>
            <h3 className="mb-5 font-display text-[0.55rem] font-700 uppercase tracking-wide3 text-chalk-ghost">
              Navigate
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
              {nav.map(({ id, label }) => (
                <li key={id}>
                  <Link
                    to={`/${id}`}
                    className="text-[0.82rem] text-chalk-faint transition-colors duration-400 hover:text-chalk"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => scrollToId('introduction')}
                  className="text-left text-[0.82rem] text-chalk-faint transition-colors duration-400 hover:text-chalk"
                >
                  About
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* ------------------------------------------------------- legal -- */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.07] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.7rem] text-chalk-ghost">
            © {new Date().getFullYear()} HTT Marketing Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="font-display text-[0.58rem] font-600 uppercase tracking-wide2 text-chalk-ghost transition-colors duration-400 hover:text-chalk"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="font-display text-[0.58rem] font-600 uppercase tracking-wide2 text-chalk-ghost transition-colors duration-400 hover:text-chalk"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
