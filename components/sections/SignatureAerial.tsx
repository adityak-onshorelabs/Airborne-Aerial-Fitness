"use client";

import { useRef } from "react";
import Image from "next/image";
import { Shell, Eyebrow, Cta } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { signatureAerial, IMG } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { gsap } from "@/lib/gsap/register";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export function SignatureAerial() {
  const panelRef = useRef<HTMLDivElement>(null);
  const largeRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);

  // Pinned scrub scene. The section is exactly one viewport tall with its
  // content vertically centered, so pinning it holds a viewport-sized block
  // (no taller-than-screen overflow to trap the scroll, no fixed crop). While
  // pinned, the media mosaic assembles and the proof points step in. Desktop +
  // no-preference only; mobile / reduced-motion get the static stacked layout.
  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const points = pointsRef.current
          ? Array.from(pointsRef.current.children)
          : [];

        // Play the media mosaic + proof points in on scroll-enter. No pin, so
        // the section scrolls naturally and never sticks under the fixed nav.
        const tl = gsap.timeline({
          defaults: { ease: "expo.out", duration: 1 },
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top 72%",
            once: true,
          },
        });

        tl.from(
          largeRef.current,
          { clipPath: "inset(0 0 0 100%)", scale: 1.08, duration: 1.2 },
          0
        )
          .from(detailRef.current, { xPercent: 20, opacity: 0 }, 0.18)
          .from(statRef.current, { yPercent: 28, opacity: 0, duration: 0.9 }, 0.3)
          .from(
            points,
            { yPercent: 24, opacity: 0, stagger: 0.09, duration: 0.8 },
            0.22
          );
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={panelRef}
      id="aerial"
      className="relative overflow-hidden bg-[#08201f] py-20 text-white sm:py-24 lg:py-28"
    >
      <div>
        <Shell className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow tone="light">{signatureAerial.eyebrow}</Eyebrow>
              <h2 className="headline mt-6 text-display-lg">
                {signatureAerial.title}
              </h2>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-white/80">
                {signatureAerial.body}
              </p>
            </Reveal>

            <div
              ref={pointsRef}
              className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2"
            >
              {signatureAerial.points.map((p) => (
                <div key={p.k} className="border-t border-white/15 pt-4">
                  <h3 className="font-sans text-[0.82rem] font-semibold uppercase leading-[1.5] tracking-[0.16em] text-aqua">
                    {p.k}
                  </h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-white/70">
                    {p.v}
                  </p>
                </div>
              ))}
            </div>

            <Reveal delay={0.05}>
              <div className="mt-10">
                <Cta href={siteConfig.app.downloadUrl} external variant="primary">
                  {signatureAerial.cta}
                </Cta>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <div className="grid h-[30rem] grid-cols-5 grid-rows-6 gap-4 lg:h-[42rem]">
              <div
                ref={largeRef}
                className="relative col-span-5 row-span-4 overflow-hidden rounded-media ring-1 ring-inset ring-white/10 will-change-transform"
              >
                {/* lags scroll */}
                <div data-speed={0.9} className="absolute inset-x-0 -inset-y-[14%]">
                  <Image
                    src={IMG.aerialSignature}
                    alt="A powerful aerial silk pose held with control and grace inside the Airborne studio"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(160deg,rgba(0,155,157,0.10),rgba(4,26,26,0.5))]"
                />
              </div>
              <div
                ref={detailRef}
                className="relative col-span-3 row-span-2 overflow-hidden rounded-media ring-1 ring-inset ring-white/10 will-change-transform"
              >
                {/* leads scroll — counter-drift to the large plate */}
                <div data-speed={1.1} className="absolute inset-x-0 -inset-y-[16%]">
                  <Image
                    src={IMG.aerialDetail}
                    alt="Close detail of an aerialist's grip and line, showing strength and precision"
                    fill
                    sizes="(max-width: 1024px) 60vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(160deg,rgba(0,155,157,0.10),rgba(4,26,26,0.5))]"
                />
              </div>
              <div
                ref={statRef}
                className="col-span-2 row-span-2 flex flex-col justify-end rounded-media border border-white/12 bg-white/[0.04] p-5 will-change-transform"
              >
                <p className="font-display text-3xl leading-none text-white">
                  From zero.
                </p>
                <p className="mt-2 text-[0.85rem] leading-snug text-white/60">
                  Every member starts on the ground, fully guided.
                </p>
              </div>
            </div>
          </div>
          </div>
        </Shell>
      </div>
    </section>
  );
}
