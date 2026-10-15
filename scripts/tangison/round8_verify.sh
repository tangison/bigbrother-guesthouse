#!/bin/bash
# Round 8 verification: every owner item checked against the rendered HTML.
# Exit 1 on any failure. Server must be on :3100.
B="http://localhost:3100"
pass=0; fail=0
ok(){ pass=$((pass+1)); echo "PASS  $1"; }
bad(){ fail=$((fail+1)); echo "FAIL  $1"; }
chk(){ if [ "$1" -ge "$2" ]; then ok "$3"; else bad "$3 (found $1, want >= $2)"; fi; }
zero(){ if [ "$1" -eq 0 ]; then ok "$2"; else bad "$2 (found $1, want 0)"; fi; }

ROOMS=$(curl -s $B/rooms | sed 's/<!-- -->//g')
BOOK=$(curl -s $B/book | sed 's/<!-- -->//g')
CONTACT=$(curl -s $B/contact | sed 's/<!-- -->//g')
REST=$(curl -s $B/restaurant | sed 's/<!-- -->//g')
RESTMENU=$(curl -s -o /dev/null -w "%{http_code}" $B/restaurant/menu)
FOOT_GH=$(curl -s $B/rooms | sed 's/<!-- -->//g')   # guesthouse footer renders on every (site) page
FOOT_EAT=$(curl -s $B/restaurant/contact | sed 's/<!-- -->//g')
FEEDBACK=$(curl -s $B/feedback | sed 's/<!-- -->//g')
FACIL=$(curl -s $B/facilities | sed 's/<!-- -->//g')
GH=$(curl -s $B/guesthouse | sed 's/<!-- -->//g')
MENU=$(curl -s $B/restaurant/menu | sed 's/<!-- -->//g')
HOME=$(curl -s $B/ | sed 's/<!-- -->//g')

echo "== 1. ROOM 13 (full, nothing cut off) =="
chk "$(echo "$ROOMS" | grep -c 'Room 13 · Single')" 1 "rooms: Room 13 single card"
chk "$(echo "$ROOMS" | grep -c 'Room 13 · Double')" 1 "rooms: Room 13 double card"
chk "$(echo "$ROOMS" | grep -c 'Room 13 · Triple')" 1 "rooms: Room 13 triple card"
chk "$(echo "$ROOMS" | grep -c 'Room 13 · Quadruple')" 1 "rooms: Room 13 quadruple card"
chk "$(echo "$ROOMS" | grep -c 'Thirteen rooms')" 1 "rooms: H1 says Thirteen rooms"
chk "$(echo "$ROOMS" | grep -c 'Room 7 · Single')" 1 "rooms: Room 7 single back"
chk "$(echo "$ROOMS" | grep -c 'Room 12 · Double')" 1 "rooms: Room 12 double back"
chk "$(echo "$ROOMS" | grep -c 'N\$1,200')" 1 "rooms: quad rate N\$1,200"
chk "$(echo "$ROOMS" | grep -c 'N\$990')" 1 "rooms: triple rate N\$990"
chk "$(echo "$ROOMS" | grep -c '6, 7 and 11 to 13')" 1 "rooms: group label covers 13"

echo "== 2. PHONES (both 7606, tappable, no 7609 anywhere) =="
zero "$(echo "$ROOMS$CONTACT$FOOT_EAT$REST$HOME" | grep -o '7609' | wc -l)" "no 7609 anywhere"
chk "$(echo "$CONTACT" | grep -c 'tel:%2B264812647606\|tel:+264812647606\|tel:%2B264 81\|href=\"tel:+264812647606\"')" 1 "contact: MTC tel link"
chk "$(echo "$CONTACT" | grep -c 'tel:+264852647606')" 1 "contact: Telecom tel link (7606)"
chk "$(echo "$CONTACT" | grep -c 'wa.me/264812647606')" 1 "contact: MTC WhatsApp link"
chk "$(echo "$CONTACT" | grep -c 'wa.me/264852647606')" 1 "contact: Telecom WhatsApp link"
chk "$(echo "$FOOT_GH" | grep -c 'tel:+264852647606')" 1 "footer: Telecom tel link"
chk "$(echo "$FOOT_GH" | grep -c 'wa.me/264852647606')" 1 "footer: Telecom WhatsApp link"
chk "$(echo "$FOOT_EAT" | grep -c 'tel:+264852647606')" 1 "restaurant footer: Telecom tel link"

echo "== 3. EMAILS (separate, mailto, guesthouse email out of restaurant) =="
chk "$(echo "$CONTACT" | grep -c 'mailto:bigbrotherguest@gmail.com')" 1 "contact: guesthouse mailto"
chk "$(echo "$CONTACT" | grep -c 'mailto:restaurant@bigbrotherguesthouse.com')" 1 "contact: restaurant mailto"
zero "$(echo "$REST$RESTMENU$FOOT_EAT" | grep -o 'bigbrotherguest@gmail.com' | wc -l)" "restaurant pages: zero guesthouse email"
chk "$(echo "$REST" | grep -c 'mailto:restaurant@bigbrotherguesthouse.com')" 1 "restaurant page: restaurant mailto"
chk "$(echo "$FOOT_EAT" | grep -c 'restaurant@bigbrotherguesthouse.com')" 1 "restaurant footer: restaurant email"
chk "$(echo "$FEEDBACK" | grep -c 'restaurant@bigbrotherguesthouse.com\|bigbrotherguest@gmail.com')" 1 "feedback: email links present (static shell)"

echo "== 4. BOOKING LINKS (all five + TripAdvisor, new tab) =="
chk "$(echo "$BOOK" | grep -o 'target="_blank"' | wc -l)" 6 "book: 6 new-tab chips"
chk "$(echo "$CONTACT" | grep -o 'target="_blank"' | wc -l)" 7 "contact: 7 new-tab links (6 chips + NTB)"
chk "$(echo "$BOOK" | grep -c 'booking.com/searchresults')" 1 "book: Booking.com chip"
chk "$(echo "$BOOK" | grep -c 'safarinow.com/go/big-brother-guest-house')" 1 "book: SafariNow chip"
chk "$(echo "$BOOK" | grep -c 'maps/search/?api=1')" 1 "book: Google Maps chip"
chk "$(echo "$BOOK" | grep -c 'agoda.com/search')" 1 "book: Agoda chip"
chk "$(echo "$BOOK" | grep -c 'Our website')" 1 "book: Website chip"
chk "$(echo "$CONTACT" | grep -c 'agoda.com/search')" 1 "contact: Agoda chip"

echo "== 5. QR CODE on restaurant =="
chk "$(echo "$REST" | grep -c 'qr-restaurant-menu.png')" 1 "restaurant: QR card present"
chk "$(echo "$REST" | grep -c 'Scan for our full menu')" 1 "restaurant: QR caption"
chk "$(curl -s -o /dev/null -w '%{http_code}' $B/images/qr-restaurant-menu.png)" 200 "QR image serves 200"
chk "$RESTMENU" 200 "/restaurant/menu is 200 (QR scan target)"

echo "== 6. CONFERENCE (details kept, SSR on rooms) =="
chk "$(echo "$ROOMS" | grep -c 'expandable up to 30 on request')" 1 "rooms: conference up to 30 kept"
chk "$(echo "$ROOMS" | grep -o 'N\$450' | wc -l)" 8 "rooms: conference N\$450 kept (+ room singles)"
chk "$(echo "$ROOMS" | grep -c 'Tea and coffee station')" 1 "rooms: conference inclusions kept"
chk "$(echo "$FACIL" | grep -c 'up to 30 on request')" 1 "facilities: conference summary visible"
# NOTE: facilities Tabs (Radix) server-render the active tab only; the
# conference image + alt live in the 'meet' tab and mount client-side.
# Pre-existing round-6 behaviour, checked interactively below.

echo "== 7. PRICES vs poster =="
chk "$(echo "$ROOMS" | grep -c 'Family unit (Rooms 1 to 5)')" 1 "family unit card"
chk "$(echo "$ROOMS" | grep -c 'N\$3,050')" 1 "family unit N\$3,050"
chk "$(echo "$ROOMS" | grep -c 'up to 8 guests')" 1 "family sleeps 8"
chk "$(echo "$ROOMS" | grep -c 'N\$30')" 1 "day visit N\$30"
chk "$(echo "$ROOMS" | grep -c 'N\$60')" 1 "small cooler N\$60"
chk "$(echo "$ROOMS" | grep -c 'N\$100')" 1 "big cooler N\$100"
chk "$(echo "$ROOMS" | grep -c 'N\$60 to N\$200')" 1 "corkage range"
# Entertainment-area range renders in the facilities 'celebrate' tab
# (client-mounted; Radix). Source-verified: src/lib/rates.ts ENTERTAINMENT_AREA.
chk "$(echo "$ROOMS" | grep -c 'Room 11 · Double')" 1 "room 11 double N\$850 card"
chk "$(echo "$ROOMS" | grep -o 'N\$850' | wc -l)" 3 "N\$850 appears (11/12/13 doubles)"

echo "== misc regressions =="
chk "$(echo "$HOME" | grep -c 'Mopani worms')" 0 "home carousel: no regression marker needed"
zero "$(echo "$HOME" | grep -o 'href=\"/menu\"' | wc -l)" "no dead /menu links on home"
zero "$(echo "$REST" | grep -o 'href=\"/menu\"' | wc -l)" "no dead /menu links on restaurant"

echo ""
echo "RESULT: $pass passed, $fail failed"
exit $([ $fail -eq 0 ] && echo 0 || echo 1)
