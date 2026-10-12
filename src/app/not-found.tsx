import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { BIZ, wa } from "@/lib/site-data";

export default function NotFound() {
  return (
    <section className="bg-ink text-paper" aria-label="Page not found">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-6 md:py-28">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">Wrong turn</p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-tight md:text-7xl">
            404. Even the B2 has a turn-off you can miss.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/80">
            The page you were looking for is not here. The good news: the guesthouse, the menu, and the phone
            number are exactly where they have always been. Pick a direction below and keep going.
          </p>
          <nav className="mt-8 flex flex-wrap gap-3" aria-label="Recovery navigation">
            {ROUTES.map((r) => (
              <Link
                key={r.key}
                href={r.path}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.03] ${
                  r.key === "home" ? "bg-ember text-white" : "border border-paper/30 text-paper"
                }`}
              >
                {r.label}
              </Link>
            ))}
          </nav>
          <p className="mt-8 text-sm text-paper/70">
            Still lost? WhatsApp us on{" "}
            <a
              className="font-semibold text-paper underline decoration-leaf/60 underline-offset-4"
              href={wa(BIZ.guesthouse.phone1, "Hello Big Brother Guesthouse, I am looking for something on your website.")}
            >
              {BIZ.guesthouse.phone1Display}
            </a>{" "}
            and we will point you the right way.
          </p>
        </div>
        <div className="hidden justify-center md:flex" aria-hidden="true">
          <p className="font-display text-[10rem] font-bold leading-none text-paper/10">404</p>
        </div>
      </div>
    </section>
  );
}
