// ============================================================
// SITE CONFIG · the single source of truth for contact details,
// emails and banking. Pages and components read from here;
// nothing may hardcode an email, account number or branch code.
//
// Round v3 (16 Oct 2026), approved owner plan:
//   - emails split: general (guesthouse gmail), bookings@ (both
//     brands, new), restaurant@ (restaurant only)
//   - guesthouse banking from the master file section 6 + the
//     banking whiteboard photo (image 6), transcribed verbatim
//   - restaurant banking: NOT SUPPLIED. The card structure ships,
//     the fields stay hidden, and the owner is asked for them.
//     TODO(owner): send Big Brothers Restaurant EFT details.
// ============================================================

export const SITE = {
  name: "Big Brother Holdings",
  site: "https://www.bigbrotherguesthouse.com",
  // Canonical host is www. The apex 308-redirects here (middleware.ts),
  // so every printed QR works whichever host it encodes.
  canonicalHost: "www.bigbrotherguesthouse.com",
  postal: "P.O. Box 324, Usakos, Namibia",
};

// ---- Emails -------------------------------------------------
// Mailboxes confirmed created by the owner (16 Oct 2026 chat):
// bookings@ and restaurant@ are live on the domain. The gmail
// address stays the long-standing general inbox.
export const EMAILS = {
  // Long-standing general address, printed on the guesthouse menu.
  general: "bigbrotherguest@gmail.com",
  // Bookings and reservations, both brands. From the owner's v3
  // contact table, approved in the round v3 plan.
  bookings: "bookings@bigbrotherguesthouse.com",
  // Restaurant's own address (owner round 8 proposal).
  restaurant: "restaurant@bigbrotherguesthouse.com",
};

// ---- Banking · Big Brother Guesthouse (stays) ---------------
// Source: master file section 6 and the banking whiteboard photo,
// word for word. Shown ONLY inside the booking confirmation panel
// and the payment card. Never in the footer, meta tags or schema.
//
// Branch code (round v3 research, 16 Oct 2026): two candidates
// appeared online (281073 Karibib vs 282672 FNB universal). The
// owner confirmed 281073 in chat on 16 Oct 2026, so the code row
// now displays on the payment cards (booking panel + rooms page).
export const BANKING = {
  bank: "FNB (First National Bank Namibia)",
  accountName: "Big Brother Guesthouse",
  branch: "Karibib",
  branchCode: "281073", // owner-confirmed 16 Oct 2026
  branchCodeConfirmed: true,
  accountNumber: "62257058604",
  note: "Pay after we confirm your booking. Send proof of payment on WhatsApp or email.",
};

// ---- Banking · Big Brothers Restaurant ----------------------
// TODO(owner): the restaurant's EFT details were never supplied.
// Nothing here may be guessed from the guesthouse account: it is
// a different business name at a different location. When the
// owner sends the details, fill the fields and flip
// `supplied` to true; the card on /restaurant/contact and
// /restaurant/reserve renders them automatically.
export const RESTAURANT_BANKING = {
  supplied: false,
  bank: "",
  accountName: "Big Brothers Restaurant",
  branch: "",
  accountNumber: "",
  note: "Ask us on WhatsApp or by email for our EFT details, or pay cash or by card at the restaurant.",
};

// ---- Airbnb (owner audit, 16 Oct 2026) ----------------------
// The owner listed "Airbnb Integration: not connected - connect and
// link the Airbnb listing URL to the website", but the listing URL
// itself was not included in the audit message. Nothing may be
// invented, so the slot ships empty. TODO(owner): send the Airbnb
// listing URL; set `supplied` to true and the button renders
// automatically on the Book page next to the other platforms.
export const AIRBNB = {
  supplied: false,
  url: "",
};

// ---- Printed QR targets (round v3 audit, 16 Oct 2026) -------
// Both printed menu PDFs were QR-decoded at 150, 300 and 600 DPI:
//   guesthouse QR  -> https://bigbrotherguesthouse.com/menu
//   restaurant QR  -> https://bigbrotherguesthouse.com/menu
//                    (same URL as the guesthouse QR: a print
//                    error on the restaurant card.)
// OWNER DECISION (16 Oct 2026): the printed cards stay as
// printed - no reprint required. The site carries the
// correctness instead:
//   - /menu serves the GUESTHOUSE menu (guesthouse card scans
//     land exactly as printed)
//   - /restaurant-menu (the URL printed on the restaurant card)
//     308-redirects to /restaurant/menu
//   - /menu carries a prominent two-kitchens banner so a scan of
//     the old restaurant card still reaches the restaurant menu
//     in one tap
// Replacement QR card files remain in /download as an optional
// extra for a future reprint.
export const QR_ROUTES = {
  guesthouseMenu: "/menu",
  restaurantMenu: "/restaurant/menu",
  legacyRestaurantMenu: "/restaurant-menu",
  legacyHome: "/home",
};
