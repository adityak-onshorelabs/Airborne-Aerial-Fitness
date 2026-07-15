"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/ui/Cursor";

// Routes that render as bare, chrome-less landings (no nav, no footer, no
// custom cursor) — e.g. the QR /download page.
const BARE = ["/download"];
const isBare = (path: string) => BARE.some((p) => path === p || path.startsWith(`${p}/`));

export function SiteHeader() {
  const pathname = usePathname();
  if (isBare(pathname)) return null;
  return (
    <>
      <Header />
      <Cursor />
    </>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  if (isBare(pathname)) return null;
  return <Footer />;
}
