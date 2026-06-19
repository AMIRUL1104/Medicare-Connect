// Pure Server Component. No "use client", no Framer Motion.
// Hover/focus states are handled entirely by Tailwind/CSS.

const REASONS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Verified Doctors",
    desc: "Every doctor is credential-checked before joining the platform.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Secure Payments",
    desc: "256-bit encrypted transactions with trusted payment gateways.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Easy Appointment Booking",
    desc: "Book in under a minute, with real-time slot availability.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Digital Prescriptions",
    desc: "Access and download prescriptions anytime, from any device.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2m12-12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Role-Based Dashboards",
    desc: "Tailored experiences for patients, doctors, and admins.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#1E293B]">Why Choose Us</h2>
        <p className="text-[#64748B] mt-3 text-sm lg:text-base">
          Built for safety, speed, and simplicity at every step.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {REASONS.map((reason) => (
          <div
            key={reason.title}
            tabIndex={0}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-6 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(16,185,129,0.10)] hover:-translate-y-1 hover:border-[#10B981]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D1FAE5] text-[#10B981] flex items-center justify-center mb-4">
              {reason.icon}
            </div>
            <h3 className="font-semibold text-[#1E293B] text-base mb-2">{reason.title}</h3>
            <p className="text-[#64748B] text-sm leading-relaxed">{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
