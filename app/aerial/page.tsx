import type { Metadata } from "next";
import {
  EditorialHero,
  EditorialSection,
  Plate,
} from "@/components/editorial/kit";
import { FinalCta } from "@/components/sections/FinalCta";
import { KeyLabel } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { aerialPage, IMG } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Aerial Fitness in Mumbai — Silk & Hoop, Beginner Friendly",
  description:
    "Airborne's signature aerial fitness: silk and hoop training that builds real strength, flexibility, and confidence. Fully guided from your first session. Adults and kids, Lower Parel and Mazgaon.",
  alternates: { canonical: "/aerial" },
};

export default function AerialPage() {
  return (
    <>
      <EditorialHero
        index="01"
        kicker="Signature Discipline"
        title={
          <>
            Aerial Fitness,
            <br />
            Elevated
          </>
        }
        lede={aerialPage.hero.lede}
        image={IMG.aerialSignature}
        imageAlt="An aerialist suspended on silks inside the Airborne studio"
        caption="Silk · Airborne studio"
      />

      {/* Disciplines — two plates */}
      <EditorialSection
        index="02"
        label="The apparatus"
        title={aerialPage.disciplines.title}
        lede={aerialPage.disciplines.body}
      >
        <div className="grid gap-10 sm:grid-cols-2">
          {aerialPage.disciplines.items.map((d) => (
            <Reveal key={d.name}>
              <article>
                <Plate
                  src={d.img}
                  alt={`${d.name} at Airborne`}
                  ratio="aspect-[4/5]"
                  caption={d.name}
                  sizes="(max-width: 640px) 100vw, 40vw"
                />
                <h3 className="mt-6 font-display text-2xl text-ink">{d.name}</h3>
                <p className="mt-3 leading-relaxed text-muted">{d.line}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </EditorialSection>

      {/* What you build — index list */}
      <EditorialSection
        index="03"
        label="What you build"
        title={aerialPage.gains.title}
        lede={aerialPage.gains.body}
        tone="surface"
        image={IMG.strength}
        imageAlt="An athlete holding a powerful straight-arm planche, showing full-body strength"
        imageClassName="object-[center_72%]"
      >
        <dl className="grid gap-x-12 sm:grid-cols-2">
          {aerialPage.gains.items.map((g, i) => (
            <Reveal key={g.k}>
              <div className="flex gap-5 border-t border-ink/12 py-6">
                <span className="font-display text-2xl leading-none text-teal">
                  0{i + 1}
                </span>
                <div>
                  <dt>
                    <KeyLabel className="!text-ink">{g.k}</KeyLabel>
                  </dt>
                  <dd className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                    {g.v}
                  </dd>
                </div>
              </div>
            </Reveal>
          ))}
        </dl>
      </EditorialSection>

      {/* From zero — big numbered steps */}
      <EditorialSection
        index="04"
        label="The path"
        title={aerialPage.journey.title}
        lede={aerialPage.journey.body}
      >
        <ol className="space-y-0">
          {aerialPage.journey.steps.map((s) => (
            <Reveal key={s.n}>
              <li className="grid grid-cols-[auto,1fr] items-baseline gap-6 border-t border-ink/12 py-8 sm:gap-12">
                <span className="font-display text-6xl leading-none text-ink/15 sm:text-7xl">
                  {s.n}
                </span>
                <div>
                  <KeyLabel className="!text-teal">{s.k}</KeyLabel>
                  <p className="mt-2.5 max-w-xl text-lg leading-relaxed text-ink">
                    {s.v}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </EditorialSection>

      {/* Safety — bordered checklist */}
      <EditorialSection
        index="05"
        label="Safety"
        title={aerialPage.safety.title}
        tone="surface"
      >
        <ul className="grid gap-x-12 sm:grid-cols-2">
          {aerialPage.safety.points.map((p) => (
            <Reveal key={p}>
              <li className="flex gap-4 border-t border-ink/12 py-5">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                <span className="leading-relaxed text-ink">{p}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </EditorialSection>

      <FinalCta />
    </>
  );
}
