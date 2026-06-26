"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchPrescription({ placeholder }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    // URL আপডেট হবে এবং সার্ভার কম্পোনেন্ট নতুন ডাটা রি-ফেচ করবে
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative max-w-xs w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
      <input
        type="text"
        placeholder={placeholder}
        defaultValue={searchParams.get("search") || ""}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full bg-[#0E121F] border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-gray-200 focus:outline-hidden focus:border-emerald-500 transition-colors placeholder:text-gray-600"
      />
    </div>
  );
}
