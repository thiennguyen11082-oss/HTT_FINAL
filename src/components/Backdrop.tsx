/**
 * Cinematic ground.
 *
 * A Higgsfield-rendered light plate does the heavy lifting — a real volumetric
 * shaft with haze and floor bounce, which CSS gradients cannot fake. Everything
 * layered on top is subtractive: vignette, a single cobalt bloom, grain.
 * Deliberately no floating shapes.
 */
export default function Backdrop({
  plate = true,
  className = '',
}: {
  /** Include the rendered light plate. Off for lower sections. */
  plate?: boolean;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0 bg-obsidian" />

      {plate && (
        <img
          src="/assets/scene/plate.webp"
          alt=""
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.85]"
        />
      )}

      {/* Single controlled cobalt bloom. */}
      <div
        className="absolute right-[-10%] top-[-15%] h-[70vh] w-[70vh] rounded-full blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(47,94,240,0.20) 0%, transparent 68%)',
        }}
      />

      {/* Vignette, so the frame closes and the centre carries the eye. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 90% at 50% 42%, transparent 30%, rgba(5,5,7,0.75) 100%)',
        }}
      />

      {/* Grain — stops the deep blacks banding on wide panels. */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
