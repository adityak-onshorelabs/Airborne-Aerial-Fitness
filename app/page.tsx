import { Hero } from "@/components/sections/Hero";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { SignatureAerial } from "@/components/sections/SignatureAerial";
import { FormatsStrip } from "@/components/sections/FormatsStrip";
import { ExploreGrid } from "@/components/sections/ExploreGrid";
import { AppDownload } from "@/components/sections/AppDownload";
import { Community } from "@/components/sections/Community";

// Home is the showcase + hub: it sells the brand, then hands off to the
// dedicated interior pages (Aerial, Classes, Kids, Studios, Why, FAQ) via the
// explore grid and the primary nav.
export default function Home() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <SignatureAerial />
      <FormatsStrip />
      <ExploreGrid />
      <Community />
      <AppDownload />
    </>
  );
}
