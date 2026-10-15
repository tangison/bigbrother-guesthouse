"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { BIZ, wa } from "@/lib/site-data";
import { NEARBY } from "@/lib/nearby";

/* Guesthouse · editorial fold + asymmetric stay split. The client's real
 * logo anchors the hero (it carries the name and tagline, drawn once, used
 * everywhere). Rates stay honest: no invented prices, ever. */

export function GuesthouseView() {
  return (
    <>
      {/* Fold 1: the real logo, transparent PNG straight from the supplied
       * files. No box, no plate: the cream ground carries it. */}
      <section className="bg-cream" aria-label="Guesthouse and B&B">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[0.85fr_1.15fr] md:px-6 md:py-24">
          <div className="hero-rise w-fit">
            <Image
              src="/logos/logo-guesthouse.png"
              alt="Big Brother Guesthouse logo: home away from home"
              width={300}
              height={280}
              priority
              className="h-auto w-full max-w-[300px]"
            />
          </div>
          <div>
            <h1 className="hero-rise max-w-[20ch] font-display text-[clamp(2.2rem,4.6vw,3.9rem)] font-semibold leading-[1.07] tracking-[-0.02em]" style={{ "--i": 1 } as React.CSSProperties}>
              Your home away from home in Usakos.
            </h1>
            <p className="hero-rise mt-5 max-w-[62ch] text-lg leading-relaxed text-mut" style={{ "--i": 2 } as React.CSSProperties}>
              Perfectly placed between Windhoek and Swakopmund, Big Brother Guesthouse offers
              comfortable accommodation, a welcoming restaurant and bar, and facilities for
              events, conferences, and family gatherings. Whether you travel for business,
              leisure, or you are passing through the Erongo Region, you will find comfort,
              convenience, and friendly service.
            </p>
            <div className="hero-rise mt-8 flex flex-wrap gap-3" style={{ "--i": 3 } as React.CSSProperties}>
              <Link
                href="/book"
                className="rounded-full bg-ink px-7 py-3.5 font-semibold text-paper transition-colors hover:bg-ember-deep"
              >
                Check availability
              </Link>
              <Link
                href="/rooms"
                className="rounded-full border border-ink/25 px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-sand/60"
              >
                See rooms and rates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fold 2: two ways to stay, asymmetric 7/5 on desktop. The guesthouse card
       * shows the actual rooms block; the B&B card keeps the breakfast it sells. */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24" aria-label="Ways to stay">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <article>
            <div className="photo-frame aspect-[16/10]">
              <Image
                src="/images/building-main-yellow.jpg"
                alt="The Big Brother Guesthouse main building painted yellow and green"
                fill
                loading="lazy"
                quality={50}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <div className="mt-6 max-w-[60ch]">
              <h2 className="font-display text-2xl font-semibold md:text-3xl">Big Brother Guesthouse</h2>
              <p className="mt-3 leading-relaxed text-mut">
                A peaceful escape for travellers who want space, comfort, and that true home away
                from home feeling. Spacious rooms, beautiful mountain views, and a relaxing
                atmosphere for unwinding after a long trip.
              </p>
              <ul className="mt-5 grid gap-2 text-[15px] sm:grid-cols-2">
                {["Restaurant & bar on site", "Free Wi-Fi", "Secure parking", "Swimming pools & garden areas", "Ideal stopover location", "Functions venue on the property"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check size={16} strokeWidth={3} className="shrink-0 text-leaf-deep" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/facilities"
                className="mt-6 inline-block font-semibold underline decoration-ember decoration-2 underline-offset-8 transition-colors hover:text-ember-deep"
              >
                See the facilities
              </Link>
            </div>
          </article>

          <article className="lg:pt-16">
            <div className="photo-frame relative aspect-[4/3]">
              <Image
                src="/images/dish-breakfast.jpg"
                alt="Fresh breakfast tray included with the B&B"
                fill
                loading="lazy"
                quality={50}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-ink px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-paper">
                Daily bookings paused
              </span>
            </div>
            <div className="mt-6 max-w-[52ch]">
              <h2 className="font-display text-2xl font-semibold md:text-3xl">Big Brother Bed &amp; Breakfast</h2>
              <p className="mt-3 leading-relaxed text-mut">
                Part of Big Brother Guesthouse under the same management, on its own grounds away from the main
                plot. Three luxury, spacious en suite rooms with free internet access. Cosy, personal, and full
                of warmth.
              </p>
              <div className="mt-4 rounded-xl border border-line bg-cream p-4">
                <p className="text-sm leading-relaxed text-mut">
                  <span className="font-semibold text-ink">Currently unavailable for daily bookings.</span> The
                  B&amp;B is occupied under a 1-year long-term corporate lease for mine workers. For longer
                  stays, ask us on WhatsApp and we will tell you what is possible.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Fold 3: the grounds, three real photographs from our own albums */}
      <section className="bg-cream" aria-label="The grounds">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <h2 className="max-w-[24ch] font-display text-3xl font-semibold leading-tight tracking-[-0.01em] md:text-4xl">
            Pools, lapa, garden. All behind the gate.
          </h2>
          <p className="mt-3 max-w-[58ch] text-mut">
            Photographs from our own albums. Have a walk through the grounds before you arrive,
            then come and sit in the shade for real.
          </p>
          <div className="mt-9 grid gap-5 sm:grid-cols-3">
            {[
              { src: "/images/pool-lapa-mountains.jpg", alt: "Thatched lapa and pool with the hills behind" },
              { src: "/images/pool-umbrellas-lapas.jpg", alt: "Swimming pool with umbrellas and thatched lapas" },
              { src: "/images/entrance-gates-welcome.jpg", alt: "Yellow entrance gates with the welcome boards" },
            ].map((p) => (
              <figure key={p.src}>
                <div className="photo-frame aspect-[4/3]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={1200}
                    height={900}
                    loading="lazy"
                    quality={50}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </figure>
            ))}
          </div>
          <Link
            href="/gallery"
            className="mt-7 inline-block font-semibold underline decoration-ember decoration-2 underline-offset-8 transition-colors hover:text-ember-deep"
          >
            See the full gallery
          </Link>
        </div>
      </section>

      {/* Fold 4: rates, the honest way */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6 md:pb-28" aria-label="Rates">
        <div className="grid gap-8 bg-ink p-8 text-paper md:grid-cols-[1.2fr_0.8fr] md:items-center md:p-14">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] md:text-4xl">
              Rates, the honest way.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-paper/80">
              Every room and every rate sits on one honest price list, the same
              numbers the booking card uses: standard rooms from N$450, private
              units, and the family unit that sleeps eight. See the full table,
              or send a WhatsApp with your dates and we confirm within minutes.
            </p>
          </div>
          <div className="grid gap-3">
            <a
              href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, please send me your current rates. My dates are: ")}
              className="rounded-full bg-paper px-6 py-3.5 text-center font-semibold text-ink transition-colors hover:bg-leaf"
            >
              WhatsApp us your dates
            </a>
            <a
              href={`tel:${BIZ.guesthouse.phone1}`}
              className="rounded-full border border-paper/30 px-6 py-3.5 text-center font-semibold transition-colors hover:bg-paper/10"
            >
              Call {BIZ.guesthouse.phone1Display}
            </a>
            <Link
              href="/rooms"
              className="px-2 py-1 text-center text-sm text-paper/70 underline underline-offset-4 transition-colors hover:text-paper"
            >
              See the full rates table
            </Link>
            <Link
              href="/facilities"
              className="px-2 py-1 text-center text-sm text-paper/70 underline underline-offset-4 transition-colors hover:text-paper"
            >
              See facilities &amp; functions
            </Link>
          </div>
        </div>
      </section>

      {/* Fold 5: when we are full. The owner asked for a section about the
       * competitors (15 Oct 2026). Real, checked places only, grouped by
       * distance, each link verified the day it was written. Honest for
       * guests, good for Usakos: everybody books ahead, everybody wins. */}
      {/* Fold 5 anchor is linked from the booking page. */}
      <section id="fully-booked" className="bg-cream" aria-label="Where to stay when we are full">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember-deep">Usakos and around</p>
          <h2 className="mt-3 max-w-[26ch] font-display text-3xl font-semibold leading-tight tracking-[-0.01em] md:text-4xl">
            Fully booked? Here is where we send people.
          </h2>
          <p className="mt-4 max-w-[62ch] leading-relaxed text-mut">
            Usakos is a small town and the beds in it are few. On long weekends, mine
            shift changes and Spitzkoppe season, every room in the district goes. If
            we are full, these are the places we genuinely send people: the old hotel
            in town, a few simple self-catering spots, and farms and lodges within
            half an hour of our gate. Wherever you land, book ahead, and keep our
            number for the next time through.
          </p>
          {([
            {
              area: "In town" as const,
              note: "A few minutes by car from our gate, walking distance from the station.",
            },
            {
              area: "Nearby farms" as const,
              note: "Green riverine farms and eco camps five to fifteen minutes out of town.",
            },
            {
              area: "Worth the drive" as const,
              note: "Lodges and cabins up to about half an hour away, towards the Erongo mountains and Spitzkoppe.",
            },
          ]).map((group) => (
            <div key={group.area} className="mt-10">
              <h3 className="font-display text-xl font-semibold md:text-2xl">{group.area}</h3>
              <p className="mt-1 text-sm text-mut">{group.note}</p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {NEARBY.filter((n) => n.area === group.area).map((n) => (
                  <article key={n.name} className="flex flex-col rounded-2xl border border-line bg-paper p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ember-deep">{n.type}</p>
                    <h4 className="mt-2 font-display text-lg font-semibold">{n.name}</h4>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-mut">{n.blurb}</p>
                    <a
                      className="mt-4 inline-block font-semibold underline decoration-ember decoration-2 underline-offset-8 transition-colors hover:text-ember-deep"
                      href={n.href}
                      rel="noopener"
                      target="_blank"
                    >
                      {n.linkLabel}
                    </a>
                  </article>
                ))}
              </div>
            </div>
          ))}
          <p className="mt-8 text-sm leading-relaxed text-mut">
            Every place above was checked by hand before it went up. Tell us how your
            stay was, and it stays on the list.
          </p>
        </div>
      </section>
    </>
  );
}
