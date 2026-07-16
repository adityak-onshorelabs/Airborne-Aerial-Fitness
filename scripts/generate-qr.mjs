// Generates the app-download QR as a static SVG into public/assets/qr.svg
// (gitignored — upload the result to ImageKit, where the app reads it from).
// Encodes the download URL from lib/site-config. Run: npm run qr
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import QRCode from "qrcode";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Read the QR target straight from site-config without importing TS.
const cfg = readFileSync(join(root, "lib/site-config.ts"), "utf8");
const match = cfg.match(/qrUrl:\s*"([^"]+)"/);
const url = match ? match[1] : "https://airborne.fit/download";

const svg = await QRCode.toString(url, {
  type: "svg",
  margin: 1,
  errorCorrectionLevel: "M",
  color: { dark: "#08201f", light: "#ffffff" },
});

mkdirSync(join(root, "public/assets"), { recursive: true });
writeFileSync(join(root, "public/assets/qr.svg"), svg);
console.log(`qr.svg written for ${url} — upload it to ImageKit (assets/qr.svg)`);
