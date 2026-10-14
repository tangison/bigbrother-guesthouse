"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* Scroll-craft engine bridge (skills/scroll-craft, engine copied verbatim to
 * /scrollcraft/scrollcraft.js). The engine is attribute-driven: it reads
 * data-sc-* elements off the server-rendered markup and drives them.
 *
 * Next.js App Router contract:
 * - afterInteractive loads the script once, after hydration, so the engine
 *   never fights React's first paint.
 * - Every pathname change destroys the previous instance (the engine ships
 *   destroy() for exactly this, "client-side routers", issue #6) and mounts a
 *   fresh one on the new tree.
 * - Strict-mode double-invoke is safe: mount() pushes onto instances and the
 *   next pass destroys every recorded instance before mounting again.
 * - Pages without data-sc-act markup mount to a no-op. */

type ScApi = { destroy: () => void };
type ScGlobal = { mount: (root: HTMLElement) => ScApi; instances: ScApi[] };

function destroyAll(w: Window) {
  const sc = (w as unknown as { ScrollCraft?: ScGlobal }).ScrollCraft;
  if (!sc) return;
  for (const api of sc.instances.slice()) {
    try {
      api.destroy();
    } catch {
      /* an instance whose DOM already went away with the old route */
    }
  }
}

export function ScrollEngine() {
  const pathname = usePathname();

  useEffect(() => {
    const w = window as unknown as { ScrollCraft?: ScGlobal };
    if (!w.ScrollCraft) return; // first load: the Script onLoad below mounts
    destroyAll(window);
    w.ScrollCraft.mount(document.body);
  }, [pathname]);

  return (
    <Script
      id="scrollcraft-engine"
      src="/scrollcraft/scrollcraft.js"
      strategy="afterInteractive"
      onLoad={() => {
        const sc = (window as unknown as { ScrollCraft?: ScGlobal }).ScrollCraft;
        if (sc) sc.mount(document.body);
      }}
    />
  );
}
