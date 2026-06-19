import HeroSection from "@/components/about/HeroSection";
import MissionSection from "@/components/about/MissionSection";
import HowItWorksSection from "@/components/about/HowItWorksSection";
import StatsSection from "@/components/about/StatsSection";
import WhyChooseUsSection from "@/components/about/WhyChooseUsSection";
import ValuesSection from "@/components/about/ValuesSection";
import CTASection from "@/components/about/CTASection";

export const metadata = {
  title: "About Us – MediCare Connect",
  description:
    "MediCare Connect is transforming healthcare through technology — connecting patients with trusted, verified doctors.",
};

// Pure Server Component. No "use client" anywhere in this file.
// Each section below is also a Server Component; only the few that
// need motion wrap their content in <FadeIn> (a small client island).
export default function AboutPage() {
  return (
    <main className="bg-[#F8FAFC]">
      <HeroSection />
      <MissionSection />
      <HowItWorksSection />
      <StatsSection />
      <WhyChooseUsSection />
      <ValuesSection />
      <CTASection />
    </main>
  );
}
