import { routeMetadata } from "@/lib/metadata";
import { ReserveCard } from "@/components/site/reserve-card";
import { RESTAURANT } from "@/lib/site-data";

export const metadata = routeMetadata("reserve", "/images/og-restaurant.jpg");

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
          We are at {RESTAURANT.address.street}, {RESTAURANT.address.area}. Kitchen hours: {RESTAURANT.hoursKnown}.
        </p>
      </section>
    </>
  );
}
