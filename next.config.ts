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
      // QR safety (round v3, 16 Oct 2026). The guesthouse's printed menu
      // QR encodes /menu, so /menu now SERVES the guesthouse menu (the
      // old "/menu -> /restaurant/menu" redirect is gone). The restaurant
      // keeps its own menu at /restaurant/menu.
      //
      // Legacy and misprint-proof targets, permanent 308s:
      // - /restaurant-menu was named in the restaurant menu print as the
      //   scan target; it now lands on the restaurant's own menu.
      // - /home must land on the home page (owner instruction).
      { source: "/restaurant-menu", destination: "/restaurant/menu", permanent: true },
      { source: "/home", destination: "/", permanent: true },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
