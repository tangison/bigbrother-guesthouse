"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { MENU, nads } from "@/lib/menu-data";
import { Reveal } from "./reveal";
import { BIZ, wa } from "@/lib/site-data";

export function MenuView() {
  const [active, setActive] = useState(MENU[0].id);

  // Scroll spy for the category rail
  useMemo(() => {
    if (typeof window === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.replace("sec-", ""));
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    setTimeout(() => {
      MENU.forEach((s) => {
        const el = document.getElementById(`sec-${s.id}`);
        if (el) obs.observe(el);
      });
    }, 300);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Peak section: full-bleed moment. Source of all prices: client A3 menu v3 PDF. */}
      <section className="relative overflow-hidden bg-ink text-paper" aria-label="Menu">
        <div className="hero-bg absolute inset-0 opacity-[0.18]" aria-hidden="true">
          <Image src="/images/dish-feast.jpg" alt="" fill priority quality={25} sizes="100vw" className="object-cover" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center md:px-6 md:py-24">
          <Reveal family="scale">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-leaf">Big Brothers Restaurant · Est. 2023</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">
              Good food, great vibes.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-paper/80">
              Every price below comes from our own printed menu. Breakfast from 07:00, the grill fires through
              dinner, and the bar stays cold.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="menu-paper" id="menu-top">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[220px_1fr] md:px-6 md:py-16">
          {/* Category rail */}
          <aside className="min-w-0 md:sticky md:top-24 md:h-fit" aria-label="Menu categories">
            <nav className="rail flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible">
              {MENU.map((s) => (
                <a
                  key={s.id}
                  href={`#sec-${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`sec-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors md:rounded-xl ${
                    active === s.id ? "bg-ink text-paper" : "bg-white text-ink hover:bg-sand/70"
                  }`}
                >
                  {s.title}
                </a>
              ))}
            </nav>
            <div className="mt-4 hidden rounded-2xl border border-line bg-white p-4 text-sm md:block">
              <p className="font-semibold">Eating in a group?</p>
              <p className="mt-1 text-mut">Call the kitchen ahead of time and we will prepare for your group.</p>
              <a href={`tel:${BIZ.restaurant.phone}`} className="mt-2 inline-block font-semibold text-ember-deep">
                {BIZ.restaurant.phoneDisplay}
              </a>
            </div>
          </aside>

          {/* Sections */}
          <div className="grid gap-10">
            {MENU.map((s) => (
              <section key={s.id} id={`sec-${s.id}`} className="scroll-mt-28" aria-label={s.title}>
                <Reveal family="wipe">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-3">
                    <h2 className="font-display text-2xl font-semibold md:text-3xl">{s.title}</h2>
                    {s.kicker && <p className="text-xs font-medium uppercase tracking-wider text-mut">{s.kicker}</p>}
                  </div>
                </Reveal>
                <ul className="mt-4 grid gap-x-10 md:grid-cols-2">
                  {s.items.map((it, i) => (
                    <Reveal as="li" key={it.name} family="rise" index={i % 6} className="flex items-baseline justify-between gap-4 border-b border-line/70 py-3">
                      <span className="min-w-0">
                        <span className="font-medium">{it.name}</span>
                        {it.note && <span className="mt-0.5 block text-xs leading-snug text-mut">{it.note}</span>}
                      </span>
                      <span className="shrink-0 font-display text-lg font-semibold tabular-nums text-ember-deep">
                        {nads(it.price)}
                      </span>
                    </Reveal>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Closing band */}
      <section className="bg-ink-soft py-14 text-center text-paper" aria-label="Order">
        <Reveal family="rise">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">Hungry now? We are on the B2.</h2>
          <p className="mt-2 text-sm text-paper/75">Plot 7, Laaste Begin, Usakos South, opposite the Shell station.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={`tel:${BIZ.restaurant.phone}`} className="rounded-full bg-ember px-6 py-3 font-semibold text-white">
              Call {BIZ.restaurant.phoneDisplay}
            </a>
            <a
              href={wa(BIZ.restaurant.whatsapp, "Hello Big Brothers Restaurant, I would like to order.")}
              className="rounded-full bg-leaf px-6 py-3 font-semibold text-ink"
            >
              WhatsApp your order
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
