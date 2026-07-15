"use client";

import { useRef } from "react";

/**
 * Direction-aware hover fill. Attach the returned handlers to the button and
 * the ref to an absolutely-positioned fill element (`absolute inset-0`) inside
 * it. On enter the fill grows in from the edge the pointer crossed; on leave it
 * retreats toward the edge the pointer left by.
 *
 * Implemented with animated `clip-path` (not a transform) on purpose: a
 * transformed layer clipped by a rounded `overflow:hidden` parent leaves a
 * ~0.5px seam of the base colour at the curved ends. clip-path animates the
 * element in place with no compositor layer, so there is no seam. `round 999px`
 * keeps the pill shape while clipping.
 */
const FULL = "inset(0 round 999px)";

// Collapsed to the given edge, so the fill grows out FROM that edge.
const EDGE = {
  top: "inset(0 0 100% 0 round 999px)",
  bottom: "inset(100% 0 0 0 round 999px)",
  left: "inset(0 100% 0 0 round 999px)",
  right: "inset(0 0 0 100% round 999px)",
} as const;

export const HIDDEN_CLIP = EDGE.bottom;

function nearestEdge(e: React.MouseEvent, el: HTMLElement): keyof typeof EDGE {
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  const dist = { top: y, bottom: 1 - y, left: x, right: 1 - x };
  return (Object.keys(dist) as (keyof typeof dist)[]).reduce((a, b) =>
    dist[a] < dist[b] ? a : b
  );
}

export function useDirectionalFill() {
  const fillRef = useRef<HTMLSpanElement>(null);

  const onMouseEnter = (e: React.MouseEvent) => {
    const fill = fillRef.current;
    if (!fill) return;
    // Snap collapsed to the entry edge with no transition, then grow to cover.
    fill.style.transition = "none";
    fill.style.clipPath = EDGE[nearestEdge(e, e.currentTarget as HTMLElement)];
    void fill.offsetWidth; // force reflow so the next change animates
    fill.style.transition = "";
    fill.style.clipPath = FULL;
  };

  const onMouseLeave = (e: React.MouseEvent) => {
    const fill = fillRef.current;
    if (!fill) return;
    fill.style.transition = "";
    fill.style.clipPath = EDGE[nearestEdge(e, e.currentTarget as HTMLElement)];
  };

  return { fillRef, onMouseEnter, onMouseLeave };
}
