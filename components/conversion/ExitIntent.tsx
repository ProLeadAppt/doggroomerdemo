"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

export default function ExitIntent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Desktop only
    if ("ontouchstart" in window) return;

    const alreadyShown = sessionStorage.getItem("pw-exit-intent");
    if (alreadyShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10) {
        setVisible(true);
        sessionStorage.setItem("pw-exit-intent", "true");
        document.removeEventListener("mouseout", handleMouseLeave);
      }
    };

    // Delay activation so it doesn't fire immediately
    const timer = setTimeout(() => {
      document.addEventListener("mouseout", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-1/4 right-0 z-50 w-80 bg-white rounded-l-2xl shadow-pw-xl border border-pw-border p-6 hidden lg:block"
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 text-pw-muted hover:text-pw-charcoal"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
        <p className="font-script text-pw-terracotta text-lg mb-2">
          Before you go...
        </p>
        <h3 className="font-display font-bold text-xl text-pw-charcoal mb-2">
          20% Off Your First Groom
        </h3>
        <p className="text-sm text-pw-muted mb-4">
          New to Pawsome &amp; Co.? Book today and save on your pup&apos;s first pamper session.
        </p>
        <Link
          href="/booking"
          className="block w-full text-center bg-pw-terracotta text-white py-3 rounded-full font-display font-bold text-sm hover:bg-pw-terracotta/90 transition-colors"
        >
          Claim Your 20% Off
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
