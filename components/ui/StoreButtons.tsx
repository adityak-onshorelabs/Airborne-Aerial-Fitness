import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

/* Official App Store + Google Play badge lockups (ImageKit). Apple badge
   flips black/white by surface tone; the Google badge is one colour lockup. */

const IK = "https://ik.imagekit.io/adityakamarouthu/Onshorelabs/Airborne/assets";
const APPLE_WHT = `${IK}/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg`;
const APPLE_BLK = `${IK}/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg`;
const GOOGLE = `${IK}/GetItOnGooglePlay_Badge_Web_color_English.svg`;

export function StoreButtons({
  large = false,
  tone = "dark",
  className = "",
}: {
  large?: boolean;
  /** Surface the badges sit on: "dark" → white Apple badge, "light" → black. */
  tone?: "dark" | "light";
  className?: string;
}) {
  // Google's Web badge sits tighter in its box than Apple's, so a slightly
  // smaller height makes the two visible buttons match.
  const appleH = large ? "h-[3.25rem]" : "h-11";
  const googleH = large ? "h-12" : "h-10";
  const apple = tone === "light" ? APPLE_BLK : APPLE_WHT;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Link
        href={siteConfig.app.appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
        className="inline-flex transition-transform duration-300 ease-out-quint hover:-translate-y-0.5"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={apple} alt="Download on the App Store" className={`${appleH} w-auto`} />
      </Link>
      <Link
        href={siteConfig.app.playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get it on Google Play"
        className="inline-flex transition-transform duration-300 ease-out-quint hover:-translate-y-0.5"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={GOOGLE} alt="Get it on Google Play" className={`${googleH} w-auto`} />
      </Link>
    </div>
  );
}
