export default function LeftPanel() {
  return (
    <div
      className="lg:w-2/5 flex flex-col justify-between p-8 lg:p-12 relative overflow-hidden border-b lg:border-b-0 lg:border-r border-gray-800"
      style={{
        background:
          "linear-gradient(160deg, #0B1120 0%, #0F172A 50%, #111827 100%)",
      }}
    >
      {/* BG decorative blobs with custom Glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(56,189,248,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(16,185,129,0.05) 0%, transparent 50%)",
        }}
      />
      <div className="absolute top-16 right-8 w-32 h-32 rounded-full border border-sky-500/10 opacity-30 pointer-events-none blur-sm" />
      <div className="absolute bottom-32 left-6 w-20 h-20 rounded-full border border-emerald-500/10 opacity-20 pointer-events-none blur-sm" />

      {/* Logo */}
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
            <svg
              className="w-6 h-6 text-[#38BDF8]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <span className="text-gray-100 font-bold text-lg tracking-tight">
            MediCare Connect
          </span>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 py-8 lg:py-0">
        {/* Stats card illustration */}
        <div className="mb-8 lg:mb-10">
          <div className="relative mx-auto max-w-[320px]">
            <div className="bg-[#111827]/60 backdrop-blur-md rounded-2xl p-6 border border-gray-800 shadow-2xl">
              {/* Doctor row */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center shrink-0 text-2xl border border-gray-700">
                  👨‍⚕️
                </div>
                <div className="flex-1">
                  <div className="bg-gray-800 rounded-lg h-3 w-28 mb-2" />
                  <div className="bg-gray-800/60 rounded-lg h-2.5 w-20" />
                </div>
                <div className="ml-auto bg-emerald-500/10 text-[#34D399] text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]">
                  Available
                </div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "2.4k", label: "Doctors" },
                  { value: "98%", label: "Satisfaction" },
                  { value: "50k", label: "Patients" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-[#1E293B]/50 border border-gray-800/60 rounded-xl p-3 text-center"
                  >
                    <div className="text-gray-100 font-bold text-lg">
                      {s.value}
                    </div>
                    <div className="text-gray-400 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating pill */}
            <div className="absolute -bottom-4 -right-2 bg-[#1E293B] border border-gray-800 rounded-xl shadow-2xl px-3 py-2 flex items-center gap-2 text-xs font-medium text-gray-200 backdrop-blur-md">
              <span className="w-2 h-2 bg-[#34D399] rounded-full shrink-0 animate-pulse shadow-[0_0_8px_#34D399]" />
              Appointment confirmed ✓
            </div>
          </div>
        </div>

        {/* Headline */}
        <div>
          <h1 className="text-gray-100 text-3xl lg:text-4xl font-bold leading-tight mb-4">
            Your Health,
            <br />
            <span className="text-[#38BDF8] opacity-90">Managed Simply.</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-xs">
            Book appointments, manage healthcare records, and connect with
            trusted doctors — all in one place.
          </p>
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { icon: "🛡️", label: "HIPAA Compliant" },
            { icon: "🔐", label: "256-bit Encrypted" },
            { icon: "✅", label: "Verified Doctors" },
          ].map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-2 bg-[#1E293B]/60 border border-gray-800 rounded-full px-3 py-1.5 text-gray-300 text-xs backdrop-blur-sm"
            >
              <span>{b.icon}</span>
              {b.label}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-8 lg:mt-0">
        <p className="text-gray-500 text-xs">
          © 2026 MediCare Connect. All rights reserved.
        </p>
      </div>
    </div>
  );
}
