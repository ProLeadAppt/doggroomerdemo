"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { FadeInSection } from "../motion/FadeInSection";
import { services } from "../../data/site";

export function ServicesOverview() {
  // First popular service is the hero card
  const heroService = services.find((s) => s.popular) || services[0];
  const rest = services.filter((s) => s.id !== heroService.id);

  return (
    <Section id="services">
      <SectionHeading
        badge="Our Services"
        title={
          <>
            Expert grooming for{" "}
            <span className="text-shimmer">every breed</span>
          </>
        }
        subtitle="From a quick freshen-up to the full pamper experience, we've got your pup covered."
      />

      <div className="mt-16 space-y-6">
        {/* Hero service — full width featured card */}
        <FadeInSection>
          <Link href="/booking" className="block group">
            <div className="relative overflow-hidden rounded-2xl border border-pw-border bg-white hover:border-pw-terracotta/30 transition-all duration-500 hover:shadow-pw-xl">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <Image
                    src={heroService.image}
                    alt={heroService.name}
                    fill
                    className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 md:bg-gradient-to-r md:from-transparent md:to-white" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <Badge tone="warm">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold text-pw-charcoal">
                    {heroService.name}
                  </h3>
                  <p className="mt-3 text-pw-muted leading-relaxed">
                    {heroService.description}
                  </p>
                  <div className="mt-5 flex items-center gap-4">
                    <motion.span
                      className="font-display text-3xl font-bold text-pw-teal"
                      whileHover={{ scale: 1.05 }}
                    >
                      {heroService.price}
                    </motion.span>
                    <span className="text-sm text-pw-muted">
                      {heroService.duration}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-pw-terracotta group-hover:gap-2 transition-all">
                    Book this service
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </FadeInSection>

        {/* Remaining services — 2+3 grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((service, i) => (
            <FadeInSection key={service.id} delay={i * 0.06}>
              <Link href="/booking" className="block group h-full">
                <div className="relative overflow-hidden rounded-2xl border border-pw-border bg-white transition-all duration-500 hover:shadow-pw-lg hover:border-pw-sage/30 h-full flex flex-col">
                  {/* Image with desaturate → saturate */}
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
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
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-display text-lg font-bold text-pw-charcoal group-hover:text-pw-teal transition-colors">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-pw-muted leading-relaxed flex-1">
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
                      <span className="text-xs font-semibold text-pw-terracotta flex items-center gap-1 group-hover:gap-2 transition-all">
                        Book
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>

                  {/* Hover glow border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-pw-terracotta/0 group-hover:border-pw-terracotta/15 transition-colors duration-500 pointer-events-none" />
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>
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
