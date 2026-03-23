import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BookingPageContent } from "@/components/pages/BookingPageContent";

export const metadata: Metadata = {
  title: "Book a Groom | Pawsome & Co.",
  description:
    "Book your dog's next grooming appointment online. Select a service, pick a time, and we'll take care of the rest.",
};

export default function BookingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-pw-cream text-pw-charcoal">
      <SiteHeader />
      <main className="flex-1">
        <BookingPageContent />
      </main>
      <SiteFooter />
    </div>
  );
}
