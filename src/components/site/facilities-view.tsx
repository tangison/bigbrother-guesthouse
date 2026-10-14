"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StackCard } from "./motion";
import { BIZ, wa } from "@/lib/site-data";

/* Facilities · Tabs for planning, stack cards for amenities. The three ways to
 * use the property sit in one tabbed widget with real photographs from the
 * Google Maps listing; the guest facilities stack as pinned cards while you
 * scroll. Real content only: the boardroom list is the client's own. */

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

      {/* Plan your time: one tabbed widget, three real uses, real photographs */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-24" aria-label="Plan your time here">
        <Tabs defaultValue="day" className="w-full">
          <TabsList className="h-auto w-full justify-start gap-1 rounded-none border-b border-line bg-transparent p-0">
            <TabsTrigger
              value="day"
              className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium shadow-none transition-colors data-[state=active]:border-ember data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Day visits
            </TabsTrigger>
            <TabsTrigger
              value="meet"
              className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium shadow-none transition-colors data-[state=active]:border-ember data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Meetings & training
            </TabsTrigger>
            <TabsTrigger
              value="celebrate"
              className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium shadow-none transition-colors data-[state=active]:border-ember data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Celebrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="day" className="mt-8">
            <TabPanel
              img="/images/picnic-table-tree.jpg"
              alt="Picnic table under a big shade tree on the lawn"
              title="Come and spend the day with us."
              lines={[
                "Day visitors are welcome at the pools, the garden and the lapa. Bring the family or a car full of friends and let the afternoon run long.",
                "Entry is per person: adults N$50, teenagers N$30, children up to 12 and senior citizens N$20. Order from the kitchen while you are here.",
              ]}
            />
          </TabsContent>

          <TabsContent value="meet" className="mt-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="font-display text-2xl font-semibold md:text-3xl">Planning a meeting, workshop, or small event?</h2>
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
              <figure>
                <div className="photo-frame aspect-[4/3]">
                  <Image
                    src="/images/property-front.jpg"
                    alt="The main building at Big Brother Guesthouse, home of the boardroom"
                    width={1200}
                    height={900}
                    loading="lazy"
                    quality={55}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </figure>
            </div>
          </TabsContent>

          <TabsContent value="celebrate" className="mt-8">
            <TabPanel
              img="/images/thatched-lapa-orange-wall.jpg"
              alt="Thatched lapa with tables beside the orange wall"
              title="Birthdays, braais, and family gatherings."
              lines={[
                "The venue, the shade, and the space are yours for the day. We tailor the setup to your group and cater from our own kitchen, so the food arrives straight off the grill.",
                "Tell us the date, the group size, and how long you need the space. A quick WhatsApp is enough to start planning.",
              ]}
            />
          </TabsContent>
        </Tabs>

        {/* One booking card serves all three tabs */}
        <div className="mt-10 grid gap-4 rounded-lg bg-ink p-8 text-paper md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <p className="max-w-[52ch] leading-relaxed text-paper/85">
            The conference room seats up to 30 people at N$450 per booking; whether that is per day or per
            event, we confirm with your quote. Functions are tailored to your group, with catering from our
            own kitchen.
          </p>
          <div className="grid gap-3">
            <a
              href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, I would like to enquire about the venue for an event.")}
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
      </section>

      {/* Guest facilities: pinned stacking cards */}
      <section className="mx-auto max-w-6xl px-4 pb-24 md:px-6" aria-label="Guest facilities">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] md:text-4xl">Guest facilities</h2>
        <p className="mt-3 max-w-[55ch] text-mut">Everything sits behind the same gate, so nothing is ever far away.</p>

        <div className="mt-10 grid gap-6 md:gap-8">
          <StackCard index={0} total={6}>
            <FacilityCard
              img="/images/dish-braise.jpg"
              alt="Slow braised meat with peppers and pap from our kitchen"
              title="Kitchen & bar service"
              text="Guests eat from our own kitchen on the plot, and the day-visit crowd orders from the same kitchen. The full restaurant menu, grills to pizza, runs in town centre at Big Brothers Restaurant."
              link={{ href: "/restaurant", label: "See the restaurant in town" }}
            />
          </StackCard>
          <StackCard index={1} total={6}>
            <FacilityCard
              img="/images/swimming-pool-closeup.jpg"
              alt="The swimming pool with the lapa and shade sails behind"
              title="Swimming pools & garden"
              text="Two pools to cool off in, lawn to lie on, and shade under the lapa. Day visitors welcome, residents first in the water."
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

function TabPanel({
  img,
  alt,
  title,
  lines,
}: {
  img: string;
  alt: string;
  title: string;
  lines: string[];
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h2 className="font-display text-2xl font-semibold md:text-3xl">{title}</h2>
        {lines.map((l) => (
          <p key={l.slice(0, 24)} className="mt-4 max-w-[60ch] leading-relaxed text-mut">
            {l}
          </p>
        ))}
      </div>
      <figure>
        <div className="photo-frame aspect-[4/3]">
          <Image src={img} alt={alt} width={1400} height={1050} loading="lazy" quality={58} sizes="(max-width: 1024px) 100vw, 40vw" className="h-full w-full object-cover" />
        </div>
      </figure>
    </div>
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
