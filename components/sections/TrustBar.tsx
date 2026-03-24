"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import { Star } from "lucide-react";
import { PawIcon } from "../ui/PawIcon";
import AnimatedCounter from "../ui/AnimatedCounter";
import { stats, brand } from "../../data/site";

const ease = [0.33, 1, 0.68, 1] as const; // cubic-bezier ease-out

// Stat card variants for staggered entrance
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    } as Transition,
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease } as Transition,
  },
};

const starVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.3, ease } as Transition,
  }),
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease } as Transition,
  },
};

export function TrustBar() {
  return (
    <div className="bg-pw-elevated">
      {/* Marquee strip with fade-edge masks */}
      <div className="overflow-hidden border-b border-pw-border py-4 relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-pw-elevated to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-pw-elevated to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee-slow">
          {[...stats.credibilityPoints, ...stats.credibilityPoints].map(
            (point, i) => (
              <span
                key={i}
                className="flex items-center gap-4 whitespace-nowrap px-6 text-sm font-medium text-pw-muted"
              >
                {point}
                <PawIcon className="text-pw-sage/30" size={14} />
              </span>
            )
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="mx-auto max-w-pw-container px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Animated stat cards */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Rating */}
            <motion.div
              variants={statVariants}
              className="text-center"
              aria-label={`Google rating: ${brand.googleRating} out of 5 stars`}
            >
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={starVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Star className="h-4 w-4 fill-pw-amber text-pw-amber" />
                  </motion.span>
                ))}
              </div>
              <div className="font-display text-3xl font-bold text-pw-charcoal">
                {brand.googleRating.toFixed(1)}★
              </div>
              <p className="text-xs uppercase tracking-[0.15em] text-pw-muted mt-1">
                Google Rating
              </p>
            </motion.div>

            {/* Review count */}
            <motion.div
              variants={statVariants}
              className="text-center"
              aria-label={`${brand.reviewCount} five-star reviews`}
            >
              <div className="font-display text-3xl font-bold text-pw-teal">
                <AnimatedCounter
                  target={brand.reviewCount}
                  duration={2000}
                  suffix="+"
                />
              </div>
              <p className="text-xs uppercase tracking-[0.15em] text-pw-muted mt-1">
                Happy Reviews
              </p>
            </motion.div>

            {/* Established */}
            <motion.div
              variants={statVariants}
              className="text-center"
              aria-label={`Established in ${brand.established}`}
            >
              <div className="font-display text-3xl font-bold text-pw-terracotta">
                Est.{" "}
                <AnimatedCounter
                  target={brand.established}
                  duration={2000}
                />
              </div>
              <p className="text-xs uppercase tracking-[0.15em] text-pw-muted mt-1">
                Balmain Local
              </p>
            </motion.div>

            {/* Dogs groomed */}
            <motion.div
              variants={statVariants}
              className="text-center"
              aria-label={`${brand.dogsGroomed} dogs groomed`}
            >
              <div className="font-display text-3xl font-bold text-pw-sage">
                {brand.dogsGroomed}
              </div>
              <p className="text-xs uppercase tracking-[0.15em] text-pw-muted mt-1">
                Dogs Groomed
              </p>
            </motion.div>
          </motion.div>

          {/* Platform badges — slide in from right */}
          <motion.div
            className="flex items-center justify-center gap-4 md:justify-end md:pl-8 shrink-0"
            variants={badgeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Google badge */}
            <div className="flex flex-col items-center gap-1 rounded-xl border border-pw-border bg-pw-surface px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1.5">
                {/* Inline Google "G" wordmark colours */}
                <span className="text-base font-bold">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </span>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-pw-amber text-pw-amber" />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-pw-charcoal">
                {brand.googleRating} · {brand.reviewCount} reviews
              </span>
            </div>

            {/* Yelp badge */}
            <div className="flex flex-col items-center gap-1 rounded-xl border border-pw-border bg-pw-surface px-4 py-3 shadow-sm">
              <span className="text-base font-bold text-[#D32323]">Yelp</span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-[#D32323] text-[#D32323]" />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-pw-charcoal">
                5.0 · Top Rated
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
