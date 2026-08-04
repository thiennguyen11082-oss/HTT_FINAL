/**
 * Browser chrome around a project preview.
 *
 * Built in CSS rather than as an image so the screenshot inside stays sharp at
 * any size and the frame can carry hover state. Deliberately understated: a
 * hairline, three dots and a URL — enough to read as a browser without
 * competing with the work inside it.
 */
export default function BrowserFrame({
  src,
  alt,
  url,
  className = '',
  aspect = '16/10',
}: {
  src: string;
  alt: string;
  url: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[12px] border border-white/[0.09] bg-obsidian-raised shadow-drop ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-white/[0.07] bg-white/[0.02] px-4 py-2.5">
        <span className="flex gap-[6px]">
          <span className="h-[7px] w-[7px] rounded-full bg-white/18" />
          <span className="h-[7px] w-[7px] rounded-full bg-white/18" />
          <span className="h-[7px] w-[7px] rounded-full bg-white/18" />
        </span>
        <span className="mx-auto max-w-[60%] truncate rounded-full bg-white/[0.05] px-3.5 py-1 font-sans text-[0.62rem] text-chalk-faint">
          {url}
        </span>
      </div>

      <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-1200 ease-cine group-hover:scale-[1.035]"
        />
        {/* Screen sheen — a soft diagonal so the preview reads as glass. */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              'linear-gradient(118deg, rgba(255,255,255,0.07) 0%, transparent 38%, transparent 70%, rgba(255,255,255,0.03) 100%)',
          }}
        />
      </div>
    </div>
  );
}
