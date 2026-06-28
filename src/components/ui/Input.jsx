export function Input({ id, hasError, className = "", ...props }) {
  return (
    <input
      id={id}
      className={[
        "w-full px-3.5 py-2.5 text-sm border rounded-[10px] bg-[#1E293B] outline-none transition-all duration-200",
        "placeholder:text-gray-500 text-gray-100",
        hasError
          ? "border-red-500/50 shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
          : "border-gray-800 focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.15)]",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
