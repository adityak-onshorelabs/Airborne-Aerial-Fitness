import Link from "next/link";
import { Shell, Eyebrow } from "@/components/ui/primitives";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowUpRight } from "@/components/ui/icons";
import { IMG } from "@/lib/content";

const CARDS = [
  {
    href: "/aerial",
    label: "Aerial",
    line: "Silk & hoop — our signature discipline.",
    img: IMG.aerialSignature,
    span: "md:col-span-2 md:row-span-2",
    aspect: "aspect-[4/5] md:aspect-auto md:h-full",
  },
  {
    href: "/classes",
    label: "Classes",
    line: "Pilates, functional, dance, yoga & more.",
    img: IMG.formats.functional,
    span: "",
    aspect: "aspect-[4/3] md:aspect-auto md:h-full",
  },
  {
    href: "/kids",
    label: "Kids",
    line: "Confidence and coordination, safely built.",
    img: IMG.kids,
    span: "",
    aspect: "aspect-[4/3] md:aspect-auto md:h-full",
  },
  {
    href: "/studios",
    label: "Studios",
    line: "Two Mumbai homes — Lower Parel & Mazgaon.",
    img: IMG.facilities,
    span: "md:col-span-2",
    aspect: "aspect-[16/9] md:aspect-auto md:h-full",
  },
] as const;

/**
 * Home "explore" bento — the primary route into each interior page. Every card
 * is a full-bleed media tile with a corner action affordance.
 */
export function ExploreGrid() {
  return (
    <section className="bg-canvas py-section">
      <Shell>
        <Reveal>
          <Eyebrow>Explore the studio</Eyebrow>
          <h2 className="headline mt-6 max-w-[18ch] text-display-lg text-ink">
            One studio, many ways to move.
          </h2>
        </Reveal>

        <div className="mt-14 grid auto-rows-[15rem] gap-5 sm:auto-rows-[17rem] md:grid-cols-3 lg:gap-6">
          {CARDS.map((c) => (
            <Reveal key={c.href} className={c.span}>
              <Link
                href={c.href}
                data-cursor="view"
                className="group relative block h-full"
                aria-label={`${c.label} — ${c.line}`}
              >
                <MediaFrame
                  src={c.img}
                  alt={`${c.label} at Airborne`}
                  className={c.aspect}
                  sizes="(max-width: 768px) 100vw, 55vw"
                  overlay="cinematic"
                />
                <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-white/25 bg-black/20 text-white backdrop-blur-sm transition-all duration-300 ease-out-quint group-hover:border-teal group-hover:bg-teal group-hover:text-[#04201f]">
                  <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <h3 className="font-display text-3xl text-white sm:text-4xl">
                    {c.label}
                  </h3>
                  <p className="mt-1.5 max-w-xs text-[0.92rem] leading-snug text-white/85">
                    {c.line}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
