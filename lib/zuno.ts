/**
 * Server-side proxy for the Airborne booking backend (Zuno).
 *
 * The /classes page shows membership pricing and the weekly timetable, but the
 * marketing site never books or takes payment — every CTA routes to the app.
 * These loaders run ONLY on the server (React Server Components); the browser
 * never talks to Zuno directly. Responses are cached via Next's fetch cache
 * (`revalidate`), so Zuno is hit at most once per window regardless of traffic.
 * On any failure we fall back to a frozen snapshot so the page never empties.
 *
 * Pure types + formatting helpers live in ./zuno-format (client-safe).
 */
import {
  FALLBACK_PLANS,
  FALLBACK_SCHEDULE,
  FALLBACK_CLASS_TYPES,
} from "./zuno-fallback";
import type { PlansByCategory, Slot, ClassType } from "./zuno-format";

export type { Plan, PlansByCategory, Slot, ClassType } from "./zuno-format";

const ZUNO_BASE = "https://airborne.zuno.club/api";
// Re-pull at most hourly. Bump higher (e.g. 86400) if the data rarely changes.
const REVALIDATE_SECONDS = 3600;

async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${ZUNO_BASE}/${path}`, {
      headers: { accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) throw new Error(`Zuno ${path} → ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[zuno] ${path} fetch failed, using snapshot:`, err);
    return fallback;
  }
}

export function getPlans(): Promise<PlansByCategory> {
  return fetchJson<PlansByCategory>("plans", FALLBACK_PLANS);
}

export async function getSchedule(): Promise<Slot[]> {
  const slots = await fetchJson<Slot[]>("schedule", FALLBACK_SCHEDULE);
  return slots.filter((s) => s.isActive);
}

export async function getClassTypes(): Promise<ClassType[]> {
  const types = await fetchJson<ClassType[]>("class-types", FALLBACK_CLASS_TYPES);
  return types.filter((t) => t.isActive);
}
