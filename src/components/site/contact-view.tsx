"use client";

import { Reveal } from "./reveal";
import { BIZ, wa } from "@/lib/site-data";

export function ContactView() {
  const mapQ = encodeURIComponent("Big Brother Guesthouse, Usakos, Namibia");
  return (
    <>
      <section className="bg-ink-soft text-paper" aria-label="Contact Big Brother Holdings">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <Reveal family="slide">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">Contact</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-6xl">
              On the B2 at Plot 7, Laaste Begin, Usakos South.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/80">
              On the bench of the Khan River, 1 km south turn-off, opposite the Shell station.{" "}
              {BIZ.distances.swakopmundKm} km from the coastal town of Swakopmund and {BIZ.distances.windhoekKm} km
              from Windhoek.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Guesthouse", lines: [BIZ.guesthouse.phone1Display, BIZ.guesthouse.phone2Display], hrefs: [`tel:${BIZ.guesthouse.phone1}`, `tel:${BIZ.guesthouse.phone2}`] },
              { label: "Restaurant", lines: [BIZ.restaurant.phoneDisplay], hrefs: [`tel:${BIZ.restaurant.phone}`] },
              { label: "Email", lines: [BIZ.guesthouse.email], hrefs: [`mailto:${BIZ.guesthouse.email}`] },
              { label: "Postal", lines: [BIZ.guesthouse.postal], hrefs: [] },
            ].map((c, i) => (
              <Reveal key={c.label} family="rise" index={i}>
                <div className="h-full rounded-2xl border border-paper/15 bg-paper/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf">{c.label}</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {c.lines.map((l, j) =>
                      c.hrefs[j] ? (
                        <li key={l}>
                          <a href={c.hrefs[j]} className="font-semibold underline decoration-leaf/50 underline-offset-4">
                            {l}
                          </a>
                        </li>
                      ) : (
                        <li key={l} className="text-paper/85">{l}</li>
                      )
                    )}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal family="rise" index={2} className="mt-8 flex flex-wrap gap-3">
            <a
              href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, I would like to make a booking.")}
              className="rounded-full bg-leaf px-6 py-3 font-semibold text-ink"
            >
              WhatsApp the guesthouse
            </a>
            <a
              href={wa(BIZ.restaurant.whatsapp, "Hello Big Brothers Restaurant, I would like to order.")}
              className="rounded-full bg-ember px-6 py-3 font-semibold text-white"
            >
              WhatsApp the restaurant
            </a>
            <a href={BIZ.socials.facebook} className="rounded-full border border-paper/30 px-6 py-3 font-semibold">
              Facebook: {BIZ.socials.facebookHandle}
            </a>
            <a href={BIZ.socials.instagram} className="rounded-full border border-paper/30 px-6 py-3 font-semibold">
              Instagram: {BIZ.socials.facebookHandle}
            </a>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20" aria-label="Map and directions">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal family="scale">
            <div className="overflow-hidden rounded-3xl border border-line bg-white">
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
          </Reveal>
          <Reveal family="slide" index={1}>
            <div className="h-full rounded-3xl border border-line bg-cream p-8">
              <h2 className="font-display text-2xl font-semibold">Directions</h2>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink font-display text-xs font-bold text-leaf">1</span>
                  Drive the B2 to Usakos, {BIZ.distances.windhoekKm} km from Windhoek or {BIZ.distances.swakopmundKm} km from Swakopmund.
                </li>
                <li className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink font-display text-xs font-bold text-leaf">2</span>
                  Take the southern turn-off, 1 km, opposite the Shell service station.
                </li>
                <li className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink font-display text-xs font-bold text-leaf">3</span>
                  Find us at Plot 7, Laaste Begin, Usakos South, on the bench of the Khan River. The gate is marked Big Brother.
                </li>
              </ol>
              <p className="mt-6 border-t border-line pt-4 text-sm text-mut">
                Postal address: {BIZ.guesthouse.postal}
              </p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${mapQ}`}
                className="mt-5 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-paper"
              >
                Open directions in Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
