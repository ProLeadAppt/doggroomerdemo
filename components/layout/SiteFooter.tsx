"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  PawPrint,
  Instagram,
  Facebook,
  ArrowUp,
  ShieldCheck,
  Award,
  Star,
  Send,
} from "lucide-react";
import { brand, navLinks } from "../../data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  useEffect(() => {
    const handler = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <footer className="relative border-t border-pw-charcoal-light/20 bg-pw-charcoal">
        {/* Animated paw stripe */}
        <div className="paw-stripe-animated h-1 w-full opacity-50" />

        <div className="mx-auto w-full max-w-pw-container px-6 py-16 sm:py-20">
          {/* Trust badges row */}
          <div className="flex flex-wrap justify-center gap-6 mb-14 pb-10 border-b border-white/10">
            {[
              { icon: Award, label: "Certified Groomers" },
              { icon: ShieldCheck, label: "Fully Insured" },
              { icon: Star, label: "4.9\u2605 Google Rated" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-sm text-pw-subtle"
              >
                <badge.icon className="h-4 w-4 text-pw-amber-300" />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand + Newsletter */}
            <div className="space-y-5 sm:col-span-2 lg:col-span-1">
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
                Premium dog grooming in the heart of Balmain. Gentle care,
                expert hands, and tail-wagging results.
              </p>

              {/* Newsletter signup */}
              <div className="pt-2">
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-pw-subtle mb-3">
                  Grooming tips & offers
                </p>
                {emailSubmitted ? (
                  <p className="text-sm text-pw-sage-300">Thanks! You&rsquo;re subscribed.</p>
                ) : (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setNewsletterSubmitting(true);
                      setNewsletterError("");
                      try {
                        const res = await fetch("/api/newsletter", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ email: newsletterEmail }),
                        });
                        if (res.ok) {
                          setEmailSubmitted(true);
                        } else {
                          setNewsletterError("Something went wrong. Please try again.");
                        }
                      } catch {
                        setNewsletterError("Unable to subscribe right now. Please try again later.");
                      } finally {
                        setNewsletterSubmitting(false);
                      }
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="email"
                      placeholder="Your email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      aria-label="Email address"
                      className="flex-1 min-w-0 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-pw-sage/50 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={newsletterSubmitting}
                      aria-label="Subscribe to newsletter"
                      className="w-9 h-9 rounded-full bg-pw-sage flex items-center justify-center hover:bg-pw-sage-400 transition-colors flex-shrink-0 disabled:opacity-50"
                    >
                      <Send className="h-3.5 w-3.5 text-white" />
                    </button>
                  </form>
                )}
                {newsletterError && (
                  <p className="text-xs text-pw-terracotta-300 mt-2">{newsletterError}</p>
                )}
              </div>

              {/* Social icons */}
              <div className="flex gap-3 pt-1">
                {[
                  { icon: Instagram, href: brand.socials.instagram, label: "Instagram" },
                  { icon: Facebook, href: brand.socials.facebook, label: "Facebook" },
                ].map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-pw-subtle hover:text-white hover:border-pw-sage/50 hover:shadow-glow-sage transition-[color,border-color,box-shadow] duration-300"
                  >
                    <social.icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
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
                    className="text-sm text-pw-subtle hover:text-white hover:translate-x-1 transition-[color,transform] duration-200"
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
                {[
                  "Bath & Tidy",
                  "Full Groom",
                  "Puppy\u2019s First Groom",
                  "The Works",
                  "VIP Monthly",
                ].map((service) => (
                  <Link
                    key={service}
                    href="/services"
                    className="text-sm text-pw-subtle hover:text-white hover:translate-x-1 transition-[color,transform] duration-200"
                  >
                    {service}
                  </Link>
                ))}
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

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-pw-teal text-white shadow-pw-lg hover:bg-pw-teal-400 transition-colors flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
