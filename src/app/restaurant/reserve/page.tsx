import type { Metadata } from "next";
import { ReserveCard } from "@/components/site/reserve-card";
import { RESTAURANT } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Reserve a Table | Big Brothers Restaurant, Usakos",
  description:
    "Reserve a table at Big Brothers Restaurant, corner of Theo-Ben Gurirab and Bismarck Street, Usakos. WhatsApp +264 81 302 9522 or email.",
};

export default function ReservePage() {
  return (
    <>
      <section className="bg-cream" aria-label="Reserve a table">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 md:px-6 md:pb-12 md:pt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember-deep">Reservations</p>
          <h1 className="hero-rise mt-3 max-w-[20ch] font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
            Book the table. We hold it for you.
          </h1>
          <p className="hero-rise mt-4 max-w-2xl text-lg leading-relaxed text-mut" style={{ "--i": 1 } as React.CSSProperties}>
            Fill in the card and your reservation goes straight to the restaurant&apos;s phone. WhatsApp first,
            email if you prefer. For tonight, a call is still the fastest way.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6 md:pb-28" aria-label="Reservation card">
        <ReserveCard />
        <p className="mt-8 text-sm text-mut">
          We are at {RESTAURANT.address.street}, {RESTAURANT.address.area}. Confirmed hours: {RESTAURANT.hoursKnown}.
        </p>
      </section>
    </>
  );
}
