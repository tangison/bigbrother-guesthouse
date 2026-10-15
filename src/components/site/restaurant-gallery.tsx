"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { QuietFade } from "./motion";

// Restaurant gallery: every plate and drink the owner photographed at the town
// centre kitchen. Guesthouse photos stay on the guesthouse gallery, because
// the two businesses sit at different locations.
const PHOTOS = [
  { src: "dish-samoosa", alt: "Golden samoosas with sauce and salad on a plate" },
  { src: "dish-matangara", alt: "Matangara and pap plated with cucumber and tomato" },
  { src: "dish-feast", alt: "Family feast platter with pap, chicken and salads" },
  { src: "dish-braise", alt: "Slow braised meat with peppers and pap" },
  { src: "dish-steak", alt: "T-bone steak with chips and vegetables" },
  { src: "dish-pizza", alt: "Freshly baked pizza from the oven" },
  { src: "dish-wings", alt: "Grilled chicken wings with lemon and tomato" },
  { src: "dish-fish", alt: "Crumbed fish fillet with rice and sauce" },
  { src: "dish-schnitzel", alt: "Crumbed schnitzel with mash and creamy sauce" },
  { src: "tray-breakfast-eggs-sausage", alt: "Breakfast tray with eggs, sausage and toast" },
  { src: "platter-breakfast-mushrooms", alt: "Breakfast platter with eggs, mushrooms and toast" },
  { src: "tray-ribs-chips", alt: "Ribs and chips on a black tray" },
  { src: "platter-wings-chips", alt: "Chicken wings and chips with lemon" },
  { src: "platter-chicken-onions", alt: "Carved chicken with onion rings on a platter" },
  { src: "platter-fish-eggs-salads", alt: "Whole fish platter with eggs, rice and salads" },
  { src: "plate-steak-chips-salad", alt: "Steak, chips and salad on a Big Brothers plate" },
  { src: "plate-grilled-chicken", alt: "Grilled chicken with salad and lemon" },
  { src: "plate-steak-onion-rings", alt: "Steak topped with onion rings" },
  { src: "plate-steak-chips-peppers", alt: "Steak and chips with grilled peppers" },
  { src: "plate-chicken-rice-salad", alt: "Chicken pieces with rice and greek salad" },
  { src: "plate-pap-spinach", alt: "Pap and spinach served the traditional way" },
  { src: "plate-french-toast", alt: "French toast triangles with tomato and cucumber" },
  { src: "pancake-wedges-cinnamon", alt: "Pancake cut in wedges with cinnamon sugar" },
  { src: "pancake-stuffed-plate", alt: "Stuffed pancake on a white plate" },
  { src: "pancakes-stuffed-two", alt: "Two stuffed pancakes on a plate" },
  { src: "omelette-toast-plate", alt: "Omelette with buttered toast triangles" },
  { src: "mini-pancakes-paddle", alt: "Three mini pancakes on a paddle board" },
  { src: "pancake-paddles-grey-table", alt: "Three mini pancakes on wooden paddles" },
  { src: "cocktail-blue", alt: "Blue cocktail from the bar" },
  { src: "cocktail-sunrise", alt: "Sunset cocktail in a tall glass" },
  { src: "cocktail-blue-goblet", alt: "Blue cocktail in a balloon glass" },
  { src: "cocktail-orange-leaf", alt: "Orange cocktail with a fresh leaf" },
  { src: "drink-lemon-ice", alt: "Lemon cooler with ice on the table" },
  { src: "evening-patio-dining", alt: "Patio tables set out for dinner in the evening" },
];

export function RestaurantGallery() {
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
      <section className="bg-cream" aria-label="Restaurant gallery">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <h1 className="hero-rise max-w-[20ch] font-display text-[clamp(2.2rem,4.6vw,3.9rem)] font-semibold leading-[1.07] tracking-[-0.02em]">
            Plates from our own kitchen.
          </h1>
          <p className="hero-rise mt-4 max-w-xl text-lg text-mut" style={{ "--i": 1 } as React.CSSProperties}>
            Real food from Big Brothers Restaurant in Usakos town centre. Tap any photo to see it larger.
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
                    height={675}
                    loading="lazy"
                    quality={48}
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
              height={675}
              className="max-h-[80vh] w-auto object-contain"
              priority
            />
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
