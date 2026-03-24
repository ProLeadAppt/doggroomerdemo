"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { GripVertical } from "lucide-react";
import { useInView, motion, animate } from "framer-motion";

type BeforeAfterSliderProps = {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt: string;
};

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  alt,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const hasAnimated = useRef(false);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  // Auto-teach animation: 30% -> 70% -> 50% over 2s when first in view
  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const controls = animate(50, [30, 70, 50], {
      duration: 2,
      ease: "easeInOut",
      onUpdate: (v) => setPosition(v),
    });

    return () => controls.stop();
  }, [isInView]);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl cursor-col-resize select-none aspect-[4/3]"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* After image (full, behind) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={`${alt} — after grooming at Pawsome & Co.`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={`${alt} — before grooming at Pawsome & Co.`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute inset-y-0 -translate-x-1/2 w-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />

        {/* Drag handle — 48px minimum touch target on mobile */}
        <motion.div
          role="slider"
          aria-label="Drag to compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          tabIndex={0}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-10 md:h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-col-resize hover:scale-110 transition-transform"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPosition((p) => Math.max(5, p - 5));
            if (e.key === "ArrowRight") setPosition((p) => Math.min(95, p + 5));
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <GripVertical className="h-5 w-5 md:h-4 md:w-4 text-pw-charcoal" aria-hidden="true" />
        </motion.div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-pw-charcoal/70 backdrop-blur-sm text-white text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-white/80 backdrop-blur-sm text-pw-charcoal text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
          {afterLabel}
        </span>
      </div>
    </div>
  );
}
