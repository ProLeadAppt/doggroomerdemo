"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
};

export function MagneticButton({
  children,
  className = "",
  intensity = 0.4,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    setPosition({ x: x * intensity, y: y * intensity });
  };

  const handleLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const springX = useSpring(position.x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(position.y, { stiffness: 150, damping: 15, mass: 0.1 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      <motion.div
        style={{
          x: useSpring(position.x * 0.5, { stiffness: 150, damping: 15 }),
          y: useSpring(position.y * 0.5, { stiffness: 150, damping: 15 }),
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
