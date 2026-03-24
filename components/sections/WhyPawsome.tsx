"use client";

import { ShieldCheck, Award, Heart } from "lucide-react";
import { motion } from "framer-motion";

const differentiators = [
  {
    icon: Heart,
    title: "Gentle Handling Promise",
    description:
      "We never rush. Every dog is handled with patience, positive reinforcement, and respect for their comfort level.",
    color: "text-pw-sage-600",
    bg: "bg-pw-sage/10",
    border: "border-pw-sage/20",
  },
  {
    icon: Award,
    title: "Breed-Certified Groomers",
    description:
      "Our team holds professional certifications and specialises in breed-specific grooming standards.",
    color: "text-pw-teal",
    bg: "bg-pw-teal/10",
    border: "border-pw-teal/20",
  },
  {
    icon: ShieldCheck,
    title: "100% Satisfaction Guarantee",
    description:
      "Not happy with the groom? We\u2019ll fix it for free. No questions asked, no awkward conversations.",
    color: "text-pw-terracotta",
    bg: "bg-pw-terracotta/10",
    border: "border-pw-terracotta/20",
  },
];

export function WhyPawsome() {
  return (
    <div className="bg-white border-y border-pw-border">
      <div className="mx-auto max-w-pw-container px-6 py-14">
        <div className="grid gap-8 md:grid-cols-3">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-start gap-4 group"
            >
              <div
                className={`w-12 h-12 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <div>
                <h3 className="font-display font-bold text-pw-charcoal">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-pw-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
