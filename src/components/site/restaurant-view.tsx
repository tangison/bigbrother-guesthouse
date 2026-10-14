"use client";

import Image from "next/image";
import Link from "next/link";
import { DishCarousel } from "./dish-carousel";
import { BIZ, wa } from "@/lib/site-data";

/* Restaurant · Photographic folds. The braise photograph opens the page;
 * hours and contact read as a printed spec sheet; the dish rail keeps the
 * real plates moving. The client's real badge anchors the hero. */

export function RestaurantView() {
  return (
    <>
      {/* Fold 1: full-bleed kitchen photo, badge bottom-left */}
      <section className="relative overflow-hidden bg-ink text-paper" aria-label="Big Brothers Restaurant">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/hero-braise.jpg"
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
          className="absolute inset-0 bg-[linear-gradient(180deg,oklch(18%_0.008_70/0.6)_0%,oklch(18%_0.008_70/0.4)_50%,oklch(18%_0.008_70/0.85)_100%)]"
        />
        <div className="relative mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-4 pb-20 pt-28 md:px-6">
          <h1 className="hero-rise max-w-4xl font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[1.06] tracking-[-0.02em]" style={{ "--i": 0 } as React.CSSProperties}>
            Big Brothers Restaurant.
            <span className="block text-leaf">Good food, great vibes.</span>
          </h1>
          <p className="hero-rise mt-5 max-w-2xl text-lg leading-relaxed text-paper/85" style={{ "--i": 1 } as React.CSSProperties}>
            Local flavours, hearty favourites, township classics, grills, seafood, pizza and a
            full bar, served with views of the rocky landscapes around Usakos.
          </p>
          <div className="hero-rise mt-8 flex flex-wrap gap-3" style={{ "--i": 2 } as React.CSSProperties}>
            <Link
              href="/menu"
              className="rounded-full bg-paper px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-leaf"
            >
              Open the full menu
            </Link>
            <a
              href={wa(BIZ.restaurant.whatsapp, "Hello Big Brothers Restaurant, I would like to order.")}
              className="rounded-full border border-paper/40 px-7 py-3.5 font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              Order on WhatsApp
            </a>
          </div>
          <div className="hero-rise mt-10 flex items-end" style={{ "--i": 3 } as React.CSSProperties}>
            <Image
              src="/images/logo-restaurant.jpg"
              alt="Big Brothers Restaurant badge, established 2023 in Usakos"
              width={720}
              height={847}
              className="h-24 w-24 rounded-full border-2 border-leaf/50 object-cover shadow-xl md:h-28 md:w-28"
            />
          </div>
        </div>
      </section>

      {/* Fold 2: hours and contact as a printed spec sheet, not three cards */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28" aria-label="Hours and contact">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.01em]">Kitchen hours</h2>
            <dl className="mt-6 max-w-xl text-[15px]">
              {BIZ.restaurant.hours.map((h) => (
                <div
                  key={h.days}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
                >
                  <dt className="text-mut">{h.days}</dt>
                  <dd className="font-display text-lg font-semibold tabular-nums">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 max-w-md text-sm text-mut">
              Kitchen hours can change on public holidays. A quick WhatsApp confirms it.
            </p>

            <h2 className="mt-12 font-display text-3xl font-semibold tracking-[-0.01em]">Talk to the kitchen</h2>
            <ul className="mt-5 max-w-xl divide-y divide-line border-y border-line text-[15px]">
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <span className="text-mut">Phone and WhatsApp</span>
                <a href={`tel:${BIZ.restaurant.phone}`} className="font-display text-lg font-semibold underline decoration-ember decoration-2 underline-offset-4">
                  {BIZ.restaurant.phoneDisplay}
                </a>
              </li>
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <span className="text-mut">Email</span>
                <a href={`mailto:${BIZ.restaurant.email}`} className="font-semibold underline underline-offset-4">
                  {BIZ.restaurant.email}
                </a>
              </li>
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <span className="text-mut">On the plate today</span>
                <span className="font-semibold">Ask for the matangara. It moves fast.</span>
              </li>
            </ul>
          </div>

          <aside className="h-fit bg-ink p-8 text-paper md:sticky md:top-28">
            <h2 className="font-display text-2xl font-semibold">Where to find us</h2>
            <p className="mt-4 text-sm leading-relaxed text-paper/85">
              {BIZ.address.street}
              <br />
              {BIZ.address.area}
            </p>
            <p className="mt-4 text-sm text-paper/70">
              {BIZ.distances.swakopmundKm} km from Swakopmund, {BIZ.distances.windhoekKm} km from
              Windhoek, right on the B2, opposite the Shell station.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-leaf"
            >
              Directions & map
            </Link>
          </aside>
        </div>
      </section>

      {/* Fold 3: the dish carousel, real plates only, prices from the printed menu.
       * A real widget: drag, swipe, arrows. */}
      <section className="bg-cream py-16 md:py-24" aria-label="From the kitchen">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] md:text-4xl">
              Straight from our kitchen
            </h2>
            <p className="max-w-[42ch] text-sm text-mut">Drag, swipe, or use the arrows. Every price comes from the printed menu.</p>
          </div>
          <div className="mt-8">
            <DishCarousel />
          </div>
        </div>
      </section>

      {/* Fold 4: one closing action, typographic */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center md:px-6 md:py-28" aria-label="Menu call to action">
        <p className="mx-auto max-w-[30ch] font-display text-3xl font-semibold leading-tight tracking-[-0.01em] md:text-4xl">
          Breakfast from 07:00. Kapana till late.
        </p>
        <p className="mx-auto mt-4 max-w-lg text-mut">
          The full menu carries every price we charge, from a N$30 russian to the N$400 seafood
          platter. No surprises when the bill arrives.
        </p>
        <Link
          href="/menu"
          className="mt-8 inline-block font-semibold text-ink underline decoration-ember decoration-2 underline-offset-8 transition-colors hover:text-ember-deep"
        >
          Open the full menu
        </Link>
      </section>
    </>
  );
}
