"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ParallaxMedia } from "@/components/ui/Parallax";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { QrCode } from "@/components/ui/QrCode";
import { Cta } from "@/components/ui/primitives";
import { IconArrow } from "@/components/ui/icons";
import { heroContent, IMG } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { easeExpo } from "@/lib/motion";
import { gsap } from "@/lib/gsap/register";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const darkenRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll choreography: as the hero exits, the image scales up + darkens and
  // the content lifts and fades — a cinematic hand-off to the next section.
  // Scrub-linked, transform/opacity only. Gated off under reduced-motion.
  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(mediaRef.current, { scale: 1.16, ease: "none" }, 0)
        .to(darkenRef.current, { opacity: 0.55, ease: "none" }, 0)
        .to(contentRef.current, { yPercent: -16, opacity: 0.2, ease: "none" }, 0);
    });
    return () => mm.revert();
  }, []);

  const line = (i: number) => ({
    initial: reduce ? {} : { opacity: 0, y: "0.55em" },
    animate: { opacity: 1, y: "0em" },
    transition: { duration: 1, ease: easeExpo, delay: 0.15 + i * 0.12 },
  });

  const fade = (delay: number) => ({
    initial: reduce ? {} : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: easeExpo, delay },
  });

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#061615] text-white"
    >
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        <ParallaxMedia
          src={IMG.hero}
          alt="Airborne athletes mid-flow on aerial silks in a bright, airy studio, poised and powerful"
          className="absolute inset-0"
          sizes="100vw"
          priority
          overlay="cinematic"
          intensity={9}
          // #4 aerial plate carries the studio wall logo near frame-center,
          // right under the overlaid headline. Nudge the plate down (with a
          // slight zoom so no top edge shows) so the logo drops below the copy
          // and the headline sits on the blank upper wall.
          imgClassName="scale-[1.15] translate-y-[10%]"
        />
      </div>
      {/* extra left-weighted scrim for text legibility — the bright #4 plate
          carries the studio wall logo near center, so the tint runs darker and
          reaches further right to seat the headline/subtitle on solid ink. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,20,20,0.9)_0%,rgba(4,20,20,0.78)_30%,rgba(4,20,20,0.45)_60%,transparent_88%)]"
      />
      {/* scroll-driven darken layer */}
      <div
        ref={darkenRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black opacity-0"
      />

      <div
        ref={contentRef}
        className="relative mx-auto w-full max-w-shell px-5 pb-12 pt-[calc(var(--nav-h)+2rem)] will-change-transform sm:px-8 lg:px-12 lg:pb-16 [@media(max-height:800px)]:pt-[calc(var(--nav-h)+1rem)] [@media(max-height:800px)]:pb-8"
      >
        <motion.p
          {...fade(0.1)}
          className="mb-6 inline-flex items-center gap-2.5 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-aqua [@media(max-height:800px)]:mb-4"
        >
          <span aria-hidden className="h-px w-7 bg-aqua/70" />
          {heroContent.eyebrow}
        </motion.p>

        {/* Height-aware headline: on short (laptop) viewports the full
            display-2xl scale overflows and pushes the download row below the
            fold, so it steps down as the viewport gets shorter. */}
        <h1 className="headline max-w-[16ch] text-display-2xl [@media(max-height:900px)]:text-[clamp(2.6rem,6vw,5.5rem)] [@media(max-height:760px)]:text-[clamp(2.3rem,5vw,4.5rem)]">
          {heroContent.title.map((t, i) => (
            <span key={t} className="block overflow-hidden">
              <motion.span {...line(i)} className="block">
                {t}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          {...fade(0.6)}
          className="mt-7 max-w-[46ch] text-lg leading-relaxed text-white/85 sm:text-xl [@media(max-height:800px)]:mt-5 [@media(max-height:800px)]:text-base [@media(max-height:800px)]:sm:text-lg"
        >
          {heroContent.subtitle}
        </motion.p>

        <motion.div
          {...fade(0.75)}
          className="mt-9 flex flex-wrap items-center gap-3 [@media(max-height:800px)]:mt-6"
        >
          <Cta href={siteConfig.app.downloadUrl} external variant="primary">
            {heroContent.primaryCta}
          </Cta>
          <Cta href="/aerial" variant="ghost-light" withArrow={false}>
            {heroContent.secondaryCta}
          </Cta>
        </motion.div>

        {/* Desktop: QR + badges intentional. Mobile: store buttons prominent. */}
        <motion.div
          {...fade(0.9)}
          className="mt-12 flex flex-col gap-6 border-t border-white/12 pt-8 sm:flex-row sm:items-center sm:justify-between [@media(max-height:900px)]:mt-8 [@media(max-height:800px)]:mt-6 [@media(max-height:800px)]:pt-5"
        >
          <div className="sm:hidden">
            <StoreButtons large />
          </div>
          <div className="hidden items-center gap-5 sm:flex">
            <QrCode label={heroContent.qrLabel} size={104} tone="light" />
            <div className="hidden h-14 w-px bg-white/15 md:block" />
            <div className="hidden md:block">
              <StoreButtons />
            </div>
          </div>
          <a
            href="#intro"
            className="group hidden items-center gap-2 self-end text-[0.8rem] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white sm:inline-flex"
          >
            Scroll
            <IconArrow className="h-4 w-4 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
