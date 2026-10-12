"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { ScrubText } from "./motion";
import { BIZ, wa } from "@/lib/site-data";

/* Home · Photographic macrostructure. Full-bleed photo folds carry the page;
 * type stays small and quiet between folds. One orchestrated entrance on
 * load (hero), one scroll device per section after that. */

export function HomeView() {
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "18%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  return (
    <>
      {/* ATTENTION: the fold is a photograph. Caption in the corner, two CTAs, no badges. */}
      <section ref={heroRef} className="relative overflow-hidden bg-ink text-paper" aria-label="Welcome">
        <motion.div style={{ y: heroY }} className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/hero-platter.jpg"
            alt=""
            fill
            priority
            quality={60}
            sizes="100vw"
            className="scale-105 object-cover"
          />
        </motion.div>
        {/* Single-hue ink wash, bottom-weighted, for text legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,oklch(18%_0.008_70/0.55)_0%,oklch(18%_0.008_70/0.35)_45%,oklch(18%_0.008_70/0.82)_100%)]"
        />

        <motion.div style={{ opacity: heroFade }} className="relative">
          <div className="mx-auto flex min-h-[86svh] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center md:px-6">
            <h1 className="hero-rise mx-auto max-w-5xl font-display text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.05] tracking-[-0.02em]" style={{ "--i": 0 } as React.CSSProperties}>
              Home away from home,{" "}
              <span className="text-ember">halfway to everywhere.</span>
            </h1>
            <p className="hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-paper/85" style={{ "--i": 1 } as React.CSSProperties}>
              A guesthouse, a bed and breakfast, and Big Brothers Restaurant, together behind one
              gate on the B2 in Usakos.
            </p>
            <div className="hero-rise mt-9 flex flex-wrap items-center justify-center gap-3" style={{ "--i": 2 } as React.CSSProperties}>
              <Link
                href="/menu"
                className="rounded-full bg-paper px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-ember hover:text-ink"
              >
                See the menu
              </Link>
              <a
                href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, do you have a room available?")}
                className="rounded-full border border-paper/40 px-7 py-3.5 font-semibold text-paper transition-colors hover:bg-paper/10"
              >
                Book on WhatsApp
              </a>
            </div>
          </div>
          {/* Photographic caption, corner-anchored */}
          <p className="caption absolute bottom-5 right-5 hidden text-right md:block">
            The Big Brother platter, made for sharing
          </p>
        </motion.div>
      </section>

      {/* INTEREST, opener: an editorial text fold with the honest distances */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28" aria-label="Where we are">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <h2 className="max-w-[16ch] font-display text-3xl font-semibold leading-tight tracking-[-0.01em] md:text-4xl">
            Halfway between Windhoek and the sea.
          </h2>
          <div className="max-w-[62ch] text-lg leading-relaxed text-mut">
            <p>
              Usakos sits on the B2, {BIZ.distances.windhoekKm} km from Windhoek and{" "}
              {BIZ.distances.swakopmundKm} km from Swakopmund, with the rocky shapes of the Erongo
              Region all around. We sit right in that stretch: Plot 7, Laaste Begin, Usakos South,
              on the bench of the Khan River, opposite the Shell station.
            </p>
            <p className="mt-4">
              Stop for a room, stop for a plate, or stop for both. The kitchen opens from 07:00,
              the bar stays cold, and the gate is marked Big Brother.
            </p>
          </div>
        </div>
      </section>

      {/* INTEREST: the bento. Three columns by three rows, spans 2x2 + 1 + 1 + 2 + 1,
          grid-flow-dense, zero empty cells. */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6 md:pb-28" aria-label="What we offer">
        <div className="grid auto-rows-[13rem] grid-flow-dense gap-4 md:auto-rows-[15rem] md:grid-cols-3">
          {/* A: guesthouse, 2x2 */}
          <BentoCell
            href="/guesthouse"
            img="/images/dish-feast.jpg"
            alt="Braai feast served in the guesthouse garden"
            title="Big Brother Guesthouse"
            line="Spacious rooms, mountain views, pools and a garden."
            cta="Plan your stay"
            className="row-span-2 md:col-span-2 md:row-span-2"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
          {/* B: B&B */}
          <BentoCell
            href="/guesthouse"
            img="/images/dish-breakfast.jpg"
            alt="Breakfast tray with eggs, bacon and toast"
            title="Bed & Breakfast"
            line="Three luxury en suite rooms, breakfast included."
            cta="See the B&B"
            className="md:col-span-1"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* C: restaurant */}
          <BentoCell
            href="/restaurant"
            img="/images/dish-braise.jpg"
            alt="Slow braised meat with peppers and pap"
            title="Big Brothers Restaurant"
            line="Grills, seafood, pizza and a full bar, est. 2023."
            cta="Visit the restaurant"
            className="md:col-span-1"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* D: bar, wide */}
          <BentoCell
            href="/restaurant"
            img="/images/cocktail-blue.jpg"
            alt="Blue cocktail from the Big Brothers bar"
            title="The bar"
            line="Cold drinks while the grill does its work."
            cta="See the drinks"
            className="md:col-span-2"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
          {/* E: day visits */}
          <BentoCell
            href="/facilities"
            img="/images/dish-chips.jpg"
            alt="Welcome plate of seasoned chips with sauce writing"
            title="Day visits"
            line="Come enjoy the day with family and friends."
            cta="Facilities & functions"
            className="md:col-span-1"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </section>

      {/* DESIRE: sticky stop-over. Left pane pins, right photos scroll past. */}
      <section className="bg-cream" aria-label="Why stop at Big Brother">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
          <div className="md:sticky md:top-28 md:h-fit">
            <h2 className="max-w-[18ch] font-display text-3xl font-semibold leading-tight tracking-[-0.01em] md:text-4xl">
              Travelling the B2? Stop where the road gets friendly.
            </h2>
            <p className="mt-5 max-w-[58ch] leading-relaxed text-mut">
              Whether you travel for business, on holiday, or you are just passing through the
              Erongo Region, you will find comfort, convenience, and friendly service behind one
              gate. Rooms for the night, a table for dinner, and space for the function in
              between.
            </p>
            <ul className="mt-7 grid gap-2.5 text-[15px] text-ink sm:grid-cols-2">
              {["Restaurant & bar on site", "Free Wi-Fi", "Secure gated parking", "Swimming pools & garden", "Daily housekeeping", "Functions & boardroom"].map(
                (f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check size={16} strokeWidth={3} className="shrink-0 text-leaf-deep" aria-hidden="true" />
                    {f}
                  </li>
                )
              )}
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-ink px-7 py-3.5 font-semibold text-paper transition-colors hover:bg-ember-deep"
            >
              Find us on the B2
            </Link>
          </div>

          <div className="grid gap-5">
            <div className="photo-frame relative aspect-[4/3]">
              <Image
                src="/images/dish-chips.jpg"
                alt="Welcome plate of seasoned chips with sauce writing"
                fill
                loading="lazy"
                quality={55}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="photo-frame relative aspect-[4/3] md:ml-10">
              <Image
                src="/images/cocktail-blue.jpg"
                alt="Blue cocktail from the Big Brothers bar"
                fill
                loading="lazy"
                quality={55}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="photo-frame relative aspect-[4/3]">
              <Image
                src="/images/dish-wings.jpg"
                alt="Chicken wings platter with lemon and tomato"
                fill
                loading="lazy"
                quality={55}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DESIRE, closer: scrub-revealed prices, then one typographic action */}
      <section className="bg-ink py-24 text-paper md:py-32" aria-label="From the kitchen">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <ScrubText
            className="scrub-line font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold leading-[1.25] tracking-[-0.01em]"
            text="Kapana with pap at N$120. T-bone at N$230. Seafood platter at N$400. Every price comes straight from our own printed menu, nothing hidden."
          />
          <Link
            href="/menu"
            className="mt-9 inline-block font-semibold text-paper underline decoration-ember decoration-2 underline-offset-8 transition-colors hover:text-ember"
          >
            Open the full menu
          </Link>
        </div>
      </section>
    </>
  );
}

/* Bento cell: photograph fills the tile, caption bar anchors the bottom.
 * Hover physics: one signal, slow image scale inside the clipped frame. */
function BentoCell({
  href,
  img,
  alt,
  title,
  line,
  cta,
  className = "",
  sizes,
}: {
  href: string;
  img: string;
  alt: string;
  title: string;
  line: string;
  cta: string;
  className?: string;
  sizes: string;
}) {
  return (
    <Link
      href={href}
      className={`group photo-frame relative block ${className}`}
      aria-label={`${title}: ${line}`}
    >
      <Image
        src={img}
        alt={alt}
        fill
        loading="lazy"
        quality={55}
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(180deg,transparent_0%,oklch(18%_0.008_70/0.85)_100%)]"
      />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <span className="block">
          <span className="block font-display text-xl font-semibold text-paper md:text-2xl">{title}</span>
          <span className="mt-1 block text-sm text-paper/85">{line}</span>
        </span>
        <span className="hidden shrink-0 text-sm font-semibold text-paper underline decoration-ember decoration-2 underline-offset-4 md:block">
          {cta}
        </span>
      </span>
    </Link>
  );
}
