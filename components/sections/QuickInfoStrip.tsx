"use client";

import { Clock, Phone, MapPin } from "lucide-react";
import { brand } from "../../data/site";
import { FadeInSection } from "../motion/FadeInSection";

const items = [
  { icon: Clock, label: brand.hoursSummary },
  { icon: Phone, label: brand.phone },
  { icon: MapPin, label: brand.address },
];

export function QuickInfoStrip() {
  return (
    <div className="bg-pw-teal">
      <div className="mx-auto max-w-pw-container px-6 py-4">
        <FadeInSection>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
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
