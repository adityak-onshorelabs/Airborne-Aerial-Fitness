# Airborne Aerial Fitness — Website

A brand, discovery, and app-conversion website for **Airborne Aerial Fitness**, a premium boutique fitness studio in Mumbai (Lower Parel + Mazgaon). The site establishes Airborne as a leading aerial-fitness destination and a complete boutique studio, and drives visitors to **download the Airborne app**. It contains evergreen content only; all transactional flows (booking, schedules, payments, memberships) live in the app.

## Architecture

A **multi-page** site (Next.js App Router). The home page is a cinematic, scroll-driven showcase; the interior nav pages share a deliberately distinct editorial art language ("The Dossier").

| Route | Purpose |
|-------|---------|
| `/`         | Home — cinematic showcase + hub (hero, brand, signature aerial pin-scene, formats strip, explore grid, community, app, CTA) |
| `/aerial`   | Signature discipline — silk & hoop, what you build, from-zero path, safety |
| `/classes`  | Full format index, how a class runs, levels |
| `/kids`     | Age bands, what kids build, parent reassurance |
| `/studios`  | Locations, first-visit flow, on-site facilities |
| `/why`      | Reasons + the Airborne standard |
| `/faq`      | Editorial accordion |

Shared chrome (Header, custom Cursor, ScrollSmoother wrapper, Footer) lives in `app/layout.tsx` so it persists across route changes. The header shows the active nav link via `usePathname`.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS** with OKLCH design tokens (`app/globals.css`)
- **Framer Motion** scroll reveals + **GSAP** ScrollSmoother/ScrollTrigger for the home pin-scenes (both respect `prefers-reduced-motion`)
- Fonts via `next/font/google`: **Libre Caslon Display** (display) + **Montserrat** (body/labels)

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run qr         # regenerate public/assets/qr.svg from the download URL
```

## Project structure

```
app/
  layout.tsx      fonts, SEO metadata, JSON-LD, shared chrome
  page.tsx        home composition
  aerial|classes|kids|studios|why|faq/page.tsx   interior routes (+ per-page metadata)
  globals.css
components/
  layout/       Header (sticky nav + active link + mobile drawer), Footer, PageHero
  sections/     home sections (Hero, BrandIntro, SignatureAerial, ExploreGrid,
                FormatsStrip, WhyAirborne, Facilities, Locations, AppDownload,
                Community, StudioFormats, AdultsKids, Faq, FinalCta)
  editorial/    interior "Dossier" kit — kit.tsx (EditorialHero, EditorialSection,
                Plate, PosterCta, IndexKicker) + FaqList
  ui/           primitives (Eyebrow, KeyLabel, Cta…), MediaFrame, Parallax,
                StoreButtons, QrCode, Marquee, icons, Logo
lib/
  site-config.ts  ← ALL outbound URLs + contact + locations + nav (edit here only)
  content.ts      ← evergreen copy + the central image manifest (IMG) incl. the
                    hosted-image REMOTE map
  motion.ts       shared animation variants
  gsap/           register + SmoothScrollProvider
public/assets/  imagery, app-screen mockups, store badges, QR (qr.svg)
scripts/        generate-qr.mjs
```

## Store links + QR (single-place edits)

Every App Store / Google Play badge and every QR reads from **`lib/site-config.ts` → `app`**:

```ts
app: {
  appStoreUrl:  "…",   // Apple App Store listing  — used by <StoreButtons/>
  playStoreUrl: "…",   // Google Play listing      — used by <StoreButtons/>
  downloadUrl:  "…",   // smart/deep link the QR encodes; also every "Download" CTA
}
```

1. Paste the real listing URLs into `appStoreUrl` / `playStoreUrl`.
2. Set `downloadUrl` to the smart link (branch/deep link resolving to the right store).
3. Run `npm run qr` to regenerate `public/assets/qr.svg` for the new URL.

> These are currently **placeholders** — the badges and QR render but point at placeholder targets until real URLs are set.

## Swapping content & imagery

- **Imagery** → the `IMG` map in `lib/content.ts`. Real hosted shots live in the `REMOTE` map (ImageKit); the rest are local `/assets/*` placeholders awaiting final Airborne photography. Repoint any slot in one place. All images flow through `next/image` (remote hosts whitelisted in `next.config.mjs`).
- **Copy** → `lib/content.ts` (evergreen only; no pricing/schedules/availability).
- **Testimonials** in `lib/content.ts` are marked `placeholder: true`. Replace with real, approved quotes before public launch.

## Content rules (do not break)

No pricing, plan comparisons, schedules, availability, offers, or booking UI. These change and are owned by the app; every such CTA routes to `siteConfig.app.downloadUrl`.

## Deploy

Deploy-ready for **Vercel** (`vercel.json` included). Push the repo and import, or:

```bash
npx vercel        # preview
npx vercel --prod # production
```

No backend, database, CMS, or app API dependency.

## SEO / a11y / performance

- Per-page metadata + canonicals, Open Graph, Twitter card, favicon, and `LocalBusiness` JSON-LD for both studios (`app/layout.tsx`).
- Semantic landmarks, single `h1` per page, keyboard-navigable nav/drawer/FAQ, visible focus rings, AA contrast, reduced-motion support.
- `next/image` responsive images, lazy below-the-fold; static prerender for every route.
