"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GUESTHOUSE, RESTAURANT, wa, GUESTHOUSE_WA_GREETING, type Brand } from "@/lib/site-data";
import { track } from "@/lib/track";

/* Sticky mobile bottom bar (owner audit, 16 Oct 2026): the WhatsApp widget
 * must be clean, functional and PERSISTENTLY accessible on every page of
 * the site, so the old "hidden on /book and /restaurant/reserve" rule is
 * gone. On the two form pages the bar shrinks to WhatsApp + Call, because
 * the page itself already is the booking form (no duplicate CTA).
 * Safe-area aware: the bottom padding follows the phone's home-indicator
 * inset so the buttons never sit under it. Body padding for mobile is set
 * in globals.css so page footers are never covered by the bar.
 * Each tap fires a dataLayer conversion event (src/lib/track.ts). */
export function StickyActionBar({ brand }: { brand: Brand }) {
  const pathname = usePathname();
  const onFormPage = pathname === "/book" || pathname === "/restaurant/reserve";
  const isEat = brand === "restaurant";

  const whatsappHref = wa(
    isEat ? RESTAURANT.phoneEatWhatsapp : GUESTHOUSE.phoneStayWhatsapp,
    isEat ? "Hello Big Brothers Restaurant, I would like to reserve a table." : GUESTHOUSE_WA_GREETING
  );

  return (
    <div
      className={`sticky-action-bar fixed inset-x-0 bottom-0 z-[150] border-t shadow-[0_-8px_24px_rgba(0,0,0,0.18)] ${
        onFormPage ? "grid grid-cols-2" : "grid grid-cols-3"
      } gap-2 p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:hidden ${
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
        href={whatsappHref}
        onClick={() => track("whatsapp_click", { brand, path: pathname, intent: isEat ? "reserve_table" : "book_room" })}
        rel="noopener"
        className="flex min-h-[44px] items-center justify-center rounded-full bg-ember text-sm font-semibold text-ink"
      >
        WhatsApp
      </a>
      {!onFormPage && (
        <Link
          href={isEat ? "/restaurant/reserve" : "/book"}
          onClick={() => track("cta_click", { brand, path: pathname, target: isEat ? "/restaurant/reserve" : "/book" })}
          className="flex min-h-[44px] items-center justify-center rounded-full bg-paper text-sm font-semibold text-ink"
        >
          {isEat ? "Reserve" : "Book"}
        </Link>
      )}
    </div>
  );
}
