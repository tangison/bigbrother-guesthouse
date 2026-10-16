import type { Metadata } from "next";
import { ROUTES } from "./routes";

const OG_DEFAULT = "/images/og-guesthouse.jpg";

export function routeMetadata(key: string, image?: string | null): Metadata {
  const r = ROUTES.find((x) => x.key === key);
  if (!r) return {};
  /* image === null: no explicit OG image. The route's file-convention
   * opengraph-image.tsx (next/og) supplies the card instead, and Next
   * injects it into the meta tags. */
  const imgs =
    image === null
      ? undefined
      : [{ url: image ?? OG_DEFAULT, width: 1600, height: 1200, alt: r.title }];
  return {
    title: r.title,
    description: r.description,
    alternates: { canonical: r.path },
    openGraph: {
      title: r.title,
      description: r.description,
      url: r.path,
      siteName: "Big Brother Holdings",
      locale: "en_NA",
      type: "website",
      ...(imgs ? { images: imgs } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: r.title,
      description: r.description,
      ...(imgs ? { images: imgs.map((i) => i.url) } : {}),
    },
  };
}

/* Same shape as routeMetadata for pages that have no ROUTES entry (legal,
 * booking, feedback and the restaurant's secondary pages). Every page gets
 * Open Graph and Twitter cards; the SEO audit of 15 Oct 2026 found pages
 * without them. */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  /** null: let the route's opengraph-image file convention supply the card. */
  image?: string | null;
}): Metadata {
  const imgs =
    opts.image === null
      ? undefined
      : [{ url: opts.image ?? OG_DEFAULT, width: 1600, height: 1200, alt: opts.title }];
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: opts.path,
      siteName: "Big Brother Holdings",
      locale: "en_NA",
      type: "website",
      ...(imgs ? { images: imgs } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      ...(imgs ? { images: imgs.map((i) => i.url) } : {}),
    },
  };
}
