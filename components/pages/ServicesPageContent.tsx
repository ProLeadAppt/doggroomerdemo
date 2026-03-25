"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Crown, Sparkles } from "lucide-react";
import { PageHero } from "../sections/PageHero";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { FadeInSection } from "../motion/FadeInSection";
import { services, addOns, packages } from "../../data/site";

export function ServicesPageContent() {
  return (
    <>
      <PageHero
        badge="Services & Pricing"
        badgeTone="teal"
        title={
          <>
            Everything your pup needs,{" "}
            <span className="text-pw-teal">all in one place</span>
          </>
        }
        subtitle="From a quick freshen-up to the ultimate pamper day. Transparent pricing, no surprises."
      />

      {/* Core Services */}
      <Section>
        <SectionHeading
          badge="Core Grooming"
          title="Full service menu"
          subtitle="All grooms include a wash, blow dry, nail trim, ear clean, and cologne spritz."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <FadeInSection key={service.id} delay={i * 0.06}>
              <div className="group rounded-2xl border border-pw-border bg-white overflow-hidden hover:shadow-pw-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`Professional ${service.name} grooming at Pawsome & Co.`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  {service.popular && (
                    <div className="absolute top-3 right-3">
                      <Badge tone="warm">Popular</Badge>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg font-bold text-pw-charcoal">
                        {service.name}
                      </h3>
                      <span className="text-xs text-pw-muted">{service.tag}</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-display text-xl font-bold text-pw-teal">
                        {service.price}
                      </span>
                      <p className="text-[10px] text-pw-muted">{service.duration}</p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-pw-muted leading-relaxed flex-1">
                    {service.description}
                  </p>

                  <div className="mt-4">
                    <Button variant="secondary" fullWidth asChild>
                      <Link href="/booking" className="!text-sm">
                        Book This Service
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </Section>

      {/* Add-Ons */}
      <Section className="bg-pw-elevated">
        <SectionHeading
          badge="Add-Ons"
          badgeTone="warm"
          title={
            <>
              Make it <span className="text-pw-terracotta">extra special</span>
            </>
          }
          subtitle="Enhance any groom with these specialty treatments."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {addOns.map((addon, i) => (
            <FadeInSection key={addon.id} delay={i * 0.06}>
              <div className="rounded-xl border border-pw-border bg-white p-5 hover:shadow-pw transition-shadow duration-300">
                <div className="flex items-start justify-between">
                  <h3 className="font-display font-bold text-pw-charcoal">
                    {addon.name}
                  </h3>
                  <span className="font-display font-bold text-pw-teal flex-shrink-0 ml-3">
                    {addon.price}
                  </span>
                </div>
                <p className="mt-2 text-sm text-pw-muted">{addon.description}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </Section>

      {/* Packages */}
      <Section>
        <SectionHeading
          badge="Packages"
          badgeTone="gold"
          title={
            <>
              Premium packages for{" "}
              <span className="text-pw-amber-600">premium pups</span>
            </>
          }
          subtitle="Bundle and save with our curated grooming packages."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <FadeInSection key={pkg.id} delay={i * 0.1}>
              <div
                className={`relative rounded-2xl border bg-white p-7 h-full flex flex-col transition-[box-shadow,border-color] duration-300 ${
                  pkg.popular
                    ? "border-pw-terracotta shadow-pw-lg scale-[1.02]"
                    : "border-pw-border hover:shadow-pw"
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge tone={pkg.popular ? "warm" : "gold"}>
                      {pkg.popular && <Crown className="mr-1 h-3 w-3" />}
                      {pkg.badge}
                    </Badge>
                  </div>
                )}

                <div className="text-center pt-2">
                  <h3 className="font-display text-xl font-bold text-pw-charcoal">
                    {pkg.name}
                  </h3>
                  <div className="mt-2">
                    <span className="font-display text-3xl font-bold text-pw-teal">
                      {pkg.price}
                    </span>
                    {pkg.interval && (
                      <span className="text-sm text-pw-muted">/{pkg.interval}</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-pw-muted">{pkg.description}</p>
                </div>

                <ul className="mt-6 space-y-3 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 text-pw-sage flex-shrink-0 mt-0.5" />
                      <span className="text-pw-charcoal">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Button
                    variant={pkg.popular ? "primary" : "secondary"}
                    fullWidth
                    asChild
                  >
                    <Link href="/booking">
                      {pkg.interval ? "Join VIP" : "Book Now"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section dark noDivider>
        <div className="text-center max-w-xl mx-auto">
          <Sparkles className="h-8 w-8 text-pw-amber mx-auto mb-4" />
          <h2 className="font-display text-display-lg text-white">
            Not sure what your pup needs?
          </h2>
          <p className="mt-3 text-pw-subtle">
            Book a consultation and we&rsquo;ll recommend the perfect service based on your dog&rsquo;s breed, coat, and lifestyle.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/booking">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
