import Link from "next/link";
import FadeIn from "@/components/about/FadeIn";

// Server Component — no "use client" here.
// Only the small <FadeIn> islands below ship client JS.
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient — pure CSS, no JS needed */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(14,165,233,0.08) 0%, transparent 45%), radial-gradient(circle at 85% 60%, rgba(16,185,129,0.08) 0%, transparent 45%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="flex flex-col items-center text-center">

          <FadeIn direction="up" delay={0} viewport={false}>
            <span className="inline-flex items-center gap-2 bg-[#E0F2FE] text-[#0EA5E9] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
              About MediCare Connect
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.1} viewport={false}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E293B] leading-tight max-w-3xl">
              Transforming Healthcare{" "}
              <span className="text-[#0EA5E9]">Through Technology</span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2} viewport={false}>
            <p className="text-[#64748B] text-base lg:text-lg mt-5 max-w-xl leading-relaxed">
              We connect patients with trusted, verified doctors — making
              healthcare simpler, faster, and more accessible for everyone,
              everywhere.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3} viewport={false}>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <Link
                href="/doctors"
                className="px-6 py-3 rounded-[10px] text-sm font-semibold text-white transition-all duration-200 hover:shadow-[0_4px_16px_rgba(14,165,233,0.35)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
                style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)" }}
              >
                Find a Doctor
              </Link>
              <Link
                href="/signup"
                className="px-6 py-3 rounded-[10px] text-sm font-semibold text-[#1E293B] border-[1.5px] border-[#E2E8F0] bg-white transition-all duration-200 hover:border-[#0EA5E9] hover:text-[#0EA5E9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
              >
                Create Account
              </Link>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
