"use client";

import { useEffect, useRef, useState } from "react";

// Signature move: the B2 Odometer.
// As you scroll the page, a fixed chip counts kilometres along the B2:
// Windhoek (210 km) sits at the top of the page, Usakos (0) in the middle,
// Swakopmund (147 km) at the bottom. Distances from the client contact page.
const WINDHOEK = 210;
const SWAKOPMUND = 147;

export function B2Odometer() {
  const [state, setState] = useState({ km: WINDHOEK, town: "Leaving Windhoek, B2 south" });
  const raf = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        // Top half: Windhoek (210) down to Usakos (0). Bottom half: Usakos (0) to Swakopmund (147).
        const km = p < 0.5 ? Math.round(WINDHOEK * (1 - p * 2)) : Math.round(SWAKOPMUND * ((p - 0.5) * 2));
        const town =
          p < 0.08 ? "Leaving Windhoek, B2 west" : p < 0.42 ? "On the B2, Erongo Region" : p < 0.5 ? "Arriving Usakos" : p < 0.62 ? "Usakos, home of Big Brother" : p < 0.95 ? "B2 towards the coast" : "Swakopmund ahead, 0 km to go";
        setState({ km, town });
      });
    };
    onScroll();
    if (!reduced) window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-4 left-4 z-40 hidden select-none items-center gap-3 rounded-full border border-line bg-paper/95 py-2 pl-3 pr-4 shadow-lg backdrop-blur md:flex"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-sm font-bold text-leaf">
        B2
      </span>
      <span className="font-display text-lg font-semibold tabular-nums leading-none">{state.km} km</span>
      <span className="text-xs font-medium uppercase tracking-wider text-mut">{state.town}</span>
    </div>
  );
}
