import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { GalleryPageContent } from "@/components/pages/GalleryPageContent";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See the Pawsome difference. Before & after transformations, breed-specific grooms, and happy pups from our Balmain studio.",
};

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-pw-cream text-pw-charcoal">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <GalleryPageContent />
      </main>
      <SiteFooter />
    </div>
  );
}
