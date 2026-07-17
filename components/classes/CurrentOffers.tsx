import { Reveal } from "@/components/ui/Reveal";
import { Cta } from "@/components/ui/primitives";
import { currentOffers } from "@/lib/offers";

/**
 * Current offers grid. Display-only — every offer redeems in the Airborne app,
 * so the single CTA routes to /download rather than any booking flow.
 */
export function CurrentOffers({ downloadUrl }: { downloadUrl: string }) {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {currentOffers.map((o) => (
          <Reveal key={o.id}>
            <article className="flex h-full flex-col border border-ink/12 bg-canvas p-6 transition-colors duration-200 hover:border-teal/50">
              <span className="inline-flex w-fit items-center rounded-pill bg-teal/12 px-3 py-1 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-deep-teal">
                {o.badge}
              </span>
              <h3 className="mt-4 font-display text-2xl leading-tight text-ink">
                {o.title}
              </h3>
              <p className="mt-2.5 text-[0.92rem] leading-relaxed text-muted">
                {o.subtitle}
              </p>

              {o.slabs && (
                <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5 border-t border-ink/10 pt-4 font-sans text-[0.82rem]">
                  {o.slabs.map((s) => (
                    <div key={s.label} className="flex justify-between gap-2">
                      <dt className="text-muted">{s.label}</dt>
                      <dd className="font-semibold tabular-nums text-teal">
                        {s.percentOff}% off
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <p className="mt-4 text-[0.82rem] leading-relaxed text-ink/55">
                {o.detail}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-8 flex flex-col items-start gap-3 border-t border-ink/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[0.9rem] leading-relaxed text-muted">
            Offers apply automatically at checkout in the Airborne app. Terms may
            apply.
          </p>
          <Cta href={downloadUrl} variant="primary">
            Get the App
          </Cta>
        </div>
      </Reveal>
    </div>
  );
}
