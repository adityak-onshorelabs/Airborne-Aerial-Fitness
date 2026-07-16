import Image from "next/image";

/**
 * Rounded media container with a consistent, subtle image treatment:
 * fine border, gentle top-light/bottom-shade overlay, optional hover zoom.
 * All imagery flows through here so treatment stays consistent (brief §10).
 */
export function MediaFrame({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes = "100vw",
  priority = false,
  rounded = "rounded-media",
  overlay = "soft",
  zoom = true,
  fill = true,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: string;
  overlay?: "none" | "soft" | "cinematic" | "teal";
  zoom?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}) {
  const overlayClass = {
    none: "",
    soft: "bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(6,20,20,0.09))]",
    cinematic:
      "bg-[linear-gradient(180deg,rgba(4,18,18,0.10)_0%,rgba(4,18,18,0.04)_45%,rgba(4,18,18,0.48)_100%)]",
    teal: "bg-[linear-gradient(160deg,rgba(0,155,157,0.04),rgba(4,32,31,0.30))]",
  }[overlay];

  return (
    <div
      className={`group/media relative overflow-hidden ${rounded} bg-veil ring-1 ring-inset ring-black/[0.06] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        {...(fill
          ? { fill: true }
          : { width: width ?? 1200, height: height ?? 1500 })}
        sizes={sizes}
        priority={priority}
        className={`${fill ? "object-cover" : "h-auto w-full"} ${
          zoom
            ? "transition-transform duration-[1200ms] ease-out-quint group-hover/media:scale-[1.04]"
            : ""
        } ${imgClassName}`}
      />
      {overlay !== "none" && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 ${overlayClass}`}
        />
      )}
    </div>
  );
}
