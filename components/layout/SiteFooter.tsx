import Link from "next/link";
import { PawPrint } from "lucide-react";
import { brand, navLinks } from "../../data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-pw-charcoal-light/20 bg-pw-charcoal">
      {/* Decorative paw stripe */}
      <div className="paw-stripe h-1 w-full opacity-40" />

      <div className="mx-auto w-full max-w-pw-container px-6 py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-full border border-pw-sage/30 bg-pw-teal p-1 flex items-center justify-center">
                <PawPrint className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-display text-lg font-bold tracking-wide text-white">
                  Pawsome & Co.
                </p>
                <p className="font-script text-[11px] text-pw-terracotta-200">
                  {brand.tagline}
                </p>
              </div>
            </div>
            <p className="text-sm text-pw-subtle leading-relaxed max-w-xs">
              Premium dog grooming in the heart of Balmain. Gentle care, expert hands, and tail-wagging results.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-pw-subtle">
              Quick Links
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-pw-subtle hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-pw-subtle">
              Services
            </p>
            <nav className="flex flex-col gap-3">
              {["Bath & Tidy", "Full Groom", "Puppy\u2019s First Groom", "The Works", "VIP Monthly"].map(
                (service) => (
                  <Link
                    key={service}
                    href="/services"
                    className="text-sm text-pw-subtle hover:text-white transition-colors"
                  >
                    {service}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-pw-subtle">
              Contact
            </p>
            <div className="space-y-2 text-sm text-pw-subtle">
              <p>{brand.address}</p>
              <Link
                href={`tel:${brand.phone.replace(/\s/g, "")}`}
                className="block hover:text-white transition-colors"
              >
                {brand.phone}
              </Link>
              <Link
                href={`mailto:${brand.email}`}
                className="block hover:text-white transition-colors"
              >
                {brand.email}
              </Link>
              <p>{brand.hoursSummary}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-pw-subtle">
            &copy; {year} Pawsome &amp; Co. All rights reserved.
          </p>
          <p className="text-xs text-pw-subtle">
            Powered by{" "}
            <Link
              href="https://munyal.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pw-terracotta-200 hover:text-pw-terracotta-100 transition-colors"
            >
              Munyal
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
