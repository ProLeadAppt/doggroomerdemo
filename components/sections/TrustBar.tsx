"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { PawIcon } from "../ui/PawIcon";
import { stats } from "../../data/site";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {target % 1 !== 0 ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

export function TrustBar() {
  return (
    <div className="bg-pw-elevated">
      {/* Marquee strip */}
      <div className="overflow-hidden border-b border-pw-border py-4">
        <div className="flex animate-marquee-slow">
          {[...stats.credibilityPoints, ...stats.credibilityPoints].map(
            (point, i) => (
              <span
                key={i}
                className="flex items-center gap-4 whitespace-nowrap px-6 text-sm font-medium text-pw-muted"
              >
                {point}
                <PawIcon className="text-pw-sage/30" size={14} />
              </span>
            )
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="mx-auto max-w-pw-container px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="h-5 w-5 fill-pw-amber text-pw-amber" />
              <span className="font-display text-3xl font-bold text-pw-charcoal">
                <AnimatedCounter target={stats.rating} />
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.15em] text-pw-muted">
              Google Rating
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <span className="font-display text-3xl font-bold text-pw-charcoal">
              <AnimatedCounter target={stats.reviewCount} suffix="+" />
            </span>
            <p className="text-xs uppercase tracking-[0.15em] text-pw-muted mt-1">
              Happy Reviews
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <span className="font-display text-3xl font-bold text-pw-charcoal">
              {stats.dogsGroomed}
            </span>
            <p className="text-xs uppercase tracking-[0.15em] text-pw-muted mt-1">
              Dogs Groomed
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <span className="font-display text-3xl font-bold text-pw-charcoal">
              Est. <AnimatedCounter target={stats.established} />
            </span>
            <p className="text-xs uppercase tracking-[0.15em] text-pw-muted mt-1">
              Balmain Local
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
