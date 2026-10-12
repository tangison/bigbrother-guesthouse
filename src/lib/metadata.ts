import type { Metadata } from "next";
import { ROUTES } from "./routes";

export function routeMetadata(key: string, image?: string): Metadata {
  const r = ROUTES.find((x) => x.key === key);
  if (!r) return {};
  const ogImage = image ?? "/images/hero-platter.jpg";
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
