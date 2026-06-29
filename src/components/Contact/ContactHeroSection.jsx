import FadeIn from "@/components/contact/FadeIn";

// Server Component. FadeIn is the only client piece (entrance animation).
export default function ContactHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(14,165,233,0.06) 0%, transparent 45%), radial-gradient(circle at 85% 70%, rgba(16,185,129,0.06) 0%, transparent 45%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 lg:px-8 pt-16 lg:pt-20 pb-12 text-center">
        <FadeIn direction="up">
          <span className="inline-flex items-center gap-2 bg-[#E0F2FE] text-[#0EA5E9] text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
            {`We're Here to Help`}
          </span>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E293B] leading-tight">
            Get in Touch with{" "}
            <span className="text-[#0EA5E9]">MediCare Connect</span>
          </h1>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <p className="text-[#64748B] text-base lg:text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            Have a question about appointments, billing, or your account? Our
            support team is ready to help — reach out anytime.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
