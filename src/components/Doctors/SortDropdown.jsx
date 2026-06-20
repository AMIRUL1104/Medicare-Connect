"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "fee-asc", label: "Fee: Low to High" },
  { value: "fee-desc", label: "Fee: High to Low" },
  { value: "experience-asc", label: "Experience: Low to High" },
  { value: "experience-desc", label: "Experience: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
];

/**
 * SortDropdown — client component.
 * Updates the `sort` URL param on change; the page re-fetches server-side.
 */
export default function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "";

  function handleChange(e) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("sort", e.target.value);
    } else {
      params.delete("sort");
    }
    params.set("page", "1"); // reset to page 1 on new sort
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      value={currentSort}
      onChange={handleChange}
      aria-label="Sort doctors"
      className="px-3.5 py-2.5 text-sm border-[1.5px] border-[#E2E8F0] rounded-[10px] bg-white outline-none transition-all duration-200 text-[#1E293B] cursor-pointer focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.12)] appearance-none pr-9"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748B'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 10px center",
        backgroundSize: "16px",
      }}
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
