"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { FadeInSection } from "../motion/FadeInSection";
import { faq } from "../../data/site";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq">
      <SectionHeading
        badge="FAQ"
        badgeTone="sage"
        title={
          <>
            Common questions,{" "}
            <span className="text-pw-sage">answered</span>
          </>
        }
        subtitle="Everything you need to know before your visit."
      />

      <div className="mt-12 mx-auto max-w-pw-narrow">
        {faq.map((item, i) => (
          <FadeInSection key={i} delay={i * 0.05}>
            <div className="border-b border-pw-border last:border-b-0">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group focus-visible:ring-2 focus-visible:ring-pw-terracotta focus-visible:ring-offset-2 focus-visible:outline-none rounded-lg"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="font-display text-base font-semibold text-pw-charcoal group-hover:text-pw-teal transition-colors pr-4">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="h-5 w-5 text-pw-muted" />
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-pw-muted leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeInSection>
        ))}
      </div>
    </Section>
  );
}
