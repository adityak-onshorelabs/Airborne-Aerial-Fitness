"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePointerFine } from "@/hooks/usePointerFine";

/**
 * Bespoke cursor: a small precise dot plus a lagging ring that expands over
 * interactive targets (links, buttons, [data-cursor], media). mix-blend
 * difference keeps it legible on both light and dark sections. Desktop +
 * no-reduced-motion only; renders nothing otherwise and leaves the native
 * cursor untouched.
 */
export function Cursor() {
  const active = usePointerFine();
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (!active) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as Element | null;
      setHovering(
        !!el?.closest(
          "a, button, [data-cursor], input, textarea, [role='button']"
        )
      );
    };

    document.documentElement.classList.add("cursor-none");
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", move);
    };
  }, [active, x, y]);

  if (!active) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200] mix-blend-difference">
      {/* precise dot, tracks 1:1 */}
      <motion.div
        style={{ x, y }}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-white"
      />
      {/* lagging ring, expands on interactive targets */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.9 : 1, opacity: hovering ? 0.9 : 0.5 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-white"
      />
    </div>
  );
}
