"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("pw-cookie-consent");
    if (!consent) {
      // Delay showing banner so it doesn't compete with page load
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("pw-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("pw-cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          className="fixed bottom-0 left-0 right-0 z-[9990] p-4"
        >
          <div className="mx-auto max-w-pw-container rounded-2xl bg-pw-charcoal border border-white/10 shadow-pw-xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/80 text-center sm:text-left">
              We use cookies to improve your experience and analyse site traffic.
            </p>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={decline}
                className="rounded-full px-4 py-2 text-xs font-medium text-white/80 border border-white/20 hover:bg-white/10 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="rounded-full px-4 py-2 text-xs font-medium text-white bg-pw-sage-700 hover:bg-pw-sage-600 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
