"use client";

import { useState } from "react";
import { IconPlus, IconMinus } from "@/components/ui/icons";
import { faqs } from "@/lib/content";

/**
 * Editorial FAQ — numbered, hairline-ruled accordion in the Dossier language.
 * Sharp corners, tabular index, no rounded cards. First item open by default.
 */
export function FaqList() {
  const [open, setOpen] = useState(0);

  return (
    <ul>
      {faqs.items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className="border-t border-ink/12 last:border-b">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center gap-5 py-7 text-left sm:gap-8"
              >
                <span className="font-sans text-[0.72rem] font-semibold tabular-nums tracking-[0.2em] text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-xl text-ink sm:text-2xl">
                  {item.q}
                </span>
                <span className="grid h-8 w-8 shrink-0 place-items-center border border-ink/20 text-teal transition-colors duration-300 group-hover:border-teal">
                  {isOpen ? (
                    <IconMinus className="h-4 w-4" />
                  ) : (
                    <IconPlus className="h-4 w-4" />
                  )}
                </span>
              </button>
            </h3>
            <div
              id={`faq-${i}`}
              className={`grid transition-[grid-template-rows] duration-400 ease-out-quint ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-8 pl-[calc(0.72rem+1.25rem)] text-[0.98rem] leading-relaxed text-muted sm:pl-[calc(0.72rem+2rem)]">
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
