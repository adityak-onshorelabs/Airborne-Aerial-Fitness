"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode, ElementType } from "react";
import { reveal, stagger, revealChild, viewportOnce } from "@/lib/motion";

/**
 * Scroll reveal wrapper. Honors prefers-reduced-motion globally:
 * when reduced, children render immediately with no transform.
 */
export function Reveal({
  children,
  className = "",
  as = "div",
  variants = reveal,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  variants?: Variants;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const M = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <M
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </M>
  );
}

export function RevealGroup({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const reduce = useReducedMotion();
  const M = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <M
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </M>
  );
}

export function RevealItem({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const reduce = useReducedMotion();
  const M = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <M className={className} variants={revealChild}>
      {children}
    </M>
  );
}
