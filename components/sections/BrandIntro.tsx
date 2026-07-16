import { Shell, Eyebrow } from "@/components/ui/primitives";
import { ParallaxMedia } from "@/components/ui/Parallax";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { brandIntro, IMG } from "@/lib/content";

export function BrandIntro() {
  return (
    <section id="intro" className="bg-canvas">
      {/* Image-forward statement: a large full-bleed frame with the brand copy
          set over it, then the pillars breathing on the canvas below. */}
      <div className="relative flex min-h-[82svh] items-end overflow-hidden bg-[#061615] text-white">
        <div className="absolute inset-0">
          <ParallaxMedia
            src={IMG.brand}
            alt="A coach guiding a member through a controlled aerial movement in a calm, light-filled Airborne studio"
            className="absolute inset-0"
            sizes="100vw"
            overlay="cinematic"
            intensity={8}
          />
        </div>
        {/* left-weighted scrim for text legibility */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,20,20,0.72)_0%,rgba(4,20,20,0.22)_48%,transparent_78%)]"
        />

        <Shell className="relative pb-14 pt-[calc(var(--nav-h)+3rem)] lg:pb-20">
          <Reveal>
            <Eyebrow tone="light">{brandIntro.eyebrow}</Eyebrow>
            <h2 className="headline mt-6 max-w-[14ch] text-display-xl">
              {brandIntro.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-prose text-lg leading-relaxed text-white/85">
              {brandIntro.body}
            </p>
          </Reveal>
        </Shell>
      </div>

      <Shell className="py-section">
        <RevealGroup className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {brandIntro.pillars.map((p) => (
            <RevealItem key={p.k} className="border-t border-line pt-6">
              <h3 className="font-display text-xl text-ink">{p.k}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">
                {p.v}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Shell>
    </section>
  );
}
