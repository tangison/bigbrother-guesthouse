import type { Metadata } from "next";
import { ROUTES } from "./routes";

const OG_DEFAULT = "/images/og-guesthouse.jpg";

export function routeMetadata(key: string, image?: string): Metadata {
  const r = ROUTES.find((x) => x.key === key);
  if (!r) return {};
  const ogImage = image ?? OG_DEFAULT;
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
      images: [{ url: ogImage, width: 1600, height: 1200, alt: r.title }],
    },
    twitter: { card: "summary_large_image", title: r.title, description: r.description, images: [ogImage] },
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
  image?: string;
}): Metadata {
  const ogImage = opts.image ?? OG_DEFAULT;
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
      images: [{ url: ogImage, width: 1600, height: 1200, alt: opts.title }],
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description, images: [ogImage] },
  };
}
