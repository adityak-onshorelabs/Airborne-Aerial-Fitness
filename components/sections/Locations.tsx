import Link from "next/link";
import { Shell, Eyebrow, Pill } from "@/components/ui/primitives";
import { MediaReveal } from "@/components/ui/MediaReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { IconArrowUpRight, IconPin } from "@/components/ui/icons";
import { locations, IMG } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

const studios = [
  { ...siteConfig.locations.lowerParel, img: IMG.studioLowerParel },
  { ...siteConfig.locations.mazgaon, img: IMG.studioMazgaon },
];

export function Locations() {
  return (
    <section id="studios" className="bg-canvas py-section">
      <Shell>
        <Reveal className="max-w-3xl">
          <Eyebrow>{locations.eyebrow}</Eyebrow>
          <h2 className="headline mt-6 text-display-lg text-ink">
            {locations.title}
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-10 md:grid-cols-2">
          {studios.map((s) => (
            <RevealItem key={s.name} className="flex flex-col">
              <TiltCard>
                <MediaReveal
                  src={s.img}
                  alt={`Airborne ${s.name} studio in Mumbai`}
                  className="aspect-[3/2]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  overlay="soft"
                  speed={0.93}
                />
              </TiltCard>
              <div className="mt-7 flex flex-1 flex-col">
                <div className="flex items-center gap-2.5">
                  <IconPin className="h-5 w-5 text-teal" />
                  <h3 className="font-display text-2xl text-ink">{s.name}</h3>
                </div>
                <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">
                  {s.address}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {locations.facilityTags.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
                <div className="mt-7">
                  <Link
                    href={s.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-[2.75rem] items-center gap-2 rounded-pill border border-line px-5 py-2.5 text-[0.92rem] font-medium text-ink transition-colors duration-300 hover:border-ink/40 hover:bg-surface"
                  >
                    {locations.cta}
                    <IconArrowUpRight className="h-4 w-4 text-teal transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Shell>
    </section>
  );
}
