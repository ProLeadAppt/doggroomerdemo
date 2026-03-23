"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let start = 0;
    const duration = 2000;
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= 100) {
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 400);
      } else {
        const easeOutQuart = 1 - Math.pow(1 - start / 100, 4);
        setProgress(Math.min(100, Math.floor(easeOutQuart * 100)));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-between bg-pw-cream px-6 py-12"
        >
          <div className="w-full text-center sm:text-left overflow-hidden">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] font-semibold tracking-[0.3em] uppercase text-pw-muted"
            >
              Pawsome &amp; Co.
            </motion.p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[8rem] sm:text-[14rem] font-bold leading-none tracking-tighter text-pw-teal"
              >
                {progress}%
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-script text-xl text-pw-terracotta mt-2"
            >
              Where every dog leaves happy.
            </motion.p>
          </div>

          <div className="w-full text-center sm:text-right overflow-hidden">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] tracking-[0.3em] uppercase text-pw-subtle"
            >
              Premium Grooming
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
