"use client";

const roles = [
  {
    id: "patient",
    icon: "🧑‍⚕️",
    label: "Patient",
    desc: "Book & manage appointments",
  },
  {
    id: "doctor",
    icon: "👨‍⚕️",
    label: "Doctor",
    desc: "Manage patients & schedule",
  },
];

export default function RoleSelector({ value, onChange, error }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-[#1E293B] mb-2">
        Account Type <span className="text-[#EF4444]">*</span>
      </label>

      <div className="flex gap-3">
        {roles.map((role) => {
          const selected = value === role.id;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onChange(role.id)}
              className={[
                "flex-1 py-3.5 px-3 rounded-xl border-[1.5px] text-center cursor-pointer transition-all duration-200",
                selected
                  ? "border-[#0EA5E9] bg-[#E0F2FE] shadow-[0_0_0_3px_rgba(14,165,233,0.12)]"
                  : "border-[#E2E8F0] bg-white hover:border-[#0EA5E9] hover:bg-[#F0F9FF]",
              ].join(" ")}
            >
              <div className="text-2xl mb-1">{role.icon}</div>
              <div className="text-[13px] font-semibold text-[#1E293B]">{role.label}</div>
              <div className="text-[11px] text-[#64748B] mt-0.5">{role.desc}</div>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="flex items-center gap-1 text-[#EF4444] text-xs mt-1">
          <span>⚠</span> {error.message}
        </p>
      )}
    </div>
  );
}
