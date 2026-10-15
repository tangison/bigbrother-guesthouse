import { HomeView } from "@/components/site/home-view";
import { routeMetadata } from "@/lib/metadata";

export const metadata = routeMetadata("home", "/images/hero-pool-gardens.jpg");

export default function HomePage() {
  return <HomeView />;
}
