import type { Metadata } from "next";
import { ContactView } from "@/components/site/contact-view";
import { routeMetadata } from "@/lib/metadata";

export const metadata: Metadata = routeMetadata("contact");

export default function ContactPage() {
  return <ContactView />;
}
