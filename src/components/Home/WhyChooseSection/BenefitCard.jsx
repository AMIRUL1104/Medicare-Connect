export default function BenefitCard({ benefit }) {
  const { Icon, heading, description, stat } = benefit;

  return (
    <div
      className="group relative bg-white rounded-2xl p-7 border border-slate-100 shadow-[0_2px_16px_rgba(14,165,233,0.06)] hover:shadow-[0_8px_32px_rgba(14,165,233,0.13)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-5 h-full"
    >
      {/* Icon container */}
      <div className="w-12 h-12 rounded-xl bg-[#EFF8FF] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0EA5E9] transition-colors duration-300">
        <Icon
          size={22}
          strokeWidth={1.8}
          className="text-[#0EA5E9] group-hover:text-white transition-colors duration-300"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-slate-900 text-base font-700 leading-snug" style={{ fontWeight: 700 }}>
          {heading}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed" style={{ fontWeight: 400 }}>
          {description}
        </p>
      </div>

      {/* Stat chip */}
      <div className="mt-auto pt-1">
        <span className="inline-block text-[#0EA5E9] text-xs font-semibold bg-[#EFF8FF] px-3 py-1 rounded-full">
          {stat}
        </span>
      </div>

      {/* Subtle left accent that appears on hover */}
      <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full bg-[#0EA5E9] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
