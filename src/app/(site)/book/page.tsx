import type { Metadata } from "next";
import { BookingCard } from "@/components/site/booking-card";
import { GUESTHOUSE } from "@/lib/site-data";
import { GUESTHOUSE_ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Book a Room | Big Brother Guesthouse, Usakos",
  description:
    "Book a room at Big Brother Guesthouse, Plot 7, Usakos: pick your dates and room, see the estimate, and send it on WhatsApp or email.",
};

export default function BookPage() {
  return (
    <>
      <section className="bg-cream" aria-label="Book your stay">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 md:px-6 md:pb-12 md:pt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember-deep">Bookings</p>
          <h1 className="hero-rise mt-3 max-w-[20ch] font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
            Tell us your dates. We confirm on WhatsApp.
          </h1>
          <p className="hero-rise mt-4 max-w-2xl text-lg leading-relaxed text-mut" style={{ "--i": 1 } as React.CSSProperties}>
            Fill in the card and your booking goes straight to our phone, with the price worked out from the
            owner&apos;s own rate list. Nothing is stored here. WhatsApp first, email if you prefer.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6 md:pb-28" aria-label="Booking card">
        <BookingCard />
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mut">
          <span>Wire it to us, walk in, or send the form: all three work.</span>
          {GUESTHOUSE_ROUTES.filter((r) => ["/rooms", "/facilities"].includes(r.path)).map((r) => (
            <a key={r.path} href={r.path} className="font-semibold underline underline-offset-4">
              {r.label}
            </a>
          ))}
          <span>
            Reception: {GUESTHOUSE.phoneStayDisplay}
          </span>
        </div>
      </section>
    </>
  );
}
