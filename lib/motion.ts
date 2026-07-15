import type { Variants } from "framer-motion";

// Ease-out curves only. No bounce, no elastic (brief §11).
export const easeQuint: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Section reveal: fade + gentle rise. Transform/opacity only.
export const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeQuint },
  },
};

// Staggered container for grouped children.
export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const revealChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeQuint },
  },
};

// Word/line entrance for display headlines.
export const riseIn: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: "0em",
    transition: { duration: 0.85, ease: easeExpo, delay: 0.08 * i },
  }),
};

// Media entrance: a vertical clip-wipe + settle-in scale. Used by MediaReveal so
// images "flow in" instead of a plain fade. clip-path + transform only.
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", scale: 1.08 },
  show: {
    clipPath: "inset(0 0 0% 0)",
    scale: 1,
    transition: { duration: 1.1, ease: easeExpo },
  },
};

// Directional slides. Pass custom = -1 (from left / top) or 1 (from right /
// bottom) via the `custom` prop.
export const slideInX: Variants = {
  hidden: (dir: number = 1) => ({ opacity: 0, x: 44 * dir }),
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: easeQuint },
  },
};

export const slideInY: Variants = {
  hidden: (dir: number = 1) => ({ opacity: 0, y: 44 * dir }),
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeQuint },
  },
};

// Per-word / per-line headline choreography. Wrap each word in a wordChild
// inside a wordStagger container.
export const wordStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
};

export const wordChild: Variants = {
  hidden: { opacity: 0, y: "0.75em" },
  show: {
    opacity: 1,
    y: "0em",
    transition: { duration: 0.7, ease: easeExpo },
  },
};

export const viewportOnce = { once: true, amount: 0.28 } as const;
