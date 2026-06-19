import HeroCTAButtons from "../../shared/HeroCTAButtons";
import HeroIllustration from "./HeroIllustration";
import TrustFeatures from "./TrustFeatures";

/**
 * HeroSection — Server Component.
 *
 * Animation is handled with animate.css utility classes applied directly
 * to server-rendered elements (no JS needed — these are pure CSS
 * keyframe animations that run automatically on paint).
 *
 * Only <HeroCTAButtons> is a Client Component (needs useRouter for
 * navigation). Headline, description, badges, and illustration are
 * all static server-rendered markup with animate.css classes.
 */
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC]">
      {/* Decorative background gradient — pure CSS */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 10% 20%, rgba(14,165,233,0.06) 0%, transparent 45%), radial-gradient(circle at 90% 70%, rgba(16,185,129,0.06) 0%, transparent 45%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* ── Left column: content ── */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Trust badge / tagline */}
            <span className="inline-flex items-center gap-2 bg-[#E0F2FE] text-[#0EA5E9] text-xs font-semibold px-4 py-1.5 rounded-full animate__animated animate__fadeInDown">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
              Trusted by 50,000+ patients nationwide
            </span>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E293B] leading-tight mt-5 animate__animated animate__fadeInUp animate__delay-1s">
              Your Health, Connected to{" "}
              <span className="text-[#0EA5E9]">Trusted Care</span>
            </h1>

            {/* Supporting description */}
            <p className="text-[#64748B] text-base lg:text-lg mt-5 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Book appointments, consult verified doctors, and manage your
              healthcare records — all from one simple, secure platform.
            </p>

            {/* CTA buttons — client component */}
            <div className="flex justify-center lg:justify-start">
              <HeroCTAButtons />
            </div>

            {/* Trust indicators / feature badges */}
            <div className="flex justify-center lg:justify-start">
              <TrustFeatures />
            </div>
          </div>

          {/* ── Right column: illustration ── */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg animate__animated animate__fadeIn animate__delay-1s">
              {/* Card frame around illustration */}
              <div className="bg-white rounded-3xl border border-[#E2E8F0] p-4 lg:p-6 shadow-[0_8px_32px_rgba(14,165,233,0.10)]">
                <HeroIllustration className="w-full h-auto" />
              </div>

              {/* Floating stat chip */}
              <div className="absolute -bottom-4 -left-4 lg:-left-6 bg-white rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2 border border-[#E2E8F0] animate__animated animate__fadeInUp animate__delay-2s">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <div>
                  <p className="text-xs font-semibold text-[#1E293B] leading-tight">
                    2,400+ Doctors
                  </p>
                  <p className="text-[10px] text-[#64748B] leading-tight">
                    Available now
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
