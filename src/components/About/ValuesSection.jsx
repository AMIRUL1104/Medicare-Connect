// Pure Server Component. No "use client", no Framer Motion.

const VALUES = [
  {
    icon: "🤝",
    title: "Trust",
    desc: "Every relationship starts with transparency between patients and doctors.",
    bg: "#E0F2FE",
  },
  {
    icon: "🔒",
    title: "Security",
    desc: "Your medical data and payments are protected with industry-grade encryption.",
    bg: "#D1FAE5",
  },
  {
    icon: "🌍",
    title: "Accessibility",
    desc: "Quality healthcare should be reachable for everyone, everywhere.",
    bg: "#E0F2FE",
  },
  {
    icon: "💡",
    title: "Innovation",
    desc: "We continuously improve the platform with smarter, simpler tools.",
    bg: "#D1FAE5",
  },
];

export default function ValuesSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#1E293B]">Core Values</h2>
          <p className="text-[#64748B] mt-3 text-sm lg:text-base">
            The principles that guide everything we build.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="flex flex-col items-center text-center p-6 rounded-2xl border border-[#E2E8F0] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3"
                style={{ background: value.bg }}
              >
                {value.icon}
              </div>
              <h3 className="font-semibold text-[#1E293B] text-sm mb-1.5">{value.title}</h3>
              <p className="text-[#64748B] text-xs leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
