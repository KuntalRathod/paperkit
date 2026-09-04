import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const source = join(publicDir, "paperkit.png");

// Brand background used behind the maskable icon (opaque, so the mask crop looks intentional).
const bgColor = { r: 20, g: 184, b: 166, alpha: 1 }; // #14b8a6 teal accent

async function makeTransparentIcon(size, outName) {
  // Fit the logo into ~78% of the canvas, centered, on a transparent background.
  const inner = Math.round(size * 0.78);
  const logo = await sharp(source)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toFile(join(publicDir, outName));

  console.log("wrote", outName);
}

async function makeMaskableIcon(size, outName) {
  // Maskable needs a safe zone: keep the logo within the inner ~60% so mask crops don't clip it.
  const inner = Math.round(size * 0.6);
  const logo = await sharp(source)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 4, background: bgColor },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toFile(join(publicDir, outName));

  console.log("wrote", outName);
}

async function makeAppleIcon(size, outName) {
  // Apple touch icons must be opaque (no transparency) with the logo centered.
  const inner = Math.round(size * 0.7);
  const logo = await sharp(source)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 4, background: bgColor },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toFile(join(publicDir, outName));

  console.log("wrote", outName);
}

await makeTransparentIcon(192, "icon-192.png");
await makeTransparentIcon(512, "icon-512.png");
await makeMaskableIcon(512, "icon-maskable-512.png");
await makeAppleIcon(180, "apple-touch-icon.png");
console.log("PWA icons generated.");
