"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, GraduationCap, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PageHero } from "../sections/PageHero";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { FadeInSection } from "../motion/FadeInSection";
import { about, team, brand } from "../../data/site";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  GraduationCap,
  Sparkles,
};

export function AboutPageContent() {
  return (
    <>
      <PageHero
        badge="Our Story"
        badgeTone="sage"
        title={
          <>
            Built on love, patience, and{" "}
            <span className="text-pw-sage">really good haircuts</span>
          </>
        }
        subtitle="How a one-chair salon became Balmain's most-loved grooming studio."
      />

      {/* Story */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <FadeInSection>
            <div className="space-y-5">
              {about.story.map((paragraph, i) => (
                <p key={i} className="text-pw-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80"
                alt="Pawsome & Co. studio"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-pw-sage/20 to-transparent mix-blend-multiply" />
            </div>
          </FadeInSection>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-pw-elevated">
        <SectionHeading
          badge="Our Values"
          badgeTone="teal"
          title={
            <>
              What we stand for,{" "}
              <span className="text-pw-teal">every single day</span>
            </>
          }
        />

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {about.values.map((value, i) => {
            const Icon = iconMap[value.icon] || Sparkles;
            return (
              <FadeInSection key={value.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-pw-sage/10 border border-pw-sage/20 flex items-center justify-center mb-5">
                    <Icon className="h-7 w-7 text-pw-sage-600" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-pw-charcoal">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-pw-muted leading-relaxed max-w-[280px] mx-auto">
                    {value.description}
                  </p>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </Section>

      {/* Full Team */}
      <Section>
        <SectionHeading
          badge="Meet the Team"
          badgeTone="warm"
          title={
            <>
              The people who make it{" "}
              <span className="text-pw-terracotta">happen</span>
            </>
          }
          subtitle="Every member of our team is hand-picked for their skill, patience, and genuine love of dogs."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {team.map((member, i) => (
            <FadeInSection key={member.id} delay={i * 0.1}>
              <div className="flex gap-6 rounded-2xl border border-pw-border bg-white p-6 hover:shadow-pw transition-shadow duration-300">
                <div className="relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-bold text-pw-charcoal">
                    {member.name}
                  </h3>
                  <p className="text-sm text-pw-terracotta font-medium">
                    {member.role}
                  </p>
                  <p className="mt-2 text-sm text-pw-muted leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {member.specialties.map((s) => (
                      <Badge key={s} tone="neutral" className="!text-[8px] !px-2 !py-0.5">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </Section>

      {/* Stats strip */}
      <Section className="bg-pw-teal" noDivider>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: brand.established.toString(), label: "Established" },
            { value: brand.dogsGroomed, label: "Dogs Groomed" },
            { value: `${brand.googleRating}`, label: "Google Rating" },
            { value: `${brand.reviewCount}+`, label: "Happy Reviews" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="font-display text-3xl font-bold text-white">
                {stat.value}
              </span>
              <p className="text-xs uppercase tracking-[0.15em] text-white/60 mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section dark noDivider>
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-display text-display-lg text-white">
            Come say hello.
          </h2>
          <p className="mt-3 text-pw-subtle">
            We&rsquo;d love to meet you and your pup. Pop in for a visit or book your first groom today.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild>
              <Link href="/booking">
                Book a Groom
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/contact" className="!text-white !border-white/20 hover:!bg-white/10">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
