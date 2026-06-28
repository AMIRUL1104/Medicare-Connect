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
      <label className="block text-[13px] font-semibold text-gray-200 mb-2">
        Account Type <span className="text-red-400">*</span>
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
                "flex-1 py-3.5 px-3 rounded-xl border text-center cursor-pointer transition-all duration-200",
                selected
                  ? "border-[#0EA5E9] bg-[#1E293B] shadow-[0_0_15px_rgba(14,165,233,0.15)] ring-1 ring-[#0EA5E9]"
                  : "border-gray-800 bg-[#111827] text-gray-400 hover:border-[#0EA5E9] hover:bg-[#1E293B]/60",
              ].join(" ")}
            >
              <div className="text-2xl mb-1">{role.icon}</div>
              <div
                className={`text-[13px] font-semibold transition-colors ${selected ? "text-[#38BDF8]" : "text-gray-100"}`}
              >
                {role.label}
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5">
                {role.desc}
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
          <span>⚠</span> {error.message}
        </p>
      )}
    </div>
  );
}
