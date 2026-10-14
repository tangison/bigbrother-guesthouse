import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* Photo-led pages need a small ladder of qualities; Next 16 requires
     every used quality to be declared here. AVIF first, WebP fallback:
     Next negotiates via Accept and both formats are verified served. */
  images: {
    qualities: [52, 55, 60, 75],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // The menu belongs to the Restaurant brand. Old URL keeps working.
      { source: "/menu", destination: "/restaurant/menu", permanent: true },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
