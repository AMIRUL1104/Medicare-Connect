import Link from "next/link";
import FadeIn from "./FadeIn";
import DoctorCard from "./DoctorCard";
import { getLimitedDoctors } from "./getLimitedDoctors";
import { getLimetedDoctors } from "@/services/server/api";

/**
 * FeaturedDoctorsSection — async Server Component.
 *
 * Fetches doctors on the server, filters to verified only, and renders
 * the grid. <FadeIn> is the only client component used (for section
 * heading + staggered card reveal) — everything else (cards, images,
 * links, hover states) is server-rendered static HTML.
 */
export default async function FeaturedDoctorsSection() {
  const doctors = await getLimetedDoctors(); // returns up to 6+ doctors

  return (
    <section
      className="bg-[#F8FAFC] py-16 lg:py-20"
      aria-labelledby="featured-doctors-heading"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Heading */}
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 bg-[#E0F2FE] text-[#0EA5E9] text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
              Featured Doctors
            </span>
            <h2
              id="featured-doctors-heading"
              className="text-2xl lg:text-3xl font-bold text-[#1E293B]"
            >
              Meet Our Top-Rated Specialists
            </h2>
            <p className="text-[#64748B] mt-3 text-sm lg:text-base">
              Verified, experienced doctors ready to help — book a consultation
              today.
            </p>
          </div>
        </FadeIn>

        {/* Card grid */}
        {doctors.length > 0 ? (
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
          >
            {doctors.map((doctor, i) => (
              <li key={doctor._id} className="h-full">
                <FadeIn direction="up" delay={i * 0.08}>
                  <DoctorCard doctor={doctor} />
                </FadeIn>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-[#64748B] text-sm py-12">
            No verified doctors available right now. Please check back soon.
          </p>
        )}

        {/* View All CTA */}
        <FadeIn direction="up" delay={0.1}>
          <div className="flex justify-center mt-12">
            <Link
              href="/doctors"
              className="px-7 py-3 rounded-[10px] text-sm font-semibold text-[#1E293B] border-[1.5px] border-[#E2E8F0] bg-white transition-all duration-200 hover:border-[#0EA5E9] hover:text-[#0EA5E9] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
            >
              View All Doctors →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
