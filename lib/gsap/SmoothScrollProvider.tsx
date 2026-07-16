"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollSmoother, ScrollTrigger } from "@/lib/gsap/register";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

/**
 * Wraps page content in the ScrollSmoother markup (#smooth-wrapper >
 * #smooth-content) and drives buttery inertial scroll. `effects: true` turns on
 * data-speed / data-lag parallax used by MediaReveal.
 *
 * The floating Header and custom Cursor must render OUTSIDE this wrapper:
 * ScrollSmoother transforms #smooth-content, and position:fixed breaks inside a
 * transformed ancestor.
 *
 * Under prefers-reduced-motion we skip smoother creation entirely and the
 * wrapper divs behave as normal flow (native scroll). React 19 strict-mode
 * double-mount is handled by gsap.context + ctx.revert() cleanup.
 */
const SmootherContext = createContext<ScrollSmoother | null>(null);

export const useSmoother = () => useContext(SmootherContext);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);

  useIsomorphicLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Skip the smoother on mobile/coarse-pointer devices: no inertial hijack,
    // no normalizeScroll, no data-speed parallax — just native scroll. Scroll
    // reveals still fire (ScrollTrigger works on native scroll).
    const isMobile = window.matchMedia(
      "(max-width: 1023px), (pointer: coarse)"
    ).matches;
    if (reduce || isMobile) return;

    const ctx = gsap.context(() => {
      const instance = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
        smoothTouch: 0,
        normalizeScroll: true,
      });
      setSmoother(instance);
    }, wrapperRef);

    // Late-loading images shift layout and stale the pin/scrub measurements.
    // Recompute once everything has painted and on full window load.
    const onLoad = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(onLoad);
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      ctx.revert();
      setSmoother(null);
    };
  }, []);

  return (
    <SmootherContext.Provider value={smoother}>
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content">{children}</div>
      </div>
    </SmootherContext.Provider>
  );
}
