import ContactFormSection from "@/components/Contact/ContactFormSection";
import ContactHeroSection from "@/components/Contact/ContactHeroSection";
import ContactInfoSection from "@/components/Contact/ContactInfoSection";
import FaqSection from "@/components/Contact/FaqSection";

export const metadata = {
  title: "Contact Us – MediCare Connect",
  description:
    "Get in touch with MediCare Connect for support, billing questions, or general inquiries. We're here to help.",
};

// Pure Server Component. No "use client" anywhere in this file.
// Each section below is also a Server Component; client interactivity
// is isolated to ContactForm, FaqItem, and the shared FadeIn wrapper.
export default function ContactPage() {
  return (
    <main className="bg-[#F8FAFC]">
      <ContactHeroSection />
      <ContactInfoSection />
      <ContactFormSection />
      <FaqSection />
    </main>
  );
}
