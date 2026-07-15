"use client";

import { useState } from "react";
import { Shell, Eyebrow, Cta } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { IconPlus, IconMinus } from "@/components/ui/icons";
import { faqs } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

function Item({
  q,
  a,
  open,
  onToggle,
  id,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  id: string;
}) {
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="font-display text-lg text-ink sm:text-xl">{q}</span>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-teal transition-colors duration-300">
            {open ? (
              <IconMinus className="h-4 w-4" />
            ) : (
              <IconPlus className="h-4 w-4" />
            )}
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className={`grid transition-[grid-template-rows] duration-400 ease-out-quint ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-7 pr-12 text-[0.98rem] leading-relaxed text-muted">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-canvas py-section">
      <Shell>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{faqs.eyebrow}</Eyebrow>
              <h2 className="headline mt-6 text-display-md text-ink">
                {faqs.title}
              </h2>
              <p className="mt-6 max-w-xs text-[0.98rem] leading-relaxed text-muted">
                Everything current, memberships, schedules and booking, lives in
                the app, always up to date.
              </p>
              <div className="mt-7">
                <Cta href={siteConfig.app.downloadUrl} external variant="ghost">
                  Get the app
                </Cta>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <div className="border-t border-line">
                {faqs.items.map((f, i) => (
                  <Item
                    key={f.q}
                    id={`faq-${i}`}
                    q={f.q}
                    a={f.a}
                    open={open === i}
                    onToggle={() => setOpen(open === i ? null : i)}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}
