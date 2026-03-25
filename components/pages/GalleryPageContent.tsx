"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Instagram } from "lucide-react";
import { PageHero } from "../sections/PageHero";
import { Section } from "../layout/Section";
import { Button } from "../ui/Button";
import { FadeInSection } from "../motion/FadeInSection";
import { galleryItems, brand } from "../../data/site";

const categories = ["All", ...Array.from(new Set(galleryItems.map((g) => g.category)))];

export function GalleryPageContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <>
      <PageHero
        badge="Our Work"
        badgeTone="warm"
        title={
          <>
            Every groom tells a{" "}
            <span className="text-pw-terracotta">story</span>
          </>
        }
        subtitle="From scruffy to stunning. Browse our favourite transformations from the studio."
      />

      <Section>
        {/* Filter bar */}
        <FadeInSection className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-[color,background-color] duration-300 focus-visible:ring-2 focus-visible:ring-pw-terracotta focus-visible:ring-offset-2 focus-visible:outline-none ${
                activeCategory === cat
                  ? "bg-pw-teal text-white shadow-glow-sage"
                  : "bg-white border border-pw-border text-pw-muted hover:text-pw-charcoal hover:border-pw-sage/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </FadeInSection>

        {/* Masonry grid using CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="break-inside-avoid"
              >
                <div
                  className="group relative overflow-hidden rounded-2xl cursor-pointer focus-visible:ring-2 focus-visible:ring-pw-terracotta focus-visible:ring-offset-2 focus-visible:outline-none"
                  onClick={() => setLightboxIndex(i)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightboxIndex(i); } }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${item.label}`}
                >
                  <Image
                    src={item.image}
                    alt={`${item.label} — ${item.description}`}
                    width={600}
                    height={i % 3 === 0 ? 500 : 400}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pw-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-[opacity,transform] duration-500">
                    <p className="font-display font-bold text-white">
                      {item.label}
                    </p>
                    <p className="text-xs text-white/70 mt-1">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Instagram CTA */}
        <FadeInSection className="mt-16 text-center">
          <p className="text-pw-muted mb-4">
            See more on Instagram
          </p>
          <Button variant="secondary" asChild>
            <Link href={brand.socials.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram className="mr-2 h-4 w-4" />
              @pawsomeandco
            </Link>
          </Button>
        </FadeInSection>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-pw-charcoal/90 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-8 w-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[80vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex]?.image || ""}
                alt={`${filtered[lightboxIndex]?.label || ""} — Pawsome & Co. dog grooming gallery`}
                width={1200}
                height={800}
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
              />
              <div className="mt-4 text-center">
                <p className="font-display text-lg font-bold text-white">
                  {filtered[lightboxIndex]?.label}
                </p>
                <p className="text-sm text-white/60 mt-1">
                  {filtered[lightboxIndex]?.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
