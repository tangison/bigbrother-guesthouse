import Link from "next/link";
import Image from "next/image";
import { BIZ, wa } from "@/lib/site-data";
import { ROUTES, LEGAL_ROUTES } from "@/lib/routes";

/* Ft5 Statement footer. One large display sentence closes the page.
 * Beneath it: both real client logos, contact lines, the legal row with
 * the current year and the registered entity, and the permanent,
 * hardcoded Tangison Studio credit (webmaster checklist, non-removable). */
export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 md:px-6 md:pt-24">
        <p className="max-w-[24ch] font-display text-[clamp(1.9rem,5vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
          The B2 is long. Stop where the road gets friendly.
        </p>

        <div className="mt-10 grid gap-10 border-t border-paper/15 pt-10 md:grid-cols-[1.1fr_1fr_0.9fr]">
          {/* Brand marks: both real logos, exactly as the client drew them */}
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-block rounded-lg bg-white p-2">
                <Image
                  src="/images/logo-guesthouse.jpg"
                  alt="Big Brother Guesthouse logo"
                  width={547}
                  height={323}
                  className="h-12 w-auto"
                />
              </span>
              <Image
                src="/images/logo-restaurant.jpg"
                alt="Big Brothers Restaurant badge, established 2023"
                width={720}
                height={847}
                className="h-16 w-16 rounded-full border-2 border-leaf/40 object-cover"
              />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/70">
              A guesthouse, a bed and breakfast, and a restaurant in one welcoming stop on the B2
              in Usakos, on the bench of the Khan River.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-leaf">
              Restaurant est. {BIZ.established.restaurant} · {BIZ.guesthouse.tagline}
            </p>
          </div>

          <div className="text-sm">
            <p className="font-display text-lg font-semibold">Find us</p>
            <address className="mt-3 not-italic leading-relaxed text-paper/80">
              {BIZ.address.street}
              <br />
              {BIZ.address.area}
              <br />
              {BIZ.address.town}, {BIZ.address.region}, {BIZ.address.country}
            </address>
            <p className="mt-3 text-paper/70">
              {BIZ.distances.swakopmundKm} km from Swakopmund · {BIZ.distances.windhoekKm} km from
              Windhoek
            </p>
          </div>

          <div className="text-sm">
            <p className="font-display text-lg font-semibold">Talk to us</p>
            <ul className="mt-3 space-y-2 text-paper/80">
              <li>
                <a
                  className="font-semibold text-paper underline decoration-leaf/60 underline-offset-4 hover:decoration-leaf"
                  href={`tel:${BIZ.guesthouse.phone1}`}
                >
                  Stay: {BIZ.guesthouse.phone1Display}
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-paper underline decoration-ember/70 underline-offset-4 hover:decoration-ember"
                  href={`tel:${BIZ.restaurant.phone}`}
                >
                  Eat: {BIZ.restaurant.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  className="underline decoration-paper/40 underline-offset-4 hover:decoration-paper"
                  href={`mailto:${BIZ.guesthouse.email}`}
                >
                  {BIZ.guesthouse.email}
                </a>
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                className="rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-leaf"
                href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, I would like to book a room.")}
              >
                WhatsApp bookings
              </a>
              <a
                className="rounded-full border border-paper/30 px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-paper/10"
                href={BIZ.socials.facebook}
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-paper/15 pt-5">
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-paper/60 md:flex-row">
            <p>© {new Date().getFullYear()} Big Brother Holdings, Usakos, Namibia. All rights reserved.</p>
            <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1" aria-label="Footer navigation">
              {ROUTES.map((r) => (
                <Link key={r.key} className="transition-colors hover:text-paper" href={r.path}>
                  {r.label}
                </Link>
              ))}
              {LEGAL_ROUTES.map((r) => (
                <Link key={r.path} className="transition-colors hover:text-paper" href={r.path}>
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
                  className="font-semibold text-paper/80 underline decoration-leaf/50 underline-offset-4 hover:text-paper"
                  href="https://studio.tangison.com"
                  rel="noopener"
                >
                  Tangison Studio
                </a>
              </p>
              <p>Prices on this site come from our own printed menu, dated {new Date().getFullYear()}.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
