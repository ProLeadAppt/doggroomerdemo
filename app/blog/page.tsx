import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BlogListContent } from "@/components/pages/BlogListContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Grooming tips, breed guides, and expert advice from Balmain's favourite dog groomers.",
  openGraph: {
    title: "Blog | Pawsome & Co.",
    description:
      "Grooming tips, breed guides, and expert advice from Balmain's favourite dog groomers.",
    url: "https://doggroomer.netlify.app/blog",
    siteName: "Pawsome & Co.",
  },
};

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-pw-cream text-pw-charcoal">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <BlogListContent />
      </main>
      <SiteFooter />
    </div>
  );
}
