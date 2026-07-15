"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollSmoother, ScrollTrigger } from "@/lib/gsap/register";

/**
 * ScrollSmoother holds its scroll position on the transformed #smooth-content,
 * so a client-side route change keeps the previous page's offset (you'd land at
 * the footer after scrolling down elsewhere). Reset the smoother — or native
 * scroll under reduced-motion — to the top on every pathname change, then
 * refresh triggers for the new content height.
 */
export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(0, false); // instant, no smooth
    } else {
      window.scrollTo(0, 0);
    }
    // New page = new content height; recompute pins/triggers after paint.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
