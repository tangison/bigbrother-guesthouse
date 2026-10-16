"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GUESTHOUSE, RESTAURANT, wa, GUESTHOUSE_WA_GREETING, type Brand } from "@/lib/site-data";
import { track } from "@/lib/track";

/* Sticky mobile bottom bar: Call, WhatsApp, Book (or Reserve on the
 * restaurant side), in the brand you are standing in, safe-area aware.
 * Hidden on the two conversion pages themselves, where the form is the page.
 * Each tap fires a dataLayer conversion event (src/lib/track.ts). */
export function StickyActionBar({ brand }: { brand: Brand }) {
  const pathname = usePathname();
  if (pathname === "/book" || pathname === "/restaurant/reserve") return null;
  const isEat = brand === "restaurant";
  return (
    <div
      className={`sticky-action-bar fixed inset-x-0 bottom-0 z-[150] grid grid-cols-3 gap-2 border-t p-2 md:hidden ${
        isEat ? "border-lime/30 bg-ink" : "border-ember/30 bg-ink"
      }`}
      role="navigation"
      aria-label="Quick actions"
    >
      <a
        href={`tel:${isEat ? RESTAURANT.phoneEat : GUESTHOUSE.phoneStay}`}
        onClick={() => track("call_click", { brand, path: pathname })}
        className="flex min-h-[44px] items-center justify-center rounded-full border border-paper/30 text-sm font-semibold text-paper"
      >
        Call
      </a>
      <a
        href={wa(
          isEat ? RESTAURANT.phoneEatWhatsapp : GUESTHOUSE.phoneStayWhatsapp,
          isEat
            ? "Hello Big Brothers Restaurant, I would like to reserve a table."
            : GUESTHOUSE_WA_GREETING
        )}
        onClick={() => track("whatsapp_click", { brand, path: pathname, intent: isEat ? "reserve_table" : "book_room" })}
        rel="noopener"
        className="flex min-h-[44px] items-center justify-center rounded-full bg-ember text-sm font-semibold text-ink"
      >
        WhatsApp
      </a>
      <Link
        href={isEat ? "/restaurant/reserve" : "/book"}
        onClick={() => track("cta_click", { brand, path: pathname, target: isEat ? "/restaurant/reserve" : "/book" })}
        className="flex min-h-[44px] items-center justify-center rounded-full bg-paper text-sm font-semibold text-ink"
      >
        {isEat ? "Reserve" : "Book"}
      </Link>
    </div>
  );
}
