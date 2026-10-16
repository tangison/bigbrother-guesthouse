"use client";

import { useState } from "react";
import { BANKING, RESTAURANT_BANKING, formatNad } from "@/lib/rates";

/* Payment details cards. The guesthouse card lives ONLY inside the booking
 * "Request sent" panel and once on the rooms page. The branch code row
// shows the owner-confirmed code (281073, confirmed 16 Oct 2026 - see
// data/site-config.ts).
 * Copy-account-number button uses the clipboard with a plain fallback for
 * older browsers. The restaurant card renders wherever the restaurant talks
 * about payment and stays honest while the owner's EFT details are pending. */

export function PaymentCard() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const n = BANKING.accountNumber;
    try {
      await navigator.clipboard.writeText(n);
      setCopied(true);
    } catch {
      const el = document.createElement("textarea");
      el.value = n;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
    }
    setTimeout(() => setCopied(false), 2400);
  };

  const row = (label: string, value: string) => (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-2">
      <dt className="text-sm text-mut">{label}</dt>
      <dd className="text-right font-semibold tabular-nums">{value}</dd>
    </div>
  );

  return (
    <div className="rounded-xl border border-line bg-paper p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold">Payment details</h3>
        <button
          onClick={copy}
          className="min-h-[44px] rounded-full bg-ink px-5 text-sm font-semibold text-paper transition-colors hover:bg-ember-deep"
        >
          {copied ? "Copied" : "Copy account number"}
        </button>
      </div>
      <dl className="mt-2 divide-y divide-line">
        {row("Bank", BANKING.bank)}
        {row("Account name", BANKING.accountName)}
        {row("Branch", BANKING.branch)}
        {BANKING.branchCodeConfirmed ? row("Branch code", BANKING.branchCode) : null}
        {row("Account number", BANKING.accountNumber)}
      </dl>
      <p className="mt-3 text-sm leading-relaxed text-mut">{BANKING.note}</p>
      <p className="mt-1 text-xs text-mut">
        EFT or pay on check-in. Estimated totals are in {formatNad(0).replace("0", "")}Namibian Dollar and are
        confirmed by us on WhatsApp before you pay.
      </p>
    </div>
  );
}

/* Big Brothers Restaurant payment card. The owner's EFT details have not
 * been supplied (see data/site-config.ts RESTAURANT_BANKING), so while
 * supplied is false the card shows the honest fallback: pay at the
 * restaurant, or ask on WhatsApp for EFT details. No bank fields are
 * invented. When the owner sends the details, the same card renders them. */
export function RestaurantPaymentCard() {
  const b = RESTAURANT_BANKING;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(b.accountNumber);
      setCopied(true);
    } catch {
      /* clipboard unavailable: nothing to copy while details are pending */
    }
    setTimeout(() => setCopied(false), 2400);
  };

  const row = (label: string, value: string) => (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-2">
      <dt className="text-sm text-mut">{label}</dt>
      <dd className="text-right font-semibold tabular-nums">{value}</dd>
    </div>
  );

  return (
    <div className="rounded-xl border border-line bg-paper p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold">Paying Big Brothers Restaurant</h3>
        {b.supplied && (
          <button
            onClick={copy}
            className="min-h-[44px] rounded-full bg-ink px-5 text-sm font-semibold text-paper transition-colors hover:bg-ember-deep"
          >
            {copied ? "Copied" : "Copy account number"}
          </button>
        )}
      </div>
      {b.supplied ? (
        <dl className="mt-2 divide-y divide-line">
          {row("Bank", b.bank)}
          {row("Account name", b.accountName)}
          {b.branch ? row("Branch", b.branch) : null}
          {row("Account number", b.accountNumber)}
        </dl>
      ) : (
        <p className="mt-3 text-sm leading-relaxed text-mut">{b.note}</p>
      )}
    </div>
  );
}
