import type { Metadata } from "next";
import { FacilitiesView } from "@/components/site/facilities-view";
import { routeMetadata } from "@/lib/metadata";

export const metadata: Metadata = routeMetadata("facilities");

export default function FacilitiesPage() {
  return <FacilitiesView />;
}
