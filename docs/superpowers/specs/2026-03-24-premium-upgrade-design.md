# Pawsome & Co. — $20K Premium Website Upgrade

**Date:** 2026-03-24
**Status:** Approved
**Approach:** Integrated Upgrade (Phased)

## Context

Pawsome & Co. is a premium dog grooming studio in Balmain, Sydney. The existing site is a Next.js 16 + React 19 + Tailwind 3 + Framer Motion application with 8 pages, a custom design system (sage/teal/terracotta palette), JSON-LD schemas, PWA manifest, and Netlify deployment.

The goal is to elevate this from a solid demo to a $20,000-quality website across design, performance, conversion optimization, and cross-device polish — while hitting Lighthouse 95-100 across all categories.

## Design Decisions

- **Primary goal:** Both premium visual feel AND conversion optimization equally
- **Content:** Overhaul copy where it improves conversions. Add new content blocks where justified
- **Page structure:** Expand with new pages where they boost conversion or SEO
- **Animation level:** Push further — award-winning agency feel, but engineered to maintain Lighthouse scores
- **Images:** Replace with higher-quality curated stock photography from free sources
- **Responsive:** Equal weight on desktop, tablet, and mobile — each feels device-native
- **Timeline:** Phased — meaningful Phase 1 upgrade, then deeper Phase 2 polish

---

## Phase 1: Premium Foundation

Three pillars delivered together in the first ship.

### 1.1 Performance & Cleanup

**Target:** Lighthouse 95-100 across Performance, Accessibility, Best Practices, SEO.

#### Bundle Optimization
- Tree-shake Framer Motion — import only `motion`, `useInView`, `AnimatePresence`, `useScroll`, `useTransform`
- Import individual lucide-react icons: `import { Phone } from 'lucide-react'` (already tree-shakeable, but verify no barrel import)
- Dynamic import heavy components with `next/dynamic`: CustomCursor, ScrollVelocity, BeforeAfterSlider
- Add Suspense boundaries for below-fold homepage sections
- Audit and remove dead code from deleted components (Preloader, GrainOverlay, SmoothScroll references)

#### Image Strategy
- Download curated, premium-quality stock photos to `/public/images/`
- Organize by purpose: `/public/images/hero/`, `/public/images/gallery/`, `/public/images/team/`, `/public/images/services/`
- Use Next.js Image component with:
  - AVIF/WebP format (already configured in next.config.mjs)
  - Responsive `sizes` prop on every image
  - `blurDataURL` with low-quality image placeholders (LQIP) for perceived instant load
  - `priority` flag only on hero and above-fold images
- Remove Unsplash remote image dependency — all images served locally

#### Font & CSS Optimization
- Verify `next/font` uses `display: 'swap'` on all three fonts (Quicksand, DM Sans, Pacifico)
- Subset fonts to `latin` only (currently loading all subsets)
- Audit `globals.css` — remove unused keyframes and utility classes from deleted components
- Ensure Tailwind purge is correctly configured for production builds

#### Render Performance
- Lazy-load client components that aren't needed at initial render
- Ensure hero section renders server-side with no client JS blocking LCP
- Minimize layout shift — set explicit dimensions on all images and dynamic content areas

### 1.2 Design Elevation

#### Homepage Scroll Experience
Each section is a chapter in a guided story:

**Hero Section:**
- Split layout: headline/CTA left, hero image right with subtle float animation
- Gradient text on tagline using existing `text-shimmer` utility
- Staggered entrance: headline (0ms) → tagline (150ms) → CTA (300ms) → trust badges (450ms)
- Mobile: full-bleed hero image with dark gradient overlay, text centered on top
- Spring physics on all animations (no linear easing)

**Trust Bar:**
- Stars animate in sequence (50ms stagger per star)
- Review count uses animated counter (ticks up from 0 → 127)
- Google/Yelp badges slide in from right with spring
- Triggers once on scroll-into-view

**Services Overview:**
- Cards fan in from below with 100ms stagger between cards
- Hover: card lifts (translateY -8px) with shadow depth increase + service icon animates
- Each card shows "from $XX" price anchor
- "Most Popular" badge on the most-booked service

**Before/After Gallery:**
- Smooth drag-to-reveal slider with touch support
- Auto-plays subtle reveal animation (slider moves 30% → 70% → 50%) when scrolled into view to teach the interaction
- Touch-optimized with larger grab handle on mobile
- Dog name + breed caption below each pair

**Testimonials:**
- Depth-based carousel: foreground card full size/opacity, background cards scaled to 0.9/dimmed
- Auto-advances every 5s, pauses on hover/touch
- Large decorative quotation marks
- Each review shows: customer photo, name, dog breed, service used, star rating

**Final CTA:**
- Dark section with warm gradient (charcoal → dark sage)
- Large headline with shimmer text effect
- Pulsing CTA button with glow
- Trust reinforcement line: "★ 4.9 stars · 2,400+ happy grooms · Est. 2016"

#### Micro-Interactions

**Navigation:**
- Active link has underline that morphs/slides between items on hover
- Mobile menu slides in from right with staggered link reveals (100ms each)
- Scroll progress indicator line in header (thin, sage-colored)
- Header background gains backdrop-blur after 50px scroll
- Header CTA shifts from ghost → filled variant on scroll

**Buttons:**
- Hover: background fills from center outward (radial reveal)
- Click: scale down to 0.95 with spring bounce back
- Magnetic pull effect on desktop (existing, refine)
- Loading state with subtle spinner for form submissions

**Forms:**
- Floating labels that shrink and translate up on focus
- Input border color animates: `pw-border` → `pw-sage` on focus
- Validation messages slide in from below with 200ms delay
- Success state: input border turns green, checkmark icon morphs in

**Scroll Effects:**
- Section headings fade + slide from left (translateX -20px → 0)
- Images scale from 0.95 → 1.0 on scroll entry
- List items stagger in with 80ms delay each
- Parallax only on decorative/background elements — never on readable content
- All animations respect `prefers-reduced-motion: reduce`

#### Responsive Design

**Desktop (1024px+):**
- Full animation suite including custom cursor and magnetic buttons
- Multi-column layouts (2-3 columns for services, team, gallery)
- Hover states on all interactive elements
- Split hero layout
- Generous whitespace and padding

**Tablet (768px - 1023px):**
- 2-column grids where appropriate, single column for content-heavy sections
- Touch-optimized: larger tap targets (min 48x48px), no hover-dependent interactions
- Reduced animation complexity (fewer stagger items, simpler transitions)
- Swipe gestures on carousels and gallery

**Mobile (< 768px):**
- Single column layout throughout
- Thumb-zone optimized: primary actions in bottom 40% of screen
- Sticky bottom CTA bar (appears after scrolling past hero, hides when booking form visible)
- CSS-only animations where possible (reduces JS execution on lower-powered devices)
- Full-bleed imagery with tighter crops
- Bottom sheet style mobile navigation
- Safe area inset support for iOS notch/home indicator (already partial, complete it)

### 1.3 Conversion Optimization

#### CTA Strategy
- **Header CTA:** Persistent "Book Now" in nav. Ghost style initially, fills to primary on scroll
- **Mobile sticky bar:** Fixed bottom bar after hero scroll. Spring slide-up animation. Contains "Book Your Pup's Day" button + tap-to-call phone. Hides when booking section is in viewport. Respects iOS safe area
- **Contextual CTAs:** Each homepage section ends with a relevant CTA:
  - After services: "Find Your Perfect Groom"
  - After testimonials: "Join 127 Happy Pups"
  - After FAQ: "Still Have Questions? Let's Chat"
  - After gallery: "See What We Can Do for Your Pup"
- **Exit intent (desktop only):** When cursor moves toward browser chrome, subtle slide-in panel from right (not a modal). First-groom discount offer. Shown once per session via sessionStorage. Single-click dismiss

#### Social Proof Architecture
Trust signals layered across the entire page, not clustered:
- **Hero:** "★ 4.9 · Balmain's #1 Rated Groomer"
- **Trust bar:** Google + Yelp badges, animated review count, years in business
- **Services:** "Most Popular" badge, "127 booked this month" counter
- **Gallery:** Dog name + breed + owner quote per photo
- **Testimonials:** Full reviews with customer photo, dog breed, specific service
- **Booking form:** "3 spots left this week" indicator, recent booking activity feed
- **Final CTA:** Aggregate lifetime stats: "2,400+ grooms · 4.9 stars · 8 years"

#### Copy Upgrades
Key messaging changes (applied throughout, not just homepage):
- Hero headline: "Where Every Dog Leaves Happy" → **"Balmain's Most-Loved Dog Grooming Studio"** (local SEO + credibility framing)
- Primary CTA: "Book Now" → **"Book Your Pup's Pamper Day"** (emotional, specific)
- Services heading: "Our Services" → **"Find the Perfect Groom"** (benefit-oriented)
- Final CTA: "Ready to Book?" → **"Your Pup Deserves the Best — Book Today"** (emotional + urgency)
- All CTAs use action-oriented, benefit-focused language
- Microcopy throughout reinforces trust: "Free cancellation", "No payment required", "Confirmed within 2 hours"

#### Booking Funnel
1. **Reduce friction:** Only required fields — name, phone, dog breed, preferred service. Everything else optional or asked post-booking
2. **Smart defaults:** Pre-select most popular service ("The Works"). Auto-suggest next available date. Show live price estimate as user fills fields
3. **Inline reassurance:** Trust signals within the form: "Free cancellation · Confirmed within 2 hours · No payment required"
4. **Success celebration:** Animated confirmation state with confetti micro-animation. Clear "What happens next" steps. Option to add to calendar

---

## Phase 2: Scale & Delight

Built on Phase 1's performant, well-structured foundation.

### 2.1 New Pages

**Individual Service Pages (6 pages):**
- Routes: `/services/bath-and-tidy`, `/services/full-groom`, `/services/puppy-first-groom`, `/services/deshedding`, `/services/hand-stripping`, `/services/senior-dog-groom`
- Each page: dedicated hero with service image, detailed description, pricing breakdown by dog size, service-specific FAQ (3-5 questions), before/after gallery filtered to that service, related services sidebar, "Book This Service" CTA
- SEO value: targets long-tail keywords like "cavoodle grooming Balmain", "puppy first groom Inner West Sydney"
- JSON-LD Service schema per page

**Pricing Page:**
- Route: `/pricing`
- Interactive comparison table: all services, add-ons, and packages side by side
- Toggle between dog sizes (small/medium/large) to see adjusted pricing
- "Most Popular" tier highlighted with visual emphasis
- Each tier has direct "Book" button
- Add-on checkboxes that update a running total
- FAQ section addressing pricing questions

**New Clients Landing Page:**
- Route: `/new-clients`
- Targeted funnel for first-time visitors
- Sections: "What to Expect", "Our Gentle Approach", "Meet Your Groomer", first-visit gallery
- First-visit discount offer with clear CTA
- Simplified booking form (fewer fields than main form)
- Optimized for paid traffic (Google Ads, social media campaigns)
- Minimal navigation distractions — focused conversion path

**Area Pages (Local SEO):**
- Routes: `/areas/balmain`, `/areas/rozelle`, `/areas/drummoyne`, `/areas/leichhardt`, `/areas/lilyfield`
- Localized copy per suburb: distance from studio, serving since year, suburb-specific testimonials
- Google Maps embed showing studio location relative to suburb
- "Dog Grooming in [Suburb]" heading for SEO
- Links back to services and booking
- Thin but targeted — avoid duplicate content penalties

### 2.2 Advanced Interactions

**Page Transitions:**
- View Transitions API for smooth cross-page morphing
- Shared elements (header logo, hero images) animate between pages
- Fallback: simple fade/slide transition for unsupported browsers (Safari)
- Implemented via Next.js `viewTransition` configuration

**Gallery Lightbox:**
- Full-screen overlay with smooth open animation from thumbnail position
- Swipe gestures on mobile (left/right to navigate, down to close)
- Arrow key navigation on desktop
- Pinch-to-zoom on touch devices
- Before/after comparison slider available within lightbox view
- Preloads adjacent images for instant navigation

**Animated Stat Counters:**
- Numbers count up on scroll-into-view: "2,400+" grooms, "127" reviews, "8" years
- Spring physics for natural deceleration (fast start, slow finish)
- Triggers once per session (stores in sessionStorage)
- Formatted with locale-appropriate separators

**Multi-Step Booking Wizard:**
- 4 steps: Service Selection → Dog Details → Preferred Date/Time → Review & Confirm
- Animated progress bar across top
- Each step slides in with direction-aware animation (forward = slide left, back = slide right)
- State preserved across steps (no data loss on back navigation)
- Summary panel on final step before submit
- Each step validates before allowing forward navigation

**Dark Mode:**
- Respects `prefers-color-scheme` system preference with manual toggle in header
- Warm dark palette: charcoal backgrounds (#2d2926), cream text (#fdf6ec), muted accent colors
- Not pure black — maintains the warm, approachable brand feel
- Smooth color transition animation (300ms ease)
- Stored preference in localStorage
- All images and illustrations reviewed for dark mode contrast

**SEO Enrichment:**
- Expanded JSON-LD schemas:
  - `Service` schema per individual service page
  - `LocalBusiness` with full `GeoCoordinates` and `openingHoursSpecification`
  - `Review` snippets from testimonials
  - `FAQPage` schema on every page with FAQ content
  - `BreadcrumbList` expanded for new page hierarchy
- Auto-generated OpenGraph images per page (using Next.js OG image generation)
- Canonical URLs on all pages
- Hreflang tags (en-AU primary)
- Expanded sitemap covering all new pages

---

## Clarifications

- **Phase boundary:** Phase 1 deploys to production first. Phase 2 begins after Phase 1 is live and verified. Each phase is a complete, shippable increment.
- **Image sourcing:** ~20-25 curated images needed across hero (2-3), gallery (6-8), team (4), services (6), and general/lifestyle (4-5). Source from Pexels and Unsplash downloads — prioritize real grooming studio photography over generic dog photos.
- **Dynamic-looking static data:** All social proof indicators ("3 spots left this week", "127 booked this month", recent booking activity) are hardcoded/static values. No backend API. They exist for conversion psychology, not real-time accuracy.

## Technical Constraints

- **Framework:** Stay on Next.js 16 + React 19 + Tailwind 3 — no framework changes
- **Animation library:** Framer Motion stays, but tree-shaken and lazy-loaded
- **No new heavy dependencies:** Everything built with existing stack. No UI component libraries
- **Deployment:** Netlify with existing configuration
- **Images:** Local stock photos in `/public/images/`, no external CDN dependency
- **Browser support:** Modern browsers (Chrome, Firefox, Safari, Edge — last 2 versions). Progressive enhancement for View Transitions API
- **Performance budget:** Lighthouse 95-100 on all four categories, measured on mobile throttling

## Success Criteria

1. Lighthouse scores: 95-100 across Performance, Accessibility, Best Practices, SEO (mobile and desktop)
2. All pages render correctly on: Chrome/Firefox/Safari/Edge on desktop, Chrome/Safari on mobile (iOS + Android)
3. Every interactive element has proper touch targets (48px minimum), keyboard navigation, and ARIA labels
4. No layout shift above 0.1 CLS on any page
5. LCP under 2.5s on 4G throttled connection
6. Every page has at least one clear CTA path to booking
7. `prefers-reduced-motion` disables all non-essential animations
8. All images have descriptive alt text
9. Color contrast meets WCAG AA on every text/background combination
