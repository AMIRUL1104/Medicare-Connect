"use client";

const specializations = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "General Practice",
  "Oncology",
  "ENT",
  "Other",
];

function FieldError({ error }) {
  if (!error) return null;
  return (
    <p className="flex items-center gap-1 text-red-400 text-[11px] mt-1">
      <span>⚠</span> {error.message}
    </p>
  );
}

export default function DoctorFields({ register, errors, visible }) {
  return (
    <div
      className="overflow-hidden transition-all duration-400"
      style={{
        maxHeight: visible ? "700px" : "0px",
        opacity: visible ? 1 : 0,
        marginTop: visible ? "0" : "0",
        transition: "max-height 0.4s ease, opacity 0.3s ease",
      }}
    >
      {/* Container - Smooth Dark with subtle border */}
      <div className="bg-[#1E293B]/60 backdrop-blur-sm rounded-xl p-4 border border-gray-800 space-y-3 mt-1">
        {/* Header */}
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-[#38BDF8]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-sm font-semibold text-[#38BDF8]">
            Doctor Credentials
          </span>
        </div>

        {/* Specialization + Experience */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-semibold text-gray-200 mb-1">
              Specialization <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                {...register("specialization")}
                className={[
                  "w-full px-3 py-2.5 text-[13px] border rounded-[10px] bg-[#111827] outline-none transition-all duration-200 appearance-none",
                  "text-gray-100 cursor-pointer",
                  errors.specialization
                    ? "border-red-500/50 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                    : "border-gray-800 focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.15)]",
                ].join(" ")}
              >
                <option value="" className="bg-[#111827]">
                  Select…
                </option>
                {specializations.map((s) => (
                  <option key={s} value={s} className="bg-[#111827]">
                    {s}
                  </option>
                ))}
              </select>
              {/* Custom Dropdown Arrow for Dark Mode */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <FieldError error={errors.specialization} />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-gray-200 mb-1">
              Years of Experience <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              min="0"
              max="60"
              placeholder="e.g. 8"
              {...register("experience")}
              className={[
                "w-full px-3 py-2.5 text-[13px] border rounded-[10px] bg-[#111827] outline-none transition-all duration-200",
                "placeholder:text-gray-500 text-gray-100",
                errors.experience
                  ? "border-red-500/50 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                  : "border-gray-800 focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.15)]",
              ].join(" ")}
            />
            <FieldError error={errors.experience} />
          </div>
        </div>

        {/* Qualifications */}
        <div>
          <label className="block text-[12px] font-semibold text-gray-200 mb-1">
            Qualifications <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="MBBS, MD, FCPS…"
            {...register("qualifications")}
            className={[
              "w-full px-3 py-2.5 text-[13px] border rounded-[10px] bg-[#111827] outline-none transition-all duration-200",
              "placeholder:text-gray-500 text-gray-100",
              errors.qualifications
                ? "border-red-500/50 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                : "border-gray-800 focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.15)]",
            ].join(" ")}
          />
          <FieldError error={errors.qualifications} />
        </div>

        {/* Hospital + Fee */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-semibold text-gray-200 mb-1">
              Hospital / Clinic <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="City Medical Center"
              {...register("hospital")}
              className={[
                "w-full px-3 py-2.5 text-[13px] border rounded-[10px] bg-[#111827] outline-none transition-all duration-200",
                "placeholder:text-gray-500 text-gray-100",
                errors.hospital
                  ? "border-red-500/50 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                  : "border-gray-800 focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.15)]",
              ].join(" ")}
            />
            <FieldError error={errors.hospital} />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-gray-200 mb-1">
              Consultation Fee (BDT) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 800"
              {...register("fee")}
              className={[
                "w-full px-3 py-2.5 text-[13px] border rounded-[10px] bg-[#111827] outline-none transition-all duration-200",
                "placeholder:text-gray-500 text-gray-100",
                errors.fee
                  ? "border-red-500/50 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                  : "border-gray-800 focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.15)]",
              ].join(" ")}
            />
            <FieldError error={errors.fee} />
          </div>
        </div>
      </div>
    </div>
  );
}
