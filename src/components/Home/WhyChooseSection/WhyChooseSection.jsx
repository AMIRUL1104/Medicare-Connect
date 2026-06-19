// Server Component — no "use client" here
import { benefits } from "@/lib/data/benefits";
import { StaggeredGrid, AnimatedCard } from "./AnimatedGrid";
import BenefitCard from "./BenefitCard";

export default function WhyChooseSection() {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          {/* Eyebrow — same pill style as the rest of the homepage */}
          <span className="inline-flex items-center gap-2 bg-white text-[#0EA5E9] text-sm font-medium px-4 py-1.5 rounded-full shadow-sm border border-[#D0EAF8]">
            <span className="w-2 h-2 rounded-full bg-[#0EA5E9] inline-block" />
            Why MediCare Connect
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 max-w-2xl leading-tight">
            Healthcare built around{" "}
            <span className="text-[#0EA5E9]">your convenience</span>
          </h2>

          <p className="text-slate-500 text-base max-w-xl leading-relaxed">
            From finding the right specialist to receiving your prescription,
            every step is designed to be fast, safe, and transparent.
          </p>
        </div>

        {/* ── Animated grid of benefit cards ── */}
        <StaggeredGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit) => (
            <AnimatedCard key={benefit.id}>
              <BenefitCard benefit={benefit} />
            </AnimatedCard>
          ))}
        </StaggeredGrid>

        {/* ── Bottom trust ribbon ── */}
        <div className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-slate-500">
          {[
            { label: "HIPAA Compliant", dot: true },
            { label: "SSL Secured", dot: true },
            { label: "24/7 Support", dot: true },
            { label: "Trusted by 50,000+ patients", dot: false },
          ].map(({ label, dot }, i) => (
            <span key={i} className="flex items-center gap-2">
              {dot && (
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]"
                  aria-hidden="true"
                />
              )}
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
