/**
 * The HTT mark. `logo-mark.png` is generated from the supplied `logo.png` by
 * scripts/make-logo.mjs — the original has a grey gradient square behind the
 * disc, which shows as a visible box against the dark ground.
 */
export default function Logo({
  className = '',
  size = 46,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <img
      src="/assets/logo/logo-mark.png"
      alt="HTT Marketing Agency"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`shrink-0 select-none ${className}`}
      draggable={false}
    />
  );
}
