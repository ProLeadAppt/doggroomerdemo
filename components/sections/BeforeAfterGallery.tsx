"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { BeforeAfterSlider } from "../ui/BeforeAfterSlider";
import { FadeInSection } from "../motion/FadeInSection";
import { galleryItems } from "../../data/site";

// Before/after pairs using different Unsplash images to simulate transformations
const transformations = [
  {
    id: "ba-1",
    label: "Cavoodle Full Groom",
    beforeImage:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80",
    dogName: "Luna",
    breed: "Cavoodle",
    ownerQuote: "She came home looking like a completely different dog!",
  },
  {
    id: "ba-2",
    label: "Golden Retriever De-shed",
    beforeImage:
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
    dogName: "Charlie",
    breed: "Golden Retriever",
    ownerQuote: "The de-shedding treatment is a game changer for our house.",
  },
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function BeforeAfterGallery() {
  const remaining = galleryItems.slice(0, 4);

  return (
    <Section id="gallery">
      <SectionHeading
        badge="Our Work"
        badgeTone="warm"
        title={
          <>
            Transformations that speak{" "}
            <span className="text-pw-terracotta">for themselves</span>
          </>
        }
        subtitle="Drag the slider to see the Pawsome difference. From scruffy to stunning."
      />

      {/* Before/After sliders */}
      <motion.div
        className="mt-16 grid gap-6 md:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {transformations.map((t) => (
          <motion.div key={t.id} variants={staggerItem}>
            <BeforeAfterSlider
              beforeImage={t.beforeImage}
              afterImage={t.afterImage}
              alt={t.label}
            />
            {/* Caption: dog name, breed, and owner quote */}
            <div className="mt-3 text-center">
              <p className="font-display font-bold text-pw-charcoal text-sm">
                {t.label}
              </p>
              {t.dogName && (
                <p className="text-pw-charcoal/60 text-xs mt-1">
                  {t.dogName} the {t.breed}
                </p>
              )}
              {t.ownerQuote && (
                <p className="text-pw-charcoal/50 text-xs italic mt-1">
                  &ldquo;{t.ownerQuote}&rdquo;
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Remaining gallery — masonry style with staggered entrance */}
      <motion.div
        className="mt-12 columns-2 lg:columns-4 gap-4 space-y-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {remaining.map((item, i) => (
          <motion.div key={item.id} variants={staggerItem}>
            <div className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer">
              <Image
                src={item.image}
                alt={`${item.label} — ${item.description}`}
                width={400}
                height={i % 2 === 0 ? 320 : 240}
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="w-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pw-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-display font-bold text-white text-sm">
                  {item.label}
                </p>
                {item.dogName && (
                  <p className="text-white/70 text-xs mt-0.5">
                    {item.dogName} the {item.breed}
                  </p>
                )}
              </div>
            </div>
            {/* Caption below gallery card */}
            {item.ownerQuote && (
              <p className="text-pw-charcoal/50 text-xs italic mt-2 text-center px-2">
                &ldquo;{item.ownerQuote}&rdquo;
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Contextual CTA */}
      <FadeInSection delay={0.4} className="mt-12 text-center">
        <Button variant="secondary" asChild>
          <Link href="/gallery">
            See What We Can Do for Your Pup
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </FadeInSection>
    </Section>
  );
}
