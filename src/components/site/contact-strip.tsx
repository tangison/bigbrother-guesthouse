import { GUESTHOUSE, RESTAURANT, type Brand } from "@/lib/site-data";

/* The slim always-on contact strip (32-36px): the old 4px brand line grown up.
 * Both numbers, current brand first, working tel: links on every page.
 * Opaque ink ground so page text never shows through; safe-area aware. */
export function ContactStrip({ brand }: { brand: Brand }) {
  const stay = (
    <a
      href={`tel:${GUESTHOUSE.phoneStay}`}
      className="flex min-h-[24px] items-center gap-1.5 whitespace-nowrap transition-colors hover:text-paper"
      aria-label="Call the guesthouse"
    >
      <span className="font-semibold opacity-60">Stay</span>
      <span className="font-semibold tabular-nums">{GUESTHOUSE.phoneStayDisplay}</span>
    </a>
  );
  const eat = (
    <a
      href={`tel:${RESTAURANT.phoneEat}`}
      className="flex min-h-[24px] items-center gap-1.5 whitespace-nowrap transition-colors hover:text-paper"
      aria-label="Call the restaurant"
    >
      <span className="font-semibold opacity-60">Eat</span>
      <span className="font-semibold tabular-nums">{RESTAURANT.phoneEatDisplay}</span>
    </a>
  );
  return (
    <div className="contact-strip w-full">
      {/* The brand gradient edge: orange-to-black for the Guesthouse,
       * lime-to-black for the Restaurant. */}
      <div
        aria-hidden="true"
        className={`h-[3px] w-full ${
          brand === "guesthouse"
            ? "bg-[linear-gradient(90deg,#ed6d0a_0%,#ed6d0a_45%,#131512_100%)]"
            : "bg-[linear-gradient(90deg,#a6e406_0%,#a6e406_45%,#080c06_100%)]"
        }`}
      />
      <div className="mx-auto flex h-[30px] max-w-6xl items-center justify-between gap-3 px-4 text-[12px] md:px-6 md:text-[13px]">
        <span className="truncate text-[11px] uppercase tracking-[0.14em] opacity-70">
          {brand === "guesthouse" ? "Big Brother Guesthouse" : "Big Brothers Restaurant"}
        </span>
        <span className="flex shrink-0 items-center gap-3 md:gap-5">
          {brand === "guesthouse" ? (
            <>
              {stay}
              {eat}
            </>
          ) : (
            <>
              {eat}
              {stay}
            </>
          )}
        </span>
      </div>
    </div>
  );
}
