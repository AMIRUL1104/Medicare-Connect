"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

/**
 * Pagination — client component.
 * Updates the `page` URL param; the page re-fetches server-side.
 */
export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function goToPage(page) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex items-center justify-center gap-3 mt-10"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => goToPage(Number(currentPage) - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-[10px] border-[1.5px] border-[#E2E8F0] bg-white text-[#1E293B] transition-all duration-200 hover:border-[#0EA5E9] hover:text-[#0EA5E9] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#E2E8F0] disabled:hover:text-[#1E293B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Previous
      </button>

      <span className="text-sm text-[#64748B] font-medium px-2">
        Page <span className="text-[#1E293B] font-semibold">{currentPage}</span>{" "}
        of <span className="text-[#1E293B] font-semibold">{totalPages}</span>
      </span>

      <button
        type="button"
        onClick={() => goToPage(Number(currentPage) + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-[10px] border-[1.5px] border-[#E2E8F0] bg-white text-[#1E293B] transition-all duration-200 hover:border-[#0EA5E9] hover:text-[#0EA5E9] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#E2E8F0] disabled:hover:text-[#1E293B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
      >
        Next
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </nav>
  );
}
