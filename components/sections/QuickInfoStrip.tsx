"use client";

import { Clock, Phone, MapPin, Star } from "lucide-react";
import { brand } from "../../data/site";
import { FadeInSection } from "../motion/FadeInSection";

const items = [
  { icon: Star, label: `${brand.googleRating} Google Rating \u00b7 ${brand.reviewCount}+ Reviews` },
  { icon: Clock, label: `Open 6 days \u00b7 ${brand.hoursSummary}` },
  { icon: Phone, label: brand.phone },
  { icon: MapPin, label: `${brand.suburb} \u00b7 Free street parking` },
];

export function QuickInfoStrip() {
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
