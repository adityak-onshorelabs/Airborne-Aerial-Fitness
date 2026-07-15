import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { footer } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { QrCode } from "@/components/ui/QrCode";
import { Shell } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { IconInstagram, IconPin } from "@/components/ui/icons";

export function Footer() {
  const year = new Date().getFullYear();
  const loc = siteConfig.locations;

  return (
    <footer className="border-t border-line bg-surface pt-16">
      <Shell>
        <Reveal className="grid gap-12 pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="light" className="h-9" />
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-muted">
              {footer.brandLine}
            </p>
            <Link
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-[0.9rem] text-muted transition-colors hover:text-ink"
            >
              <IconInstagram className="h-5 w-5" />
              Instagram
            </Link>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-subtle">
              Studios
            </h3>
            <ul className="mt-5 space-y-5">
              {[loc.lowerParel, loc.mazgaon].map((s) => (
                <li key={s.name}>
                  <Link
                    href={s.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-2.5 text-muted transition-colors hover:text-ink"
                  >
                    <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    <span>
                      <span className="font-medium text-ink">{s.name}</span>
                      <span className="mt-1 block text-[0.85rem] leading-snug text-muted">
                        {s.address}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-subtle">
              Get the app
            </h3>
            <div className="mt-5 flex flex-col gap-5">
              <StoreButtons tone="light" />
              <QrCode label="Scan to download" size={92} />
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4 border-t border-line py-7 text-[0.82rem] text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Mumbai.
          </p>
          <div className="flex items-center gap-6">
            <Link href={siteConfig.legal.privacyUrl} className="transition-colors hover:text-ink">
              Privacy Policy
            </Link>
            <Link href={siteConfig.legal.termsUrl} className="transition-colors hover:text-ink">
              Terms
            </Link>
            <Link
              href={`mailto:${siteConfig.contact.email}`}
              className="transition-colors hover:text-ink"
            >
              Contact
            </Link>
          </div>
        </div>
      </Shell>
    </footer>
  );
}
