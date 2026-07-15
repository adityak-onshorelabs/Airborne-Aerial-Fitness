import type { SVGProps, ReactElement } from "react";

/* Thin, consistent 1.5px line icons. currentColor. */
type P = SVGProps<SVGSVGElement>;
const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconArrow = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const IconArrowUpRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const IconPin = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
export const IconPlus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const IconMinus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
);
export const IconInstagram = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);
export const IconSnowflake = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5 4.2 16.5" />
    <path d="M12 6.5 10 4.5M12 6.5 14 4.5M12 17.5 10 19.5M12 17.5 14 19.5" />
  </svg>
);
export const IconShower = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 20V8a4 4 0 0 1 8 0M12 8h8" />
    <path d="M16 12v.01M18.5 12v.01M14 14v.01M16.5 15v.01M19 14.5v.01M15 17v.01M18 17.5v.01" />
  </svg>
);
export const IconHanger = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 8a2 2 0 1 1 2-2M12 8v2M4 18l8-6 8 6a1.5 1.5 0 0 1-1 2.6H5A1.5 1.5 0 0 1 4 18Z" />
  </svg>
);
export const IconDroplet = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3.5c3 3.6 5.5 6.4 5.5 9.5a5.5 5.5 0 0 1-11 0c0-3.1 2.5-5.9 5.5-9.5Z" />
  </svg>
);
export const IconStack = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 8h16M4 12h16M4 16h16" />
  </svg>
);
export const IconWifi = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 9a15 15 0 0 1 18 0M6 12.5a10 10 0 0 1 12 0M9 16a5 5 0 0 1 6 0" />
    <path d="M12 19.5v.01" />
  </svg>
);
export const IconShield = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
export const IconSparkle = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3c.6 4.5 1.5 5.4 6 6-4.5.6-5.4 1.5-6 6-.6-4.5-1.5-5.4-6-6 4.5-.6 5.4-1.5 6-6Z" />
  </svg>
);
export const IconUsers = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 6.5a3 3 0 0 1 0 6M17.5 19a5 5 0 0 0-2.5-4.3" />
  </svg>
);
export const IconFeather = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20 4c-5 0-11 3-13 10l-3 6 6-3c7-2 10-8 10-13ZM7 17 17 7M9 13h5M11 11h4" />
  </svg>
);
export const IconStar = (p: P) => (
  <svg {...base} {...p}>
    <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />
  </svg>
);
export const IconMap = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4Z" />
    <path d="M9 4v14M15 6v14" />
  </svg>
);

/* Format icons — thin line marks for each studio discipline. */
export const IconSilk = (p: P) => (
  <svg {...base} {...p}>
    <path d="M8 3c-1.6 5 .4 9 0 12M16 3c1.6 5-.4 9 0 12" />
    <circle cx="12" cy="18" r="3" />
  </svg>
);
export const IconPilates = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 15c5-7 13-7 18 0" />
    <circle cx="7" cy="9.6" r="1.4" />
  </svg>
);
export const IconKettlebell = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9.3 9a2.7 2.7 0 1 1 5.4 0" />
    <path d="M7.6 9.5a5 5 0 1 0 8.8 0Z" />
  </svg>
);
export const IconNote = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9 18V6l9-2v10" />
    <circle cx="6.8" cy="18" r="2.2" />
    <circle cx="15.8" cy="16" r="2.2" />
  </svg>
);
export const IconTrampoline = (p: P) => (
  <svg {...base} {...p}>
    <ellipse cx="12" cy="15" rx="8" ry="2.5" />
    <path d="M6 16.6 4 20M18 16.6 20 20" />
    <path d="M12 4c-3 3-3 6 0 8" strokeDasharray="2 2.4" />
  </svg>
);
export const IconYoga = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="6" r="2" />
    <path d="M12 9v4M6 20c1-4 4-6 6-6s5 2 6 6M6 20h12" />
  </svg>
);
export const IconKite = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3 18 9l-6 6-6-6 6-6Z" />
    <path d="M12 15v2.5M12 17.5l1.6 1.6M12 17.5l-1.6 1.6" />
  </svg>
);

export const formatIcon: Record<string, (p: P) => ReactElement> = {
  "Aerial Silk & Hoop": IconSilk,
  "Mat Pilates": IconPilates,
  "Functional Training": IconKettlebell,
  "Dance Fitness": IconNote,
  "Trampoline Fitness": IconTrampoline,
  Yoga: IconYoga,
  "Kids Aerial Fitness": IconKite,
};

export const facilityIcon: Record<string, (p: P) => ReactElement> = {
  "Air conditioning": IconSnowflake,
  Shower: IconShower,
  "Changing room": IconHanger,
  Washroom: IconDroplet,
  "Shoe racks": IconStack,
  "Wi-Fi": IconWifi,
  "CCTV secured": IconShield,
  "Clean, safe environment": IconSparkle,
};
