"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { hero, brand } from "@/data/site";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const easing = [0.22, 1, 0.36, 1] as [number, number, number, number];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: easing,
    },
  },
};

export function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 20% 60%, hsla(100,20%,55%,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 30%, hsla(20,55%,55%,0.05) 0%, transparent 60%)",
      }}
    >
      <div className="mx-auto w-full max-w-pw-container px-4 sm:px-6 py-20 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <Badge tone="gold">Est. {brand.established} &middot; Balmain, Sydney</Badge>
            </motion.div>

            {/* H1 Headline */}
            <motion.h1
              variants={itemVariants}
              className="mt-6 font-display text-display-hero font-bold text-pw-charcoal leading-tight"
            >
              {hero.headline}
            </motion.h1>

            {/* Script tagline */}
            <motion.p
              variants={itemVariants}
              className="mt-3 font-script text-2xl sm:text-3xl text-pw-terracotta"
            >
              {hero.tagline}
            </motion.p>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="mt-5 text-lg text-pw-muted leading-relaxed max-w-lg"
            >
              {hero.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link href={hero.cta.href}>
                <Button variant="primary" asChild>
                  {hero.cta.label}
                </Button>
              </Link>
              <Link href={hero.ctaSecondary.href}>
                <Button variant="secondary" asChild>
                  <Phone className="mr-2 h-4 w-4 inline-block" />
                  {hero.ctaSecondary.label}
                </Button>
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-xs tracking-[0.15em] uppercase text-pw-muted/70"
            >
              {hero.trustLine}
            </motion.p>
          </motion.div>

          {/* Right column — image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-pw-xl"
          >
            <Image
              src={hero.image}
              alt="Professional dog grooming at Pawsome and Co studio in Balmain Sydney"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Subtle bottom gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
