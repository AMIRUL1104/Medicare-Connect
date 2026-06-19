// Pure Server Component. No "use client", no Framer Motion.
// CSS handles all hover/transition states; no JS needed for entrance.

const STEPS = [
  { icon: "🔍", title: "Find Doctor", desc: "Search by specialty, location, or availability." },
  { icon: "📅", title: "Book Appointment", desc: "Pick a time slot that works for you." },
  { icon: "💳", title: "Make Payment", desc: "Pay securely online — no hidden fees." },
  { icon: "🩺", title: "Get Consultation", desc: "Meet your doctor in person or online." },
  { icon: "📄", title: "Receive Prescription", desc: "Get a digital prescription, saved for later." },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#1E293B]">
            How MediCare Connect Works
          </h2>
          <p className="text-[#64748B] mt-3 text-sm lg:text-base">
            From search to prescription — five simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Connector line - desktop only, pure CSS */}
          <div
            className="hidden lg:block absolute top-8 left-0 right-0 h-0.5"
            style={{
              background:
                "linear-gradient(90deg, #E2E8F0 0%, #0EA5E9 20%, #0EA5E9 80%, #E2E8F0 100%)",
            }}
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col items-center text-center relative"
              >
                <div className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-[#0EA5E9] flex items-center justify-center text-2xl mb-4 shadow-sm">
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-[#0EA5E9] mb-1">
                  Step {i + 1}
                </span>
                <h3 className="font-semibold text-[#1E293B] text-sm mb-1">{step.title}</h3>
                <p className="text-[#64748B] text-xs leading-relaxed max-w-[160px]">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
