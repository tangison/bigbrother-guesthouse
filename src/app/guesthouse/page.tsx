import type { Metadata } from "next";
import { GuesthouseView } from "@/components/site/guesthouse-view";
import { routeMetadata } from "@/lib/metadata";

export const metadata: Metadata = routeMetadata("guesthouse", "/images/dish-feast.jpg");

export default function GuesthousePage() {
  return <GuesthouseView />;
}
