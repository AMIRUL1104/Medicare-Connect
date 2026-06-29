import FadeIn from "@/components/Contact/FadeIn";

// Pure Server Component for the cards themselves; FadeIn wraps the
// grid once for a simple stagger-free entrance (per "entrance only" rule).

const CONTACT_INFO = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    title: "Phone",
    lines: ["+880 1XXX-XXXXXX", "Mon–Sat, 9am–8pm"],
    href: "tel:+8801XXXXXXXXX",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Email",
    lines: ["support@medicareconnect.com", "We reply within 24 hours"],
    href: "mailto:support@medicareconnect.com",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Address",
    lines: ["House 12, Road 5, Banani", "Dhaka 1213, Bangladesh"],
    href: "https://maps.google.com/?q=Banani,Dhaka",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Support Hours",
    lines: ["Saturday – Thursday: 9am – 8pm", "Friday: 2pm – 6pm"],
    href: null,
  },
];

export default function ContactInfoSection() {
  return (
    <section
      className="bg-white py-16 lg:py-20"
      aria-labelledby="contact-info-heading"
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <h2 id="contact-info-heading" className="sr-only">
          Contact Information
        </h2>

        <FadeIn direction="up">
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            role="list"
          >
            {CONTACT_INFO.map((item) => {
              const CardInner = (
                <>
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#E0F2FE] text-[#0EA5E9] mb-4">
                    {item.icon}
                  </span>
                  <h3 className="font-semibold text-[#1E293B] text-sm mb-2">
                    {item.title}
                  </h3>
                  {item.lines.map((line) => (
                    <p
                      key={line}
                      className="text-[#64748B] text-xs leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </>
              );

              return (
                <li key={item.title}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="block bg-white border border-[#E2E8F0] rounded-2xl p-6 h-full transition-all duration-300 hover:border-[#0EA5E9]/40 hover:shadow-[0_8px_24px_rgba(14,165,233,0.10)] hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
                    >
                      {CardInner}
                    </a>
                  ) : (
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 h-full">
                      {CardInner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
