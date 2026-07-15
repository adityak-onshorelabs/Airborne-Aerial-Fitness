import type { Metadata } from "next";
import {
  EditorialHero,
  EditorialSection,
} from "@/components/editorial/kit";
import { FinalCta } from "@/components/sections/FinalCta";
import { KeyLabel } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { whyAirborne, whyPromise, IMG } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Why Airborne — Premium in Every Detail",
  description:
    "Expert-led coaching, safety-first aerial, small-batch classes, and two beautifully considered Mumbai studios. The difference is in how Airborne feels.",
  alternates: { canonical: "/why" },
};

export default function WhyPage() {
  return (
    <>
      <EditorialHero
        index="05"
        kicker="Why Airborne"
        title={
          <>
            Premium in
            <br />
            every detail
          </>
        }
        lede={whyAirborne.body}
        image={IMG.brand}
        imageAlt="Members moving together at Airborne"
        caption="The Airborne difference"
      />

      {/* Reasons — index list */}
      <EditorialSection
        index="06"
        label="The difference"
        title="Eight reasons it feels different."
      >
        <ul className="grid gap-x-12 sm:grid-cols-2">
          {whyAirborne.reasons.map((r, i) => (
            <Reveal key={r.k}>
              <li className="flex gap-5 border-t border-ink/12 py-6">
                <span className="font-sans text-[0.72rem] font-semibold tabular-nums tracking-[0.2em] text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <KeyLabel className="!text-ink">{r.k}</KeyLabel>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                    {r.v}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </EditorialSection>

      {/* The standard */}
      <EditorialSection
        index="07"
        label={whyPromise.eyebrow}
        title={whyPromise.title}
        lede={whyPromise.body}
        tone="surface"
      >
        <div className="grid gap-x-12">
          {whyPromise.standards.map((s, i) => (
            <Reveal key={s.k}>
              <div className="grid grid-cols-[auto,1fr] items-baseline gap-6 border-t border-ink/12 py-8 sm:gap-12">
                <span className="font-display text-5xl leading-none text-ink/15 sm:text-6xl">
                  0{i + 1}
                </span>
                <div className="sm:flex sm:items-baseline sm:justify-between sm:gap-10">
                  <KeyLabel className="!text-teal">{s.k}</KeyLabel>
                  <p className="mt-2 max-w-md leading-relaxed text-ink sm:mt-0">
                    {s.v}
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
