// Round v3: place the 10 remaining owner photos (camping x4, conference x4,
// bar x2) into public/images at web weight. Hard cap: 250KB per optimized
// file (brief rule). Metadata stripped, mozjpeg, quality ladder until fit.
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ROOT = "/home/z/my-project";
const JOBS = [
  // [source, dest, targetWidth]
  ["guesthouse/bar/big-brother-guesthouse-usakos-thatched-bar-and-pool-table-day.jpg", "public/images/bar-thatched-day.jpg", 1600],
  ["guesthouse/bar/big-brother-guesthouse-usakos-thatched-bar-evening.jpg", "public/images/bar-thatched-evening.jpg", 1600],
  ["guesthouse/conference/big-brother-guesthouse-usakos-conference-room-tables-and-chairs.jpg", "public/images/conference-tables-chairs.jpg", 1600],
  ["guesthouse/conference/big-brother-guesthouse-usakos-conference-room-long-table-in-sunlight.jpg", "public/images/conference-long-table.jpg", 1200],
  ["guesthouse/conference/big-brother-guesthouse-usakos-conference-room-windows-and-refreshments.jpg", "public/images/conference-refreshments.jpg", 1600],
  ["guesthouse/conference/big-brother-guesthouse-usakos-conference-room-whiteboard-and-seating.jpg", "public/images/conference-whiteboard.jpg", 1200],
  ["guesthouse/camping/big-brother-guesthouse-usakos-campsite-shade-tree-and-picnic-bench.jpg", "public/images/camping-picnic-bench.jpg", 1400],
  ["guesthouse/camping/big-brother-guesthouse-usakos-campsite-tree-with-light-and-drum.jpg", "public/images/camping-tree-drum.jpg", 1200],
  ["guesthouse/camping/big-brother-guesthouse-usakos-campsite-shade-tree-in-the-grounds.jpg", "public/images/camping-shade-tree.jpg", 1600],
  ["guesthouse/camping/big-brother-guesthouse-usakos-campsite-grounds-with-shade-trees-and-thatch.jpg", "public/images/camping-grounds-thatch.jpg", 1600],
];
const CAP = 250 * 1024;

for (const [src, dest, width] of JOBS) {
  const out = join(ROOT, dest);
  mkdirSync(dirname(out), { recursive: true });
  let quality = 80;
  let buf;
  for (;;) {
    buf = await sharp(join(ROOT, src))
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:2:0" })
      .toBuffer();
    if (buf.length <= CAP || quality <= 45) break;
    quality -= 5;
  }
  const meta = await sharp(buf).metadata();
  writeFileSync(out, buf); // write the measured buffer verbatim, no re-encode
  const kb = (buf.length / 1024).toFixed(0);
  const flag = buf.length > CAP ? " OVER CAP" : " ok";
  console.log(`${dest}  ${meta.width}x${meta.height}  q${quality}  ${kb}KB${flag}`);
}
