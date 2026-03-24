import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactPageContent } from "@/components/pages/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Pawsome & Co. Visit us at 12 Darling Street, Balmain NSW 2041. Call (02) 8912 3456 or send us a message.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-pw-cream text-pw-charcoal">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <ContactPageContent />
      </main>
      <SiteFooter />
    </div>
  );
}
