"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { Star, ArrowRight, ArrowLeft, CheckCircle2, PawPrint } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { FadeInSection } from "../motion/FadeInSection";
import { reviews as defaultReviews, brand as defaultBrand } from "../../data/site";
import { useDemoContext } from "../../contexts/DemoContext";

/* ---------- Star rating ---------- */
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < count
              ? "fill-pw-amber text-pw-amber"
              : "fill-pw-border text-pw-border"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/* ---------- Helpers ---------- */
function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/* ---------- Card variants for depth carousel ---------- */
const cardSpring = { type: "spring" as const, stiffness: 260, damping: 28 };

/* ---------- Main component ---------- */
export function TestimonialsSection() {
  const { brand, reviews } = useDemoContext ? useDemoContext() : { brand: defaultBrand, reviews: defaultReviews };
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const touchStart = useRef<number | null>(null);
  const total = reviews.length;

  const goto = useCallback(
    (next: number, dir?: number) => {
      setDirection(dir ?? (next > active ? 1 : -1));
      setActive(wrap(0, total, next));
    },
    [active, total],
  );

  const next = useCallback(() => goto(active + 1, 1), [active, goto]);
  const prev = useCallback(() => goto(active - 1, -1), [active, goto]);

  /* Auto-advance every 5s, pause on hover/touch */
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  /* Touch / swipe support */
  const onTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(diff) > 50) {
      diff < 0 ? next() : prev();
    }
    touchStart.current = null;
  };

  /* Positions: -1 = left, 0 = center, 1 = right */
  function getOffset(index: number): number {
    let diff = index - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  }

  const visibleCards = reviews
    .map((review, i) => ({ review, offset: getOffset(i), index: i }))
    .filter((c) => Math.abs(c.offset) <= 1);

  return (
    <Section id="reviews">
      <SectionHeading
        badge="Reviews"
        badgeTone="gold"
        title={
          <>
            Loved by{" "}
            <span className="text-shimmer">{brand.reviewCount}+ dog owners</span>
          </>
        }
        subtitle={`Rated ${brand.googleRating} stars on Google. Here\u2019s what our clients say.`}
      />

      {/* Google rating badge */}
      <FadeInSection className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-pw-lg border border-pw-amber/20">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-3xl font-bold text-pw-charcoal">
              {brand.googleRating}
            </span>
            <StarRating count={5} />
          </div>
          <div className="h-6 w-[1px] bg-pw-border" />
          <div className="flex items-center gap-1.5">
            <CheckCircle2
              className="h-4 w-4 text-green-500"
              aria-hidden="true"
            />
            <span className="text-xs text-pw-muted">
              {brand.reviewCount} Verified Reviews
            </span>
          </div>
        </div>
      </FadeInSection>

      {/* Depth carousel */}
      <FadeInSection className="mt-12 relative">
        <div
          className="relative mx-auto w-full max-w-4xl"
          style={{ minHeight: 340 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="region"
          aria-label="Customer testimonials carousel"
          aria-roledescription="carousel"
        >
          {/* Cards */}
          <div className="relative w-full" style={{ height: 340 }}>
            <AnimatePresence initial={false} custom={direction}>
              {visibleCards.map(({ review, offset, index }) => {
                const isCenter = offset === 0;
                const scale = isCenter ? 1 : 0.85;
                const opacity = isCenter ? 1 : 0.6;
                const zIndex = isCenter ? 20 : 10;
                // Horizontal positioning: center card at 50%, sides offset
                const xPercent = offset * 38;

                return (
                  <motion.div
                    key={review.id}
                    layout
                    custom={direction}
                    initial={{
                      scale: 0.85,
                      opacity: 0,
                      x: `${direction * 50}%`,
                    }}
                    animate={{
                      scale,
                      opacity,
                      x: `${xPercent}%`,
                    }}
                    exit={{
                      scale: 0.85,
                      opacity: 0,
                      x: `${-direction * 50}%`,
                    }}
                    transition={cardSpring}
                    className="absolute top-0 left-1/2 w-[85%] sm:w-[55%] md:w-[45%]"
                    style={{
                      zIndex,
                      translateX: "-50%",
                      pointerEvents: isCenter ? "auto" : "none",
                    }}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Review ${index + 1} of ${total}`}
                    aria-hidden={!isCenter}
                  >
                    <div
                      className={`rounded-2xl border bg-white p-6 sm:p-8 shadow-pw-lg transition-colors duration-300 h-full flex flex-col relative overflow-hidden ${
                        isCenter
                          ? "border-pw-amber/20"
                          : "border-pw-border"
                      }`}
                    >
                      {/* Large decorative quote mark */}
                      <span
                        className="absolute -top-2 left-4 font-display text-[80px] leading-none text-pw-sage/[0.08] pointer-events-none select-none"
                        aria-hidden="true"
                      >
                        &ldquo;
                      </span>

                      <div className="relative z-10">
                        <StarRating count={review.stars} />

                        <p className="mt-4 text-sm sm:text-base text-pw-charcoal leading-relaxed line-clamp-5">
                          &ldquo;{review.text}&rdquo;
                        </p>

                        <div className="mt-5 pt-4 border-t border-pw-border/50 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pw-sage/20 to-pw-teal/20 flex items-center justify-center flex-shrink-0">
                            <span className="font-display text-sm font-bold text-pw-teal">
                              {review.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-display font-bold text-pw-charcoal text-sm">
                              {review.name}
                            </p>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
                              {review.breed && (
                                <span className="inline-flex items-center gap-1 text-[11px] bg-pw-sage/10 text-pw-sage px-2 py-0.5 rounded-full font-medium">
                                  <PawPrint className="h-3 w-3" aria-hidden="true" />
                                  {review.breed}
                                </span>
                              )}
                              {review.service && (
                                <span className="text-[11px] text-pw-muted">
                                  {review.service}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Prev / Next arrows — desktop */}
          <button
            onClick={prev}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-30 w-11 h-11 rounded-full border border-pw-border bg-white/90 backdrop-blur hover:bg-pw-elevated hover:border-pw-sage/30 transition-all items-center justify-center shadow-pw"
            aria-label="Previous review"
          >
            <ArrowLeft className="h-4 w-4 text-pw-muted" />
          </button>
          <button
            onClick={next}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-30 w-11 h-11 rounded-full border border-pw-border bg-white/90 backdrop-blur hover:bg-pw-elevated hover:border-pw-sage/30 transition-all items-center justify-center shadow-pw"
            aria-label="Next review"
          >
            <ArrowRight className="h-4 w-4 text-pw-muted" />
          </button>
        </div>

        {/* Navigation dots */}
        <div
          className="flex justify-center gap-0 mt-4"
          role="tablist"
          aria-label="Testimonial navigation"
        >
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goto(i)}
              className="relative flex items-center justify-center min-h-[44px] min-w-[44px]"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to review ${i + 1}`}
            >
              <span className={`block h-2.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-7 bg-pw-teal"
                  : "w-2.5 bg-pw-border hover:bg-pw-muted"
              }`} />
            </button>
          ))}
        </div>
      </FadeInSection>

      {/* CTA */}
      <FadeInSection delay={0.2} className="mt-10 text-center">
        <Button variant="secondary" asChild>
          <Link href="/reviews">
            Join {brand.reviewCount} Happy Pups
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </FadeInSection>
    </Section>
  );
}
