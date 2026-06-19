import FadeIn from "@/components/about/FadeIn";
import Counter from "@/components/about/Counter";

// Server Component. The card markup, gradient background, and labels
// are all server-rendered. Only <FadeIn> (entrance) and <Counter>
// (count-up numbers) are client islands — everything else is static HTML.

const STATS = [
  { label: "Total Doctors", value: 2400, suffix: "+" },
  { label: "Total Patients", value: 50000, suffix: "+" },
  { label: "Total Appointments", value: 120000, suffix: "+" },
  { label: "Total Reviews", value: 18500, suffix: "+" },
];

export default function StatsSection() {
  return (
    <section
      className="py-16 lg:py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, white 0%, transparent 35%), radial-gradient(circle at 90% 80%, white 0%, transparent 35%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 lg:px-8">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">Platform Statistics</h2>
            <p className="text-white/70 mt-2 text-sm lg:text-base">
              Trusted by thousands across the country.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.label} direction="up" delay={i * 0.1}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/70 text-xs sm:text-sm font-medium">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
