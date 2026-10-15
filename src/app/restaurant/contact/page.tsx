import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { RESTAURANT, wa } from "@/lib/site-data";

export const metadata = pageMetadata({
  title: "Contact the Restaurant | Big Brothers, Usakos Town Centre",
  description:
    "Big Brothers Restaurant: corner of Theo-Ben Gurirab and Bismarck Street, Usakos town centre. Call or WhatsApp +264 81 302 9522.",
  path: "/restaurant/contact",
  image: "/images/og-restaurant.jpg",
});

export default function RestaurantContactPage() {
  return (
    <>
      <section className="bg-cream" aria-label="Restaurant contact">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 md:px-6 md:pb-12 md:pt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember-deep">Find the kitchen</p>
          <h1 className="hero-rise mt-3 max-w-[22ch] font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
            Town centre, corner of Theo-Ben Gurirab and Bismarck.
          </h1>
          <div className="hero-rise mt-7 flex flex-wrap gap-3" style={{ "--i": 1 } as React.CSSProperties}>
            <a
              className="rounded-full bg-ink px-6 py-3 font-semibold text-paper transition-colors hover:bg-lime hover:text-ink"
              href={wa(RESTAURANT.phoneEatWhatsapp, "Hello Big Brothers Restaurant, I would like to reserve a table.")}
              rel="noopener"
            >
              Message the restaurant on WhatsApp
            </a>
            <a
              className="rounded-full border border-ink/25 px-6 py-3 font-semibold text-ink transition-colors hover:bg-sand/60"
              href="https://www.google.com/maps/search/?api=1&query=Big+Brothers+Restaurant+Theo-Ben+Gurirab+Bismarck+Usakos"
              rel="noopener"
            >
              Get directions
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6 md:pb-28" aria-label="Details">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <dl className="divide-y divide-line border-y border-line text-[15px]">
              <div className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <dt className="text-mut">Phone and WhatsApp</dt>
                <dd>
                  <a href={`tel:${RESTAURANT.phoneEat}`} className="font-display text-lg font-semibold underline decoration-ember decoration-2 underline-offset-4">
                    {RESTAURANT.phoneEatDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <dt className="text-mut">Address</dt>
                <dd className="text-right font-semibold">
                  {RESTAURANT.address.street}, {RESTAURANT.address.town}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <dt className="text-mut">Kitchen hours (confirmed)</dt>
                <dd className="text-right font-semibold">{RESTAURANT.hoursKnown}</dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <dt className="text-mut">Email</dt>
                <dd>
                  <a href={`mailto:${RESTAURANT.email}`} className="font-semibold underline underline-offset-4">
                    {RESTAURANT.email}
                  </a>
                </dd>
              </div>
            </dl>
            <p className="mt-5 text-sm leading-relaxed text-mut">
              Hours can shift on public holidays. Ask us on WhatsApp and you get today&apos;s answer in minutes.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-mut">
              The restaurant is in town, NOT at the guesthouse. Sleeping over? Big Brother Guesthouse sits at Plot 7
              on the B2,{" "}
              <Link href="/" className="font-semibold underline underline-offset-4">
                this way
              </Link>
              .
            </p>
          </div>
          <figure>
            <div className="photo-frame aspect-[4/3]">
              <Image
                src="/images/hero-braise.jpg"
                alt="Meat braising over the coals in the Big Brothers kitchen"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </figure>
        </div>
      </section>
    </>
  );
}
