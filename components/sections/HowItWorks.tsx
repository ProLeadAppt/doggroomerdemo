"use client";

import { Calendar, PawPrint, Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { howItWorks } from "../../data/site";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  PawPrint,
  Sparkles,
  Heart,
};

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-pw-elevated">
      <SectionHeading
        badge="How It Works"
        badgeTone="teal"
        title={
          <>
            Four simple steps to a{" "}
            <span className="text-pw-teal">happy pup</span>
          </>
        }
        subtitle="From booking to pickup, we make it effortless."
      />

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {howItWorks.map((step, i) => {
          const Icon = iconMap[step.icon] || Sparkles;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="relative text-center group"
            >
              {/* Connector line (hidden on last item and mobile) */}
              {i < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-pw-sage/30 to-transparent" />
              )}

              {/* Step number + icon */}
              <div className="relative mx-auto w-20 h-20 rounded-2xl bg-pw-sage/10 border border-pw-sage/20 flex items-center justify-center transition-all duration-300 group-hover:bg-pw-sage/20 group-hover:shadow-glow-sage">
                <Icon className="h-8 w-8 text-pw-sage-600" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-pw-terracotta text-white text-xs font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-5 font-display text-lg font-bold text-pw-charcoal">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-pw-muted leading-relaxed max-w-[240px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
