"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type FadeInSectionProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function FadeInSection({
  children,
  delay = 0,
  className = "",
}: FadeInSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
