import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { getLocalBusinessSchema, getFAQSchema } from "@/lib/schema";
import { HeroSection } from "@/components/sections/HeroSection";
import { OfferBanner } from "@/components/sections/OfferBanner";
import { QuickInfoStrip } from "@/components/sections/QuickInfoStrip";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyPawsome } from "@/components/sections/WhyPawsome";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { BeforeAfterGallery } from "@/components/sections/BeforeAfterGallery";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { MeetTheTeam } from "@/components/sections/MeetTheTeam";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ScrollVelocity } from "@/components/motion/ScrollVelocity";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-pw-cream text-pw-charcoal">
      <SchemaScript schema={getLocalBusinessSchema()} />
      <SchemaScript schema={getFAQSchema()} />
      <SiteHeader />
      <main className="flex-1">
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
