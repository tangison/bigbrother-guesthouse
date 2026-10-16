"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { MenuSection } from "@/lib/menu-data";
import { nads } from "@/lib/menu-data";

/* MenuBook · one catalogue renderer, two menus. The guesthouse menu
 * (/menu, the printed QR target) and the restaurant menu
 * (/restaurant/menu) are different price lists; both render here
 * from their JSON source. Prices set in tabular figures, ink on
 * cream, straight from the printed menus. Sections arrive as props
 * from the server page, so nothing is hardcoded. */

export type MenuBookContact = {
  tel: string;
  telDisplay: string;
  whatsapp: string;
  whatsappText: string;
  ctaHref: string;
  ctaLabel: string;
};

export type MenuBookProps = {
  brand: "guesthouse" | "restaurant";
  sections: MenuSection[];
  heroTitle: string;
  heroCopy: string;
  heroImage: string;
  photoBand: { src: string; alt: string }[];
  contact: MenuBookContact;
  /* The other kitchen's menu: slim interlink banner above the list. */
  crossMenu: { href: string; label: string; note: string };
  closing: { title: string; line: string };
};

export function MenuBook({
  brand,
  sections,
  heroTitle,
  heroCopy,
  heroImage,
  photoBand,
  contact,
  crossMenu,
  closing,
}: MenuBookProps) {
  const [active, setActive] = useState(sections[0].id);

  // Scroll spy for the category rail
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.replace("sec-", ""));
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    const timer = setTimeout(() => {
      sections.forEach((s) => {
        const el = document.getElementById(`sec-${s.id}`);
        if (el) obs.observe(el);
      });
    }, 300);
    return () => {
      clearTimeout(timer);
      obs.disconnect();
    };
  }, [sections]);

  const isEat = brand === "restaurant";

  return (
    <>
      {/* Fold: full-bleed kitchen photo, two actions */}
      <section className="relative overflow-hidden bg-ink text-paper" aria-label="Menu">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            quality={50}
            sizes="100vw"
            className="scale-105 object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,oklch(18%_0.008_70/0.55)_0%,oklch(18%_0.008_70/0.4)_50%,oklch(18%_0.008_70/0.85)_100%)]"
        />
        <div className="relative mx-auto flex min-h-[64svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-20">
          <h1 className="hero-rise max-w-3xl font-display text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[1.06] tracking-[-0.02em]">
            {heroTitle}
          </h1>
          <p className="hero-rise mt-4 max-w-2xl text-lg leading-relaxed text-paper/85" style={{ "--i": 1 } as React.CSSProperties}>
            {heroCopy}
          </p>
          <div className="hero-rise mt-7 flex flex-wrap items-center gap-3" style={{ "--i": 2 } as React.CSSProperties}>
            <Link
              href={contact.ctaHref}
              className="rounded-full bg-paper px-6 py-3 font-semibold text-ink transition-colors hover:bg-lime"
            >
              {contact.ctaLabel}
            </Link>
            <a
              href={`tel:${contact.tel}`}
              className="rounded-full border border-paper/40 px-6 py-3 font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              Call {contact.telDisplay}
            </a>
            <a
              href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappText)}`}
              rel="noopener"
              className="text-sm font-semibold text-paper/85 underline decoration-paper/40 underline-offset-4 hover:text-paper"
            >
              Share this menu on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Photo band: three real plates from this kitchen. No captions. */}
      <section aria-label="From our kitchen" className="bg-ink pb-16 md:pb-20">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-3 md:px-6">
          {photoBand.map((p, i) => (
            <div key={p.src} className="photo-frame aspect-[4/3]" data-sc-in data-sc-stagger="70">
              <Image
                src={p.src}
                alt={p.alt}
                width={900}
                height={675}
                loading={i === 0 ? "eager" : "lazy"}
                quality={45}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Two kitchens, two menus: point lost scanners at the right list */}
      <div className="border-b border-line bg-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm md:px-6">
          <p className="text-mut">{crossMenu.note}</p>
          <Link
            href={crossMenu.href}
            className="font-semibold underline decoration-ember decoration-2 underline-offset-4 hover:text-ember-deep"
          >
            {crossMenu.label}
          </Link>
        </div>
      </div>

      <div className="menu-paper" id="menu-top">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[220px_1fr] md:px-6 md:py-16">
          {/* Category rail: sticks while the list runs */}
          <aside className="min-w-0 md:sticky md:top-24 md:h-fit" aria-label="Menu categories">
            <nav className="rail flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible" aria-label="Jump to menu section">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#sec-${s.id}`}
                  aria-current={active === s.id ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`sec-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`shrink-0 border-b-2 px-1 py-2 text-sm font-medium transition-colors md:border-b-0 md:border-l-2 md:pl-3 ${
                    active === s.id
                      ? "border-ember text-ink"
                      : "border-transparent text-mut hover:text-ink"
                  }`}
                >
                  {s.title}
                </a>
              ))}
            </nav>
            <div className="mt-5 hidden border border-line bg-paper p-4 text-sm md:block">
              <p className="font-semibold">{isEat ? "Eating in a group?" : "Staying with us?"}</p>
              <p className="mt-1 text-mut">
                {isEat
                  ? "Call the kitchen ahead of time and we will prepare for your group."
                  : "Residents eat from this menu at the plot, and day visitors order from it too."}
              </p>
              <a href={`tel:${contact.tel}`} className="mt-2 inline-block font-semibold underline decoration-ember decoration-2 underline-offset-4">
                {contact.telDisplay}
              </a>
            </div>
          </aside>

          {/* Sections: printed-menu typography, tabular prices */}
          <div className="grid gap-12">
            {sections.map((s) => (
              <section key={s.id} id={`sec-${s.id}`} className="scroll-mt-28" aria-label={s.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-3">
                  <h2 className="font-display text-2xl font-semibold md:text-3xl">{s.title}</h2>
                  {s.kicker && <p className="text-xs font-medium uppercase tracking-wider text-mut">{s.kicker}</p>}
                </div>
                <ul className="mt-2 grid gap-x-10 md:grid-cols-2">
                  {s.items.map((it) => (
                    <li key={it.name} className="flex items-baseline justify-between gap-4 border-b border-line/70 py-3">
                      <span className="min-w-0">
                        <span className="font-medium">{it.name}</span>
                        {it.note && <span className="mt-0.5 block text-xs leading-snug text-mut">{it.note}</span>}
                      </span>
                      <span className="shrink-0 font-display text-lg font-semibold tabular-nums">
                        {nads(it.price)}
                      </span>
                    </li>
                  ))}
                </ul>
                {s.foot && <p className="mt-3 text-sm text-mut">{s.foot}</p>}
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Closing band */}
      <section className="bg-ink py-16 text-paper md:py-20" aria-label={isEat ? "Reserve" : "Book"}>
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">{closing.title}</h2>
          <p className="mt-3 text-sm text-paper/75">{closing.line}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href={contact.ctaHref} className="rounded-full bg-paper px-6 py-3 font-semibold text-ink transition-colors hover:bg-lime">
              {contact.ctaLabel}
            </Link>
            <a href={`tel:${contact.tel}`} className="rounded-full border border-paper/40 px-6 py-3 font-semibold text-paper transition-colors hover:bg-paper/10">
              Call {contact.telDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
