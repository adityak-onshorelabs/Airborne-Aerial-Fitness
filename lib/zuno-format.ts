/**
 * Pure types + view helpers for the Zuno booking data. No fetching, no snapshot
 * import — safe to pull into client components without bundling the data layer.
 */

export type Plan = {
  id: string;
  name: string;
  sessions: number;
  price: number;
  validityDays: number;
  gstInclusive: boolean;
};
export type PlansByCategory = Record<string, Plan[]>;

export type Slot = {
  id: string;
  classTypeId: string;
  category: string;
  classId: string;
  branch: string;
  /** 0 = Sunday … 6 = Saturday (JS getDay convention). */
  dayOfWeek: number;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  capacity: number;
  genderRestriction: string;
  isActive: boolean;
};

export type ClassType = {
  id: string;
  name: string;
  ageGroup: string;
  strengthLevel: number;
  descriptionPoints: string[];
  isActive: boolean;
};

export const DAY_LABELS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;
export const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

// Monday-first week ordering for display (Mon…Sun) mapped to JS day numbers.
export const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0] as const;

/** "7:00" / "18:30" → "7:00 AM" / "6:30 PM". */
export function fmtTime(hour: number, minute: number): string {
  const period = hour < 12 ? "AM" : "PM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const mm = minute.toString().padStart(2, "0");
  return `${h12}:${mm} ${period}`;
}

/** "₹5,600" — Indian-grouped rupee amount, no decimals. */
export function fmtPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/** Per-session price, rounded — a "from ₹X / class" signal. */
export function perSession(plan: Plan): number {
  return Math.round(plan.price / Math.max(1, plan.sessions));
}
