"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
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
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
                className="w-full flex items-center justify-between py-5 text-left group"
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

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
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

        {/* Contextual CTA */}
        <FadeInSection delay={faq.length * 0.05}>
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-display font-semibold text-pw-teal hover:text-pw-teal-400 transition-colors group"
            >
              Still Have Questions? Let&rsquo;s Chat
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeInSection>
      </div>
    </Section>
  );
}
