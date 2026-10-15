"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* Hero background slideshow (owner round 6: "make it more of a slideshow in
 * the background"). The ground plane of the hero: the owner's own photographs
 * crossfading slowly behind the type, no visible controls, no dots, no
 * captions. Auto-advance pauses while the tab is hidden; visitors who prefer
 * reduced motion get a single still photograph (the kenburns animation is
 * already gated in globals.css). Slides beyond the first mount only once
 * first shown: the cold load carries one hero photo, not five. */

const SLIDES = [
  {
    src: "/images/hero-pool-gardens.jpg",
    alt: "The Big Brother pool, gardens and thatched lapas under a clear blue sky",
  },
  {
    src: "/images/building-main-yellow.jpg",
    alt: "Main guesthouse building painted yellow and green",
  },
  {
    src: "/images/pool-umbrellas-lapas.jpg",
    alt: "Swimming pool with shade umbrellas and thatched lapas",
  },
  {
    src: "/images/pool-lapa-mountains.jpg",
    alt: "Thatched lapa and pool with the hills behind",
  },
  {
    src: "/images/entrance-gates-welcome.jpg",
    alt: "Yellow entrance gates with the welcome boards",
  },
];

const INTERVAL = 6500;

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<number[]>([0]);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Reduced motion: no auto-advance at all, one still photograph.
    if (reduced) return;
    // Ambient advance: skip entirely while the document is hidden so the
    // slider never burns data or cycles unseen.
    if (document.hidden) return;
    const id = window.setInterval(() => {
      if (!document.hidden) {
        setActive((a) => {
          const next = (a + 1) % SLIDES.length;
          setSeen((s) => (s.includes(next) ? s : [...s, next]));
          return next;
        });
      }
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [active, reduced]);

  return (
    <div
      className="absolute inset-0"
      role="group"
      aria-roledescription="carousel"
      aria-label="Photos of Big Brother Guesthouse and its grounds"
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          {seen.includes(i) && (
            <Image
              src={s.src}
              alt={i === active ? s.alt : ""}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              quality={45}
              sizes="100vw"
              /* Ken Burns runs on the active slide; reduced motion is handled
               * in CSS (globals.css disables the animation). */
              className={`object-cover ${i === active ? "kenburns" : ""}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
