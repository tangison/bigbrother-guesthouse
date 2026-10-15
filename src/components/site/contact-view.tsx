"use client";

import Link from "next/link";
import { GUESTHOUSE, RESTAURANT, HOLDINGS, SOCIALS, wa, GUESTHOUSE_WA_GREETING } from "@/lib/site-data";
import { LISTINGS } from "@/lib/nearby";
import { DAY_VISIT_RATE, formatNad } from "@/lib/rates";
import { SocialIcon } from "./social-icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/* Contact · all locations and all four published lines (stay MTC, stay
 * Telecom, eat, email). Two direction cards with plain Google Maps links
 * (no heavy embedded map), then a plain-language FAQ, then the official
 * socials. Every answer is a confirmed fact. */

const FAQ = [
  {
    q: "How do I book a room?",
    a: "Open the booking card on our Book page, or send a WhatsApp with your dates and group size. You get today's real rate straight away, and the booking is confirmed in the same chat.",
  },
  {
    q: "Where is the guesthouse, and where is the restaurant?",
    a: "Two different places. The guesthouse and B&B sit at Plot 7, Laaste Begin, Usakos South, on the B2 opposite the Shell station. Big Brothers Restaurant is in Usakos town centre, at the corner of Theo-Ben Gurirab and Bismarck Street.",
  },
  {
    q: "What are the kitchen hours?",
    a: `The restaurant kitchen runs ${RESTAURANT.hoursKnown}. Hours can shift on public holidays; a quick WhatsApp gets you today's answer.`,
  },
  {
    q: "Can we visit for the day without sleeping over?",
    a: `Yes. Day visitors are welcome at the pools, the garden and the lapa at Plot 7, and order from the kitchen. Entry is ${formatNad(DAY_VISIT_RATE)} per person; cooler boxes pay a small fee.`,
  },
  {
    q: "Do you host functions and meetings?",
    a: "Yes. The boardroom at Plot 7 seats 20 delegates, up to 30 on request, with drinking water and a tea and coffee station included, and the private entertainment area handles celebrations, with catering from our own kitchen. Enquire on WhatsApp with your date and group size.",
  },
];

export function ContactView() {
  const ghQ = encodeURIComponent("Big Brother Guesthouse, Usakos, Namibia");
  const rQ = encodeURIComponent("Big Brothers Restaurant, Usakos, Namibia");
  return (
    <>
      <section className="bg-ink text-paper" aria-label="Contact Big Brother Holdings">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <h1 className="hero-rise max-w-[22ch] font-display text-[clamp(2.2rem,4.6vw,3.9rem)] font-semibold leading-[1.07] tracking-[-0.02em]">
            Two places, three lines, one family.
          </h1>
          <p className="hero-rise mt-5 max-w-2xl text-lg leading-relaxed text-paper/80" style={{ "--i": 1 } as React.CSSProperties}>
            The guesthouse waits at Plot 7 on the B2. The restaurant cooks in town centre. Talk to whoever
            you need: {" "}
            {GUESTHOUSE.distances.swakopmundKm} km from Swakopmund, {GUESTHOUSE.distances.windhoekKm} km from Windhoek.
          </p>

          <div className="hero-rise mt-10 max-w-3xl" style={{ "--i": 2 } as React.CSSProperties}>
            <ul className="divide-y divide-paper/15 border-y border-paper/15 text-[15px]">
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <span className="text-paper/60">Stay: bookings (MTC line)</span>
                <a href={`tel:${GUESTHOUSE.phoneStay}`} className="font-display text-lg font-semibold underline decoration-ember/70 underline-offset-4">
                  {GUESTHOUSE.phoneStayDisplay}
                </a>
              </li>
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <span className="text-paper/60">Stay: bookings (Telecom line)</span>
                <a href={`tel:${GUESTHOUSE.phoneStay2}`} className="font-display text-lg font-semibold underline decoration-ember/70 underline-offset-4">
                  {GUESTHOUSE.phoneStay2Display}
                </a>
              </li>
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <span className="text-paper/60">Eat: the restaurant</span>
                <a href={`tel:${RESTAURANT.phoneEat}`} className="font-display text-lg font-semibold underline decoration-ember/70 underline-offset-4">
                  {RESTAURANT.phoneEatDisplay}
                </a>
              </li>
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <span className="text-paper/60">Email · guesthouse</span>
                <a href={`mailto:${HOLDINGS.email}`} className="font-semibold underline underline-offset-4">
                  {HOLDINGS.email}
                </a>
              </li>
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <span className="text-paper/60">Email · restaurant</span>
                <a href={`mailto:${RESTAURANT.email}`} className="font-semibold underline underline-offset-4">
                  {RESTAURANT.email}
                </a>
              </li>
              <li className="flex flex-wrap items-baseline justify-between gap-2 py-3.5">
                <span className="text-paper/60">Postal</span>
                <span className="font-semibold">{HOLDINGS.postal}</span>
              </li>
            </ul>
          </div>

          <div className="hero-rise mt-8 flex flex-wrap items-center gap-3" style={{ "--i": 3 } as React.CSSProperties}>
            {/* Owner round 8: both stay lines tap to call AND tap to WhatsApp. */}
            <a
              href={wa(GUESTHOUSE.phoneStayWhatsapp, GUESTHOUSE_WA_GREETING)}
              rel="noopener"
              className="rounded-full bg-paper px-6 py-3 font-semibold text-ink transition-colors hover:bg-ember"
            >
              WhatsApp {GUESTHOUSE.phoneStayDisplay}
            </a>
            <a
              href={wa(GUESTHOUSE.phoneStay2Whatsapp, GUESTHOUSE_WA_GREETING)}
              rel="noopener"
              className="rounded-full border border-paper/40 px-6 py-3 font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              WhatsApp {GUESTHOUSE.phoneStay2Display}
            </a>
            <a
              href={`mailto:${HOLDINGS.email}`}
              className="rounded-full border border-paper/40 px-6 py-3 font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              Send an email
            </a>
            <div className="flex items-center gap-2" role="group" aria-label="Our social pages">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  rel="noopener"
                  aria-label={`${s.name} (opens in a new tab)`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-paper/40 text-paper transition-colors hover:bg-paper/10"
                >
                  <SocialIcon name={s.name} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24" aria-label="Directions">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] md:text-4xl">Two doors, plainly marked.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-line bg-cream p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember-deep">Stay · Plot 7</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">Big Brother Guesthouse</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-mut">
              {GUESTHOUSE.address.street}. {GUESTHOUSE.address.area}. The gate is marked Big Brother.
            </p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${ghQ}`}
              rel="noopener"
              className="mt-5 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-paper transition-colors hover:bg-ember-deep"
            >
              Get directions
            </a>
          </div>
          <div className="rounded-xl border border-line bg-cream p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lime-deep">Eat · town centre</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">Big Brothers Restaurant</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-mut">
              {RESTAURANT.address.street}. {RESTAURANT.address.area}. Kitchen hours: {RESTAURANT.hoursKnown}.
            </p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${rQ}`}
              rel="noopener"
              className="mt-5 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-paper transition-colors hover:bg-lime-deep"
            >
              Get directions
            </a>
          </div>
        </div>
        <p className="mt-5 text-sm text-mut">
          Prefer a map in one tap?{" "}
          <Link href="/plot-7" className="font-semibold underline underline-offset-4">
            Plot 7 has the full breakdown
          </Link>
          .
        </p>
      </section>

      {/* Booking and listing links (owner round 8, 15 Oct 2026): one chip
       * per platform, every one opening in a new tab. Booking.com and Agoda
       * carry no direct Big Brother listing we could verify on 15 Oct 2026,
       * so they point at the platform's own search for the guesthouse. */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20" aria-label="Find us on other sites">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] md:text-3xl">Find us on other sites.</h2>
        <p className="mt-3 max-w-[62ch] leading-relaxed text-mut">
          Every booking and review platform we are on, in one place: SafariNow takes
          bookings, TripAdvisor carries the guest reviews, Google Maps holds our pin, and
          Booking.com and Agoda open their search for us. Our registration lives in the
          Namibia Tourism Board&apos;s own directory as well.
        </p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {LISTINGS.map((l) => (
            <li key={l.name}>
              <a
                href={l.href}
                rel="noopener"
                target="_blank"
                className="inline-block rounded-full border border-ink/25 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-sand/60"
              >
                {l.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href={GUESTHOUSE.ntb.directory}
              rel="noopener"
              target="_blank"
              className="inline-block rounded-full border border-ink/25 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-sand/60"
            >
              Namibia Tourism Board directory
            </a>
          </li>
        </ul>
      </section>

      {/* FAQ: plain-language answers, real facts, one tap to open */}
      <section className="bg-cream" aria-label="Frequently asked questions">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] md:text-4xl">
            Quick answers.
          </h2>
          <Accordion type="single" collapsible className="mt-6">
            {FAQ.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-line">
                <AccordionTrigger className="text-left font-display text-lg font-semibold hover:no-underline hover:text-ember-deep">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-[62ch] leading-relaxed text-mut">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
