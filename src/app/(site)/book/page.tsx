import { pageMetadata } from "@/lib/metadata";
import { BookingCard } from "@/components/site/booking-card";
import { GUESTHOUSE } from "@/lib/site-data";
import { LISTINGS } from "@/lib/nearby";
import { GUESTHOUSE_ROUTES } from "@/lib/routes";

export const metadata = pageMetadata({
  title: "Book a Room | Big Brother Guesthouse, Usakos",
  description:
    "Book a room at Big Brother Guesthouse, Plot 7, Usakos: pick your dates and room, see the estimate, and send it on WhatsApp or email.",
  path: "/book",
});

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
        <p className="mt-4 text-sm text-mut">
          If we are full for your dates, see{" "}
          <a href="/guesthouse#fully-booked" className="font-semibold underline underline-offset-4 hover:text-ink">
            where we send people in and around Usakos
          </a>
          .
        </p>

        {/* Owner round 8: a button for every platform on his list, each one
         * opening in a new tab. Booking.com and Agoda point at the
         * platform's own search for the guesthouse (no direct listing was
         * verifiable on 15 Oct 2026); the owner's direct URLs slot straight
         * into nearby.ts when he sends them. */}
        <div className="mt-10 rounded-2xl border border-line bg-cream p-6 md:p-8">
          <h2 className="font-display text-xl font-semibold tracking-[-0.01em]">
            Prefer to book or review us elsewhere?
          </h2>
          <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-mut">
            Every button opens that platform in a new tab. It is the same family behind all of
            them, and our own site always carries today&apos;s rate first.
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {LISTINGS.map((l) => (
              <li key={l.name}>
                <a
                  href={l.href}
                  rel="noopener"
                  target="_blank"
                  className="inline-block rounded-full border border-ink/25 bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-sand/60"
                >
                  {l.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
