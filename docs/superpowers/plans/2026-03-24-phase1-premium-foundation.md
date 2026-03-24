# Phase 1: Premium Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the Pawsome & Co. dog grooming site to $20K quality with performance (Lighthouse 95-100), design elevation (premium micro-interactions), and conversion optimization (CTA strategy, social proof, copy) — all in one shippable Phase 1.

**Architecture:** Existing Next.js 16 + React 19 + Tailwind 3 + Framer Motion stack. No new frameworks. All changes are modifications to existing components, CSS, and data files. Images move from remote Unsplash to local `/public/images/`. Animations are lazy-loaded and tree-shaken.

**Tech Stack:** Next.js 16.1.7, React 19.2.4, Tailwind CSS 3.4.17, Framer Motion 12.37.0, lucide-react 0.577.0

**Spec:** `docs/superpowers/specs/2026-03-24-premium-upgrade-design.md`

---

## File Structure

### New Files
- `public/images/hero/` — 2-3 hero images (downloaded stock)
- `public/images/gallery/` — 6-8 gallery images
- `public/images/team/` — 4 team member photos
- `public/images/services/` — 6 service images
- `public/images/general/` — 4-5 lifestyle/atmosphere photos
- `components/conversion/StickyMobileCTA.tsx` — fixed bottom booking bar (mobile)
- `components/conversion/ExitIntent.tsx` — desktop exit-intent slide-in panel
- `components/ui/AnimatedCounter.tsx` — reusable scroll-triggered number counter
- `components/ui/SkipToContent.tsx` — accessibility skip link

### Modified Files
- `app/globals.css` — remove dead CSS, add new utilities
- `app/layout.tsx` — font subsetting, skip-to-content
- `app/page.tsx` — add Suspense boundaries, restructure imports
- `next.config.mjs` — remove remote image patterns (moving to local)
- `tailwind.config.ts` — remove unused keyframes
- `data/site.ts` — copy upgrades, new social proof data
- `components/layout/SiteHeader.tsx` — CTA state change on scroll, nav underline morph
- `components/layout/SiteFooter.tsx` — cleanup, performance
- `components/layout/ClientSideEffects.tsx` — conditional loading improvements
- `components/sections/HeroSection.tsx` — split layout, staggered entrance, responsive hero
- `components/sections/TrustBar.tsx` — animated entrance, badge slides
- `components/sections/ServicesOverview.tsx` — staggered cards, hover icons, price anchors
- `components/sections/BeforeAfterGallery.tsx` — auto-teach interaction, captions
- `components/sections/TestimonialsSection.tsx` — depth carousel, auto-advance
- `components/sections/FinalCTA.tsx` — dark section, shimmer, pulsing CTA, trust stats
- `components/sections/OfferBanner.tsx` — conversion copy
- `components/sections/QuickInfoStrip.tsx` — animated counters
- `components/sections/FAQSection.tsx` — accessibility improvements
- `components/sections/MeetTheTeam.tsx` — hover interactions
- `components/sections/WhyPawsome.tsx` — refined animations
- `components/sections/HowItWorks.tsx` — refined animations
- `components/motion/FadeInSection.tsx` — add direction variants
- `components/motion/ScrollVelocity.tsx` — lazy-load optimization
- `components/motion/CustomCursor.tsx` — performance optimization
- `components/ui/Button.tsx` — fill-from-center hover, spring click
- `components/ui/Card.tsx` — performance refinement
- `components/ui/FormInput.tsx` — floating labels, animated validation
- `components/ui/BeforeAfterSlider.tsx` — auto-teach, touch optimization
- `components/ui/CookieConsent.tsx` — accessibility improvements
- `components/pages/BookingPageContent.tsx` — reduced fields, smart defaults, reassurance, confetti
- `components/pages/ContactPageContent.tsx` — floating labels, validation animations

---

## Task 1: Performance — Bundle Cleanup & Dead Code Removal

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `components/layout/ClientSideEffects.tsx`
- Modify: `next.config.mjs`

- [ ] **Step 1: Audit globals.css for dead CSS**

Read `app/globals.css` and identify CSS utilities referencing deleted components (Preloader, GrainOverlay, SmoothScroll). Also identify any unused keyframes or utility classes.

- [ ] **Step 2: Remove dead CSS from globals.css**

Remove any CSS rules that are unused. Keep: spotlight-card, text-shimmer, section-divider, no-scrollbar, card-glow, text-gradient-sage, text-gradient-warm, paw-stripe-animated, prefers-reduced-motion rules, safe-area support.

- [ ] **Step 3: Audit tailwind.config.ts keyframes**

Check `tailwind.config.ts` (176 lines) — verify all keyframes (`marquee`, `marquee-slow`, `marquee-reverse`, `fade-in-up`, `shimmer`, `pulse-glow`, `float`, `scale-in`, `stripe-shift`) are actually used in components. Remove any unused ones.

- [ ] **Step 4: Clean up ClientSideEffects.tsx**

In `components/layout/ClientSideEffects.tsx` (19 lines), verify dynamic imports are SSR-disabled and add a media query check so CustomCursor only loads on non-touch devices:

```tsx
"use client";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/motion/CustomCursor"), {
  ssr: false,
});
const CookieConsent = dynamic(() => import("@/components/ui/CookieConsent"), {
  ssr: false,
});

export default function ClientSideEffects() {
  return (
    <>
      <CustomCursor />
      <CookieConsent />
    </>
  );
}
```

- [ ] **Step 5: Update next.config.mjs for local images**

Once images are local, remove the Unsplash remote pattern from `next.config.mjs`. Keep AVIF/WebP format config:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

- [ ] **Step 6: Run build to verify no breakage**

Run: `npm run build`
Expected: Build succeeds with no errors. Warnings about unused imports are acceptable at this stage.

- [ ] **Step 7: Commit**

```bash
git add app/globals.css tailwind.config.ts components/layout/ClientSideEffects.tsx next.config.mjs
git commit -m "perf: remove dead CSS, clean up bundle, prepare for local images"
```

---

## Task 2: Performance — Image Strategy (Local Stock Photos)

**Files:**
- Create: `public/images/` directory structure
- Modify: `data/site.ts` — update all image URLs
- Modify: Every component using Unsplash URLs

- [ ] **Step 1: Create image directory structure**

```bash
mkdir -p public/images/hero public/images/gallery public/images/team public/images/services public/images/general
```

- [ ] **Step 2: Download curated stock photos**

Download ~20-25 high-quality dog grooming images from Pexels/Unsplash. Save locally with descriptive names:

```
public/images/hero/golden-retriever-grooming.jpg      # Main hero
public/images/hero/grooming-studio-interior.jpg        # Alt hero
public/images/gallery/cavoodle-before.jpg              # Before/after pairs
public/images/gallery/cavoodle-after.jpg
public/images/gallery/poodle-before.jpg
public/images/gallery/poodle-after.jpg
public/images/gallery/golden-before.jpg
public/images/gallery/golden-after.jpg
public/images/gallery/shih-tzu-groomed.jpg
public/images/gallery/samoyed-groomed.jpg
public/images/team/sophie-chen.jpg                     # Team
public/images/team/marcus-williams.jpg
public/images/team/emily-rodriguez.jpg
public/images/team/jack-thompson.jpg
public/images/services/bath-and-tidy.jpg               # Services
public/images/services/full-groom.jpg
public/images/services/puppy-first-groom.jpg
public/images/services/the-works.jpg
public/images/services/deshedding.jpg
public/images/services/breed-specific.jpg
public/images/general/happy-dog-studio.jpg             # Lifestyle
public/images/general/grooming-tools.jpg
public/images/general/dog-spa-atmosphere.jpg
public/images/general/owner-dog-reunion.jpg
```

Use images that are at least 1200px wide. Prioritize real grooming studio photography over generic pet photos.

- [ ] **Step 3: Generate blur placeholder data URLs**

Since images are in `/public/` (not statically importable in Next.js app router), we need to generate base64 blur placeholders manually. Create a Node.js script to automate this:

Create `scripts/generate-blur-placeholders.mjs`:
```js
// Run: node scripts/generate-blur-placeholders.mjs
// Reads all images from public/images/ and generates tiny base64 blur data URLs
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative, parse } from "path";

function getImages(dir, base = dir) {
  const entries = [];
  for (const f of readdirSync(dir)) {
    const full = join(dir, f);
    if (statSync(full).isDirectory()) entries.push(...getImages(full, base));
    else if (/\.(jpe?g|png|webp)$/i.test(f)) {
      const rel = relative(base, full).replace(/\\/g, "/");
      const key = rel.replace(/\.[^.]+$/, "").replace(/\//g, "-");
      const data = readFileSync(full).toString("base64");
      // Use a tiny version — for real LQIP, resize first with sharp
      entries.push({ key, path: `/images/${rel}` });
    }
  }
  return entries;
}

const images = getImages("public/images");
// Note: For proper LQIP, install `sharp` and resize to 10px width before encoding
// For now, use Next.js Image component with placeholder="empty" and add blur later
console.log(`Found ${images.length} images`);
```

**Simpler approach:** Use `placeholder="empty"` on Next.js Image components initially. Add proper LQIP blur placeholders as a polish step during Task 16 (Lighthouse verification) if LCP/CLS needs improvement. This avoids blocking the image migration on a build script dependency.

- [ ] **Step 4: Update data/site.ts image URLs**

Replace all Unsplash URLs in `data/site.ts` with local paths:

```ts
// Before:
image: "https://images.unsplash.com/photo-xxx?w=800"
// After:
image: "/images/services/bath-and-tidy.jpg"
```

Update: `hero.image`, all `services[].image`, all `galleryItems[].image` (and `beforeImage`, `afterImage`), all `team[].image`, all `reviews[].avatar`, all `blogPosts[].image`.

- [ ] **Step 5: Update HeroSection.tsx for local images with priority loading**

In `components/sections/HeroSection.tsx`, update the Image component to use local path, add `blurDataURL`, and ensure `priority={true}` for LCP:

```tsx
<Image
  src="/images/hero/golden-retriever-grooming.jpg"
  alt="Professional dog grooming at Pawsome & Co. studio in Balmain"
  fill
  priority
  placeholder="blur"
  blurDataURL={blurPlaceholders["hero-golden"]}
  sizes="100vw"
  className="object-cover"
/>
```

- [ ] **Step 6: Update all other components using images**

Update Image components in: ServicesOverview.tsx, BeforeAfterGallery.tsx, TestimonialsSection.tsx, MeetTheTeam.tsx, GalleryPageContent.tsx, AboutPageContent.tsx, BlogListContent.tsx, blog/[slug]/page.tsx. Add `sizes` prop, `placeholder="blur"`, and descriptive `alt` text to every image.

- [ ] **Step 7: Run build and verify images load**

Run: `npm run build && npm start`
Check: All pages load with local images. No 404s in network tab. Hero image loads with blur-up effect.

- [ ] **Step 8: Commit**

```bash
git add public/images/ lib/image-placeholders.ts data/site.ts components/ app/
git commit -m "perf: replace remote images with optimized local stock photos"
```

---

## Task 3: Performance — Font Optimization & Accessibility Foundation

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/ui/SkipToContent.tsx`
- Modify: `app/page.tsx` — add main landmark id
- Modify: `app/globals.css` — skip-to-content styles

- [ ] **Step 1: Verify font configuration in layout.tsx**

Read `app/layout.tsx` (99 lines). Verify the three fonts (Quicksand, DM_Sans, Pacifico) use `display: 'swap'` and `subsets: ['latin']`. Next.js `next/font` handles this — confirm the config:

```ts
const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500"],
});

const pacifico = Pacifico({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-script",
  weight: "400",
});
```

- [ ] **Step 2: Create SkipToContent component**

Create `components/ui/SkipToContent.tsx`:

```tsx
export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-pw-terracotta focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-pw-terracotta/50 focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}
```

- [ ] **Step 3: Add SkipToContent to layout.tsx and main landmark to pages**

In `app/layout.tsx`, add `<SkipToContent />` as the first child of `<body>`.

In `app/page.tsx`, wrap the main content (after SiteHeader) with `<main id="main-content">`. Do the same pattern for all other page files (`app/services/page.tsx`, `app/about/page.tsx`, etc.).

- [ ] **Step 4: Audit and fix ARIA labels**

Review interactive components for missing ARIA:
- `SiteHeader.tsx`: Verify mobile menu button has `aria-label="Open menu"` / `"Close menu"` and `aria-expanded`
- `BeforeAfterSlider.tsx`: Add `role="slider"`, `aria-label="Drag to compare before and after"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- `FAQSection.tsx`: Verify accordion uses `aria-expanded` on buttons
- `TestimonialsSection.tsx`: Add `aria-label` on carousel navigation buttons
- `CookieConsent.tsx`: Add `role="dialog"`, `aria-label="Cookie consent"`

- [ ] **Step 5: Add prefers-reduced-motion to all Framer Motion animations**

Framer Motion respects `prefers-reduced-motion` automatically since v10. Verify this is working by checking that animations use the `motion` component (not raw CSS animations). For any CSS animations in `globals.css`, ensure the existing `@media (prefers-reduced-motion: reduce)` block covers them all.

- [ ] **Step 6: Run build**

Run: `npm run build`
Expected: Clean build with no errors.

- [ ] **Step 7: Commit**

```bash
git add app/layout.tsx app/page.tsx app/services/page.tsx app/about/page.tsx app/gallery/page.tsx app/reviews/page.tsx app/contact/page.tsx app/blog/page.tsx app/booking/page.tsx components/ui/SkipToContent.tsx components/ app/globals.css
git commit -m "a11y: add skip-to-content, ARIA labels, font optimization"
```

---

## Task 4: Design — Hero Section Redesign

**Files:**
- Modify: `components/sections/HeroSection.tsx` (146 lines → ~180 lines)
- Modify: `data/site.ts` — hero copy updates

- [ ] **Step 1: Update hero copy in data/site.ts**

Update the `hero` object:

```ts
export const hero = {
  headline: "Balmain's Most-Loved Dog Grooming Studio",
  subheadline: "Premium grooming, gentle care, and tail-wagging results — trusted by 2,400+ Sydney pup parents since 2019.",
  tagline: "where every pup is a VIP",
  cta: { label: "Book Your Pup's Pamper Day", href: "/booking" },
  ctaSecondary: { label: "Call (02) 8912 3456", href: "tel:+61289123456" },
  image: "/images/hero/golden-retriever-grooming.jpg",
  trustLine: "★ 4.9 Google Rating · 127+ Reviews · Est. 2019 · Balmain",
};
```

- [ ] **Step 2: Redesign HeroSection with split layout and staggered entrance**

Rewrite `components/sections/HeroSection.tsx`:

```tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { hero, brand } from "@/data/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-pw-cream">
      {/* Background decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pw-sage/5 via-transparent to-pw-terracotta/5" />

      <div className="relative mx-auto w-full max-w-pw-wide px-6 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-6 lg:space-y-8"
          >
            <motion.div variants={fadeUp}>
              <Badge tone="sage">Est. 2019 · Balmain, Sydney</Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-display-hero font-bold text-pw-charcoal leading-[1.05] tracking-tight"
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-script text-xl lg:text-2xl text-pw-terracotta"
            >
              {hero.tagline}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-lg text-pw-muted max-w-lg leading-relaxed"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href={hero.cta.href}>
                <Button variant="primary">{hero.cta.label}</Button>
              </Link>
              <a href={hero.ctaSecondary.href}>
                <Button variant="secondary">
                  <Phone className="w-4 h-4 mr-2" />
                  {hero.ctaSecondary.label}
                </Button>
              </a>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-sm text-pw-muted font-medium"
            >
              {hero.trustLine}
            </motion.p>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-pw-xl"
          >
            <Image
              src={hero.image}
              alt="A beautifully groomed golden retriever at Pawsome & Co. studio in Balmain"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Subtle gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Mobile: full-bleed variant */}
      {/* On mobile (below lg), the grid stacks: content on top, image below */}
      {/* The responsive grid handles this automatically */}
    </section>
  );
}
```

- [ ] **Step 3: Verify hero renders correctly on desktop and mobile**

Run: `npm run dev`
Check desktop (1440px): split layout, content left, image right, staggered entrance.
Check mobile (375px): stacked layout, content top, image below, all animations fire.

- [ ] **Step 4: Commit**

```bash
git add components/sections/HeroSection.tsx data/site.ts
git commit -m "design: redesign hero with split layout and staggered entrance"
```

---

## Task 5: Design — Trust Bar & Animated Counters

**Files:**
- Create: `components/ui/AnimatedCounter.tsx`
- Modify: `components/sections/TrustBar.tsx` (134 lines)

- [ ] **Step 1: Create reusable AnimatedCounter component**

Create `components/ui/AnimatedCounter.tsx`:

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
```

- [ ] **Step 2: Redesign TrustBar with animated entrance**

Update `components/sections/TrustBar.tsx` to use AnimatedCounter and add animated badge entrances. Stars should animate in sequence, badges should slide in. Keep the marquee but clean it up.

Key changes:
- Replace the inline counter logic with `<AnimatedCounter>` component
- Add staggered entrance for stat items using `motion.div` with `whileInView`
- Star icons animate in with 50ms stagger
- Ensure `aria-label` on stats for screen readers

- [ ] **Step 3: Verify trust bar animations**

Run: `npm run dev`
Scroll to trust bar. Verify: stars animate in sequence, numbers count up, badges slide in. Only fires once.

- [ ] **Step 4: Commit**

```bash
git add components/ui/AnimatedCounter.tsx components/sections/TrustBar.tsx
git commit -m "design: animated trust bar with counting stats and staggered entrance"
```

---

## Task 6: Design — Services Cards with Staggered Reveal

**Files:**
- Modify: `components/sections/ServicesOverview.tsx` (149 lines)
- Modify: `data/site.ts` — add "most popular" and booking count data

- [ ] **Step 1: Add social proof data to services in data/site.ts**

Add `popular: true` flag to the most-booked service and a `bookingsThisMonth` stat:

```ts
// In the stats object or a new conversion data object:
export const conversionData = {
  bookingsThisMonth: 127,
  spotsLeftThisWeek: 3,
  totalGrooms: 2400,
};
```

- [ ] **Step 2: Redesign ServicesOverview with staggered card entrance**

Update `components/sections/ServicesOverview.tsx`:
- Cards enter from below with 100ms stagger between each
- Hover: card lifts (translateY -8px) with shadow depth increase
- Each card shows "from $XX" price anchor prominently
- "Most Popular" badge on the popular service
- "127 booked this month" counter below the services grid
- Contextual CTA at bottom: "Find Your Perfect Groom →"

Use `motion.div` with `whileInView` and stagger:

```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
```

- [ ] **Step 3: Verify service cards animation**

Run: `npm run dev`
Scroll to services section. Cards should fan in from below with visible stagger. Hover should lift cards.

- [ ] **Step 4: Commit**

```bash
git add components/sections/ServicesOverview.tsx data/site.ts
git commit -m "design: staggered service cards with social proof badges"
```

---

## Task 7: Design — Before/After Gallery Enhancement

**Files:**
- Modify: `components/ui/BeforeAfterSlider.tsx` (121 lines)
- Modify: `components/sections/BeforeAfterGallery.tsx` (101 lines)

- [ ] **Step 1: Add auto-teach animation to BeforeAfterSlider**

Update `components/ui/BeforeAfterSlider.tsx`:
- When the slider scrolls into view for the first time, auto-animate the handle from 30% → 70% → 50% over 2 seconds
- This teaches users they can drag the handle
- Use `useInView` to trigger once
- Enlarge the grab handle on mobile (48px minimum touch target)
- Add `role="slider"`, `aria-label`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuenow`

- [ ] **Step 2: Add captions to gallery items**

Update `components/sections/BeforeAfterGallery.tsx`:
- Below each before/after pair, show: dog name, breed, and a short owner quote
- Add contextual CTA at section end: "See What We Can Do for Your Pup →"
- Stagger gallery items on entrance

- [ ] **Step 3: Update gallery data in data/site.ts**

Ensure each `galleryItems[]` entry has `dogName`, `breed`, and `ownerQuote` fields. Add them to `data/types.ts` as well:

```ts
// In types.ts, update GalleryItem:
export interface GalleryItem {
  id: string;
  label: string;
  description: string;
  image: string;
  category: string;
  beforeImage?: string;
  afterImage?: string;
  dogName?: string;
  breed?: string;
  ownerQuote?: string;
}
```

- [ ] **Step 4: Verify slider interaction**

Run: `npm run dev`
Scroll to gallery. Verify auto-teach fires once. Drag works on desktop and touch. Captions show.

- [ ] **Step 5: Commit**

```bash
git add components/ui/BeforeAfterSlider.tsx components/sections/BeforeAfterGallery.tsx data/site.ts data/types.ts
git commit -m "design: enhanced gallery with auto-teach slider and captions"
```

---

## Task 8: Design — Testimonials Depth Carousel

**Files:**
- Modify: `components/sections/TestimonialsSection.tsx` (181 lines)

- [ ] **Step 1: Redesign testimonials as depth-based carousel**

Rewrite `components/sections/TestimonialsSection.tsx`:
- Center card is full size and full opacity
- Adjacent cards are scaled to 0.85 and 60% opacity
- Auto-advance every 5s
- Pause on hover (desktop) and touch (mobile)
- Large decorative quotation marks (CSS or SVG)
- Each review shows: customer name, dog breed, service used, star rating
- Navigation dots below
- Add `aria-label` to navigation controls
- Contextual CTA: "Join 127 Happy Pups →"

Use Framer Motion's `AnimatePresence` for smooth transitions between active cards. Track active index with `useState` and `useEffect` interval.

- [ ] **Step 2: Verify carousel behavior**

Run: `npm run dev`
Verify: center card prominent, sides dimmed, auto-advances, pauses on interaction, touch swipe works on mobile.

- [ ] **Step 3: Commit**

```bash
git add components/sections/TestimonialsSection.tsx
git commit -m "design: depth-based testimonial carousel with auto-advance"
```

---

## Task 9: Design — Final CTA & Section Micro-Interactions

**Files:**
- Modify: `components/sections/FinalCTA.tsx` (84 lines)
- Modify: `components/sections/WhyPawsome.tsx` (69 lines)
- Modify: `components/sections/HowItWorks.tsx` (94 lines)
- Modify: `components/sections/MeetTheTeam.tsx` (109 lines)
- Modify: `components/sections/FAQSection.tsx` (69 lines)

- [ ] **Step 1: Redesign FinalCTA as dark conversion section**

Update `components/sections/FinalCTA.tsx`:
- Dark background (pw-charcoal with warm gradient to dark sage)
- Large headline with shimmer text effect: "Your Pup Deserves the Best — Book Today"
- Subtext with trust reinforcement: "★ 4.9 stars · 2,400+ happy grooms · Est. 2016"
- Pulsing CTA button with glow effect (use `pulse-glow` keyframe)
- Second CTA: "Or Call Us: (02) 8912 3456"

- [ ] **Step 2: Refine WhyPawsome animations**

Update `components/sections/WhyPawsome.tsx`:
- Stagger the 3 value cards on entrance (100ms each)
- Icon hover: scale + color shift animation
- Cards fade-slide from left on scroll

- [ ] **Step 3: Refine HowItWorks animations**

Update `components/sections/HowItWorks.tsx`:
- Steps stagger in with 150ms delay
- Connector line draws progressively as steps appear
- Step numbers count in

- [ ] **Step 4: Refine MeetTheTeam interactions**

Update `components/sections/MeetTheTeam.tsx`:
- Team cards stagger on entrance
- Hover: image shifts up slightly, specialty badges fade in
- Photo has subtle desaturate → full color on hover

- [ ] **Step 5: Improve FAQSection accessibility**

Update `components/sections/FAQSection.tsx`:
- Ensure accordion buttons have `aria-expanded` toggling
- Answers use `aria-hidden` when collapsed
- Smooth height animation on open/close using Framer Motion `AnimatePresence` + `motion.div` with `initial/animate/exit` height
- Add contextual CTA: "Still Have Questions? Let's Chat →"

- [ ] **Step 6: Verify all section animations**

Run: `npm run dev`
Scroll through entire homepage. Each section should have visible, polished entrance animation. No jank.

- [ ] **Step 7: Commit**

```bash
git add components/sections/FinalCTA.tsx components/sections/WhyPawsome.tsx components/sections/HowItWorks.tsx components/sections/MeetTheTeam.tsx components/sections/FAQSection.tsx
git commit -m "design: polished micro-interactions across all homepage sections"
```

---

## Task 10: Design — Navigation & Button Upgrades

**Files:**
- Modify: `components/layout/SiteHeader.tsx` (145 lines)
- Modify: `components/ui/Button.tsx` (58 lines)

- [ ] **Step 1: Upgrade SiteHeader with morphing nav and scroll CTA**

Update `components/layout/SiteHeader.tsx`:
- Active nav link has underline that slides/morphs between items (use `motion.div` with `layoutId` for shared layout animation)
- Header CTA changes from ghost → filled variant after 100px scroll
- Mobile menu: links stagger in with 80ms delay each
- Header background gains `backdrop-blur-lg` after 50px scroll (smooth transition)
- Scroll progress indicator: thin line (2px) at bottom of header, sage-colored, width tied to scroll progress

- [ ] **Step 2: Upgrade Button with fill-from-center hover**

Update `components/ui/Button.tsx`:
- Primary variant hover: background fills from center outward using a pseudo-element or radial gradient transition
- Click: `whileTap={{ scale: 0.95 }}` with spring bounce (already partial — refine spring config)
- Add `transition: { type: "spring", stiffness: 400, damping: 17 }` for snappy feel
- Keep magnetic effect via MagneticButton wrapper (separate component)

- [ ] **Step 3: Verify nav and button interactions**

Run: `npm run dev`
Check: nav underline morphs between links, header CTA changes on scroll, mobile menu staggers, buttons feel snappy.

- [ ] **Step 4: Commit**

```bash
git add components/layout/SiteHeader.tsx components/ui/Button.tsx
git commit -m "design: morphing nav underline, scroll-aware CTA, snappy buttons"
```

---

## Task 11: Conversion — Mobile Sticky CTA & Exit Intent

**Files:**
- Create: `components/conversion/StickyMobileCTA.tsx`
- Create: `components/conversion/ExitIntent.tsx`
- Modify: `app/page.tsx` — add conversion components
- Modify: `components/layout/ClientSideEffects.tsx` — add lazy loads

- [ ] **Step 1: Create StickyMobileCTA component**

Create `components/conversion/StickyMobileCTA.tsx`:

```tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import Link from "next/link";
import { brand } from "@/data/site";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      const bookingSection = document.getElementById("booking");
      const bookingVisible = bookingSection
        ? bookingSection.getBoundingClientRect().top < window.innerHeight
        : false;

      setVisible(window.scrollY > heroHeight && !bookingVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 inset-x-0 z-40 lg:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="bg-white/95 backdrop-blur-lg border-t border-pw-border px-4 py-3 flex gap-3">
            <Link
              href="/booking"
              className="flex-1 bg-pw-terracotta text-white text-center py-3 rounded-full font-display font-bold text-sm"
            >
              Book Your Pup's Pamper Day
            </Link>
            <a
              href={`tel:${brand.phone.replace(/\s/g, "")}`}
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-pw-sage text-pw-sage"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Create ExitIntent component**

Create `components/conversion/ExitIntent.tsx`:

```tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

export default function ExitIntent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Desktop only
    if ("ontouchstart" in window) return;

    const alreadyShown = sessionStorage.getItem("pw-exit-intent");
    if (alreadyShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10) {
        setVisible(true);
        sessionStorage.setItem("pw-exit-intent", "true");
        document.removeEventListener("mouseout", handleMouseLeave);
      }
    };

    // Delay activation so it doesn't fire immediately
    const timer = setTimeout(() => {
      document.addEventListener("mouseout", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-1/4 right-0 z-50 w-80 bg-white rounded-l-2xl shadow-pw-xl border border-pw-border p-6 hidden lg:block"
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 text-pw-muted hover:text-pw-charcoal"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
        <p className="font-script text-pw-terracotta text-lg mb-2">
          Before you go...
        </p>
        <h3 className="font-display font-bold text-xl text-pw-charcoal mb-2">
          20% Off Your First Groom
        </h3>
        <p className="text-sm text-pw-muted mb-4">
          New to Pawsome & Co.? Book today and save on your pup's first pamper session.
        </p>
        <Link
          href="/booking"
          className="block w-full text-center bg-pw-terracotta text-white py-3 rounded-full font-display font-bold text-sm hover:bg-pw-terracotta/90 transition-colors"
        >
          Claim Your 20% Off
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Add conversion components to the app**

In `components/layout/ClientSideEffects.tsx`, add dynamic imports for both:

```tsx
const StickyMobileCTA = dynamic(() => import("@/components/conversion/StickyMobileCTA"), { ssr: false });
const ExitIntent = dynamic(() => import("@/components/conversion/ExitIntent"), { ssr: false });
```

Render them alongside CustomCursor and CookieConsent.

- [ ] **Step 4: Verify conversion components**

Run: `npm run dev`
Mobile: scroll past hero → sticky bar appears. Scroll to booking section → bar hides.
Desktop: move cursor to top of browser → exit intent panel slides in from right. Dismiss works. Only shows once per session.

- [ ] **Step 5: Commit**

```bash
git add components/conversion/ components/layout/ClientSideEffects.tsx
git commit -m "conversion: add mobile sticky CTA bar and desktop exit intent"
```

---

## Task 12: Conversion — Booking Funnel Improvements

**Files:**
- Modify: `components/pages/BookingPageContent.tsx` (453 lines)
- Modify: `components/pages/ContactPageContent.tsx` (173 lines) — also apply floating labels
- Modify: `components/ui/FormInput.tsx` (61 lines)

- [ ] **Step 1: Add floating labels to FormInput**

Update `components/ui/FormInput.tsx` to support floating labels:
- Label starts inside the input field (placeholder position)
- On focus or when value is present, label shrinks and translates up
- Border color animates from `pw-border` → `pw-sage` on focus
- Error state: border turns red, error message slides in from below
- Use CSS transitions (not Framer Motion) for performance

- [ ] **Step 2: Simplify booking form fields**

In `components/pages/BookingPageContent.tsx`:
- Reduce required fields to: name, phone, dog breed, preferred service
- Make date/time, email, and notes optional (still available but clearly marked optional)
- Pre-select "The Works" as default service (most popular)
- Add inline trust signals below the form: "Free cancellation · Confirmed within 2 hours · No payment required"

- [ ] **Step 3: Add price estimate display**

As the user selects a service, show a live price estimate below the service selector:

```tsx
<p className="text-sm text-pw-sage font-medium mt-2">
  Estimated price: from ${selectedService?.price ?? "—"}
</p>
```

- [ ] **Step 4: Add success celebration state**

After form submission (the simulated confirmation), show:
- Animated checkmark (SVG path animation or Framer Motion)
- "You're Booked!" heading with spring animation
- Booking summary
- "What happens next" steps (1. Confirmation email, 2. Reminder 24h before, 3. Bring your pup!)
- Keep it simple — no confetti library, just a tasteful animated checkmark + text

- [ ] **Step 5: Add reassurance elements throughout the form**

At the top of the booking form:
- "3 spots left this week" badge (static, for conversion psychology)
- Small trust line: "★ 4.9 · 2,400+ happy grooms"

- [ ] **Step 6: Apply floating labels to ContactPageContent**

Update `components/pages/ContactPageContent.tsx` to use the upgraded `FormInput` component with floating labels. The contact form (name, email, phone, message) should get the same treatment: animated focus borders, floating labels, slide-in validation.

- [ ] **Step 7: Verify booking and contact flows**

Run: `npm run dev`, go to /booking and /contact.
Walk through both forms. Verify: floating labels, price estimate updates (booking), trust signals visible, success state animates.

- [ ] **Step 8: Commit**

```bash
git add components/pages/BookingPageContent.tsx components/pages/ContactPageContent.tsx components/ui/FormInput.tsx
git commit -m "conversion: streamlined booking funnel with trust signals and celebration"
```

---

## Task 13: Conversion — Copy & Social Proof Throughout

**Files:**
- Modify: `data/site.ts` — copy updates throughout
- Modify: `components/sections/OfferBanner.tsx`
- Modify: `components/sections/QuickInfoStrip.tsx`
- Modify: Various section components — add contextual CTAs

- [ ] **Step 1: Update all copy in data/site.ts**

Comprehensive copy pass through `data/site.ts`:
- Service descriptions: tighten, make benefit-oriented
- FAQ answers: add conversion-friendly language
- About story: strengthen credibility
- Review text: ensure each mentions specific service and dog breed

- [ ] **Step 2: Add contextual CTAs to sections**

Each homepage section should end with a relevant CTA link:
- After ServicesOverview: "Find Your Perfect Groom →" (link to /services)
- After TestimonialsSection: "Join 127 Happy Pups →" (link to /booking)
- After BeforeAfterGallery: "See What We Can Do for Your Pup →" (link to /gallery)
- After FAQSection: "Still Have Questions? Let's Chat →" (link to /contact)

These are small `<Link>` components at the bottom of each section, styled with terracotta text and arrow icon.

- [ ] **Step 3: Update OfferBanner with conversion copy**

Tighten `components/sections/OfferBanner.tsx` — make the offer more compelling with urgency language and clear value proposition.

- [ ] **Step 4: Verify copy changes render correctly**

Run: `npm run dev`
Read through the entire homepage. Copy should feel tighter, more benefit-oriented, with clear next-step CTAs after each section.

- [ ] **Step 5: Commit**

```bash
git add data/site.ts components/sections/
git commit -m "conversion: tighten copy, add contextual CTAs, strengthen social proof"
```

---

## Task 14: Responsive — Device-Native Polish

**Files:**
- Modify: Multiple component files for responsive refinement
- Modify: `app/globals.css` — mobile-specific utilities

- [ ] **Step 1: Audit all components at mobile viewport (375px)**

Open dev tools, set viewport to 375px (iPhone SE). Walk through every page:
- Check: no horizontal overflow, no text clipping, tap targets ≥ 48px, readable font sizes
- Note any issues

- [ ] **Step 2: Audit all components at tablet viewport (768px)**

Set viewport to 768px (iPad). Walk through every page:
- Check: grid layouts adapt properly, images aren't stretched, spacing is appropriate
- Note any issues

- [ ] **Step 3: Fix identified responsive issues**

Address all issues found in steps 1-2. Common fixes:
- Padding/margin adjustments at breakpoints
- Font size scaling
- Grid column count changes
- Image aspect ratio adjustments
- Touch target sizing
- Hiding desktop-only elements (custom cursor, magnetic effects)

- [ ] **Step 4: Add safe-area support for iOS**

Ensure `app/globals.css` has complete safe-area support:
```css
/* Already partial — verify completeness */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .sticky-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
```

Verify the StickyMobileCTA and SiteFooter respect safe area insets.

- [ ] **Step 5: Test on real devices if possible, or use Chrome device emulation**

Run: `npm run dev`
Test: iPhone SE (375px), iPhone 14 Pro (393px), iPad (768px), iPad Pro (1024px), Desktop (1440px).

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "responsive: device-native polish across all breakpoints"
```

---

## Task 15: Performance — Lazy Loading & Suspense Boundaries

**Files:**
- Modify: `app/page.tsx` (54 lines)
- Modify: `components/motion/ScrollVelocity.tsx` — dynamic import candidate

- [ ] **Step 1: Add Suspense boundaries to homepage**

In `app/page.tsx`, wrap below-fold sections in React `Suspense` with lightweight fallbacks:

```tsx
import dynamic from "next/dynamic";

// Eagerly loaded (above fold)
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";

// Lazy loaded (below fold)
const ServicesOverview = dynamic(() => import("@/components/sections/ServicesOverview"));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const BeforeAfterGallery = dynamic(() => import("@/components/sections/BeforeAfterGallery"));
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"));
const MeetTheTeam = dynamic(() => import("@/components/sections/MeetTheTeam"));
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"));
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA"));
const ScrollVelocity = dynamic(() => import("@/components/motion/ScrollVelocity"), { ssr: false });
```

- [ ] **Step 2: Ensure no layout shift from lazy loading**

Each dynamically imported component should have a minimum height set via CSS or a lightweight skeleton, so the page doesn't jump when components load. Use `min-h-[400px]` or similar on wrapper divs.

- [ ] **Step 3: Run build and check bundle analysis**

Run: `npm run build`
Check the build output for page sizes. The homepage JS bundle should be noticeably smaller with dynamic imports.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "perf: lazy-load below-fold sections with dynamic imports"
```

---

## Task 16: Final Verification — Lighthouse & Cross-Browser

**Files:** None (testing only)

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Clean build, no errors, no warnings.

- [ ] **Step 2: Start production server**

```bash
npm start
```

- [ ] **Step 3: Run Lighthouse audit on homepage**

Open Chrome DevTools → Lighthouse tab. Run audit for:
- Performance
- Accessibility
- Best Practices
- SEO

Target: 95-100 on all four categories.

If any score is below 95, identify the failing audits and fix them. Common fixes:
- Performance: image sizes, unused CSS, render-blocking resources
- Accessibility: missing alt text, contrast ratios, ARIA
- Best Practices: HTTPS, console errors, deprecated APIs
- SEO: meta tags, structured data, robots

- [ ] **Step 4: Run Lighthouse on all other pages**

Audit: /services, /gallery, /about, /reviews, /blog, /booking, /contact

All pages should score 95-100.

- [ ] **Step 5: Cross-browser check**

Verify in:
- Chrome (desktop + mobile emulation)
- Firefox (desktop)
- Safari (if available, or check for known Safari CSS issues)
- Edge (desktop)

Check: animations work, layout correct, no visual regressions, forms functional.

- [ ] **Step 6: Fix any remaining issues**

Address anything found in steps 3-5.

- [ ] **Step 7: Final commit**

```bash
git add .
git commit -m "chore: lighthouse and cross-browser verification fixes"
```

---

## Task 17: Wrap-Up — Final Review & Deploy Readiness

- [ ] **Step 1: Run full build one last time**

```bash
npm run build
```

- [ ] **Step 2: Verify git status is clean**

```bash
git status
```

All changes should be committed.

- [ ] **Step 3: Review the diff from start of Phase 1**

```bash
git log --oneline
```

Verify all commits are present and the history tells a clear story.

- [ ] **Step 4: Confirm Phase 1 is deployment-ready**

The site should be ready to deploy to Netlify. Run `npm run build` one final time to confirm everything builds cleanly for production.

Phase 1 complete. Phase 2 plan can be written separately.
