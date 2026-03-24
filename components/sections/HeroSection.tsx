import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { hero, brand } from "@/data/site";

export function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 20% 60%, hsla(100,20%,55%,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 30%, hsla(20,55%,55%,0.05) 0%, transparent 60%)",
      }}
    >
      <div className="mx-auto w-full max-w-pw-container px-4 sm:px-6 py-20 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — content */}
          <div className="flex flex-col">
            {/* Badge */}
            <div className="hero-fade-in hero-fade-in-1">
              <Badge tone="gold">Est. {brand.established} &middot; Balmain, Sydney</Badge>
            </div>

            {/* H1 Headline */}
            <h1
              className="hero-fade-in hero-fade-in-2 mt-6 font-display text-display-hero font-bold text-pw-charcoal leading-tight"
            >
              {hero.headline}
            </h1>

            {/* Script tagline */}
            <p
              className="hero-fade-in hero-fade-in-3 mt-3 font-script text-2xl sm:text-3xl text-pw-terracotta"
            >
              {hero.tagline}
            </p>

            {/* Subheadline */}
            <p
              className="hero-fade-in hero-fade-in-4 mt-5 text-lg text-pw-muted leading-relaxed max-w-lg"
            >
              {hero.subheadline}
            </p>

            {/* CTAs */}
            <div
              className="hero-fade-in hero-fade-in-5 mt-8 flex flex-wrap gap-4"
            >
              <Link href={hero.cta.href}>
                <Button variant="primary" asChild>
                  {hero.cta.label}
                </Button>
              </Link>
              <Link href={hero.ctaSecondary.href}>
                <Button variant="secondary" asChild>
                  <Phone className="mr-2 h-4 w-4 inline-block" />
                  {hero.ctaSecondary.label}
                </Button>
              </Link>
            </div>

            {/* Trust line */}
            <p
              className="hero-fade-in hero-fade-in-6 mt-6 text-xs tracking-[0.15em] uppercase text-pw-muted"
            >
              {hero.trustLine}
            </p>
          </div>

          {/* Right column — image */}
          <div
            className="hero-scale-in relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-pw-xl"
          >
            <Image
              src={hero.image}
              alt="Professional dog grooming at Pawsome and Co studio in Balmain Sydney"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              className="object-cover"
              priority
              fetchPriority="high"
            />
            {/* Subtle bottom gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
