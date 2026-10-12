"use client";

import { BIZ, wa } from "@/lib/site-data";

/* Contact · dark opening fold with a hairline contact sheet, then the map
 * beside printed directions. One action per line, verb first. */

export function ContactView() {
  const mapQ = encodeURIComponent("Big Brother Guesthouse, Usakos, Namibia");
  return (
    <>
      <section className="bg-ink text-paper" aria-label="Contact Big Brother Holdings">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <h1 className="hero-rise max-w-[22ch] font-display text-[clamp(2.2rem,4.6vw,3.9rem)] font-semibold leading-[1.07] tracking-[-0.02em]">
            On the B2 at Plot 7, Laaste Begin, Usakos South.
          </h1>
          <p className="hero-rise mt-5 max-w-2xl text-lg leading-relaxed text-paper/80" style={{ "--i": 1 } as React.CSSProperties}>
            On the bench of the Khan River, 1 km south turn-off, opposite the Shell station.{" "}
            {BIZ.distances.swakopmundKm} km from the coastal town of Swakopmund and{" "}
            {BIZ.distances.windhoekKm} km from Windhoek.
          </p>

          <div className="hero-rise mt-10 max-w-3xl" style={{ "--i": 2 } as React.CSSProperties}>
            <ul className="divide-y divide-paper/15 border-y border-paper/15 text-[15px]">
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <span className="text-paper/60">Guesthouse bookings</span>
                <span className="flex gap-4">
                  <a href={`tel:${BIZ.guesthouse.phone1}`} className="font-display text-lg font-semibold underline decoration-leaf/60 underline-offset-4">
                    {BIZ.guesthouse.phone1Display}
                  </a>
                  <a href={`tel:${BIZ.guesthouse.phone2}`} className="font-display text-lg font-semibold underline decoration-leaf/60 underline-offset-4">
                    {BIZ.guesthouse.phone2Display}
                  </a>
                </span>
              </li>
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <span className="text-paper/60">Restaurant orders</span>
                <a href={`tel:${BIZ.restaurant.phone}`} className="font-display text-lg font-semibold underline decoration-ember/70 underline-offset-4">
                  {BIZ.restaurant.phoneDisplay}
                </a>
              </li>
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <span className="text-paper/60">Email</span>
                <a href={`mailto:${BIZ.guesthouse.email}`} className="font-semibold underline underline-offset-4">
                  {BIZ.guesthouse.email}
                </a>
              </li>
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <span className="text-paper/60">Postal</span>
                <span className="font-semibold">{BIZ.guesthouse.postal}</span>
              </li>
            </ul>
          </div>

          <div className="hero-rise mt-8 flex flex-wrap gap-3" style={{ "--i": 3 } as React.CSSProperties}>
            <a
              href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, I would like to make a booking.")}
              className="rounded-full bg-paper px-6 py-3 font-semibold text-ink transition-colors hover:bg-leaf"
            >
              WhatsApp the guesthouse
            </a>
            <a
              href={wa(BIZ.restaurant.whatsapp, "Hello Big Brothers Restaurant, I would like to order.")}
              className="rounded-full border border-paper/40 px-6 py-3 font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              WhatsApp the restaurant
            </a>
            <a
              href={BIZ.socials.facebook}
              className="rounded-full border border-paper/40 px-6 py-3 font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              Facebook
            </a>
            <a
              href={BIZ.socials.instagram}
              className="rounded-full border border-paper/40 px-6 py-3 font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24" aria-label="Map and directions">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-lg border border-line bg-white">
            <iframe
              title="Map to Big Brother Guesthouse, Usakos"
              src={`https://www.google.com/maps?q=${mapQ}&output=embed`}
              width="600"
              height="420"
              loading="lazy"
              className="h-[420px] w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="h-fit bg-cream p-8 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">Directions</h2>
            <ol className="mt-5 text-[15px] leading-relaxed">
              <li className="flex gap-4 border-b border-line py-3.5">
                <span className="font-display text-xl font-semibold text-ember-deep">1</span>
                <span>Drive the B2 to Usakos, {BIZ.distances.windhoekKm} km from Windhoek or {BIZ.distances.swakopmundKm} km from Swakopmund.</span>
              </li>
              <li className="flex gap-4 border-b border-line py-3.5">
                <span className="font-display text-xl font-semibold text-ember-deep">2</span>
                <span>Take the southern turn-off, 1 km, opposite the Shell service station.</span>
              </li>
              <li className="flex gap-4 py-3.5">
                <span className="font-display text-xl font-semibold text-ember-deep">3</span>
                <span>Find us at Plot 7, Laaste Begin, Usakos South, on the bench of the Khan River. The gate is marked Big Brother.</span>
              </li>
            </ol>
            <p className="mt-5 border-t border-line pt-4 text-sm text-mut">
              Postal address: {BIZ.guesthouse.postal}
            </p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${mapQ}`}
              className="mt-5 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-paper transition-colors hover:bg-ember-deep"
            >
              Open directions in Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
