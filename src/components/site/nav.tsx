"use client";

import { useEffect, useState } from "react";
import { BIZ } from "@/lib/site-data";

export type ViewKey = "home" | "restaurant" | "menu" | "guesthouse" | "facilities" | "gallery" | "contact";

export const VIEWS: { key: ViewKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "restaurant", label: "Restaurant" },
  { key: "menu", label: "Menu" },
  { key: "guesthouse", label: "Guesthouse" },
  { key: "facilities", label: "Facilities" },
  { key: "gallery", label: "Gallery" },
  { key: "contact", label: "Contact" },
];

export function Nav({ view, go }: { view: ViewKey; go: (v: ViewKey) => void }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const pick = (v: ViewKey) => {
    go(v);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          solid ? "border-b border-line bg-paper/95 shadow-sm backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <button
            onClick={() => pick("home")}
            className="flex items-center gap-3 text-left"
            aria-label="Big Brother Holdings, go to home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink font-display text-sm font-bold text-ember">
              BB
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-semibold md:text-lg">Big Brother Holdings</span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-mut">
                Guesthouse · B&B · Restaurant
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {VIEWS.map((v) => (
              <button
                key={v.key}
                onClick={() => pick(v.key)}
                aria-current={view === v.key ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  view === v.key ? "bg-ink text-paper" : "text-ink hover:bg-sand/60"
                }`}
              >
                {v.label}
              </button>
            ))}
            <a
              href={BIZ.socials ? `tel:${BIZ.guesthouse.phone1}` : "#"}
              className="ml-2 rounded-full bg-ember px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Call {BIZ.guesthouse.phone1Display}
            </a>
          </nav>

          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-paper lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-ink transition-transform ${
                  open ? "translate-y-[5.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-5 bg-ink transition-transform ${
                  open ? "-translate-y-[5.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 top-[64px] z-40 overflow-y-auto bg-paper px-6 py-6 lg:hidden">
          <nav className="grid gap-2" aria-label="Mobile navigation">
            {VIEWS.map((v, i) => (
              <button
                key={v.key}
                onClick={() => pick(v.key)}
                style={{ animationDelay: `${i * 40}ms` }}
                className={`pop-in rounded-2xl border px-5 py-4 text-left font-display text-2xl font-semibold ${
                  view === v.key ? "border-ink bg-ink text-paper" : "border-line bg-cream/60"
                }`}
              >
                {v.label}
              </button>
            ))}
          </nav>
          <div className="mt-6 grid gap-2 border-t border-line pt-6 text-sm text-mut">
            <a className="font-semibold text-ink" href={`tel:${BIZ.guesthouse.phone1}`}>
              Guesthouse: {BIZ.guesthouse.phone1Display}
            </a>
            <a className="font-semibold text-ink" href={`tel:${BIZ.restaurant.phone}`}>
              Restaurant: {BIZ.restaurant.phoneDisplay}
            </a>
            <span>{BIZ.address.street}, {BIZ.address.town}</span>
          </div>
        </div>
      )}
    </header>
  );
}
