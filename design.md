# Design — Big Brother Holdings (Guesthouse, B&B, Restaurant, Usakos)

A locked design system for this app, produced by the hallmark redesign flow (multi-page).
Every page reads this file before emitting code. Do not regenerate per page; extend or
amend this file when the system needs to grow.

## Genre
Editorial, photo-led hospitality. The photographs carry the pages; type stays quiet.

## Macrostructure family
- Marketing pages (home): **Photographic** (full-bleed photo folds, corner captions, narrow text bands, typographic links)
- Product pages (restaurant, guesthouse, facilities): **Photographic folds + Feature Stack** (sticky pane beside scrolling media; stacking cards on facilities)
- Content pages (menu): **Catalogue-style list** with sticky category rail, tabular prices
- Trust/legal pages (brand, privacy, terms, 404, 500): **Long Document** rhythm, typography only

## Theme (custom, anchored on the client's two real logos)
Anchor hue: warm orange (ember, hue 47) from the Big Brother Guesthouse logo.
Second accent: leaf green (hue 130) from the Big Brothers Restaurant badge, used only in
restaurant contexts and on dark ink surfaces. Neutrals tinted warm.

- `--color-paper`      oklch(97% 0.013 90)    warm cream
- `--color-cream`      oklch(93.5% 0.02 90)
- `--color-sand`       oklch(88% 0.025 90)
- `--color-line`       oklch(84% 0.022 90)    hairline rules
- `--color-mut`        oklch(47% 0.018 80)    muted text, 6.2:1 on paper
- `--color-ink`        oklch(18% 0.008 70)    warm near-black, never #000
- `--color-ink-soft`   oklch(23% 0.012 70)
- `--color-ember`      oklch(70% 0.185 47)    guesthouse logo orange (marks, underlines, dark-ground text)
- `--color-ember-deep` oklch(58% 0.165 45)    AA-safe orange on light ground
- `--color-leaf`       oklch(76% 0.17 130)    restaurant badge green (dark ground + restaurant moments)
- `--color-leaf-deep`  oklch(57% 0.135 130)
- `--color-focus`      ember-deep

Accent discipline: ember occupies under 5 percent of any viewport. No giant orange fills.
Primary buttons are ink-on-paper or paper-on-ink. Orange signals, it does not flood.

## Typography (2+1 rule, two families used)
- Display: Fraunces 600/700, roman only (no italic headers), tracking -0.02em
- Body: Outfit 400/500/600 (replaces banned Inter)
- Outlier: none
- Scale: 1.25 major third, display clamp(2.75rem, 5vw + 1rem, 5.25rem)
- Hero headlines: 50 characters or fewer, max-w-5xl, 2 lines
- Prices: tabular-nums
- font-display: swap via fontsource, latin subset

## Spacing
4-point named scale in tokens: 3xs 2 / 2xs 4 / xs 8 / sm 12 / md 16 / lg 24 / xl 40 /
2xl 64 / 3xl 96. Major sections breathe at py-16 to py-24 or larger. Named tokens only.

## Motion (framer-motion, reduced-motion aware)
- Easings: --ease-out cubic-bezier(0.16,1,0.3,1); --ease-in cubic-bezier(0.7,0,0.84,0); --ease-in-out cubic-bezier(0.65,0,0.35,1)
- Durations: micro 120ms, short 220ms, long 420ms; nav morph 520ms on --ease-out
- One orchestrated entrance per page (hero). Below the fold content is static unless it teaches something.
- Devices in use, at most one per section: hero load rise, scroll-scrubbed word reveal
  (home kitchen band), sticky media stack (home stop-over, guesthouse), card stacking
  (facilities), hover scale inside overflow-hidden (all photography)
- Reduced motion: everything collapses to opacity-only, 150ms

## Microinteractions stance
- Silent success; no celebratory toasts
- Hover: one signal per element (colour shift or 1px translate or underline thicken)
- Focus rings appear instantly, never animated, 3px ember-deep outline
- transition properties named explicitly; transition-all banned

## CTA voice
- Primary: ink fill, paper text, rounded-full, verb first ("See the menu", "Book on WhatsApp")
- On dark: paper fill, ink text
- Secondary: hairline outline, same shape
- Typographic links: underline, offset 4px, thicken on hover, arrow where spatial

## Per-page allowances
- Marketing and product pages may use full-bleed real photography
- Legal pages: typography only, no enrichment
- The two client logo JPGs are the only brand marks. Never redraw them.

## What pages MUST share
- The real Big Brother Guesthouse logo in the nav (white chip, blends with white nav bar)
- The real Big Brothers Restaurant badge on restaurant and menu surfaces
- The accent colour and its placement discipline
- Fraunces + Outfit pairing, CTA voice, footer statement, Tangison Studio credit

## What pages MAY differ on
- Hero archetype within the Photographic family (centred cinematic vs left-biased fold)
- Which scroll device the desire section uses (sticky stack, stacking cards, scrub text)

## Hallmark state
genre: editorial · macrostructure: Photographic · theme: custom (Khan River warm, ember hue 47)
nav: N10 floating-on-scroll morph · footer: Ft5 Statement · enrichment: real client photography only
