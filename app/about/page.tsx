import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AboutPageContent } from "@/components/pages/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Balmain's favourite dog grooming studio. Founded in 2019 by Sophie Chen, Pawsome & Co. treats every dog like family.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-pw-cream text-pw-charcoal">
      <SiteHeader />
      <main className="flex-1">
        <AboutPageContent />
      </main>
      <SiteFooter />
    </div>
  );
}
