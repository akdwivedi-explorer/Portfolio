import HeroSection from "@/components/sections/HeroSection";
import TechStackMarquee from "@/components/sections/TechStackMarquee";
import BentoGrid from "@/components/sections/BentoGrid";
import CaseStudies from "@/components/sections/CaseStudies";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ConnectSection from "@/components/sections/ConnectSection";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <SectionDivider />
      
      <TechStackMarquee />
      <SectionDivider />

      <BentoGrid />
      <SectionDivider />

      <CaseStudies />
      <SectionDivider />

      <ExperienceTimeline />
      <SectionDivider />

      <TestimonialsSection />
      <SectionDivider />

      <ConnectSection />
    </div>
  );
}
