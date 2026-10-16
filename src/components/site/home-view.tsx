"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { HeroSlider } from "./hero-slider";
import { DishCarousel } from "./dish-carousel";
import { BIZ, wa } from "@/lib/site-data";

/* Home · scroll-craft journey (BRIEF.md: scrollcraft/builds/bigbrother-home).
 * Grammar: chaptered editorial, photographic. Hard ground cuts between folds,
 * no drift. Devices: layered hero (parallax + slider widget), pin + counts
 * (argument), flow+in (offers), pan (property peak), flow + carousel widget
 * (menu), reveal wipe (region), pin + spotlight + magnet (close).
 * Facts: distances from the client contact page; prices from the printed A3
 * menu v3; property photos all supplied by the owner (originals/gofile). */

const PROPERTY_SHOTS = [
  {
    src: "/images/building-main-yellow.jpg",
    alt: "Main guesthouse building painted yellow and green",
  },
  {
    src: "/images/pool-umbrellas-lapas.jpg",
    alt: "Swimming pool with umbrellas and thatched lapas",
  },
  {
    src: "/images/pool-lapa-mountains.jpg",
    alt: "Thatched lapa and pool with the hills behind",
  },
  {
    src: "/images/bar-thatch-menu-board.jpg",
    alt: "Thatched bar with the Big Brother menu board",
  },
  {
    src: "/images/patio-green-shade-floor.jpg",
    alt: "Shaded patio with tables on the painted stone floor",
  },
];

export function HomeView() {
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "16%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.85], [1, 0.3]);

  return (
    <>
      {/* 1 · RECOGNITION: layered hero. Slider is the ground plane, type rides 1x,
       * the photo plane drifts slower, the wash keeps the corner readable. */}
      <section ref={heroRef} data-sc-act="flow" className="relative overflow-hidden bg-ink text-paper" aria-label="Welcome">
        <motion.div style={{ y: heroY }} className="absolute inset-0" aria-hidden="true">
          <HeroSlider />
        </motion.div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(18%_0.008_70/0.45)_0%,oklch(18%_0.008_70/0.28)_45%,oklch(18%_0.008_70/0.86)_100%)]"
        />

        <motion.div style={{ opacity: heroFade }} className="relative">
          <div className="mx-auto flex min-h-[92svh] max-w-6xl flex-col items-center justify-center px-4 pb-28 pt-24 text-center md:px-6">
            <h1 className="hero-rise mx-auto max-w-5xl font-display text-[clamp(2.4rem,5.6vw,4.8rem)] font-semibold leading-[1.05] tracking-[-0.02em]" style={{ "--i": 0 } as React.CSSProperties}>
              Home away from home,{" "}
              <span className="text-ember">halfway to everywhere.</span>
            </h1>
            <p className="hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-paper/85" style={{ "--i": 1 } as React.CSSProperties}>
              Big Brother Guesthouse on the B2 at Plot 7, and Big Brothers
              Restaurant in the middle of Usakos town. Two places, one welcome.
            </p>
            <div className="hero-rise mt-9 flex flex-wrap items-center justify-center gap-3" style={{ "--i": 2 } as React.CSSProperties}>
              <Link
                href="/menu"
                className="rounded-full bg-paper px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-ember hover:text-ink"
              >
                Guesthouse menu
              </Link>
              <Link
                href="/restaurant/menu"
                className="rounded-full bg-paper px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-lime hover:text-ink"
              >
                Restaurant menu
              </Link>
              <a
                href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, do you have a room available?")}
                className="rounded-full border border-paper/40 px-7 py-3.5 font-semibold text-paper transition-colors hover:bg-paper/10"
              >
                Book on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2 · RELIEF: pinned argument. The two real distances count in as the frame
       * holds. First cue greets (ground rule), last cue runs to the end of the act. */}
      <section data-sc-act="pin" data-sc-span="2.5" className="bg-ink text-paper" aria-label="Halfway between Windhoek and Swakopmund">
        <div data-sc-stage className="sc-stage">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_38%,oklch(23%_0.012_70)_0%,oklch(18%_0.008_70)_100%)]"
          />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="w-full max-w-3xl text-center">
              <p data-sc-cue="0 0.3 0 0.06" className="font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-semibold leading-[1.18] tracking-[-0.015em]">
                Travelling the B2? We are the middle of it.
              </p>
              <p data-sc-cue="0.24 0.56 0.05 0.05" className="mt-6 font-display text-[clamp(2.6rem,7vw,5.4rem)] font-semibold leading-none tracking-[-0.02em]">
                <span data-sc-count="0 210">210</span>
                <span className="text-[0.32em] font-body font-medium uppercase tracking-[0.14em] text-paper/70"> km from Windhoek</span>
              </p>
              <p data-sc-cue="0.5 0.8 0.05 0.05" className="mt-6 font-display text-[clamp(2.6rem,7vw,5.4rem)] font-semibold leading-none tracking-[-0.02em]">
                <span data-sc-count="0 147">147</span>
                <span className="text-[0.32em] font-body font-medium uppercase tracking-[0.14em] text-paper/70"> km from Swakopmund</span>
              </p>
              <p data-sc-cue="0.74 1 0.05 0" className="mt-9 text-lg leading-relaxed text-paper/85">
                Plot 7, Laaste Begin, on the bench of the Khan River. The gate is marked Big
                Brother, opposite the Shell station.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · CALM: the bento, entering on scroll. Quiet on purpose: the peak needs
       * something quiet in front of it. */}
      <section data-sc-act="flow" className="bg-paper" aria-label="What we offer">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
          <div data-sc-in data-sc-stagger="70" className="grid gap-4 md:auto-rows-[15rem] md:grid-flow-dense md:grid-cols-3">
            <BentoCell
              href="/guesthouse"
              img="/images/pool-umbrellas-lapas.jpg"
              alt="Swimming pool with shade umbrellas and thatched lapas"
              title="Big Brother Guesthouse"
              line="Spacious rooms, mountain views, pools and a garden."
              cta="Plan your stay"
              className="md:col-span-2 md:row-span-2"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <BentoCell
              href="/rooms"
              img="/images/dish-breakfast.jpg"
              alt="Breakfast tray with eggs, bacon and toast"
              title="Bed & Breakfast"
              line="Three luxury en suite rooms, breakfast included."
              cta="See the B&B"
              className="md:col-span-1"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <BentoCell
              href="/restaurant"
              img="/images/dish-braise.jpg"
              alt="Slow braised meat with peppers and pap"
              title="Big Brothers Restaurant"
              line="Grills, seafood, pizza and a full bar in town centre."
              cta="Visit the restaurant"
              className="md:col-span-1"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
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
            <BentoCell
              href="/facilities"
              img="/images/property-lapa.jpg"
              alt="The lapa, lawn and pool corner"
              title="Day visits"
              line="Come enjoy the day with family and friends."
              cta="Facilities & functions"
              className="md:col-span-1"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
      </section>

      {/* 4 · ARRIVAL, the peak: the property travels sideways. Clean frames,
       * the owner's own photographs, the largest span on the page. */}
      <section data-sc-act="pan" data-sc-span="4.2" className="bg-cream" aria-label="The property">
        <div data-sc-stage className="sc-stage">
          <div className="flex h-full flex-col justify-center gap-8 py-16">
            <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
              <h2 className="max-w-[22ch] font-display text-3xl font-semibold leading-tight tracking-[-0.01em] md:text-4xl">
                The property, exactly as it is.
              </h2>
              <p className="mt-3 max-w-[58ch] leading-relaxed text-mut">
                Photographs we took ourselves: the building, the pools, the shade and the bar.
                Nothing staged for the website.
              </p>
            </div>
            <div className="w-full">
              <div data-sc-pan="0.06" className="flex w-max items-stretch gap-5 px-[max(1rem,calc((100vw-72rem)/2))]">
                {PROPERTY_SHOTS.map((p) => (
                  <figure key={p.src} className="w-[19rem] shrink-0 snap-start md:w-[22rem]">
                    <div data-sc-tilt="6">
                      <div className="photo-frame aspect-[4/3] w-full">
                        <Image
                          src={p.src}
                          alt={p.alt}
                          width={1400}
                          height={1050}
                          loading="lazy"
                          quality={45}
                          sizes="(max-width: 768px) 76vw, 22rem"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </figure>
                ))}
                <div className="flex w-[17rem] shrink-0 snap-start items-center md:w-[20rem]">
                  <div className="border-l-2 border-ember pl-6">
                    <p className="font-display text-xl font-semibold leading-snug">
                      Checked in on Maps? Check in for real.
                    </p>
                    <Link
                      href="/gallery"
                      className="mt-3 inline-block font-semibold underline decoration-ember decoration-2 underline-offset-4 transition-colors hover:text-ember-deep"
                    >
                      See the full gallery
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 · APPETITE: the dish carousel from the restaurant in town, honestly framed. */}
      <section className="bg-paper" aria-label="From the kitchen">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
          <div data-sc-in data-sc-stagger="70">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="max-w-[20ch] font-display text-3xl font-semibold leading-tight tracking-[-0.01em] md:text-4xl">
                Hungry? The kitchen is in town.
              </h2>
              <p className="max-w-[46ch] text-sm leading-relaxed text-mut">
                Big Brothers Restaurant runs its own kitchen in Usakos town centre, corner of Theo-Ben
                Gurirab and Bismarck. Every price here comes from their printed menu. Drag, swipe, or
                use the arrows.
              </p>
            </div>
            <div className="mt-9">
              <DishCarousel />
            </div>
            <Link
              href="/restaurant/menu"
              className="mt-9 inline-block font-semibold text-ink underline decoration-ember decoration-2 underline-offset-8 transition-colors hover:text-ember-deep"
            >
              Open the restaurant menu, 134 items and every price
            </Link>
          </div>
        </div>
      </section>

      {/* 6 · AWE: the road arrives as a wipe. One line. */}
      <section data-sc-act="flow" className="bg-ink text-paper" aria-label="The road here">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
          <figure data-sc-reveal="up" data-sc-reveal-at="0.2 0.6" className="overflow-hidden">
            <div className="photo-frame aspect-[16/9] w-full md:aspect-[21/9]">
              <Image
                src="/images/region-road.jpg"
                alt="A long straight road running towards desert mountains in Namibia"
                width={1600}
                height={937}
                loading="lazy"
                quality={45}
                sizes="100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </figure>
          <div data-sc-in data-sc-stagger="80" className="mt-8 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <p className="max-w-[24ch] font-display text-3xl font-semibold leading-tight tracking-[-0.01em] md:text-4xl">
              The long middle of the B2. Stop where the road gets friendly.
            </p>
            <div className="text-[15px] leading-relaxed text-paper/75">
              <p>
                Usakos sits on the bench of the Khan River, with the rocky shapes of the Erongo
                Region all around. Gravel roads, granite hills, and a sky that goes on forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · RESOLVE: the page stops and answers. Spotlight, magnetic CTA, hold. */}
      <section data-sc-act="pin" data-sc-span="1.2" className="bg-ink text-paper" aria-label="Book your stop">
        <div data-sc-stage data-sc-spotlight className="sc-stage">
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            {/* Greet-and-hold on the last act: visible the moment the stage enters,
             * holding to the end. The CTA and phone line carry no cue at all: the
             * act needs a ground, and their own opaque fills must survive the
             * contrast pass (a hidden pill gets graded against the page behind). */}
            <h2 data-sc-cue="0 1 0 0" data-sc-kinetic="lines" className="max-w-[18ch] font-display text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
              Rooms for the night. A table for dinner in town. Home away from home.
            </h2>
            <a
              data-sc-magnet="0.26"
              href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, do you have a room available?")}
              className="mt-9 rounded-full bg-ember px-8 py-4 font-semibold text-ink transition-colors hover:bg-paper"
            >
              Book on WhatsApp
            </a>
            <p className="mt-6 text-sm text-paper/70">
              Or call {BIZ.guesthouse.phone1Display} · Plot 7, Laaste Begin, Usakos South
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* Bento cell: photograph fills the tile, title bar anchors the bottom.
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
        quality={45}
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
