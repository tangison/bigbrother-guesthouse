"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BIZ, wa } from "@/lib/site-data";
import { ROUTES } from "@/lib/routes";

/* N10 floating-on-scroll morph. One DOM, two visual modes, one class
 * toggle past an 80px threshold, single 520ms curve on every property.
 * Height stays constant between modes (law 1); offset via transform only
 * (law 2); every shared visual cross-fades (law 3); one curve (law 4).
 * Brand mark: the client's real guesthouse logo, never a monogram. */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const shellRef = useRef<HTMLElement>(null);

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

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <div className="sticky top-0 z-[200]">
      {/* Brand bar: 4px, colours straight from the two client logos.
          Static height, pinned, zero layout shift (webmaster checklist). */}
      <div
        aria-hidden="true"
        className="h-1 w-full bg-[linear-gradient(90deg,var(--color-leaf)_0%,var(--color-leaf)_38%,var(--color-ember)_62%,var(--color-ember)_100%)]"
      />
      <header ref={shellRef as React.RefObject<HTMLElement>} className="nav-shell">
        <div className="mx-auto px-3 md:px-6">
          <div className="nav-pill mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 bg-white md:h-[68px]">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-3"
              aria-label="Big Brother Guesthouse, home"
            >
              {/* The real logo, on its own white ground so the JPG blends in */}
              <Image
                src="/images/logo-guesthouse.jpg"
                alt="Big Brother Guesthouse logo: home away from home"
                width={132}
                height={44}
                priority
                className="h-10 w-auto md:h-11"
              />
            </Link>

            <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
              {ROUTES.map((r) => (
                <Link
                  key={r.key}
                  href={r.path}
                  aria-current={isActive(r.path) ? "page" : undefined}
                  className="nav-link text-sm font-medium text-ink/80 hover:text-ink"
                >
                  {r.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={`tel:${BIZ.guesthouse.phone1}`}
                className="nav-link text-sm font-semibold text-ink"
              >
                {BIZ.guesthouse.phone1Display}
              </a>
              <a
                href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, do you have a room available?")}
                className="whitespace-nowrap rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ember-deep"
              >
                Book on WhatsApp
              </a>
            </div>

            <button
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white lg:hidden"
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
        <div className="fixed inset-0 top-[72px] z-40 overflow-y-auto bg-paper px-6 pb-10 pt-6 lg:hidden">
          <nav className="grid" aria-label="Mobile navigation">
            {ROUTES.map((r, i) => (
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
          </nav>
          <div className="pop-in mt-8 grid gap-3 text-sm text-mut" style={{ animationDelay: "320ms" }}>
            <a className="text-base font-semibold text-ink" href={`tel:${BIZ.guesthouse.phone1}`}>
              Guesthouse: {BIZ.guesthouse.phone1Display}
            </a>
            <a className="text-base font-semibold text-ink" href={`tel:${BIZ.restaurant.phone}`}>
              Restaurant: {BIZ.restaurant.phoneDisplay}
            </a>
            <p>
              {BIZ.address.street}, {BIZ.address.town}
            </p>
            <div className="mt-2 flex gap-3">
              <Image
                src="/images/logo-restaurant.jpg"
                alt="Big Brothers Restaurant badge, established 2023"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full border border-line"
              />
              <Image
                src="/images/logo-guesthouse.jpg"
                alt="Big Brother Guesthouse logo"
                width={132}
                height={44}
                className="h-14 w-auto rounded-md border border-line bg-white p-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
