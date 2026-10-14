import type { Metadata } from "next";
import { GalleryView } from "@/components/site/gallery-view";
import { routeMetadata } from "@/lib/metadata";

export const metadata: Metadata = routeMetadata("gallery");

export default function GalleryPage() {
  return <GalleryView />;
}
