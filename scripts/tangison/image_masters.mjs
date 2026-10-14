/* Image masters pipeline: selected Gofile keepers -> public/images.
 * - sharp: auto-rotate, strip all metadata (incl. GPS), resize to max 1600w,
 *   mozjpeg quality 80 progressive. Next/image then negotiates AVIF/WebP.
 * - The two 2048px owner shots replace the old Maps-derived property masters
 *   under their existing filenames, so every reference updates at once.
 * - Originals stay untouched in originals/gofile/.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "/home/z/my-project/originals/gofile";
const OUT = "/home/z/my-project/public/images";

const MAP = [
  ["508322631_1409617613570319_6410565214974829809_n.jpg", "property-pool-wide.jpg", 1600],
  ["508430415_1409617976903616_8277810489888008617_n.jpg", "property-lapa.jpg", 1600],
  ["509363649_1409617096903704_3354449825603596406_n.jpg", "swimming-pool-closeup.jpg", 1600],
  ["1000002706.jpg", "room-double-wardrobe.jpg", 816],
  ["IMG-20261006-WA0079.jpg", "room-kitchenette.jpg", 960],
  ["IMG-20261014-WA0036.jpg", "thatched-lapa-orange-wall.jpg", 1024],
  ["IMG-20261014-WA0039.jpg", "braai-fireplace-thatch.jpg", 1024],
  ["IMG-20261014-WA0035.jpg", "picnic-table-tree.jpg", 1024],
  ["IMG-20261013-WA0068.jpg", "breakfast-board-wors.jpg", 1024],
  ["IMG-20261014-WA0002.jpg", "breakfast-eggs-beans.jpg", 1024],
  ["IMG-20261006-WA0054.jpg", "dish-samoosa.jpg", 1200],
  ["IMG-20261014-WA0053.jpg", "evening-patio-dining.jpg", 1000],
  ["IMG-20261014-WA0069.jpg", "entertainment-pool-table.jpg", 1080],
  ["IMG-20261014-WA0059.jpg", "patio-bar-counter.jpg", 1000],
  ["IMG-20261013-WA0069.jpg", "guesthouse-exterior-deck.jpg", 1280],
  ["IMG-20261006-WA0082.jpg", "dish-matangara.jpg", 1280],
];

const report = [];
for (const [src, out, width] of MAP) {
  const from = path.join(SRC, src);
  const to = path.join(OUT, out);
  const before = fs.statSync(from).size;
  const meta = await sharp(from).metadata();
  let p = sharp(from).rotate();
  if (meta.width > width) p = p.resize({ width, withoutEnlargement: true });
  const info = await p
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toFile(to);
  report.push({ out, from: `${meta.width}x${meta.height} ${(before / 1024).toFixed(0)}KB`, to: `${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB` });
}
for (const r of report) console.log(`${r.out}: ${r.from} -> ${r.to}`);
console.log("masters done:", report.length);
