import { Shell, Eyebrow } from "@/components/ui/primitives";
import { MediaReveal } from "@/components/ui/MediaReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { brandIntro, IMG } from "@/lib/content";

export function BrandIntro() {
  return (
    <section id="intro" className="bg-canvas py-section">
      <Shell>
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{brandIntro.eyebrow}</Eyebrow>
              <h2 className="headline mt-6 text-display-xl text-ink">
                {brandIntro.title}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 max-w-prose text-lg leading-relaxed text-muted">
                {brandIntro.body}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <MediaReveal
              src={IMG.brand}
              alt="A coach guiding a member through a controlled aerial movement in a calm, light-filled Airborne studio"
              className="aspect-[4/5]"
              sizes="(max-width: 1024px) 100vw, 40vw"
              overlay="soft"
              speed={0.88}
            />
          </div>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-media border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {brandIntro.pillars.map((p) => (
            <RevealItem
              key={p.k}
              className="bg-canvas p-7 transition-colors duration-300 hover:bg-surface"
            >
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
