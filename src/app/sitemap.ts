import type { MetadataRoute } from "next";
import { BIZ } from "@/lib/site-data";
import { ROUTES, LEGAL_ROUTES } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    ...ROUTES.map((r) => ({
      url: `${BIZ.site}${r.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: r.key === "home" ? 1 : r.key === "menu" || r.key === "restaurant" ? 0.9 : 0.7,
    })),
    ...LEGAL_ROUTES.map((r) => ({
      url: `${BIZ.site}${r.path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
