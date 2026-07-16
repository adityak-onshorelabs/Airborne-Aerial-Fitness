"use client";

import { useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap/register";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

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
  imgClassName = "",
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
  /** Extra classes on the <img>, e.g. object-position for focal control. */
  imgClassName?: string;
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
  const revealRef = useRef<HTMLDivElement>(null);

  // GSAP-driven clip-wipe. Framer's whileInView (IntersectionObserver) is
  // unreliable under ScrollSmoother's normalized scroll and can leave the media
  // stuck fully clipped (invisible). ScrollTrigger shares the smoother's scroll
  // system, so it fires dependably. We only *hide* it once JS is running, so if
  // anything fails the image stays visible rather than blank.
  useIsomorphicLayoutEffect(() => {
    const el = revealRef.current;
    if (!el || reduce) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)", scale: 1.08 },
        {
          clipPath: "inset(0 0 0% 0)",
          scale: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    });
    return () => mm.revert();
  }, [reduce]);

  const overlayClass = {
    none: "",
    soft: "bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(6,20,20,0.09))]",
    cinematic:
      "bg-[linear-gradient(180deg,rgba(4,18,18,0.10)_0%,rgba(4,18,18,0.04)_45%,rgba(4,18,18,0.48)_100%)]",
    teal: "bg-[linear-gradient(160deg,rgba(0,155,157,0.04),rgba(4,32,31,0.30))]",
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
      } ${imgClassName}`}
    />
  );

  return (
    <div
      className={`group/media relative overflow-hidden ${rounded} bg-veil ring-1 ring-inset ring-black/[0.06] ${className}`}
    >
      {reduce ? (
        <div className="absolute inset-0">{img}</div>
      ) : (
        <div ref={revealRef} className="absolute inset-0">
          {/* Oversized so ScrollSmoother drift never reveals the frame edge. */}
          <div data-speed={speed} className="absolute inset-x-0 -inset-y-[20%]">
            {img}
          </div>
        </div>
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
