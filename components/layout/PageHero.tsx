import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Shell, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/icons";

/**
 * Standard hero band for interior pages. Dark teal ground with a soft luminous
 * field and an optional cover image, an eyebrow, a Caslon display title, and a
 * lede. Keeps every subpage visually consistent while the body composes freely
 * beneath it. Clears the fixed header with generous top padding.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
  breadcrumb = "Airborne",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  image?: string;
  imageAlt?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#08201f] pb-16 pt-36 text-white sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.32]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,32,31,0.55),rgba(8,32,31,0.92))]"
          />
        </>
      )}
      <Shell className="relative">
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-[0.78rem] text-white/45"
          >
            <Link href="/" className="transition-colors hover:text-white/80">
              Home
            </Link>
            <IconArrow className="h-3 w-3 -rotate-45 opacity-60" />
            <span className="text-white/70">{breadcrumb}</span>
          </nav>
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h1 className="headline mt-6 max-w-[16ch] text-display-xl">{title}</h1>
          {lede && (
            <p className="mt-7 max-w-prose text-lg leading-relaxed text-white/75">
              {lede}
            </p>
          )}
        </Reveal>
      </Shell>
    </section>
  );
}
