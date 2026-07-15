import Image from "next/image";

/**
 * QR block. Encodes siteConfig.app.downloadUrl; the SVG is generated at build
 * time into /public/assets/qr.svg by scripts/generate-qr.mjs.
 */
export function QrCode({
  label,
  size = 116,
  tone = "ink",
  className = "",
}: {
  label?: string;
  size?: number;
  tone?: "ink" | "light";
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div
        className="shrink-0 rounded-2xl bg-white p-2.5 ring-1 ring-black/10"
        style={{ width: size, height: size }}
      >
        <Image
          src="/assets/qr.svg"
          alt="QR code to download the Airborne app"
          width={size}
          height={size}
          className="h-full w-full"
        />
      </div>
      {label && (
        <p
          className={`max-w-[9.5rem] text-[0.82rem] leading-snug ${
            tone === "light" ? "text-white/70" : "text-muted"
          }`}
        >
          {label}
        </p>
      )}
    </div>
  );
}
