import Link from "next/link";
import { Shell, Eyebrow } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { formatIcon, IconSparkle, IconArrowUpRight } from "@/components/ui/icons";
import { formats } from "@/lib/content";

/**
 * Subtle formats showcase for the home page. A quiet, icon-led index of every
 * discipline — no photography, no cards, just thin marks and type — so it reads
 * as a calm menu beneath the signature aerial scene. Full detail lives on
 * /classes.
 */
export function FormatsStrip() {
  return (
    <section className="bg-canvas py-section">
      <Shell>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <Eyebrow>{formats.eyebrow}</Eyebrow>
            <h2 className="headline mt-6 max-w-[16ch] text-display-md text-ink">
              {formats.title}
            </h2>
          </Reveal>
          <Reveal>
            <Link
              href="/classes"
              className="group inline-flex items-center gap-2 text-[0.9rem] font-medium text-ink transition-colors hover:text-teal"
            >
              Explore all classes
              <IconArrowUpRight className="h-4 w-4 text-teal transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-media border border-line bg-line lg:grid-cols-4">
          {formats.items.map((f) => {
            const Icon = formatIcon[f.name] ?? IconSparkle;
            return (
              <RevealItem key={f.name}>
                <Link
                  href="/classes"
                  className="group flex h-full flex-col gap-4 bg-canvas p-6 transition-colors duration-300 hover:bg-surface sm:p-7"
                >
                  <Icon className="h-7 w-7 text-teal transition-transform duration-500 ease-out-quint group-hover:-translate-y-0.5" />
                  <div className="mt-auto">
                    <h3 className="font-display text-lg leading-snug text-ink">
                      {f.name}
                    </h3>
                    <p className="mt-1.5 text-[0.85rem] leading-snug text-muted">
                      {f.line}
                    </p>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
          <RevealItem>
            <Link
              href="/classes"
              className="group flex h-full flex-col justify-between gap-4 bg-surface p-6 transition-colors duration-300 hover:bg-teal sm:p-7"
            >
              <IconArrowUpRight className="h-7 w-7 text-teal transition-all duration-500 ease-out-quint group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#04201f]" />
              <h3 className="font-display text-lg leading-snug text-ink transition-colors duration-300 group-hover:text-[#04201f]">
                See all classes
              </h3>
            </Link>
          </RevealItem>
        </RevealGroup>
      </Shell>
    </section>
  );
}
