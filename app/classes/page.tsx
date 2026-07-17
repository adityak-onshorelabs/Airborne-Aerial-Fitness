import type { Metadata } from "next";
import {
  EditorialHero,
  EditorialSection,
  IndexKicker,
  Plate,
} from "@/components/editorial/kit";
import { FinalCta } from "@/components/sections/FinalCta";
import { MembershipPlans } from "@/components/classes/MembershipPlans";
import { CurrentOffers } from "@/components/classes/CurrentOffers";
import { ClassCalendar } from "@/components/classes/ClassCalendar";
import { KeyLabel } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { formats, classesFlow, IMG } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { getPlans, getSchedule, getClassTypes } from "@/lib/zuno";

// Discipline imagery for each membership category (names match the Zuno API).
const CATEGORY_IMG: Record<string, string> = {
  "Aerial Fitness": IMG.brand,
  "Aerial Silk & Hoop": IMG.formats.silkHoop,
  "Mat Pilates": IMG.formats.pilates,
  "Functional Training": IMG.formats.functional,
  "Dance Fitness": IMG.formats.dance,
  "Trampoline Fitness": IMG.formats.trampoline,
  Yoga: IMG.formats.yoga,
  "Kids Aerial Fitness": IMG.formats.kidsAerial,
};

export const metadata: Metadata = {
  title: "Classes — Pilates, Functional, Dance, Yoga & Aerial",
  description:
    "The complete Airborne studio: aerial silk and hoop, mat Pilates, functional training, dance fitness, trampoline, and yoga — every format held to the same premium standard.",
  alternates: { canonical: "/classes" },
};

export default async function ClassesPage() {
  const [plans, schedule, classTypes] = await Promise.all([
    getPlans(),
    getSchedule(),
    getClassTypes(),
  ]);

  return (
    <>
      <EditorialHero
        index="02"
        kicker="The Complete Studio"
        title={
          <>
            More Ways
            <br />
            to Move
          </>
        }
        lede={formats.body}
        image={IMG.formats.dance}
        imageAlt="A high-energy dance fitness class at Airborne"
        caption="Dance Fitness · Airborne"
      />

      {/* Membership plans — pricing per discipline, booking routes to the app */}
      <EditorialSection
        index="03"
        label="Membership"
        title="Plans for every rhythm"
        lede="Drop in for a trial or commit to a season. Sessions are booked and paid in the Airborne app."
        tone="surface"
      >
        <MembershipPlans
          plans={plans}
          images={CATEGORY_IMG}
          classTypes={classTypes}
          downloadUrl={siteConfig.app.downloadUrl}
        />
      </EditorialSection>

      {/* Current offers — mirrors the app's active promotions, redeem in-app */}
      <EditorialSection
        index="04"
        label="Current Offers"
        title="Ways to save"
        lede="Live membership offers, applied automatically when you check out in the app."
      >
        <CurrentOffers downloadUrl={siteConfig.app.downloadUrl} />
      </EditorialSection>

      {/* Weekly schedule — full-width calendar (custom, wider than the split grid) */}
      <section className="bg-canvas">
        <div className="mx-auto w-full max-w-shell px-5 sm:px-8 lg:px-12">
          <div className="border-t border-ink/12 py-16 sm:py-20 lg:py-24">
            <Reveal>
              <IndexKicker index="05">Weekly Schedule</IndexKicker>
              <h2 className="headline mt-6 max-w-[22ch] text-display-md text-ink">
                Find your class
              </h2>
              <p className="mt-5 max-w-prose leading-relaxed text-muted">
                The full week across both studios. Filter by location and
                discipline, then reserve your spot in the app.
              </p>
            </Reveal>
            <div className="mt-10 lg:mt-12">
              <ClassCalendar slots={schedule} />
            </div>
          </div>
        </div>
      </section>

      {/* Formats — numbered index with thumbnails */}
      <EditorialSection
        index="06"
        label="Formats"
        title="The full range"
        lede="Seven disciplines, one standard. Every session lives in the app."
      >
        <ul>
          {formats.items.map((f, i) => (
            <Reveal key={f.name}>
              <li className="group grid grid-cols-[auto,4rem,1fr] items-center gap-5 border-t border-ink/12 py-5 sm:grid-cols-[auto,5rem,1fr] sm:gap-8">
                <span className="font-sans text-[0.72rem] font-semibold tabular-nums tracking-[0.2em] text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Plate
                  src={f.img}
                  alt={f.name}
                  ratio="aspect-square"
                  sizes="5rem"
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <h3 className="font-display text-2xl text-ink sm:text-3xl">
                    {f.name}
                  </h3>
                  <p className="max-w-md text-[0.95rem] leading-snug text-muted">
                    {f.line}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </EditorialSection>

      {/* How it works — 3 steps */}
      <EditorialSection
        index="07"
        label="How it works"
        title={classesFlow.title}
        lede={classesFlow.body}
        tone="surface"
        images={IMG.sessionShots}
        imagesAlt={[
          "Gymnastic rings hanging in the Airborne studio",
          "An athlete mid pull-up, building back and grip strength",
          "An athlete holding a controlled position on the rings",
        ]}
      >
        <div className="grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-3">
          {classesFlow.steps.map((s) => (
            <Reveal key={s.n}>
              <div className="h-full bg-surface p-8">
                <span className="font-display text-5xl text-teal">{s.n}</span>
                <KeyLabel className="mt-6 !text-ink">{s.k}</KeyLabel>
                <p className="mt-2.5 leading-relaxed text-muted">{s.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </EditorialSection>

      {/* Levels */}
      <EditorialSection index="08" label="Levels" title={classesFlow.levels.title}>
        <div className="grid gap-x-12">
          {classesFlow.levels.items.map((lvl, i) => (
            <Reveal key={lvl.k}>
              <div className="grid grid-cols-[auto,1fr] items-baseline gap-6 border-t border-ink/12 py-7 sm:gap-12">
                <span className="font-display text-4xl leading-none text-ink/15">
                  0{i + 1}
                </span>
                <div className="sm:flex sm:items-baseline sm:justify-between sm:gap-10">
                  <KeyLabel className="!text-teal">{lvl.k}</KeyLabel>
                  <p className="mt-2 max-w-md leading-relaxed text-ink sm:mt-0">
                    {lvl.v}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </EditorialSection>

      <FinalCta />
    </>
  );
}
