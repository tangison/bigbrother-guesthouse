import type { Metadata, Viewport } from "next";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
/* Engine CSS is layered from within globals.css (layer(engine), declared before
 * Tailwind's layers) so Tailwind utilities win cascade ties. */
import "./globals.css";
import { ScrollEngine } from "@/components/site/scroll-engine";

/* Root shell only: fonts, global CSS, scroll engine. Brand chrome (nav,
 * footer, strip, sticky bar, schema) lives in the (site) guesthouse layout
 * and the restaurant layout, because the two brands are separate. */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.bigbrotherguesthouse.com"),
  title: {
    default: "Big Brother Guesthouse | Usakos Accommodation on the B2",
    template: "%s | Big Brother",
  },
  description:
    "Home away from home at Plot 7 on the B2 in Usakos. Rooms from N$450, pools, lapa and garden, halfway between Windhoek and Swakopmund.",
};

export const viewport: Viewport = {
  themeColor: "#131512",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main"
          className="sr-only z-[300] rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        {children}
        <ScrollEngine />
        <noscript>
          {/* The engine reveals cue content on mount; without JS the acts must
           * still read. Static layout, everything visible. */}
          <style>{`[data-sc-cue]{opacity:1!important}[data-sc-act]{height:auto!important}[data-sc-stage],.sc-stage{position:static!important;height:auto!important}[data-sc-reveal]{clip-path:none!important}[data-sc-in],[data-sc-stagger]>*{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
