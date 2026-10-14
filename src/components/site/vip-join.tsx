"use client";

import { useState } from "react";
import { VIP, formatNad } from "@/lib/rates";
import { GUESTHOUSE, HOLDINGS, wa } from "@/lib/site-data";

/* VIP card application (master file section 4): name, phone, optional email,
 * sent by WhatsApp or email. No storage, no payment on the site. */
export function VipJoin() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const lines = [
    "Hello Big Brother Guesthouse, I would like to apply for the VIP Membership Card.",
    "",
    `Name: ${name.trim() || "(not given)"}`,
    `Phone: ${phone.trim() || "(not given)"}`,
    email.trim() ? `Email: ${email.trim()}` : null,
    `Membership: ${formatNad(VIP.annualFee)} per year, ${Math.round(VIP.discount * 100)} percent off accommodation`,
  ].filter(Boolean) as string[];

  const message = lines.join("\n");

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="rounded-2xl border border-line bg-paper p-5 md:p-8">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Full name</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name"
              className="min-h-[44px] rounded-xl border border-line bg-paper px-4 text-sm" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Phone (WhatsApp if you have it)</span>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="+264 81 ..."
              className="min-h-[44px] rounded-xl border border-line bg-paper px-4 text-sm" />
          </label>
          <label className="grid gap-1 text-sm sm:col-span-2">
            <span className="font-medium">Email (optional)</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
              className="min-h-[44px] rounded-xl border border-line bg-paper px-4 text-sm" />
          </label>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href={wa(GUESTHOUSE.phoneStayWhatsapp, message)}
            rel="noopener"
            onClick={() => setSent(true)}
            className="flex min-h-[48px] items-center justify-center rounded-full bg-ember px-6 text-center font-semibold text-ink transition-colors hover:bg-ember-deep hover:text-paper"
          >
            Apply on WhatsApp
          </a>
          <a
            href={`mailto:${HOLDINGS.email}?subject=${encodeURIComponent("VIP Membership Card application")}&body=${encodeURIComponent(message)}`}
            onClick={() => setSent(true)}
            className="flex min-h-[48px] items-center justify-center rounded-full border border-ink/25 px-6 text-center font-semibold text-ink transition-colors hover:bg-sand/60"
          >
            Apply by email
          </a>
        </div>
        {sent && (
          <p className="mt-4 rounded-xl border border-line bg-cream p-4 text-sm text-mut" aria-live="polite">
            Application sent. We reply with the payment steps for the {formatNad(VIP.annualFee)} annual fee. Your
            20 percent discount starts as soon as the card is paid.
          </p>
        )}
      </div>
      <aside className="h-fit rounded-2xl bg-ink p-6 text-paper md:p-8">
        <h2 className="font-display text-2xl font-semibold">What the card does</h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-paper/80">
          <li>
            <strong className="font-semibold">20 percent off accommodation,</strong> every time you book, all year.
          </li>
          <li>Works on every room tier and on the family unit. Not on day visits, the conference room or the restaurant.</li>
          <li>One payment of {formatNad(VIP.annualFee)} a year. We keep your name on our card list at reception.</li>
          <li>Book as usual on WhatsApp: say you are a VIP member and the discount comes off your estimate.</li>
        </ul>
      </aside>
    </div>
  );
}
