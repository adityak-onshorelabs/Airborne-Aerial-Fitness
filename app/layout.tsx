import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Display, Montserrat } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { SmoothScrollProvider } from "@/lib/gsap/SmoothScrollProvider";
import "./globals.css";

// Headline / display typeface: elegant high-contrast Caslon. Feeds
// --font-display via the existing --font-fraunces var wiring.
const displaySerif = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fraunces",
  display: "swap",
});

// Body / content typeface. Feeds --font-sans via the existing var wiring.
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#04C0C1",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default:
      "Airborne Aerial Fitness — Premium Aerial & Boutique Fitness Studio in Mumbai",
    template: "%s · Airborne Aerial Fitness",
  },
  description: siteConfig.description,
  keywords: [
    "aerial fitness Mumbai",
    "aerial silk Mumbai",
    "boutique fitness studio Mumbai",
    "aerial hoop",
    "Lower Parel fitness studio",
    "Mazgaon fitness studio",
    "kids aerial fitness",
    "Pilates Mumbai",
    "movement studio",
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.domain,
    siteName: siteConfig.name,
    title:
      "Airborne Aerial Fitness — Discover Fitness Against Gravity",
    description: siteConfig.description,
    images: [
      {
        url: "/assets/og.jpg",
        width: 1200,
        height: 630,
        alt: "Airborne Aerial Fitness — premium aerial and boutique fitness studio in Mumbai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Airborne Aerial Fitness — Discover Fitness Against Gravity",
    description: siteConfig.description,
    images: ["/assets/og.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.domain,
  image: `${siteConfig.domain}/assets/og.jpg`,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  sameAs: [siteConfig.social.instagram],
  areaServed: "Mumbai",
  location: [
    {
      "@type": "Place",
      name: `Airborne Aerial Fitness — ${siteConfig.locations.lowerParel.name}`,
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "CD House, Ground Floor, Mathuradas Mill Compound, Unit No. 2, NM Joshi Marg, Lower Parel",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        postalCode: "400013",
        addressCountry: "IN",
      },
    },
    {
      "@type": "Place",
      name: `Airborne Aerial Fitness — ${siteConfig.locations.mazgaon.name}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "1st Floor, AF Business House, Nesbit Road, Tadwadi, Mazgaon",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        postalCode: "400010",
        addressCountry: "IN",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displaySerif.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Analytics slot — drop your snippet here (brief §13). No tracker wired. */}
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-canvas"
        >
          Skip to content
        </a>
        {/* Header + Cursor stay OUTSIDE the smooth wrapper: position:fixed breaks
            inside ScrollSmoother's transformed #smooth-content. Chrome lives in
            the layout so it persists across route changes; SiteChrome hides it
            on bare landings like /download. */}
        <SiteHeader />
        <SmoothScrollProvider>
          <main id="main">{children}</main>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
