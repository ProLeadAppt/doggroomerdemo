"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
  },
  {
    id: "ba-2",
    label: "Golden Retriever De-shed",
    beforeImage:
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
  },
];

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
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {transformations.map((t, i) => (
          <FadeInSection key={t.id} delay={i * 0.15}>
            <div>
              <BeforeAfterSlider
                beforeImage={t.beforeImage}
                afterImage={t.afterImage}
                alt={t.label}
              />
              <p className="mt-3 text-center font-display font-bold text-pw-charcoal text-sm">
                {t.label}
              </p>
            </div>
          </FadeInSection>
        ))}
      </div>

      {/* Remaining gallery — masonry style */}
      <div className="mt-12 columns-2 lg:columns-4 gap-4 space-y-4">
        {remaining.map((item, i) => (
          <FadeInSection key={item.id} delay={0.3 + i * 0.08}>
            <div className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer">
              <Image
                src={item.image}
                alt={item.label}
                width={400}
                height={i % 2 === 0 ? 320 : 240}
                className="w-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-[filter,transform] duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pw-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-[opacity,transform] duration-500">
                <p className="font-display font-bold text-white text-sm">
                  {item.label}
                </p>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>

      <FadeInSection delay={0.4} className="mt-12 text-center">
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
