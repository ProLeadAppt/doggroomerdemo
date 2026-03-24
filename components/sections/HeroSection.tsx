"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Badge } from "../ui/Badge";
import { hero, brand } from "../../data/site";

export function HeroSection() {
  const words = hero.headline.split(" ");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image — no scale, no parallax */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.image}
          alt="Professional dog grooming at Pawsome and Co studio in Balmain Sydney"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Radial spotlight overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,rgba(30,27,25,0.85)_0%,rgba(30,27,25,0.4)_50%,transparent_80%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-pw-charcoal via-transparent to-pw-charcoal/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-pw-container px-6 pt-32 pb-20">
        <div className="max-w-2xl">
          {/* Glassmorphism container — blur only on desktop */}
          <div className="relative rounded-3xl bg-white/[0.04] md:backdrop-blur-sm border border-white/[0.08] p-6 sm:p-8 md:p-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Badge tone="gold">Est. {brand.established} &middot; {brand.suburb}</Badge>
            </motion.div>

            {/* Headline — word-level animation (not per-character) */}
            <h1 className="mt-5 font-display text-display-hero text-white">
              {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.22em]">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.3 + i * 0.07,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Script tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-2 font-script text-xl sm:text-2xl text-pw-amber-200"
            >
              {hero.tagline}
            </motion.p>

            {/* Accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 h-[2px] w-24 origin-left bg-gradient-to-r from-pw-terracotta to-pw-amber"
            />

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="mt-4 text-base sm:text-lg text-white/75 leading-relaxed max-w-lg"
            >
              {hero.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Link
                href="/booking"
                className="relative inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.97] group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-pw-terracotta to-pw-terracotta-600" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_24px_rgba(196,112,75,0.35)]" />
                <span className="relative z-10">{hero.primaryCtaLabel}</span>
              </Link>

              <Link
                href={`tel:${brand.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-white border border-white/20 bg-white/[0.06] hover:bg-white/[0.12] transition-all duration-300"
              >
                <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                {hero.secondaryCtaLabel}
              </Link>
            </motion.div>
          </div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-5 text-xs tracking-[0.15em] uppercase text-white/40 pl-2"
          >
            {hero.trustLine}
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
