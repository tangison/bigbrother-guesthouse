"use client";

import Image from "next/image";
import { Reveal } from "./reveal";
import { BIZ, wa } from "@/lib/site-data";
import type { ViewKey } from "./nav";

const MARQUEE = "GOOD FOOD, GREAT VIBES · HOME AWAY FROM HOME · USAKOS · NAMIBIA · B2 ROAD · ";

export function HomeView({ go }: { go: (v: ViewKey) => void }) {
  return (
    <>
      {/* HERO: three independent planes. Background texture, middle plate photo, foreground type. */}
      <section className="relative overflow-hidden bg-ink text-paper" aria-label="Welcome">
        <div className="hero-bg absolute inset-0 opacity-[0.16]" aria-hidden="true">
          <Image src="/images/hero-platter.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(140,198,63,0.14),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(238,114,3,0.12),transparent_50%)]" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-12 md:grid-cols-[1.15fr_0.85fr] md:items-center md:px-6 md:pb-24 md:pt-16">
          <div>
            <Reveal family="slide">
              <p className="inline-flex items-center gap-2 rounded-full border border-leaf/40 bg-leaf/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-leaf">
                Usakos · Erongo Region · Namibia
              </p>
            </Reveal>
            <Reveal family="rise" index={1}>
              <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight md:text-6xl">
                Home away from home,
                <span className="block text-leaf">halfway to everywhere.</span>
              </h1>
            </Reveal>
            <Reveal family="rise" index={2}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/80 md:text-lg">
                Big Brother Holdings brings three experiences together in one welcoming town on the B2: a
                guesthouse, a bed and breakfast, and a restaurant. {BIZ.distances.windhoekKm} km from Windhoek,{" "}
                {BIZ.distances.swakopmundKm} km from Swakopmund, with views of Usakos&rsquo; rocky landscapes.
              </p>
            </Reveal>
            <Reveal family="rise" index={3} className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={() => go("menu")}
                className="rounded-full bg-ember px-6 py-3 font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                See the menu
              </button>
              <a
                href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, do you have a room available?")}
                className="rounded-full border border-paper/30 px-6 py-3 font-semibold text-paper transition-colors hover:bg-paper/10"
              >
                Book a room on WhatsApp
              </a>
            </Reveal>
            <Reveal family="rise" index={4}>
              <dl className="mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-paper/15 pt-5 text-sm">
                <div>
                  <dt className="text-paper/60">From Windhoek</dt>
                  <dd className="font-display text-xl font-semibold">{BIZ.distances.windhoekKm} km</dd>
                </div>
                <div>
                  <dt className="text-paper/60">From Swakopmund</dt>
                  <dd className="font-display text-xl font-semibold">{BIZ.distances.swakopmundKm} km</dd>
                </div>
                <div>
                  <dt className="text-paper/60">Kitchen open</dt>
                  <dd className="font-display text-xl font-semibold">from 07:00</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Middle plane: the plate. Foreground plane: the restaurant badge. */}
          <div className="relative mx-auto w-full max-w-sm">
            <Reveal family="scale">
              <div className="hero-fg relative overflow-hidden rounded-[2rem] border border-paper/15 shadow-2xl">
                <Image
                  src="/images/hero-platter.jpg"
                  alt="Big Brothers Restaurant feast platter with pap, chicken and salads"
                  width={900}
                  height={1200}
                  priority
                  className="h-auto w-full object-cover"
                />
                <p className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-paper">
                  The Big Brother platter, made for sharing
                </p>
              </div>
            </Reveal>
            <Reveal family="rise" index={2} className="absolute -left-6 -top-6 hidden md:block">
              <Image
                src="/images/logo-restaurant.jpg"
                alt="Big Brothers Restaurant badge, established 2023"
                width={150}
                height={150}
                className="hero-fg rounded-full border-2 border-leaf/50 shadow-xl"
              />
            </Reveal>
          </div>
        </div>

        {/* Marquee strip: motion device 2 */}
        <div className="relative border-t border-paper/10 py-3" aria-hidden="true">
          <div className="marquee-track flex w-max whitespace-nowrap font-display text-sm font-medium uppercase tracking-[0.22em] text-paper/50">
            <span className="pr-4">{MARQUEE.repeat(3)}</span>
            <span className="pr-4">{MARQUEE.repeat(3)}</span>
          </div>
        </div>
      </section>

      {/* THREE PILLARS: wipe device */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24" aria-label="What we offer">
        <Reveal family="wipe">
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            One gate, three reasons to stop.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              t: "Big Brother Guesthouse",
              d: "Spacious rooms with mountain views, secure parking, a pool and garden, and a relaxed atmosphere for unwinding after a long trip.",
              img: "/images/dish-feast.jpg",
              alt: "Guesthouse garden feast on the braai platter",
              go: "guesthouse" as ViewKey,
              cta: "Explore the stay",
              color: "bg-ember",
            },
            {
              t: "Big Brother Bed & Breakfast",
              d: "Three luxury, spacious en suite rooms with free internet access. Cosy, personal, and made for couples and small families.",
              img: "/images/dish-breakfast.jpg",
              alt: "Breakfast tray with eggs, bacon and toast",
              go: "guesthouse" as ViewKey,
              cta: "See the B&B",
              color: "bg-leaf-deep",
            },
            {
              t: "Big Brothers Restaurant",
              d: "Great food with even better views. Local flavours, hearty favourites, grills, seafood, pizza and a full bar, est. 2023.",
              img: "/images/dish-braise.jpg",
              alt: "Slow braised meat with peppers and pap",
              go: "restaurant" as ViewKey,
              cta: "Visit the restaurant",
              color: "bg-ink",
            },
          ].map((p, i) => (
            <Reveal key={p.t} family="wipe" index={i}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    width={900}
                    height={675}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-semibold">{p.t}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-mut">{p.d}</p>
                  <button
                    onClick={() => go(p.go)}
                    className={`mt-5 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white ${p.color}`}
                  >
                    {p.cta} <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* THE STOP-OVER BAND: slide device, dark ground shift */}
      <section className="bg-ink-soft text-paper" aria-label="Why stop at Big Brother">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center md:px-6 md:py-24">
          <Reveal family="slide">
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
              Travelling the B2?
              <span className="block text-ember">Stop where the road gets friendly.</span>
            </h2>
            <p className="mt-5 leading-relaxed text-paper/80">
              We sit on the B2 at Plot 7, Laaste Begin, Usakos South, on the bench of the Khan River, 1 km off the
              southern turn-off opposite the Shell station. Whether you are travelling for business, on holiday, or
              just passing through the Erongo Region, you will find comfort, convenience, and friendly service.
            </p>
            <ul className="mt-6 grid gap-2 text-sm text-paper/85 sm:grid-cols-2">
              {["Restaurant & bar on site", "Free Wi-Fi", "Secure gated parking", "Swimming pools & garden", "Daily housekeeping", "Functions & boardroom"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-leaf" aria-hidden="true">✔</span> {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal family="scale" index={1}>
            <div className="grid grid-cols-2 gap-4">
              <Image src="/images/dish-chips.jpg" alt="Welcome plate of seasoned chips with sauce writing" width={900} height={675} className="rounded-2xl object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              <Image src="/images/cocktail-blue.jpg" alt="Blue cocktail from the Big Brothers bar" width={900} height={675} className="mt-8 rounded-2xl object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              <Image src="/images/dish-wings.jpg" alt="Chicken wings platter with lemon and tomato" width={900} height={675} className="rounded-2xl object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              <Image src="/images/dish-steak.jpg" alt="T-bone steak with chips and vegetables" width={900} height={675} className="mt-8 rounded-2xl object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PEAK TEASER: rise device */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center md:px-6 md:py-24" aria-label="Menu invitation">
        <Reveal family="rise">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">From the kitchen</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight md:text-5xl">
            Kapana with pap at N$120. T-bone at N$230. Seafood platter at N$400.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-mut">
            Every price on our menu comes straight from our kitchen, nothing hidden. Have a look, then come hungry.
          </p>
          <button
            onClick={() => go("menu")}
            className="mt-8 rounded-full bg-ink px-8 py-4 font-semibold text-paper transition-transform hover:scale-[1.03]"
          >
            Open the full menu
          </button>
        </Reveal>
      </section>
    </>
  );
}
