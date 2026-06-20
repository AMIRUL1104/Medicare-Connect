// Server Component — no "use client" here

import { patientReviews } from "@/lib/data/reviews";
import ReviewsMarquee from "./ReviewsMarquee";
import { getStats } from "@/services/server/api";

export default async function PatientSuccessStories() {
  const { totalDoctors, totalPatients, totalAppointments, totalReviews } =
    await getStats();
  return (
    <section className="py-20 bg-[#F0F7FC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-4">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 bg-white text-[#1A9DD9] text-sm font-medium px-4 py-1.5 rounded-full shadow-sm border border-[#D0EAF8]">
            <span className="w-2 h-2 rounded-full bg-[#1A9DD9] inline-block" />
            Patient Success Stories
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 max-w-xl leading-tight">
            Real patients.{" "}
            <span className="text-[#1A9DD9]">Real outcomes.</span>
          </h2>

          <p className="text-slate-500 text-base max-w-lg leading-relaxed">
            {` Over ${totalPatients} patients trust MediCare Connect for consultations, bookings,
            and prescriptions — here's what they say.`}
          </p>
        </div>
      </div>

      {/* Fade masks on left and right edges */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #F0F7FC 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, #F0F7FC 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Marquee — client component for Framer Motion */}
        <div className="px-4">
          <ReviewsMarquee reviews={patientReviews} />
        </div>
      </div>

      {/* Bottom trust bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-[#1A9DD9] font-bold text-lg">4.9</span>
            <span>average rating</span>
          </div>
          <div className="w-px h-4 bg-slate-300 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-[#1A9DD9] font-bold text-lg">
              {totalPatients}
            </span>
            <span>patients served</span>
          </div>
          <div className="w-px h-4 bg-slate-300 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-[#1A9DD9] font-bold text-lg">
              {totalDoctors}
            </span>
            <span>verified doctors</span>
          </div>
        </div>
      </div>
    </section>
  );
}
