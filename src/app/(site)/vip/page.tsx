import { routeMetadata } from "@/lib/metadata";
import { VipJoin } from "@/components/site/vip-join";
import { VIP, formatNad } from "@/lib/rates";

export const metadata = routeMetadata("vip", "/images/og-guesthouse.jpg");

export default function VipPage() {
  return (
    <>
      <section className="bg-cream" aria-label="VIP membership">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 md:px-6 md:pb-12 md:pt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember-deep">VIP Membership Card</p>
          <h1 className="hero-rise mt-3 max-w-[18ch] font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
            One card. Twenty percent off, every stay.
          </h1>
          <p className="hero-rise mt-4 max-w-2xl text-lg leading-relaxed text-mut" style={{ "--i": 1 } as React.CSSProperties}>
            The Big Brother VIP card costs {formatNad(VIP.annualFee)} a year and takes {Math.round(VIP.discount * 100)}
            {" "}percent off accommodation every time you book: any room, any tier, the family unit too.
            Regulars on the B2 save the fee back in a night or two.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6 md:pb-28" aria-label="Apply for the VIP card">
        <VipJoin />
      </section>
    </>
  );
}
