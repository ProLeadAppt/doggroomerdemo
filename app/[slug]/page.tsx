import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { getLocalBusinessSchema, getFAQSchema } from "@/lib/schema";
import { DemoDataProvider } from "@/components/demo/DemoDataProvider";

// Eagerly loaded (above fold — critical path)
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";

// Lazy loaded (below fold or non-critical)
import dynamic from "next/dynamic";

const OfferBanner = dynamic(() => import("@/components/sections/OfferBanner").then(mod => ({ default: mod.OfferBanner })));
const QuickInfoStrip = dynamic(() => import("@/components/sections/QuickInfoStrip").then(mod => ({ default: mod.QuickInfoStrip })));
const WhyPawsome = dynamic(() => import("@/components/sections/WhyPawsome").then(mod => ({ default: mod.WhyPawsome })));
const ServicesOverview = dynamic(() => import("@/components/sections/ServicesOverview").then(mod => ({ default: mod.ServicesOverview })));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks").then(mod => ({ default: mod.HowItWorks })));
const BeforeAfterGallery = dynamic(() => import("@/components/sections/BeforeAfterGallery").then(mod => ({ default: mod.BeforeAfterGallery })));
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection").then(mod => ({ default: mod.TestimonialsSection })));
const MeetTheTeam = dynamic(() => import("@/components/sections/MeetTheTeam").then(mod => ({ default: mod.MeetTheTeam })));
const FAQSection = dynamic(() => import("@/components/sections/FAQSection").then(mod => ({ default: mod.FAQSection })));
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA").then(mod => ({ default: mod.FinalCTA })));
const ScrollVelocity = dynamic(() => import("@/components/motion/ScrollVelocity").then(mod => ({ default: mod.ScrollVelocity })));

type Props = {
  params: Promise<{ slug: string }>;
};

// Known static routes that should NOT be caught by this dynamic route
const STATIC_ROUTES = new Set([
  "about",
  "services",
  "gallery",
  "reviews",
  "blog",
  "contact",
  "booking",
]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Don't generate metadata for static routes
  if (STATIC_ROUTES.has(slug)) return {};

  // Format slug into a readable business name
  const businessName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${businessName} | Premium Dog Grooming`,
    description: `${businessName} - Professional dog grooming services. See what your new website could look like.`,
    openGraph: {
      title: `${businessName} | Premium Dog Grooming`,
      description: `${businessName} - Professional dog grooming services. See what your new website could look like.`,
      type: "website",
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function DemoPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="flex min-h-screen flex-col bg-pw-cream text-pw-charcoal">
      {/* Inject the DemoDataProvider to override placeholder data */}
      <DemoDataProvider slug={slug} />

      <SchemaScript schema={getLocalBusinessSchema()} />
      <SchemaScript schema={getFAQSchema()} />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <OfferBanner />
        <QuickInfoStrip />
        <TrustBar />
        <WhyPawsome />
        <ServicesOverview />

        <ScrollVelocity
          text="HAPPY PUPS &bull; FRESH GROOMS &bull; "
          baseVelocity={-2}
        />

        <HowItWorks />
        <BeforeAfterGallery />

        <ScrollVelocity
          text="TAIL WAGS &bull; PAWSOME RESULTS &bull; "
          baseVelocity={2}
        />

        <TestimonialsSection />
        <MeetTheTeam />
        <FAQSection />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
