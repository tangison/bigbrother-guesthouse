"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/* Hero photo slider. The ground plane of the hero: three real photographs
 * (two from the owner's Google Maps listing, one from the owner's own kitchen)
 * crossfade on a slow clock. Controls: arrows, dots, keyboard. Auto-advance
 * pauses on hover and focus, and never runs under prefers-reduced-motion.
 * Captions are honest about where each photo comes from. */

const SLIDES = [
  {
    src: "/images/hero-platter.jpg",
    alt: "The Big Brothers family platter with pap, chicken and salads",
    cap: "The platter, made for sharing",
  },
  {
    src: "/images/property-pool-wide.jpg",
    alt: "The Big Brother pool, lapa and garden, from the guesthouse Google Maps listing",
    cap: "The pool and the lapa, from our Google listing",
  },
  {
    src: "/images/property-lapa.jpg",
    alt: "Shaded lapa tables on the lawn, from the guesthouse Google Maps listing",
    cap: "Lunch under the lapa, from our Google listing",
  },
];

const INTERVAL = 6000;

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [seen, setSeen] = useState<number[]>([0]);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const go = useCallback((n: number) => {
    const next = (n + SLIDES.length) % SLIDES.length;
    setActive(next);
    setSeen((s) => (s.includes(next) ? s : [...s, next]));
  }, []);

  useEffect(() => {
    if (paused || reduced.current) return;
    const t = window.setInterval(() => go(active + 1), INTERVAL);
    return () => window.clearInterval(t);
  }, [paused, active, go]);
  return (
    <div
      className="absolute inset-0"
      role="group"
      aria-roledescription="carousel"
      aria-label="Photos of Big Brother Guesthouse and its food"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Slides beyond the first mount only once first shown: the cold load
           * carries one hero photo, not three. */}
          {seen.includes(i) && (
            <Image
              src={s.src}
              alt={i === active ? s.alt : ""}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              quality={52}
              sizes="100vw"
              /* Ken Burns runs on the active slide; reduced motion is handled
               * in CSS (globals.css disables the animation). */
              className={`object-cover ${i === active ? "kenburns" : ""}`}
            />
          )}
        </div>
      ))}

      {/* Controls: arrows + dots. Sized for touch, labelled for screen readers. */}
      <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-between px-4 md:bottom-6 md:px-6">
        <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose slide">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              role="tab"
              aria-selected={i === active}
              aria-label={`Slide ${i + 1} of ${SLIDES.length}: ${s.cap}`}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full transition-all duration-200 ${
                i === active ? "w-8 bg-paper" : "w-2.5 bg-paper/45 hover:bg-paper/70"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(active - 1)}
            aria-label="Previous photo"
            className="grid h-11 w-11 place-items-center rounded-full border border-paper/40 bg-ink/25 text-paper backdrop-blur-sm transition-colors hover:bg-ink/50 active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => go(active + 1)}
            aria-label="Next photo"
            className="grid h-11 w-11 place-items-center rounded-full border border-paper/40 bg-ink/25 text-paper backdrop-blur-sm transition-colors hover:bg-ink/50 active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Per-slide caption, corner anchored */}
      <p aria-live="polite" className="caption absolute bottom-[4.4rem] left-5 z-10 md:bottom-[5.2rem] md:left-6">
        {SLIDES[active].cap}
      </p>
    </div>
  );
}
