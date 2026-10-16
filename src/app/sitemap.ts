import type { MetadataRoute } from "next";
import { HOLDINGS } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = HOLDINGS.site;
  const now = new Date();
  const guesthouse = [
    { path: "/", priority: 1, images: ["/images/hero-pool-gardens.jpg", "/images/og-guesthouse.jpg"] },
    { path: "/rooms", priority: 0.9, images: ["/images/og-guesthouse.jpg"] },
    { path: "/book", priority: 0.9 },
    // The guesthouse's own menu: the printed QR target. Keep it indexed.
    { path: "/menu", priority: 0.9, images: ["/images/dish-breakfast.jpg", "/images/plate-pap-braise.jpg"] },
    { path: "/plot-7", priority: 0.8 },
    { path: "/facilities", priority: 0.8, images: ["/images/camping-grounds-thatch.jpg", "/images/conference-tables-chairs.jpg", "/images/bar-thatched-day.jpg"] },
    { path: "/stay-nearby", priority: 0.7 },
    { path: "/vip", priority: 0.7 },
    { path: "/guesthouse", priority: 0.7 },
    { path: "/gallery", priority: 0.6 },
    { path: "/guest-info", priority: 0.5 },
    { path: "/feedback", priority: 0.5 },
    { path: "/contact", priority: 0.7 },
    { path: "/brand", priority: 0.3 },
    { path: "/privacy-policy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];
  const restaurant = [
    { path: "/restaurant", priority: 0.9, images: ["/images/og-restaurant.jpg"] },
    { path: "/restaurant/menu", priority: 0.9, images: ["/images/hero-braise.jpg", "/images/dish-matangara.jpg"] },
    { path: "/restaurant/reserve", priority: 0.8 },
    { path: "/restaurant/gallery", priority: 0.6, images: ["/images/og-restaurant.jpg"] },
    { path: "/restaurant/contact", priority: 0.7 },
  ];
  return [...guesthouse, ...restaurant].map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r.priority,
    // Google reads these as <image:image> entries: an image sitemap entry
    // per page, from the owner's own photos only.
    ...(r.images ? { images: r.images.map((i) => `${base}${i}`) } : {}),
  }));
}
