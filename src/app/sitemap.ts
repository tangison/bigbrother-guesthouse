import type { MetadataRoute } from "next";
import { HOLDINGS } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = HOLDINGS.site;
  const now = new Date();
  const guesthouse = [
    { path: "/", priority: 1 },
    { path: "/rooms", priority: 0.9 },
    { path: "/book", priority: 0.9 },
    { path: "/plot-7", priority: 0.8 },
    { path: "/facilities", priority: 0.8 },
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
    { path: "/restaurant", priority: 0.9 },
    { path: "/restaurant/menu", priority: 0.9 },
    { path: "/restaurant/reserve", priority: 0.8 },
    { path: "/restaurant/gallery", priority: 0.6 },
    { path: "/restaurant/contact", priority: 0.7 },
  ];
  return [...guesthouse, ...restaurant].map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}
