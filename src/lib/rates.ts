// Rates, read from the owner's master price list (Big_Brother_Guesthouse_Master_Prompt.md,
// section 3, transcribed verbatim from the official price poster). One source of truth:
// the rooms page, the room cards and the booking calculator all read this file.
// Every price is per night in Namibian Dollar. No price on this site may come
// from anywhere else. B&B rates are not in the master file: shown as POA.

export type RoomGroup = "standard" | "private" | "shared" | "family";

export type RoomTier = {
  id: string;
  group: RoomGroup;
  room: string;
  occupancy: string;
  sleeps: number;
  rate: number | null; // null = price on request
  bathroom: string;
  amenities: string;
  badge?: string; // short highlight, e.g. Self-Catering
  hidden?: boolean; // true = not displayed, not bookable (round 8: none hidden)
};

const SHARED_KITCHEN =
  "Shared kitchen unit: deep freezer, fridge, microwave, coffee corner, stove";

export const ROOM_TIERS: RoomTier[] = [
  // A. Standard rooms 1 to 5
  { id: "r1-single", group: "standard", room: "Room 1", occupancy: "Single", sleeps: 1, rate: 450, bathroom: "Shareable toilet facilities", amenities: `Aircon in bedroom. ${SHARED_KITCHEN}` },
  { id: "r2-single", group: "standard", room: "Room 2", occupancy: "Single", sleeps: 1, rate: 450, bathroom: "Shareable toilet facilities", amenities: `Aircon in bedroom. ${SHARED_KITCHEN}` },
  { id: "r2-twin", group: "standard", room: "Room 2", occupancy: "Shareable (twin beds)", sleeps: 2, rate: 700, bathroom: "Shareable toilet facilities", amenities: `Aircon in bedroom. ${SHARED_KITCHEN}` },
  { id: "r3-single", group: "standard", room: "Room 3", occupancy: "Single", sleeps: 1, rate: 450, bathroom: "Shareable toilet facilities", amenities: `Aircon in bedroom. ${SHARED_KITCHEN}` },
  { id: "r3-twin", group: "standard", room: "Room 3", occupancy: "Shareable (twin beds)", sleeps: 2, rate: 700, bathroom: "Shareable toilet facilities", amenities: `Aircon in bedroom. ${SHARED_KITCHEN}` },
  { id: "r4-single", group: "standard", room: "Room 4", occupancy: "Single", sleeps: 1, rate: 450, bathroom: "Shareable toilet facilities", amenities: `Aircon in bedroom. ${SHARED_KITCHEN}` },
  { id: "r5-single", group: "standard", room: "Room 5", occupancy: "Single", sleeps: 1, rate: 450, bathroom: "Private bathroom (toilet and shower) in the room", amenities: `Aircon in bedroom. ${SHARED_KITCHEN}` },
  { id: "r5-double", group: "standard", room: "Room 5", occupancy: "Double", sleeps: 2, rate: 700, bathroom: "Private bathroom (toilet and shower) in the room", amenities: `Aircon in bedroom. ${SHARED_KITCHEN}` },

  // B. Family unit: rooms 1 to 5 booked together. Owner round 6: badge it
  // Self-Catering, and state the bathroom layout plainly (1 to 4 share,
  // 5 en-suite).
  { id: "family", group: "family", room: "Family unit (Rooms 1 to 5)", occupancy: "Sleeps up to 8 guests across 5 rooms", sleeps: 8, rate: 3050, badge: "Self-Catering", bathroom: "Rooms 1 to 4 share bathroom facilities. Room 5 has its own private en-suite bathroom", amenities: "The whole standard wing booked as one house. Self-catering kitchen: deep freezer, fridge, microwave, coffee corner, stove" },

  // C. Private units. Rooms 6 and 7, both single N$500 / double N$800.
  // Owner round 8 (15 Oct 2026): "the previous rooms were fine, I do not
  // know why you made the 12 if they are thirteen" - Room 7 was missing
  // from the round 6 table (the same cut-off that hid Room 13), so it is
  // shown again at the master poster's rate (master prompt section C).
  { id: "r6-single", group: "private", room: "Room 6", occupancy: "Single", sleeps: 1, rate: 500, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
  { id: "r6-double", group: "private", room: "Room 6", occupancy: "Double", sleeps: 2, rate: 800, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
  { id: "r7-single", group: "private", room: "Room 7", occupancy: "Single", sleeps: 1, rate: 500, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
  { id: "r7-double", group: "private", room: "Room 7", occupancy: "Double", sleeps: 2, rate: 800, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },

  // D. Shared bathroom unit: rooms 8 to 10
  { id: "r8-single", group: "shared", room: "Room 8", occupancy: "Single", sleeps: 1, rate: 450, bathroom: "Shared bathroom", amenities: "Aircon, TV, fridge in the room" },
  { id: "r8-twin", group: "shared", room: "Room 8", occupancy: "Shareable (twin beds)", sleeps: 2, rate: 700, bathroom: "Shared bathroom", amenities: "Aircon, TV, fridge in the room" },
  { id: "r9-single", group: "shared", room: "Room 9", occupancy: "Single", sleeps: 1, rate: 450, bathroom: "Shared bathroom", amenities: "Aircon, TV, fridge, microwave in the room" },
  { id: "r9-double", group: "shared", room: "Room 9", occupancy: "Double", sleeps: 2, rate: 700, bathroom: "Shared bathroom", amenities: "Aircon, TV, fridge, microwave in the room" },
  { id: "r10-single", group: "shared", room: "Room 10", occupancy: "Single", sleeps: 1, rate: 500, bathroom: "Shared bathroom", amenities: "Aircon, TV, fridge in the room" },
  { id: "r10-twin", group: "shared", room: "Room 10", occupancy: "Shareable (twin beds)", sleeps: 2, rate: 750, bathroom: "Shared bathroom", amenities: "Aircon, TV, fridge in the room" },

  // E. Private units 11 to 13. Owner round 8 (15 Oct 2026): Rooms 11 and 12
  // are N$550 single / N$850 double, and Room 13 was cut off in the round 6
  // rate sheet and "must appear in full, with nothing cut off": single N$550,
  // double N$850, triple N$990, quadruple N$1,200. Verified against the
  // master poster transcription (master prompt section E) - identical.
  // Description and inclusions for Room 13 come from the same poster line:
  // Fridge, TV, Aircon, Microwave, Coffee Corner, Own Private Bathroom and
  // Kitchen Corner.
  { id: "r11-single", group: "private", room: "Room 11", occupancy: "Single", sleeps: 1, rate: 550, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
  { id: "r11-double", group: "private", room: "Room 11", occupancy: "Double", sleeps: 2, rate: 850, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
  { id: "r12-single", group: "private", room: "Room 12", occupancy: "Single", sleeps: 1, rate: 550, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
  { id: "r12-double", group: "private", room: "Room 12", occupancy: "Double", sleeps: 2, rate: 850, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
  { id: "r13-single", group: "private", room: "Room 13", occupancy: "Single", sleeps: 1, rate: 550, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
  { id: "r13-double", group: "private", room: "Room 13", occupancy: "Double", sleeps: 2, rate: 850, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
  { id: "r13-triple", group: "private", room: "Room 13", occupancy: "Triple", sleeps: 3, rate: 990, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
  { id: "r13-quad", group: "private", room: "Room 13", occupancy: "Quadruple", sleeps: 4, rate: 1200, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
];

/** Tiers actually shown and bookable. Owner round 8 restored the full
 * thirteen-room list: Room 7, Room 12 double and all four Room 13 tiers. */
export const VISIBLE_TIERS = ROOM_TIERS.filter((t) => !t.hidden);

export const GROUP_LABELS: Record<RoomGroup, string> = {
  standard: "Standard rooms (1 to 5)",
  private: "Private units (6, 7 and 11 to 13)",
  shared: "Shared bathroom unit (8 to 10)",
  family: "Family unit",
};

// F. Day visits: one flat entry fee per person (owner round 6), pool,
// gardens and entertainment area access. The old tiered list (N$20 to N$50)
// is replaced by this single rate.
export const DAY_VISIT_RATE = 30;

// Cooler box fees at the pool and entertainment area (owner round 6).
export const COOLERS = [
  { size: "Small cooler box", fee: 60 },
  { size: "Big cooler box", fee: 100 },
];

// Bottle courtesy fee (owner round 6): loose bottles such as spirits or
// whiskey brought in bags. First bottle is included; a courtesy surcharge
// applies for every 2 additional bottles, N$60 to N$200 by volume.
export const CORKAGE = {
  range: "N$60 to N$200",
  policy:
    "Bringing your own bottles? The first bottle is included. A courtesy fee of N$60 to N$200, depending on volume and quantity, applies for every 2 additional bottles you bring onto the premises.",
};

// G. Conference room (owner round 6): seats 20 delegates comfortably,
// expandable to 30 on request. N$450 per day or per event, drinking water
// and a tea/coffee station included in the rate.
export const CONFERENCE = {
  standard: 20,
  max: 30,
  rate: 450,
  unit: "Per day or per event",
  includes: ["Complimentary drinking water", "Tea and coffee station"],
};

// Private Entertainment Area hire (owner round 6): the venue runs from
// N$500 to N$2,000 depending on the setup, plus N$50 per person.
export const ENTERTAINMENT_AREA = {
  venueFrom: 500,
  venueTo: 2000,
  perPerson: 50,
};

// 4. VIP membership card
export const VIP = {
  annualFee: 1200,
  discount: 0.2,
  appliesTo: "accommodation only (rooms and the family unit)",
};

// Banking details (master file, section 6). Shown ONLY inside the booking
// confirmation panel and the payment card on the rooms page. Never in the
// footer, meta tags, schema or images.
export const BANKING = {
  bank: "FNB (First National Bank Namibia)",
  accountName: "Big Brother Guesthouse",
  branch: "Karibib",
  branchCode: "281073",
  accountNumber: "62257058604",
  note: "Pay after we confirm your booking. Send proof of payment on WhatsApp or email.",
};

export const POA = "POA, price on request";

export function formatNad(n: number): string {
  return `N$${n.toLocaleString("en-NA")}`;
}

export function rateLabel(rate: number | null): string {
  return rate === null ? POA : formatNad(rate);
}

/** Whole nights between two yyyy-mm-dd calendar dates, no timezone drift. */
export function nightsBetween(checkIn: string, checkOut: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(checkIn) || !/^\d{4}-\d{2}-\d{2}$/.test(checkOut)) return 0;
  const [iy, im, id] = checkIn.split("-").map(Number);
  const [oy, om, od] = checkOut.split("-").map(Number);
  const a = Date.UTC(iy, im - 1, id);
  const b = Date.UTC(oy, om - 1, od);
  const n = Math.round((b - a) / 86_400_000);
  return n > 0 ? n : 0;
}
