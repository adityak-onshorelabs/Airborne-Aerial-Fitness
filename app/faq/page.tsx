import type { Metadata } from "next";
import {
  EditorialHero,
  EditorialSection,
  PosterCta,
} from "@/components/editorial/kit";
import { FaqList } from "@/components/editorial/FaqList";
import { IMG } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ — Aerial Fitness, Answered",
  description:
    "Do you need experience? Is aerial safe? What should you wear? Everything you want to know before your first Airborne session in Mumbai.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <EditorialHero
        index="06"
        kicker="Good to Know"
        title={
          <>
            Questions,
            <br />
            answered
          </>
        }
        lede="Everything worth knowing before your first session. Booking, schedules, and memberships all live in the Airborne app."
        image={IMG.aerialDetail}
        imageAlt="Detail of an aerialist's grip at Airborne"
        caption="Grip & line · Airborne"
      />

      <EditorialSection index="07" label="The answers" title="Before you fly.">
        <FaqList />
      </EditorialSection>

      <PosterCta
        kicker="Still curious?"
        title="The rest is in the app."
        cta="Download the App"
        href={siteConfig.app.downloadUrl}
      />
    </>
  );
}
