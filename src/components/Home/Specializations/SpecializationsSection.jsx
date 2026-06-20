import Link from "next/link";
import FadeIn from "./FadeIn";

/**
 * SpecializationsSection — Server Component.
 *
 * Entirely static content. The only client-side piece is <FadeIn>,
 * used once for the section heading and once (with stagger) for the
 * card grid — everything else (icons, text, hover states) is plain
 * server-rendered markup + Tailwind CSS.
 */

const SPECIALIZATIONS = [
  {
    name: "Cardiology",
    desc: "Heart health & vascular care",
    href: "/doctors?page=1&search=cardiology",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 21s-7.5-4.6-10-9.3C.5 8.1 2.4 4.5 6 4.5c2.1 0 3.6 1.3 4.5 2.6.9-1.3 2.4-2.6 4.5-2.6 3.6 0 5.5 3.6 4 7.2-2.5 4.7-10 9.3-10 9.3z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h3l2-3 3 5 2-3h4"
        />
      </svg>
    ),
  },
  {
    name: "Neurology",
    desc: "Brain & nervous system",
    href: "/doctors?page=1&search=neurology",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 4a3 3 0 013 3v1a3 3 0 013-3 3 3 0 013 3c0 1-.5 2-1 2.5.8.4 1.5 1.3 1.5 2.5 0 1.3-.8 2.3-1.8 2.7.3.5.3 1.1.3 1.3 0 1.7-1.3 3-3 3a2.9 2.9 0 01-2-.8 2.9 2.9 0 01-2 .8c-1.7 0-3-1.3-3-3 0-.2 0-.8.3-1.3A2.97 2.97 0 015.5 12.5c0-1.2.7-2.1 1.5-2.5-.5-.5-1-1.5-1-2.5a3 3 0 013-3z"
        />
      </svg>
    ),
  },
  {
    name: "Orthopedics",
    desc: "Bones, joints & muscles",
    href: "/doctors?page=1&search=orthopedics",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6.5 6.5c-1.4-1.4-3.6-1.4-5 0s-1.4 3.6 0 5L13 23l1.5-1.5L6 13l1.5-1.5L16 20l1.5-1.5-8.5-8.5L10.5 9l8 8c1.4 1.4 3.6 1.4 5 0s1.4-3.6 0-5L13 1l-1.5 1.5L20 11l-1.5 1.5L10 4l-1.5 1.5 1.5 1.5L6.5 6.5z"
        />
      </svg>
    ),
  },
  {
    name: "Pediatrics",
    desc: "Child & infant healthcare",
    href: "/doctors?page=1&search=pediatrics",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <circle cx="12" cy="8" r="4" strokeWidth={2} />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7"
        />
        <circle cx="9.5" cy="7.5" r="0.8" fill="currentColor" />
        <circle cx="14.5" cy="7.5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Dermatology",
    desc: "Skin, hair & nail care",
    href: "/doctors?page=1&search=dermatology",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3c4 3 7 6.5 7 10.5a7 7 0 01-14 0C5 9.5 8 6 12 3z"
        />
        <circle cx="12" cy="14" r="2.5" strokeWidth={2} />
      </svg>
    ),
  },
  {
    name: "Gynecology",
    desc: "Women's reproductive health",
    href: "/doctors?page=1&search=gynecology",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <circle cx="12" cy="9" r="6" strokeWidth={2} />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v6M9 19h6"
        />
      </svg>
    ),
  },
  {
    name: "Ophthalmology",
    desc: "Eye care & vision health",
    href: "/doctors?page=1&search=ophthalmology",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"
        />
        <circle cx="12" cy="12" r="3" strokeWidth={2} />
      </svg>
    ),
  },
  {
    name: "Dentistry",
    desc: "Oral & dental health",
    href: "/doctors?page=1&search=dentistry",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3c-2.5 0-4.5 1.8-4.5 4.5 0 2 .5 3 .8 5 .3 2 .5 5 1.7 5 1 0 1-3 2-5 1 2 1 5 2 5 1.2 0 1.4-3 1.7-5 .3-2 .8-3 .8-5C16.5 4.8 14.5 3 12 3z"
        />
      </svg>
    ),
  },
  {
    name: "Psychiatry",
    desc: "Mental health & wellbeing",
    href: "/doctors?page=1&search=psychiatry",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 18v-1a5 5 0 116 0v1m-9 3h12M10 22h4"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 2a5 5 0 015 5c0 2-1 3-1 4h-8c0-1-1-2-1-4a5 5 0 015-5z"
        />
      </svg>
    ),
  },
  {
    name: "General Medicine",
    desc: "Everyday health & checkups",
    href: "/doctors?page=1&search=general-medicine",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <rect x="4" y="3" width="16" height="18" rx="2" strokeWidth={2} />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 8h6M9 12h6M9 16h4"
        />
      </svg>
    ),
  },
];

export default function SpecializationsSection() {
  return (
    <section
      className="bg-white py-16 lg:py-20"
      aria-labelledby="specializations-heading"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Heading */}
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 bg-[#E0F2FE] text-[#0EA5E9] text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
              Medical Specializations
            </span>
            <h2
              id="specializations-heading"
              className="text-2xl lg:text-3xl font-bold text-[#1E293B]"
            >
              Find the Right Specialist for You
            </h2>
            <p className="text-[#64748B] mt-3 text-sm lg:text-base">
              Browse doctors by specialty and book a consultation in minutes.
            </p>
          </div>
        </FadeIn>

        {/* Card grid */}
        <FadeIn direction="up" delay={0.1}>
          <ul
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5"
            role="list"
          >
            {SPECIALIZATIONS.map((spec) => (
              <li key={spec.name}>
                <Link
                  href={spec.href}
                  className="group flex flex-col items-center text-center bg-white border border-[#E2E8F0] rounded-2xl p-5 h-full transition-all duration-300 hover:border-[#0EA5E9]/40 hover:shadow-[0_8px_24px_rgba(14,165,233,0.10)] hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
                >
                  <span
                    className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#E0F2FE] text-[#0EA5E9] mb-3 transition-colors duration-300 group-hover:bg-[#0EA5E9] group-hover:text-white"
                    aria-hidden="true"
                  >
                    {spec.icon}
                  </span>
                  <span className="font-semibold text-[#1E293B] text-sm">
                    {spec.name}
                  </span>
                  <span className="text-[#64748B] text-xs mt-1 leading-snug">
                    {spec.desc}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
