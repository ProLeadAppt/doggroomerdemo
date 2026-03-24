import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { getLocalBusinessSchema, getFAQSchema } from "@/lib/schema";

// Eagerly loaded (above fold)
import { HeroSection } from "@/components/sections/HeroSection";
import { OfferBanner } from "@/components/sections/OfferBanner";
import { QuickInfoStrip } from "@/components/sections/QuickInfoStrip";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyPawsome } from "@/components/sections/WhyPawsome";

// Lazy loaded (below fold)
const ServicesOverview = dynamic(() => import("@/components/sections/ServicesOverview").then(mod => ({ default: mod.ServicesOverview })));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks").then(mod => ({ default: mod.HowItWorks })));
const BeforeAfterGallery = dynamic(() => import("@/components/sections/BeforeAfterGallery").then(mod => ({ default: mod.BeforeAfterGallery })));
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection").then(mod => ({ default: mod.TestimonialsSection })));
const MeetTheTeam = dynamic(() => import("@/components/sections/MeetTheTeam").then(mod => ({ default: mod.MeetTheTeam })));
const FAQSection = dynamic(() => import("@/components/sections/FAQSection").then(mod => ({ default: mod.FAQSection })));
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA").then(mod => ({ default: mod.FinalCTA })));
const ScrollVelocity = dynamic(() => import("@/components/motion/ScrollVelocity").then(mod => ({ default: mod.ScrollVelocity })));

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-pw-cream text-pw-charcoal">
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
