import Link from "next/link";
import Image from "next/image";
import { GUESTHOUSE, RESTAURANT, HOLDINGS, SOCIALS, wa, GUESTHOUSE_WA_GREETING, type Brand } from "@/lib/site-data";
import { LISTINGS } from "@/lib/nearby";
import { GUESTHOUSE_ROUTES, RESTAURANT_ROUTES, LEGAL_ROUTES } from "@/lib/routes";
import { SocialIcon } from "./social-icons";

/* Two statement footers, one per brand. Guesthouse: on-dark logo variant
 * (the standard logo has black text and would disappear on ink), Stay number
 * first, NTB registration block. Restaurant: lime badge, Eat number first,
 * its own town centre address. Both say "A Big Brother Holdings business",
 * both carry the small cross-brand link that names the different location,
 * and the permanent hardcoded Tangison Studio credit. */
export function SiteFooter({ brand }: { brand: Brand }) {
  const isEat = brand === "restaurant";
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 md:px-6 md:pt-24">
        <p className="max-w-[24ch] font-display text-[clamp(1.9rem,5vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
          {isEat
            ? "Supper is on the coals in town. Come hungry."
            : "The B2 is long. Stop where the road gets friendly."}
        </p>

        <div className="mt-10 grid gap-10 border-t border-paper/15 pt-10 md:grid-cols-[1.1fr_1fr_0.9fr]">
          <div>
            {/* Supplied logo, on-dark variant for the Guesthouse, no box behind it */}
            <Image
              src={isEat ? "/logos/logo-restaurant-192.png" : "/logos/logo-guesthouse-on-dark-192.png"}
              alt={isEat ? "Big Brothers Restaurant, Usakos, est. 2023" : "Big Brother Guesthouse: your home away from home"}
              width={192}
              height={isEat ? 191 : 179}
              sizes="160px"
              className={`${isEat ? "h-20 w-20" : "h-auto w-36"} object-contain`}
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/70">
              {isEat
                ? "Grills, seafood, pizza and a full bar in the middle of Usakos town. A Big Brothers Restaurant plate is made to be shared."
                : "A registered guesthouse on the B2 at Plot 7, Laaste Begin, Usakos, on the bench of the Khan River. Your home away from home."}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-ember">
              {isEat ? `Est. ${RESTAURANT.est} · ${RESTAURANT.tagline}` : GUESTHOUSE.tagline}
            </p>
          </div>

          <div className="text-sm">
            <p className="font-display text-lg font-semibold">{isEat ? "Find the restaurant" : "Find us"}</p>
            <address className="mt-3 not-italic leading-relaxed text-paper/80">
              {isEat ? (
                <>
                  {RESTAURANT.address.street}
                  <br />
                  {RESTAURANT.address.area}
                  <br />
                  {RESTAURANT.address.town}, {RESTAURANT.address.region}
                </>
              ) : (
                <>
                  {GUESTHOUSE.address.street}
                  <br />
                  {GUESTHOUSE.address.area}
                  <br />
                  {GUESTHOUSE.address.town}, {GUESTHOUSE.address.region}
                </>
              )}
            </address>
            {isEat ? (
              <p className="mt-3 text-paper/70">{RESTAURANT.hoursKnown}.</p>
            ) : (
              <p className="mt-3 text-paper/70">
                {GUESTHOUSE.distances.swakopmundKm} km from Swakopmund · {GUESTHOUSE.distances.windhoekKm} km from
                Windhoek
              </p>
            )}
            <a
              className="mt-3 inline-block underline decoration-paper/40 underline-offset-4 hover:decoration-paper"
              href={
                isEat
                  ? "https://www.google.com/maps/search/?api=1&query=Big+Brothers+Restaurant+Theo-Ben+Gurirab+Bismarck+Usakos"
                  : "https://www.google.com/maps/search/?api=1&query=Big+Brother+Guesthouse+Usakos"
              }
              rel="noopener"
              target="_blank"
            >
              Get directions
            </a>
          </div>

          <div className="text-sm">
            <p className="font-display text-lg font-semibold">Talk to us</p>
            <ul className="mt-3 space-y-2 text-paper/80">
              {isEat ? (
                <li>
                  <a
                    className="font-semibold text-paper underline decoration-ember/70 underline-offset-4 hover:decoration-ember"
                    href={`tel:${RESTAURANT.phoneEat}`}
                  >
                    Eat: {RESTAURANT.phoneEatDisplay}
                  </a>
                </li>
              ) : null}
              <li>
                <a
                  className={`underline decoration-paper/40 underline-offset-4 hover:decoration-paper ${isEat ? "" : "font-semibold text-paper decoration-ember/70 hover:decoration-ember"}`}
                  href={`tel:${GUESTHOUSE.phoneStay}`}
                >
                  Stay (MTC): {GUESTHOUSE.phoneStayDisplay}
                </a>{" "}
                <a
                  className="text-xs text-paper/60 underline decoration-paper/40 underline-offset-4 hover:text-paper"
                  href={wa(GUESTHOUSE.phoneStayWhatsapp, GUESTHOUSE_WA_GREETING)}
                  rel="noopener"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  className="underline decoration-paper/40 underline-offset-4 hover:decoration-paper"
                  href={`tel:${GUESTHOUSE.phoneStay2}`}
                >
                  Stay (Telecom): {GUESTHOUSE.phoneStay2Display}
                </a>{" "}
                <a
                  className="text-xs text-paper/60 underline decoration-paper/40 underline-offset-4 hover:text-paper"
                  href={wa(GUESTHOUSE.phoneStay2Whatsapp, GUESTHOUSE_WA_GREETING)}
                  rel="noopener"
                >
                  WhatsApp
                </a>
              </li>
              {!isEat ? (
                <li>
                  <a
                    className="underline decoration-paper/40 underline-offset-4 hover:decoration-paper"
                    href={`tel:${RESTAURANT.phoneEat}`}
                  >
                    Eat: {RESTAURANT.phoneEatDisplay}
                  </a>
                </li>
              ) : null}
              <li>
                <a
                  className="underline decoration-paper/40 underline-offset-4 hover:decoration-paper"
                  href={`mailto:${isEat ? RESTAURANT.email : HOLDINGS.email}`}
                >
                  {isEat ? RESTAURANT.email : HOLDINGS.email}
                </a>
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                className="rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ember hover:text-ink"
                href={
                  isEat
                    ? wa(RESTAURANT.phoneEatWhatsapp, "Hello Big Brothers Restaurant, I would like to reserve a table.")
                    : wa(GUESTHOUSE.phoneStayWhatsapp, GUESTHOUSE_WA_GREETING)
                }
                rel="noopener"
              >
                {isEat ? "WhatsApp the restaurant" : "WhatsApp bookings"}
              </a>
              <div className="flex items-center gap-2" role="group" aria-label="Our social pages">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    rel="noopener"
                    aria-label={`${s.name} (opens in a new tab)`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-paper/30 text-paper transition-colors hover:bg-paper/10"
                  >
                    <SocialIcon name={s.name} size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* NTB registration: from the owner's own certificate, with the
            board's own directory entry linked for verification (the
            namibiatourism.com.na domain currently serves a hosting
            placeholder, verified 15 Oct 2026). */}
        {!isEat && (
          <div className="mt-10 border-t border-paper/15 pt-6 text-xs leading-relaxed text-paper/60">
            <p className="font-semibold text-paper/80">Registered establishment</p>
            <p className="mt-1 max-w-2xl">
              Big Brother Guesthouse is registered with the Namibia Tourism Board as a Guesthouse.
              Registration No. {GUESTHOUSE.ntb.number}, approved {GUESTHOUSE.ntb.approved}, certificate
              awarded {GUESTHOUSE.ntb.certificate}. See our entry in the board&apos;s own directory:{" "}
              <a
                className="underline decoration-paper/40 underline-offset-4 hover:text-paper"
                href={GUESTHOUSE.ntb.directory}
                rel="noopener"
              >
                visitnamibia.com.na/directory/big_brother_guesthouse
              </a>
              .
            </p>
            {/* Booking and listing links (owner round 8): includes Booking.com
             * and Agoda, which point at each platform's own search for the
             * guesthouse until the owner sends the direct listing URLs. */}
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-semibold text-paper/80">Also listed on</span>
              {LISTINGS.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  rel="noopener"
                  target="_blank"
                  className="underline decoration-paper/40 underline-offset-4 hover:text-paper"
                >
                  {l.name}
                </a>
              ))}
            </p>
          </div>
        )}

        {/* Cross-brand link: the two businesses are in different places */}
        <p className="mt-6 text-sm text-paper/70">
          {isEat ? (
            <>
              Staying over?{" "}
              <Link href="/" className="font-semibold text-paper underline decoration-ember/60 underline-offset-4 hover:decoration-ember">
                Big Brother Guesthouse
              </Link>{" "}
              sits at Plot 7 on the B2, a different location.
            </>
          ) : (
            <>
              Eating out?{" "}
              <Link href="/restaurant" className="font-semibold text-paper underline decoration-ember/60 underline-offset-4 hover:decoration-ember">
                Big Brothers Restaurant
              </Link>{" "}
              is in Usakos town centre, a different location.
            </>
          )}
        </p>

        <div className="mt-12 border-t border-paper/15 pt-5">
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-paper/60 md:flex-row">
            <p>
              © {year} {HOLDINGS.name}, Usakos, Namibia. All rights reserved. A Big Brother Holdings business.
            </p>
            <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1" aria-label="Footer navigation">
              {(isEat ? RESTAURANT_ROUTES : GUESTHOUSE_ROUTES).map((r) => (
                <Link key={r.key} prefetch={false} className="transition-colors hover:text-paper" href={r.path}>
                  {r.label}
                </Link>
              ))}
              {LEGAL_ROUTES.map((r) => (
                <Link key={r.path} prefetch={false} className="transition-colors hover:text-paper" href={r.path}>
                  {r.label}
                </Link>
              ))}
            </nav>
          </div>
          {/* Hardcoded studio credit. Mandatory on every Tangison deployment.
              It cannot be styled out or negotiated away. */}
          <div className="mt-4 border-t border-paper/10">
            <div className="flex flex-wrap items-center justify-center gap-2 py-3 text-center text-[11px] tracking-wide text-paper/50 md:justify-between">
              <p>
                Website made by{" "}
                <a
                  className="font-semibold text-paper/80 underline decoration-ember/50 underline-offset-4 hover:text-paper"
                  href="https://studio.tangison.com"
                  rel="noopener"
                >
                  Tangison Studio
                </a>
              </p>
              <p>Prices on this site come from the owner&apos;s own price list and printed menu.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
