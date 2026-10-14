"use client";

import { useState } from "react";
import { RESTAURANT, wa } from "@/lib/site-data";
import { formatNad } from "@/lib/rates";

/* Restaurant table reservation: name, phone, date, time, guests, notes.
 * "Reserve on WhatsApp" goes to the Eat number; "Reserve by email" always
 * sits next to it. Nothing stored, the message is built in the browser. */
export function ReserveCard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);

  const lines = [
    `Name: ${name.trim() || "(not given)"}`,
    `Phone: ${phone.trim() || "(not given)"}`,
    `Date: ${date || "(pick a date)"}`,
    `Time: ${time || "(pick a time)"}`,
    `Guests: ${guests}`,
    notes.trim() ? `Notes: ${notes.trim()}` : null,
  ].filter(Boolean) as string[];

  const message = ["Hello Big Brothers Restaurant, I would like to reserve a table.", "", ...lines.map((l) => `- ${l}`)].join("\n");

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="rounded-2xl border border-line bg-paper p-5 md:p-8">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Name</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name"
              className="min-h-[44px] rounded-xl border border-line bg-paper px-4 text-sm" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Phone</span>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="+264 81 ..."
              className="min-h-[44px] rounded-xl border border-line bg-paper px-4 text-sm" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Date</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              className="min-h-[44px] rounded-xl border border-line bg-paper px-4 text-sm" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Time</span>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
              className="min-h-[44px] rounded-xl border border-line bg-paper px-4 text-sm" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Guests</span>
            <input type="number" inputMode="numeric" min={1} max={40} value={guests}
              onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))}
              className="min-h-[44px] rounded-xl border border-line bg-paper px-4 text-sm" />
          </label>
          <label className="grid gap-1 text-sm sm:col-span-2">
            <span className="font-medium">Notes (optional)</span>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
              placeholder="Birthday table, shady corner, a cake we should know about..."
              className="rounded-xl border border-line bg-paper px-4 py-3 text-sm" />
          </label>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href={wa(RESTAURANT.phoneEatWhatsapp, message)}
            rel="noopener"
            onClick={() => setSent(true)}
            className="flex min-h-[48px] items-center justify-center rounded-full bg-ember px-6 text-center font-semibold text-ink transition-colors hover:bg-ember-deep hover:text-paper"
          >
            Reserve on WhatsApp
          </a>
          <a
            href={`mailto:${RESTAURANT.email}?subject=${encodeURIComponent("Table reservation" + (name.trim() ? ` from ${name.trim()}` : ""))}&body=${encodeURIComponent(message)}`}
            onClick={() => setSent(true)}
            className="flex min-h-[48px] items-center justify-center rounded-full border border-ink/25 px-6 text-center font-semibold text-ink transition-colors hover:bg-sand/60"
          >
            Reserve by email
          </a>
        </div>
        <noscript>
          <p className="mt-3 text-sm">
            <a href={wa(RESTAURANT.phoneEatWhatsapp, "Hello Big Brothers Restaurant, I would like to reserve a table.")} rel="noopener">
              WhatsApp us
            </a>{" "}
            or call {RESTAURANT.phoneEatDisplay}.
          </p>
        </noscript>
        {sent && (
          <div className="mt-6 rounded-xl border border-line bg-cream p-5" aria-live="polite">
            <p className="font-display text-xl font-semibold">Request sent, thank you.</p>
            <p className="mt-2 text-sm leading-relaxed text-mut">
              The kitchen confirms on WhatsApp or email. Tables are held for a reasonable time; tell us if you run
              late. Nothing was stored on this website.
            </p>
          </div>
        )}
      </div>

      <aside className="h-fit rounded-2xl bg-ink p-6 text-paper md:sticky md:top-32 md:p-8">
        <h2 className="font-display text-2xl font-semibold">Good to know</h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-paper/80">
          <li>We are at {RESTAURANT.address.street}, {RESTAURANT.address.area}.</li>
          <li>Kitchen hours: {RESTAURANT.hoursKnown}. Public holidays can shift; ask on WhatsApp.</li>
          <li>Big groups: tell us the number and we will set the lapa tables.</li>
          <li>Prices run from {formatNad(30)} to the {formatNad(400)} platter, straight from our printed menu.</li>
        </ul>
        <a
          href={`tel:${RESTAURANT.phoneEat}`}
          className="mt-6 inline-block rounded-full border border-paper/30 px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-paper/10"
        >
          Or call {RESTAURANT.phoneEatDisplay}
        </a>
      </aside>
    </div>
  );
}
