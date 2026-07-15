/**
 * SINGLE source of truth for every outbound URL and contact detail.
 * Placeholder values are clearly marked. Swap real links here only —
 * never scatter URLs across components (brief §14, §18).
 */

export const siteConfig = {
  name: "Airborne Aerial Fitness",
  shortName: "Airborne",
  domain: "https://airborne.fit", // PLACEHOLDER — set production domain
  description:
    "Mumbai's premium boutique fitness studio for aerial fitness, movement, strength, and confidence. Aerial, Pilates, yoga, functional and kids programs across Lower Parel and Mazgaon.",
  tagline: "Discover Fitness Against Gravity",

  // App download — every transactional CTA routes to these.
  app: {
    // PLACEHOLDER links. Replace with the real store listings.
    appStoreUrl: "https://apps.apple.com/app/airborne-aerial-fitness", // PLACEHOLDER
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=fit.airborne.app", // PLACEHOLDER
    // Smart link the QR code encodes (a deep link / branch link resolving to the
    // right store). Falls back to the site's download section.
    downloadUrl: "https://airborne.fit/app", // PLACEHOLDER
  },

  social: {
    instagram: "https://instagram.com/airborneaerialfitness", // PLACEHOLDER handle
  },

  contact: {
    email: "hello@airborne.fit", // PLACEHOLDER
    phone: "+91 00000 00000", // PLACEHOLDER
  },

  locations: {
    lowerParel: {
      name: "Lower Parel",
      address:
        "CD House, Ground Floor, Mathuradas Mill Compound, Unit No. 2, NM Joshi Marg, next to Antisocial Club, Lower Parel, Mumbai, Maharashtra 400013",
      // PLACEHOLDER — replace with official Maps link from the app.
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Airborne+Aerial+Fitness+Lower+Parel+Mathuradas+Mill+Compound+Mumbai",
    },
    mazgaon: {
      name: "Mazgaon",
      address:
        "1st Floor, AF Business House, Nesbit Road, Tadwadi, Mazgaon, Mumbai, Maharashtra 400010",
      // PLACEHOLDER — replace with official Maps link from the app.
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Airborne+Aerial+Fitness+Mazgaon+Nesbit+Road+Mumbai",
    },
  },

  legal: {
    privacyUrl: "#privacy", // PLACEHOLDER — separate legal page later
    termsUrl: "#terms", // PLACEHOLDER
  },
} as const;

export type SiteConfig = typeof siteConfig;

// Primary nav — dedicated route per page (multi-page site).
export const navLinks = [
  { label: "Aerial", href: "/aerial" },
  { label: "Classes", href: "/classes" },
  { label: "Kids", href: "/kids" },
  { label: "Studios", href: "/studios" },
  { label: "Why Airborne", href: "/why" },
  { label: "FAQ", href: "/faq" },
] as const;
