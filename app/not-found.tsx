import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/Button";
import { PawPrint } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-pw-cream text-pw-charcoal">
      <SiteHeader />
      <main id="main-content" className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <PawPrint className="h-16 w-16 text-pw-sage/30 mx-auto mb-6" />
          <h1 className="font-display text-display-xl text-pw-charcoal">
            Ruh-roh!
          </h1>
          <p className="mt-3 text-lg text-pw-muted">
            Looks like this page has wandered off. Let&rsquo;s get you back on the right trail.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/booking">Book a Groom</Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
