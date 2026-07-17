"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/lib/site-config";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { Logo } from "@/components/ui/Logo";
import { IconArrow } from "@/components/ui/icons";
import { gsap, ScrollTrigger, ScrollSmoother } from "@/lib/gsap/register";
import { useDirectionalFill, HIDDEN_CLIP } from "@/hooks/useDirectionalFill";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const dlDesktop = useDirectionalFill();
  const dlDrawer = useDirectionalFill();

  // ScrollSmoother transforms #smooth-content, so window.scrollY stays ~0.
  // Read the effective scroll position through ScrollTrigger instead; this also
  // works natively when reduced-motion disables the smoother.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => setScrolled(self.scroll() > 24),
      });
      setScrolled(st.scroll() > 24);
    });
    return () => ctx.revert();
  }, []);

  // Lock scrolling behind the mobile drawer. Pause the smoother when present,
  // fall back to body overflow when it isn't (reduced-motion / not yet created).
  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.paused(open);
      return () => smoother.paused(false);
    }
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Home opens on a dark hero → the bar is transparent (white type) until
  // scroll. Interior pages open on a light canvas hero, so the bar must be
  // solid (ink type) from the top or the white wordmark/links vanish.
  const isHome = pathname === "/";
  const solid = scrolled || open || !isHome;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* legibility scrim over the dark hero while the bar is transparent */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(4,20,20,0.38),transparent)] transition-opacity duration-300 ${
          solid ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Full-width bar: transparent over the hero, solid canvas + hairline on
          scroll. Squared, minimal — airfit-style. */}
      <div
        className={`pointer-events-auto border-b transition-colors duration-300 ${
          solid
            ? "border-line bg-canvas backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-shell items-center justify-between gap-4 px-5 sm:h-24 sm:px-8 lg:px-12">
          <Link
            href="/"
            aria-label="Airborne Aerial Fitness home"
            onClick={() => {
              setOpen(false);
              // Already home: no route change to trigger ScrollReset, so glide up.
              if (pathname === "/") {
                const s = ScrollSmoother.get();
                if (s) s.scrollTo(0, true);
                else window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="shrink-0"
          >
            <Logo tone={solid ? "light" : "dark"} className="h-14 sm:h-16" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-[0.78rem] uppercase tracking-[0.14em] transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-teal after:transition-all after:duration-300 ${
                    solid
                      ? active
                        ? "text-ink after:w-full"
                        : "text-muted hover:text-ink after:w-0 hover:after:w-full"
                      : active
                        ? "text-white after:w-full"
                        : "text-white/70 hover:text-white after:w-0 hover:after:w-full"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href={siteConfig.app.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={dlDesktop.onMouseEnter}
              onMouseLeave={dlDesktop.onMouseLeave}
              className="group relative hidden min-h-[2.6rem] items-center gap-2 overflow-hidden border border-aqua bg-teal px-5 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-[#04201f] transition-transform duration-300 ease-out-quint active:scale-[0.98] sm:inline-flex"
            >
              {/* direction-aware fill, label + arrow invert */}
              <span
                ref={dlDesktop.fillRef}
                aria-hidden
                style={{ clipPath: HIDDEN_CLIP }}
                className="absolute inset-0 bg-deep-teal-2 transition-[clip-path] duration-[460ms] ease-out-quint"
              />
              <span className="relative z-10 transition-colors duration-300 ease-out-quint group-hover:text-white">
                Download App
              </span>
              <span className="relative z-10 block h-4 w-4 overflow-hidden transition-colors duration-300 ease-out-quint group-hover:text-white">
                <IconArrow className="absolute inset-0 h-4 w-4 transition-transform duration-[420ms] ease-out-quint group-hover:translate-x-[160%]" />
                <IconArrow className="absolute inset-0 h-4 w-4 -translate-x-[160%] transition-transform duration-[420ms] ease-out-quint group-hover:translate-x-0" />
              </span>
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`relative z-50 flex h-10 w-10 items-center justify-center border transition-colors duration-300 lg:hidden ${
                solid
                  ? "border-line text-ink hover:border-ink/40"
                  : "border-white/20 text-white hover:border-white/40"
              }`}
            >
              <span className="sr-only">Menu</span>
              <div className="flex h-4 w-5 flex-col justify-between">
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ease-out-quint ${
                    open ? "translate-y-[7.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-opacity duration-200 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ease-out-quint ${
                    open ? "-translate-y-[7.5px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-ink/20 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <div
          className={`absolute inset-x-0 top-20 origin-top border-b border-line bg-canvas px-5 pb-8 pt-6 shadow-[0_18px_48px_-28px_rgba(0,40,40,0.38)] transition-all duration-400 ease-out-quint sm:top-24 ${
            open
              ? "translate-y-0 opacity-100"
              : "-translate-y-3 opacity-0"
          }`}
        >
          <nav aria-label="Mobile" className="flex flex-col divide-y divide-line">
            {navLinks.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between py-4 font-display text-2xl ${
                    active ? "text-teal" : "text-ink"
                  }`}
                >
                  {l.label}
                  <IconArrow className="h-5 w-5 text-teal" />
                </Link>
              );
            })}
          </nav>
          <div className="mt-7 flex flex-col gap-4">
            <Link
              href={siteConfig.app.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              onMouseEnter={dlDrawer.onMouseEnter}
              onMouseLeave={dlDrawer.onMouseLeave}
              className="group relative inline-flex min-h-[3rem] items-center justify-center gap-2 overflow-hidden rounded-pill border border-aqua bg-teal px-6 py-3 font-semibold text-[#04201f] active:scale-[0.98]"
            >
              <span
                ref={dlDrawer.fillRef}
                aria-hidden
                style={{ clipPath: HIDDEN_CLIP }}
                className="absolute inset-0 bg-deep-teal-2 transition-[clip-path] duration-[460ms] ease-out-quint"
              />
              <span className="relative z-10 transition-colors duration-300 ease-out-quint group-hover:text-white">
                Download the App
              </span>
              <span className="relative z-10 block h-4 w-4 overflow-hidden transition-colors duration-300 ease-out-quint group-hover:text-white">
                <IconArrow className="absolute inset-0 h-4 w-4 transition-transform duration-[420ms] ease-out-quint group-hover:translate-x-[160%]" />
                <IconArrow className="absolute inset-0 h-4 w-4 -translate-x-[160%] transition-transform duration-[420ms] ease-out-quint group-hover:translate-x-0" />
              </span>
            </Link>
            <StoreButtons tone="light" />
          </div>
        </div>
      </div>
    </header>
  );
}
