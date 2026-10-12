"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";
import { BIZ, wa } from "@/lib/site-data";

export function RestaurantView() {
  return (
    <>
      {/* Restaurant hero: scale device */}
      <section className="relative overflow-hidden bg-ember text-white" aria-label="Big Brothers Restaurant">
        <div className="hero-bg absolute inset-0 opacity-20" aria-hidden="true">
          <Image src="/images/hero-braise.jpg" alt="" fill priority quality={25} sizes="100vw" className="object-cover" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <Reveal family="slide">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Est. {BIZ.established.restaurant} · Usakos</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-6xl">
              {BIZ.restaurant.name}. Your favourite restaurant in Usakos.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
              {BIZ.restaurant.tagline}. Local flavours, hearty favourites, township classics, grills, seafood,
              pizza and a full bar, served with views of the rocky landscapes around town.
            </p>
          </Reveal>
          <Reveal family="rise" index={2} className="mt-8 flex flex-wrap gap-3">
            <Link href="/menu" className="rounded-full bg-white px-6 py-3 font-semibold text-ink transition-transform hover:scale-[1.03]">
              Open the full menu
            </Link>
            <a
              href={wa(BIZ.restaurant.whatsapp, "Hello Big Brothers Restaurant, I would like to order.")}
              className="rounded-full border border-white/50 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Order on WhatsApp
            </a>
          </Reveal>
        </div>
      </section>

      {/* Hours + contact: wipe device */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20" aria-label="Hours and contact">
        <div className="grid gap-6 md:grid-cols-3">
          <Reveal family="wipe">
            <div className="h-full rounded-3xl border border-line bg-white p-7">
              <h2 className="font-display text-xl font-semibold">Business hours</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {BIZ.restaurant.hours.map((h) => (
                  <li key={h.days} className="flex items-baseline justify-between gap-3 border-b border-line/60 pb-3">
                    <span className="text-mut">{h.days}</span>
                    <span className="font-display text-lg font-semibold">{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-mut">Kitchen hours can change on public holidays. A quick WhatsApp confirms it.</p>
            </div>
          </Reveal>
          <Reveal family="wipe" index={1}>
            <div className="h-full rounded-3xl border border-line bg-white p-7">
              <h2 className="font-display text-xl font-semibold">Contact the kitchen</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <span className="block text-mut">Phone and WhatsApp</span>
                  <a href={`tel:${BIZ.restaurant.phone}`} className="font-display text-lg font-semibold">
                    {BIZ.restaurant.phoneDisplay}
                  </a>
                </li>
                <li>
                  <span className="block text-mut">Email</span>
                  <a href={`mailto:${BIZ.restaurant.email}`} className="font-semibold underline decoration-ember/60 underline-offset-4">
                    {BIZ.restaurant.email}
                  </a>
                </li>
                <li>
                  <span className="block text-mut">Social</span>
                  <span className="font-semibold">Facebook: Big Brothers Restaurant</span>
                  <span className="block text-mut">Telegram: Big Brothers Restaurant</span>
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal family="wipe" index={2}>
            <div className="h-full rounded-3xl bg-ink p-7 text-paper">
              <h2 className="font-display text-xl font-semibold">Where to find us</h2>
              <p className="mt-4 text-sm leading-relaxed text-paper/85">
                {BIZ.address.street}
                <br />
                {BIZ.address.area}
              </p>
              <p className="mt-4 text-sm text-paper/70">
                {BIZ.distances.swakopmundKm} km from Swakopmund, {BIZ.distances.windhoekKm} km from Windhoek, right on
                the B2.
              </p>
              <Link href="/contact" className="mt-5 inline-block rounded-full bg-leaf px-5 py-2.5 text-sm font-semibold text-ink">
                Directions & map
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DISH RAIL: horizontal scroll-snap device, different family from neighbours */}
      <section className="py-6 md:py-10" aria-label="From the kitchen">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal family="wipe">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-semibold md:text-4xl">Straight from our kitchen</h2>
              <p className="hidden text-sm text-mut md:block">Drag or scroll sideways</p>
            </div>
          </Reveal>
          <div className="rail mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
            {[
              { src: "/images/dish-traditional.jpg", alt: "Pap with matangara and spinach", cap: "Matangara & pap, a township classic" },
              { src: "/images/dish-steak.jpg", alt: "T-bone steak with chips and vegetables", cap: "T-bone, N$230" },
              { src: "/images/dish-pizza.jpg", alt: "Freshly baked pizza", cap: "Pizzas from N$190" },
              { src: "/images/dish-wings.jpg", alt: "Chicken wings with lemon and tomato", cap: "Wings from N$80" },
              { src: "/images/dish-fish.jpg", alt: "Crumbed fish with rice and sauce", cap: "Hake fillet, N$100" },
              { src: "/images/dish-schnitzel.jpg", alt: "Crumbled schnitzel with mash", cap: "Schnitzel & cheddarmelt, N$150" },
              { src: "/images/dish-english.jpg", alt: "English breakfast with eggs and steak", cap: "English breakfast, N$130" },
              { src: "/images/cocktail-sunrise.jpg", alt: "Tequila sunrise cocktail", cap: "Tequila sunrise, N$100" },
            ].map((d, i) => (
              <Reveal key={d.src} family="scale" index={i} className="snap-start">
                <figure className="w-72 shrink-0 overflow-hidden rounded-3xl border border-line bg-white md:w-80">
                  <Image src={d.src} alt={d.alt} width={900} height={675} className="aspect-[4/3] w-full object-cover" sizes="320px" />
                  <figcaption className="px-5 py-3 text-sm font-medium">{d.cap}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Menu CTA band: rise device */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-8 md:px-6" aria-label="Menu call to action">
        <Reveal family="rise">
          <div className="rounded-3xl bg-ink-soft px-6 py-12 text-center text-paper md:px-12">
            <p className="font-display text-2xl font-semibold md:text-3xl">Breakfast at 07:00, kapana till late.</p>
            <p className="mx-auto mt-3 max-w-lg text-sm text-paper/75">
              The full menu carries every price we charge, from a N$30 russian to the N$400 seafood platter. No
              surprises when the bill arrives.
            </p>
            <Link href="/menu" className="mt-7 inline-block rounded-full bg-ember px-8 py-4 font-semibold text-white transition-transform hover:scale-[1.03]">
              Open the full menu
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
