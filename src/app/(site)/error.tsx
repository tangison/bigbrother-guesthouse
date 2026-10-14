"use client";

import { useEffect } from "react";
import Link from "next/link";
import { BIZ } from "@/lib/site-data";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surfaces the fault in the server logs only, never to guests.
    console.error(error);
  }, [error]);

  return (
    <section className="bg-ink-soft text-paper" aria-label="Server error">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-6 md:py-28">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">Kitchen hiccup</p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-tight md:text-7xl">
            500. Something burned in the back.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/80">
            The page hit a problem on our side, not yours. Try again with the button below. If it keeps happening,
            call or WhatsApp us and we will sort you out the old-fashioned way: by voice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={reset}
              className="rounded-full bg-paper px-6 py-3 font-semibold text-ink transition-colors hover:bg-ember"
            >
              Try again
            </button>
            <Link href="/" className="rounded-full border border-paper/30 px-6 py-3 font-semibold text-paper">
              Back to the home page
            </Link>
            <a
              href={`tel:${BIZ.guesthouse.phone1}`}
              className="rounded-full border border-paper/30 px-6 py-3 font-semibold text-paper"
            >
              Call {BIZ.guesthouse.phone1Display}
            </a>
          </div>
          {error.digest && <p className="mt-6 font-mono text-xs text-paper/50">Reference: {error.digest}</p>}
        </div>
        <div className="hidden justify-center md:flex" aria-hidden="true">
          <p className="font-display text-[10rem] font-bold leading-none text-paper/10">500</p>
        </div>
      </div>
    </section>
  );
}
