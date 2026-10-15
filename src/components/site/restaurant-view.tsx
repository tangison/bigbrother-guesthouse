"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { DishCarousel } from "./dish-carousel";
import { ReserveCard } from "./reserve-card";
import { RESTAURANT } from "@/lib/site-data";

/* Restaurant · Photographic folds. The hero is a background slideshow of the
 * owner's own interior photographs (round 6), opening on the counter-and-
 * tables shot the owner picked as the starting image. Hours read as a printed
 * spec sheet; the dish rail keeps the real plates moving; "Book a table"
 * embeds the reservation form right on the page. This is the RESTAURANT
 * brand: lime scope, town centre address, the supplied badge logo. */

/* Hero background slideshow. Slide 1 is the owner-specified starting image.
 * Manual-free ambient behaviour mirrors the home hero: slow crossfade, no
 * controls, no captions, reduced motion gets one still photograph. */
const HERO_SLIDES = [
  {
    src: "/images/restaurant-interior-counter.jpg",
    alt: "Inside Big Brothers Restaurant: the counter, tables with yellow runners and the drinks fridge",
  },
  {
    src: "/images/restaurant-interior-wide.jpg",
    alt: "The restaurant dining room set for supper",
  },
  {
    src: "/images/restaurant-interior-fridges.jpg",
    alt: "The restaurant counter with display fridges and tables",
  },
  {
    src: "/images/restaurant-interior-evening.jpg",
    alt: "Evening light inside the restaurant, tables set and fridge stocked",
  },
  {
    src: "/images/restaurant-bar-taps.jpg",
    alt: "The wooden bar with beer taps and high tables",
  },
];

const HERO_INTERVAL = 6500;

function RestaurantHeroSlideshow() {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<number[]>([0]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || document.hidden) return;
    const id = window.setInterval(() => {
      if (!document.hidden) {
        setActive((a) => {
          const next = (a + 1) % HERO_SLIDES.length;
          setSeen((s) => (s.includes(next) ? s : [...s, next]));
          return next;
        });
      }
    }, HERO_INTERVAL);
    return () => window.clearInterval(id);
  }, [active, reduced]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          {seen.includes(i) && (
            <Image
              src={s.src}
              alt=""
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              quality={48}
              sizes="100vw"
              className={`object-cover ${i === active ? "kenburns" : ""}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function RestaurantView() {
  return (
    <>
      {/* Fold 1: full-bleed interior slideshow, badge bottom-left */}
      <section className="relative overflow-hidden bg-ink text-paper" aria-label="Big Brothers Restaurant">
        <RestaurantHeroSlideshow />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,oklch(18%_0.008_70/0.6)_0%,oklch(18%_0.008_70/0.4)_50%,oklch(18%_0.008_70/0.85)_100%)]"
        />
        <div className="relative mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-4 pb-20 pt-28 md:px-6">
          <h1 className="hero-rise max-w-4xl font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[1.06] tracking-[-0.02em]" style={{ "--i": 0 } as React.CSSProperties}>
            Big Brothers Restaurant.
            <span className="block text-lime">Good food, great vibes.</span>
          </h1>
          <p className="hero-rise mt-5 max-w-2xl text-lg leading-relaxed text-paper/85" style={{ "--i": 1 } as React.CSSProperties}>
            Local flavours, hearty favourites, township classics, grills, seafood, pizza and a
            full bar, served with views of the rocky landscapes around Usakos.
          </p>
          <div className="hero-rise mt-8 flex flex-wrap gap-3" style={{ "--i": 2 } as React.CSSProperties}>
            <Link
              href="#book-a-table"
              className="rounded-full bg-paper px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-lime"
            >
              Book a table
            </Link>
            <Link
              href="/restaurant/menu"
              className="rounded-full border border-paper/40 px-7 py-3.5 font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              See the menu
            </Link>
          </div>
          <div className="hero-rise mt-10 flex items-end" style={{ "--i": 3 } as React.CSSProperties}>
            <Image
              src="/logos/logo-restaurant.png"
              alt="Big Brothers Restaurant, Usakos, established 2023"
              width={96}
              height={96}
              className="h-24 w-24 object-contain drop-shadow-xl md:h-28 md:w-28"
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
              <div className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                <dt className="text-mut">Monday to Saturday</dt>
                <dd className="font-display text-lg font-semibold">Open from 09:30 / 10:00</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                <dt className="text-mut">Opening time</dt>
                <dd className="font-display text-lg font-semibold">09:30 or 10:00, depending on the day</dd>
              </div>
            </dl>
            <p className="mt-4 max-w-md text-sm text-mut">
              Kitchen hours can change on public holidays. A quick WhatsApp confirms it.
            </p>

            <h2 className="mt-12 font-display text-3xl font-semibold tracking-[-0.01em]">Talk to the kitchen</h2>
            <ul className="mt-5 max-w-xl divide-y divide-line border-y border-line text-[15px]">
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <span className="text-mut">Phone and WhatsApp</span>
                <a href={`tel:${RESTAURANT.phoneEat}`} className="font-display text-lg font-semibold underline decoration-ember decoration-2 underline-offset-4">
                  {RESTAURANT.phoneEatDisplay}
                </a>
              </li>
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <span className="text-mut">Email</span>
                <a href={`mailto:${RESTAURANT.email}`} className="font-semibold underline underline-offset-4">
                  {RESTAURANT.email}
                </a>
              </li>
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <span className="text-mut">On the plate today</span>
                <span className="font-semibold">Ask for the matangara. It moves fast.</span>
              </li>
            </ul>
          </div>

          <aside className="h-fit bg-ink p-8 text-paper md:sticky md:top-32">
            <h2 className="font-display text-2xl font-semibold">Where to find us</h2>
            <p className="mt-4 text-sm leading-relaxed text-paper/85">
              {RESTAURANT.address.street}
              <br />
              {RESTAURANT.address.area}
            </p>
            <p className="mt-4 text-sm text-paper/70">
              In the middle of Usakos, walking distance from the town shops. The guesthouse, Big Brother
              Guesthouse, sits apart at Plot 7 on the B2.
            </p>
            <Link
              href="/restaurant/contact"
              className="mt-6 inline-block rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-lime"
            >
              Directions &amp; contact
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

      {/* Fold 4: Book a Table, right on the page (owner round 6). WhatsApp
       * and email routing both live in the reserve card. */}
      <section id="book-a-table" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 md:px-6 md:py-24" aria-label="Book a table">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-lime-deep">Book a table</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.01em] md:text-4xl">
            Tell us when, and the table waits for you.
          </h2>
          <p className="mt-4 max-w-[56ch] leading-relaxed text-mut">
            Fill in your details and send it straight to the kitchen on WhatsApp, or by email if you prefer.
            Big groups, birthdays and braai nights: mention it in the notes and we will set the tables.
          </p>
        </div>
        <div className="mt-10">
          <ReserveCard />
        </div>
      </section>

      {/* Fold 5: one closing action, typographic */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center md:px-6 md:py-28" aria-label="Menu call to action">
        <p className="mx-auto max-w-[30ch] font-display text-3xl font-semibold leading-tight tracking-[-0.01em] md:text-4xl">
          Kitchen open Monday to Saturday, from 09:30.
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
