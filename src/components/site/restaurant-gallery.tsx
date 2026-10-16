"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { QuietFade } from "./motion";

// Restaurant gallery: the place itself (interiors and exteriors photographed by
// the owner) plus every plate and drink from the town centre kitchen.
// Guesthouse photos stay on the guesthouse gallery, because the two businesses
// sit at different locations.
type Photo = { src: string; alt: string; w: number; h: number };

export const PLACES: Photo[] = [
  { src: "restaurant-exterior-entrance", alt: "The restaurant entrance with green and yellow posts", w: 810, h: 1080 },
  { src: "restaurant-exterior-entrance-flag", alt: "The restaurant entrance with the brand banner and flag", w: 810, h: 1080 },
  { src: "restaurant-exterior-banner-dusk", alt: "The Big Brothers banner wall at dusk", w: 810, h: 1080 },
  { src: "restaurant-exterior-table", alt: "Street-side table outside the restaurant window", w: 810, h: 1080 },
  { src: "restaurant-interior-wide", alt: "The restaurant dining room set for supper", w: 1080, h: 810 },
  { src: "restaurant-interior-counter", alt: "Inside Big Brothers Restaurant: counter, tables and drinks fridge", w: 1080, h: 810 },
  { src: "restaurant-interior-evening", alt: "Evening light inside the restaurant with tables set", w: 1080, h: 810 },
  { src: "restaurant-interior-fridges", alt: "The restaurant counter with display fridges", w: 1080, h: 810 },
  { src: "restaurant-bar-corner", alt: "The restaurant bar corner with the wooden back bar", w: 1080, h: 810 },
  { src: "restaurant-bar-taps", alt: "The wooden bar with beer taps and high tables", w: 1080, h: 810 },
  { src: "restaurant-bar-sign", alt: "The Big Brothers Restaurant sign above the bar counter", w: 1080, h: 810 },
];

export const PLATES: Photo[] = [
  { src: "dish-samoosa", alt: "Golden samoosas with sauce and salad on a plate", w: 900, h: 675 },
  { src: "dish-matangara", alt: "Matangara tripe in tomato gravy served with pap", w: 900, h: 675 },
  { src: "dish-feast", alt: "Family feast platter with pap, chicken and salads", w: 900, h: 675 },
  { src: "dish-braise", alt: "Slow braised meat with peppers and pap", w: 900, h: 675 },
  { src: "dish-steak", alt: "T-bone steak with chips and vegetables", w: 900, h: 675 },
  { src: "dish-pizza", alt: "Freshly baked pizza from the oven", w: 900, h: 675 },
  { src: "dish-wings", alt: "Grilled chicken wings with lemon and tomato", w: 900, h: 675 },
  { src: "dish-fish", alt: "Crumbed fish fillet with rice and sauce", w: 900, h: 675 },
  { src: "dish-schnitzel", alt: "Crumbed schnitzel with mash and creamy sauce", w: 900, h: 675 },
  { src: "tray-breakfast-eggs-sausage", alt: "Breakfast tray with eggs, sausage and toast", w: 900, h: 675 },
  { src: "platter-breakfast-mushrooms", alt: "Breakfast platter with eggs, mushrooms and toast", w: 900, h: 675 },
  { src: "breakfast-eggs-beans", alt: "Full breakfast with fried eggs, beans, cheese, toast and mushrooms", w: 900, h: 675 },
  { src: "tray-ribs-chips", alt: "Ribs and chips on a black tray", w: 900, h: 675 },
  { src: "platter-wings-chips", alt: "Chicken wings and chips with lemon", w: 900, h: 675 },
  { src: "hero-wings", alt: "Grilled wings with lemon, tomato and lettuce on a black platter", w: 900, h: 675 },
  { src: "platter-chicken-onions", alt: "Carved chicken with onion rings on a platter", w: 900, h: 675 },
  { src: "hero-platter", alt: "Chicken platter with pap, relish and pepper rings", w: 900, h: 675 },
  { src: "platter-fish-eggs-salads", alt: "Whole fish platter with eggs, rice and salads", w: 900, h: 675 },
  { src: "plate-steak-chips-salad", alt: "Steak, chips and salad on a Big Brothers plate", w: 900, h: 675 },
  { src: "plate-grilled-chicken", alt: "Grilled chicken with salad and lemon", w: 900, h: 675 },
  { src: "plate-steak-onion-rings", alt: "Steak topped with onion rings", w: 900, h: 675 },
  { src: "plate-steak-chips-peppers", alt: "Steak and chips with grilled peppers", w: 900, h: 675 },
  { src: "plate-chicken-rice-salad", alt: "Chicken pieces with rice and greek salad", w: 900, h: 675 },
  { src: "plate-pap-spinach", alt: "Pap and spinach served the traditional way", w: 900, h: 675 },
  { src: "plate-yellow-rice-curry", alt: "Yellow rice with spinach and beef curry, cucumber on the side", w: 900, h: 675 },
  { src: "plate-pap-braise", alt: "Pap with braised meat topped with onion rings", w: 900, h: 675 },
  { src: "plate-french-toast", alt: "French toast triangles with tomato and cucumber", w: 900, h: 675 },
  { src: "pancake-wedges-cinnamon", alt: "Pancake cut in wedges with cinnamon sugar", w: 900, h: 675 },
  { src: "pancake-stuffed-plate", alt: "Stuffed pancake on a white plate", w: 900, h: 675 },
  { src: "pancakes-stuffed-two", alt: "Two stuffed pancakes on a plate", w: 900, h: 675 },
  { src: "omelette-toast-plate", alt: "Omelette with buttered toast triangles", w: 900, h: 675 },
  { src: "mini-pancakes-paddle", alt: "Three mini pancakes on a paddle board", w: 900, h: 675 },
  { src: "pancake-paddles-grey-table", alt: "Three mini pancakes on wooden paddles", w: 900, h: 675 },
  { src: "cocktail-blue", alt: "Blue cocktail from the bar", w: 900, h: 675 },
  { src: "cocktail-sunrise", alt: "Sunset cocktail in a tall glass", w: 900, h: 675 },
  { src: "cocktail-blue-goblet", alt: "Blue cocktail in a balloon glass", w: 900, h: 675 },
  { src: "cocktail-orange-leaf", alt: "Orange cocktail with a fresh leaf", w: 900, h: 675 },
  { src: "drink-lemon-ice", alt: "Lemon cooler with ice on the table", w: 900, h: 675 },
];

export const ALL: Photo[] = [...PLACES, ...PLATES];

/* Shared masonry grid + lightbox. The gallery page and the inline gallery
 * fold on /restaurant both render from the same photo lists, so a photo can
 * never go missing from one of them. */
export function RestaurantPhotoGrid({
  photos,
  offset,
  onOpen,
}: {
  photos: Photo[];
  offset: number;
  onOpen: (index: number) => void;
}) {
  return (
    <ul className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
      {photos.map((p, i) => (
        <li key={p.src} className="break-inside-avoid">
          <QuietFade delay={(i % 3) * 0.05}>
            <button
              onClick={() => onOpen(offset + i)}
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
  );
}

export function RestaurantPhotoLightbox({
  index,
  onClose,
  onNav,
}: {
  index: number;
  onClose: () => void;
  onNav: (next: number) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center bg-ink/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={ALL[index].alt}
      onClick={onClose}
    >
      <button
        className="absolute right-4 top-4 rounded-full border border-paper/30 px-4 py-2 text-paper transition-colors hover:bg-paper/10"
        onClick={onClose}
        aria-label="Close photo"
      >
        Close
      </button>
      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-paper/30 px-4 py-3 text-paper transition-colors hover:bg-paper/10"
        onClick={(e) => {
          e.stopPropagation();
          onNav((index - 1 + ALL.length) % ALL.length);
        }}
        aria-label="Previous photo"
      >
        ←
      </button>
      <figure className="pop-in max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <Image
          src={`/images/${ALL[index].src}.jpg`}
          alt={ALL[index].alt}
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
          onNav((index + 1) % ALL.length);
        }}
        aria-label="Next photo"
      >
        →
      </button>
    </div>
  );
}

/* Keyboard + scroll-lock plumbing shared by both gallery embeds. */
export function useRestaurantLightbox() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (open !== null && e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % ALL.length));
      if (open !== null && e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + ALL.length) % ALL.length));
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

  return { open, setOpen };
}

export function RestaurantGallery() {
  const { open, setOpen } = useRestaurantLightbox();

  const grid = (photos: Photo[], offset: number) => (
    <RestaurantPhotoGrid photos={photos} offset={offset} onOpen={(i) => setOpen(i)} />
  );

  return (
    <>
      <section className="bg-cream" aria-label="Restaurant gallery">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <h1 className="hero-rise max-w-[20ch] font-display text-[clamp(2.2rem,4.6vw,3.9rem)] font-semibold leading-[1.07] tracking-[-0.02em]">
            The place in town, and the plates it serves.
          </h1>
          <p className="hero-rise mt-4 max-w-xl text-lg text-mut" style={{ "--i": 1 } as React.CSSProperties}>
            Real photos of Big Brothers Restaurant in Usakos town centre: the dining room and bar, then the food. Tap any photo to see it larger.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4 md:px-6" aria-label="The restaurant">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] md:text-3xl">The place</h2>
        <p className="mt-2 max-w-xl text-mut">Corner of Theo-Ben Gurirab and Bismarck: the dining room, the bar and the banner wall outside.</p>
        <div className="mt-6">{grid(PLACES, 0)}</div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:px-6" aria-label="Plates and drinks">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] md:text-3xl">Plates & drinks</h2>
        <p className="mt-2 max-w-xl text-mut">Every price for these dishes is on the menu page.</p>
        <div className="mt-6">{grid(PLATES, PLACES.length)}</div>
      </section>

      {open !== null && (
        <RestaurantPhotoLightbox index={open} onClose={() => setOpen(null)} onNav={(i) => setOpen(i)} />
      )}
    </>
  );
}

/* Inline gallery fold for the restaurant page itself: every photo the
 * restaurant owns, on the page, with the same lightbox as the gallery page. */
export function RestaurantGalleryInline() {
  const { open, setOpen } = useRestaurantLightbox();

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.01em] md:text-4xl">
              The gallery: our place and our plates.
            </h2>
            <p className="mt-3 max-w-xl text-mut">
              All {ALL.length} photos, straight from Big Brothers Restaurant: the dining room and bar,
              the corner we sit on in town, and the plates and drinks we serve. Tap any photo to see it larger.
            </p>
          </div>
          <Link
            href="/restaurant/gallery"
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-lime hover:text-ink"
          >
            Open the full gallery
          </Link>
        </div>
        <div className="mt-8">
          <RestaurantPhotoGrid photos={PLACES} offset={0} onOpen={(i) => setOpen(i)} />
          <h3 className="mb-4 mt-10 font-display text-2xl font-semibold tracking-[-0.01em]">Plates &amp; drinks</h3>
          <RestaurantPhotoGrid photos={PLATES} offset={PLACES.length} onOpen={(i) => setOpen(i)} />
        </div>
      </div>
      {open !== null && (
        <RestaurantPhotoLightbox index={open} onClose={() => setOpen(null)} onNav={(i) => setOpen(i)} />
      )}
    </>
  );
}
