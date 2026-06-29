import MissionSection from "@/components/About/MissionSection";
import HowItWorksSection from "@/components/About/HowItWorksSection";
import StatsSection from "@/components/About/StatsSection";
import WhyChooseUsSection from "@/components/About/WhyChooseUsSection";
import ValuesSection from "@/components/About/ValuesSection";
import CTASection from "@/components/About/CTASection";
import HeroSection from "@/components/About/HeroSection";

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
