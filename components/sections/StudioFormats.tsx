"use client";

import { useRef } from "react";
import Link from "next/link";
import { Shell, Eyebrow, Cta } from "@/components/ui/primitives";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowUpRight } from "@/components/ui/icons";
import { formats } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { gsap } from "@/lib/gsap/register";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

function FormatCard({ item }: { item: (typeof formats.items)[number] }) {
  return (
    <Link
      href={siteConfig.app.downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.name} — ${formats.cta}`}
      className="group relative block w-full shrink-0 lg:h-full lg:w-[30rem]"
      data-cursor="view"
    >
      <MediaFrame
        src={item.img}
        alt={`${item.name} at Airborne`}
        className="aspect-[4/5] lg:aspect-auto lg:h-full"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 30rem"
        overlay="cinematic"
      />
      <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-white/25 bg-black/20 text-white backdrop-blur-sm transition-all duration-300 ease-out-quint group-hover:border-teal group-hover:bg-teal group-hover:text-[#04201f]">
        <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7">
        <h3 className="font-display text-3xl text-white sm:text-4xl">
          {item.name}
        </h3>
        <p className="mt-2 max-w-sm text-[0.95rem] leading-snug text-white/85">
          {item.line}
        </p>
      </div>
    </Link>
  );
}

export function StudioFormats() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Header + gallery pin together as one screen; the 7 format cards translate
  // sideways as you scroll down. Header stays put, cards slide beneath it — no
  // dead gap. Mobile / reduced-motion keep the plain vertical stack.
  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const track = trackRef.current;
        if (!track) return;
        const distance = () => track.scrollWidth - track.clientWidth;
        if (distance() <= 0) return;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section id="classes" className="bg-canvas">
      <div
        ref={pinRef}
        className="lg:flex lg:h-screen lg:flex-col lg:overflow-hidden"
      >
        <Shell className="pb-10 pt-20 lg:pb-6 lg:pt-24">
          <Reveal className="max-w-3xl">
            <Eyebrow>{formats.eyebrow}</Eyebrow>
            <h2 className="headline mt-5 text-display-lg text-ink">
              {formats.title}
            </h2>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted">
              {formats.body}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-7">
              <Cta href={siteConfig.app.downloadUrl} external variant="ghost">
                {formats.cta}
              </Cta>
            </div>
          </Reveal>
        </Shell>

        <div className="lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:justify-center lg:overflow-hidden lg:pb-12">
          <div
            ref={trackRef}
            className="flex flex-col gap-5 px-5 sm:px-8 lg:h-[62vh] lg:flex-row lg:items-stretch lg:gap-8 lg:px-12 lg:will-change-transform"
          >
            {formats.items.map((item) => (
              <FormatCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
