"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { BIZ, wa } from "@/lib/site-data";

/* Guesthouse · editorial fold + asymmetric stay split. The client's real
 * logo anchors the hero (it carries the name and tagline, drawn once, used
 * everywhere). Rates stay honest: no invented prices, ever. */

export function GuesthouseView() {
  return (
    <>
      {/* Fold 1: the real logo beside the words */}
      <section className="bg-cream" aria-label="Guesthouse and B&B">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[0.85fr_1.15fr] md:px-6 md:py-24">
          <div className="hero-rise w-fit rounded-xl bg-white p-5 shadow-sm">
            <Image
              src="/images/logo-guesthouse.jpg"
              alt="Big Brother Guesthouse logo: home away from home"
              width={547}
              height={323}
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
              <a
                href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, do you have a room available?")}
                className="rounded-full bg-ink px-7 py-3.5 font-semibold text-paper transition-colors hover:bg-ember-deep"
              >
                Check availability
              </a>
              <a
                href={`tel:${BIZ.guesthouse.phone1}`}
                className="rounded-full border border-ink/25 px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-sand/60"
              >
                Call {BIZ.guesthouse.phone1Display}
              </a>
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
                src="/images/property-rooms.jpg"
                alt="The Big Brother Guesthouse rooms block with shaded parking and palm tree"
                fill
                loading="lazy"
                quality={58}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <p className="caption mt-2 text-mut">The rooms block, from our Google Maps listing</p>
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
            <div className="photo-frame aspect-[4/3]">
              <Image
                src="/images/dish-breakfast.jpg"
                alt="Fresh breakfast tray included with the B&B"
                fill
                loading="lazy"
                quality={55}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <p className="caption mt-2 text-mut">Breakfast, included with the B&amp;B</p>
            <div className="mt-6 max-w-[52ch]">
              <h2 className="font-display text-2xl font-semibold md:text-3xl">Big Brother Bed & Breakfast</h2>
              <p className="mt-3 leading-relaxed text-mut">
                Part of Big Brother Guesthouse under the same management. Situated in Usakos with
                three luxury, spacious en suite rooms and free internet access. Cosy, personal,
                and full of warmth, ideal for couples and small families.
              </p>
              <ul className="mt-5 grid gap-2 text-[15px]">
                {["Three luxury en suite rooms", "Free internet access", "Fresh breakfast in the morning", "Friendly, personal service"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check size={16} strokeWidth={3} className="shrink-0 text-leaf-deep" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      {/* Fold 3: the grounds, three real photographs from the Google listing */}
      <section className="bg-cream" aria-label="The grounds">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <h2 className="max-w-[24ch] font-display text-3xl font-semibold leading-tight tracking-[-0.01em] md:text-4xl">
            Pools, lapa, garden. All behind the gate.
          </h2>
          <p className="mt-3 max-w-[58ch] text-mut">
            Photographs from our own Google Maps listing. Have a walk through the grounds before
            you arrive, then come and sit in the shade for real.
          </p>
          <div className="mt-9 grid gap-5 sm:grid-cols-3">
            {[
              { src: "/images/property-lapa.jpg", alt: "Shaded lapa with tables on the lawn", cap: "The lapa and lawn" },
              { src: "/images/property-pool.jpg", alt: "The stone-edged garden pond beside the braai area", cap: "The garden pond" },
              { src: "/images/property-front.jpg", alt: "The guesthouse front with carport and hills behind", cap: "The front gate" },
            ].map((p) => (
              <figure key={p.src}>
                <div className="photo-frame aspect-[4/3]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={1200}
                    height={900}
                    loading="lazy"
                    quality={55}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-2.5 text-sm font-medium">{p.cap}</figcaption>
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
              Prices may vary by season, room, and group size, so we do not publish fixed numbers
              here. Send us a WhatsApp with your dates and group, and you will get today&rsquo;s
              real rate within minutes.
            </p>
          </div>
          <div className="grid gap-3">
            <a
              href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, please send me your current rates. My dates are: ")}
              className="rounded-full bg-paper px-6 py-3.5 text-center font-semibold text-ink transition-colors hover:bg-leaf"
            >
              WhatsApp for today&rsquo;s rates
            </a>
            <a
              href={`tel:${BIZ.guesthouse.phone1}`}
              className="rounded-full border border-paper/30 px-6 py-3.5 text-center font-semibold transition-colors hover:bg-paper/10"
            >
              Call {BIZ.guesthouse.phone1Display}
            </a>
            <Link
              href="/facilities"
              className="px-2 py-1 text-center text-sm text-paper/70 underline underline-offset-4 transition-colors hover:text-paper"
            >
              See facilities & functions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
