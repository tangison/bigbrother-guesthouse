"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GUESTHOUSE, RESTAURANT, wa, GUESTHOUSE_WA_GREETING, type Brand } from "@/lib/site-data";
import { GUESTHOUSE_ROUTES, RESTAURANT_ROUTES } from "@/lib/routes";
import { ContactStrip } from "./contact-strip";
import { track } from "@/lib/track";

/* N10 floating-on-scroll morph, shared by both brands. One DOM per brand,
 * two visual modes, one class toggle past an 80px threshold, single 520ms
 * curve on every property. The contact strip rides on top of the bar and
 * scrolls with it (one fixed header stack).
 *
 * Spacing law (owner fix, Oct 2026): the bar carries an outer side margin of
 * 16px at every width and an inner side padding of 16px, so the logo and the
 * menu button never touch an edge at 320px, 360px or anything wider. */

const LINKS = { guesthouse: GUESTHOUSE_ROUTES, restaurant: RESTAURANT_ROUTES };

export function SiteNav({ brand }: { brand: Brand }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const shellRef = useRef<HTMLElement>(null);
  const isEat = brand === "restaurant";

  const phone = isEat ? RESTAURANT.phoneEat : GUESTHOUSE.phoneStay;
  const phoneDisplay = isEat ? RESTAURANT.phoneEatDisplay : GUESTHOUSE.phoneStayDisplay;
  const ctaHref = isEat ? "/restaurant/reserve" : "/book";
  const ctaLabel = isEat ? "Reserve a table" : "Book on WhatsApp";

  /* Scroll handler per floating-nav law: passive, rAF-throttled, boolean flip */
  useEffect(() => {
    const nav = shellRef.current;
    if (!nav) return;
    const THRESHOLD = 80;
    let floating = false;
    let ticking = false;
    const update = () => {
      const next = window.scrollY > THRESHOLD;
      if (next !== floating) {
        floating = next;
        nav.classList.toggle("is-floating", floating);
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (path: string) => {
    const base = path.replace(/\/$/, "");
    if (base === "/" || base === "/restaurant") return pathname === base;
    return pathname === base || pathname.startsWith(base + "/");
  };

  const links = LINKS[brand];
  const logoSrc = isEat ? "/logos/logo-restaurant-192.png" : "/logos/logo-guesthouse-192.png";
  const logoAlt = isEat
    ? "Big Brothers Restaurant, Usakos, est. 2023"
    : "Big Brother Guesthouse: your home away from home";
  const homeHref = isEat ? "/restaurant" : "/";

  return (
    <div className="sticky top-0 z-[200]">
      <ContactStrip brand={brand} />
      <header ref={shellRef as React.RefObject<HTMLElement>} className="nav-shell">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="nav-pill my-2 flex h-14 items-center justify-between gap-3 rounded-2xl bg-white px-4 md:h-16 md:gap-4">
            <Link
              href={homeHref}
              className="flex min-w-0 shrink-0 items-center gap-2.5"
              aria-label={isEat ? "Big Brothers Restaurant, home" : "Big Brother Guesthouse, home"}
            >
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={isEat ? 192 : 192}
                height={isEat ? 191 : 179}
                priority
                sizes="96px"
                className="h-9 w-auto md:h-11"
              />
            </Link>

            <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
              {links.map((r) => (
                <Link
                  key={r.key}
                  href={r.path}
                  aria-current={isActive(r.path) ? "page" : undefined}
                  className="nav-link text-sm font-medium text-ink/80 hover:text-ink"
                >
                  {r.label}
                </Link>
              ))}
              {/* Owner round-5: the restaurant page must be prominent on the
                   guesthouse site too. Ember link, always last, always visible. */}
              {brand === "guesthouse" && (
                <Link
                  href="/restaurant"
                  aria-current={isActive("/restaurant") ? "page" : undefined}
                  className="nav-link text-sm font-semibold text-ember-deep hover:text-ember"
                >
                  Restaurant
                </Link>
              )}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={`tel:${phone}`}
                onClick={() => track("call_click", { brand, path: pathname })}
                className="nav-link text-sm font-semibold text-ink"
              >
                {phoneDisplay}
              </a>
              <Link
                href={ctaHref}
                onClick={() => track("cta_click", { brand, path: pathname, target: ctaHref })}
                className="whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ember-deep"
              >
                {ctaLabel}
              </Link>
            </div>

            <button
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-white lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 bg-ink transition-transform ${
                    open ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-5 bg-ink transition-transform ${
                    open ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 top-0 z-[190] overflow-y-auto bg-paper pt-[104px] lg:hidden">
          <div className="px-4 pb-12">
            {/* Brand switcher: the two businesses are at different places */}
            <Link
              href={isEat ? "/" : "/restaurant"}
              onClick={() => setOpen(false)}
              className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-line bg-cream px-4 py-3"
            >
              <span className="flex items-center gap-3">
                <Image
                  src={isEat ? "/logos/logo-guesthouse-192.png" : "/logos/logo-restaurant-192.png"}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <span className="text-sm">
                  <span className="block font-semibold text-ink">
                    {isEat ? "Big Brother Guesthouse" : "Big Brothers Restaurant"}
                  </span>
                  <span className="block text-xs text-mut">
                    {isEat ? "Plot 7, on the B2 · different location" : "Town centre · different location"}
                  </span>
                </span>
              </span>
              <span className="text-sm font-semibold text-ember-deep">Switch</span>
            </Link>

            <nav className="grid" aria-label="Mobile navigation">
              {links.map((r, i) => (
                <Link
                  key={r.key}
                  href={r.path}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${i * 45}ms` }}
                  className={`pop-in border-b border-line py-4 text-left font-display text-3xl font-semibold ${
                    isActive(r.path) ? "text-ember-deep" : "text-ink"
                  }`}
                >
                  {r.label}
                </Link>
              ))}
              {brand === "guesthouse" && (
                <Link
                  href="/restaurant"
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${links.length * 45}ms` }}
                  className="pop-in flex items-center justify-between border-b border-line py-4 text-left font-display text-3xl font-semibold text-ember-deep"
                >
                  Restaurant
                  <span className="rounded-full bg-ember px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-ink">
                    Eat
                  </span>
                </Link>
              )}
            </nav>

            <div className="pop-in mt-6 grid gap-3" style={{ animationDelay: "300ms" }}>
              <Link
                href={ctaHref}
                onClick={() => setOpen(false)}
                className="rounded-full bg-ember px-6 py-3.5 text-center font-semibold text-ink"
              >
                {ctaLabel}
              </Link>
              <div className="mt-2 grid gap-2 text-sm text-mut">
                <a className="text-base font-semibold text-ink" href={`tel:${GUESTHOUSE.phoneStay}`}>
                  Stay (MTC): {GUESTHOUSE.phoneStayDisplay}
                </a>
                <a className="text-base font-semibold text-ink" href={`tel:${GUESTHOUSE.phoneStay2}`}>
                  Stay (Telecom): {GUESTHOUSE.phoneStay2Display}
                </a>
                <a className="text-base font-semibold text-ink" href={`tel:${RESTAURANT.phoneEat}`}>
                  Eat: {RESTAURANT.phoneEatDisplay}
                </a>
                <a
                  className="text-sm underline underline-offset-4"
                  href={wa(isEat ? RESTAURANT.phoneEatWhatsapp : GUESTHOUSE.phoneStayWhatsapp, isEat ? "Hello Big Brothers Restaurant, I would like to reserve a table." : GUESTHOUSE_WA_GREETING)}
                  rel="noopener"
                >
                  WhatsApp us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
