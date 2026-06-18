export default function LeftPanel() {
  return (
    <div
      className="lg:w-2/5 flex flex-col justify-between p-8 lg:p-12 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #0EA5E9 0%, #0369A1 50%, #1E293B 100%)",
      }}
    >
      {/* BG decorative blobs */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(16,185,129,0.3) 0%, transparent 40%)",
        }}
      />
      <div className="absolute top-16 right-8 w-32 h-32 rounded-full border border-white/10 opacity-30 pointer-events-none" />
      <div className="absolute bottom-32 left-6 w-20 h-20 rounded-full border border-white/10 opacity-20 pointer-events-none" />

      {/* Logo */}
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
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
          <span className="text-white font-bold text-lg tracking-tight">
            MediCare Connect
          </span>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 py-8 lg:py-0">
        {/* Stats card illustration */}
        <div className="mb-8 lg:mb-10">
          <div className="relative mx-auto max-w-[320px]">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              {/* Doctor row */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-2xl">
                  👨‍⚕️
                </div>
                <div className="flex-1">
                  <div className="bg-white/20 rounded-lg h-3 w-28 mb-2" />
                  <div className="bg-white/15 rounded-lg h-2.5 w-20" />
                </div>
                <div className="ml-auto bg-emerald-500/30 text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">
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
                    className="bg-white/10 rounded-xl p-3 text-center"
                  >
                    <div className="text-white font-bold text-lg">
                      {s.value}
                    </div>
                    <div className="text-white/60 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating pill */}
            <div className="absolute -bottom-4 -right-2 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 text-xs font-medium text-[#1E293B]">
              <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 animate-pulse" />
              Appointment confirmed ✓
            </div>
          </div>
        </div>

        {/* Headline */}
        <div>
          <h1 className="text-white text-3xl lg:text-4xl font-bold leading-tight mb-4">
            Your Health,
            <br />
            <span className="text-sky-200 opacity-90">Managed Simply.</span>
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-xs">
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
              className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 text-white/80 text-xs"
            >
              <span>{b.icon}</span>
              {b.label}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-8 lg:mt-0">
        <p className="text-white/40 text-xs">
          © 2025 MediCare Connect. All rights reserved.
        </p>
      </div>
    </div>
  );
}
