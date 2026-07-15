import type { Metadata } from "next";
import {
  EditorialHero,
  EditorialSection,
} from "@/components/editorial/kit";
import { FinalCta } from "@/components/sections/FinalCta";
import { KeyLabel } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { kidsPage, IMG } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kids Aerial & Movement — Confidence Built Safely",
  description:
    "Age-right kids aerial and movement programs at Airborne: coordination, discipline, and joyful movement in a safe, supported space, led by coaches trained for children.",
  alternates: { canonical: "/kids" },
};

export default function KidsPage() {
  return (
    <>
      <EditorialHero
        index="03"
        kicker={kidsPage.hero.eyebrow}
        title={
          <>
            Confidence,
            <br />
            built in the air
          </>
        }
        lede={kidsPage.hero.lede}
        image={IMG.kids}
        imageAlt="A child learning aerial movement safely at Airborne"
        caption="Junior Aerial · Airborne"
      />

      {/* Age bands */}
      <EditorialSection
        index="04"
        label={kidsPage.ages.eyebrow}
        title={kidsPage.ages.title}
        lede={kidsPage.ages.body}
      >
        <div className="grid gap-px border border-ink/12 bg-ink/12 md:grid-cols-3">
          {kidsPage.ages.bands.map((b) => (
            <Reveal key={b.k}>
              <div className="flex h-full flex-col bg-canvas p-8">
                <span className="font-display text-5xl leading-none text-teal">
                  {b.age}
                </span>
                <span className="mt-2 font-sans text-[0.68rem] uppercase tracking-[0.24em] text-ink/40">
                  years
                </span>
                <h3 className="mt-6 font-display text-2xl text-ink">{b.k}</h3>
                <p className="mt-2.5 leading-relaxed text-muted">{b.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </EditorialSection>

      {/* What they build */}
      <EditorialSection
        index="05"
        label={kidsPage.gains.eyebrow}
        title={kidsPage.gains.title}
        tone="surface"
      >
        <dl className="grid gap-x-12 sm:grid-cols-2">
          {kidsPage.gains.items.map((g, i) => (
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

      {/* For parents */}
      <EditorialSection
        index="06"
        label={kidsPage.parents.eyebrow}
        title={kidsPage.parents.title}
        lede={kidsPage.parents.note}
      >
        <ul className="grid gap-x-12 sm:grid-cols-2">
          {kidsPage.parents.points.map((p) => (
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
