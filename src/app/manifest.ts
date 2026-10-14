import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Big Brother Guesthouse, B&B & Restaurant",
    short_name: "Big Brother",
    description:
      "Guesthouse, B&B and restaurant in Usakos, Namibia, on the B2 halfway between Windhoek and Swakopmund.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf5ec",
    theme_color: "#131512",
    icons: [
      { src: "/logos/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/logos/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
