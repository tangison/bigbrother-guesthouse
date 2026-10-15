import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { GUESTHOUSE, RESTAURANT, HOLDINGS, wa, GUESTHOUSE_WA_GREETING } from "@/lib/site-data";
import { DAY_VISIT_RATE, VIP, formatNad } from "@/lib/rates";

export const metadata = pageMetadata({
  title: "Guest Info & FAQ | Big Brother Guesthouse, Usakos",
  description:
    "Usakos emergency numbers, directions, and honest answers about parking, breakfast, day visits and payment at Big Brother Guesthouse.",
  path: "/guest-info",
});

/* Public local contacts only (hospital, police, town council, taxi). The
 * internal staff and supplier directory is never published. The Station
 * Commander's number waits on the owner's OK before it goes public. */
const EMERGENCY = [
  { name: "Usakos Hospital", phone: "+26464530067", display: "+264 64 530 067" },
  { name: "Usakos Police", phone: "+26464530003", display: "+264 64 530 003" },
  { name: "Usakos Town Council", phone: "+264816210264", display: "+264 81 621 0264" },
  { name: "Eddy Taxi (local transport)", phone: "+264812049345", display: "+264 81 204 9345" },
];

const FAQ = [
  {
    q: "How far is Usakos from Windhoek and Swakopmund?",
    a: `We sit in the middle: ${GUESTHOUSE.distances.windhoekKm} km from Windhoek and ${GUESTHOUSE.distances.swakopmundKm} km from Swakopmund, right on the B2.`,
  },
  {
    q: "Where exactly is the gate?",
    a: "Plot 7, Laaste Begin, Usakos South: the B2 road on the bench of the Khan River, 1 km turn-off south of town, opposite the Shell station. The gate is marked Big Brother.",
  },
  {
    q: "Is parking safe?",
    a: "Yes. Your vehicle parks behind our gated property with 24/7 monitoring, close to your room.",
  },
  {
    q: "Is breakfast included?",
    a: "Breakfast is included with the Big Brother Bed & Breakfast (three luxury en suite rooms). The guesthouse rooms share a full kitchen unit, and the restaurant serves breakfast from the morning in town.",
  },
  {
    q: "Can we visit for the day, without sleeping over?",
    a: `Yes. Day visits to the pools, lawn and lapa cost ${formatNad(DAY_VISIT_RATE)} per person. Cooler boxes pay a small fee, and order from the kitchen while you are here.`,
  },
  {
    q: "How does payment work?",
    a: "We confirm your booking on WhatsApp or email first, then you pay by EFT or at check-in. Banking details travel with your booking confirmation and on the rooms page. Payment details are never taken on this website.",
  },
  {
    q: "Do you have a restaurant?",
    a: `Yes, Big Brothers Restaurant, but it is a different place: Usakos town centre, corner of Theo-Ben Gurirab and Bismarck Street, ${RESTAURANT.phoneEatDisplay}. The guesthouse kitchen serves guests on Plot 7.`,
  },
  {
    q: "Is there a discount for regular guests?",
    a: `Yes, the VIP Membership Card: ${formatNad(VIP.annualFee)} a year, 20 percent off accommodation every time you book.`,
  },
];

export default function GuestInfoPage() {
  return (
    <>
      <section className="bg-cream" aria-label="Guest information">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 md:px-6 md:pb-12 md:pt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember-deep">Guest info</p>
          <h1 className="hero-rise mt-3 max-w-[20ch] font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
            Straight answers and the numbers that matter.
          </h1>
          <p className="hero-rise mt-4 max-w-2xl text-lg leading-relaxed text-mut" style={{ "--i": 1 } as React.CSSProperties}>
            For anything not answered here,{" "}
            <a href={wa(GUESTHOUSE.phoneStayWhatsapp, GUESTHOUSE_WA_GREETING)} rel="noopener" className="font-semibold underline underline-offset-4">
              WhatsApp us
            </a>{" "}
            or call {GUESTHOUSE.phoneStayDisplay}.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-24" aria-label="Emergency and local contacts">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.01em]">Usakos emergency numbers</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {EMERGENCY.map((e) => (
            <a
              key={e.name}
              href={`tel:${e.phone}`}
              className="rounded-xl border border-line bg-paper p-5 transition-colors hover:border-ember"
            >
              <p className="font-display text-lg font-semibold">{e.name}</p>
              <p className="mt-2 font-semibold tabular-nums text-ember-deep">{e.display}</p>
            </a>
          ))}
        </div>
        <p className="mt-4 text-sm text-mut">
          For emergencies anywhere in Namibia dial 10111 (police) or 112 (ambulance from a mobile).
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 md:px-6 md:pb-28" aria-label="Frequently asked questions">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.01em]">Questions guests actually ask</h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="shrink-0 text-ember-deep transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2 max-w-2xl leading-relaxed text-mut">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/rooms" className="rounded-full bg-ink px-6 py-3 font-semibold text-paper transition-colors hover:bg-ember-deep">
            See rooms and rates
          </Link>
          <Link href="/feedback" className="rounded-full border border-ink/25 px-6 py-3 font-semibold text-ink transition-colors hover:bg-sand/60">
            Send feedback
          </Link>
        </div>
        <p className="mt-6 text-sm text-mut">
          Spot something wrong on this page? Tell the owner: {HOLDINGS.email}.
        </p>
      </section>
    </>
  );
}
