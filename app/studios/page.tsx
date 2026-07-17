import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialHero,
  EditorialSection,
} from "@/components/editorial/kit";
import { FinalCta } from "@/components/sections/FinalCta";
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

/**
 * Framed map preview in place of a studio photo. Keyless Google Maps embed
 * (query by address), rendered non-interactive (pointer-events-none) so it
 * reads as a still preview — the "Get directions" link below is the action.
 * A cream/monochrome CSS filter drops the map into the site's paper palette.
 */
function MapPreview({
  address,
  name,
  caption,
}: {
  address: string;
  name: string;
  caption: string;
}) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(
    address,
  )}&z=15&output=embed`;
  return (
    <figure>
      <div className="relative aspect-[3/2] overflow-hidden bg-surface ring-1 ring-inset ring-ink/15">
        <iframe
          src={src}
          title={`Map of Airborne ${name}, Mumbai`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="pointer-events-none absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_contrast(1.08)_brightness(1.05)]"
        />
        {/* teal duotone: color-blend keeps the B&W detail, recolors to primary */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-teal mix-blend-color opacity-70"
        />
        {/* lift shadows so the teal reads clean, not muddy */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-canvas mix-blend-screen opacity-20"
        />
      </div>
      <figcaption className="mt-3 flex items-center gap-3 border-t border-ink/12 pt-3 font-sans text-[0.68rem] uppercase tracking-[0.22em] text-ink/45">
        <span aria-hidden className="h-px w-5 bg-teal" />
        {caption}
      </figcaption>
    </figure>
  );
}

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
                <MapPreview
                  address={s.address}
                  name={s.name}
                  caption={`0${i + 1} · ${s.name}`}
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

      <FinalCta />
    </>
  );
}
