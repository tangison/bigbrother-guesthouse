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
// TODO(owner): create these two mailboxes on the domain (mail
// setup or forwarding) before mail sent to them lands anywhere.
// Until the mailboxes exist, mail to the gmail address is the
// one guaranteed to arrive.
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
// Branch code note (round v3 research, 16 Oct 2026): the master
// file says 281073 (Karibib, via namibpages); 282672 appears
// online as FNB Namibia's universal branch code through several
// independent non-official sources. The two disagree, so the code
// row is NOT displayed on the public card until the owner
// confirms. TODO(owner): confirm the Karibib branch code.
export const BANKING = {
  bank: "FNB (First National Bank Namibia)",
  accountName: "Big Brother Guesthouse",
  branch: "Karibib",
  branchCode: "281073", // kept for reference, hidden on the card
  branchCodeConfirmed: false,
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

// ---- Printed QR targets (round v3 audit, 16 Oct 2026) -------
// Both printed menu PDFs were QR-decoded at 150 and 300 DPI:
//   guesthouse QR  -> https://bigbrotherguesthouse.com/menu
//   restaurant QR  -> https://bigbrotherguesthouse.com/menu
//                    (same URL as the guesthouse QR: a print
//                    error on the restaurant card. The printed
//                    card needs the replacement QR that points
//                    at /restaurant/menu - files delivered.)
// /menu therefore serves the GUESTHOUSE menu, and the site
// keeps /restaurant-menu -> /restaurant/menu alive (next.config
// redirects) so any older print or link still lands right.
export const QR_ROUTES = {
  guesthouseMenu: "/menu",
  restaurantMenu: "/restaurant/menu",
  legacyRestaurantMenu: "/restaurant-menu",
  legacyHome: "/home",
};
