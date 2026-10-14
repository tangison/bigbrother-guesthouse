"use client";

import { useState } from "react";
import { BANKING, formatNad } from "@/lib/rates";

/* Payment details card. Lives ONLY inside the booking "Request sent" panel
 * and once on the rooms page. Copy-account-number button uses the clipboard
 * with a plain fallback for older browsers. */
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
        {row("Branch code", BANKING.branchCode)}
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
