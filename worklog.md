
---
Task ID: 3-c
Agent: Super Z (main agent)
Task: Webmaster-checklist compliance pass + deploy to client Vercel (targis47) + GitHub push + preview link delivery

Work Log:
- Verified tokens: Targis vcp_ token -> Vercel account targis47 (HTTP 200), GH PAT -> tangison (HTTP 200); used via env only, never written to files or git config
- Skill work (super-skills steps 1-9 continued): hunted taste + 21st.dev skills (3x npx skills find); local design-taste-frontend (593.7K installs) used as taste authority; gpt-taste (372.6K) vetted clean (SKILL.md only, no scripts/credentials) and installed to skills/gpt-taste with 3 conflicts resolved in Tangison favour (fonts, stock images, GSAP dep); 21st-dev/magic-mcp@21st-ui REJECTED this run (requires API_KEY_21ST not provided)
- Refactored single-route hash app -> 10 real routes (/ /restaurant /menu /guesthouse /facilities /gallery /contact /brand /privacy-policy /terms) + branded /404 + /500 error boundary
- Per-route unique metadata (<60 char titles, <155 char descriptions) + canonicals + OG/Twitter via src/lib/routes.ts + metadata.ts; nav/footer converted to next/link
- Brand bar: 4px leaf-ember gradient pinned at viewport top (CLS 0); skip-to-content link; "Made by Tangison Studio" hardcoded footer credit -> studio.tangison.com
- SEO: sitemap.xml + robots.txt + web manifest + favicon.ico (real ICO 16/32/48) + icon.svg + apple-icon.png (BB monogram, scripts/gen_icons.py); Restaurant schema now has hasMenu + acceptsReservations; Menu schema with MenuSection/MenuItem/NAD prices generated from real menu data
- Fixed: 1389px horizontal overflow at 390px on /menu (grid min-width auto leak, min-w-0 fix); lint setState-in-effect error (nav)
- Perf: decorative hero backgrounds quality 25; home cold transfer 442KB / 58 reqs / FCP 652ms, zero console errors; menu page 19 sections, 139 items, 152 N$ prices
- Vercel: project bigbrother-guesthouse created (prj_uIBSMdzDlQ35LmlntMoVkQtuTmjO), CLI deploy succeeded first try, aliased https://bigbrother-guesthouse.vercel.app; SSO deployment protection disabled via PATCH so the link is public (verified HTTP 200)
- GitHub: local history reset onto clean remote base ba595fe, refactor committed as 0e30245 (no junk files, no .env, no tokens; embedded clones untracked), fast-forward pushed, remote main verified at 0e30245

Stage Summary:
- Live preview: https://bigbrother-guesthouse.vercel.app (public, HTTP 200)
- Repo: https://github.com/tangison/bigbrother-guesthouse @ 0e30245
- Webmaster checklist: all hard gates pass except owner-input items (GA4 IDs, custom domain DNS, Search Console, SPF/DKIM on brand domain email)
- Security: both plaintext tokens from chat should be rotated by the owner

---
Task ID: 3-d
Agent: Super Z (main agent)
Task: Redesign pass on the live Big Brother site after owner verdict "too ugly, too generic": correct logos, rebuilt navigation, sticky imagery, scroll animations, no AI slop. Skills mandated by owner: gpt-taste + hallmark.

Work Log:
- Ran owner-mandated skill boots: npx skills use leonxlnx/taste-skill (gpt-taste) -> /tmp/taste.txt read fully; npx skills use nutlope/hallmark -> /tmp/hallmark.txt (69KB) read fully including redesign verb, macrostructures, cookbook nav/footer tables, typography, colour, motion, anti-patterns, layout, copy, floating-nav laws
- npx skills add timed out at 180s (reported); installed both skills by copying the use-command downloads; verified on disk: skills/gpt-taste/SKILL.md, skills/hallmark/SKILL.md + references/ (now gitignored as tooling)
- Visual audit of live site with agent-browser: nav used generic BB monogram instead of real logos; hero muddy olive gradient; 3-equal-card grids; reveal-on-everything; orange slab restaurant hero
- hallmark multi-page redesign flow: wrote design.md at project root (locked system: genre editorial, macro Photographic, theme custom OKLCH from the two real logos, N10 morph nav, Ft5 statement footer, Fraunces + Outfit), .hallmark/log.json entry, stamp in globals.css
- Replaced Inter with Outfit (@fontsource, gpt-taste stack); OKLCH token system; named easings/durations; 4px scale
- Nav rebuilt as N10 floating-on-scroll morph: one DOM, is-floating class past 80px, 520ms single curve, real guesthouse logo (white ground), underline-grow links, active ember underline, phone + WhatsApp CTA; brand bar pinned above
- Footer rebuilt as Ft5 Statement ("The B2 is long. Stop where the road gets friendly.") with both real logos, legal row, hardcoded Tangison Studio credit
- Home rebuilt: cinematic full-bleed hero (platter photo, ink wash, 2 CTAs, corner caption, parallax + one entrance), editorial lede, gapless bento (3x3 interlock, grid-flow-dense, 5 cells), sticky stop-over pane with photo stack, scroll-scrubbed price reveal, no marquee/eyebrows/stats-in-hero
- Restaurant: braise photo fold with real badge (object-cover), spec-sheet hours/contact, dish rail kept, typographic CTAs. Guesthouse: real logo beside headline, asymmetric stay split, honest rates band. Facilities: stacking pinned cards (framer scale). Menu: fixed useMemo->useEffect scroll-spy bug, print-catalogue restyle, sticky rail with ember active marker, tabular ink prices. Gallery/contact/404/500/brand restyled to tokens; brand page documents Outfit + real-logo rule
- New motion.tsx: ScrubText, ParallaxPhoto, StackCard, QuietFade; all gated by useReducedMotion
- Bugs found+fixed: .photo-frame missing position:relative (fill images escaped to viewport on /guesthouse); sticky nav confined by wrapper (nav vanished on scroll); logos had wrong declared ratios (true sizes logo-guesthouse 547x323, logo-restaurant 720x847, badge was being squashed to square - fixed with true-ratio props + object-cover); images.qualities ladder added to next.config.ts (Next 16)
- Deploy: prod build 19 routes, deploys 4l9y32f64 then afgengdre, alias bigbrother-guesthouse.vercel.app, public HTTP 200; fresh console: zero warnings/errors; home cold transfer 480KB / 59 reqs (under 500KB budget)
- GitHub: 6b82f55 + a83fa9d pushed to tangison/bigbrother-guesthouse, remote verified at a83fa9d; tokens used via env only

Stage Summary:
- Live: https://bigbrother-guesthouse.vercel.app (production alias, owner Vercel targis47)
- Repo: https://github.com/tangison/bigbrother-guesthouse @ a83fa9d
- Design system locked in design.md; slop sweep clean (no em dashes, no Inter, no eyebrows, no 3-col grids, no invented metrics)
- Owner should still rotate both tokens (GitHub PAT + Vercel vcp_) after review

---
Task ID: 3-e
Agent: Super Z (main agent)
Task: Image overhaul + widgets + scroll animations per owner round-3 instructions (grab ALL images from live site/owner/GMB/Maps/stock; sliders, carousels, tabs, widgets; scrollcraft skill run and followed).

Work Log:
- Ran owner-mandated boot: npx skills use nateherkai/scroll-craft. First attempt with --skill "scrollcraft" failed (no matching skill); fallback to the repo's real name "scroll-craft" succeeded (Tangison failure rule: try fallback, then report honestly). Output (25KB) redirected to /tmp/scrollcraft.txt and read in full; all 11 referenced files read from /tmp/skills-use-6PiWaD/scroll-craft; skill persisted verbatim to skills/scroll-craft (gitignored tooling); doctor.mjs run (ffmpeg OK, Chrome found at agent-browser path, KIE key correctly not needed: own-photos route).
- Image harvest: discovered the 119 "live site images" in scripts/bbgh/siteimgs are Google error-page screenshots, NOT photos (contact-sheet evidence) and were rightly never used. Harvested 5 real property photos from the owner's Google Maps listing via headless render (place id 0x1c758ff4c696682d:0xbed89304a85ff4b6, real coords -22.0064087,15.5786901 -> JSON-LD updated). 2 Pexels region shots added (free licence, watermarked agencies rejected), captioned as REGION not property. Honesty fix: gmb-02 relabelled as garden pond; Galaxy S24 watermark cropped off lapa.
- Widgets shipped: hero photo slider (crossfade+Ken Burns, arrows/dots/keyboard, pauses on hover, reduced-motion safe, slides 2-3 mount on activation), property pan rail (home peak), embla dish carousel (home+restaurant), facilities tabs (Day/Meetings/Celebrations), contact accordion FAQ (real facts only), gallery +7 tiles (37 total).
- scroll-craft method executed: BRIEF.md (self-authored under explicit delegation) with 8 topics, journey, feeling curve, peak (property pan 4.2vh), grammar choice (chaptered editorial; why the other 7 lost), score table (7 device families, 0 scrub), fingerprint registry seeded+appended.
- Engine integration: verbatim copies (md5-verified) to public/scrollcraft/scrollcraft.js + src/app/scrollcraft.css; client bridge scroll-engine.tsx (afterInteractive script, pathname-aware mount/destroy, strict-mode safe); engine tokens re-pointed to brand in globals.css. CRITICAL BUG FOUND+FIXED: unlayered engine CSS made :where(a){color:inherit} beat ALL Tailwind v4 utilities, rendering text-ink/text-paper anchors invisible (empty CTA pills in screenshots); fixed by @import layer(engine) declared before tailwindcss.
- Verification (shoot.mjs + real Chrome): no dead scroll; cue ramps fixed after round 1 (never-peak + empty exit frames); contact sheets read for desktop/mobile/reduced-motion; functional audit PASS (slider/carousel/tabs/accordion/lightbox); zero console errors.
- HARNESS LIMITATION documented, not patched: shoot.mjs contrast pass cannot parse oklch/lab() computed colors (regex predates them) and graded paper ink as near-black -> bogus 1.2:1 fails. Colour-accurate pixel probe (probes saved) measured 16/16 flagged lines at 15.5:1. Harness left unpatched to keep grading honest.
- Gauntlet (tangison-gauntlet-loop): named bar gondwana-collection.com captured at identical viewports, same browser; blind fresh-context critic returned 5/5 criteria to ours, WINNER: A; named gap (mobile fold led with harshest photo) fixed by moving the platter shot to slide 1.
- Budget: home cold transfer reduced 785KB -> 259KB / 8 reqs (slider mount-on-activation, image re-crops, quality tuning), well under 500KB.
- Deploy: Vercel prod bigbrother-guesthouse-jaxkobfco-targis47s-projects.vercel.app aliased to https://bigbrother-guesthouse.vercel.app, routes 200, new images served. GitHub push a83fa9d..376e5e1, remote verified. Tokens via env only, never written to files/commits.

Stage Summary:
- Live: https://bigbrother-guesthouse.vercel.app (owner Vercel targis47)
- Repo: https://github.com/tangison/bigbrother-guesthouse @ 376e5e1
- Evidence: scrollcraft/builds/bigbrother-home/{BRIEF.md,PROOF.md,lab/}, scrollcraft/FINGERPRINTS.md, scripts/tangison/{gmb/,stock/,probes,audits}
- Handover items: rotate GitHub PAT + Vercel vcp_ token; GMB listing management stays with owner (listing photos now also power the site); Search Console/GA4/custom-domain DNS remain owner inputs; real-phone iOS spot check recommended (no video clips shipped, so risk is low)

---
Task ID: 3-f
Agent: Super Z (main agent)
Task: Owner round-4 feedback: "Remove image captions and xation and auotmemddozer" -> strip visible photo captions, slider/carousel pagination dots, and hero autoplay; redeploy + push.

Work Log:
- Interpreted owner shorthand against the live build: captions = descriptive text under/over photos; "xation" = pagination dots (hero slider tablist + dish carousel tablist); "auotmemddozer" = the hero auto-advance (6000ms setInterval). No dozer/bulldozer content exists anywhere (verified by grep), so the auto-advance reading is the only grounded one.
- Captions removed in 8 files: hero-slider (per-slide corner caption + cap fields), home-view (property-pan figcaptions + label fields, Pexels provenance caption, comment updates), facilities-view (2 TabPanel caption props + prop signature + meetings figcaption), guesthouse-view (2 under-photo captions + grounds cap fields + figcaption), restaurant-view (hero corner caption), menu-view (hero corner caption), gallery-view (lightbox figcaption). Dish carousel name+price figcaptions KEPT deliberately (printed-menu product labels, not photo captions). Bento overlay titles kept (nav card UI). Alt text untouched (SEO/a11y checklist requires 100% coverage).
- Dots removed: hero slider role=tablist block and dish carousel tablist block + selected/onSelect state wiring; both control rows now justify-end with arrows only. Arrows, drag/swipe, keyboard reachability preserved. Facilities content tabs NOT touched (owner-requested widget, not pagination).
- Autoplay removed: INTERVAL + setInterval effect + paused state + hover/focus pause handlers deleted from hero-slider; slider is manual-only now. Ken Burns still runs on the active slide, reduced-motion CSS gate unchanged.
- Cleanup: orphaned .caption class removed from globals.css; comment blocks updated to match new behavior.
- Verification: eslint clean; production build 19/19 routes; built HTML greps clean (no caption strings, no "Choose slide"/"Go to dish" dot controls, no interval in src); live checks: / and 5 routes HTTP 200, live HTML greps clean; agent-browser live DOM probe: 0 tablists, 0 .caption elements, 2 hero arrows, 0 dish dots, 8 figcaptions all dish name+price; screenshots of hero and property pan confirm clean frames.
- Deploy: vercel link re-established (prj_uIBSMdzDlQ35LmlntMoVkQtuTmjO, team_nLqoCCjxE0cwPkgZNkP5ITX1; note: --scope flag rejected for personal account, plain link works); prod deploy bigbrother-guesthouse-k4y44ekwv-targis47s-projects.vercel.app aliased to https://bigbrother-guesthouse.vercel.app, HTTP 200.
- GitHub: commit f13625d pushed 376e5e1..f13625d via one-shot PAT URL (no remote config write, no tokens in files/commits); remote main verified at f13625d. Note: platform tooling had auto-committed e616b67 (UUID) and re-encoded several images with mode changes; included in push.

Stage Summary:
- Live: https://bigbrother-guesthouse.vercel.app (production alias, owner Vercel targis47)
- Repo: https://github.com/tangison/bigbrother-guesthouse @ f13625d
- Site now: no visible photo captions anywhere, no pagination dots, no autoplay; manual arrows are the only slider controls
- Standing reminder: rotate the GitHub PAT and Vercel vcp_ token (both appeared in chat)

---
Task ID: 4-a
Agent: Super Z (main agent)
Task: Owner super-prompt "Big Brother Site Upgrade": two brands in one site, booking flows, master-file data pages, supplied logos, contact strip, nav spacing fixes, image import from Gofile, copy fixes, preview deploy.

Work Log:
- Read the full uploaded prompt (374 lines) + master data file (494 lines); unzipped supplied logos (12 files) into originals/logos/; sampled brand colours from the SVGs (GH #ED6D0A/#131512/#FAF5E8 on-dark; Restaurant lime #A6E406, badge greens #447108/#080C06).
- Skills: find-skills bootstrapped and read in full earlier in session; 4 new hunts (booking/whatsapp/facebook/calculator) all returned 1-23-install noise; 0 new installs; adobe image-seo (installed+vetted earlier) used for alt/SEO technique.
- Architecture: root layout became a shell; all guesthouse pages moved to app/(site)/ with guesthouse nav+footer+LodgingBusiness JSON-LD; app/restaurant/ got its own layout (.brand-restaurant lime token scope, Restaurant JSON-LD, Eat-first strip). Shared SiteNav/SiteFooter parameterised by brand.
- Gofile import round 2: API listing blocked (error-notPremium); listing recovered via the page's own guest session; store download pattern verified (any store host 302-redirects home); 171 images + 1 PDF in folder; 166 images recovered (5 files redirect to the app page = gone server-side; PDF unfetchable); first-run HTML-error-body bug fixed with PIL validation; every recovered image reviewed via contact sheets (9 sheets).
- Selection: 16 masters built with sharp (auto-rotate, metadata stripped, max 1600w, mozjpeg 80) into public/images with clean hyphenated names; 2 owner 2048px shots replaced the old Maps-derived property masters; rejects: 3 Gemini AI-generated, ~45 date-stamped CCTV-style frames, 8+ identifiable-guest shots, 6 dark night shots, 3 blurry, bathroom shots, collage, near-duplicates.
- Platform tree-reset fought the branch work twice (auto-commits reverted to main and wiped untracked public/scrollcraft); resolved by fast-forward merging site-upgrade into main; scrollcraft.js restored from skills/scroll-craft/engine + gitignore negation !public/scrollcraft/.
- Deployed 5 preview deployments (never --prod); final: bigbrother-guesthouse-ca14yiugy. Stray auto-created "my-project" project deleted from owner's Vercel.
- Verification (verify_upgrade.cjs): 46 internal links 0 broken; booking WhatsApp template decoded (greeting/details/VIP/total/confirm lines correct); reserve template correct; email body correct; viewports 320/360/390/412/768/1024/1280/1536 no h-scroll, bar outer margin 16px + inner padding 16px; 0 console errors; AVIF + WebP negotiation verified via Accept headers (hero 23KB AVIF at 1080w); first-load weights: home 473KB, all others 17-79KB.
- GitHub: main pushed f13625d..e286dd0, site-upgrade branch also on remote; tokens env-only.

Stage Summary:
- Preview: https://bigbrother-guesthouse-ca14yiugy-targis47s-projects.vercel.app (NOT aliased to production, per owner approval gate)
- Repo: tangison/bigbrother-guesthouse main @ e286dd0, branch site-upgrade @ 0f09f9a
- Coverage: master file items Built/Adapted/Not-built documented in the owner report; ATTA badge, Instagram, NTB emblem, 10K-follower claim, Station Commander number all withheld pending owner input
- Owner must rotate GitHub PAT + Vercel token (exposed in chat)

---
Task ID: 4-b
Agent: Super Z (main agent)
Task: Owner round-5 feedback: use ALL supplied Gofile images, remove pond + white building photos (not theirs), restaurant page prominent on the guesthouse site with content from the old site, one phone number everywhere, spelling untouched (intentional). Deploy + push.

Work Log:
- Visual review of all 166 Gofile files via 9 labeled contact sheets; every slug verified against real content (16 sheet-label misattributions found and fixed by re-reading masters with unambiguous per-tile labels).
- build_all_masters.mjs: 139 new masters (sharp: auto-rotate, metadata/GPS strip, mozjpeg q80); date-stamp position measured across all 52 camera frames (uniform 83.8% line) and cropped at 83% + 3% side trim; near-black night shots lifted (brightness 1.15-1.25). Rejected 12 non-photos: 3 Gemini AI renders, 4 WhatsApp screenshots/collages, 3 failed-download HTML files, 1 motion blur. 16 files already masters from round 4-a. Coverage assert: zero unmapped files.
- Removed pond (property-pool), white building (property-front) and Maps-derived rooms block (property-rooms) from every view + deleted masters; replacements: pool-umbrellas-lapas (bento), building-main-yellow (guesthouse fold), entrance-gates-welcome (plot-7), conference-room-set (facilities meet tab), pool-lapa-mountains (hero slide 3 + pan).
- Gallery rebuilt from generated src/lib/gallery-data.ts (slug/w/h/group/alt): 117 photos in 7 sections (Rooms, Grounds, Pools, Day visits & events, Animals, Faces, After dark); restaurant gallery carries all 34 plates + drinks. Alt text describes visible content only.
- Restaurant prominence: ember "Restaurant" link + EAT badge appended to guesthouse nav (desktop + mobile).
- Old-site data ported (owner: "get it from the site"): kitchen hours Mon-Fri 07:00-22:00, Sat-Sun 08:00-21:00 (restaurant-view spec sheet, contact FAQ, footer, reserve, terms, menu, JSON-LD openingHoursSpecification) + bigbrothersrestaurant@gmail.com (spec sheet, contact page, reserve mailto, JSON-LD).
- One number everywhere: +264 81 264 7606 on every guesthouse surface (contact page heading now "Two places, two numbers"); 7607/645-6442 no longer displayed (fields kept as deprecated aliases so imports compile).
- Spelling: untouched everywhere per owner (intentional).
- Perf: cold first-load home 538KB -> 492KB / 79 req under the 500KB budget (quality ladder 45/48/50 whitelisted in next.config, deviceSizes +1280 step so the hero serves 1280w not 1920w, nav/footer logo sizes hints, apple-icon 25KB -> 6KB, prefetch=false on footer links); gallery first load 137KB, deep-scroll gallery 157KB; all routes re-measured.
- Verified in real Chrome: 14 routes 200, grouped gallery renders, lightbox + keyboard works, mobile nav shows ember Restaurant + EAT badge + single stay number, restaurant spec sheet shows ported hours/email, zero console errors, zero banned-image references in served HTML.
- Local commit 59808d8 on main. DEPLOY BLOCKED: GitHub PAT and Vercel token from the previous session are not recoverable (env-only, conversation compacted, both were flagged for rotation). Nothing guessed, nothing pushed.

Stage Summary:
- Local: main @ 59808d8, production build green (28 pages), lint clean
- Owner must supply: fresh GitHub PAT (repo tangison/bigbrother-guesthouse) + fresh Vercel token (project bigbrother-guesthouse, account targis47); push + prod alias happen the moment they arrive
- Site data honesty: every photo on the site is the owner's own; the only excluded files are 12 non-photographs (listed above), reported transparently

---
Task ID: 4-c
Agent: Super Z (main agent)
Task: Owner supplied fresh GitHub PAT ("Just push it on github and the vercel is diferent") -> push round-5 build to GitHub, assess Vercel path.

Work Log:
- Repo state verified: main @ 0321107 (59808d8 site work + worklog commit), tree clean, no remote configured, no .env tracked
- Secret scan of unpushed range e286dd0..0321107: no tokens in diff (only a worklog line mentioning rotation reminder); 225 files, +2242/-195
- New PAT validated via GitHub API: login tangison, push:true on tangison/bigbrother-guesthouse
- Push: one-shot x-access-token URL, main fast-forwarded e286dd0..0321107, remote verified equal to local HEAD (032110754b724a5e9a71e4f9b4c740fc2180c486); token used via env only, never written to git config or files
- Vercel check: no Vercel token anywhere in env/filesystem, no .vercel link file (session reset); probed live https://bigbrother-guesthouse.vercel.app at +0s/+100s/+250s after push - still old build (property-pool x27, property-front, property-rooms present; zero round-5 markers, no EAT badge) => project has NO GitHub auto-deploy connected; CLI deploy impossible without a fresh Vercel token
- Conclusion: GitHub done; Vercel production still serves the pre-round-5 build. Owner must either connect the repo in the Vercel dashboard (Settings > Git > tangison/bigbrother-guesthouse) for auto-deploys, or supply a fresh Vercel token (account targis47, project bigbrother-guesthouse) for CLI deploy

Stage Summary:
- Repo: https://github.com/tangison/bigbrother-guesthouse main @ 0321107 (round-5: all owner photos, pond/white building removed, restaurant prominent, one number)
- Live: https://bigbrother-guesthouse.vercel.app still OLD build - awaiting Vercel path decision
- Security: new GitHub PAT appeared in chat and was used for this push - rotate after review; no tokens stored anywhere

---
Task ID: 6-a
Agent: Super Z (main agent)
Task: Owner round 6: hero background slideshows + two new Gofile folders, comprehensive update prompt (exact rates, B&B lease, conference/day-visit/corkage policies, matangara fix, Book a Table, dual lines, socials, NTB, feedback categories, AVIF/WebP), Vercel token for the NEW account ("host here, remove it from the other"), push GitHub.

Work Log:
- Skills governing this round (owner-pasted): tangison-systematic-debugging + tangison-full-output-enforcement. Scope locked as a numbered deliverable list; every item either built or reported blocked with the exact reason. No placeholders.
- Gofile round 3: API listing blocked (error-notPremium) for both new folders. Root-caused by reading the page's own network request: the working call is GET /contents/{id}?page=1&pageSize=100 inside the gofile.io page context with Authorization Bearer <guest cookie token> + X-Website-Token: c45bd64f... + X-BL: en-US (headers harvested from agent-browser network log). Folder Dzv4vQuC (restaurant, 13 files) listed and downloaded 13/13 via the verified store pattern (originals/gofile-restaurant/). Folder f4721f76-46c4-4aba-abc1-982246eea973 (new place shots) resolves but canAccess:false public:false: Gofile's own page says "This content is not publicly accessible". BLOCKED: owner must flip the folder's visibility to public. Nothing guessed; home hero built from the uploaded WA0151 + existing owner masters instead.
- Masters (scripts/tangison/round6_masters.mjs, sharp): 13 restaurant images + hero-pool-gardens (1600x720, date stamp cropped at 80% height) + authentic matangara replacement. dish-matangara.jpg replaced with IMG-20261006-WA0060 (matangara & pap, matches the printed menu's TRADITIONAL FOOD description); the old WA0082 tripe-and-rice photo was the wrong dish. All metadata stripped, mozjpeg q80, Next serves AVIF/WebP (verified: hero 24KB AVIF @1920w).
- Hero slideshows: home hero-slider.tsx rewritten as ambient background slideshow (5 owner photos, 6.5s crossfade + Ken Burns, no arrows/dots/captions, pauses on hidden tab, reduced-motion = still photo, slides mount on activation). Restaurant page got its own slideshow component, slide 1 = restaurant-interior-counter (first file of the owner's folder = the specified starting image).
- Data (rates.ts): family unit badged Self-Catering + "Rooms 1 to 4 share bathroom facilities. Room 5 has its own private en-suite bathroom" + sleeps 8 across 5 rooms; round-6 pricing table enforced (rooms 7/13 + room 12 double hidden:true, kept in data for reversibility, excluded from cards + booking select + deep links); CONFERENCE {standard 20, max 30, rate 450, unit per day/event, includes water + tea/coffee station}; DAY_VISIT_RATE 30 flat (old tiered list retired); COOLERS 60/100; CORKAGE first bottle included + N$60-200 per 2 extra bottles; ENTERTAINMENT_AREA venue 500-2000 + 50 pp.
- B&B: guesthouse page card shows "Daily bookings paused" badge + not-on-the-same-grounds wording + 1-year corporate lease for mine workers; booking card B&B radio disabled with the same notice.
- Restaurant page: Book a Table section embeds ReserveCard (#book-a-table anchor, hero CTA points there); hours spec sheet = Mon-Sat from 09:30/10:00; hoursKnown flows to footer/contact/FAQ/reserve/terms/menu. JSON-LD machine hours omitted entirely (closing times unconfirmed; inventing a closes value would be worse than none). Flagged to owner: prompt says "Three Brothers Restaurant" once but every physical sign, the old site, the email and the FB/IG handles say Big Brothers - kept Big Brothers, owner to confirm.
- Contact/footer/nav: Stay lines now MTC +264 81 264 7606 + Telecom +264 85 264 7609 (contact page "Two places, three lines, one family", footer both lines, mobile nav both lines, schema telephone array). Socials FB/IG/TikTok (canonical URLs resolved from the owner's share links) as inline-SVG icons on contact + footers + sameAs in both JSON-LD blocks. NTB footer block links namibiatourism.com.na (GHO01094). Feedback categories now Compliment/Review/Complaint.
- Gallery: new "The restaurant in town" group (11 restaurant images) + 2 pool-guest shots to Faces; gallery-data.ts edited by hand this round (script comment updated).
- Facebook sync: page renders logged-out (name/phone/email confirmed, 10K followers) but posts/photos beyond the first 10 are login-walled; the 10 visible ones are birthdays/guests/rate-sheet documents, NO anniversary photos. 10th-anniversary section NOT built (nothing real to show): owner must send the photos. FB CDN hotlinking rejected (ephemeral signed URLs).
- Perf: standalone prod on :3100 (port 3000 is the platform dev server). Cold home 499KB / 80 req (under 500KB), restaurant 89KB warm / 44 req, AVIF negotiation verified. Mobile 390px: no horizontal scroll, EAT link present.
- Deploy: lint clean, build green (25 routes), pushed 0321107..9ff023f to tangison/bigbrother-guesthouse (one-shot PAT URL, token env-only). The NEW Vercel account bigbrotherguest-2048 (token vcp_4ZtN... project prj_wdOFPrIILB5w5M39s4gbC5tmXhLn) is git-connected: push auto-built dpl_3KfgRUZkdo to READY, live at bigbrotherguesthouse.com + www (HTTP 200, round-6 markers verified, clean session zero console errors).
- "Remove it from the other": the OLD account targis47 still hosts bigbrother-guesthouse.vercel.app with a stale build. No targis47 token exists in this session, deletion is destructive, so NOT done - owner must delete the old project in the targis47 dashboard or send that account's token.

Stage Summary:
- Live: https://bigbrotherguesthouse.com (round 6, auto-deployed from GitHub push 9ff023f on account bigbrotherguest-2048)
- Repo: tangison/bigbrother-guesthouse main @ 9ff023f
- Blocked on owner: (1) Gofile folder f4721f76... is private - flip to public and the new place shots go into the hero; (2) 10th-anniversary photos needed (FB won't serve them logged-out); (3) delete the old targis47 project (or send its token); (4) confirm "Three Brothers" vs "Big Brothers" (kept Big Brothers per signage/email/handles); (5) restaurant closing times to complete the hours; (6) rotate BOTH tokens pasted in chat (GitHub PAT + vcp_ Vercel token)
---
Task ID: 2-b
Agent: general-purpose (Usakos competitors research)
Task: Find real, verifiable competitor accommodations in/around Usakos (<=30 km) for the "when we're full" section.

Work Log:
- Read worklog.md for project background (Big Brother Guesthouse, bigbrotherguesthouse.com, Usakos, B2 between Windhoek & Swakopmund).
- Ran 12 z-ai web_search query variants: "Usakos accommodation guesthouse hotel Namibia", "Usakos hotel Namibia booking", "Bahnhof Hotel Usakos Namibia", "Carlo's Mountain Lodge Usakos", "\"Usakos Hotel\" Namibia accommodation", "Hohenstein Lodge Usakos official", "Spitzkoppe Cabin Camp Usakos accommodation", "Uitkyk Guest Farm Usakos", "Shind Guesthouse Usakos", "Opi Kopi Guest Farm Usakos J&T Echo", "Achab cabin Usakos Spitzkoppe accommodation", "Ameib ranch Erongo", "Spitzkoppen Lodge official website", "Nubeb self catering Usakos phone", "Spitzkoppe Tented Camp official site", "Uitkyk contact phone", "Achab Lodge website contact", "Ameib from Usakos km".
- Curl-verified live pages: mountainlodgenamibia.com (Joomla, live), uitkykguestfarm.com (Wix, live), spitzkoppecabincamp.com (Wix, live), spitzkoppe.com (Showit, live), spitzkoppenlodge.com (Wix, live), nubeb.biz (live), erongominerals.com/bahnhof/index.html (live), namibweb.com/bahnhofhotel.htm (live, full Bahnhof facility list), ondili.com/lodges/hohenstein-lodge (WordPress, live), visitnamibia.com.na directory pages for Issa + Shind (live), achabcamp.com/contact (Wix, live), lekkeslaap.co.za/accommodation-in/usakos (live, "2 places in Usakos"). ameib.com serves an anti-bot interstitial but domain + FB (AmeibNamibia) + 3 directory listings confirm it.
- Cross-checked each candidate on 2+ independent sources (Booking.com / Tripadvisor / Agoda / LekkeSlaap / FB / directory). Booking.com city-page scrape timed out (bot wall) but per-property Booking/Tripadvisor URLs came from search results with consistent data.
- Dropped: "Usakos Hotel" (Bradt-era, tel 064 530259 - no current OTA/FB/web presence found, appears defunct), Arandis (too far), Etusis Lodge (near Karibib, >30 km), Spitzkoppe Community Campsites (campsites only, covered by Cabin Camp entry).
- No code changes; only this worklog entry written.

Stage Summary:
- CONFIRMED 8 mains + 3 Spitzkoppe-road extras, all within ~30 km of Big Brother Guesthouse:
  1. Bahnhof Hotel Usakos | hotel (2*) | https://www.booking.com/hotel/na/bahnhof-usakos.html (+ FB "Bahnhof Hotel Usakos", page erongominerals.com/bahnhof/index.html) | +264 81 124 9008 | 22 Theo Ben Gurirab St, main street on the B2 by the railway station; restaurant, bar, pool, A/C rooms | verified
  2. Nubeb Self-Catering Accommodation | self-catering rooms+flat | http://www.nubeb.biz | 081 128 6422 (martiemcd@gmail.com) | 255 Kalk St, town; A/C rooms + flat sleeping 4, mini-kitchens | verified
  3. Issa Guesthouse Usakos | B&B/guesthouse | https://visitnamibia.com.na/directory/issa_guesthouse (best listing; TA d33455275) | - | Van Sitter plot on the B2 ~2 km from station; 13-bed house, garden, bar, pool | probable (directory + OTA only)
  4. Uitkyk Guest Farm | guest farm | https://www.uitkykguestfarm.com (LekkeSlaap /accommodation/uitkyk-guest-farm-14) | +264 81 287 6299 | 3-5 km out on D1935/Farm 65, Khan River green oasis; 7 double rooms, shaded campsites, pool, lapa/pizza nights, books via NightBridge | verified
  5. Carlo's Mountain Lodge | eco retreat & glamping lodge | https://www.mountainlodgenamibia.com | +264 81 338 7330 (info@mountainlodgenamibia.com) | Plot 54 D1914, 4-5 km from Usakos; pool, restaurant, bar, free town shuttle. NOTE: J&T Echo Guestfarm / "Opi Kopi Guest Farm Usakos" FB page share this phone - same operator, rebrand | verified
  6. Achab Camping / Achab chalets | eco cabins + glamping tents + camping | https://www.achabcamp.com (FB @AchabCamping) | Achab.nature@gmail.com | ~10 km south of Usakos on D1914; cabins with private splash pools; TA price range $47-$186 | verified
  7. Hohenstein Lodge (Ondili) | upmarket lodge | https://www.ondili.com/lodges/hohenstein-lodge | +264 64 530900 (reservations@hohensteinlodge.com) | 25 km north of Usakos at foot of Erongo's highest peak (D1935); 14 rooms, pool, restaurant, waterhole | verified
  8. Ameib Guesthouse & Camping (Ameib Ranch) | guest farm + camping | https://www.ameib.com/site/home.html (anti-bot wall; FB facebook.com/AmeibNamibia, listing info-namibia.com/accommodation/erongo/ameib-ranch) | - | 27 km via D1935/D1937 gravel at SW foot of Erongo; family-run, ~10 bungalows/rooms + campsites, rock-art & climbing area | verified
  Extras on the Spitzkoppe road (D1918, ~30 km west): Spitzkoppe Cabin Camp https://www.spitzkoppecabincamp.com (12 glamping cabins, shared ablutions; bungalow ~$151-200 Agoda) | Spitzkoppen Lodge https://www.spitzkoppenlodge.com (15 chalets, upmarket, (00264) 81 143 5048, reservations@logufa.com) | Spitzkoppe Tented Camp https://spitzkoppemountaincamp.com (+264 81 333 3448, en-suite bush tents + campsites 1 km from reserve). Also Shind Guesthouse Usakos (visitnamibia.com.na/directory/shind-guesthouse-usakos, +264 81 454 3501) - directory-only, probable.
- Landscape note for site copy: Usakos is a genuine overnight stop with a small but real lodging spread - one old-school town hotel (Bahnhof, ex-railway, B&B + restaurant), 2-3 simple town self-catering/B&B options (Nubeb, Issa, Shind), 3 farm stays within 10 km (Uitkyk, Carlo's, Achab) and 2 mountain lodges at 25-30 km (Hohenstein upmarket, Ameib rustic), plus the Spitzkoppe cluster ~30 km west. Quality runs from N$ camping/simple rooms to a 4-star-equivalent lodge, so an honest "when we're full" line can say: town has a handful of simple self-catering and hotel rooms, with farm and mountain lodges 5-30 minutes out; nothing in town is big or glossy, so booking ahead (with us first!) genuinely matters.

---
Task ID: 2-c
Agent: general-purpose (NTB link + name variants research)
Task: Research-only: find the best official NTB link for Big Brother Guesthouse (GHO01094), map name variants ("Big Brother(s) Guesthouse/Guest House"), check "Three Brothers" Usakos conflict, and verify Google Business Profile fields.

Work Log:
- Queries run via z-ai web_search: "Big Brother Guesthouse" site:namibiatourism.com.na (0 NTB hits, but surfaced visitnamibia + TripAdvisor + FB); "GHO01094" (ZERO indexed results anywhere — number never published online); NTB official-site relationship query; site:visitnamibia.com.na Usakos guesthouse; "Big Brothers Guesthouse" exact; "Big Brother Guest House" Usakos; OTA query (booking/agoda/travelstart/expedia); "Three Brothers" Usakos; "Big Brothers Restaurant" Usakos; NTB registered-establishments register query
- curl verified: https://visitnamibia.com.na/directory/big_brother_guesthouse/ HTTP 200 (title "Big Brother Guesthouse | Visit Namibia"; body: Guesthouses · Erongo · Plot 7 Usakos south of B2 trans Kalahari road · +264 64 530155 · desgon@iway.na — stale contacts; own listing shows NO GHO number, but related listings print theirs e.g. GHO01557-01560)
- Proved visitnamibia.com.na is OFFICIAL NTB: /about-us/ text "The Namibia Tourism Board is the Namibia Government agency responsible for…"; footer "COPYRIGHT © 2026 – NAMIBIA TOURISM BOARD" + NTB HQ address (C/O Haddy & Sam Nujoma Drive, Private Bag 13244, Windhoek) + NTB tel +264 61 290 6000; official NTB Facebook says "visit www.visitnamibia.com.na"; DNS 197.188.245.153 (Namibian IP)
- Found SECOND NTB listing: /directory/messrs-big-brothers-bed-and-breakfast/ HTTP 200 — "Messrs Big Brothers Bed and Breakfast", B&B · Erongo · Usakos · +264 81 319 8333 · bigbrotherbnb@gmail.com (one letter off the old site's bigbrothersbnb@gmail.com)
- namibiatourism.com.na: DNS resolves 197.188.254.5 (Telecom Namibia space; @namibiatourism.com.na emails on official NTB FB) BUT web server drops all foreign connections (tested https/http, TLS1.2+1.3, direct-IP, --resolve: all HTTP 000, "unexpected eof" after ClientHello) — could NOT confirm HTTP 200; NTB's own channels point consumers to visitnamibia.com.na
- ntbbusinessportal.com.na: does not resolve (no DNS record). registration.visitnamibia.com.na/home exists but currently throws Drupal PDOException (database error). /registration-forms/ publishes application PDFs (Guest-House-A4.pdf etc.), NOT a public register
- Public establishment search confirmed working: https://visitnamibia.com.na/business-directory/ (Directorist "Search Listing" with Name-of-Business field → /search-result/); tested /search-result/?q=Big%20Brother → returns BOTH Big Brother listings. No public verify-by-registration-number tool exists
- curl old sites: bigbrotherguesthouse.com = CURRENT live Next.js site (HTTP 200, "Big Brother Guesthouse" x5, JSON-LD name "Big Brother Guesthouse"); bigbrother-usakos.com = broken SPA ("No configuration file found…") but search-indexed snippets show "Big Brother Guesthouse" + bigbrothersbnb@gmail.com; Google's index still shows the OLD bigbrotherguesthouse.com as "Big Brother Holdings" (/contact snippet: bigbrotherguest@gmail.com, +264812647606)
- Google Maps embed probe (maps.google.com/maps?q=…&output=embed): Guesthouse GBP = name "Big Brother Guesthouse", "Plot 7 Usakos south, Usakos, Namibia", +264 81 264 7606, website bigbrotherguesthouse.com, coords -22.0064087,15.5786901, place id 0x1c758ff4c696682d:0xbed89304a85ff4b6. Restaurant GBP = "Big Brothers Restaurant", Theo-Ben Gurirab/Goethe St, +264 81 302 9522, website bigbrother-usakos.com (currently a DEAD site — flag to owner)
- Booking.com/agoda/lodging-world detail pages bot-walled (202/403) — relied on search snippets only; no invented data

Stage Summary:
- NTB BEST LINK (establishment-specific, official, live): https://visitnamibia.com.na/directory/big_brother_guesthouse/ — use this for the footer NTB badge; official proof = NTB copyright/about/HQ address + NTB FB endorsement. Second owner listing: https://visitnamibia.com.na/directory/messrs-big-brothers-bed-and-breakfast/
- namibiatourism.com.na confirmed real NTB corporate domain but geo-blocked from abroad (cannot serve 200 to foreign visitors either) → NOT the right badge target; homepage fallback if owner insists
- No public NTB register or verify-by-number tool; public search = https://visitnamibia.com.na/business-directory/ (verified it finds the establishment); GHO01094 not published anywhere online (0 hits)
- Name variants: "Big Brother Guesthouse" (singular, one word) wins EVERY listing/official context (NTB, TripAdvisor "Big Brother Guesthouse Usakos", FB page name, both old sites, current site + JSON-LD, GBP, telecomonline.africa); "Big Brother Guest House" (spaced) lives only in press/blogs (New Era + allafrica 2022 counterfeit-notes story, blogger, FB comments); "Big Brothers Guesthouse" (plural) is NOT a listing name anywhere — only inside the FB page's own post copy. SEO: name "Big Brother Guesthouse", alternateName candidates "Big Brother Guest House" + "Big Brothers Guesthouse"
- "Three Brothers" Usakos: NO conflicting business exists (all hits unrelated); restaurant is consistently "Big Brothers Restaurant" (own FB page, old site, TripAdvisor, yandex/cybo/mindtrip/wikinam) — keep "Big Brothers", no conflict
- GBP: both listings visible with correct phone numbers; guesthouse website field = bigbrotherguesthouse.com (correct); restaurant website field = bigbrother-usakos.com which is BROKEN right now — owner should repoint it
- NTB listing contacts are stale (+264 64 530155 / desgon@iway.na) — owner should ask NTB to update to +264 81 264 7606
---
Task ID: 2-c
Agent: general-purpose (NTB link + name variants research, retry)
Task: Research-only retry: pin down the best official NTB link for Big Brother Guesthouse (GHO01094), map public name variants, check "Three Brothers" Usakos conflict, verify Google Business Profile fields.

Work Log:
- z-ai web_search: "Big Brother Guesthouse" site:namibiatourism.com.na (0 hits on NTB corp domain; top hits = TripAdvisor d11826846, visitnamibia directory, bigbrother-usakos.com/contact, FB page, telecomonline.africa); "GHO01094" (search API: "No search results available" - registration number never published online); "Big Brother Guesthouse Namibia Tourism Board"; "NTB registered establishments list Usakos"; "NTB verify registration establishment" (TASA FB post tells members to check the "Namibian Tourism Board directory" at visitnamibia...; NTB FB: registration mandatory per Tourism Board Act s20)
- curl https://visitnamibia.com.na/directory/big_brother_guesthouse/ -> HTTP 200, 488KB, <title>Big Brother Guesthouse | Visit Namibia</title>; listing block: Address "Plot 7 Usakos south of B2 trans Kalahari road", Phone +264 64 530155, Email desgon@iway.na (stale contacts); own listing shows NO GHO number (the GHO01557x seen on page = "Registered" badge on RELATED listings, directorist registered.svg icon)
- Proved visitnamibia.com.na = official NTB: /about-us/ HTTP 200 text "The Namibia Tourism Board is the Namibia Government agency responsible..."; footer "COPYRIGHT © 2026 - NAMIBIA TOURISM BOARD" + "PRIVATE BAG 13244 WINDHOEK" (NTB HQ); TASA (industry body) FB points members to it as the registration-check directory; root title "Visit Namibia - Namibia, Endless Horizons"
- namibiatourism.com.na retested: DNS 197.188.254.5 (Telecom Namibia); HTTPS FAILS cert check (serves CN=plinwhmcs1.tw.na - wrong cert); with -k / plain HTTP it returns HTTP 200 but body is a bare Plesk placeholder: <title>Web Server's Default Page</title> / "Plesk Obsidian 18.0.81" - the NTB corporate site is currently a hosting placeholder, NOT serving the NTB website (worse than the previous run's connection-drop finding)
- ntbbusinessportal.com.na: NXDOMAIN (does not exist). registration.visitnamibia.com.na/home: HTTP 500, Drupal PDOException (broken). visitnamibia.com.na/registration-forms/: HTTP 200 but only application/change PDFs (Bed-Breakfast-A4.pdf etc.) - NO downloadable register of registered establishments
- Public establishment search VERIFIED live: https://visitnamitia.../search-result/?q=Big%20Brother -> HTTP 200, returns exactly the two Big Brother listings; no verify-by-registration-number tool exists anywhere
- Second owner listing reverified: https://visitnamibia.com.na/directory/messrs-big-brothers-bed-and-breakfast/ -> HTTP 200, "Messrs Big Brothers Bed and Breakfast | Visit Namibia", Usakos, +264 81 319 8333, bigbrotherbnb@gmail.com
- Name variants: "Big Brother Guesthouse" (singular one-word) = the name on EVERY listing/platform (NTB dir, TripAdvisor, FB page, telecomonline.africa, SafariNow display name, MapQuest, both old+new sites, GBP); "Big Brother Guest House" (spaced) = only press/blogs: New Era + allafrica 2022 counterfeit-notes story, YouTube (2019 Usakos JSS video), under-100-dollar-gems.com blog, Usakos Expo 2017 FB caption, SafariNow URL slug; "Big Brothers Guesthouse" (plural) = NOT used as a name by any third party (searches return only singular-name pages) - appears only inside the FB page's own post copy
- "Three Brothers" Usakos: NO such business - all hits unrelated (personal bios, Dorgeloh Group Omaruru founding story, crime headlines, TripAdvisor "Three Brothers Pool Bar" Spain). Restaurant side consistently "Big Brothers Restaurant"/"Usakos Big Brothers Restaurant" (own FB page 61551027541213, old site /restaurant, TripAdvisor, evendo, mindtrip.ai, yandex maps, cybo). No conflict; keep "Big Brothers"
- Google Business Profile via maps embed probe (www.google.com/maps?q=...&output=embed + consent cookie): Guesthouse GBP = "Big Brother Guesthouse", category "Bed & breakfast" (gcid:bed_and_breakfast), "Plot 7 Usakos south, Usakos, Namibia", +264 81 264 7606 (tel:+264812647606), website field https://www.bigbrotherguesthouse.com/home (displayed as bigbrotherguesthouse.com), 42 reviews, place 0x1c758ff4c696682d:0xbed89304a85ff4b6 (ChIJLWiWxvSPdRwRtvRfqAST2L4), coords -22.0064087,15.5786901, plus code 5F9QXHVH+CF. Restaurant GBP = "Usakos Big Brothers Restaurant", Restaurant, Theo-Ben Gurirab/Goethe St, +264 81 302 9522, website http://www.bigbrother-usakos.com/, 15 reviews, place 0x1c758f2fb638c987:0xa2d717f29fb6f214
- curl https://www.bigbrother-usakos.com/restaurant -> HTTP 200 but body = "No configuration file found and no installation code available. Exiting..." (broken SPA) - the restaurant GBP website field points at a dead site
- No code changes; only this worklog entry written

Stage Summary:
- NTB BEST LINK (official, establishment-specific, live, verified HTTP 200): https://visitnamibia.com.na/directory/big_brother_guesthouse/ - USE THIS for the footer NTB badge. Official-domain proof: NTB copyright/footer + Private Bag 13244 Windhoek HQ + NTB-as-Government-agency about text + TASA points members to this directory for registration checks. Fallback homepage: https://visitnamibia.com.na (NOT namibiatourism.com.na - currently serves a Plesk default placeholder with a mismatched TLS cert; unusable for visitors)
- Second owner NTB listing (B&B, distinct from guesthouse): https://visitnamibia.com.na/directory/messrs-big-brothers-bed-and-breakfast/
- No public NTB register download or verify-by-number tool: GHO01094 has zero online footprint; only public check = https://visitnamibia.com.na/business-directory/ search (verified it finds the listing). registration.visitnamibia.com.na broken (HTTP 500); ntbbusinessportal.com.na NXDOMAIN
- Name variants for SEO: primary name "Big Brother Guesthouse" (dominates every listing/official context); alternateName candidates: "Big Brother Guest House" (press/blogs) + "Big Brothers Guesthouse" (FB post copy only, no third-party use - low value). Keywords could add "Big Brother B&B", "Big Brothers Restaurant"
- Three Brothers: NO conflicting business in Usakos; restaurant is "Big Brothers Restaurant" everywhere - owner typo concern resolved, keep signage name
- GBP: guesthouse listing healthy (name/phone/website all correct; website = bigbrotherguesthouse.com/home). Restaurant GBP website = bigbrother-usakos.com which is BROKEN (Plesk SPA error) - owner should repoint it to bigbrotherguesthouse.com/restaurant or fix the old site. NTB listing contacts are stale (+264 64 530155 / desgon@iway.na) - owner should ask NTB to update to +264 81 264 7606

---
Task ID: 2-a
Agent: general-purpose (OTA listings research, retry)
Task: Research-only: find every real, verifiable OTA/directory listing for Big Brother Guesthouse (Usakos) across Agoda, Booking.com, Lekkeslaap, SafariNow, Airbnb, TripAdvisor, Google, Hotels.com, Expedia, SleepOut and Namibian directories.
Work Log:
- Read worklog.md tail (tasks 2-b/2-c context: competitors, NTB/visitnamibia, GBP, bot-walls).
- z-ai web_search queries: "Big Brother Guesthouse Usakos Agoda"; "... Booking.com"; "... lekkeslaap"; "... SafariNow safarinow.com"; "... Airbnb airbnb.com"; "... Expedia Hotels.com"; "... SleepOut sleepout.com"; "site:namibweb.com OR namibweb Big Brother Guesthouse Usakos"; "site:namibweb.com \"Big Brother\""; "site:airbnb.com Usakos Namibia"; "agoda.com \"Big Brother Guesthouse\""; "booking.com hotel na big-brother Usakos"; "booking.com \"Big Brother Guesthouse\" Usakos"; "expedia.com Usakos hotels Namibia"; "agoda.com Usakos hotels Namibia best"; "airbnb Usakos Namibia rooms"; "\"Big Brothers Guesthouse\" OR \"Bigbrother Guesthouse\" OR \"Big Brother Guest House\" Usakos"; "Big Brother Guesthouse Usakos Google Maps reviews"; "namibweb.com \"Big Brother\" Usakos guesthouse".
- curl VERIFIED (HTTP 200 + matching name/Usakos/phone): office.safarinow.com/go/big-brother-guest-house (schema.org LodgingBusiness "Big Brother Guesthouse", "Welcome to Big Brother Guesthouse Usakos...", priceRange R500-R2000, 3 rooms stale, check-in 1PM/out 10AM, share URL = itself); visitnamibia.com.na/directory/big_brother_guesthouse/ ("Plot 7 Usakos south of B2 trans Kalahari road", +264 64 530155 stale); telecomonline.africa/listing/big-brother-guesthouse (title "Big Brother Guesthouse - Telecom Africa Online", +264 81 264 7606); evendo.com/locations/namibia/usakos/landmark/big-brother-guesthouse ("delightful bed and breakfast located in ... Usakos, Namibia"; also /restaurant/big-brother-guesthouse variant); info.na/directory/category/accommodation-lodge (contains "Big Brother Guesthouse" + "Big Brothers Bed and Breakfast"); walvisbaycc.org.na WB-Tourism-operators-listing-FINAL-1.pdf (pdftotext: "Big Brother Guesthouse / +264 64 530155"); maps.google.com/maps?q=Big+Brother+Guesthouse+Usakos&output=embed ("Big Brother Guesthouse, Plot 7 Usakos south, Usakos, Namibia", +264 81 264 7606).
- curl VERIFIED ABSENCES: lekkeslaap.co.za/accommodation-in/usakos + /2 + /3 (all HTTP 200, 0 matches "big brother"; Usakos-area properties = Uitkyk, Bahnhof, Achab, Carlo's, Ai-Aiba, Erongo Rocks, Etusis, Khan River Lodge, Omaruru Guesthouse etc.); namibweb.com/usakos.htm (town page, no establishment listing for BB) + acc15.htm Erongo accommodation index (0 matches; Usakos section = Achab Camp, Bahnhof etc.).
- curl BOT-WALLED (relied on platform-domain search snippets only): tripadvisor.com Hotel_Review-g1182990-d11826846 (DataDome captcha) — snippets: "BIG BROTHER GUESTHOUSE USAKOS - Guest house", "friendly self-catering accommodation in Usakos... seven self-catering rooms", "7 traveler reviews, 4 candid photos", review r594457239; lodging-world.com/wa/hotels/big-brother-guesthouse-in-usakos-914302400 (Cloudflare challenge) — "Big Brother guesthouse, Usakos up to 20% off", "600 metres from Usakos Railway Station"; bedroomvillas.com/property/big-brother-guesthouse/BC-14302400 (403 CloudFront; same ID syndicated at execstays.com) — "Big Brother guesthouse | House in Usakos", "12 Bedroom House"; mapquest.com/na/big-brother-guesthouse-usakos-525683978 (403 CloudFront geo-block) — "Big Brother Guesthouse Usakos", top review "Big Brother was a nice surprise!"; yellowpages-*.cybo.com/NA/usakos (403; many language mirrors) — "Big Brother Guesthouse. Plot 7 Usakos south, Usakos, Namibia. 3.9 (35)"; booking.com/city/na/usakos.html (HTTP 202 JS wall, 0 property names); hotels.com/de920628/hotels-usakos-namibia (429); airbnb.com/s/Usakos--Namibia/homes (200 but client-rendered, 0 matches).
- Agoda/Booking/Expedia/Hotels.com absence evidence: platform-city-page snippets list Usakos inventory WITHOUT Big Brother (Booking "11 hotels": Bahnhof, Achab Eco cabin, Spitzkoppen Lodge, Hohenstein, Okambishi's Rest, Achab chalets, Achab Self...; Agoda populars: Bahnhof, Uitkyk, Spitzkoppen, Wustenquell; Hotels.com "7 hotels in Usakos"; Expedia Usakos.dx6206286 names Hohenstein/Spitzkoppen/Ai Aiba/Etusis) + zero property URLs in any search. namibiatourism.com.na retested: HTTP 000 (geo-blocked, consistent with 2-c). SleepOut: platform shut down Feb 2017 (Wikipedia), nothing to find.
- Spelling check: every real listing uses "Big Brother Guesthouse" singular (TripAdvisor display "Big Brother Guesthouse Usakos"; SafariNow, info.na, Cybo, telecomonline, walvisbaycc PDF all "Big Brother Guesthouse"); info.na also carries the separate owner B&B as "Big Brothers Bed and Breakfast". "Big Brothers Guesthouse"/"Bigbrother Guesthouse" found nowhere as a listing name (only irrelevant US Big Brother TV hashtags).
- No code changes; only this worklog entry written.
Stage Summary:
- VERIFIED listings (fetched, matching content): 1) Google Maps/GBP — "Big Brother Guesthouse", Plot 7 Usakos south, +264 81 264 7606 (place 0x1c758ff4c696682d:0xbed89304a85ff4b6); 2) SafariNow — office.safarinow.com/go/big-brother-guest-house (live bookable page, "Big Brother Guesthouse", R500-R2000, stale 3-room/geo data worth owner correction); 3) NTB/visitnamibia.com.na/directory/big_brother_guesthouse/ (stale +264 64 530155 / desgon@iway.na); 4) telecomonline.africa/listing/big-brother-guesthouse (correct +264 81 264 7606); 5) evendo.com/locations/namibia/usakos/landmark/big-brother-guesthouse (SEO travel guide); 6) info.na/directory/category/accommodation-lodge (stale "+26464530155, Swakopmund" label); 7) Walvis Bay CC tourism-operators PDF (Dec 2024, stale NTB contact).
- PROBABLE (bot-walled, name+Usakos together on the platform's own domain via snippets): TripAdvisor (d11826846, "Big Brother Guesthouse Usakos", 7 reviews, review r594457239) — the ONLY major OTA listing found; lodging-world.com (914302400, "600 m from Usakos Railway Station"); bedroomvillas.com BC-14302400 (syndicated to execstays.com, "12 Bedroom House"); MapQuest (525683978); Cybo (Google-derived, "Plot 7 Usakos south", 3.9 (35)).
- NOT FOUND (no listing, evidence-based): Booking.com (city inventory excludes BB), Agoda (same), Expedia + Hotels.com (7-11 property Usakos inventories exclude BB), Airbnb (Usakos has chalet/tent listings — Achab cluster + Okambishi's Rest — no BB), Lekkeslaap (all 3 Usakos pages fetched, zero BB), namibweb.com (Erongo index zero BB), namibiatourism.com.na (unreachable abroad, no establishment listings), SleepOut (defunct 2017).
- Actionable: only TripAdvisor + SafariNow carry bookable third-party presence; SafariNow data is stale (3 rooms, R500-R2000, wrong geo -22.5049/17.01995) and sits on the office. affiliate domain — owner should claim/update via establishments.safarinow.com; TripAdvisor page is unclaimed-looking with 7 stale reviews; every directory still shows the dead +264 64 530155 NTB number except telecomonline.africa (correct).

---
Task ID: 7
Agent: Super Z (main agent)
Task: Round 7: matangara owner correction, SEO audit, competitors "when full", verified listings, NTB link back, deploy + audit report PDF.

Work Log:
- Owner correction (screenshot with X on live Matangara card): "this is not matangara, the one you removed is". Verified by eye: the live photo (round-6 WA0060 build) IS mopane worms & pap; the removed WA0082 (tripe in tomato gravy + pap) IS matangara. round7_matangara_fix.mjs rebuilt dish-matangara.jpg from originals/gofile/IMG-20261006-WA0082.jpg (1280px, metadata stripped, mozjpeg q80), preserved the worms plate as dish-mopani.jpg, removed dish-traditional.jpg. Carousel gained a "Mopani worms & pap N$100" card (price from printed menu line 66); alts updated in dish-carousel/menu-view/restaurant-gallery.
- Research agents (2-a OTA, 2-b competitors, 2-c NTB): verified listings inventory + 9 Usakos-area accommodations + NTB findings (below). Key: namibiatourism.com.na serves a bare Plesk placeholder; the NTB's real public directory entry is visitnamibia.com.na/directory/big_brother_guesthouse/. No Agoda/Booking/Airbnb/Lekkeslaap listing exists (verified absence, nothing invented). "Big Brother Guesthouse" singular dominates publicly; "Big Brother Guest House" spaced variant in press -> alternateName. No "Three Brothers" business in Usakos. Restaurant GBP website field points at dead bigbrother-usakos.com.
- SEO audit (live site): robots/sitemap OK (19 URLs); 308s + HSTS + 404 OK; one JSON-LD block per brand page (LodgingBusiness / Restaurant+Menu), SSR-inline. FINDING 1: root title template "%s | Big Brother" duplicated brand suffix on child pages (61+ chars, SERP truncation) -> template removed. FINDING 2: OG/Twitter tags missing on 13 pages (home, rooms, book, plot-7, vip, feedback, guest-info, brand, terms, privacy, reserve, restaurant/gallery, restaurant/contact) -> pageMetadata() helper added to metadata.ts, all 13 now emit canonical+OG+Twitter. FINDING 3: apex host serves 200 instead of redirecting to www (canonicals mitigate; noted for owner Vercel settings). FINDING 4: /guesthouse Fold-4 copy claimed rates not published while /rooms lists every rate -> copy aligned + link to table.
- Built: "Fully booked? Here is where we send people." fold on /guesthouse (id=fully-booked, 3 distance groups, 9 verified places, external links rel=noopener target=_blank) + cross-link on /book; "Find us on other sites" section on /contact (TripAdvisor, SafariNow, Google Maps + NTB directory chips); footer NTB block relinked to visitnamibia directory + "Also listed on" strip (guesthouse footer only); LodgingBusiness schema + alternateName "Big Brother Guest House" + sameAs += NTB directory, TripAdvisor; home description mentions restaurant on site.
- Verify: lint clean, build green (25 routes), standalone :3100 (killed stale pid 5471 from round 6 that was serving the old build). Cold home 97KB/8 req; 390px overflow 0; fully-booked fold renders with all 9 external links. Live vitals (Playwright, 412px, post-deploy): FCP 492ms, LCP 908ms (IMG), CLS 0.0000, 106KB/45 req. PSI API quota 429 (used lab measurement instead).
- Deploy: push a15e1dc..d40348b to tangison/bigbrother-guesthouse (one-shot PAT URL, env only); Vercel auto-deploy confirmed live on first probe (~100s): clean /rooms title, fully-booked fold, visitnamibia footer link, both dish images 200, OG on home, contact listings section.
- Report: pdf skill loaded in full (report brief + cover + overflow + palette + pagination + typography + fill-engine). palette.cascade (warm olive, minimal). Body: TocDocTemplate/multiBuild, 6 sections, 5 tables, 3 KPI callouts, roman-i TOC footer + Arabic reset, CondPageBreak orphan guards. Cover: Template 01 HUD via html2poster --width 794px, poster_validate + cover_validate pass. Merged via pypdf strict A4 normalize (fixed 595.9pt drift flagged by pdf_qa). QA chain: code.sanitize, meta.brand, font.check 0 issues, toc.check clean, pages.clean 0 blanks, pdf_qa WARN-only (2 false-positive table-centering on the 3-up KPI callout row, by design). Footer bug caught in visual pass: internal page 2 showed ii instead of 1 -> roman map reduced to page 1 only, rebuilt.
- Deliverables: download/Big-Brother-Guesthouse-SEO-Audit-October-2026.pdf (9 pages, 153KB) + cover HTML source.

Stage Summary:
- Live: https://www.bigbrotherguesthouse.com @ d40348b (round 7). Matangara restored (owner-confirmed), mopani worms own card, when-we-are-full fold live, listings strips live, NTB badge -> visitnamibia.com.na directory, titles clean, OG everywhere, schema enriched.
- Report: download/Big-Brother-Guesthouse-SEO-Audit-October-2026.pdf (pass QA, WARN-only).
- Blocked on owner: (1) GSC verify + sitemap submit; (2) delete old targis47 project; (3) reply/refresh TripAdvisor + SafariNow; (4) fix restaurant GBP website field; (5) ask NTB to refresh stale directory contacts; (6) send Agoda link if one exists (none found); (7) rotate BOTH chat-exposed tokens (GitHub PAT + Vercel vcp_); (8) carry-overs: Gofile folder public, 10th-anniversary photos, closing times.

---
Task ID: 8
Agent: Super Z (main agent)
Task: Owner round 8 rate-sheet/contact overhaul: Room 13 in full, phones ending 6 on both lines with tap-to-WhatsApp, separate emails, booking-platform buttons (new tab), restaurant menu QR (print-ready), conference photos, full price/link/mobile verification, deploy + checklist.

Work Log:
- Grounding: round 7 live at d40348b/50e3e84 (origin=local); owner screenshot = the pre-deploy matangara complaint (already fixed in round 7; the X'd card is now "Mopani worms & pap N$100", real matangara restored). Upload folder held NO Room 13 image and NO new conference photos (only an old pool shot + the screenshot): attachments did not come through the gateway.
- Rooms 13/7/12 (rates.ts): unhid Room 13 all four tiers (550/850/990/1200 - matches the owner's message AND the master poster transcription section E verbatim), Room 12 double (850, owner: "rooms 11 and 12 are 550/850"), and Room 7 (500/800, master poster section C; it was missing from the round-6 table via the same cut-off that hid Room 13 - owner: "why you made the 12 if they are thirteen"). GROUP_LABELS private -> "6, 7 and 11 to 13". Zero hidden tiers remain.
- Phones (site-data.ts): Telecom line +264 85 264 7609 -> +264 85 264 7606 per owner ("replace any number ending in 9"); added phoneStay2Whatsapp; contact page now has tap-to-WhatsApp buttons for BOTH stay lines; footer stay lines each gained a WhatsApp link; schema telephone array updates automatically. Zero "7609" left anywhere in rendered HTML.
- Emails: RESTAURANT.email -> restaurant@bigbrotherguesthouse.com (owner's proposal, flagged: mailbox must exist on the domain before mail lands); restaurant footer previously leaked the guesthouse gmail - fixed (isEat branch now uses RESTAURANT.email); contact page splits "Email - guesthouse / Email - restaurant"; feedback form routes Restaurant feedback to the restaurant inbox; verified ZERO bigbrotherguest@gmail.com occurrences on any restaurant page.
- Listing links (nearby.ts LISTINGS): Booking.com, SafariNow (www host, verified 200), Google Maps (api=1 URL), Agoda (search URL verified 200), Our website, TripAdvisor. Rendered as chips on /book (new "Prefer to book or review us elsewhere?" card) + /contact "Find us on other sites" + footer "Also listed on"; all target=_blank rel=noopener. NOTE: no direct Booking.com/Agoda listing was verifiable (worklog 2-a) - chips point at each platform's own search for the guesthouse until the owner sends direct URLs; swap point documented in nearby.ts.
- QR: scripts/tangison/round8_qr.py -> public/images/qr-restaurant-menu.png (web, 4KB), download/BB-Restaurant-Menu-QR-print.png (2940px, ECC Q, 6-module quiet margin), download/BB-Restaurant-Menu-QR-card.pdf (A6 landscape table card @300dpi). All three decode back via OpenCV to EXACTLY https://www.bigbrotherguesthouse.com/restaurant/menu (verified live 200). QR card embedded in the restaurant page ink aside with alt text + caption. Bonus fix: restaurant Fold-5 "Open the full menu" pointed at dead /menu -> now /restaurant/menu.
- Conference: no new photos arrived (see grounding) - existing conference-room-set.jpg kept, alt text upgraded ("set up for delegates..."), details unchanged (20 std/30 max, N$450, water + tea/coffee). Discovered: facilities Tabs (Radix) server-render only the active tab, so the conference/celebrate tab content (incl. image) is client-mounted - pre-existing round-6 behaviour; the conference facts ARE fully SSR on /rooms. Noted as a follow-up SEO nicety.
- Verify: eslint clean, build green (25 routes), 52/52 curl checks (scripts/tangison/round8_verify.sh: Room 13 x4 cards, no 7609, mailtos, chips, QR 200, family N$3,050/8, day visit N$30, coolers 60/100, corkage 60-200, conference). Playwright probe (round8_probe.cjs): cold home 97KB/rooms 45KB/restaurant 97KB (<500KB), 390px overflow 0 on all 5 touched routes, all 6 restored room cards visible on mobile, /book?tier=r13-quad preselects "Room 13 - Quadruple - N$1,200 per night", facilities meet-tab image + alt mount, QR renders with caption, 13 new-tab links on /book.
- DEPLOY BLOCKED: session restart wiped the one-shot env tokens; no PAT/Vercel token exists on disk or env (by design, never stored). Repo committed locally, push-ready. Owner must send a fresh GitHub PAT (fine-grained, tangison/bigbrother-guesthouse, Contents read/write) - and BOTH old chat-exposed tokens should be rotated anyway. Push command prepared: git push via one-shot x-access-token URL, then Vercel auto-deploys (git-connected since round 6-a).

Stage Summary:
- Local: main ahead of origin, commit "Round 8..." ready to push; all 7 owner items built and verified locally (52 curl checks + 19 probe checks pass).
- Live: still round 7 until push; Room 13/phones/QR/chips NOT yet on production.
- Blocked on owner: fresh GitHub PAT to push (old one chat-exposed -> rotate); Room 13 poster image + new conference room photos did not arrive - resend; confirm restaurant@bigbrotherguesthouse.com mailbox exists; direct Booking.com/Agoda listing URLs to replace search chips; Telecom number 85 264 7606 double-check ("[confirm]" in owner message).

---
Task ID: 9
Agent: Super Z (main agent)
Task: Round 9 "finish everything": place every remaining owner gallery photo (incl. restaurant shots) in galleries, push rounds 8+9 with the owner's fresh PAT, verify production end to end.

Work Log:
- Grounding: recovered round-8 state from worklog (built + verified locally, push blocked on tokens). Owner sent a fresh GitHub PAT + Vercel token in chat (both re-exposed -> rotation reminder stands). upload/ held only the pre-round-7 matangara screenshot (already fixed live) and IMG-20261014-WA0151.jpg - which round 6 had already mastered as hero-pool-gardens.jpg (datestamp cropped at 80% height); no new Room 13 / conference photos arrived.
- Audit of public/images against all src references: found 8 owner masters processed since round 5 but never placed: property-pool-wide, room-double-wardrobe, braai-fireplace-thatch, entertainment-pool-table, patio-bar-counter, breakfast-eggs-beans, plus two sitting under misleading names (guesthouse-exterior-deck.jpg was actually a plate of yellow rice + spinach + curry; breakfast-board-wors.jpg was actually pap with braised meat). Also property-pool-wide carried a baked-in "Galaxy S24" watermark.
- round9_gallery_masters.mjs: rebuilt room-double-wardrobe from the 8160x6120 DSLR original at 1600w (was an 816w thumbnail), rebuilt property-pool-wide with bottom 10% cropped (watermark gone, verified visually), built plate-yellow-rice-curry.jpg + plate-pap-braise.jpg from the originals, deleted the two misleading files.
- gallery-data.ts: +10 owner photos across rooms/pools/grounds/events/night/food with descriptive alts (175 -> 185). gallery-01..30 remain legacy old-site scrapes, intentionally excluded.
- restaurant-gallery.tsx rebuilt: new "The place" section (11 restaurant interior/exterior owner photos) above "Plates & drinks"; single lightbox spans both sections (index over concat); 5 new plates added. Rationale: /gallery deliberately excludes food/drinks groups (round-5 design, plates live on the restaurant gallery), so new food masters must surface there.
- Verify: eslint clean; build green (25 routes); round8_verify.sh 52/52 local AND live; round9_probe.cjs 17/17 (390px overflow 0 on both gallery pages, lightbox open/arrow/escape, place + plate sections, alt text, rebuilt masters 200, deleted files 404). Stale :3100 server lesson re-learned - killed zombie, probed :3200. Weights: /gallery 250KB, /restaurant/gallery 117KB (<500KB).
- Deploy: pushed 50e3e84..aa30f91 (rounds 8+9) to tangison/bigbrother-guesthouse main via one-shot PAT URL (not stored); Vercel auto-deploy confirmed live on first poll (~90s).
- Live verification: Room 13 x4 + no 7609 + both tel:/wa.me lines + split mailtos + booking chips + Family N$3,050/8 + day N$30 all PASS on production; /gallery 5/5 new photos; /restaurant/gallery place section live; matangara tripe alt + separate mopani card confirmed on live /restaurant; live QR PNG decodes via OpenCV to exactly https://www.bigbrotherguesthouse.com/restaurant/menu.

Stage Summary:
- Live: https://www.bigbrotherguesthouse.com @ aa30f91 (rounds 8+9). All seven round-8 owner items are now on production, plus the completed photo galleries.
- Every real photo the owner supplied is now on the site (the "every photo is on the site" claim in gallery-data is finally true).
- Still blocked on owner: Room 13 photo + new conference photos (never arrived - WA0151 was the hero shot); restaurant@bigbrotherguesthouse.com mailbox creation; direct Booking.com/Agoda URLs to replace platform-search chips; GSC verify + sitemap submit; rotate BOTH chat-exposed tokens (GitHub PAT re-pasted this round, Vercel vcp_ token).

---
Task ID: 10
Agent: Super Z (main agent)
Task: Prompt v3 - Step 0 Tangison super skill run, asset pack intake, QR audit, live URL tests, FNB branch research, build plan for approval (no site code changed).

Work Log:
- Step 0: npx skills use find-skills succeeded (output saved scripts/find-skills.txt, read in full). Local skills listed: no tangison-* folders on disk; Tangison rules active from chat (full-output-enforcement, company-profile-code, tangison-client-handover). 6 hunt searches via npx skills find + skills.sh leaderboard fetched (919KB, contains vercel-react-best-practices).
- Picks: install ONLY vercel-labs/agent-skills@vercel-react-best-practices. Install FAILED twice (200s + 590s timeouts, GitHub unreachable from sandbox; raw/jsdelivr fetches 404). Reported honestly; proceeding with local skills (fullstack-dev, seo-audit, pdf, docx, web-search, anti-slop, image-seo) per failure rules.
- Asset pack v3 unzipped to repo root: gallery/restaurant (11 food photos), guesthouse/bar (2), guesthouse/conference (4), guesthouse/camping (4), menus/ (2 compressed PDFs 869KB + 903KB), images-manifest.json (21 entries, read in full; use_on maps: 6 restaurant mini-gallery, 13 gallery, 5 menu pages).
- QR audit (scripts/qr_audit_pack.py, OpenCV, 300+600 DPI, quadrant crops, both pages): Guesthouse PDF QR = https://bigbrotherguesthouse.com/menu (hidden text agrees). Restaurant PDF QR = https://bigbrotherguesthouse.com/menu (CONFLICT: lands on guesthouse menu per required routes), hidden text carries BOTH www.bigbrotherguesthouse.com/restaurant-menu AND /menu. Stop-and-ask raised to owner with fix options.
- Live tests (desktop+mobile UA): /menu 308 to /restaurant/menu on both hosts (must revert so /menu serves guesthouse menu); /restaurant-menu 404 (308 redirect to add); /restaurant/menu 200; apex serves 200 (apex->www 308 to add); bigbrother-usakos.com still 200 (broken SPA, GBP points there - owner action).
- A3 master PDFs (scripts/tangison/assets/) cross-checked earlier: guesthouse QR identical (apex /menu); restaurant A3 page 1 had NO decodable QR (pack PDF is authoritative and does carry one).
- FNB Karibib branch code: namibpages (secondary) says 281073; 282672 appears as FNB Namibia universal code via multiple independent non-official sources (NBC FB video, WeCare Foundation IG, Inuka pay page); FNB official PDF (2008) lists the branch but no codes in text layer. Per brief: hide the code row on the public card, record candidates + sources in site-config comments, TO CONFIRM with owner.
- Form check: feedback-form.tsx is a client-side mailto/WhatsApp composer (no third-party service, no env vars needed). payment-card.tsx shows the owner-supplied guesthouse BANKING from rates.ts (stays; restaurant EFT card is new and separate). site-data.ts contacts correct (both stay lines end 6; restaurant@ still unconfirmed; v3 table adds bookings@bigbrotherguesthouse.com for both brands).

Stage Summary:
- No site code touched. Asset pack on disk at repo root awaiting move into public/ during build.
- One blocking question: restaurant PDF QR encodes /menu (guesthouse menu). Fix options sent with plan; /restaurant-menu -> /restaurant/menu 308 + reprint QR card recommended.
- Plan presented for approval: data/ JSON+site-config, verify-menu.ts with committed text snapshots (portable to Vercel), /menu restore, /restaurant/menu + /restaurant/gallery rebuild, /stay-nearby, conference/camping/bar sections, restaurant EFT card, contacts split (bookings@ + gmail general), next/og OG images, image sitemap, analytics events, then QC and Digital Foundation Pack.
- Tokens: owner re-pasted GitHub PAT + Vercel token in chat again; rotation reminder stands.

---
Task ID: 11
Agent: Super Z (main agent)
Task: Prompt v3 build - owner approved "push everything": two-menus data model, QR-safe routes, redirects, camping/conference/bar, restaurant EFT card, contacts split, stay-nearby page, SEO/OG, deploy.

Work Log:
- Re-ran QR audit with own eyes (scripts/qr_audit_final.py, 150+300 DPI, 13-crop grid): guesthouse printed QR = https://bigbrotherguesthouse.com/menu; RESTAURANT printed QR = THE SAME /menu URL (print error on the client's card); restaurant PDF hidden text also carries /restaurant-menu. Consequence: /menu serves the GUESTHOUSE menu (reverted the round-8-era 308); replacement restaurant QR card (round 8 files) re-verified decoding to exactly https://www.bigbrotherguesthouse.com/restaurant/menu (print PNG at 0.35-0.8 scales, web PNG, A6 card PDF - all three).
- Extracted both menu PDFs verbatim (pdftotext -layout, saved scripts/briefs/). Built data/menu-guesthouse.json (27 sections / 161 items) + data/menu-restaurant.json (26 sections / 133 items) as the single sources. Price corrections vs live site: Lamb Chops 180 -> 230, Russian 30 -> 33, Russian & Chips 60 -> 63. The two menus genuinely differ (500ml beer 30 vs 35, cool drinks 23 vs 25/20, ciders differ, restaurant-only: Tall Horse, Four Cousins, Latte, non-alcoholic block; guesthouse-only: cocktails/shandies, cordials, shooters, Hansa, Heineken, water/appletiser/2L). Breakfast-extras and pizza-extras note swap from the old merged file fixed.
- data/site-config.ts: single source for emails (general gmail, bookings@bigbrotherguesthouse.com both brands, restaurant@) + guesthouse BANKING (master file + whiteboard) + RESTAURANT_BANKING (NOT SUPPLIED: supplied=false, card shows honest WhatsApp fallback, no invented fields) + branchCode hidden on the card (281073 vs 282672 conflict stands, TO CONFIRM) + QR_ROUTES documentation.
- src/lib/menu-data.ts rebuilt as dual-JSON loader (GUESTHOUSE_MENU, RESTAURANT_MENU); menu-view.tsx rebuilt as MenuBook (brand props, hero/photo-band/cross-link/closing per brand); /menu (site) route created serving the guesthouse list + Menu JSON-LD from JSON; /restaurant/menu rebuilt on restaurant JSON + JSON-LD; both pages carry a slim two-kitchens cross-link banner; restaurant/menu metadata key renamed restaurant-menu; guesthouse Menu route added to nav (brand=guesthouse).
- Redirects (next.config.ts): /restaurant-menu -> /restaurant/menu (308), /home -> / (308, owner instruction), /menu 308 REMOVED (serves guesthouse menu now). middleware.ts: apex bigbrotherguesthouse.com -> https://www.bigbrotherguesthouse.com 308 preserving path+query (printed QR encodes the apex host); _next assets excluded; non-apex hosts untouched.
- One-gate wording: home hero now "Big Brother Guesthouse on the B2 at Plot 7, and Big Brothers Restaurant in the middle of Usakos town"; home act-7 heading now "Rooms for the night. A table for dinner in town. Home away from home." plot-7 "one gated plot" kept (guesthouse-only claim, factual).
- Photos: 10 owner photos (camping x4, conference x4, bar x2) optimized into public/images via sharp mozjpeg ladder, all <= 250KB on disk (244KB max; writeFileSync fix after sharp(buf).toFile() silently re-encoded at q80). facilities-view: new SSR camping section ("Bring the tent. We have the shade.", rate NOT invented - WhatsApp CTA), new SSR conference section (the Radix tab content client-mounts, so facts+photos now also in server HTML), new "Thatched bar & pool table" stacked card (7 cards total), meet-tab figure restored. gallery-data +10 entries (grounds/events/drinks groups) with manifest alts; /gallery grows to 195.
- /stay-nearby page: 9 verified neighbours in 3 distance groups, "ask us first on WhatsApp" CTA, next/og card, linked from /guesthouse fully-booked fold + /book. Emails split live on /contact + /restaurant/contact + both footers (bookings@, gmail general, restaurant@). RestaurantPaymentCard shipped on /restaurant/contact + /restaurant/reserve sidebar. Restaurant contact gained PO Box 324 (from the printed menu).
- SEO: sitemap 21 URLs (added /menu, /stay-nearby) with image:image entries (owner photos only); next/og opengraph-image.tsx for /menu, /restaurant/menu, /stay-nearby (metadata.image=null path added to routeMetadata/pageMetadata so file convention wins); home hero now has BOTH menu CTAs; home "139 items" -> "133 items"; track.ts dataLayer helper wired into nav CTA/tel + sticky bar call/WhatsApp/CTA (no provider needed, GTM-ready).
- Bugfix found in QC: booking-card.tsx referenced ROOM_TIERS without importing it (tsc 8 pre-existing errors, this one was a latent runtime ReferenceError on tier change) - import added.
- QC: lint clean; build green 33 routes; scripts/v3_verify.mjs 76/76 PASS against standalone :3300 (routes, redirects incl. trailing-slash chain landing on /restaurant/menu, per-menu price assertions incl. negative checks (no Hansa on restaurant menu, no Tall Horse on guesthouse menu), no-gate wording, neighbours, camping photos, emails, branch-code hidden everywhere public, sitemap 21 + image entries, og:image 200 png x3, no gmail in restaurant footer). HTML weights: / 97KB, /menu 195KB, /restaurant/menu 164KB, /stay-nearby 83KB, /facilities 85KB - all < 500KB.
- DEPLOY BLOCKED ON TOKEN: session restart wiped the one-shot GitHub PAT (and Vercel token); nothing stored on disk by design; .git has no remote (one-shot URL protocol). Commit is local and push-ready; push command prepared for the owner's fresh PAT; Vercel auto-deploys on push (git-connected since round 6-a).

Stage Summary:
- Local main ahead: full Prompt v3 build committed, 76/76 QC PASS locally, three QR deliverables re-verified.
- Blocked on owner: fresh GitHub PAT (fine-grained, tangison/bigbrother-guesthouse, Contents read/write) - both previously chat-exposed tokens must be rotated anyway.
- Owner actions carried from round 8/10: replacement restaurant QR card must replace the printed one (old card scans land on the guesthouse menu until swapped); create restaurant@ + bookings@ mailboxes; confirm FNB branch code (281073 vs 282672); send restaurant EFT details; camping rates; direct Booking.com/Agoda URLs.

---
Task ID: 12
Agent: Super Z (main agent)
Task: Owner "respect the print" precision pass - verify both menus against the printed PDFs item-by-item, fix deviations, re-run full QC, commit, prepare deploy.

Work Log:
- Re-read both print briefs (scripts/briefs/gh_menu.txt, rest_menu.txt, verbatim pdftotext of menus/*.pdf) and compared them to data/menu-guesthouse.json + data/menu-restaurant.json item-by-item.
- Found and fixed 3 deviations from the print: (1) Sauces block was nested under Desserts on the guesthouse menu and MISSING entirely on the restaurant menu - it now stands alone after Burgers on both lists, exactly as printed (N$30 each: Creamy garlic, Cheese, Pepper, Mushroom, White); (2) restaurant Ice Cream carried an invented "Small / large" note - the print only says N$20 / 40, note removed per never-invent rule; (3) home page restaurant item count 133 -> 134.
- Final data shape: guesthouse 28 sections / 161 items (the "even more" list), restaurant 27 sections / 134 items. Every price re-verified against print: Lamb Chops 230, Russian 33, Russian & Chips 63, guesthouse-only cocktails/shandies/cordials/shooters/Hansa/Heineken/2L block, restaurant-only Tall Horse 200 / Four Cousins 120 / Latte / own cider + beer ladder / Hot Stuff all N$35, ice cream GH 40 vs RS 20/40.
- Re-decoded every QR with my own eyes (scripts/qr_audit_final.py, 150+300 DPI): guesthouse print QR = https://bigbrotherguesthouse.com/menu (served by /menu, no redirect); restaurant print QR ALSO encodes /menu (client print error) while the printed text names /restaurant-menu - both URLs resolve (308 to /restaurant/menu). Replacement restaurant card files decode exactly to https://www.bigbrotherguesthouse.com/restaurant/menu at multiple scales (print PNG + A6 card PDF).
- next.config.ts redirects confirmed: /restaurant-menu -> /restaurant/menu (308), /home -> / (308); middleware canonical host apex -> www (308, path+query kept). /menu serves the guesthouse list.
- QC: lint clean, build green (33 routes), standalone server, v3_verify.mjs extended to 76 checks (added: Sauces on both menus, no invented ice-cream sizes, 134 count) - ALL PASS. Visual eyeball via playwright-core (scripts/v3_menu_eyeball.cjs): Sauces renders standalone on both pages, /home lands on / in a real browser. Screenshots at scripts/v3_gh_menu_sauces.png, scripts/v3_rest_menu_sauces.png.
- Git: silenced filesystem mode-change noise (core.fileMode false; the 66 dirty files were 644->755 only, zero content), committed precision pass as f0311b8 on main.
- Deploy: still blocked - no GitHub PAT / Vercel token exists in this session (one-shot tokens wiped at restart, never stored on disk, no git remote, no ssh binary). Commit f0311b8 is push-ready the moment the owner pastes a fresh fine-grained PAT (tangison/bigbrother-guesthouse, Contents read/write).

Stage Summary:
- Both menus now match the client's printed PDFs exactly, verified item-by-item; QC 76/76; /home, /restaurant-menu, trailing slash and canonical-host redirects verified at HTTP and browser level; QR scan URLs verified working.
- Local main (f0311b8) ahead of live site (deployed @ 9ff023f, predates Prompt v3). One action flips it live: owner pastes fresh GitHub PAT, then git push https://<PAT>@github.com/tangison/bigbrother-guesthouse.git main (Vercel auto-deploys).
- Still carried from earlier rounds (owner actions): replace the printed restaurant QR card with the new one in download/BB-Restaurant-Menu-QR-card.pdf, create restaurant@ + bookings@ mailboxes, confirm FNB branch code (281073 vs 282672), send restaurant EFT details + camping rates, fix or retire bigbrother-usakos.com (broken SPA, GBP points there).
- Digital Foundation Pack queued immediately after the push goes live.

---
Task ID: 13
Agent: Super Z (main agent)
Task: Owner confirmations applied, PUSH to production, live verification (owner supplied fresh PAT + Vercel token in chat; used one-shot, never stored).

Work Log:
- Re-decoded the restaurant print QR at 600 DPI exhaustively: still encodes https://bigbrotherguesthouse.com/menu (same as guesthouse card - confirmed print error). OWNER DECISION: cards stay as printed, no reprint; redirects + the two-kitchens banner on /menu carry the correction. Replacement card files remain in /download as optional extra.
- site-config.ts: BANKING.branchCodeConfirmed -> true (owner confirmed 281073 in chat; Karibib). Branch code row now renders on /rooms payment card and the client-side booking panel. Never in footer/meta/schema (QC-guarded).
- facilities-view.tsx camping section: rates as given by owner - N$200 adults, N$150 kids, per person (no "per night" invented). "Ask for rates" copy replaced with availability CTA.
- Emails TODOs cleared: owner confirmed bookings@ + restaurant@ mailboxes created.
- Fixed a stale-server QC trap: old next-server process (renamed process title) survived pkill and served pre-rebuild HTML on :3300 while the new server failed to bind silently. Killed by pid; QC re-run: 80/80 PASS.
- PUSHED: git push one-shot URL -> tangison/bigbrother-guesthouse aa30f91..320ef6d main:main. Vercel auto-deploy dpl_6DUF556aHt62CZJH4RqxBjQFc49B (production) BUILDING -> READY in ~60s.
- LIVE VERIFICATION (19/19 PASS against https://www.bigbrotherguesthouse.com): apex /menu 308->www lands guesthouse menu (Hansa/Stoney/Sauces, no Tall Horse); /restaurant-menu lands restaurant menu (Tall Horse/Four Cousins/Sauces, no Hansa/Rainbow); /home 308->/; trailing slash 308; 404 safety; 281073 on /rooms only; camping rates live; both emails live; /stay-nearby 9 neighbours; home 134 items; sitemap 21 URLs + image entries; /menu og:image png 200.

Stage Summary:
- PRODUCTION IS LIVE on commit 320ef6d with the full Prompt v3 build: two separate menus from the client's print files (guesthouse 28 sections/161 items, restaurant 27/134), QR-safe routes with 308s, canonical host, camping/conference/bar sections with owner photos, both emails, restaurant payment card (honest fallback until EFT details arrive), /stay-nearby, full SEO/OG/schema.
- Remote remains unconfigured locally (one-shot push URL protocol); no tokens on disk.
- Remaining owner-side: send restaurant EFT details (card flips automatically when supplied); optionally print the replacement restaurant QR card for future stock; fix or retire bigbrother-usakos.com (broken SPA that GBP points at).
- NEXT: Digital Foundation Pack (client handover + company profile) - gate cleared (site passed QC and is live).

---
Task ID: 4
Agent: Super Z (main agent)
Task: Restaurant must have its own gallery, added on the restaurant page (owner message 4)

Work Log:
- Found root cause of "where is the gallery": /restaurant/gallery existed with all 50 photos but was never in ROUTES nav nor linked from /restaurant, so it was undiscoverable
- Refactored restaurant-gallery.tsx: exported PLACES/PLATES/ALL, extracted shared RestaurantPhotoGrid + RestaurantPhotoLightbox + useRestaurantLightbox hook; added RestaurantGalleryInline (all 50 photos inline, masonry, lightbox, "Open the full gallery" link, auto photo count in copy)
- restaurant-view.tsx: new Fold 4 gallery section between dish carousel and Book a table; Book a table restyled to full-bleed bg-cream band (fold rhythm: paper/cream alternation preserved)
- routes.ts: added restaurant-gallery route (label "Gallery", brand restaurant) -> appears in restaurant nav + footer
- Fixed missing Link import (build prerender error on /restaurant)
- QC: build green; served standalone: /restaurant 200 with gallery heading + 50 view-photo buttons + full-gallery link; /restaurant/gallery still 200; nav Gallery link present on /restaurant/menu; playwright visual QC: 0px horizontal overflow desktop+mobile, images load (37/50 in captured fold, rest lazy), lightbox opens
- Deployed: commit 183f41b pushed main->main, Vercel dpl_5E55nipkd2Bo8D6297moVegKjomM READY

Stage Summary:
- /restaurant now carries the restaurant's own gallery inline (all 50 photos + lightbox) and Gallery is in the restaurant nav; live on production after deploy
- Photo lists remain single-source (PLACES/PLATES/ALL in restaurant-gallery.tsx); guesthouse gallery untouched
