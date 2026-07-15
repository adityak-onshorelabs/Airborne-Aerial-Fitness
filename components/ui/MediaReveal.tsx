"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { clipReveal, viewportOnce } from "@/lib/motion";

/**
 * The default image treatment for the site. Two layered motions that don't
 * fight because they live on different elements:
 *
 *  - GSAP ScrollSmoother parallax via `data-speed` on an oversized inner layer,
 *    so the image drifts against scroll ("flows in and out"). Speed < 1 lags,
 *    > 1 leads. The layer is inset past the frame edges so drift never exposes a
 *    gap.
 *  - framer clip-wipe + settle scale on enter (clipReveal), so the image reveals
 *    rather than hard-cuts in.
 *
 * Reduced-motion → fully static (no data-speed, no clip), matching MediaFrame.
 * Keeps MediaFrame's overlay vocabulary + rounded/ring shell.
 */
export function MediaReveal({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  rounded = "rounded-media",
  overlay = "soft",
  speed = 0.92,
  zoom = true,
}: {
  src: string;
  alt: string;
  /** Frame sizing (aspect ratio / min-height). This element clips the drift. */
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: string;
  overlay?: "none" | "soft" | "cinematic" | "teal";
  /** ScrollSmoother data-speed. 1 = locked to scroll, <1 lags, >1 leads. */
  speed?: number;
  /** CSS hover zoom on the frame. */
  zoom?: boolean;
}) {
  const reduce = useReducedMotion();

  const overlayClass = {
    none: "",
    soft: "bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(6,20,20,0.14))]",
    cinematic:
      "bg-[linear-gradient(180deg,rgba(4,18,18,0.15)_0%,rgba(4,18,18,0.05)_45%,rgba(4,18,18,0.55)_100%)]",
    teal: "bg-[linear-gradient(160deg,rgba(0,155,157,0.05),rgba(4,32,31,0.42))]",
  }[overlay];

  const img = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${
        zoom
          ? "transition-transform duration-[1200ms] ease-out-quint group-hover/media:scale-[1.05]"
          : ""
      }`}
    />
  );

  return (
    <div
      className={`group/media relative overflow-hidden ${rounded} bg-veil ring-1 ring-inset ring-black/[0.06] ${className}`}
    >
      {reduce ? (
        <div className="absolute inset-0">{img}</div>
      ) : (
        <motion.div
          className="absolute inset-0"
          variants={clipReveal}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {/* Oversized so ScrollSmoother drift never reveals the frame edge. */}
          <div data-speed={speed} className="absolute inset-x-0 -inset-y-[20%]">
            {img}
          </div>
        </motion.div>
      )}

      {overlay !== "none" && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 ${overlayClass}`}
        />
      )}
    </div>
  );
}
