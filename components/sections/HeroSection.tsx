"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Phone } from "lucide-react";
import { Badge } from "../ui/Badge";
import { PawIcon } from "../ui/PawIcon";
import { hero, brand } from "../../data/site";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: image moves slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Split headline into characters for per-character animation
  const words = hero.headline.split(" ");
  const chars = words.map((word) => word.split(""));

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
        <Image
          src={hero.image}
          alt="Happy groomed dog"
          fill
          className="object-cover scale-110"
          priority
        />
      </motion.div>

      {/* Sophisticated overlay stack */}
      <motion.div className="absolute inset-0 z-[1]" style={{ opacity: overlayOpacity }}>
        {/* Radial spotlight — focuses attention on text area */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,rgba(30,27,25,0.85)_0%,rgba(30,27,25,0.4)_50%,transparent_80%)]" />
        {/* Bottom gradient for section transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-pw-charcoal via-transparent to-pw-charcoal/30" />
        {/* Subtle color cast */}
        <div className="absolute inset-0 bg-pw-teal/5 mix-blend-overlay" />
      </motion.div>

      {/* Floating decorative paw — bobs gently */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1.5 }}
        className="absolute right-[10%] top-[20%] z-[2] hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <PawIcon size={80} className="text-white/[0.04]" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 1.5 }}
        className="absolute left-[5%] bottom-[25%] z-[2] hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
        >
          <PawIcon size={50} className="text-white/[0.03]" />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-pw-container px-6 pt-32 pb-20"
        style={{ y: contentY }}
      >
        <div className="max-w-2xl">
          {/* Glassmorphism container */}
          <div className="relative rounded-3xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] p-8 sm:p-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, duration: 0.5, ease: "easeOut" }}
            >
              <Badge tone="gold">Est. {brand.established} &middot; {brand.suburb}</Badge>
            </motion.div>

            {/* Headline — per-character animated reveal */}
            <h1 className="mt-6 font-display text-display-hero text-white">
              {chars.map((word, wi) => (
                <span key={wi} className="inline-block mr-[0.22em]">
                  {word.map((char, ci) => (
                    <span key={ci} className="inline-block overflow-hidden">
                      <motion.span
                        className="inline-block"
                        initial={{ y: "110%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: 2.4 + wi * 0.12 + ci * 0.03,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {char}
                      </motion.span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Animated accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 3.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 h-[2px] w-24 origin-left bg-gradient-to-r from-pw-terracotta to-pw-amber"
            />

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.4, duration: 0.6 }}
              className="mt-5 text-lg text-white/75 leading-relaxed max-w-lg"
            >
              {hero.subheadline}
            </motion.p>

            {/* CTAs — premium styling */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.6, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/booking"
                className="relative inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group"
              >
                {/* Gradient background */}
                <span className="absolute inset-0 bg-gradient-to-r from-pw-terracotta to-pw-terracotta-600 transition-opacity duration-300" />
                {/* Glow on hover */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-pw-terracotta to-pw-amber shadow-[0_0_32px_rgba(196,112,75,0.4)]" />
                <span className="relative z-10">{hero.primaryCtaLabel}</span>
              </Link>

              <Link
                href={`tel:${brand.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold text-white border border-white/20 bg-white/[0.06] backdrop-blur-sm hover:bg-white/[0.12] hover:border-white/30 transition-all duration-300"
              >
                <Phone className="mr-2 h-4 w-4" />
                {hero.secondaryCtaLabel}
              </Link>
            </motion.div>
          </div>

          {/* Trust line — outside glass card */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8, duration: 0.8 }}
            className="mt-6 text-xs tracking-[0.15em] uppercase text-white/40 pl-2"
          >
            {hero.trustLine}
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll indicator — premium pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-white/30 via-white/10 to-transparent"
        />
      </motion.div>
    </section>
  );
}
