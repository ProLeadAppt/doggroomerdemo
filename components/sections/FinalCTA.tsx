"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "../layout/Section";
import { Button } from "../ui/Button";
import { PawIcon } from "../ui/PawIcon";
import { brand } from "../../data/site";

export function FinalCTA() {
  return (
    <Section dark noDivider className="relative overflow-hidden">
      {/* Decorative paw prints */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <PawIcon
          className="absolute top-12 left-[10%] text-white/[0.03] rotate-12"
          size={120}
        />
        <PawIcon
          className="absolute bottom-16 right-[15%] text-white/[0.03] -rotate-12"
          size={160}
        />
        <PawIcon
          className="absolute top-1/2 right-[5%] text-white/[0.02] rotate-45"
          size={80}
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-script text-xl text-pw-terracotta-200"
        >
          Ready to book?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 font-display text-display-xl text-white"
        >
          Your dog deserves to feel pawsome.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-pw-subtle text-lg"
        >
          Book online in 30 seconds or give us a call. We can&rsquo;t wait to
          meet your pup.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Button asChild>
            <Link href="/booking">Book a Groom</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link
              href={`tel:${brand.phone.replace(/\s/g, "")}`}
              className="!text-white !border-white/20 hover:!bg-white/10"
            >
              <Phone className="mr-2 h-4 w-4" />
              {brand.phone}
            </Link>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
