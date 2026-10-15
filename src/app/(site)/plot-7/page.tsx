import Image from "next/image";
import Link from "next/link";
import { routeMetadata } from "@/lib/metadata";
import { GUESTHOUSE } from "@/lib/site-data";

export const metadata = routeMetadata("plot-7", "/images/og-guesthouse.jpg");

/* Plot 7: the guesthouse's own dedicated page (master file requires it).
 * Every fact here is from the owner's contact data and the live site. */
export default function Plot7Page() {
  return (
    <>
      <section className="bg-cream" aria-label="Plot 7">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 md:px-6 md:pb-12 md:pt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember-deep">The address</p>
          <h1 className="hero-rise mt-3 max-w-[20ch] font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
            Plot 7, Laaste Begin, Usakos South.
          </h1>
          <p className="hero-rise mt-4 max-w-2xl text-lg leading-relaxed text-mut" style={{ "--i": 1 } as React.CSSProperties}>
            The whole guesthouse sits on one gated plot on the B2, on the bench of the Khan River: the rooms,
            the pools, the lapa and the garden. The gate is marked Big Brother, opposite the Shell station.
          </p>
          <div className="hero-rise mt-7 flex flex-wrap gap-3" style={{ "--i": 2 } as React.CSSProperties}>
            <a
              className="rounded-full bg-ink px-6 py-3 font-semibold text-paper transition-colors hover:bg-ember-deep"
              href="https://www.google.com/maps/search/?api=1&query=Big+Brother+Guesthouse+Usakos"
              rel="noopener"
            >
              Get directions
            </a>
            <a
              className="rounded-full border border-ink/25 px-6 py-3 font-semibold text-ink transition-colors hover:bg-sand/60"
              href={`tel:${GUESTHOUSE.phoneStay}`}
            >
              Call {GUESTHOUSE.phoneStayDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-24" aria-label="Getting here">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.01em]">How to find the gate</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line text-[15px]">
              <div className="flex items-baseline justify-between gap-4 py-3.5">
                <dt className="text-mut">From Windhoek</dt>
                <dd className="text-right font-semibold tabular-nums">{GUESTHOUSE.distances.windhoekKm} km on the B2 west</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3.5">
                <dt className="text-mut">From Swakopmund</dt>
                <dd className="text-right font-semibold tabular-nums">{GUESTHOUSE.distances.swakopmundKm} km on the B2 east</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3.5">
                <dt className="text-mut">Turn-off</dt>
                <dd className="text-right font-semibold">1 km south of Usakos, opposite the Shell station</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3.5">
                <dt className="text-mut">Landmark</dt>
                <dd className="text-right font-semibold">On the bench of the Khan River</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3.5">
                <dt className="text-mut">Postal address</dt>
                <dd className="text-right font-semibold">P.O. Box 324, Usakos, Namibia</dd>
              </div>
            </dl>
            <p className="mt-5 text-sm leading-relaxed text-mut">
              Late arrival? WhatsApp us when you reach the Shell station and someone will meet you at the gate.
            </p>
          </div>
          <figure>
            <div className="photo-frame aspect-[4/3]">
              <Image
                src="/images/entrance-gates-welcome.jpg"
                alt="Yellow entrance gates with the welcome boards"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </figure>
        </div>
      </section>

      <section className="bg-cream" aria-label="What stands on Plot 7">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] md:text-4xl">
            One gate, everything behind it.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Rooms 1 to 12", line: "Standard rooms, private units and the family unit that sleeps 8.", href: "/rooms" },
              { title: "Pools, lawn, lapa", line: "Two pools, shaded lapas and the braai area under thatch.", href: "/facilities" },
              { title: "Day visits", line: "N$30 a head. Bring the family, order from the kitchen.", href: "/facilities" },
              { title: "Conference room", line: "Seats 20 delegates, up to 30 on request, at N$450 a day.", href: "/facilities" },
            ].map((c) => (
              <Link key={c.title} href={c.href} className="group rounded-xl border border-line bg-paper p-5 transition-colors hover:border-ember">
                <p className="font-display text-lg font-semibold">{c.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-mut">{c.line}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-ember-deep underline decoration-ember decoration-2 underline-offset-4 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
                  Open
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-mut">
            Note: the restaurant, Big Brothers Restaurant, is NOT on this plot. It sits in Usakos town centre at
            the corner of Theo-Ben Gurirab and Bismarck Street,{" "}
            <Link href="/restaurant" className="font-semibold underline underline-offset-4">
              over here
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
