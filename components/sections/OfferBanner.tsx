"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function OfferBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("pw-offer-dismissed");
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem("pw-offer-dismissed", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-pw-terracotta overflow-hidden"
        >
          <div className="mx-auto max-w-pw-container px-6 py-3 flex items-center justify-center gap-3 relative">
            <Sparkles className="h-4 w-4 text-white/80 hidden sm:block" />
            <p className="text-sm text-white font-medium text-center">
              First visit?{" "}
              <Link
                href="/booking"
                className="underline underline-offset-2 font-bold hover:text-white/90 transition-colors"
              >
                Get $10 off your first groom
              </Link>{" "}
              <span className="hidden sm:inline">
                &mdash; use code <span className="font-mono font-bold bg-white/20 px-1.5 py-0.5 rounded text-xs">PAWSOME10</span>
              </span>
            </p>
            <button
              onClick={dismiss}
              className="absolute right-4 text-white/60 hover:text-white transition-colors"
              aria-label="Dismiss offer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
