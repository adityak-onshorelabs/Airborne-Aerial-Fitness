import { Shell, Eyebrow } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  IconUsers,
  IconShield,
  IconFeather,
  IconSparkle,
  IconStar,
  IconStack,
  IconPin,
  IconMap,
} from "@/components/ui/icons";
import { whyAirborne } from "@/lib/content";

const icons = [
  IconUsers,
  IconShield,
  IconFeather,
  IconSparkle,
  IconStar,
  IconMap,
  IconStack,
  IconPin,
];

export function WhyAirborne() {
  return (
    <section id="why" className="bg-canvas py-section">
      <Shell>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow>{whyAirborne.eyebrow}</Eyebrow>
            <h2 className="headline mt-6 text-display-lg text-ink">
              {whyAirborne.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="max-w-prose text-lg leading-relaxed text-muted">
              {whyAirborne.body}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-media border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {whyAirborne.reasons.map((r, i) => {
            const Icon = icons[i % icons.length];
            return (
              <RevealItem
                key={r.k}
                className="bg-canvas p-7 transition-colors duration-300 hover:bg-surface"
              >
                <Icon className="h-6 w-6 text-teal" />
                <h3 className="mt-5 font-display text-lg text-ink">{r.k}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
                  {r.v}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Shell>
    </section>
  );
}
