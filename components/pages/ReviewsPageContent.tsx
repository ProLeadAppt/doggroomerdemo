"use client";

import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { PageHero } from "../sections/PageHero";
import { Section } from "../layout/Section";
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

export function ReviewsPageContent() {
  const featured = reviews[0];
  const rest = reviews.slice(1);

  return (
    <>
      <PageHero
        badge="Reviews"
        badgeTone="gold"
        title={
          <>
            {brand.reviewCount}+ happy dog owners{" "}
            <span className="text-pw-amber-600">can&rsquo;t be wrong</span>
          </>
        }
        subtitle={`Rated ${brand.googleRating} stars on Google. Real reviews from real dog lovers.`}
      />

      {/* Aggregate rating */}
      <Section>
        <FadeInSection>
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-2 mb-3">
              {/* Google logo colors */}
              <span className="text-2xl font-bold" style={{ color: "#4285F4" }}>G</span>
              <span className="text-2xl font-bold" style={{ color: "#EA4335" }}>o</span>
              <span className="text-2xl font-bold" style={{ color: "#FBBC05" }}>o</span>
              <span className="text-2xl font-bold" style={{ color: "#4285F4" }}>g</span>
              <span className="text-2xl font-bold" style={{ color: "#34A853" }}>l</span>
              <span className="text-2xl font-bold" style={{ color: "#EA4335" }}>e</span>
              <span className="text-lg text-pw-muted ml-1">Reviews</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-display text-6xl font-bold text-pw-charcoal">
                {brand.googleRating}
              </span>
              <div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-pw-amber text-pw-amber" />
                  ))}
                </div>
                <p className="text-sm text-pw-muted mt-1">
                  Based on {brand.reviewCount} reviews
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Featured review */}
        <FadeInSection className="mb-12">
          <div className="rounded-2xl border-2 border-pw-amber/30 bg-pw-amber/5 p-8 text-center max-w-2xl mx-auto">
            <StarRating count={featured.stars} />
            <p className="mt-5 text-lg text-pw-charcoal leading-relaxed italic">
              &ldquo;{featured.text}&rdquo;
            </p>
            <div className="mt-5">
              <p className="font-display font-bold text-pw-charcoal">
                {featured.name}
              </p>
              {featured.dogName && (
                <p className="text-sm text-pw-muted mt-0.5">
                  {featured.dogName} &middot; {featured.breed} &middot; {featured.service}
                </p>
              )}
            </div>
          </div>
        </FadeInSection>

        {/* Review grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((review, i) => (
            <FadeInSection key={review.id} delay={i * 0.06}>
              <div className="rounded-2xl border border-pw-border bg-white p-6 hover:shadow-pw transition-shadow duration-300 h-full flex flex-col">
                <StarRating count={review.stars} />

                <p className="mt-4 text-sm text-pw-charcoal leading-relaxed flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="mt-5 pt-4 border-t border-pw-border/50">
                  <p className="font-display font-bold text-pw-charcoal text-sm">
                    {review.name}
                  </p>
                  {review.dogName && (
                    <p className="text-xs text-pw-muted mt-0.5">
                      {review.dogName} &middot; {review.breed}
                    </p>
                  )}
                  {review.service && (
                    <p className="text-[10px] text-pw-sage mt-1 font-medium">
                      {review.service}
                    </p>
                  )}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Leave review CTA */}
        <FadeInSection className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex flex-col items-center gap-4 rounded-2xl border border-pw-border bg-white p-8 shadow-pw"
          >
            <p className="font-display text-lg font-bold text-pw-charcoal">
              Love your experience?
            </p>
            <p className="text-sm text-pw-muted max-w-sm">
              Join {brand.reviewCount} happy dog owners and leave us a review. It takes 30 seconds and means the world.
            </p>
            <Button variant="accent" asChild>
              <Link href="#" target="_blank">
                Leave a Google Review
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </FadeInSection>
      </Section>

      {/* CTA */}
      <Section dark noDivider>
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-display text-display-lg text-white">
            Ready to join the pack?
          </h2>
          <p className="mt-3 text-pw-subtle">
            Book your groom today and see why {brand.reviewCount}+ dog owners trust us with their pups.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/booking">Book a Groom</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
