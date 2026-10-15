/* Round 6 masters pipeline: Gofile restaurant folder + uploaded hero shot
 * -> public/images. sharp: auto-rotate, strip ALL metadata (incl. GPS),
 * resize to max width, mozjpeg q80 progressive. Next/image negotiates AVIF/WebP.
 * Originals stay untouched in originals/gofile-restaurant/ and originals/logos/.
 * The uploaded pool shot carries an orange date stamp at ~82-88% height:
 * cropped at 80% height (1600x720), which is a clean hero ratio anyway.
 * dish-matangara.jpg is replaced with the authentic matangara & pap plate
 * (IMG-20261006-WA0060 from the owner's menu assets), per the owner's
 * "matangara dish fix" instruction.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const REST = "/home/z/my-project/originals/gofile-restaurant";
const GO = "/home/z/my-project/scripts/tangison/assets";
const UPLOAD = "/home/z/my-project/upload";
const OUT = "/home/z/my-project/public/images";

const REST_MAP = [
  ["IMG-20261014-WA0414.jpg", "restaurant-interior-counter.jpg", 1600],
  ["IMG-20261014-WA0416.jpg", "restaurant-interior-evening.jpg", 1600],
  ["IMG-20261014-WA0417.jpg", "pool-day-guests-drinks.jpg", 1600],
  ["IMG-20261014-WA0418.jpg", "restaurant-interior-wide.jpg", 1600],
  ["IMG-20261014-WA0423.jpg", "restaurant-bar-sign.jpg", 1600],
  ["IMG-20261014-WA0424.jpg", "pool-day-guest-relax.jpg", 1200],
  ["IMG-20261014-WA0425.jpg", "restaurant-interior-fridges.jpg", 1600],
  ["IMG-20261014-WA0427.jpg", "restaurant-bar-corner.jpg", 1600],
  ["IMG-20261014-WA0429.jpg", "restaurant-bar-taps.jpg", 1600],
  ["IMG-20261014-WA0431.jpg", "restaurant-exterior-banner-dusk.jpg", 1200],
  ["IMG-20261014-WA0433.jpg", "restaurant-exterior-table.jpg", 1200],
  ["IMG-20261014-WA0435.jpg", "restaurant-exterior-entrance-flag.jpg", 1200],
  ["IMG-20261014-WA0437.jpg", "restaurant-exterior-entrance.jpg", 1200],
];

async function build(src, out, width, crop = null) {
  const meta = await sharp(src).metadata();
  let p = sharp(src).rotate();
  if (crop === "datestamp") {
    // uploaded WA0151: 1600x900, stamp occupies y ~735-790. Keep top 80%.
    const cutH = Math.round(meta.height * 0.8);
    p = p.extract({ left: 0, top: 0, width: meta.width, height: cutH });
  }
  if (meta.width > width) p = p.resize({ width, withoutEnlargement: true });
  const info = await p
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toFile(out);
  console.log(`${path.basename(out)}: ${meta.width}x${meta.height} -> ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`);
}

const report = [];
for (const [src, out, width] of REST_MAP) {
  await build(path.join(REST, src), path.join(OUT, out), width);
  report.push(out);
}

// Uploaded hero shot: pool, gardens and lapas, wide. Date stamp cropped off.
await build(path.join(UPLOAD, "IMG-20261014-WA0151.jpg"), path.join(OUT, "hero-pool-gardens.jpg"), 1600, "datestamp");

// Authentic matangara & pap replaces the wrong plate photo, same filename.
await build(path.join(GO, "IMG-20261006-WA0060.jpg"), path.join(OUT, "dish-matangara.jpg"), 1280);

console.log("round6 masters done:", report.length + 2);
