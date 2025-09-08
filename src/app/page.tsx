import { HomeNavigationBar } from "@/components/HomeNavBar";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomeFooterSection } from "@/components/sections/HomeFooterSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import PricingSection from "@/components/sections/PricingSection";

export default function Home() {
  return (
    <div>
      <div className="bg-white relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <HomeNavigationBar />
          <div className="flex flex-1 justify-center">
            <div className="layout-content-container flex flex-col w-full flex-1">
              <HeroSection />
              <SocialProofSection />
              <FeaturesSection />
              <HowItWorksSection />
              <BenefitsSection />
              <TestimonialsSection />
              <PricingSection />
            </div>
          </div>
          <HomeFooterSection />
        </div>
      </div>
    </div>
  );
}
