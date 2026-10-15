/* Round 9 masters pipeline: place EVERY remaining owner photo on the site.
 * - room-double-wardrobe.jpg: rebuilt at 1600w (was an 816w thumbnail of the
 *   8160x6120 DSLR original; EXIF-rotated portrait).
 * - property-pool-wide.jpg: rebuilt with the bottom 10% cropped so the baked-in
 *   "Galaxy S24" watermark (bottom right) is gone.
 * - plate-yellow-rice-curry.jpg + plate-pap-braise.jpg: new honest slugs for
 *   two food masters that previously sat unused under misleading names
 *   (guesthouse-exterior-deck.jpg was actually a plate of yellow rice, spinach
 *   and curry; breakfast-board-wors.jpg was actually pap with braised meat).
 *   The misleading files are deleted after the rebuild.
 * sharp: auto-rotate, strip ALL metadata (incl. GPS), mozjpeg q80 progressive.
 * Originals stay untouched in originals/gofile/.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const GO = "/home/z/my-project/originals/gofile";
const OUT = "/home/z/my-project/public/images";

async function build(src, out, width, crop = null) {
  const meta = await sharp(src).metadata();
  let p = sharp(src).rotate();
  if (crop === "watermark") {
    // property-pool-wide: 2048x1150 -> 1600x898 master; stamp sits in the
    // bottom 10%. Keep the top 90% of the FINAL raster.
    const buf = await p.resize({ width, withoutEnlargement: true }).toBuffer();
    const m = await sharp(buf).metadata();
    p = sharp(buf).extract({ left: 0, top: 0, width: m.width, height: Math.round(m.height * 0.9) });
  }
  if (crop !== "watermark" && meta.width > width) p = p.resize({ width, withoutEnlargement: true });
  const info = await p.jpeg({ quality: 80, progressive: true, mozjpeg: true }).toFile(out);
  console.log(`${path.basename(out)}: ${meta.width}x${meta.height} -> ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`);
}

// DSLR double room with built-in cupboards: rebuild at a real width.
await build(path.join(GO, "1000002706.jpg"), path.join(OUT, "room-double-wardrobe.jpg"), 1600);
// Pool terrace wide: crop off the Galaxy S24 watermark.
await build(path.join(GO, "508322631_1409617613570319_6410565214974829809_n.jpg"), path.join(OUT, "property-pool-wide.jpg"), 1600, "watermark");
// Two plates under honest names.
await build(path.join(GO, "IMG-20261013-WA0069.jpg"), path.join(OUT, "plate-yellow-rice-curry.jpg"), 1280);
await build(path.join(GO, "IMG-20261013-WA0068.jpg"), path.join(OUT, "plate-pap-braise.jpg"), 1024);

// Remove the misleading dead files (nothing references them).
for (const f of ["guesthouse-exterior-deck.jpg", "breakfast-board-wors.jpg"]) {
  const p = path.join(OUT, f);
  if (fs.existsSync(p)) fs.unlinkSync(p);
  console.log("deleted", f);
}
console.log("round9 masters done");
