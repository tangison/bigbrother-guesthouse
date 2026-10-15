import { pageMetadata } from "@/lib/metadata";
import { RestaurantGallery } from "@/components/site/restaurant-gallery";

export const metadata = pageMetadata({
  title: "Photo Gallery | Big Brothers Restaurant, Usakos",
  description:
    "Real plates and drinks from Big Brothers Restaurant in Usakos town centre: samoosas, matangara, grills, pizza, seafood and cocktails.",
  path: "/restaurant/gallery",
  image: "/images/og-restaurant.jpg",
});

export default function RestaurantGalleryPage() {
  return <RestaurantGallery />;
}
