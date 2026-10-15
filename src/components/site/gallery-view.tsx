"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { QuietFade } from "./motion";
import { GALLERY, GROUP_LABELS, type GalleryGroup, type GalleryPhoto } from "@/lib/gallery-data";

/* Guesthouse gallery: every photo the owner supplied, grouped. Rooms and
 * grounds at Plot 7 only; restaurant plates live in the restaurant's own
 * gallery, because the two businesses sit at different locations. Alt text
 * describes what is visible and invents nothing. Lightbox: tap, arrows,
 * keyboard, escape. */

const ORDER: GalleryGroup[] = ["rooms", "grounds", "pools", "events", "restaurant", "animals", "crew", "night"];

export function GalleryView() {
  const [open, setOpen] = useState<number | null>(null);
  // flat index across all groups for the lightbox ordering
  const flat: GalleryPhoto[] = ORDER.flatMap((g) => GALLERY.filter((p) => p.group === g));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (open !== null && e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % flat.length));
      if (open !== null && e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + flat.length) % flat.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, flat.length]);

  useEffect(() => {
    document.body.style.overflow = open !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + flat.length) % flat.length)),
    [flat.length],
  );

  return (
    <>
      <section className="bg-cream" aria-label="Gallery">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <h1 className="hero-rise max-w-[22ch] font-display text-[clamp(2.2rem,4.6vw,3.9rem)] font-semibold leading-[1.07] tracking-[-0.02em]">
            Every photo we have. All ours, all real.
          </h1>
          <p className="hero-rise mt-4 max-w-xl text-lg text-mut" style={{ "--i": 1 } as React.CSSProperties}>
            {flat.length} photographs of Big Brother Guesthouse at Plot 7, taken by us: the rooms, the grounds, the
            pools, the animals, the people and the plot after dark. Tap any photo to see it larger.
          </p>
        </div>
      </section>

      {ORDER.map((group) => {
        const photos = GALLERY.filter((p) => p.group === group);
        if (photos.length === 0) return null;
        return (
          <section key={group} className="mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-20" aria-label={GROUP_LABELS[group]}>
            <h2 className="flex items-baseline gap-3 font-display text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
              {GROUP_LABELS[group]}
              <span className="font-body text-sm font-medium text-mut">{photos.length}</span>
            </h2>
            <ul className="mt-6 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
              {photos.map((p) => {
                const i = flat.indexOf(p);
                return (
                  <li key={p.slug} className="break-inside-avoid">
                    <QuietFade delay={(i % 3) * 0.05}>
                      <button
                        onClick={() => setOpen(i)}
                        className="photo-frame group block w-full border border-line"
                        aria-label={`View photo: ${p.alt}`}
                      >
                        <Image
                          src={`/images/${p.slug}.jpg`}
                          alt={p.alt}
                          width={p.w}
                          height={p.h}
                          loading="lazy"
                          quality={45}
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="h-auto w-full object-cover"
                        />
                      </button>
                    </QuietFade>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      {open !== null && (
        <div
          className="fixed inset-0 z-[400] flex items-center justify-center bg-ink/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={flat[open].alt}
          onClick={close}
        >
          <button
            className="absolute right-4 top-4 rounded-full border border-paper/30 px-4 py-2 text-paper transition-colors hover:bg-paper/10"
            onClick={close}
            aria-label="Close photo"
          >
            Close
          </button>
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-paper/30 px-4 py-3 text-paper transition-colors hover:bg-paper/10"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
          >
            &larr;
          </button>
          <figure className="pop-in max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={`/images/${flat[open].slug}.jpg`}
              alt={flat[open].alt}
              width={flat[open].w}
              height={flat[open].h}
              className="max-h-[80vh] w-auto object-contain"
              priority
            />
          </figure>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-paper/30 px-4 py-3 text-paper transition-colors hover:bg-paper/10"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
          >
            &rarr;
          </button>
        </div>
      )}
    </>
  );
}
