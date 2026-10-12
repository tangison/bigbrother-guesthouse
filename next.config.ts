import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* Photo-led pages need a small ladder of qualities; Next 16 requires
     every used quality to be declared here. */
  images: {
    qualities: [52, 55, 60, 75],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
