"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

/**
 * ClearFiltersButton — client component.
 * Resets search, sort, and page params in one click.
 */
export default function ClearFiltersButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasFilters = searchParams.get("search") || searchParams.get("sort");

  function handleClear() {
    router.push(pathname);
  }

  return (
    <button
      type="button"
      onClick={handleClear}
      disabled={!hasFilters}
      className="px-4 py-2.5 text-sm font-medium rounded-[10px] border-[1.5px] border-[#E2E8F0] bg-white text-[#1E293B] transition-all duration-200 hover:border-[#EF4444] hover:text-[#EF4444] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#E2E8F0] disabled:hover:text-[#1E293B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2 whitespace-nowrap"
    >
      Clear Filters
    </button>
  );
}
