import { Shell, Eyebrow } from "@/components/ui/primitives";
import { MediaReveal } from "@/components/ui/MediaReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { facilityIcon, IconSparkle } from "@/components/ui/icons";
import { facilities, IMG } from "@/lib/content";

export function Facilities() {
  return (
    <section className="bg-surface py-section">
      <Shell>
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <MediaReveal
              src={IMG.facilities}
              alt="The Airborne studio interior — clean lines, warm light, and considered space"
              className="h-full min-h-[22rem] w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
              overlay="soft"
              speed={0.9}
            />
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>{facilities.eyebrow}</Eyebrow>
              <h2 className="headline mt-6 text-display-md text-ink">
                {facilities.title}
              </h2>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">
                {facilities.body}
              </p>
            </Reveal>

            <RevealGroup className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {facilities.items.map((f) => {
                const Icon = facilityIcon[f] ?? IconSparkle;
                return (
                  <RevealItem
                    key={f}
                    className="flex items-center gap-3.5 border-b border-line pb-4"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-deep-teal" />
                    <span className="text-[0.98rem] text-ink">{f}</span>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </Shell>
    </section>
  );
}
