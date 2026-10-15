import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { ROUTES } from "@/lib/routes";

const title = "Brand Book | Big Brother Guesthouse, Usakos";
const description =
  "The Big Brother Holdings brand system: colours sampled from our own logos, the Fraunces and Outfit type pairing, and how our marks may be used.";

export const metadata = pageMetadata({ title, description, path: "/brand" });

const COLORS = [
  { name: "Ink", hex: "#1B1712", use: "Headings, dark grounds, footer", cls: "bg-ink", light: false },
  { name: "Paper", hex: "#FAF5EC", use: "Page background", cls: "bg-paper", light: true },
  { name: "Cream", hex: "#F3EADA", use: "Alternate sections, menu paper", cls: "bg-cream", light: true },
  { name: "Sand", hex: "#E7DCC6", use: "Borders, texture dots", cls: "bg-sand", light: true },
  { name: "Leaf", hex: "#8CC63F", use: "Restaurant logo lime, CTAs", cls: "bg-leaf", light: true },
  { name: "Leaf Deep", hex: "#5F8F23", use: "Accessible green for text on paper", cls: "bg-leaf-deep", light: true },
  { name: "Ember", hex: "#EE7203", use: "Guesthouse logo orange, primary CTA", cls: "bg-ember", light: true },
  { name: "Ember Deep", hex: "#C25A02", use: "Prices and links, AA contrast", cls: "bg-ember-deep", light: true },
];

export default function BrandPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight md:text-6xl">
            How Big Brother looks, in plain terms.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mut">
            This page documents the design system of this website so any designer, printer, or developer who works
            with Big Brother Holdings keeps everything consistent. The colours here were sampled directly from the
            two company logos, and the typefaces are the ones this site is built on.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20" aria-label="Colour palette">
        <h2 className="font-display text-3xl font-semibold">Colours</h2>
        <p className="mt-3 max-w-2xl text-mut">
          Two families carry the brand: the leaf green of Big Brothers Restaurant and the ember orange of Big
          Brother Guesthouse, both sitting on a warm charcoal and paper ground. Every pair used for text meets WCAG
          AA contrast.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COLORS.map((c) => (
            <li key={c.hex} className="overflow-hidden rounded-2xl border border-line bg-white">
              <div className={`h-20 w-full ${c.cls}`} aria-hidden="true" />
              <div className="p-4 text-sm">
                <p className="font-display text-base font-semibold">{c.name}</p>
                <p className="mt-0.5 font-mono text-xs uppercase tracking-wider text-mut">{c.hex}</p>
                <p className="mt-2 text-mut">{c.use}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-ink py-14 text-paper md:py-20" aria-label="Typography">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-3xl font-semibold">Typography</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-paper/15 p-7">
              <p className="text-xs uppercase tracking-[0.18em] text-leaf">Display</p>
              <p className="mt-3 font-display text-4xl font-semibold">Fraunces</p>
              <p className="mt-3 text-sm leading-relaxed text-paper/75">
                A warm serif used for headings and prices. Weights 600 and 700, roman only. It echoes the
                hand-painted character of the restaurant badge without copying it.
              </p>
              <p className="mt-4 font-display text-2xl">Kapana with pap, N$120.</p>
            </div>
            <div className="rounded-3xl border border-paper/15 p-7">
              <p className="text-xs uppercase tracking-[0.18em] text-leaf">Body</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-body)" }}>Outfit</p>
              <p className="mt-3 text-sm leading-relaxed text-paper/75">
                A geometric sans for paragraphs, menus, buttons and forms. Weights 400 to 600. Maximum two font
                families are used across the whole site, both loaded with font-display swap.
              </p>
              <p className="mt-4">Find us on the B2 at Plot 7, Laaste Begin, Usakos South.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20" aria-label="Logo rules">
        <h2 className="font-display text-3xl font-semibold">Logo rules</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white p-7">
            <p className="font-display text-lg font-semibold">The only marks we use</p>
            <p className="mt-4 text-sm leading-relaxed text-mut">
              The Big Brother Guesthouse logo carries the name and the tagline, so it stands in every header and
              footer. There is no separate monogram: the real logo is always the mark, at every size the favicon
              aside, which uses the simplified BB icon.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white p-7">
            <p className="font-display text-lg font-semibold">The real logos</p>
            <p className="mt-4 text-sm leading-relaxed text-mut">
              Big Brothers Restaurant badge (est. 2023) and the Big Brother Guesthouse logo are used exactly as the
              company supplied them. They are never redrawn, recoloured, stretched, or traced.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white p-7">
            <p className="font-display text-lg font-semibold">Clear space and grounds</p>
            <p className="mt-4 text-sm leading-relaxed text-mut">
              Logos sit on ink, paper, or their own brand colour. Nothing is placed inside the clear space around
              the mark, and the badge is never placed on a busy photo without a solid plate behind it.
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {ROUTES.filter((r) => r.key !== "home").map((r) => (
            <Link
              key={r.key}
              href={r.path}
              className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:bg-cream"
            >
              {r.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
