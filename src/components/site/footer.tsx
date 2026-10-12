import { BIZ, wa } from "@/lib/site-data";
import type { ViewKey } from "./nav";
import { VIEWS } from "./nav";

export function Footer({ go }: { go: (v: ViewKey) => void }) {
  return (
    <footer className="mt-auto border-t border-ink/80 bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-display text-2xl font-semibold">Big Brother Holdings</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-paper/70">
            A guesthouse, a bed and breakfast, and a restaurant in one welcoming stop on the B2 in Usakos.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-leaf">
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
          <p className="mt-3 text-paper/80">
            {BIZ.distances.swakopmundKm} km from Swakopmund · {BIZ.distances.windhoekKm} km from Windhoek
          </p>
        </div>

        <div className="text-sm">
          <p className="font-display text-lg font-semibold">Talk to us</p>
          <ul className="mt-3 space-y-2 text-paper/80">
            <li>
              Guesthouse:{" "}
              <a className="font-semibold text-paper underline decoration-leaf/60 underline-offset-4" href={`tel:${BIZ.guesthouse.phone1}`}>
                {BIZ.guesthouse.phone1Display}
              </a>{" "}
              /{" "}
              <a className="font-semibold text-paper underline decoration-leaf/60 underline-offset-4" href={`tel:${BIZ.guesthouse.phone2}`}>
                {BIZ.guesthouse.phone2Display}
              </a>
            </li>
            <li>
              Restaurant:{" "}
              <a className="font-semibold text-paper underline decoration-ember/70 underline-offset-4" href={`tel:${BIZ.restaurant.phone}`}>
                {BIZ.restaurant.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="underline decoration-ember/70 underline-offset-4" href={`mailto:${BIZ.guesthouse.email}`}>
                {BIZ.guesthouse.email}
              </a>
            </li>
            <li className="flex flex-wrap gap-3 pt-1">
              <a className="rounded-full bg-leaf px-4 py-2 font-semibold text-ink" href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, I would like to book a room.")}>
                WhatsApp bookings
              </a>
              <a className="rounded-full border border-paper/30 px-4 py-2 font-semibold text-paper hover:bg-paper/10" href={BIZ.socials.facebook}>
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-paper/60 md:flex-row md:px-6">
          <p>© 2026 Big Brother Holdings, Usakos, Namibia. All rights reserved.</p>
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1" aria-label="Footer navigation">
            {VIEWS.map((v) => (
              <button key={v.key} className="hover:text-paper" onClick={() => go(v.key)}>
                {v.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
