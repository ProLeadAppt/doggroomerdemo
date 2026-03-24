"use client";

import { useRef } from "react";
import Link from "next/link";
import { Star, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { FadeInSection } from "../motion/FadeInSection";
import { reviews, brand } from "../../data/site";

import "swiper/css";

function AnimatedStars({ count, delay = 0 }: { count: number; delay?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + i * 0.08, duration: 0.3, type: "spring", stiffness: 300 }}
        >
          <Star
            className={`h-4 w-4 ${
              i < count
                ? "fill-pw-amber text-pw-amber"
                : "fill-pw-border text-pw-border"
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const swiperRef = useRef<SwiperType | null>(null);

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

      {/* Google rating badge — premium */}
      <FadeInSection className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-pw-lg border border-pw-amber/20">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-3xl font-bold text-pw-charcoal">
              {brand.googleRating}
            </span>
            <AnimatedStars count={5} />
          </div>
          <div className="h-6 w-[1px] bg-pw-border" />
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="text-xs text-pw-muted">
              {brand.reviewCount} Verified Reviews
            </span>
          </div>
        </div>
      </FadeInSection>

      {/* Swiper carousel */}
      <FadeInSection className="mt-12 relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!overflow-visible"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="rounded-2xl border border-pw-border bg-white p-6 hover:shadow-pw-lg hover:border-pw-amber/20 transition-[box-shadow,border-color] duration-500 h-full flex flex-col relative overflow-hidden group">
                {/* Decorative quote mark */}
                <span className="absolute top-3 right-4 font-display text-6xl leading-none text-pw-sage/[0.06] pointer-events-none select-none">
                  &ldquo;
                </span>

                <AnimatedStars count={review.stars} delay={0.2} />

                <p className="mt-4 text-sm text-pw-charcoal leading-relaxed flex-1 relative z-10">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="mt-5 pt-4 border-t border-pw-border/50 flex items-center gap-3">
                  {/* Avatar placeholder */}
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
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-10 h-10 rounded-full border border-pw-border bg-white hover:bg-pw-elevated hover:border-pw-sage/30 transition-[background-color,border-color] flex items-center justify-center"
            aria-label="Previous review"
          >
            <ArrowLeft className="h-4 w-4 text-pw-muted" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-10 h-10 rounded-full border border-pw-border bg-white hover:bg-pw-elevated hover:border-pw-sage/30 transition-[background-color,border-color] flex items-center justify-center"
            aria-label="Next review"
          >
            <ArrowRight className="h-4 w-4 text-pw-muted" />
          </button>
        </div>
      </FadeInSection>

      <FadeInSection delay={0.2} className="mt-10 text-center">
        <Button variant="secondary" asChild>
          <Link href="/reviews">
            Read All Reviews
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </FadeInSection>
    </Section>
  );
}
