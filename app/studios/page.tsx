import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialHero,
  EditorialSection,
  Plate,
  PosterCta,
} from "@/components/editorial/kit";
import { KeyLabel } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { facilityIcon, IconSparkle, IconArrowUpRight } from "@/components/ui/icons";
import { facilities, locations, studioVisit, IMG } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Studios — Lower Parel & Mazgaon, Mumbai",
  description:
    "Two beautifully considered Airborne studios in Mumbai — Lower Parel and Mazgaon. AC, showers, changing rooms, Wi-Fi, and CCTV-secured, clean, calm spaces designed to feel premium.",
  alternates: { canonical: "/studios" },
};

const studios = [
  { ...siteConfig.locations.lowerParel, img: IMG.studioLowerParel },
  { ...siteConfig.locations.mazgaon, img: IMG.studioMazgaon },
];

export default function StudiosPage() {
  return (
    <>
      <EditorialHero
        index="04"
        kicker="Two Mumbai Homes"
        title={
          <>
            Considered,
            <br />
            clean, and calm
          </>
        }
        lede={facilities.body}
        image={IMG.facilities}
        imageAlt="The calm, premium interior of an Airborne studio"
        caption="Studio interior · Airborne"
      />

      {/* The studios */}
      <EditorialSection
        index="05"
        label="Locations"
        title="Come find us."
        lede="Two studios, both minutes from the heart of the city."
      >
        <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2">
          {studios.map((s, i) => (
            <Reveal key={s.name}>
              <article>
                <Plate
                  src={s.img}
                  alt={`Airborne ${s.name} studio in Mumbai`}
                  ratio="aspect-[3/2]"
                  caption={`0${i + 1} · ${s.name}`}
                  sizes="(max-width: 640px) 100vw, 40vw"
                />
                <h3 className="mt-6 font-display text-3xl text-ink">{s.name}</h3>
                <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">
                  {s.address}
                </p>
                <Link
                  href={s.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex items-center gap-2 border-b border-ink/25 pb-1 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:border-teal hover:text-teal"
                >
                  {locations.cta}
                  <IconArrowUpRight className="h-4 w-4 text-teal transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </EditorialSection>

      {/* Your first visit */}
      <EditorialSection
        index="06"
        label={studioVisit.eyebrow}
        title={studioVisit.title}
        lede={studioVisit.body}
        tone="surface"
      >
        <ol className="grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
          {studioVisit.steps.map((s) => (
            <Reveal key={s.n}>
              <li className="h-full bg-surface p-7">
                <span className="font-display text-4xl text-teal">{s.n}</span>
                <KeyLabel className="mt-5 !text-ink">{s.k}</KeyLabel>
                <p className="mt-2.5 text-[0.92rem] leading-relaxed text-muted">
                  {s.v}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </EditorialSection>

      {/* Facilities */}
      <EditorialSection index="07" label="On site" title={facilities.title}>
        <ul className="grid grid-cols-2 gap-x-12 sm:grid-cols-3">
          {facilities.items.map((f) => {
            const Icon = facilityIcon[f] ?? IconSparkle;
            return (
              <Reveal key={f}>
                <li className="flex items-center gap-3.5 border-t border-ink/12 py-5">
                  <Icon className="h-5 w-5 shrink-0 text-deep-teal" />
                  <span className="text-[0.95rem] text-ink">{f}</span>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </EditorialSection>

      <PosterCta
        kicker="Visit"
        title="Book your first session."
        cta="Download the App"
        href={siteConfig.app.downloadUrl}
      />
    </>
  );
}
