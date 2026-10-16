import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { NEARBY } from "@/lib/nearby";
import { GUESTHOUSE, wa, GUESTHOUSE_WA_GREETING } from "@/lib/site-data";

export const metadata: Metadata = pageMetadata({
  title: "Fully Booked? Where to Stay Near Usakos | Big Brother Guesthouse",
  description:
    "Big Brother Guesthouse is full? These are the places in and around Usakos we genuinely send people: the historic Bahnhof Hotel, self-catering rooms, guest farms, lodges and camps.",
  path: "/stay-nearby",
  image: null,
});

const GROUPS = [
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
];

export default function StayNearbyPage() {
  return (
    <>
      <section className="bg-cream" aria-label="Fully booked alternatives">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember-deep">
            Usakos and around
          </p>
          <h1 className="mt-3 max-w-[24ch] font-display text-[clamp(2.2rem,4.6vw,3.9rem)] font-semibold leading-[1.07] tracking-[-0.02em]">
            Fully booked? Here is where we send people.
          </h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-mut">
            Usakos is a small town and the beds in it are few. On long weekends, mine
            shift changes and Spitzkoppe season, every room in the district goes. If
            we are full for your dates, these are the places we genuinely send people:
            the old hotel in town, a few simple self-catering spots, and farms and
            lodges within half an hour of our gate.
          </p>
          <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-mut">
            Two things before you book elsewhere. First, ask us anyway: cancellations
            happen, and a WhatsApp costs nothing. Second, wherever you land, book
            ahead, and keep our number for the next time through.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={wa(GUESTHOUSE.phoneStayWhatsapp, "Hello Big Brother Guesthouse, are you really full for my dates? Any chance of a room?")}
              className="rounded-full bg-ink px-6 py-3 font-semibold text-paper transition-colors hover:bg-ember-deep"
            >
              Ask us first on WhatsApp
            </a>
            <a
              href={`tel:${GUESTHOUSE.phoneStay}`}
              className="rounded-full border border-line px-6 py-3 font-semibold transition-colors hover:bg-paper"
            >
              Call {GUESTHOUSE.phoneStayDisplay}
            </a>
            <Link
              href="/guesthouse#fully-booked"
              className="rounded-full border border-line px-6 py-3 font-semibold transition-colors hover:bg-paper"
            >
              Back to the guesthouse
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper" aria-label="The neighbourhood at a glance">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-3 md:px-6">
          {[
            { n: "9", t: "places we recommend", d: "Checked by hand, each link live the day it went up." },
            { n: "3", t: "distance groups", d: "In town, nearby farms, and worth the drive." },
            { n: "30 min", t: "furthest drive", d: "The whole list sits inside half an hour of our gate." },
          ].map((s) => (
            <div key={s.t} className="border-t border-paper/20 pt-5">
              <p className="font-display text-4xl font-semibold tabular-nums">{s.n}</p>
              <p className="mt-1 font-semibold">{s.t}</p>
              <p className="mt-1 text-sm leading-relaxed text-paper/70">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {GROUPS.map((group) => (
        <section key={group.area} className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16" aria-label={group.area}>
          <h2 className="font-display text-2xl font-semibold md:text-3xl">{group.area}</h2>
          <p className="mt-1 text-sm text-mut">{group.note}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {NEARBY.filter((n) => n.area === group.area).map((n) => (
              <article key={n.name} className="flex flex-col rounded-2xl border border-line bg-paper p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ember-deep">{n.type}</p>
                <h3 className="mt-2 font-display text-lg font-semibold">{n.name}</h3>
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
        </section>
      ))}

      <section className="bg-cream" aria-label="Next time stay with us">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-6">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Next time through, the gate is open.</h2>
          <p className="mx-auto mt-4 max-w-[56ch] leading-relaxed text-mut">
            We would rather have you here. For your next trip on the B2, book early:
            {GUESTHOUSE.distances.swakopmundKm} km from Swakopmund,{" "}
            {GUESTHOUSE.distances.windhoekKm} km from Windhoek, rooms from N$450, and
            the restaurant menu and the pools waiting at Plot 7.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/book"
              className="rounded-full bg-ink px-6 py-3 font-semibold text-paper transition-colors hover:bg-ember-deep"
            >
              Book at Big Brother
            </Link>
            <Link
              href="/rooms"
              className="rounded-full border border-line px-6 py-3 font-semibold transition-colors hover:bg-paper"
            >
              See rooms and rates
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
