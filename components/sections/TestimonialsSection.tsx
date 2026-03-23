"use client";

import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
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
            i < count
              ? "fill-pw-amber text-pw-amber"
              : "fill-pw-border text-pw-border"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const featured = reviews.slice(0, 3);

  return (
    <Section id="reviews">
      <SectionHeading
        badge="Reviews"
        badgeTone="gold"
        title={
          <>
            Loved by <span className="text-pw-amber-600">{brand.reviewCount}+ dog owners</span>
          </>
        }
        subtitle={`Rated ${brand.googleRating} stars on Google. Here's what our clients say.`}
      />

      {/* Google rating badge */}
      <FadeInSection className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-3 bg-white rounded-full px-5 py-2.5 shadow-pw border border-pw-border">
          <div className="flex items-center gap-1">
            <span className="font-display text-2xl font-bold text-pw-charcoal">
              {brand.googleRating}
            </span>
            <StarRating count={5} />
          </div>
          <div className="h-5 w-[1px] bg-pw-border" />
          <span className="text-xs text-pw-muted">
            {brand.reviewCount} Google Reviews
          </span>
        </div>
      </FadeInSection>

      {/* Review cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {featured.map((review, i) => (
          <FadeInSection key={review.id} delay={i * 0.1}>
            <div className="rounded-2xl border border-pw-border bg-white p-6 hover:shadow-pw transition-shadow duration-300 h-full flex flex-col">
              {/* Stars */}
              <StarRating count={review.stars} />

              {/* Quote */}
              <p className="mt-4 text-sm text-pw-charcoal leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-5 pt-4 border-t border-pw-border/50">
                <p className="font-display font-bold text-pw-charcoal text-sm">
                  {review.name}
                </p>
                {review.dogName && (
                  <p className="text-xs text-pw-muted mt-0.5">
                    {review.dogName} &middot; {review.breed}
                  </p>
                )}
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>

      <FadeInSection delay={0.3} className="mt-12 text-center">
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
