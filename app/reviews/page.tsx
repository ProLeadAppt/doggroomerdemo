import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ReviewsPageContent } from "@/components/pages/ReviewsPageContent";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Rated 4.9 stars with 127+ Google reviews. See what dog owners in Balmain say about Pawsome & Co.",
  openGraph: {
    title: "Reviews | Pawsome & Co.",
    description:
      "Rated 4.9 stars with 127+ Google reviews. See what dog owners in Balmain say about Pawsome & Co.",
    url: "https://doggroomer.netlify.app/reviews",
    siteName: "Pawsome & Co.",
  },
};

export default function ReviewsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-pw-cream text-pw-charcoal">
      <SiteHeader />
      <main className="flex-1">
        <ReviewsPageContent />
      </main>
      <SiteFooter />
    </div>
  );
}
