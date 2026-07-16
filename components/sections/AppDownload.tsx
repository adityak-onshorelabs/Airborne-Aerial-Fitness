import Image from "next/image";
import { Shell, Eyebrow, Cta } from "@/components/ui/primitives";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { QrCode } from "@/components/ui/QrCode";
import { Reveal } from "@/components/ui/Reveal";
import { appDownload, IMG } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export function AppDownload() {
  return (
    <section id="app" className="bg-canvas py-section">
      <Shell>
        <div className="relative overflow-hidden rounded-media bg-[#08201f] px-6 py-14 text-white sm:px-12 sm:py-16 lg:px-16">
          <div className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-6">
              <Reveal>
                <Eyebrow tone="light">{appDownload.eyebrow}</Eyebrow>
                <h2 className="headline mt-6 text-display-md">
                  {appDownload.title}
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                  {appDownload.body}
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <ul className="mt-9 grid max-w-xl grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
                  {appDownload.capabilities.map((c) => (
                    <li
                      key={c}
                      className="flex items-center gap-2.5 text-[0.96rem] text-white/85"
                    >
                      <span
                        aria-hidden
                        className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal/15 text-teal"
                      >
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m5 12 4 4L19 6" />
                        </svg>
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-11 flex flex-col gap-6 border-t border-white/12 pt-8 sm:flex-row sm:items-center">
                  <div className="hidden sm:block">
                    <QrCode label="Scan to download" size={100} tone="light" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <StoreButtons large />
                    <p className="text-[0.82rem] text-white/55">
                      {appDownload.microcopy}
                    </p>
                  </div>
                </div>
                <div className="mt-6 sm:hidden">
                  <Cta href={siteConfig.app.downloadUrl} external variant="primary">
                    {appDownload.cta}
                  </Cta>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={0.12}>
                <div className="mx-auto w-full max-w-xl lg:max-w-none lg:scale-110">
                  <Image
                    src={IMG.appMockup}
                    alt="The Airborne app — home, class booking, and current offers on iPhone"
                    width={1600}
                    height={1200}
                    sizes="(max-width: 1024px) 90vw, 50vw"
                    className="h-auto w-full"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
