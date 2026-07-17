"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Cta } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import {
  fmtPrice,
  perSession,
  type PlansByCategory,
  type ClassType,
} from "@/lib/zuno-format";

// Preferred display order — signature aerial first, kids last. Any category the
// backend adds that isn't listed here is appended in its original order.
const ORDER = [
  "Aerial Fitness",
  "Aerial Silk & Hoop",
  "Mat Pilates",
  "Functional Training",
  "Dance Fitness",
  "Trampoline Fitness",
  "Yoga",
  "Kids Aerial Fitness",
];

function orderedCategories(keys: string[]): string[] {
  const known = ORDER.filter((c) => keys.includes(c));
  const extra = keys.filter((c) => !ORDER.includes(c));
  return [...known, ...extra];
}

export function MembershipPlans({
  plans,
  images,
  classTypes,
  downloadUrl,
}: {
  plans: PlansByCategory;
  /** category name → discipline image URL. */
  images: Record<string, string>;
  classTypes: ClassType[];
  downloadUrl: string;
}) {
  const categories = useMemo(
    () => orderedCategories(Object.keys(plans)),
    [plans],
  );
  const [active, setActive] = useState(categories[0] ?? "");

  const tiers = plans[active] ?? [];
  const ct = classTypes.find((c) => c.name === active);
  const cheapestPerClass = tiers
    .filter((t) => t.sessions > 1)
    .reduce((min, t) => Math.min(min, perSession(t)), Infinity);

  return (
    <div>
      {/* Category selector */}
      <Reveal>
        <div
          role="tablist"
          aria-label="Membership category"
          className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((c) => {
            const on = c === active;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(c)}
                className={`shrink-0 whitespace-nowrap rounded-pill border px-4 py-2 font-sans text-[0.78rem] font-medium tracking-[0.02em] transition-colors duration-200 ${
                  on
                    ? "border-teal bg-teal text-[#04201f]"
                    : "border-line text-muted hover:border-ink/40 hover:text-ink"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-y-10 lg:grid-cols-12 lg:gap-12">
        {/* Discipline plate + context */}
        <div className="lg:col-span-4">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden ring-1 ring-inset ring-ink/15">
              {images[active] && (
                <Image
                  src={images[active]}
                  alt={active}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover"
                />
              )}
            </div>
            {ct && (
              <div className="mt-4 border-t border-ink/12 pt-4">
                <span className="font-sans text-[0.68rem] uppercase tracking-[0.22em] text-teal">
                  {ct.ageGroup}
                </span>
                {ct.descriptionPoints.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {ct.descriptionPoints.slice(0, 4).map((p) => (
                      <li
                        key={p}
                        className="flex gap-2 text-[0.9rem] leading-snug text-muted"
                      >
                        <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-teal/70" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </Reveal>
        </div>

        {/* Tier cards */}
        <div className="lg:col-span-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {tiers.map((t) => {
              const isTrial = t.sessions <= 1;
              const per = perSession(t);
              const isBestValue =
                t.sessions > 1 && per === cheapestPerClass && tiers.length > 2;
              return (
                <Reveal key={t.id}>
                  <div
                    className={`flex h-full flex-col justify-between border p-5 transition-colors duration-200 ${
                      isBestValue
                        ? "border-teal bg-teal/[0.04]"
                        : "border-ink/12 hover:border-ink/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-xl text-ink">{t.name}</h3>
                        {isBestValue && (
                          <span className="shrink-0 rounded-pill bg-teal px-2.5 py-0.5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#04201f]">
                            Best value
                          </span>
                        )}
                        {isTrial && (
                          <span className="shrink-0 rounded-pill border border-line px-2.5 py-0.5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted">
                            Trial
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex items-end gap-2">
                        <span className="font-display text-3xl leading-none text-ink">
                          {fmtPrice(t.price)}
                        </span>
                        {!isTrial && (
                          <span className="pb-0.5 font-sans text-[0.78rem] text-muted">
                            {fmtPrice(per)}/class
                          </span>
                        )}
                      </div>
                    </div>

                    <dl className="mt-5 grid grid-cols-2 gap-y-2 border-t border-ink/10 pt-4 font-sans text-[0.8rem]">
                      <dt className="text-muted">Sessions</dt>
                      <dd className="text-right tabular-nums text-ink">
                        {t.sessions}
                      </dd>
                      <dt className="text-muted">Validity</dt>
                      <dd className="text-right tabular-nums text-ink">
                        {t.validityDays} days
                      </dd>
                      <dt className="text-muted">GST</dt>
                      <dd className="text-right text-ink">
                        {t.gstInclusive ? "Included" : "+ 18%"}
                      </dd>
                    </dl>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-8 flex flex-col items-start gap-3 border-t border-ink/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-[0.9rem] leading-relaxed text-muted">
                Pick your plan and book sessions in the Airborne app — pricing is
                confirmed at checkout in-app.
              </p>
              <Cta href={downloadUrl} variant="primary">
                Get the App
              </Cta>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
