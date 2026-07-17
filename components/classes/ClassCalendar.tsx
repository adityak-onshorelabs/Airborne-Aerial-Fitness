"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import {
  DAY_SHORT,
  DAY_LABELS,
  WEEK_ORDER,
  fmtTime,
  type Slot,
} from "@/lib/zuno-format";

// Muted, distinguishable hue per discipline. Anchored to the brand teal, with a
// few warmer accents so eight categories stay legible in one grid.
const CATEGORY_COLOR: Record<string, string> = {
  "Aerial Fitness": "#04C0C1",
  "Aerial Silk & Hoop": "#009B9D",
  "Mat Pilates": "#6C8CA0",
  "Functional Training": "#C77D4A",
  "Dance Fitness": "#B0567E",
  "Trampoline Fitness": "#7A9E3B",
  Yoga: "#5B8C7A",
  "Kids Aerial Fitness": "#E0A93B",
};
const FALLBACK_COLOR = "#04C0C1";
const colorFor = (c: string) => CATEGORY_COLOR[c] ?? FALLBACK_COLOR;

const ALL = "All classes";

export function ClassCalendar({ slots }: { slots: Slot[] }) {
  const branches = useMemo(
    () => Array.from(new Set(slots.map((s) => s.branch))).sort(),
    [slots],
  );
  const categories = useMemo(
    () => Array.from(new Set(slots.map((s) => s.category))).sort(),
    [slots],
  );

  const [branch, setBranch] = useState(branches[0] ?? "");
  const [category, setCategory] = useState<string>(ALL);

  const visible = useMemo(
    () =>
      slots
        .filter((s) => s.branch === branch)
        .filter((s) => category === ALL || s.category === category)
        .sort(
          (a, b) =>
            a.startHour - b.startHour || a.startMinute - b.startMinute,
        ),
    [slots, branch, category],
  );

  // Group by JS day number for the week columns.
  const byDay = useMemo(() => {
    const map = new Map<number, Slot[]>();
    for (const d of WEEK_ORDER) map.set(d, []);
    for (const s of visible) map.get(s.dayOfWeek)?.push(s);
    return map;
  }, [visible]);

  return (
    <div>
      {/* Filters */}
      <Reveal>
        <div className="flex flex-col gap-5 border-b border-ink/12 pb-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Branch — segmented */}
          <div className="inline-flex items-center gap-1 rounded-pill border border-line p-1">
            {branches.map((b) => {
              const on = b === branch;
              return (
                <button
                  key={b}
                  onClick={() => setBranch(b)}
                  aria-pressed={on}
                  className={`rounded-pill px-4 py-1.5 font-sans text-[0.78rem] font-medium transition-colors duration-200 ${
                    on ? "bg-ink text-canvas" : "text-muted hover:text-ink"
                  }`}
                >
                  {b}
                </button>
              );
            })}
          </div>

          {/* Category chips */}
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:justify-end lg:px-0 [&::-webkit-scrollbar]:hidden">
            {[ALL, ...categories].map((c) => {
              const on = c === category;
              const dot = c === ALL ? null : colorFor(c);
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  aria-pressed={on}
                  className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-pill border px-3 py-1.5 font-sans text-[0.74rem] font-medium transition-colors duration-200 ${
                    on
                      ? "border-ink bg-ink text-canvas"
                      : "border-line text-muted hover:border-ink/40 hover:text-ink"
                  }`}
                >
                  {dot && (
                    <span
                      aria-hidden
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: dot }}
                    />
                  )}
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Week grid — 7 columns on desktop, stacked day rows on mobile */}
      <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-media border border-ink/12 bg-ink/12 md:grid-cols-7">
        {WEEK_ORDER.map((day) => {
          const daySlots = byDay.get(day) ?? [];
          // Empty days keep the 7-col alignment on desktop but are hidden on
          // mobile, where they'd otherwise stack into a wall of "No classes".
          const empty = daySlots.length === 0;
          return (
            <div
              key={day}
              className={`${empty ? "hidden md:flex" : "flex"} min-h-[7rem] flex-col bg-canvas`}
            >
              <div className="flex items-baseline justify-between gap-2 border-b border-ink/10 bg-canvas/95 px-3 py-2.5 backdrop-blur md:sticky md:top-0">
                <span className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink">
                  <span className="md:hidden">{DAY_LABELS[day]}</span>
                  <span className="hidden md:inline">{DAY_SHORT[day]}</span>
                </span>
                <span className="font-sans text-[0.68rem] tabular-nums text-muted">
                  {daySlots.length || "—"}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-1.5 p-2">
                {daySlots.length === 0 ? (
                  <span className="px-1 py-2 font-sans text-[0.72rem] text-ink/30">
                    No classes
                  </span>
                ) : (
                  daySlots.map((s) => {
                    const color = colorFor(s.category);
                    return (
                      <div
                        key={s.id}
                        className="group border-l-2 bg-surface px-2.5 py-2 transition-colors duration-200 hover:bg-ink/[0.03]"
                        style={{ borderColor: color }}
                      >
                        <div className="font-sans text-[0.74rem] font-semibold tabular-nums text-ink">
                          {fmtTime(s.startHour, s.startMinute)}
                          <span className="font-normal text-muted">
                            {" – "}
                            {fmtTime(s.endHour, s.endMinute)}
                          </span>
                        </div>
                        <div className="mt-0.5 font-sans text-[0.76rem] leading-snug text-muted">
                          {s.category}
                        </div>
                        {s.genderRestriction &&
                          s.genderRestriction !== "NONE" && (
                            <div className="mt-0.5 font-sans text-[0.62rem] uppercase tracking-[0.12em] text-ink/40">
                              {s.genderRestriction.toLowerCase()} only
                            </div>
                          )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 font-sans text-[0.8rem] leading-relaxed text-muted">
        Times shown for {branch}. Capacity is limited — reserve your spot in the
        Airborne app.
      </p>
    </div>
  );
}
