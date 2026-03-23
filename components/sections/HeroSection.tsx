"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { hero, brand } from "../../data/site";

export function HeroSection() {
  const words = hero.headline.split(" ");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.image}
          alt="Happy groomed dog"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-pw-charcoal/80 via-pw-charcoal/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-pw-charcoal/60 via-transparent to-pw-charcoal/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-pw-container px-6 pt-32 pb-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.6 }}
          >
            <Badge tone="gold">Est. {brand.established} &middot; {brand.suburb}</Badge>
          </motion.div>

          {/* Headline — animated word by word */}
          <h1 className="mt-6 font-display text-display-hero text-white">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 2.6 + i * 0.08,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.6 }}
            className="mt-6 text-lg text-white/80 leading-relaxed max-w-lg"
          >
            {hero.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.4, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button asChild>
              <Link href="/booking">{hero.primaryCtaLabel}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link
                href={`tel:${brand.phone.replace(/\s/g, "")}`}
                className="!text-white !border-white/30 hover:!bg-white/10"
              >
                <Phone className="mr-2 h-4 w-4" />
                {hero.secondaryCtaLabel}
              </Link>
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.6, duration: 0.8 }}
            className="mt-8 text-xs tracking-[0.15em] uppercase text-white/50"
          >
            {hero.trustLine}
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
