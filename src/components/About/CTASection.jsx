import Link from "next/link";
import FadeIn from "@/components/about/FadeIn";

// Server Component. Markup, gradient, and links are server-rendered.
// FadeIn (client island) only handles the entrance animation.
export default function CTASection() {
  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
      <FadeIn direction="up">
        <div
          className="relative overflow-hidden rounded-3xl text-center px-6 py-14 lg:py-16"
          style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 60%, #1E293B 100%)" }}
        >
          <div className="absolute top-8 right-10 w-28 h-28 rounded-full border border-white/10 opacity-40 pointer-events-none" />
          <div className="absolute bottom-6 left-8 w-16 h-16 rounded-full border border-white/10 opacity-30 pointer-events-none" />

          <div className="relative max-w-xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              Ready to take control of your healthcare?
            </h2>
            <p className="text-white/75 text-sm lg:text-base mb-8">
              Join thousands of patients and doctors already using MediCare Connect.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/doctors"
                className="px-6 py-3 rounded-[10px] text-sm font-semibold text-[#0EA5E9] bg-white transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0284C7]"
              >
                Find a Doctor
              </Link>
              <Link
                href="/signup"
                className="px-6 py-3 rounded-[10px] text-sm font-semibold text-white border-[1.5px] border-white/40 transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0284C7]"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
