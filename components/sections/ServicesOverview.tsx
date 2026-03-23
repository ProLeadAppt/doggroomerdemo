"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { FadeInSection } from "../motion/FadeInSection";
import { services } from "../../data/site";

export function ServicesOverview() {
  return (
    <Section id="services">
      <SectionHeading
        badge="Our Services"
        title={
          <>
            Expert grooming for{" "}
            <span className="text-pw-teal">every breed</span>
          </>
        }
        subtitle="From a quick freshen-up to the full pamper experience, we've got your pup covered."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <FadeInSection key={service.id} delay={i * 0.08}>
            <div className="group relative overflow-hidden rounded-2xl border border-pw-border bg-white transition-all duration-300 hover:shadow-pw-lg hover:border-pw-sage/30">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {service.popular && (
                  <div className="absolute top-3 right-3">
                    <Badge tone="warm">Popular</Badge>
                  </div>
                )}
                <div className="absolute bottom-3 left-3">
                  <Badge tone="neutral">{service.tag}</Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-pw-charcoal">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-pw-muted leading-relaxed line-clamp-2">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="font-display text-xl font-bold text-pw-teal">
                      {service.price}
                    </span>
                    <span className="text-xs text-pw-muted ml-2">
                      {service.duration}
                    </span>
                  </div>
                  <Link
                    href="/booking"
                    className="text-xs font-semibold text-pw-terracotta hover:text-pw-terracotta-600 transition-colors flex items-center gap-1 group/link"
                  >
                    Book
                    <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>

      <FadeInSection delay={0.3} className="mt-12 text-center">
        <Button variant="secondary" asChild>
          <Link href="/services">
            View Full Service Menu
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </FadeInSection>
    </Section>
  );
}
