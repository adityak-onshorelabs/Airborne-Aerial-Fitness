import type { ReactNode } from "react";

// Cta is a client component (direction-aware hover); re-exported here so all the
// existing `import { Cta } from "@/components/ui/primitives"` call sites keep working.
export { Cta } from "./Cta";

export function Eyebrow({
  children,
  tone = "ink",
  className = "",
}: {
  children: ReactNode;
  tone?: "ink" | "light";
  className?: string;
}) {
  const color = tone === "light" ? "text-aqua" : "text-teal";
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[0.72rem] font-medium uppercase tracking-[0.28em] ${color} ${className}`}
    >
      <span
        aria-hidden
        className={`h-px w-7 ${tone === "light" ? "bg-aqua/60" : "bg-teal/60"}`}
      />
      {children}
    </span>
  );
}

/**
 * Small key/label heading. Caslon reads cramped at label sizes, so these use
 * Montserrat uppercase with open tracking and relaxed leading — the fix for the
 * awkward small display headings. Renders as an <h3> for document outline.
 */
export function KeyLabel({
  children,
  tone = "ink",
  className = "",
}: {
  children: ReactNode;
  tone?: "ink" | "light" | "aqua";
  className?: string;
}) {
  const color =
    tone === "aqua" ? "text-aqua" : tone === "light" ? "text-white" : "text-ink";
  return (
    <h3
      className={`font-sans text-[0.82rem] font-semibold uppercase leading-[1.5] tracking-[0.16em] ${color} ${className}`}
    >
      {children}
    </h3>
  );
}

export function Pill({
  children,
  tone = "ink",
}: {
  children: ReactNode;
  tone?: "ink" | "light";
}) {
  return (
    <span
      className={
        tone === "light"
          ? "inline-flex items-center rounded-pill border border-white/20 px-3.5 py-1.5 text-[0.8rem] text-white/85"
          : "inline-flex items-center rounded-pill border border-line px-3.5 py-1.5 text-[0.8rem] text-muted"
      }
    >
      {children}
    </span>
  );
}

export function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-shell px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
