"use client";

const specializations = [
  "Cardiology", "Dermatology", "Neurology", "Orthopedics",
  "Pediatrics", "Psychiatry", "General Practice", "Oncology", "ENT", "Other",
];

function FieldError({ error }) {
  if (!error) return null;
  return (
    <p className="flex items-center gap-1 text-[#EF4444] text-[11px] mt-1">
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
      <div className="bg-[#F0F9FF] rounded-xl p-4 border border-[#E0F2FE] space-y-3 mt-1">
        {/* Header */}
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm font-semibold text-[#0EA5E9]">Doctor Credentials</span>
        </div>

        {/* Specialization + Experience */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-semibold text-[#1E293B] mb-1">
              Specialization <span className="text-[#EF4444]">*</span>
            </label>
            <select
              {...register("specialization")}
              className={[
                "w-full px-3 py-2.5 text-[13px] border-[1.5px] rounded-[10px] bg-white outline-none transition-all duration-200 appearance-none",
                "text-[#1E293B] cursor-pointer",
                errors.specialization
                  ? "border-[#EF4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
                  : "border-[#E2E8F0] focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.12)]",
              ].join(" ")}
            >
              <option value="">Select…</option>
              {specializations.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <FieldError error={errors.specialization} />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#1E293B] mb-1">
              Years of Experience <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="number"
              min="0"
              max="60"
              placeholder="e.g. 8"
              {...register("experience")}
              className={[
                "w-full px-3 py-2.5 text-[13px] border-[1.5px] rounded-[10px] bg-white outline-none transition-all duration-200",
                "placeholder:text-[#94A3B8] text-[#1E293B]",
                errors.experience
                  ? "border-[#EF4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
                  : "border-[#E2E8F0] focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.12)]",
              ].join(" ")}
            />
            <FieldError error={errors.experience} />
          </div>
        </div>

        {/* Qualifications */}
        <div>
          <label className="block text-[12px] font-semibold text-[#1E293B] mb-1">
            Qualifications <span className="text-[#EF4444]">*</span>
          </label>
          <input
            type="text"
            placeholder="MBBS, MD, FCPS…"
            {...register("qualifications")}
            className={[
              "w-full px-3 py-2.5 text-[13px] border-[1.5px] rounded-[10px] bg-white outline-none transition-all duration-200",
              "placeholder:text-[#94A3B8] text-[#1E293B]",
              errors.qualifications
                ? "border-[#EF4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
                : "border-[#E2E8F0] focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.12)]",
            ].join(" ")}
          />
          <FieldError error={errors.qualifications} />
        </div>

        {/* Hospital + Fee */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-semibold text-[#1E293B] mb-1">
              Hospital / Clinic <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              placeholder="City Medical Center"
              {...register("hospital")}
              className={[
                "w-full px-3 py-2.5 text-[13px] border-[1.5px] rounded-[10px] bg-white outline-none transition-all duration-200",
                "placeholder:text-[#94A3B8] text-[#1E293B]",
                errors.hospital
                  ? "border-[#EF4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
                  : "border-[#E2E8F0] focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.12)]",
              ].join(" ")}
            />
            <FieldError error={errors.hospital} />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#1E293B] mb-1">
              Consultation Fee (BDT) <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 800"
              {...register("fee")}
              className={[
                "w-full px-3 py-2.5 text-[13px] border-[1.5px] rounded-[10px] bg-white outline-none transition-all duration-200",
                "placeholder:text-[#94A3B8] text-[#1E293B]",
                errors.fee
                  ? "border-[#EF4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
                  : "border-[#E2E8F0] focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.12)]",
              ].join(" ")}
            />
            <FieldError error={errors.fee} />
          </div>
        </div>
      </div>
    </div>
  );
}
