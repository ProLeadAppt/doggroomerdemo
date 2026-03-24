"use client";

import { Calendar, PawPrint, Sparkles, Heart } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { howItWorks } from "../../data/site";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  PawPrint,
  Sparkles,
  Heart,
};

const stepColors = [
  { bg: "bg-pw-sage/10", border: "border-pw-sage/20", text: "text-pw-sage-600", glow: "group-hover:shadow-glow-sage", accent: "bg-pw-sage" },
  { bg: "bg-pw-teal/10", border: "border-pw-teal/20", text: "text-pw-teal", glow: "group-hover:shadow-[0_0_24px_rgba(27,107,109,0.15)]", accent: "bg-pw-teal" },
  { bg: "bg-pw-terracotta/10", border: "border-pw-terracotta/20", text: "text-pw-terracotta", glow: "group-hover:shadow-glow-terracotta", accent: "bg-pw-terracotta" },
  { bg: "bg-pw-amber/10", border: "border-pw-amber/20", text: "text-pw-amber-700", glow: "group-hover:shadow-glow-amber", accent: "bg-pw-amber" },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

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

      <div ref={sectionRef} className="mt-16 relative">
        {/* Animated connector line (desktop only) */}
        <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-[2px] overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-full origin-left bg-gradient-to-r from-pw-sage/40 via-pw-teal/40 via-pw-terracotta/40 to-pw-amber/40"
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, i) => {
            const Icon = iconMap[step.icon] || Sparkles;
            const color = stepColors[i];

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.2, duration: 0.6, ease: "easeOut" }}
                className="relative text-center group"
              >
                {/* Step circle with gradient fill */}
                <div className={`relative mx-auto w-20 h-20 rounded-2xl ${color.bg} border ${color.border} flex items-center justify-center transition-transform duration-500 ${color.glow} group-hover:scale-110`}>
                  <Icon className={`h-8 w-8 ${color.text} transition-transform duration-300 group-hover:scale-110`} />

                  {/* Step number badge */}
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.2, type: "spring", stiffness: 400, damping: 15 }}
                    className={`absolute -top-2 -right-2 w-7 h-7 rounded-full ${color.accent} text-white text-xs font-bold flex items-center justify-center shadow-lg`}
                  >
                    {step.number}
                  </motion.span>
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
      </div>
    </Section>
  );
}
