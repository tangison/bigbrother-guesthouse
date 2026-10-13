"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { QuietFade } from "./motion";

// Gallery of real client photos (filebin upload, Oct 2026). All alt text written per image.
const PHOTOS = [
  { src: "gallery-01", alt: "Big Brothers Restaurant badge, established 2023 in Usakos", tall: true },
  { src: "gallery-02", alt: "Big Brother Guesthouse logo, home away from home" },
  { src: "gallery-03", alt: "Welcome plate of seasoned chips with sauce writing" },
  { src: "gallery-04", alt: "English breakfast with eggs, minute steak and onions" },
  { src: "gallery-05", alt: "Slow braised meat with peppers and greens" },
  { src: "gallery-06", alt: "Sweet pancake with sauce" },
  { src: "gallery-07", alt: "T-bone steak with chips and vegetables" },
  { src: "gallery-08", alt: "Pap with matangara and tomato" },
  { src: "gallery-09", alt: "Cheesy chips topped with mince" },
  { src: "gallery-10", alt: "Salad plate with creamy dipping sauce" },
  { src: "gallery-11", alt: "Family feast platter with pap, chicken and salads", tall: true },
  { src: "gallery-12", alt: "Grilled chicken wings with lemon and tomato" },
  { src: "gallery-13", alt: "Breakfast tray with eggs, bacon and toast" },
  { src: "gallery-14", alt: "Freshly baked pizza straight from the oven", tall: true },
  { src: "gallery-15", alt: "Chicken pieces with carrot sticks and chips" },
  { src: "gallery-16", alt: "Pap and beef plate with pepper garnish", tall: true },
  { src: "gallery-17", alt: "Pizza in a takeaway box", tall: true },
  { src: "gallery-18", alt: "Loaded pizza with chilli and greens", tall: true },
  { src: "gallery-19", alt: "Dumplings with chicken and side sauces" },
  { src: "gallery-20", alt: "Toasted wraps on a decorated plate" },
  { src: "gallery-21", alt: "Steak platter with onions and chips" },
  { src: "gallery-22", alt: "Ribs with mash and vegetables", tall: true },
  { src: "gallery-23", alt: "Blue cocktail from the bar", tall: true },
  { src: "gallery-24", alt: "Sunset cocktail in a tall glass", tall: true },
  { src: "gallery-25", alt: "Passion fruit and lemonade drink", tall: true },
  { src: "gallery-26", alt: "Big breakfast with eggs, avocado and toast" },
  { src: "gallery-27", alt: "Crumbled schnitzel with mash and creamy sauce" },
  { src: "gallery-28", alt: "Chicken wings and chips with tomato relish" },
  { src: "gallery-29", alt: "Family pizza in an open box", tall: true },
  { src: "gallery-30", alt: "Crumbed fish with yellow rice and sauce" },
  // Property photographs, from the business's own Google Maps listing (Oct 2026)
  { src: "property-front", alt: "The Big Brother Guesthouse front: white buildings, carport and hills behind" },
  { src: "property-rooms", alt: "The rooms block with gravel driveway and palm tree", tall: false },
  { src: "property-lapa", alt: "Shaded lapa with tables on the lawn, palm trees around", tall: false },
  { src: "property-pool", alt: "The stone-edged garden pond beside the braai area", tall: true },
  { src: "property-pool-wide", alt: "Wide view over the pool, lapa and garden corner", tall: false },
  // Region context, licensed from Pexels and labelled as the region, not the property
  { src: "region-road", alt: "A long desert road running towards mountains in the Erongo Region" },
  { src: "region-spitzkoppe", alt: "Granite boulders and peaks near Usakos at dusk, in the Erongo Region", tall: true },
];

export function GalleryView() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (open !== null && e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % PHOTOS.length));
      if (open !== null && e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + PHOTOS.length) % PHOTOS.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <section className="bg-cream" aria-label="Gallery">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <h1 className="hero-rise max-w-[20ch] font-display text-[clamp(2.2rem,4.6vw,3.9rem)] font-semibold leading-[1.07] tracking-[-0.02em]">
            Real plates, real people, real Usakos.
          </h1>
          <p className="hero-rise mt-4 max-w-xl text-lg text-mut" style={{ "--i": 1 } as React.CSSProperties}>
            Every photo here comes from our own kitchen and bar. Tap any photo to see it larger.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6" aria-label="Photos">
        <ul className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {PHOTOS.map((p, i) => (
            <li key={p.src} className="break-inside-avoid">
              <QuietFade delay={(i % 3) * 0.05}>
                <button
                  onClick={() => setOpen(i)}
                  className="photo-frame group block w-full border border-line"
                  aria-label={`View photo: ${p.alt}`}
                >
                  <Image
                    src={`/images/${p.src}.jpg`}
                    alt={p.alt}
                    width={900}
                    height={p.tall ? 1200 : 675}
                    loading="lazy"
                    quality={52}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="h-auto w-full object-cover"
                  />
                </button>
              </QuietFade>
            </li>
          ))}
        </ul>
      </section>

      {open !== null && (
        <div
          className="fixed inset-0 z-[400] flex items-center justify-center bg-ink/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={PHOTOS[open].alt}
          onClick={() => setOpen(null)}
        >
          <button
            className="absolute right-4 top-4 rounded-full border border-paper/30 px-4 py-2 text-paper transition-colors hover:bg-paper/10"
            onClick={() => setOpen(null)}
            aria-label="Close photo"
          >
            Close
          </button>
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-paper/30 px-4 py-3 text-paper transition-colors hover:bg-paper/10"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((o) => (o === null ? o : (o - 1 + PHOTOS.length) % PHOTOS.length));
            }}
            aria-label="Previous photo"
          >
            ←
          </button>
          <figure className="pop-in max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={`/images/${PHOTOS[open].src}.jpg`}
              alt={PHOTOS[open].alt}
              width={900}
              height={1200}
              className="max-h-[80vh] w-auto object-contain"
              priority
            />
            <figcaption className="caption mt-3 text-center">{PHOTOS[open].alt}</figcaption>
          </figure>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-paper/30 px-4 py-3 text-paper transition-colors hover:bg-paper/10"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((o) => (o === null ? o : (o + 1) % PHOTOS.length));
            }}
            aria-label="Next photo"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
