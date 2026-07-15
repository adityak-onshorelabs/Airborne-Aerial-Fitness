import { Shell, Eyebrow, KeyLabel } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

type Step = { n: string; k: string; v: string };

/**
 * Reusable numbered-steps band (e.g. how a class runs, your first visit).
 * Content differs per page; the treatment stays consistent.
 */
export function StepsSection({
  eyebrow,
  title,
  body,
  steps,
  bg = "canvas",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  steps: Step[];
  bg?: "canvas" | "surface";
}) {
  const cols =
    steps.length >= 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-3";
  return (
    <section className={`bg-${bg} py-section`}>
      <Shell>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="headline mt-6 max-w-[20ch] text-display-lg text-ink">
            {title}
          </h2>
          {body && (
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">
              {body}
            </p>
          )}
        </Reveal>

        <div className={`mt-14 grid gap-6 ${cols} lg:gap-8`}>
          {steps.map((s) => (
            <Reveal key={s.n}>
              <div className="h-full rounded-media border border-line bg-canvas p-8">
                <span className="font-display text-5xl text-teal">{s.n}</span>
                <KeyLabel tone="ink" className="mt-6">
                  {s.k}
                </KeyLabel>
                <p className="mt-2.5 leading-relaxed text-muted">{s.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
