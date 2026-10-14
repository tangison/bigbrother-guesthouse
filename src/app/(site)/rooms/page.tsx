import type { Metadata } from "next";
import Link from "next/link";
import { RoomCards } from "@/components/site/room-cards";
import { PaymentCard } from "@/components/site/payment-card";
import { NtbModals, BankingModalButton } from "@/components/site/ntb-modals";
import { DAY_VISITS, CONFERENCE, formatNad } from "@/lib/rates";
import { GUESTHOUSE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Rooms & Rates | Big Brother Guesthouse, Usakos",
  description:
    "Every room and every rate at Big Brother Guesthouse, Usakos: standard rooms from N$450, private units, a family unit for 8, and the conference room.",
};

/* Rooms and rates. One rule: every number here comes from the owner's master
 * price list (rates.ts), the same file the booking calculator reads. The old
 * price lists are gone; this page and the booking card are the only places
 * rates live. */
export default function RoomsPage() {
  return (
    <>
      <section className="bg-cream" aria-label="Rooms and rates">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 md:px-6 md:pb-12 md:pt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember-deep">Rooms &amp; rates</p>
          <h1 className="hero-rise mt-3 max-w-[22ch] font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
            Thirteen rooms, four ways to stay, one honest price list.
          </h1>
          <p className="hero-rise mt-4 max-w-2xl text-lg leading-relaxed text-mut" style={{ "--i": 1 } as React.CSSProperties}>
            Every price below is per night and comes straight from the owner&apos;s own rate list, the same numbers
            the booking card uses. Filter, pick, and send it to us on WhatsApp.
          </p>
          <div className="hero-rise mt-7 flex flex-wrap gap-3" style={{ "--i": 2 } as React.CSSProperties}>
            <Link
              href="/book"
              className="rounded-full bg-ember px-6 py-3 font-semibold text-ink transition-colors hover:bg-ember-deep hover:text-paper"
            >
              Book on WhatsApp
            </Link>
            <a
              href={`tel:${GUESTHOUSE.phoneStay}`}
              className="rounded-full border border-ink/25 px-6 py-3 font-semibold text-ink transition-colors hover:bg-sand/60"
            >
              Call {GUESTHOUSE.phoneStayDisplay}
            </a>
            <BankingModalButton />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-24" aria-label="Room cards">
        <RoomCards />
      </section>

      <section className="bg-cream py-16 md:py-24" aria-label="Day visits and conference">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2 md:px-6">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.01em]">Day visits, per person</h2>
            <p className="mt-3 max-w-md leading-relaxed text-mut">
              Come enjoy the day: pools, lawn, shade under the lapa. Order from the kitchen while you are here.
            </p>
            <ul className="mt-5 divide-y divide-line border-y border-line text-[15px]">
              {DAY_VISITS.map((d) => (
                <li key={d.who} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-mut">{d.who}</span>
                  <span className="font-display text-lg font-semibold tabular-nums">{formatNad(d.rate)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.01em]">Conference room</h2>
            <p className="mt-3 max-w-md leading-relaxed text-mut">
              Seats up to {CONFERENCE.capacity} people for meetings, training and workshops. Catering from our own
              kitchen on request.
            </p>
            <p className="mt-5 font-display text-3xl font-semibold tabular-nums text-ember-deep">
              {formatNad(CONFERENCE.rate)}
            </p>
            <p className="mt-1 text-sm text-mut">{CONFERENCE.unitNote}</p>
            <Link
              href="/facilities"
              className="mt-5 inline-block font-semibold underline decoration-ember decoration-2 underline-offset-8 transition-colors hover:text-ember-deep"
            >
              See the facilities
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6 md:pb-28" aria-label="Payment and registration">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold">How payment works</h2>
            <p className="mt-3 max-w-lg leading-relaxed text-mut">
              Send the booking card, we confirm availability and today&apos;s rate on WhatsApp, then you pay by EFT
              or at check-in. The account details live in the payment card on this page and in your booking
              confirmation. Nowhere else.
            </p>
            <div className="mt-5">
              <PaymentCard />
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold">Registered establishment</h2>
            <p className="mt-3 max-w-lg leading-relaxed text-mut">
              Big Brother Guesthouse is registered with the Namibia Tourism Board as a Guesthouse, in terms of
              Section 20 of the {GUESTHOUSE.ntb.act}.
            </p>
            <dl className="mt-5 divide-y divide-line border-y border-line text-[15px]">
              <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                <dt className="text-mut">Registration No.</dt>
                <dd className="font-semibold tabular-nums">{GUESTHOUSE.ntb.number}</dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                <dt className="text-mut">Registered class</dt>
                <dd className="font-semibold">{GUESTHOUSE.ntb.className}</dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                <dt className="text-mut">Approved</dt>
                <dd className="font-semibold">{GUESTHOUSE.ntb.approved}</dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                <dt className="text-mut">Certificate awarded</dt>
                <dd className="font-semibold">{GUESTHOUSE.ntb.certificate}</dd>
              </div>
            </dl>
            <NtbModals />
          </div>
        </div>
      </section>
    </>
  );
}
