"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { FadeInSection } from "../motion/FadeInSection";
import { galleryItems } from "../../data/site";

export function BeforeAfterGallery() {
  const featured = galleryItems.slice(0, 4);

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
        subtitle="From scruffy to stunning. See the Pawsome difference."
      />

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {featured.map((item, i) => (
          <FadeInSection key={item.id} delay={i * 0.1}>
            <div className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3]">
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-pw-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-display text-lg font-bold text-white">
                  {item.label}
                </p>
                <p className="text-sm text-white/70 mt-1">{item.description}</p>
              </div>
              {/* Category tag */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-pw-charcoal">
                {item.category}
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>

      <FadeInSection delay={0.3} className="mt-12 text-center">
        <Button variant="secondary" asChild>
          <Link href="/gallery">
            View Full Gallery
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </FadeInSection>
    </Section>
  );
}
