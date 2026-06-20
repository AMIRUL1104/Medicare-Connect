"use client";

import { useState } from "react";

/**
 * FaqItem — small client island.
 * Expand/collapse needs local state, which requires the browser.
 * The parent FaqSection (heading, list wrapper, FadeIn) stays a
 * Server Component — only this individual item is interactive.
 */
export default function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#E2E8F0] rounded-xl bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-inset"
      >
        <span className="font-medium text-[#1E293B] text-sm">{question}</span>
        <svg
          className={`w-4 h-4 text-[#64748B] shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "300px" : "0px" }}
      >
        <p className="px-5 pb-4 text-[#64748B] text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
