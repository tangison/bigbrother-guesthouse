/* Round 7 fix: matangara restore (owner correction, 15 Oct 2026).
 * Owner marked the live "Matangara & pap" card with an X: "This is not
 * matangara. The one you removed is the matangara. That is mopane worms
 * and pap." Verified by eye: the plate we served under Matangara (round 6,
 * WA0060) is indeed MOPANI WORMS & pap - which is its own real menu item
 * (N$100). The real matangara (tripe in tomato gravy with pap) is
 * IMG-20261006-WA0082, the photo round 6 removed. Restore it as
 * dish-matangara.jpg and keep the mopani-worms plate as its own card.
 * Same pipeline as round 6: sharp rotate, strip ALL metadata, max width,
 * mozjpeg q80 progressive. Originals untouched in originals/gofile/.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const GO = "/home/z/my-project/originals/gofile";
const OUT = "/home/z/my-project/public/images";

async function build(src, out, width, crop = null) {
  const meta = await sharp(src).metadata();
  let p = sharp(src).rotate();
  if (crop === "datestamp") {
    const cutH = Math.round(meta.height * 0.8);
    p = p.extract({ left: 0, top: 0, width: meta.width, height: cutH });
  }
  if (meta.width > width) p = p.resize({ width, withoutEnlargement: true });
  const info = await p
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toFile(out);
  console.log(`${path.basename(out)}: ${meta.width}x${meta.height} -> ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`);
}

// 1. Keep the mopani-worms plate under its own name (it is already a built
//    master: metadata stripped, mozjpeg q80). Copy before overwriting.
fs.copyFileSync(path.join(OUT, "dish-matangara.jpg"), path.join(OUT, "dish-mopani.jpg"));
console.log("dish-mopani.jpg: preserved from previous dish-matangara.jpg");

// 2. The real matangara (owner-confirmed) replaces dish-matangara.jpg.
await build(path.join(GO, "IMG-20261006-WA0082.jpg"), path.join(OUT, "dish-matangara.jpg"), 1280);

// 3. dish-traditional.jpg is no longer referenced anywhere in src/.
fs.rmSync(path.join(OUT, "dish-traditional.jpg"));
console.log("dish-traditional.jpg: removed (was the mopani plate, mislabelled)");

console.log("round7 matangara fix done");
