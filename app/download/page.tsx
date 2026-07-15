import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { Cta } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Download the Airborne App",
  description:
    "Get the Airborne Aerial Fitness app — book sessions, view schedules, and manage your membership. Available on the App Store and Google Play.",
  alternates: { canonical: "/download" },
};

export default function DownloadPage() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#08201f] px-6 py-28 text-center text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,216,215,0.16),transparent_66%)] blur-2xl"
      />
      <Reveal className="relative flex w-full max-w-md flex-col items-center">
        <Logo tone="dark" className="h-12" />

        <h1 className="headline mt-10 text-[clamp(2.4rem,7vw,3.5rem)] leading-[1.02]">
          Get the Airborne app
        </h1>
        <p className="mt-5 max-w-sm text-white/75">
          Book sessions, view live schedules, and manage your membership — all in
          one place. Choose your platform below.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <StoreButtons large tone="dark" className="justify-center" />
          <p className="text-[0.82rem] text-white/55">
            Free to download · iOS and Android
          </p>
        </div>

        <div className="mt-12 flex w-full flex-col items-center gap-4 border-t border-white/12 pt-10">
          <p className="text-[0.82rem] text-white/55">
            Want to know more about Airborne first?
          </p>
          <Cta href="/" variant="ghost-light">
            Visit the website
          </Cta>
        </div>
      </Reveal>
    </section>
  );
}
