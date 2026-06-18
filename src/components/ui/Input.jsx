export function Input({ id, hasError, className = "", ...props }) {
  return (
    <input
      id={id}
      className={[
        "w-full px-3.5 py-2.5 text-sm border-[1.5px] rounded-[10px] bg-white outline-none transition-all duration-200",
        "placeholder:text-[#94A3B8] text-[#1E293B]",
        hasError
          ? "border-[#EF4444] shadow-[0_0_0_3px_rgba(239,68,68,0.10)]"
          : "border-[#E2E8F0] focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.12)]",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
