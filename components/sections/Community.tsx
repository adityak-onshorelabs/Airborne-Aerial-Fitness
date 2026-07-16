import Image from "next/image";
import { Shell, Eyebrow } from "@/components/ui/primitives";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { community, IMG } from "@/lib/content";

export function Community() {
  return (
    <section className="overflow-hidden bg-surface py-section">
      <Shell>
        <Reveal className="max-w-3xl">
          <Eyebrow>{community.eyebrow}</Eyebrow>
          <h2 className="headline mt-6 text-display-lg text-ink">
            {community.title}
          </h2>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">
            {community.body}
          </p>
        </Reveal>
      </Shell>

      {/* Full-bleed marquee gallery */}
      <div className="mt-14">
        <Marquee>
          {IMG.community.map((src, i) => (
            <div
              key={src}
              className="relative ml-4 aspect-[3/4] w-56 shrink-0 overflow-hidden rounded-media ring-1 ring-inset ring-black/[0.06] sm:w-64"
            >
              <Image
                src={src}
                alt={`Airborne community moment ${i + 1}`}
                fill
                sizes="16rem"
                className="object-cover"
              />
            </div>
          ))}
        </Marquee>
      </div>

      <Shell>
        <RevealGroup className="mt-16 grid gap-10 md:grid-cols-3">
          {community.testimonials.map((t, i) => (
            <RevealItem key={i} className="border-t border-line pt-7">
              <p className="font-display text-xl leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-5 text-[0.85rem] uppercase tracking-[0.14em] text-subtle">
                {t.who}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Shell>
    </section>
  );
}
