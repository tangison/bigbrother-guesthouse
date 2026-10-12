"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";
import { BIZ, wa } from "@/lib/site-data";

export function GuesthouseView() {
  return (
    <>
      {/* Hero: rise device on cream ground (no photo hero here: we only publish photos we own) */}
      <section className="bg-cream" aria-label="Guesthouse and B&B">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <Reveal family="slide">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-deep">Stay with us</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-6xl">
              Your home away from home in Usakos.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mut">
              Perfectly located between Windhoek and Swakopmund, Big Brother Guesthouse offers comfortable
              accommodation, a welcoming restaurant and bar, and facilities for events, conferences, and family
              gatherings. Whether you travel for business, leisure, or you are passing through the Erongo Region,
              you will find comfort, convenience, and friendly service.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Two ways to stay: scale device */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20" aria-label="Ways to stay">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal family="scale">
            <article className="h-full overflow-hidden rounded-3xl border border-line bg-white">
              <div className="relative aspect-[16/9]">
                <Image src="/images/dish-feast.jpg" alt="Braai platter served in the guesthouse garden" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="p-7">
                <h2 className="font-display text-2xl font-semibold">Big Brother Guesthouse</h2>
                <p className="mt-3 text-sm leading-relaxed text-mut">
                  A peaceful escape for travellers who want space, comfort, and that true home away from home
                  feeling. Spacious rooms, beautiful mountain views, and a relaxing atmosphere for unwinding after a
                  long trip.
                </p>
                <ul className="mt-4 grid gap-1.5 text-sm">
                  {["Restaurant & bar on site", "Free Wi-Fi", "Secure parking", "Swimming pools & garden areas", "Ideal stopover location"].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-leaf-deep" aria-hidden="true">✔</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
          <Reveal family="scale" index={1}>
            <article className="h-full overflow-hidden rounded-3xl border border-line bg-white">
              <div className="relative aspect-[16/9]">
                <Image src="/images/dish-breakfast.jpg" alt="Fresh breakfast tray included with the B&B" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="p-7">
                <h2 className="font-display text-2xl font-semibold">Big Brother Bed & Breakfast</h2>
                <p className="mt-3 text-sm leading-relaxed text-mut">
                  Part of Big Brother Guesthouse under the same management. Situated in Usakos with three luxury,
                  spacious en suite rooms and free internet access. Cosy, personal, and full of warmth, ideal for
                  couples and small families.
                </p>
                <ul className="mt-4 grid gap-1.5 text-sm">
                  {["Three luxury en suite rooms", "Free internet access", "Fresh breakfast in the morning", "Friendly, personal service"].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-leaf-deep" aria-hidden="true">✔</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Rates card: honest, no invented prices (client policy: prices may vary, contact us) */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6" aria-label="Rates">
        <Reveal family="wipe">
          <div className="grid gap-6 rounded-3xl bg-ink p-8 text-paper md:grid-cols-[1.2fr_0.8fr] md:items-center md:p-12">
            <div>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">Rates, the honest way.</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-paper/80">
                Prices may vary by season, room, and group size, so we do not publish fixed numbers here. Send us a
                WhatsApp with your dates and group, and you will get today&rsquo;s real rate within minutes.
              </p>
            </div>
            <div className="grid gap-3">
              <a
                href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, please send me your current rates. My dates are: ")}
                className="rounded-full bg-leaf px-6 py-3.5 text-center font-semibold text-ink"
              >
                WhatsApp for today&rsquo;s rates
              </a>
              <a href={`tel:${BIZ.guesthouse.phone1}`} className="rounded-full border border-paper/30 px-6 py-3.5 text-center font-semibold">
                Call {BIZ.guesthouse.phone1Display}
              </a>
              <Link href="/facilities" className="rounded-full px-6 py-3 text-sm text-paper/70 underline underline-offset-4 hover:text-paper">
                See facilities & functions
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
