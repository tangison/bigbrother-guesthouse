"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

/* Dish carousel on embla. Arrows, drag and swipe, keyboard reachable.
 * Every plate and every price comes from the client's own photos and printed
 * A3 menu (v3). Wheel prices stay untouched. */

const DISHES = [
  { src: "/images/dish-traditional.jpg", alt: "Pap with matangara and spinach", cap: "Matangara & pap", price: "N$120" },
  { src: "/images/dish-steak.jpg", alt: "T-bone steak with chips and vegetables", cap: "T-bone & chips", price: "N$230" },
  { src: "/images/dish-pizza.jpg", alt: "Freshly baked pizza from the Big Brothers oven", cap: "Pizza", price: "from N$190" },
  { src: "/images/dish-wings.jpg", alt: "Grilled chicken wings with lemon and tomato", cap: "Chicken wings", price: "from N$80" },
  { src: "/images/dish-fish.jpg", alt: "Crumbed fish fillet with rice and sauce", cap: "Hake fillet", price: "N$100" },
  { src: "/images/dish-schnitzel.jpg", alt: "Crumbed schnitzel with mash and creamy sauce", cap: "Schnitzel & cheddarmelt", price: "N$150" },
  { src: "/images/dish-english.jpg", alt: "English breakfast with eggs, steak and onions", cap: "English breakfast", price: "N$130" },
  { src: "/images/cocktail-sunrise.jpg", alt: "Tequila sunrise in a tall glass", cap: "Tequila sunrise", price: "N$100" },
];

export function DishCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start", dragFree: false });

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {DISHES.map((d) => (
            <figure key={d.src} className="min-w-0 shrink-0 grow-0 basis-[78%] pr-4 sm:basis-[46%] md:basis-[31%] lg:basis-[24%]">
              <div className="photo-frame aspect-[4/3]">
                <Image
                  src={d.src}
                  alt={d.alt}
                  width={900}
                  height={675}
                  loading="lazy"
                  quality={55}
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 24vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-2.5 flex items-baseline justify-between gap-2 text-sm">
                <span className="font-medium">{d.cap}</span>
                <span className="font-display font-semibold tabular-nums text-ember-deep">{d.price}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end">
        <div className="flex items-center gap-2">
          <button
            onClick={() => embla?.scrollPrev()}
            aria-label="Previous dishes"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-paper transition-colors hover:bg-sand active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => embla?.scrollNext()}
            aria-label="More dishes"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-paper transition-colors hover:bg-sand active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
