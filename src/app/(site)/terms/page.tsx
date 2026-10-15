import { pageMetadata } from "@/lib/metadata";
import { BIZ, RESTAURANT, wa } from "@/lib/site-data";

const title = "Terms of Stay & Service | Big Brother Guesthouse, Usakos";
const description =
  "The plain terms for staying at Big Brother Guesthouse, eating at Big Brothers Restaurant, and booking functions in Usakos, Namibia.";

export const metadata = pageMetadata({ title, description, path: "/terms" });

export default function TermsPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-deep">Legal</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
            Terms of stay &amp; service
          </h1>
          <p className="mt-4 text-sm text-mut">Applies to bigbrotherguesthouse.com. Last updated: October 2026.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 text-[15px] leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-semibold">Bookings</h2>
            <p className="mt-3">
              Rooms are booked by phone, WhatsApp, or email. A booking is confirmed when we reply and confirm your
              dates in writing on the same channel you used. Rates are quoted in Namibian dollars (N$) at the time
              of booking and may vary by season, room type, and group size, which is why we quote each stay
              personally instead of publishing fixed numbers. Prices quoted in writing hold for the dates on the
              confirmation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">Payment</h2>
            <p className="mt-3">
              Payment is settled at the property unless we agree otherwise in writing. Card facilities and cash are
              accepted on site; where a deposit is required for functions or group bookings, we confirm the amount
              and the account details in writing before you pay anything. Please never transfer money against a
              request you did not confirm with us directly on {BIZ.guesthouse.phone1Display} or{" "}
              {BIZ.guesthouse.phone2Display}.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">Cancellations and changes</h2>
            <p className="mt-3">
              Plans change on the road, and we are reasonable about it. Tell us as early as you can on WhatsApp or
              by phone and we will move your dates or release the room. For functions, conferences, and large
              groups, the cancellation terms on your written confirmation apply, because we start preparing food and
              staffing in advance.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">The restaurant</h2>
            <p className="mt-3">
              The menu on this website lists the prices from our own printed menu so you know what to expect before
              you arrive. Kitchen hours: {RESTAURANT.hoursKnown}. Hours can shift on public
              holidays, which is why we suggest a quick WhatsApp on the day. If a dish is not to your liking, speak to us while you are still seated and
              we will make it right. The restaurant sits in Usakos town centre at the corner of Theo-Ben Gurirab
              Street and Bismarck Street, not at the guesthouse plot.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">Functions and events</h2>
            <p className="mt-3">
              Our halls, garden, and boardroom host weddings, conferences, birthdays, and family gatherings.
              Enquiries go through the{" "}
              <a className="underline decoration-ember/60 underline-offset-4" href="/facilities">
                facilities page
              </a>{" "}
              or directly on {BIZ.guesthouse.phone1Display}. Every function gets a written quotation and a written
              confirmation listing the venue, the menu, the times, and the deposit. Those documents, together with
              these terms, form the agreement for the event.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">On the property</h2>
            <p className="mt-3">
              Guests are asked to treat the rooms, the garden, the pool areas, and fellow guests with the same
              respect you would want in your own home. Parking inside our gate is at your own risk, as is standard
              along the B2. We may ask any guest whose behaviour endangers others or damages property to leave, and
              the police can be called where the law requires it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">This website</h2>
            <p className="mt-3">
              We work hard to keep prices, hours, and directions on this site accurate, and every price shown comes
              from our own printed menu. Still, the menu, the staff, and the seasons change, so the confirmation we
              send you always overrides anything printed here. Nothing on this site is a binding offer; a booking
              exists only once we confirm it to you. The site itself, including the photos, belongs to Big Brother
              Holdings and may not be copied for commercial use without our written permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">Governing law</h2>
            <p className="mt-3">
              These terms are governed by the laws of the Republic of Namibia. Any dispute is handled in the courts
              of Namibia. Questions about any of the above go to{" "}
              <a className="underline decoration-ember/60 underline-offset-4" href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, I have a question about your terms.")}>
                WhatsApp {BIZ.guesthouse.phone1Display}
              </a>{" "}
              or{" "}
              <a className="underline decoration-ember/60 underline-offset-4" href={`mailto:${BIZ.guesthouse.email}`}>
                {BIZ.guesthouse.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
