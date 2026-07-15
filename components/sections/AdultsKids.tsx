import { Shell, Eyebrow } from "@/components/ui/primitives";
import { MediaReveal } from "@/components/ui/MediaReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { adultsKids } from "@/lib/content";

type PanelData = {
  label: string;
  img: string;
  line: string;
  points: readonly string[];
};

function Panel({ data, index }: { data: PanelData; index: number }) {
  return (
    <RevealItem className="flex flex-col">
      <TiltCard max={6}>
        <MediaReveal
          src={data.img}
          alt={`${data.label} at Airborne — ${data.line}`}
          className="aspect-[5/6] sm:aspect-[4/5]"
          sizes="(max-width: 768px) 100vw, 50vw"
          overlay="soft"
          speed={index === 0 ? 0.86 : 0.95}
        />
      </TiltCard>
      <div className="mt-7">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-[0.9rem] text-teal">
            0{index + 1}
          </span>
          <h3 className="font-display text-display-md text-ink">
            {data.label}
          </h3>
        </div>
        <p className="mt-3 max-w-md text-lg leading-relaxed text-muted">
          {data.line}
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          {data.points.map((p) => (
            <li
              key={p}
              className="flex items-center gap-2 text-[0.95rem] text-ink"
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </RevealItem>
  );
}

export function AdultsKids() {
  return (
    <section id="kids" className="bg-surface py-section">
      <Shell>
        <Reveal className="max-w-3xl">
          <Eyebrow>{adultsKids.eyebrow}</Eyebrow>
          <h2 className="headline mt-6 text-display-lg text-ink">
            {adultsKids.title}
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-12 md:grid-cols-2 md:gap-10">
          <Panel data={adultsKids.adults} index={0} />
          <Panel data={adultsKids.kids} index={1} />
        </RevealGroup>
      </Shell>
    </section>
  );
}
