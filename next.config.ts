import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* Photo-led pages need a small ladder of qualities; Next 16 requires
     every used quality to be declared here. AVIF first, WebP fallback:
     Next negotiates via Accept and both formats are verified served. */
  images: {
    qualities: [45, 48, 50, 75],
    deviceSizes: [640, 750, 828, 1080, 1200, 1280, 1920, 2048, 3840],
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
