"use client";

import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";

type PageHeroProps = {
  badge: string;
  badgeTone?: "sage" | "warm" | "gold" | "neutral" | "teal";
  title: React.ReactNode;
  subtitle?: string;
};

export function PageHero({ badge, badgeTone = "sage", title, subtitle }: PageHeroProps) {
  return (
    <section className="relative bg-pw-elevated pt-32 pb-16 sm:pt-40 sm:pb-20 px-6 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-radial-spotlight pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-pw-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge tone={badgeTone}>{badge}</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-5 font-display text-display-xl text-pw-charcoal"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 text-lg text-pw-muted max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <div className="section-divider mt-16" />
    </section>
  );
}
