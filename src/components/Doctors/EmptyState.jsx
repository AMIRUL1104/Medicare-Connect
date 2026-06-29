import ClearFiltersButton from "@/components/doctors/ClearFiltersButton";

// Server Component shell. ClearFiltersButton inside it is the only
// client piece (needs router access).
export default function EmptyState() {
  return (
    <div className="flex flex-col items-center text-center py-16 px-4">
      <div className="w-16 h-16 rounded-full bg-[#F0F9FF] flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-[#0EA5E9]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>
      <h3 className="font-semibold text-[#1E293B] text-base mb-1.5">
        No doctors found
      </h3>
      <p className="text-[#64748B] text-sm max-w-sm mb-5">
        {` Try adjusting your search or filters to find what you're looking for.`}
      </p>
      <ClearFiltersButton />
    </div>
  );
}
