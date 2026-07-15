"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrow, IconArrowUpRight } from "./icons";
import { useDirectionalFill, HIDDEN_CLIP } from "@/hooks/useDirectionalFill";

type CtaProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "ghost-light";
  external?: boolean;
  className?: string;
  withArrow?: boolean;
};

const VARIANTS = {
  primary: {
    base: "bg-teal text-[#04201f] border border-aqua",
    fill: "bg-deep-teal-2",
    hoverText: "group-hover:text-white",
    shadow: "",
  },
  ghost: {
    base: "bg-transparent text-ink ring-1 ring-inset ring-line",
    fill: "bg-ink",
    hoverText: "group-hover:text-canvas",
    shadow: "hover:ring-ink/50",
  },
  "ghost-light": {
    base: "bg-transparent text-white ring-1 ring-inset ring-white/30",
    fill: "bg-white",
    hoverText: "group-hover:text-[#04201f]",
    shadow: "hover:ring-white/70",
  },
} as const;

/**
 * Bespoke CTA with a direction-aware fill: on enter the fill slides in from the
 * edge the pointer crossed; on leave it slides back out toward the edge the
 * pointer left by. Label + arrow invert colour, and the arrow loops (one exits
 * right, a fresh one enters from the left). Transform/clip only.
 */
export function Cta({
  href,
  children,
  variant = "primary",
  external,
  className = "",
  withArrow = true,
}: CtaProps) {
  const v = VARIANTS[variant];
  const { fillRef, onMouseEnter, onMouseLeave } = useDirectionalFill();
  const Arrow = variant === "primary" ? IconArrow : IconArrowUpRight;

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group relative inline-flex min-h-[3rem] items-center justify-center gap-2 overflow-hidden rounded-pill px-6 py-3 text-[0.94rem] font-medium transition-[box-shadow] duration-300 ease-out-quint active:scale-[0.98] ${v.base} ${v.shadow} ${className}`}
    >
      <span
        ref={fillRef}
        aria-hidden
        style={{ clipPath: HIDDEN_CLIP }}
        className={`absolute inset-0 transition-[clip-path] duration-[460ms] ease-out-quint ${v.fill}`}
      />
      <span
        className={`relative z-10 transition-colors duration-300 ease-out-quint ${v.hoverText}`}
      >
        {children}
      </span>
      {withArrow && (
        <span
          className={`relative z-10 block h-[1.05rem] w-[1.05rem] overflow-hidden transition-colors duration-300 ease-out-quint ${v.hoverText}`}
        >
          <Arrow className="absolute inset-0 h-[1.05rem] w-[1.05rem] transition-transform duration-[420ms] ease-out-quint group-hover:translate-x-[160%]" />
          <Arrow className="absolute inset-0 h-[1.05rem] w-[1.05rem] -translate-x-[160%] transition-transform duration-[420ms] ease-out-quint group-hover:translate-x-0" />
        </span>
      )}
    </Link>
  );
}
