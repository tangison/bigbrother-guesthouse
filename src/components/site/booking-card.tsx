"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ROOM_TIERS, VIP, formatNad, nightsBetween } from "@/lib/rates";
import { GUESTHOUSE, HOLDINGS, wa, GUESTHOUSE_WA_GREETING } from "@/lib/site-data";
import { PaymentCard } from "./payment-card";

/* The full booking card (master file section 5): property selector, dates
 * with automatic nights, room and occupancy from the one rates file, guests
 * and rooms, VIP toggle, guest details, live price breakdown.
 * No backend, nothing stored: the message is built in the browser.
 * WhatsApp first, email always offered right next to it. */

type Property = "rooms" | "bnb" | "conference" | "day";

const today = () => new Date().toISOString().slice(0, 10);

export function BookingCard() {
  const [property, setProperty] = useState<Property>("rooms");
  const [tierId, setTierId] = useState(ROOM_TIERS[0].id);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [vip, setVip] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [requests, setRequests] = useState("");
  const [sent, setSent] = useState(false);

  // Deep link: /book?tier=r11-double preselects the room from the rooms page.
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("tier");
    if (t && ROOM_TIERS.some((x) => x.id === t)) setTierId(t);
  }, []);

  const tier = useMemo(() => ROOM_TIERS.find((t) => t.id === tierId) ?? ROOM_TIERS[0], [tierId]);
  const nights = nightsBetween(checkIn, checkOut);
  const minOut = checkIn || today();

  // Estimated total: rate x nights x rooms. VIP takes 20% off accommodation
  // only. Conference and day visits never get the discount.
  const accommodation = property === "rooms" || property === "bnb";
  const base = accommodation && tier.rate !== null ? tier.rate * nights * rooms : 0;
  const discount = vip && accommodation ? Math.round(base * VIP.discount) : 0;
  const total = base - discount;
  const priced = accommodation && tier.rate !== null && nights > 0;
  const overCapacity = guests > tier.sleeps * rooms;

  const dateOut = (d: string) => d; // yyyy-mm-dd stays a plain calendar date

  const details = [
    `Guest Name: ${name.trim() || "(not given)"}`,
    `Check-In: ${checkIn || "(pick a date)"}`,
    `Check-Out: ${checkOut || "(pick a date)"} (${nights} night${nights === 1 ? "" : "s"})`,
    `Selected Room/Unit: ${
      property === "rooms"
        ? `${tier.room}, ${tier.occupancy}`
        : property === "bnb"
          ? "Big Brother B&B (price on request)"
          : property === "conference"
            ? `Conference room, up to ${30} people`
            : "Day visit"
    }`,
    `Number of Guests: ${guests}`,
    `VIP Member (20% Off): ${vip ? "Yes" : property === "rooms" || property === "bnb" ? "No" : "Not applicable"}`,
    requests.trim() ? `Special Requests: ${requests.trim()}` : null,
    `Estimated Total: ${priced ? formatNad(total) : "Price on request, we confirm on WhatsApp"}`,
  ].filter(Boolean) as string[];

  const message = [
    "Hello Big Brother Guesthouse, do you have any rooms available?",
    "",
    "*Booking Request Details:*",
    ...details.map((d) => `- ${d}`),
    "",
    "Please confirm availability and payment steps. Thank you!",
  ].join("\n");

  const emailBody = [
    "Hello Big Brother Guesthouse,",
    "",
    ...details.map((d) => d),
    "",
    "Please confirm availability and payment steps. Thank you!",
  ].join("\n");

  const canSend = true; // links always work; missing fields carry "(not given)" markers

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="rounded-2xl border border-line bg-paper p-5 md:p-8">
        {/* 1 · Property */}
        <fieldset>
          <legend className="text-sm font-semibold uppercase tracking-[0.12em] text-mut">Where</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {(
              [
                ["rooms", "Guesthouse, Plot 7 (rooms 1 to 13)"],
                ["bnb", "Big Brother B&B (three en suite rooms)"],
                ["conference", "Conference room (up to 30 people)"],
                ["day", "Day visit (pool and entertainment area)"],
              ] as [Property, string][]
            ).map(([value, label]) => (
              <label
                key={value}
                className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${
                  property === value ? "border-ember bg-sand/60" : "border-line bg-paper"
                }`}
              >
                <input
                  type="radio"
                  name="property"
                  value={value}
                  checked={property === value}
                  onChange={() => setProperty(value)}
                  className="accent-ember"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* 2 · Room and occupancy */}
        {property === "rooms" && (
          <fieldset className="mt-6">
            <legend className="text-sm font-semibold uppercase tracking-[0.12em] text-mut">Room and occupancy</legend>
            <label className="sr-only" htmlFor="tier">
              Room type
            </label>
            <select
              id="tier"
              value={tierId}
              onChange={(e) => {
                setTierId(e.target.value);
                const t = ROOM_TIERS.find((x) => x.id === e.target.value);
                if (t) setGuests(Math.min(guests, t.sleeps));
              }}
              className="mt-3 min-h-[44px] w-full rounded-xl border border-line bg-paper px-4 text-sm font-medium"
            >
              {ROOM_TIERS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.room} · {t.occupancy} · {t.rate === null ? "POA" : formatNad(t.rate)} per night
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm text-mut">{tier.bathroom}. {tier.amenities}.</p>
          </fieldset>
        )}

        {/* 3 · Dates */}
        {(property === "rooms" || property === "bnb") && (
          <fieldset className="mt-6">
            <legend className="text-sm font-semibold uppercase tracking-[0.12em] text-mut">Dates</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 text-sm">
                <span className="font-medium">Check-in</span>
                <input
                  type="date"
                  value={checkIn}
                  min={today()}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (checkOut && checkOut <= e.target.value) setCheckOut("");
                  }}
                  className="min-h-[44px] rounded-xl border border-line bg-paper px-4 text-sm"
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-medium">Check-out</span>
                <input
                  type="date"
                  value={checkOut}
                  min={minOut < today() ? today() : minOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="min-h-[44px] rounded-xl border border-line bg-paper px-4 text-sm"
                />
              </label>
            </div>
            <p className="mt-2 text-sm text-mut">
              {nights > 0 ? `${nights} night${nights === 1 ? "" : "s"}.` : "Pick your dates and we count the nights."}
              {nights === 0 && checkIn && checkOut ? " Check-out must be after check-in." : ""}
            </p>
          </fieldset>
        )}

        {/* 4 · Guests and rooms */}
        <fieldset className="mt-6">
          <legend className="text-sm font-semibold uppercase tracking-[0.12em] text-mut">Guests and rooms</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm">
              <span className="font-medium">Guests</span>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={40}
                value={guests}
                onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))}
                className="min-h-[44px] rounded-xl border border-line bg-paper px-4 text-sm"
              />
            </label>
            {(property === "rooms" || property === "bnb") && (
              <label className="grid gap-1 text-sm">
                <span className="font-medium">Rooms</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={13}
                  value={rooms}
                  onChange={(e) => setRooms(Math.max(1, Number(e.target.value) || 1))}
                  className="min-h-[44px] rounded-xl border border-line bg-paper px-4 text-sm"
                />
              </label>
            )}
          </div>
          {property === "rooms" && overCapacity && (
            <p role="status" className="mt-2 text-sm font-medium text-ember-deep">
              That is more guests than this option usually sleeps ({tier.sleeps} per room). We will do our best on
              WhatsApp, or pick a bigger room.
            </p>
          )}
        </fieldset>

        {/* 5 · VIP toggle */}
        {accommodation && (
          <label className="mt-6 flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border border-line bg-cream px-4 py-3">
            <input type="checkbox" checked={vip} onChange={(e) => setVip(e.target.checked)} className="accent-ember" />
            <span className="text-sm font-medium">
              VIP member, 20 percent off ({formatNad(VIP.annualFee)} a year).{" "}
              <Link href="/vip" className="underline underline-offset-4">
                About the VIP card
              </Link>
            </span>
          </label>
        )}

        {/* 6 · Guest details */}
        <fieldset className="mt-6">
          <legend className="text-sm font-semibold uppercase tracking-[0.12em] text-mut">Your details</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm">
              <span className="font-medium">Full name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="min-h-[44px] rounded-xl border border-line bg-paper px-4 text-sm"
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="font-medium">Phone number</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                placeholder="+264 81 ..."
                className="min-h-[44px] rounded-xl border border-line bg-paper px-4 text-sm"
              />
            </label>
          </div>
          <label className="mt-3 grid gap-1 text-sm">
            <span className="font-medium">Special requests (optional)</span>
            <textarea
              value={requests}
              onChange={(e) => setRequests(e.target.value)}
              rows={3}
              className="rounded-xl border border-line bg-paper px-4 py-3 text-sm"
            />
          </label>
        </fieldset>

        {/* 7 · Send: WhatsApp first, email right next to it */}
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <a
            href={wa(GUESTHOUSE.phoneStayWhatsapp, message)}
            rel="noopener"
            onClick={() => setSent(true)}
            className="flex min-h-[48px] items-center justify-center rounded-full bg-ember px-6 text-center font-semibold text-ink transition-colors hover:bg-ember-deep hover:text-paper"
          >
            Book on WhatsApp
          </a>
          <a
            href={`mailto:${HOLDINGS.email}?subject=${encodeURIComponent(
              "Booking request" + (name.trim() ? ` from ${name.trim()}` : "")
            )}&body=${encodeURIComponent(emailBody)}`}
            onClick={() => setSent(true)}
            className="flex min-h-[48px] items-center justify-center rounded-full border border-ink/25 px-6 text-center font-semibold text-ink transition-colors hover:bg-sand/60"
          >
            Book via Email
          </a>
        </div>
        <p className="mt-3 text-sm text-mut">
          Or just ask:{" "}
          <a className="font-semibold underline underline-offset-4" href={wa(GUESTHOUSE.phoneStayWhatsapp, GUESTHOUSE_WA_GREETING)} rel="noopener">
            Ask on WhatsApp
          </a>{" "}
          · <a className="font-semibold underline underline-offset-4" href={`tel:${GUESTHOUSE.phoneStay}`}>
            Call {GUESTHOUSE.phoneStayDisplay}
          </a>
        </p>
        {/* No-JS fallback: plain links still carry the greeting */}
        <noscript>
          <p className="mt-3 text-sm">
            Booking form needs JavaScript.{" "}
            <a href={wa(GUESTHOUSE.phoneStayWhatsapp, GUESTHOUSE_WA_GREETING)} rel="noopener">
              WhatsApp us
            </a>{" "}
            or <a href={`tel:${GUESTHOUSE.phoneStay}`}>call {GUESTHOUSE.phoneStayDisplay}</a> or{" "}
            <a href={`mailto:${HOLDINGS.email}`}>email {HOLDINGS.email}</a>.
          </p>
        </noscript>
        {canSend && sent && (
          <div className="mt-6 rounded-xl border border-line bg-cream p-5" aria-live="polite">
            <p className="font-display text-xl font-semibold">Request sent, thank you.</p>
            <p className="mt-2 text-sm leading-relaxed text-mut">
              We reply on WhatsApp or email to confirm availability and today&apos;s real rate. You pay only after
              we confirm. Nothing was stored on this website: your booking went straight to our phone.
            </p>
            <div className="mt-4">
              <PaymentCard />
            </div>
          </div>
        )}
      </div>

      {/* Live price breakdown */}
      <aside className="h-fit rounded-2xl bg-ink p-6 text-paper md:sticky md:top-32 md:p-8" aria-live="polite">
        <h2 className="font-display text-2xl font-semibold">Your estimate</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-paper/70">
              {accommodation ? "Rate x nights x rooms" : property === "conference" ? "Conference room" : "Day visit"}
            </dt>
            <dd className="font-display text-lg font-semibold tabular-nums">
              {accommodation
                ? tier.rate === null
                  ? "POA"
                  : `${formatNad(tier.rate)} x ${nights} x ${rooms}`
                : property === "conference"
                  ? `${formatNad(450)} per booking`
                  : "From N$20 per person"}
            </dd>
          </div>
          {discount > 0 && (
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-paper/70">VIP discount (20%)</dt>
              <dd className="font-display text-lg font-semibold tabular-nums text-ember">
                − {formatNad(discount)}
              </dd>
            </div>
          )}
          <div className="flex items-baseline justify-between gap-4 border-t border-paper/15 pt-3">
            <dt className="font-semibold">Estimated total</dt>
            <dd className="font-display text-2xl font-semibold tabular-nums">
              {priced ? formatNad(total) : "POA"}
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-paper/60">
          Estimate. We confirm on WhatsApp. Prices come from the owner&apos;s own price list. Payment happens after
          we confirm your booking, by EFT or at check-in: the account details arrive with your
          confirmation.
        </p>
      </aside>
    </div>
  );
}
