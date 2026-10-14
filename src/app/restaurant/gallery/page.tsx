import type { Metadata } from "next";
import { RestaurantGallery } from "@/components/site/restaurant-gallery";

export const metadata: Metadata = {
  title: "Photo Gallery | Big Brothers Restaurant, Usakos",
  description:
    "Real plates and drinks from Big Brothers Restaurant in Usakos town centre: samoosas, matangara, grills, pizza, seafood and cocktails.",
};

export default function RestaurantGalleryPage() {
  return <RestaurantGallery />;
}
