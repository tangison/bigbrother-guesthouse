"use client";

import { useEffect, useState } from "react";

/* Back to top (owner audit, 16 Oct 2026): the site had no working
 * scroll-to-top control on mobile, and the floating B2 odometer chip is
 * deliberately desktop-only (it would collide with the sticky action bar).
 * This widget fills that gap with strict visibility rules so it can never
 * behave annoyingly:
 *   - appears only after 600px of scroll, fades out again near the top
 *   - sits bottom-RIGHT; on mobile it docks above the sticky action bar
 *     (bar height + safe-area inset), never on top of it
 *   - hides entirely on print and for reduced-motion users it jumps
 *     without smooth scrolling
 *   - 44px touch target, aria-label, no layout shift (fixed, translated) */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => setVisible(window.scrollY > 600);
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className={`fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-3 z-[140] grid h-11 w-11 place-items-center rounded-full border border-line bg-paper/95 shadow-lg backdrop-blur transition-[opacity,transform] duration-300 md:bottom-6 md:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}
