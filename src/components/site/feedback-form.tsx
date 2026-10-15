"use client";

import { useState } from "react";
import { GUESTHOUSE, RESTAURANT, HOLDINGS, wa } from "@/lib/site-data";

/* Guest Voice & Feedback portal (master file section 8, round 6 categories):
 * compliments, reviews and complaints. Restaurant feedback goes to the Eat
 * number, everything else to the Stay number. Ratings are sent, never
 * displayed or averaged. Nothing stored on the website. */
export function FeedbackForm() {
  const [type, setType] = useState("Compliment");
  const [place, setPlace] = useState("Guesthouse");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const toEat = place === "Restaurant";
  const lines = [
    `Type: ${type}`,
    `Place: ${place}`,
    date ? `Date of visit: ${date}` : null,
    name.trim() ? `Name: ${name.trim()}` : "Name: (anonymous)",
    contact.trim() ? `Contact: ${contact.trim()}` : null,
    rating > 0 ? `Stars: ${rating} out of 5` : null,
    "",
    message.trim() || "(message)",
  ].filter(Boolean) as string[];

  const subject = `${type} for ${place} - Big Brother`;
  const messageText = [`Hello Big Brother, guest feedback:`, "", ...lines].join("\n");
  const phone = toEat ? RESTAURANT.phoneEatWhatsapp : GUESTHOUSE.phoneStayWhatsapp;

  return (
    <div className="rounded-2xl border border-line bg-paper p-5 md:p-8">
      <fieldset>
        <legend className="text-sm font-semibold uppercase tracking-[0.12em] text-mut">What is this?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {[
            "Compliment",
            "Review",
            "Complaint",
          ].map((t) => (
            <label
              key={t}
              className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${
                type === t ? "border-ember bg-sand/60" : "border-line"
              }`}
            >
              <input type="radio" name="fbtype" value={t} checked={type === t} onChange={() => setType(t)} className="accent-ember" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold uppercase tracking-[0.12em] text-mut">Which place?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {["Guesthouse", "Plot 7", "B&B", "Restaurant"].map((p) => (
            <label
              key={p}
              className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${
                place === p ? "border-ember bg-sand/60" : "border-line"
              }`}
            >
              <input type="radio" name="fbplace" value={p} checked={place === p} onChange={() => setPlace(p)} className="accent-ember" />
              {p}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          <span className="font-medium">Date of visit</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="min-h-[44px] rounded-xl border border-line bg-paper px-4 text-sm" />
        </label>
        <div className="grid gap-1 text-sm">
          <span className="font-medium">Your stars</span>
          <div className="flex min-h-[44px] items-center gap-1" role="group" aria-label="Star rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                aria-pressed={rating === n}
                className={`grid h-11 w-11 place-items-center rounded-full text-xl transition-colors ${
                  n <= rating ? "bg-ember text-ink" : "bg-sand text-mut hover:bg-sand/70"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <label className="grid gap-1 text-sm">
          <span className="font-medium">Your name (optional)</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name"
            className="min-h-[44px] rounded-xl border border-line bg-paper px-4 text-sm" />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="font-medium">Phone or email, so we can reply (optional)</span>
          <input type="text" value={contact} onChange={(e) => setContact(e.target.value)}
            className="min-h-[44px] rounded-xl border border-line bg-paper px-4 text-sm" />
        </label>
      </div>

      <label className="mt-3 grid gap-1 text-sm">
        <span className="font-medium">Your message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder={type === "Complaint" ? "Tell us what went wrong. The owner reads every complaint." : "Tell us how it was."}
          className="rounded-xl border border-line bg-paper px-4 py-3 text-sm"
        />
      </label>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a
          href={wa(phone, messageText)}
          rel="noopener"
          onClick={() => setSent(true)}
          className="flex min-h-[48px] items-center justify-center rounded-full bg-ember px-6 text-center font-semibold text-ink transition-colors hover:bg-ember-deep hover:text-paper"
        >
          Send on WhatsApp
        </a>
        <a
          href={`mailto:${HOLDINGS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageText)}`}
          onClick={() => setSent(true)}
          className="flex min-h-[48px] items-center justify-center rounded-full border border-ink/25 px-6 text-center font-semibold text-ink transition-colors hover:bg-sand/60"
        >
          Send by email
        </a>
      </div>
      {sent && (
        <p className="mt-4 rounded-xl border border-line bg-cream p-4 text-sm text-mut" aria-live="polite">
          Thank you. Your feedback went straight to the owner&apos;s phone{name.trim() ? "" : ", anonymously"}. Complaints
          get a personal reply, usually the same day.
        </p>
      )}
    </div>
  );
}
