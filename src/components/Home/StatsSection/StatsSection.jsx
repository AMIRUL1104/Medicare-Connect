/**
 * StatsSection — async Server Component.
 *
 * Fetches platform stats on the server (mock data for now — swap
 * getPlatformStats() for a real DB query later, no component changes
 * needed). The card grid markup, icons, and labels are all rendered
 * server-side. Only <FadeIn> (entrance animation) and <StatCounter>
 * (count-up number) are client islands.
 */

import FadeIn from "./FadeIn";
import StatCounter from "./StatCounter";
import { getStats } from "@/services/server/api";

const STAT_ICONS = {
  doctors: (
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
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  patients: (
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
        d="M17 20h5v-2a4 4 0 00-4-4h-1m-5 6H2v-2a4 4 0 014-4h4a4 4 0 014 4v2zM9 12a4 4 0 100-8 4 4 0 000 8zm8 0a3 3 0 100-6 3 3 0 000 6z"
      />
    </svg>
  ),
  appointments: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="w-7 h-7"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth={2} />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 3v4M16 3v4M3 10h18"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 15l2 2 4-4"
      />
    </svg>
  ),
  reviews: (
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
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.98 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.110z"
      />
    </svg>
  ),
};

function buildStatCards(stats) {
  return [
    {
      key: "doctors",
      label: "Total Doctors",
      sub: "Verified specialists",
      value: stats.totalDoctors,
      suffix: "+",
      icon: STAT_ICONS.doctors,
      iconBg: "#E0F2FE",
      iconColor: "#0EA5E9",
    },
    {
      key: "patients",
      label: "Total Patients",
      sub: "Trust our platform",
      value: stats.totalPatients,
      suffix: "+",
      icon: STAT_ICONS.patients,
      iconBg: "#D1FAE5",
      iconColor: "#10B981",
    },
    {
      key: "appointments",
      label: "Total Appointments",
      sub: "Successfully completed",
      value: stats.totalAppointments,
      suffix: "+",
      icon: STAT_ICONS.appointments,
      iconBg: "#E0F2FE",
      iconColor: "#0EA5E9",
    },
    {
      key: "reviews",
      label: "Total Reviews",
      sub: "From real patients",
      value: stats.totalReviews,
      suffix: "+",
      icon: STAT_ICONS.reviews,
      iconBg: "#D1FAE5",
      iconColor: "#10B981",
    },
  ];
}

export default async function StatsSection() {
  // Server-side data fetch — mock for now, swap for real DB query later.
  const stats = await getStats();
  const cards = buildStatCards(stats);
  // console.log(stats);
  return (
    <section
      className="bg-[#F8FAFC] py-16 lg:py-20"
      aria-labelledby="stats-heading"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Heading */}
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 bg-[#E0F2FE] text-[#0EA5E9] text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
              Platform Statistics
            </span>
            <h2
              id="stats-heading"
              className="text-2xl lg:text-3xl font-bold text-[#1E293B]"
            >
              Trusted by Thousands Nationwide
            </h2>
            <p className="text-[#64748B] mt-3 text-sm lg:text-base">
              Real numbers from a growing healthcare community.
            </p>
          </div>
        </FadeIn>

        {/* Card grid */}
        <ul
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          role="list"
        >
          {cards.map((card, i) => (
            <li key={card.key}>
              <FadeIn direction="up" delay={i * 0.1}>
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 lg:p-6 h-full flex flex-col items-center text-center transition-all duration-300 hover:border-[#0EA5E9]/40 hover:shadow-[0_8px_24px_rgba(14,165,233,0.10)] hover:-translate-y-1">
                  <span
                    className="flex items-center justify-center w-14 h-14 rounded-xl mb-4"
                    style={{ background: card.iconBg, color: card.iconColor }}
                    aria-hidden="true"
                  >
                    {card.icon}
                  </span>

                  <div className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
                    <StatCounter value={card.value} suffix={card.suffix} />
                  </div>

                  <p className="text-[#1E293B] text-sm font-semibold mt-1.5">
                    {card.label}
                  </p>
                  <p className="text-[#64748B] text-xs mt-0.5">{card.sub}</p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
