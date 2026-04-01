"use client";

import { Clock, Phone, MapPin, Star } from "lucide-react";
import { brand as defaultBrand } from "../../data/site";
import { useDemoContext } from "../../contexts/DemoContext";
import { FadeInSection } from "../motion/FadeInSection";

export function QuickInfoStrip() {
  const { brand } = useDemoContext ? useDemoContext() : { brand: defaultBrand };

  const items = [
    { icon: Star, label: `${brand.googleRating} Google Rating · ${brand.reviewCount}+ Reviews` },
    { icon: Clock, label: `Open 6 days · ${brand.hoursSummary}` },
    { icon: Phone, label: brand.phone },
    { icon: MapPin, label: `${brand.suburb} · Free street parking` },
  ];

  return (
    <div className="bg-pw-teal">
      <div className="mx-auto max-w-pw-container px-4 sm:px-6 py-3 sm:py-4">
        <FadeInSection>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
            {items.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-sm text-white/90"
              >
                <item.icon className="h-4 w-4 text-pw-amber-200" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
