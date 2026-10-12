import type { MetadataRoute } from "next";
import { BIZ } from "@/lib/site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${BIZ.site}/sitemap.xml`,
  };
}
