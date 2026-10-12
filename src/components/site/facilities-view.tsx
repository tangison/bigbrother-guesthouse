"use client";

import { Reveal } from "./reveal";
import { BIZ, wa } from "@/lib/site-data";

const BOARDROOM = ["Business meetings", "Staff training", "Workshops", "Small presentations", "Community or group discussions"];
const BOARD_FEATURES = ["Comfortable conference seating", "Air-conditioning", "Whiteboard or flip chart, based on availability", "Refreshments available on request", "Optional catering from our kitchen"];
const FACILITIES = [
  { t: "Secure Parking", d: "Your vehicle stays safe on our gated property with 24/7 monitoring." },
  { t: "Day Visits", d: "Come enjoy the day with family and friends in a friendly environment." },
  { t: "On-Site Restaurant & Bar", d: "Hearty meals, snacks, and refreshments without leaving the property." },
  { t: "Outdoor Areas", d: "Relax in our courtyard or shaded outdoor seating spaces after a long day." },
  { t: "Daily Housekeeping", d: "We keep your room fresh and tidy so you can focus on enjoying your stay." },
  { t: "Friendly Staff", d: "Local tips, transport arrangements, or anything else you need. Just ask." },
];

export function FacilitiesView() {
  return (
    <>
      <section className="bg-cream" aria-label="Facilities and functions">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <Reveal family="wipe">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-deep">Facilities & Functions</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-5xl">
              Comfort, convenience, and a relaxed Namibian atmosphere.
            </h1>
            <p className="mt-5 max-w-2xl leading-relaxed text-mut">
              Whether you are travelling for business, passing through Usakos, or exploring the Erongo Region, our
              facilities are designed to meet your needs and make every stay feel like home.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20" aria-label="Boardroom and meeting space">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal family="slide">
            <div className="h-full rounded-3xl border border-line bg-white p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember-deep">Boardroom & Meeting Space</p>
              <h2 className="mt-3 font-display text-2xl font-semibold md:text-3xl">Planning a meeting, workshop, or small event?</h2>
              <ul className="mt-5 grid gap-2 text-sm">
                {BOARDROOM.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-0.5 text-leaf-deep" aria-hidden="true">▸</span> {b}
                  </li>
                ))}
              </ul>
              <h3 className="mt-6 font-display text-lg font-semibold">What is included</h3>
              <ul className="mt-3 grid gap-2 text-sm text-mut">
                {BOARD_FEATURES.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-0.5 text-leaf-deep" aria-hidden="true">✔</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal family="slide" index={1}>
            <div className="flex h-full flex-col justify-between rounded-3xl bg-ink p-8 text-paper">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">Booking made simple</p>
                <h2 className="mt-3 font-display text-2xl font-semibold md:text-3xl">Book by the hour, or for the full day.</h2>
                <p className="mt-4 leading-relaxed text-paper/80">
                  We are happy to tailor packages to your needs, including catering from our own kitchen. Tell us the
                  date, the group size, and how long you need the space.
                </p>
              </div>
              <div className="mt-8 grid gap-3">
                <a
                  href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, I would like to enquire about the boardroom for an event.")}
                  className="rounded-full bg-leaf px-6 py-3.5 text-center font-semibold text-ink"
                >
                  Enquire on WhatsApp
                </a>
                <a href={`tel:${BIZ.guesthouse.phone1}`} className="rounded-full border border-paper/30 px-6 py-3.5 text-center font-semibold">
                  Call {BIZ.guesthouse.phone1Display}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6" aria-label="Guest facilities">
        <Reveal family="wipe">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">Guest facilities</h2>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((f, i) => (
            <Reveal as="li" key={f.t} family="rise" index={i % 3}>
              <div className="h-full rounded-3xl border border-line bg-white p-6">
                <p className="font-display text-lg font-semibold">{f.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-mut">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
