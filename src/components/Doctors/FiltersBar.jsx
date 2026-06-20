import SearchInput from "@/components/doctors/SearchInput";
import SortDropdown from "@/components/doctors/SortDropdown";
import ClearFiltersButton from "@/components/doctors/ClearFiltersButton";
import ResultsCount from "@/components/doctors/ResultsCount";

/**
 * FiltersBar — Server Component shell.
 * The sticky positioning, layout, and ResultsCount are server-rendered.
 * SearchInput, SortDropdown, and ClearFiltersButton are the only
 * client pieces (each needs router/searchParams access).
 */
export default function FiltersBar({ total }) {
  return (
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
        <div className="mt-3">
          <ResultsCount total={total} />
        </div>
      </div>
    </div>
  );
}
