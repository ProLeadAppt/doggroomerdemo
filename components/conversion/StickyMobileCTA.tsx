"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import Link from "next/link";
import { brand } from "@/data/site";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      const bookingSection = document.getElementById("booking");
      const bookingVisible = bookingSection
        ? bookingSection.getBoundingClientRect().top < window.innerHeight
        : false;

      setVisible(window.scrollY > heroHeight && !bookingVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 inset-x-0 z-40 lg:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="bg-white/95 backdrop-blur-lg border-t border-pw-border px-4 py-2.5 sm:py-3 flex gap-3">
            <Link
              href="/booking"
              className="flex-1 bg-pw-terracotta text-white text-center py-3 min-h-[48px] flex items-center justify-center rounded-full font-display font-bold text-sm"
            >
              Book Your Pup&apos;s Pamper Day
            </Link>
            <a
              href={`tel:${brand.phone.replace(/\s/g, "")}`}
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-pw-sage text-pw-sage"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
