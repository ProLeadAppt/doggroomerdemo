"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "framer-motion";

type ScrollVelocityProps = {
  text: string;
  baseVelocity?: number;
};

export function ScrollVelocity({ text, baseVelocity = 2 }: ScrollVelocityProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const directionFactor = useRef<number>(1);
  const texts = Array.from({ length: 4 }).map(() => text);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const skewX = useTransform(smoothVelocity, [-1000, 1000], [5, -5]);

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap w-full max-w-full relative py-10 border-y border-pw-sage/10 opacity-30 pointer-events-none">
      <motion.div
        className="flex flex-nowrap whitespace-nowrap"
        style={{
          x: useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`),
          skewX,
        }}
      >
        {texts.map((item, index) => (
          <span
            key={index}
            className="block mr-10 font-display text-7xl sm:text-[9rem] font-bold uppercase text-transparent tracking-tight"
            style={{
              WebkitTextStroke: "1px rgba(27, 107, 109, 0.25)",
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
