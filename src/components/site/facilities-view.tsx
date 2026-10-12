"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { StackCard } from "./motion";
import { BIZ, wa } from "@/lib/site-data";

/* Facilities · Feature Stack. The boardroom reads as a spec sheet; the
 * guest facilities stack as pinned cards while you scroll (one scroll
 * device for the whole section). */

const BOARDROOM = ["Business meetings", "Staff training", "Workshops", "Small presentations", "Community or group discussions"];
const BOARD_FEATURES = ["Comfortable conference seating", "Air-conditioning", "Whiteboard or flip chart, based on availability", "Refreshments available on request", "Optional catering from our kitchen"];

export function FacilitiesView() {
  return (
    <>
      {/* Opening fold */}
      <section className="bg-cream" aria-label="Facilities and functions">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <h1 className="hero-rise max-w-[22ch] font-display text-[clamp(2.2rem,4.6vw,3.9rem)] font-semibold leading-[1.07] tracking-[-0.02em]">
            Comfort, convenience, and a relaxed Namibian atmosphere.
          </h1>
          <p className="hero-rise mt-5 max-w-[62ch] text-lg leading-relaxed text-mut" style={{ "--i": 1 } as React.CSSProperties}>
            Whether you are travelling for business, passing through Usakos, or exploring the
            Erongo Region, our facilities are designed to meet your needs and make every stay
            feel like home.
          </p>
        </div>
      </section>

      {/* Boardroom: spec sheet, asymmetric pair */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-24" aria-label="Boardroom and meeting space">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border border-line bg-paper p-8">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">
              Planning a meeting, workshop, or small event?
            </h2>
            <ul className="mt-6 divide-y divide-line border-y border-line text-[15px]">
              {BOARDROOM.map((b) => (
                <li key={b} className="py-3">{b}</li>
              ))}
            </ul>
            <h3 className="mt-8 font-display text-lg font-semibold">What is included</h3>
            <ul className="mt-3 grid gap-2 text-[15px] text-mut">
              {BOARD_FEATURES.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-leaf-deep" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex h-fit flex-col justify-between bg-ink p-8 text-paper lg:sticky lg:top-28">
            <div>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                Book by the hour, or for the full day.
              </h2>
              <p className="mt-4 leading-relaxed text-paper/80">
                We are happy to tailor packages to your needs, including catering from our own
                kitchen. Tell us the date, the group size, and how long you need the space.
              </p>
            </div>
            <div className="mt-8 grid gap-3">
              <a
                href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, I would like to enquire about the boardroom for an event.")}
                className="rounded-full bg-paper px-6 py-3.5 text-center font-semibold text-ink transition-colors hover:bg-leaf"
              >
                Enquire on WhatsApp
              </a>
              <a
                href={`tel:${BIZ.guesthouse.phone1}`}
                className="rounded-full border border-paper/30 px-6 py-3.5 text-center font-semibold transition-colors hover:bg-paper/10"
              >
                Call {BIZ.guesthouse.phone1Display}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Guest facilities: pinned stacking cards */}
      <section className="mx-auto max-w-6xl px-4 pb-24 md:px-6" aria-label="Guest facilities">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] md:text-4xl">Guest facilities</h2>
        <p className="mt-3 max-w-[55ch] text-mut">Everything sits behind the same gate, so nothing is ever far away.</p>

        <div className="mt-10 grid gap-6 md:gap-8">
          <StackCard index={0} total={6}>
            <FacilityCard
              img="/images/cocktail-blue.jpg"
              alt="Blue cocktail from the Big Brothers bar"
              title="On-site restaurant & bar"
              text="Hearty meals, snacks, and refreshments without leaving the property. The kitchen opens from 07:00 and the bar stays cold through the evening."
              link={{ href: "/restaurant", label: "See the restaurant" }}
            />
          </StackCard>
          <StackCard index={1} total={6}>
            <FacilityCard
              img="/images/dish-chips.jpg"
              alt="Welcome plate of seasoned chips with sauce writing"
              title="Day visits"
              text="Come enjoy the day with family and friends in a friendly environment. Bring the crew, order from the kitchen, and let the afternoon run long."
            />
          </StackCard>
          <StackCard index={2} total={6}>
            <FacilityCard
              dark
              title="Outdoor areas"
              text="Relax in our courtyard or shaded outdoor seating spaces after a long day. The garden and pools carry the sound of the Khan River bench, not the traffic."
            />
          </StackCard>
          <StackCard index={3} total={6}>
            <FacilityCard
              title="Secure parking"
              text="Your vehicle stays safe on our gated property with 24/7 monitoring. Park once and walk to your room, the restaurant, and the pool."
            />
          </StackCard>
          <StackCard index={4} total={6}>
            <FacilityCard
              dark
              title="Daily housekeeping"
              text="We keep your room fresh and tidy so you can focus on enjoying your stay. Missed breakfast? Housekeeping will point you at the kitchen."
            />
          </StackCard>
          <StackCard index={5} total={6}>
            <FacilityCard
              title="Friendly staff"
              text="Local tips, transport arrangements, or anything else you need. Just ask at reception or over WhatsApp, and we will make a plan with you."
              link={{ href: "/contact", label: "Talk to us" }}
            />
          </StackCard>
        </div>
      </section>
    </>
  );
}

function FacilityCard({
  img,
  alt,
  title,
  text,
  dark = false,
  link,
}: {
  img?: string;
  alt?: string;
  title: string;
  text: string;
  dark?: boolean;
  link?: { href: string; label: string };
}) {
  return (
    <article
      className={`grid overflow-hidden rounded-lg border md:grid-cols-[1fr_1.1fr] ${
        dark ? "border-ink bg-ink text-paper" : "border-line bg-paper"
      }`}
    >
      <div className="flex flex-col justify-between gap-6 p-8 md:p-10">
        <div>
          <h3 className="font-display text-2xl font-semibold md:text-3xl">{title}</h3>
          <p className={`mt-3 max-w-[52ch] leading-relaxed ${dark ? "text-paper/80" : "text-mut"}`}>{text}</p>
        </div>
        {link && (
          <Link
            href={link.href}
            className={`inline-block w-fit font-semibold underline decoration-ember decoration-2 underline-offset-8 transition-colors ${
              dark ? "hover:text-leaf" : "hover:text-ember-deep"
            }`}
          >
            {link.label}
          </Link>
        )}
      </div>
      {img && alt && (
        <div className={`photo-frame relative aspect-[16/9] md:aspect-auto md:min-h-[280px] ${dark ? "rounded-none" : ""}`}>
          <Image src={img} alt={alt} fill loading="lazy" quality={55} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
      )}
    </article>
  );
}
