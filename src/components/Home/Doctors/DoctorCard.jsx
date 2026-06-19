import Image from "next/image";
import Link from "next/link";

// Pure Server Component. No "use client" — card markup is fully static.
// Hover effects use plain Tailwind; entrance animation is applied by
// the parent (FeaturedDoctorsSection) via <FadeIn>, not in here.

function formatDays(days = []) {
  if (!days.length) return "Contact for availability";
  if (days.length >= 6) return "Available all week";
  return days.join(", ");
}

export default function DoctorCard({ doctor }) {
  const {
    doctorName,
    specialization,
    qualifications,
    experience,
    consultationFee,
    hospitalName,
    profileImage,
    availableDays,
    id,
  } = doctor;

  return (
    <div className="group bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-[#0EA5E9]/40 hover:shadow-[0_10px_28px_rgba(14,165,233,0.12)] hover:-translate-y-1">
      {/* Profile image */}
      <div className="relative w-full h-44 bg-[#F0F9FF] overflow-hidden">
        <Image
          src={profileImage}
          alt={doctorName}
          fill
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/95 text-[#10B981] text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Verified
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-[#1E293B] text-base">{doctorName}</h3>
        <p className="text-[#0EA5E9] text-sm font-medium mt-0.5">
          {specialization}
        </p>
        <p className="text-[#64748B] text-xs mt-1">{qualifications}</p>

        {/* Meta rows */}
        <ul className="mt-4 space-y-2 text-xs text-[#64748B]">
          <li className="flex items-center gap-2">
            <svg
              className="w-3.5 h-3.5 text-[#94A3B8] shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{experience}+ years experience</span>
          </li>
          <li className="flex items-center gap-2">
            <svg
              className="w-3.5 h-3.5 text-[#94A3B8] shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3m6-14h2m-2 4h2m4-4h2m-2 4h2"
              />
            </svg>
            <span className="truncate">{hospitalName}</span>
          </li>
          <li className="flex items-center gap-2">
            <svg
              className="w-3.5 h-3.5 text-[#94A3B8] shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{formatDays(availableDays)}</span>
          </li>
        </ul>

        {/* Fee + CTA */}
        <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] text-[#94A3B8] uppercase tracking-wide">
              Consultation Fee
            </p>
            <p className="text-base font-bold text-[#1E293B]">
              ৳{consultationFee}
            </p>
          </div>
          <Link
            href={`/doctors/${doctor._id}`}
            className="px-4 py-2 rounded-[8px] text-xs font-semibold text-white whitespace-nowrap transition-all duration-200 hover:shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
            style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)" }}
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
