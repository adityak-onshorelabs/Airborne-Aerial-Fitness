import Image from "next/image";

/**
 * Full-bleed background parallax. The caller positions this (relative / absolute
 * inset-0); the image sits on an oversized inner layer driven by ScrollSmoother
 * `data-speed`, so it drifts against scroll. The layer is inset well past the
 * frame so drift never exposes an edge.
 *
 * `intensity` (legacy prop, % drift) maps to a data-speed lag. Reduced-motion →
 * ScrollSmoother isn't created, so the attribute is inert and the image is
 * static. For framed content imagery use MediaReveal instead.
 */
export function ParallaxMedia({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  overlay = "cinematic",
  intensity = 12,
  imgClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  overlay?: "none" | "cinematic" | "teal";
  intensity?: number;
  /** Extra classes on the <Image> itself, e.g. zoom/anchor to reframe the crop. */
  imgClassName?: string;
}) {
  // Higher intensity → more lag → lower speed. Clamped so it never inverts.
  const speed = Math.max(0.7, 1 - intensity / 100);

  const overlayClass = {
    none: "",
    cinematic:
      "bg-[linear-gradient(180deg,rgba(4,18,18,0.30)_0%,rgba(4,18,18,0.12)_40%,rgba(4,18,18,0.62)_100%)]",
    teal: "bg-[linear-gradient(160deg,rgba(0,155,157,0.10),rgba(4,26,26,0.55))]",
  }[overlay];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div data-speed={speed} className="absolute inset-x-0 -inset-y-[18%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`}
        />
      </div>
      {overlay !== "none" && (
        <div aria-hidden className={`absolute inset-0 ${overlayClass}`} />
      )}
    </div>
  );
}
