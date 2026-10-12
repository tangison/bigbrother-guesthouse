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
    theme_color: "#1b1712",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
