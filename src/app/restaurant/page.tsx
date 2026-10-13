import type { Metadata } from "next";
import { RestaurantView } from "@/components/site/restaurant-view";
import { routeMetadata } from "@/lib/metadata";

export const metadata: Metadata = routeMetadata("restaurant", "/images/hero-braise.jpg");

export default function RestaurantPage() {
  return <RestaurantView />;
}
