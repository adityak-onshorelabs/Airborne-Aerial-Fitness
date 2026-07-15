import { ParallaxMedia } from "@/components/ui/Parallax";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { QrCode } from "@/components/ui/QrCode";
import { Cta } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { finalCta, IMG } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#061615] text-white">
      <ParallaxMedia
        src={IMG.finalCta}
        alt="An Airborne aerialist suspended against a dark, cinematic studio backdrop"
        className="absolute inset-0"
        sizes="100vw"
        overlay="cinematic"
        intensity={10}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_120%,rgba(4,20,20,0.85),rgba(4,20,20,0.35))]"
      />
      <div className="relative mx-auto flex max-w-shell flex-col items-center px-5 py-section text-center sm:px-8">
        <Reveal>
          <h2 className="headline mx-auto max-w-[14ch] text-display-xl">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-white/80">
            {finalCta.body}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-col items-center gap-8">
            <Cta href={siteConfig.app.downloadUrl} external variant="primary">
              {finalCta.cta}
            </Cta>
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
              <StoreButtons large />
              <div className="hidden h-14 w-px bg-white/15 sm:block" />
              <QrCode label={finalCta.qrLabel} size={100} tone="light" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
