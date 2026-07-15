/**
 * Airborne wordmark. Two rasterized lockups that crossfade by surface tone.
 * Asset names denote the surface they sit ON:
 * - logo-dark  = white lockup, for DARK surfaces (hero, floating pill nav)
 * - logo-light = ink lockup,   for LIGHT surfaces (footer, light sections)
 * Both stacked so a swap is a fade, not a flash/reflow.
 * Height is driven by the wrapper className (default h-8); images fill it.
 */
const FOR_DARK =
  "https://ik.imagekit.io/adityakamarouthu/Onshorelabs/Airborne/logo-dark-lsrHlw6R.png";
const FOR_LIGHT =
  "https://ik.imagekit.io/adityakamarouthu/Onshorelabs/Airborne/logo-light-Cmojzlvg.png";

export function Logo({
  className = "h-8",
  tone = "dark",
}: {
  /** Sets the logo height, e.g. "h-9". */
  className?: string;
  /** Surface the logo sits on. "dark" surface → light lockup, "light" → dark lockup. */
  tone?: "dark" | "light";
}) {
  return (
    <span className={`relative inline-flex items-center ${className}`}>
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src={FOR_DARK}
        alt="Airborne Aerial Fitness"
        className={`h-full w-auto transition-opacity duration-500 ease-out-quint ${
          tone === "dark" ? "opacity-100" : "opacity-0"
        }`}
      />
      <img
        src={FOR_LIGHT}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-auto transition-opacity duration-500 ease-out-quint ${
          tone === "dark" ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* eslint-enable @next/next/no-img-element */}
    </span>
  );
}
