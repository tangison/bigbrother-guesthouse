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

  // B. Family unit: rooms 1 to 5 booked together
  { id: "family", group: "family", room: "Family unit (Rooms 1 to 5)", occupancy: "Sleeps up to 8 people", sleeps: 8, rate: 3050, bathroom: "Shareable + Room 5 private bathroom", amenities: "The whole standard wing booked as one house" },

  // C. Private units: rooms 6 and 7
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

  // E. Private units: rooms 11 to 13
  { id: "r11-single", group: "private", room: "Room 11", occupancy: "Single", sleeps: 1, rate: 550, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
  { id: "r11-double", group: "private", room: "Room 11", occupancy: "Double", sleeps: 2, rate: 850, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
  { id: "r12-single", group: "private", room: "Room 12", occupancy: "Single", sleeps: 1, rate: 550, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
  { id: "r12-double", group: "private", room: "Room 12", occupancy: "Double", sleeps: 2, rate: 850, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
  { id: "r13-single", group: "private", room: "Room 13", occupancy: "Single", sleeps: 1, rate: 550, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
  { id: "r13-double", group: "private", room: "Room 13", occupancy: "Double", sleeps: 2, rate: 850, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
  { id: "r13-triple", group: "private", room: "Room 13", occupancy: "Triple", sleeps: 3, rate: 990, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
  { id: "r13-quad", group: "private", room: "Room 13", occupancy: "Quadruple", sleeps: 4, rate: 1200, bathroom: "Own private bathroom", amenities: "Fridge, TV, aircon, microwave, coffee corner, kitchen corner" },
];

export const GROUP_LABELS: Record<RoomGroup, string> = {
  standard: "Standard rooms (1 to 5)",
  private: "Private units (6, 7 and 11 to 13)",
  shared: "Shared bathroom unit (8 to 10)",
  family: "Family unit",
};

// F. Day visits (per person, pool and entertainment area access)
export const DAY_VISITS = [
  { who: "Senior citizens", rate: 20 },
  { who: "Children (up to 12 years)", rate: 20 },
  { who: "Teenagers", rate: 30 },
  { who: "Adults", rate: 50 },
];

// G. Conference room
export const CONFERENCE = {
  capacity: 30,
  rate: 450,
  unitNote: "Per booking. Per day or per event: owner to confirm.",
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
