import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ServicesPageContent } from "@/components/pages/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Full grooming menu with pricing for all breeds. Bath & Tidy, Full Grooms, Puppy's First Groom, The Works, and VIP Monthly Membership.",
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-pw-cream text-pw-charcoal">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <ServicesPageContent />
      </main>
      <SiteFooter />
    </div>
  );
}
