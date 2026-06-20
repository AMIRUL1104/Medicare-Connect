import DoctorCardSkeleton from "@/components/doctors/DoctorCardSkeleton";
import SearchInput from "@/components/doctors/SearchInput";
import SortDropdown from "@/components/doctors/SortDropdown";
import ClearFiltersButton from "@/components/doctors/ClearFiltersButton";

/**
 * DoctorResultsSkeleton — Suspense fallback.
 * Renders the same filter bar shell (so layout doesn't shift) plus
 * skeleton cards instead of a spinner, for a smoother loading feel.
 */
export default function DoctorResultsSkeleton() {
  return (
    <>
      <div className="lg:sticky lg:top-[72px] z-20 bg-[#F8FAFC]/95 backdrop-blur-sm border-b border-[#E2E8F0] -mx-4 px-4 lg:-mx-8 lg:px-8 py-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="flex-1">
              <SearchInput />
            </div>
            <div className="flex items-center gap-3">
              <SortDropdown />
              <ClearFiltersButton />
            </div>
          </div>
          <div className="mt-3 h-4 w-32 bg-[#E2E8F0] rounded animate-pulse" aria-hidden="true" />
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Loading doctors">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i}>
            <DoctorCardSkeleton />
          </li>
        ))}
      </ul>
    </>
  );
}
