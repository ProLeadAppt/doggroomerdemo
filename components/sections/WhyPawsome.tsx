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
    hoverColor: "group-hover:text-pw-sage-400",
    bg: "bg-pw-sage/10",
    border: "border-pw-sage/20",
  },
  {
    icon: Award,
    title: "Breed-Certified Groomers",
    description:
      "Our team holds professional certifications and specialises in breed-specific grooming standards.",
    color: "text-pw-teal",
    hoverColor: "group-hover:text-pw-teal-300",
    bg: "bg-pw-teal/10",
    border: "border-pw-teal/20",
  },
  {
    icon: ShieldCheck,
    title: "100% Satisfaction Guarantee",
    description:
      "Not happy with the groom? We\u2019ll fix it for free. No questions asked, no awkward conversations.",
    color: "text-pw-terracotta",
    hoverColor: "group-hover:text-pw-terracotta-300",
    bg: "bg-pw-terracotta/10",
    border: "border-pw-terracotta/20",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function WhyPawsome() {
  return (
    <div className="bg-white border-y border-pw-border">
      <div className="mx-auto max-w-pw-container px-4 sm:px-6 py-10 sm:py-14">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-8 md:grid-cols-3"
        >
          {differentiators.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className="flex items-start gap-4 group"
            >
              <div
                className={`w-12 h-12 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110`}
              >
                <item.icon
                  className={`h-5 w-5 ${item.color} ${item.hoverColor} transition-colors duration-300`}
                />
              </div>
              <div>
                <h2 className="font-display font-bold text-pw-charcoal text-base">
                  {item.title}
                </h2>
                <p className="mt-1 text-sm text-pw-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
