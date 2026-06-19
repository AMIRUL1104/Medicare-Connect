import HeroSection from "@/components/home/HeroSection";
import SpecializationsSection from "@/components/home/SpecializationsSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedDoctorsSection from "@/components/home/FeaturedDoctorsSection";

// Server Component — no "use client" needed at the page level.
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SpecializationsSection />
      <FeaturedDoctorsSection />
      <StatsSection />
      {/* ...rest of homepage sections */}
    </main>
  );
}
