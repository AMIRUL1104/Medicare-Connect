"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentUrlSearch = searchParams.get("search") || "";
  const [value, setValue] = useState(currentUrlSearch);
  const debounceRef = useRef(null);
  const prevUrlSearchRef = useRef(currentUrlSearch); // 👈 Track URL search value to detect real user changes

  // 👈 Sync ref with current URL search value whenever it changes (e.g., on component remount)
  useEffect(() => {
    prevUrlSearchRef.current = currentUrlSearch;
  }, [currentUrlSearch]);

  useEffect(() => {
    // 👈 Only proceed if user actually changed the value from what's in the URL
    // This prevents page reset when component remounts with same search param
    if (value === currentUrlSearch) {
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set("search", value.trim());
      } else {
        params.delete("search");
      }

      // 👈 Reset page to 1 only when user actually changed the search value
      params.set("page", "1");

      router.push(`${pathname}?${params.toString()}`);
    }, 450);

    return () => clearTimeout(debounceRef.current);
  }, [value, currentUrlSearch, searchParams, pathname, router]);

  return (
    <div className="relative">
      <svg
        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]"
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
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by doctor name or specialization..."
        aria-label="Search doctors by name or specialization"
        className="w-full pl-10 pr-4 py-2.5 text-sm border-[1.5px] border-[#E2E8F0] rounded-[10px] bg-white outline-none transition-all duration-200 placeholder:text-[#94A3B8] text-[#1E293B] focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.12)]"
      />
    </div>
  );
}
