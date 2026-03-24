"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Star, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { FadeInSection } from "../motion/FadeInSection";
import { reviews, brand } from "../../data/site";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < count ? "fill-pw-amber text-pw-amber" : "fill-pw-border text-pw-border"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  // Auto-advance every 5s
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const timer = setInterval(() => {
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: el.clientWidth * 0.8, behavior: "smooth" });
      }
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

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
            <CheckCircle2 className="h-4 w-4 text-green-500" aria-hidden="true" />
            <span className="text-xs text-pw-muted">
              {brand.reviewCount} Verified Reviews
            </span>
          </div>
        </div>
      </FadeInSection>

      {/* CSS Scroll-snap carousel */}
      <FadeInSection className="mt-12 relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-snap-x snap-mandatory no-scrollbar pb-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[31%] snap-start"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="rounded-2xl border border-pw-border bg-white p-6 hover:shadow-pw-lg hover:border-pw-amber/20 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                {/* Quote mark */}
                <span className="absolute top-3 right-4 font-display text-6xl leading-none text-pw-sage/[0.06] pointer-events-none select-none" aria-hidden="true">
                  &ldquo;
                </span>

                <StarRating count={review.stars} />

                <p className="mt-4 text-sm text-pw-charcoal leading-relaxed flex-1 relative z-10">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="mt-5 pt-4 border-t border-pw-border/50 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pw-sage/20 to-pw-teal/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-xs font-bold text-pw-teal">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-display font-bold text-pw-charcoal text-sm">
                      {review.name}
                    </p>
                    {review.dogName && (
                      <p className="text-[11px] text-pw-muted">
                        {review.dogName} &middot; {review.breed}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-11 h-11 rounded-full border border-pw-border bg-white hover:bg-pw-elevated hover:border-pw-sage/30 transition-all flex items-center justify-center disabled:opacity-30"
            aria-label="Previous reviews"
          >
            <ArrowLeft className="h-4 w-4 text-pw-muted" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-11 h-11 rounded-full border border-pw-border bg-white hover:bg-pw-elevated hover:border-pw-sage/30 transition-all flex items-center justify-center disabled:opacity-30"
            aria-label="Next reviews"
          >
            <ArrowRight className="h-4 w-4 text-pw-muted" />
          </button>
        </div>
      </FadeInSection>

      <FadeInSection delay={0.2} className="mt-10 text-center">
        <Button variant="secondary" asChild>
          <Link href="/reviews">
            Read All Reviews
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </FadeInSection>
    </Section>
  );
}
