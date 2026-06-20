import FadeIn from "@/components/contact/FadeIn";
import ContactForm from "@/components/contact/ContactForm";
import MapSection from "@/components/contact/MapSection";

// Server Component. Only <ContactForm> inside is a client component
// (needs RHF state). <FadeIn> wraps both pieces for entrance animation.
export default function ContactFormSection() {
  return (
    <section className="bg-[#F8FAFC] py-16 lg:py-20" aria-labelledby="contact-form-heading">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <h2 id="contact-form-heading" className="sr-only">
          Contact Form and Location
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          <FadeIn direction="left">
            <ContactForm />
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            <MapSection />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
