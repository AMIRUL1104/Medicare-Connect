"use client";

/**
 * SymptomsStep — Step 3 of the booking flow.
 * Only rendered (by the parent) once a slot is selected.
 * Uses register-based RHF validation, matching the project's existing
 * Label/Input/FieldError pattern.
 */
export default function SymptomsStep({ register, errors, value }) {
  const length = value?.length || 0;
  const min = 20;
  const max = 500;

  const counterColor =
    length === 0
      ? "text-[#94A3B8]"
      : length < min
      ? "text-[#EF4444]"
      : length > max
      ? "text-[#EF4444]"
      : "text-[#10B981]";

  return (
    <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
      <div className="flex items-center gap-2 mb-3">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0EA5E9] text-white text-xs font-bold">
          3
        </span>
        <h3 className="font-semibold text-[#1E293B] text-sm">Describe Your Symptoms</h3>
      </div>

      <label htmlFor="symptoms" className="block text-[13px] font-semibold text-[#1E293B] mb-1.5">
        Symptoms <span className="text-[#EF4444]">*</span>
      </label>

      <textarea
        id="symptoms"
        rows={4}
        placeholder="Describe what you're experiencing in detail (e.g. duration, severity, related symptoms)..."
        className={[
          "w-full px-3.5 py-2.5 text-sm border-[1.5px] rounded-[10px] bg-white outline-none transition-all duration-200 resize-none",
          "placeholder:text-[#94A3B8] text-[#1E293B]",
          errors.symptoms
            ? "border-[#EF4444] shadow-[0_0_0_3px_rgba(239,68,68,0.10)]"
            : "border-[#E2E8F0] focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.12)]",
        ].join(" ")}
        {...register("symptoms", {
          required: "Please describe your symptoms.",
          minLength: { value: min, message: `Symptoms must be at least ${min} characters.` },
          maxLength: { value: max, message: `Symptoms must be under ${max} characters.` },
        })}
      />

      <div className="flex items-center justify-between mt-1.5">
        <div>
          {errors.symptoms && (
            <p className="flex items-center gap-1 text-[#EF4444] text-xs">
              <span>⚠</span> {errors.symptoms.message}
            </p>
          )}
        </div>
        <p className={`text-xs font-medium shrink-0 ${counterColor}`}>
          {length}/{max}
        </p>
      </div>
    </div>
  );
}
