import Image from "next/image";

// Pure Server Component. Static doctor profile display — no interactivity.
export default function DoctorInfoSection({ doctor }) {
  const {
    doctorName,
    specialization,
    qualifications,
    experience,
    consultationFee,
    hospitalName,
    profileImage,
    availableDays = [],
  } = doctor;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Profile image */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 bg-[#F0F9FF]">
          <Image
            fill
            src={profileImage}
            alt={doctorName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Core info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-[#1E293B]">
                {doctorName}
              </h1>
              <p className="text-[#0EA5E9] font-medium text-sm mt-0.5">
                {specialization}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-[#D1FAE5] text-[#10B981] text-xs font-semibold px-3 py-1.5 rounded-full shrink-0">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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

          <p className="text-[#64748B] text-sm mt-2">{qualifications}</p>

          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <span className="flex items-center gap-1.5 text-[#64748B]">
              <svg
                className="w-4 h-4 text-[#94A3B8]"
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
              {experience}+ years experience
            </span>
            <span className="flex items-center gap-1.5 text-[#64748B]">
              <svg
                className="w-4 h-4 text-[#94A3B8]"
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
              {hospitalName}
            </span>
          </div>
        </div>
      </div>

      {/* Available days chips */}
      <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
        <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-2.5">
          Available Days
        </p>
        <div className="flex flex-wrap gap-2">
          {availableDays.map((day) => (
            <span
              key={day}
              className="text-xs font-medium text-[#0EA5E9] bg-[#E0F2FE] px-3 py-1.5 rounded-full"
            >
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* Fee */}
      <div className="mt-6 pt-6 border-t border-[#E2E8F0] flex items-center justify-between">
        <p className="text-sm text-[#64748B]">Consultation Fee</p>
        <p className="text-xl font-bold text-[#1E293B]">৳{consultationFee}</p>
      </div>
    </div>
  );
}
