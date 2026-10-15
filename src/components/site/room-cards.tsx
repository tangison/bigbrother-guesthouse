"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { VISIBLE_TIERS, GROUP_LABELS, rateLabel, type RoomGroup } from "@/lib/rates";

/* Filterable room cards, fed from the one rates file (rates.ts), visible tiers
 * only (owner round 6 pricing table). Filters: all, single, twin or double,
 * private bathroom, family unit. Every card deep-links into the booking card
 * with the tier preselected. */
const FILTERS: { key: string; label: string; match: (g: RoomGroup, o: string) => boolean }[] = [
  { key: "all", label: "All rooms", match: () => true },
  { key: "single", label: "Single", match: (_g, o) => o === "Single" },
  { key: "double", label: "Twin or double", match: (_g, o) => /twin|double|triple|quadruple/i.test(o) },
  {
    key: "en-suite",
    label: "Private bathroom",
    match: (g, _o) => g === "private" || g === "family",
  },
  { key: "family", label: "Family unit", match: (g) => g === "family" },
];

export function RoomCards() {
  const [filter, setFilter] = useState("all");
  const active = FILTERS.find((f) => f.key === filter) ?? FILTERS[0];
  const rooms = useMemo(() => VISIBLE_TIERS.filter((t) => active.match(t.group, t.occupancy)), [active]);

  return (
    <div>
      <div className="rail flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter rooms">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={`min-h-[44px] shrink-0 rounded-full border px-5 text-sm font-semibold transition-colors ${
              filter === f.key
                ? "border-ink bg-ink text-paper"
                : "border-line bg-paper text-ink hover:bg-sand"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {rooms.map((t) => (
          <article key={t.id} className="rounded-xl border border-line bg-paper p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl font-semibold">
                {t.room} · {t.occupancy}
              </h3>
              <p className="font-display text-xl font-semibold tabular-nums text-ember-deep">{rateLabel(t.rate)}</p>
            </div>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-mut">{GROUP_LABELS[t.group]}</p>
            {t.badge && (
              <p className="mt-2 w-fit rounded-full bg-leaf px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-paper">
                {t.badge}
              </p>
            )}
            <p className="mt-3 text-sm leading-relaxed text-mut">{t.bathroom}.</p>
            <p className="mt-1 text-sm leading-relaxed text-mut">{t.amenities}.</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-mut">Sleeps {t.sleeps}</span>
              <Link
                href={`/book?tier=${t.id}`}
                className="min-h-[44px] rounded-full border border-ink/25 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-sand"
              >
                Book this room
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
