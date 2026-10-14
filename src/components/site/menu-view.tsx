"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MENU, nads } from "@/lib/menu-data";
import { RESTAURANT, wa } from "@/lib/site-data";

/* Menu · catalogue list with a sticky category rail and scroll spy.
 * Prices set in tabular figures, ink on cream, straight from the printed
 * A3 menu. One photo fold opens the page; the list itself is typography. */

export function MenuView() {
  const [active, setActive] = useState(MENU[0].id);

  // Scroll spy for the category rail
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.replace("sec-", ""));
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    const timer = setTimeout(() => {
      MENU.forEach((s) => {
        const el = document.getElementById(`sec-${s.id}`);
        if (el) obs.observe(el);
      });
    }, 300);
    return () => {
      clearTimeout(timer);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      {/* Fold: full-bleed kitchen photo, two actions */}
      <section className="relative overflow-hidden bg-ink text-paper" aria-label="Menu">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/dish-feast.jpg"
            alt=""
            fill
            priority
            quality={60}
            sizes="100vw"
            className="scale-105 object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,oklch(18%_0.008_70/0.55)_0%,oklch(18%_0.008_70/0.4)_50%,oklch(18%_0.008_70/0.85)_100%)]"
        />
        <div className="relative mx-auto flex min-h-[64svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-20">
          <h1 className="hero-rise max-w-3xl font-display text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
            Good food, great vibes.
          </h1>
          <p className="hero-rise mt-4 max-w-2xl text-lg leading-relaxed text-paper/85" style={{ "--i": 1 } as React.CSSProperties}>
            Every price below comes from our own printed menu, from a N$30 russian to the N$400 seafood platter.
            The kitchen opens from 07:00 on Saturdays and Sundays.
          </p>
          <div className="hero-rise mt-7 flex flex-wrap items-center gap-3" style={{ "--i": 2 } as React.CSSProperties}>
            <Link
              href="/restaurant/reserve"
              className="rounded-full bg-paper px-6 py-3 font-semibold text-ink transition-colors hover:bg-lime"
            >
              Reserve a table
            </Link>
            <a
              href={`tel:${RESTAURANT.phoneEat}`}
              className="rounded-full border border-paper/40 px-6 py-3 font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              Call {RESTAURANT.phoneEatDisplay}
            </a>
            <a
              href={wa(
                RESTAURANT.phoneEatWhatsapp,
                "Hello Big Brothers Restaurant, here is someone who wants your menu: " +
                  (typeof window !== "undefined" ? window.location.href : "")
              )}
              rel="noopener"
              className="text-sm font-semibold text-paper/85 underline decoration-paper/40 underline-offset-4 hover:text-paper"
            >
              Share this menu on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Photo band: three real plates from this kitchen. No captions. */}
      <section aria-label="From our kitchen" className="bg-ink pb-16 md:pb-20">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-3 md:px-6">
          {[
            { src: "/images/dish-samoosa.jpg", alt: "Golden samoosas with sauce and salad on a plate" },
            { src: "/images/dish-matangara.jpg", alt: "Matangara stew served with white rice" },
            { src: "/images/cocktail-blue.jpg", alt: "Blue cocktail from the Big Brothers bar" },
          ].map((p, i) => (
            <div key={p.src} className="photo-frame aspect-[4/3]" data-sc-in data-sc-stagger="70">
              <Image
                src={p.src}
                alt={p.alt}
                width={900}
                height={675}
                loading={i === 0 ? "eager" : "lazy"}
                quality={52}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <div className="menu-paper" id="menu-top">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[220px_1fr] md:px-6 md:py-16">
          {/* Category rail: sticks while the list runs */}
          <aside className="min-w-0 md:sticky md:top-24 md:h-fit" aria-label="Menu categories">
            <nav className="rail flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible" aria-label="Jump to menu section">
              {MENU.map((s) => (
                <a
                  key={s.id}
                  href={`#sec-${s.id}`}
                  aria-current={active === s.id ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`sec-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`shrink-0 border-b-2 px-1 py-2 text-sm font-medium transition-colors md:border-b-0 md:border-l-2 md:pl-3 ${
                    active === s.id
                      ? "border-ember text-ink"
                      : "border-transparent text-mut hover:text-ink"
                  }`}
                >
                  {s.title}
                </a>
              ))}
            </nav>
            <div className="mt-5 hidden border border-line bg-paper p-4 text-sm md:block">
              <p className="font-semibold">Eating in a group?</p>
              <p className="mt-1 text-mut">Call the kitchen ahead of time and we will prepare for your group.</p>
              <a href={`tel:${RESTAURANT.phoneEat}`} className="mt-2 inline-block font-semibold underline decoration-ember decoration-2 underline-offset-4">
                {RESTAURANT.phoneEatDisplay}
              </a>
            </div>
          </aside>

          {/* Sections: printed-menu typography, tabular prices */}
          <div className="grid gap-12">
            {MENU.map((s) => (
              <section key={s.id} id={`sec-${s.id}`} className="scroll-mt-28" aria-label={s.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-3">
                  <h2 className="font-display text-2xl font-semibold md:text-3xl">{s.title}</h2>
                  {s.kicker && <p className="text-xs font-medium uppercase tracking-wider text-mut">{s.kicker}</p>}
                </div>
                <ul className="mt-2 grid gap-x-10 md:grid-cols-2">
                  {s.items.map((it) => (
                    <li key={it.name} className="flex items-baseline justify-between gap-4 border-b border-line/70 py-3">
                      <span className="min-w-0">
                        <span className="font-medium">{it.name}</span>
                        {it.note && <span className="mt-0.5 block text-xs leading-snug text-mut">{it.note}</span>}
                      </span>
                      <span className="shrink-0 font-display text-lg font-semibold tabular-nums">
                        {nads(it.price)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Closing band */}
      <section className="bg-ink py-16 text-paper md:py-20" aria-label="Reserve">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Hungry? We are in town centre.</h2>
          <p className="mt-3 text-sm text-paper/75">
            {RESTAURANT.address.street}, Usakos. Confirmed hours: {RESTAURANT.hoursKnown}.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/restaurant/reserve" className="rounded-full bg-paper px-6 py-3 font-semibold text-ink transition-colors hover:bg-lime">
              Reserve a table
            </Link>
            <a href={`tel:${RESTAURANT.phoneEat}`} className="rounded-full border border-paper/40 px-6 py-3 font-semibold text-paper transition-colors hover:bg-paper/10">
              Call {RESTAURANT.phoneEatDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
