import StatsSection from "@/components/About/StatsSection";
import HeroSection from "@/components/Home/Banner/HeroSection";
import PatientSuccessStories from "@/components/Home/reviews/PatientSuccessStories";
import SpecializationsSection from "@/components/Home/Specializations/SpecializationsSection";

export default function Home() {
  return (
    <main className=" ">
      <HeroSection />
      <SpecializationsSection />
      <StatsSection />
      <PatientSuccessStories />
    </main>
  );
}
