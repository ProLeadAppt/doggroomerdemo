"use client";

import { type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type CardProps = {
  children: ReactNode;
  className?: string;
  spotlight?: boolean;
};

export function Card({ children, className = "", spotlight = true }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);

    if (spotlight) {
      ref.current.style.setProperty("--mouse-x", `${mouseX}px`);
      ref.current.style.setProperty("--mouse-y", `${mouseY}px`);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-1000">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ z: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`relative overflow-hidden rounded-2xl border border-pw-border bg-white/80 p-6 sm:p-7 card-glow ${
          spotlight ? "spotlight-card" : ""
        } ${className}`}
      >
        <div
          className="relative z-10 w-full h-full"
          style={{ transform: "translateZ(10px)" }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
