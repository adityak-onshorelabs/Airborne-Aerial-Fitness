import type { ReactNode } from "react";
import Image from "next/image";
import { MediaReveal } from "@/components/ui/MediaReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Cta } from "@/components/ui/primitives";

/**
 * "The Dossier" — the interior-page art language. Deliberately distinct from the
 * home page's dark cinematic reel: a light paper base, a structural hairline
 * grid, numbered chapters, sharp-cornered framed plates with captions, oversized
 * Caslon titles, and bold teal poster blocks. No pinned scrub scenes.
 *
 * Everything here is server-renderable; motion is limited to gentle Reveals.
 */

const HAIR = "border-ink/12";

/** [ 01 ] LABEL — the recurring index kicker. Tabular index in teal. */
export function IndexKicker({
  index,
  children,
  tone = "ink",
}: {
  index: string;
  children: ReactNode;
  tone?: "ink" | "light";
}) {
  const base =
    tone === "light" ? "text-white/55" : "text-ink/45";
  const num = tone === "light" ? "text-aqua" : "text-teal";
  return (
    <span
      className={`flex items-center gap-3 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.3em] ${base}`}
    >
      <span className={`tabular-nums ${num}`}>{index}</span>
      <span aria-hidden className={`h-3 w-px ${tone === "light" ? "bg-white/25" : "bg-ink/20"}`} />
      {children}
    </span>
  );
}

/** Sharp-cornered framed plate with an optional caption line. */
export function Plate({
  src,
  alt,
  ratio = "aspect-[4/5]",
  caption,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 45vw",
}: {
  src: string;
  alt: string;
  ratio?: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure>
      <div
        className={`relative overflow-hidden ${ratio} ring-1 ring-inset ring-ink/15`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption
          className={`mt-3 flex items-center gap-3 border-t ${HAIR} pt-3 font-sans text-[0.68rem] uppercase tracking-[0.22em] text-ink/45`}
        >
          <span aria-hidden className="h-px w-5 bg-teal" />
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Chapter hero — a typographic, light, gridded opener. A single square plate
 * anchors the grid rather than a full-bleed cinematic cover.
 */
export function EditorialHero({
  index,
  kicker,
  title,
  lede,
  image,
  imageAlt,
  caption,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  lede?: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
}) {
  return (
    <section className="bg-canvas pb-16 pt-36 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
      <div className="mx-auto w-full max-w-shell px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className={`border-t ${HAIR} pt-5`}>
            <IndexKicker index={index}>{kicker}</IndexKicker>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-y-10 lg:grid-cols-12 lg:gap-16">
          <div className={image ? "lg:col-span-8" : "lg:col-span-11"}>
            <Reveal>
              <h1 className="headline text-[clamp(3rem,9vw,8rem)] leading-[0.92] tracking-[-0.02em] text-ink">
                {title}
              </h1>
            </Reveal>
            {lede && (
              <Reveal>
                <p className="mt-9 max-w-prose text-lg leading-relaxed text-muted">
                  {lede}
                </p>
              </Reveal>
            )}
          </div>

          {image && (
            <div className="lg:col-span-4">
              <Reveal>
                <Plate
                  src={image}
                  alt={imageAlt ?? ""}
                  ratio="aspect-[3/4]"
                  caption={caption}
                  priority
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Editorial section: a sticky numbered label column on the left, free content
 * on the right, separated by a full-width hairline. The structural backbone of
 * every interior page.
 */
export function EditorialSection({
  index,
  label,
  title,
  lede,
  children,
  tone = "canvas",
  image,
  imageAlt,
  imageClassName,
  images,
  imagesAlt,
}: {
  index: string;
  label: string;
  title?: ReactNode;
  lede?: string;
  children: ReactNode;
  tone?: "canvas" | "surface";
  /** Optional full-width banner image, set inside the section under the head. */
  image?: string;
  imageAlt?: string;
  /** Extra <img> classes for the banner, e.g. object-position focal control. */
  imageClassName?: string;
  /** Optional row of vertical images (a triptych) under the head. */
  images?: readonly string[];
  imagesAlt?: readonly string[];
}) {
  const head = (
    <Reveal>
      <IndexKicker index={index}>{label}</IndexKicker>
      {title && (
        <h2 className="headline mt-6 max-w-[22ch] text-display-md text-ink">
          {title}
        </h2>
      )}
      {lede && (
        <p className="mt-5 max-w-prose leading-relaxed text-muted">{lede}</p>
      )}
    </Reveal>
  );

  return (
    <section className={`bg-${tone}`}>
      <div className="mx-auto w-full max-w-shell px-5 sm:px-8 lg:px-12">
        {images && images.length > 0 ? (
          // Triptych variant: heading, a row of vertical images, then content.
          <div className={`border-t ${HAIR} py-16 sm:py-20 lg:py-24`}>
            {head}
            <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-5 lg:mt-12">
              {images.map((src, i) => (
                <MediaReveal
                  key={src}
                  src={src}
                  alt={imagesAlt?.[i] ?? ""}
                  className="aspect-[3/4]"
                  sizes="(max-width: 1024px) 33vw, 26rem"
                  overlay="soft"
                  speed={i % 2 === 0 ? 0.86 : 0.98}
                />
              ))}
            </div>
            <div className="mt-12 lg:mt-16">{children}</div>
          </div>
        ) : image ? (
          // Image variant: heading on top, the banner beneath it, then the
          // content — the image reads as part of the section, not a lid on it.
          <div className={`border-t ${HAIR} py-16 sm:py-20 lg:py-24`}>
            <Reveal>
              <IndexKicker index={index}>{label}</IndexKicker>
              {title && (
                <h2 className="headline mt-6 max-w-[22ch] text-display-md text-ink">
                  {title}
                </h2>
              )}
              {lede && (
                <p className="mt-5 max-w-prose leading-relaxed text-muted">
                  {lede}
                </p>
              )}
            </Reveal>
            <MediaReveal
              src={image}
              alt={imageAlt ?? ""}
              className="mt-10 aspect-[16/9] lg:mt-12 lg:aspect-[21/9]"
              imgClassName={imageClassName}
              sizes="(max-width: 1024px) 100vw, 82rem"
              overlay="soft"
            />
            <div className="mt-12 lg:mt-16">{children}</div>
          </div>
        ) : (
          <div className={`grid gap-y-10 border-t ${HAIR} py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24`}>
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <IndexKicker index={index}>{label}</IndexKicker>
                  {title && (
                    <h2 className="headline mt-6 text-display-md text-ink">
                      {title}
                    </h2>
                  )}
                  {lede && (
                    <p className="mt-5 max-w-sm leading-relaxed text-muted">
                      {lede}
                    </p>
                  )}
                </Reveal>
              </div>
            </div>
            <div className="lg:col-span-9">{children}</div>
          </div>
        )}
      </div>
    </section>
  );
}

/** Bold teal poster CTA — the interior pages' signature statement block. */
export function PosterCta({
  kicker,
  title,
  cta,
  href,
}: {
  kicker: string;
  title: string;
  cta: string;
  href: string;
}) {
  return (
    <section className="bg-canvas">
      <div className="mx-auto w-full max-w-shell px-5 pb-24 sm:px-8 lg:px-12">
        <Reveal>
          <div className="relative overflow-hidden bg-teal px-6 py-16 text-[#04201f] sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <IndexKicker index="↗">
              <span className="text-[#04201f]/70">{kicker}</span>
            </IndexKicker>
            <h2 className="headline mt-6 max-w-[16ch] text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.98]">
              {title}
            </h2>
            <div className="mt-10">
              <Cta href={href} external variant="ghost">
                {cta}
              </Cta>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
