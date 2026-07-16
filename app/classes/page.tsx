import type { Metadata } from "next";
import {
  EditorialHero,
  EditorialSection,
  Plate,
} from "@/components/editorial/kit";
import { FinalCta } from "@/components/sections/FinalCta";
import { KeyLabel } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { formats, classesFlow, IMG } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Classes — Pilates, Functional, Dance, Yoga & Aerial",
  description:
    "The complete Airborne studio: aerial silk and hoop, mat Pilates, functional training, dance fitness, trampoline, and yoga — every format held to the same premium standard.",
  alternates: { canonical: "/classes" },
};

export default function ClassesPage() {
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

      {/* Formats — numbered index with thumbnails */}
      <EditorialSection
        index="03"
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
        index="04"
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
      <EditorialSection index="05" label="Levels" title={classesFlow.levels.title}>
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
