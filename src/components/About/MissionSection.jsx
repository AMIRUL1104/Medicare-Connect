// Pure Server Component. No "use client", no Framer Motion.
// Static content like this doesn't need an entrance animation.

const MISSION_ITEMS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      </svg>
    ),
    title: "Improve Healthcare Accessibility",
    desc: "Connecting patients in every community with qualified doctors — regardless of location or time of day.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Reduce Waiting Time",
    desc: "Smart scheduling and real-time availability mean fewer delays and faster access to care.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Simplify Appointment Management",
    desc: "One dashboard for booking, rescheduling, payments, and prescriptions — no paperwork required.",
  },
];

export default function MissionSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#1E293B]">Our Mission &amp; Vision</h2>
        <p className="text-[#64748B] mt-3 text-sm lg:text-base">
          We're building a healthcare experience centered on trust, speed, and simplicity.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MISSION_ITEMS.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-6 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(14,165,233,0.10)] hover:-translate-y-1 hover:border-[#0EA5E9]/30"
          >
            <div className="w-12 h-12 rounded-xl bg-[#E0F2FE] text-[#0EA5E9] flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="font-semibold text-[#1E293B] text-base mb-2">{item.title}</h3>
            <p className="text-[#64748B] text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
