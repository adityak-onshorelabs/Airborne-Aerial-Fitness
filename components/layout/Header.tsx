"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/ui/Logo";
import { StoreButtons } from "@/components/ui/StoreButtons";
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

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      {/* Floating pill. Carries its own dark, teal-tinted glass surface so the
          text tone never depends on the section scrolling behind it. Scroll
          only densifies the surface + deepens the shadow. */}
      <div
        className={`pointer-events-auto mx-auto flex max-w-shell items-center justify-between gap-4 rounded-pill border pr-2.5 transition-all duration-500 ease-out-quint ${
          scrolled || open
            ? "h-[3.25rem] pl-4 border-white/[0.12] bg-[rgba(6,20,19,0.78)] shadow-[0_8px_26px_-16px_rgba(0,0,0,0.4)] backdrop-blur-md"
            : "h-16 pl-5 border-white/[0.07] bg-[rgba(6,20,19,0.42)] shadow-[0_6px_22px_-18px_rgba(0,0,0,0.32)] backdrop-blur-md"
        }`}
      >
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
          <Logo
            tone="dark"
            className={`transition-all duration-500 ease-out-quint ${
              scrolled || open ? "h-8" : "h-12"
            }`}
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 lg:flex"
        >
          {navLinks.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`relative text-[0.9rem] transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-teal after:transition-all after:duration-300 ${
                  active
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
            className="group relative hidden min-h-[2.6rem] items-center gap-2 overflow-hidden rounded-pill border border-aqua bg-teal px-5 py-2 text-[0.88rem] font-semibold text-[#04201f] transition-transform duration-300 ease-out-quint active:scale-[0.98] sm:inline-flex"
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
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:border-white/40 lg:hidden"
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
          className={`absolute inset-x-3 top-[calc(1rem+4rem)] origin-top rounded-media bg-canvas px-5 pb-8 pt-6 shadow-[0_18px_48px_-28px_rgba(0,40,40,0.38)] transition-all duration-400 ease-out-quint ${
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
