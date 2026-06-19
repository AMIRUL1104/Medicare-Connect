import StatsSection from "@/components/About/StatsSection";
import HeroSection from "@/components/Home/Banner/HeroSection";
import FeaturedDoctorsSection from "@/components/Home/Doctors/FeaturedDoctorsSection";
import PatientSuccessStories from "@/components/Home/reviews/PatientSuccessStories";
import SpecializationsSection from "@/components/Home/Specializations/SpecializationsSection";
import WhyChooseSection from "@/components/Home/WhyChooseSection/WhyChooseSection";

export default function Home() {
  return (
    <main className=" ">
      <HeroSection />
      <FeaturedDoctorsSection />
      <SpecializationsSection />
      <StatsSection />
      <PatientSuccessStories />
      <WhyChooseSection />
    </main>
  );
}
