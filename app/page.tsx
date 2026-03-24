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
import { SectionDivider } from "@/components/ui/SectionDivider";

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
        <SectionDivider variant="wave" color="cream" />
        <WhyPawsome />
        <ServicesOverview />

        <ScrollVelocity
          text="HAPPY PUPS &bull; FRESH GROOMS &bull; "
          baseVelocity={-2}
        />

        <SectionDivider variant="curve" color="sage" />
        <HowItWorks />
        <BeforeAfterGallery />

        <ScrollVelocity
          text="TAIL WAGS &bull; PAWSOME RESULTS &bull; "
          baseVelocity={2}
        />

        <TestimonialsSection />
        <MeetTheTeam />
        <SectionDivider variant="dots" color="teal" />
        <FAQSection />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
