/* Owner round-5 pipeline: use ALL supplied Gofile photos.
 * - Every real photo becomes a master in public/images (semantic slug).
 * - Rejected: 3 Gemini AI renders, 4 WhatsApp screenshots/collages, 1 motion blur.
 * - Already-mastered files are skipped (16 from the previous round).
 * - IMG_<digits>.JPG frames carry a baked-in date stamp bottom-right: crop 6% bottom.
 * - Near-black night shots get a mild brightness lift.
 * - Metadata stripped (incl. GPS), auto-rotate, mozjpeg q80 progressive.
 * - Emits src/lib/gallery-data.ts (slug, w, h, group, alt) + masters_report.json.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "/home/z/my-project/originals/gofile";
const OUT = "/home/z/my-project/public/images";
const LIB = "/home/z/my-project/src/lib/gallery-data.ts";
const REPORT = "/home/z/my-project/originals/masters_report.json";

// ---- already masters from the previous round (do not rebuild) ----
const SKIP = new Set([
  "508322631_1409617613570319_6410565214974829809_n.jpg",
  "508430415_1409617976903616_8277810489888008617_n.jpg",
  "509363649_1409617096903704_3354449825603596406_n.jpg",
  "1000002706.jpg",
  "IMG-20261006-WA0054.jpg",
  "IMG-20261006-WA0079.jpg",
  "IMG-20261006-WA0082.jpg",
  "IMG-20261013-WA0068.jpg",
  "IMG-20261013-WA0069.jpg",
  "IMG-20261014-WA0002.jpg",
  "IMG-20261014-WA0035.jpg",
  "IMG-20261014-WA0036.jpg",
  "IMG-20261014-WA0039.jpg",
  "IMG-20261014-WA0053.jpg",
  "IMG-20261014-WA0059.jpg",
  "IMG-20261014-WA0069.jpg",
]);

// ---- not real photographs: AI renders, screenshots, collages, blur ----
const REJECT = new Set([
  "Gemini_Generated_Image_96v5na96v5na96v5.png",
  "Gemini_Generated_Image_h9ipiph9ipiph9ip.png",
  "Gemini_Generated_Image_qjpfbgqjpfbgqjpf.png",
  "IMG-20261007-WA0007.jpg",
  "IMG-20261013-WA0054.jpg",
  "IMG-20261013-WA0074.jpg",
  "IMG-20261013-WA0075.jpg",
  "IMG-20261013-WA0078.jpg",
  "IMG-20261014-WA0017.jpg",
  // failed downloads saved as HTML error pages, not photos
  "IMG-20261014-WA0075.jpg",
  "IMG-20261014-WA0081.jpg",
  "IMG-20261014-WA0109.jpg",
]);

// slug, group, alt, maxWidth, brightness (1 = untouched)
const M = [
  ["1000002703.jpg", "room-twin-television", "rooms", "Twin beds with a television, wall art and warm curtains", 1600, 1],
  ["GH-02.jpg", "bathroom-corner-bath", "rooms", "Bathroom with a corner bath, shower and towels", 1000, 1],
  ["IMG-20261013-WA0062.jpg", "room-twin-wooden-headboard", "rooms", "Twin room with wooden headboards and a teal throw", 1024, 1],
  ["IMG-20261014-WA0064.jpg", "room-corner-television", "rooms", "Room corner with television, kettle and en suite door", 1200, 1],
  ["IMG-20261014-WA0066.jpg", "room-desk-television", "rooms", "Room with a work desk, mirror and wall television", 1200, 1],
  ["IMG-20261014-WA0067.jpg", "kitchenette-microwave-fridge", "rooms", "Kitchenette with microwave, fridge and sink", 1200, 1],
  ["IMG-20261014-WA0068.jpg", "kitchenette-checkered-counter", "rooms", "Kitchenette counter with kettle and patterned cloth", 1200, 1],
  ["IMG-20261014-WA0070.jpg", "kitchenette-sink-microwave", "rooms", "Kitchenette with sink, microwave and crockery", 1200, 1],
  ["IMG-20261014-WA0089.jpg", "bathroom-toilet-basin", "rooms", "Bathroom with toilet and wash basin", 1200, 1],
  ["IMG_1856.JPG", "room-double-kitchenette-corner", "rooms", "Double bed with kitchenette and wardrobe in the corner", 1600, 1],
  ["IMG-20261014-WA0094.jpg", "room-entrance-brick-paving", "rooms", "Room entrance with brick paving and shade cloth", 1280, 1],
  ["IMG-20261014-WA0100.jpg", "bathroom-shower-basin", "rooms", "Tiled shower room with basin and mirror", 1200, 1],
  ["IMG-20261014-WA0107.jpg", "room-doorway-bed", "rooms", "Open doorway onto a made-up bed", 1200, 1],
  ["IMG-20261014-WA0112.jpg", "room-aircon-curtains", "rooms", "Room with air-conditioner and dark curtains", 1200, 1],
  ["IMG_1845.JPG", "room-wardrobe-mirror", "rooms", "Room with wardrobe, mirror and tiled floor", 1600, 1],
  ["IMG_1846.JPG", "room-double-grey-throw", "rooms", "Double bed with grey throw and bedside lamp", 1600, 1],
  ["IMG_1851.JPG", "room-single-dark-curtains", "rooms", "Single room with dark curtains and white linen", 1600, 1],
  ["IMG_1852.JPG", "room-twin-blue-runners", "rooms", "Twin beds with blue runners and floral art", 1600, 1],
  ["IMG_1853.JPG", "room-kitchenette-beds", "rooms", "Room with kitchenette counter beside the beds", 1600, 1],
  ["IMG_1858.JPG", "room-double-desk-minibar", "rooms", "Double room with a work desk and minibar", 1600, 1],
  ["IMG_1859.JPG", "room-double-aircon", "rooms", "Double room with air-conditioner and bedside tables", 1600, 1],
  ["IMG_1860.JPG", "room-twin-orange-runner", "rooms", "Twin beds by a bright window with an orange runner", 1600, 1],
  ["IMG_1862.JPG", "pool-lapa-mountains", "pools", "Thatched lapa and pool with the hills behind", 1600, 1],
  ["IMG_1865.JPG", "room-single-wooden-bed", "rooms", "Single bed with a wooden frame and orange chair", 1600, 1],
  ["IMG_1866.JPG", "room-single-towel-fold", "rooms", "Single bed with a folded towel and wall mirror", 1600, 1],
  ["IMG_1867.JPG", "room-bed-towel-rail", "rooms", "Bed beside the towel rail and shower curtain", 1600, 1],
  ["IMG_1871.JPG", "plot-road-cactus-view", "grounds", "The plot from the road with cacti and the bungalow", 1600, 1],
  ["o.jpeg", "room-single-window-light", "rooms", "Simple room with a bed beside a bright window", 810, 1.12],
  ["IMG-20261013-WA0059.jpg", "lapa-morning-orange-wall", "grounds", "Thatched lapa over gravel parking in the morning light", 1200, 1],
  ["1000002711.jpg", "patio-green-shade-floor", "grounds", "Shaded patio with tables on the painted stone floor", 1200, 1],
  ["IMG_1794.JPG", "building-lapa-flag", "grounds", "Yellow building with its thatched lapa roof", 1584, 1],
  ["IMG_1800.JPG", "garden-cacti-white-stones", "grounds", "Tall cacti in a bed edged with white stones", 1584, 1],
  ["IMG_1802.JPG", "cactus-garden-roadside", "grounds", "Cactus garden beside the gravel road", 1584, 1],
  ["IMG_1807.JPG", "welcome-signs-gate", "grounds", "Welcome boards at the property entrance", 1584, 1],
  ["IMG_1809.JPG", "entrance-gates-welcome", "grounds", "Yellow entrance gates with the welcome boards", 1584, 1],
  ["IMG_1810.JPG", "building-main-yellow", "grounds", "Main guesthouse building painted yellow and green", 1584, 1],
  ["IMG_1811.JPG", "fence-cactus-garden", "grounds", "Picket fence along the cactus garden", 1584, 1],
  ["IMG_1814.JPG", "tree-shade-parking", "grounds", "Big shade tree over the parking", 1584, 1],
  ["IMG_1816.JPG", "unit-green-shade-net", "grounds", "Room shaded under a green net", 1584, 1],
  ["IMG_1817.JPG", "shade-sail-firepit", "grounds", "Green shade sail over the firepit courtyard", 1584, 1],
  ["IMG_1819.JPG", "animal-camp-fence", "animals", "Fenced animal camp on the plot", 1584, 1],
  ["IMG_1820.JPG", "bar-thatch-menu-board", "grounds", "Thatched bar with the Big Brother menu board", 1584, 1],
  ["IMG_1822.JPG", "lapa-shade-sails-pool", "grounds", "Thatched lapa and shade sails over the pool", 1584, 1],
  ["IMG_1826.JPG", "braai-under-shade-sail", "grounds", "Braai fireplace under the green shade sail", 1584, 1],
  ["IMG_1827.JPG", "tree-shade-between-rooms", "grounds", "Big tree and shade sails in the back yard", 1584, 1],
  ["IMG_1828.JPG", "garden-path-rooms", "grounds", "Garden path leading to the rooms", 1584, 1],
  ["IMG_1830.JPG", "lawn-lapas-trees", "grounds", "Lawn with thatched lapas and trees", 1584, 1],
  ["IMG_1831.JPG", "thatch-umbrellas-lawn", "grounds", "Row of thatched umbrellas on the lawn", 1584, 1],
  ["IMG_1833.JPG", "palm-trees-lapas", "grounds", "Palm trees between the lapa and the lawn", 1584, 1],
  ["IMG_1834.JPG", "umbrella-garden-path", "grounds", "Thatched umbrella at the garden path", 1584, 1],
  ["IMG_1872.JPG", "welcome-signs-entrance", "grounds", "Welcome boards flanking the entrance road", 1584, 1],
  ["IMG_1873.JPG", "cactus-bed-white-stones", "grounds", "Cactus bed between white stones", 1584, 1],
  ["IMG_1874.JPG", "cactus-fence-roadside", "grounds", "Cactus fence running along the road", 1584, 1],
  ["IMG_1883.JPG", "shade-sail-entrance", "grounds", "Green shade sail over the entrance parking", 1584, 1],
  ["IMG-20261014-WA0033.jpg", "lapa-lawn-braai", "grounds", "Thatched umbrella and braai corner on the lawn", 1024, 1],
  ["IMG-20261014-WA0034.jpg", "picnic-stone-table", "grounds", "Wooden picnic table beside the stone table under the tree", 1024, 1],
  ["IMG_2520.JPG", "garden-shade-tree", "grounds", "Shade tree between the garden and the wall", 1584, 1],
  ["1000002710.jpg", "pool-umbrellas-lapas", "pools", "Swimming pool with umbrellas and thatched lapas", 1600, 1],
  ["IMG_1832.JPG", "pool-lawn-thatch-umbrella", "pools", "Pool edge with lawn and thatched umbrella", 1584, 1],
  ["IMG_1836.JPG", "pool-lapa-shaded-patio", "pools", "Pool beside the shaded lapa patio", 1584, 1],
  ["IMG_1863.JPG", "room-twin-green-throws", "rooms", "Twin beds with green throws and blue wall art", 1584, 1],
  ["IMG_2512.JPG", "pool-green-umbrellas", "pools", "Pool with green umbrellas and loungers", 1584, 1],
  ["IMG_2513.JPG", "pool-deck-umbrella", "pools", "Pool deck with umbrella and loungers", 1584, 1],
  ["IMG_2516.JPG", "pool-loungers-orange-wall", "pools", "Pool with loungers and shade umbrellas against the hills", 1584, 1],
  ["IMG_2517.JPG", "pool-shade-sails-yellow-wall", "pools", "Pool under shade sails beside the yellow wall", 1584, 1],
  ["IMG_2518.JPG", "pool-trees-loungers", "pools", "Pool with loungers under the trees", 1584, 1],
  ["IMG_2519.JPG", "pool-garden-umbrellas", "pools", "Pool and garden with shade umbrellas", 1584, 1],
  ["IMG_2521.JPG", "pool-white-loungers", "pools", "Pool with white loungers and thatch shade", 1584, 1],
  ["IMG-20261006-WA0099.jpg", "pancake-paddles-grey-table", "food", "Three mini pancakes on wooden paddles", 1600, 1],
  ["IMG-20261006-WA0103.jpg", "plate-steak-chips-salad", "food", "Steak, chips and salad on a Big Brothers plate", 1600, 1],
  ["IMG-20261007-WA0025.jpg", "platter-fish-eggs-salads", "food", "Whole fish platter with eggs, rice and salads", 1600, 1],
  ["IMG-20261013-WA0056.jpg", "plate-grilled-chicken", "food", "Grilled chicken with salad and lemon", 768, 1],
  ["IMG-20261013-WA0057.jpg", "plate-steak-onion-rings", "food", "Steak topped with onion rings", 768, 1],
  ["IMG-20261013-WA0058.jpg", "tray-breakfast-eggs-sausage", "food", "Breakfast tray with eggs, sausage and toast", 1024, 1],
  ["IMG-20261013-WA0060.jpg", "platter-breakfast-mushrooms", "food", "Breakfast platter with eggs, mushrooms and toast", 1024, 1],
  ["IMG-20261013-WA0063.jpg", "plate-steak-chips-peppers", "food", "Steak and chips with grilled peppers", 768, 1],
  ["IMG-20261013-WA0064.jpg", "plate-chicken-rice-salad", "food", "Chicken pieces with rice and greek salad", 768, 1],
  ["IMG-20261013-WA0066.jpg", "platter-chicken-onions", "food", "Carved chicken with onion rings on a platter", 1024, 1],
  ["IMG-20261013-WA0069.jpg", "plate-pap-spinach", "food", "Pap and spinach served the traditional way", 768, 1],
  ["IMG-20261013-WA0070.jpg", "plate-french-toast", "food", "French toast triangles with tomato and cucumber", 768, 1],
  ["IMG-20261013-WA0077.jpg", "tray-ribs-chips", "food", "Ribs and chips on a black tray", 1600, 1],
  ["IMG-20261014-WA0000.jpg", "pancake-wedges-cinnamon", "food", "Pancake cut in wedges with cinnamon sugar", 768, 1],
  ["IMG-20261014-WA0001.jpg", "omelette-toast-plate", "food", "Omelette with buttered toast triangles", 768, 1],
  ["IMG-20261014-WA0003.jpg", "mini-pancakes-paddle", "food", "Three mini pancakes on a paddle board", 768, 1],
  ["IMG-20261014-WA0041.jpg", "crew-couple-bar-tv", "crew", "Two of the team at the bar", 1024, 1],
  ["IMG-20261014-WA0043.jpg", "platter-wings-chips", "food", "Chicken wings and chips with lemon", 768, 1],
  ["IMG-20261014-WA0044.jpg", "pancake-stuffed-plate", "food", "Stuffed pancake on a white plate", 768, 1],
  ["IMG-20261013-WA0071.jpg", "cocktail-blue-goblet", "drinks", "Blue cocktail in a balloon glass", 960, 1],
  ["IMG-20261013-WA0072.jpg", "cocktail-orange-leaf", "drinks", "Orange cocktail with a fresh leaf", 896, 1],
  ["IMG-20261013-WA0073.jpg", "drink-lemon-ice", "drinks", "Lemon cooler with ice on the table", 736, 1],
  ["IMG_1835.JPG", "goats-camp-fence", "animals", "Goats in their camp by the fence", 1584, 1],
  ["IMG_1875.JPG", "alpaca-white-standing", "animals", "White alpaca standing in the camp", 1584, 1],
  ["IMG_1876.JPG", "alpacas-feeding", "animals", "Alpacas at the feeding trough", 1584, 1],
  ["IMG_1877.JPG", "alpaca-brown-trough", "animals", "Brown alpaca at the red feeding trough", 1584, 1],
  ["IMG_1878.JPG", "alpaca-lying-shade", "animals", "Alpaca resting in the shade", 1584, 1],
  ["IMG_1879.JPG", "turkey-white-feathers", "animals", "White turkey strutting past the coop", 1584, 1],
  ["IMG_1880.JPG", "alpacas-two-grazing", "animals", "Two white alpacas grazing together", 1584, 1],
  ["IMG_1881.JPG", "ducks-ducklings-water", "animals", "Ducks with ducklings on the garden pond", 1584, 1],
  ["IMG_1882.JPG", "ducks-shelter-corner", "animals", "Ducks resting at the shelter corner", 1584, 1],
  ["IMG-20261014-WA0013.jpg", "pool-night-floodlit", "night", "Floodlit pool after dark", 1000, 1],
  ["IMG-20261014-WA0018.jpg", "bakkie-carport-night", "night", "Bakkie parked under the carport at night", 1080, 1],
  ["IMG-20261014-WA0019.jpg", "garden-night-lights", "night", "Garden and units lit up at night", 1080, 1.18],
  ["IMG-20261014-WA0021.jpg", "trees-floodlit-night", "night", "Trees lit by the garden lights", 1080, 1.18],
  ["IMG-20261014-WA0022.jpg", "walkway-night-lamps", "night", "Walkway to the rooms after dark", 1080, 1.18],
  ["IMG-20261014-WA0023.jpg", "pool-night-path", "night", "Night path past the pool", 1080, 1.15],
  ["IMG-20261014-WA0025.jpg", "water-tank-night", "night", "Stone water tank under the night lights", 1080, 1.18],
  ["IMG-20261014-WA0026.jpg", "pool-night-umbrellas", "night", "Pool and lit umbrellas after dark", 1080, 1],
  ["IMG-20261014-WA0052.jpg", "courtyard-night-umbrellas", "night", "Blue umbrellas over the night courtyard", 1080, 1],
  ["IMG-20261014-WA0055.jpg", "pool-lapa-night", "night", "Pool and lapa lit up at night", 1080, 1.15],
  ["IMG-20261014-WA0056.jpg", "pool-table-night-stone", "night", "Pool table area on the stone floor at night", 1080, 1],
  ["IMG-20261014-WA0061.jpg", "unit-night-green-door", "night", "Room with the light on at night", 1080, 1],
  ["IMG-20261014-WA0063.jpg", "pool-table-night", "night", "Pool table under the lapa roof at night", 1080, 1],
  ["IMG-20261014-WA0106.jpg", "room-night-glow", "night", "Warm room light spilling into the night", 1200, 1.18],
  ["IMG-20261014-WA0111.jpg", "doorway-night-warm", "night", "Doorway glowing warm after dark", 1200, 1.18],
  ["IMG-20261014-WA0115.jpg", "room-night-calm", "night", "Quiet room light at night", 1200, 1.25],
  ["IMG-20261014-WA0119.jpg", "path-night-room", "night", "Path to the room lit at night", 1200, 1.25],
  ["IMG-20261014-WA0004.jpg", "table-group-balloons", "crew", "Friends around a dressed table with balloons", 1024, 1],
  ["IMG-20261014-WA0005.jpg", "guest-garden-dress", "crew", "Guest in traditional dress in the garden", 768, 1],
  ["IMG-20261014-WA0015.jpg", "breakfast-under-lapa", "crew", "Breakfast served under the shade sail", 768, 1],
  ["IMG-20261014-WA0027.jpg", "lunch-table-friends", "crew", "Friends sharing lunch on the patio", 1042, 1],
  ["IMG-20261014-WA0028.jpg", "couple-at-the-bar", "crew", "Couple enjoying the evening at the bar", 768, 1],
  ["IMG-20261014-WA0030.jpg", "lunch-green-table", "crew", "Lunch on the green patio tables", 810, 1],
  ["IMG-20261014-WA0031.jpg", "drinks-yellow-dress", "crew", "Afternoon drinks on the patio", 810, 1],
  ["IMG-20261014-WA0038.jpg", "crew-two-yellow-dresses", "crew", "Two guests in yellow dresses by the orange wall", 810, 1],
  ["IMG-20261014-WA0062.jpg", "pool-table-terrace-night", "night", "Pool table and terrace under the roof at night", 1200, 1.1],
  ["IMG-20261014-WA0040.jpg", "pancakes-stuffed-two", "food", "Two stuffed pancakes on a plate", 768, 1],
  ["IMG-20261014-WA0042.jpg", "team-three-smiles", "crew", "Three of the team posing together", 768, 1],
  ["IMG-20261014-WA0045.jpg", "tasting-plate-patio", "crew", "Tasting a plate on the patio", 810, 1],
  ["IMG-20261013-WA0067.jpg", "kitchen-plating-up", "crew", "Plating up in the kitchen", 1024, 1],
  ["IMG_1849.JPG", "counter-service-window", "crew", "Service at the counter window", 1584, 1],
  ["IMG_2531.JPG", "team-shirts-pool", "crew", "Team shirts by the pool", 1584, 1],
  ["IMG_2532.JPG", "team-shirts-three", "crew", "Big Brother shirts in orange and yellow", 1584, 1],
  ["GH-06.jpg", "conference-room-set", "events", "Conference room set with tables and chairs", 1000, 1],
  ["IMG_1803.JPG", "day-visitors-sign", "events", "Day visitors welcome board at the entrance", 1584, 1],
  ["IMG_1840.JPG", "lapa-hall-pool-table", "events", "Thatched hall with pool table and wicker chairs", 1584, 1],
  ["IMG_1841.JPG", "bar-pool-table", "events", "Bar counter and pool table under thatch", 1584, 1],
  ["IMG-20261013-WA0055.jpg", "balloon-arch-lapa", "events", "Pink balloon arch at the lapa", 768, 1],
  ["IMG-20261014-WA0032.jpg", "pool-day-visitors", "events", "Day visitors enjoying the pool together", 1000, 1],
  ["IMG-20261014-WA0037.jpg", "pool-group-welcome-sign", "events", "Group at the pool under the welcome sign", 1000, 1],
];

const GROUPS = [
  ["rooms", "Rooms & bathrooms"],
  ["grounds", "The grounds"],
  ["pools", "Pools & lapa"],
  ["events", "Day visits, meetings & events"],
  ["food", "From the kitchen"],
  ["drinks", "The bar"],
  ["animals", "The animals"],
  ["night", "After dark"],
  ["crew", "Faces of Big Brother"],
];
const GROUP_ORDER = Object.fromEntries(GROUPS.map(([k], i) => [k, i]));

const files = fs.readdirSync(SRC).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
const mapped = new Set(M.map((m) => m[0]));
const problems = [];
for (const f of files) {
  if (!mapped.has(f) && !SKIP.has(f) && !REJECT.has(f)) problems.push(`UNMAPPED: ${f}`);
}
for (const m of M) if (!files.includes(m[0])) problems.push(`MISSING SRC: ${m[0]}`);
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

const report = [];
const gallery = [];
for (const [src, slug, group, alt, maxW, bright] of M) {
  const from = path.join(SRC, src);
  const to = path.join(OUT, `${slug}.jpg`);
  const meta = await sharp(from).metadata();
  const ts = /^IMG_\d+\.JPG$/i.test(src);
  // pass 1: auto-rotate so pixel dims match what we measure (EXIF applied)
  const base = await sharp(from).rotate().toBuffer();
  const bm = await sharp(base).metadata();
  let p = sharp(base);
  // date stamp crop: the overlay always starts at 83.8% of height (measured
  // across all 52 stamped frames); cut at 83% + trim 3% per side.
  if (ts) {
    const cutW = Math.floor(bm.width * 0.94);
    const cutH = Math.floor(bm.height * 0.83);
    p = p.extract({ left: Math.floor((bm.width - cutW) / 2), top: 0, width: cutW, height: cutH });
  }
  if (bright !== 1) p = p.modulate({ brightness: bright, saturation: 1.04 });
  if (bm.width > maxW) p = p.resize({ width: maxW, withoutEnlargement: true });
  const info = await p.jpeg({ quality: 80, progressive: true, mozjpeg: true }).toFile(to);
  gallery.push({ slug, group, alt, w: info.width, h: info.height });
  report.push({ src, slug, from: `${meta.width}x${meta.height}`, to: `${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`, cropped: ts, brightness: bright });
  console.log(`${slug}.jpg  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}

gallery.sort((a, b) => GROUP_ORDER[a.group] - GROUP_ORDER[b.group] || a.slug.localeCompare(b.slug));

const ts = `// GENERATED by scripts/tangison/build_all_masters.mjs from the owner's own
// photos (originals/gofile). Do not edit by hand: rerun the script.
// Every photo the owner supplied is on the site; alt text describes what is
// visible and invents nothing.

export type GalleryGroup = ${GROUPS.map(([k]) => `"${k}"`).join(" | ")};

export const GROUP_LABELS: Record<GalleryGroup, string> = {
${GROUPS.map(([k, label]) => `  "${k}": "${label}",`).join("\n")}
};

export type GalleryPhoto = { slug: string; group: GalleryGroup; alt: string; w: number; h: number };

export const GALLERY: GalleryPhoto[] = [
${gallery.map((g) => `  { slug: "${g.slug}", group: "${g.group}", alt: "${g.alt}", w: ${g.w}, h: ${g.h} },`).join("\n")}
];
`;
fs.writeFileSync(LIB, ts);
fs.writeFileSync(REPORT, JSON.stringify(report, null, 1));
console.log(`\nmasters: ${report.length} new files`);
console.log(`skipped (already masters): ${SKIP.size}, rejected: ${REJECT.size}`);
console.log(`gallery-data.ts written with ${gallery.length} photos`);
