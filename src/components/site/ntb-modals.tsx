"use client";

import { useState } from "react";
import { Modal } from "./modal";
import { GUESTHOUSE, HOLDINGS } from "@/lib/site-data";
import { BANKING } from "@/lib/rates";

/* Two modals the owner asked for: NTB registration details and banking
 * details. Both open from a button, both close with Escape, both are
 * keyboard friendly. The banking modal also appears via the payment card;
 * the details themselves stay out of footers, meta tags and schema. */
export function NtbModals() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-5 min-h-[44px] rounded-full border border-ink/25 px-5 text-sm font-semibold text-ink transition-colors hover:bg-sand"
      >
        View the NTB registration details
      </button>
      <Modal id="ntb" open={open} onClose={() => setOpen(false)} title="NTB registration">
        <dl className="divide-y divide-line text-[15px]">
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
            <dt className="text-mut">Establishment</dt>
            <dd className="font-semibold">{GUESTHOUSE.name}</dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
            <dt className="text-mut">Registered class</dt>
            <dd className="font-semibold">{GUESTHOUSE.ntb.className}</dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
            <dt className="text-mut">Registration No.</dt>
            <dd className="font-semibold tabular-nums">{GUESTHOUSE.ntb.number}</dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
            <dt className="text-mut">Approval effective</dt>
            <dd className="font-semibold">{GUESTHOUSE.ntb.approved}</dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
            <dt className="text-mut">Certificate awarded</dt>
            <dd className="font-semibold">{GUESTHOUSE.ntb.certificate}</dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
            <dt className="text-mut">Act</dt>
            <dd className="text-right font-semibold">{GUESTHOUSE.ntb.act}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm leading-relaxed text-mut">
          Source: the Namibia Tourism Board approval letter of 14 March 2017 and the registration certificate,
          both in the owner&apos;s records.
        </p>
      </Modal>
    </>
  );
}

export function BankingModalButton({ label = "Banking details" }: { label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="min-h-[44px] rounded-full border border-ink/25 px-6 py-3 font-semibold text-ink transition-colors hover:bg-sand/60"
      >
        {label}
      </button>
      <Modal id="banking" open={open} onClose={() => setOpen(false)} title="Payment details">
        <dl className="divide-y divide-line text-[15px]">
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
            <dt className="text-mut">Bank</dt>
            <dd className="font-semibold">{BANKING.bank}</dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
            <dt className="text-mut">Account name</dt>
            <dd className="font-semibold">{BANKING.accountName}</dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
            <dt className="text-mut">Branch</dt>
            <dd className="font-semibold">{BANKING.branch}</dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
            <dt className="text-mut">Branch code</dt>
            <dd className="font-semibold tabular-nums">{BANKING.branchCode}</dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
            <dt className="text-mut">Account number</dt>
            <dd className="font-semibold tabular-nums">{BANKING.accountNumber}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm leading-relaxed text-mut">{BANKING.note}</p>
        <p className="mt-2 text-sm leading-relaxed text-mut">
          Questions: {GUESTHOUSE.phoneStayDisplay} or {HOLDINGS.email}.
        </p>
      </Modal>
    </>
  );
}
