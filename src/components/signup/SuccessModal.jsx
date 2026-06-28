"use client";

import { useRouter } from "next/navigation";

export default function SuccessModal({ show, role }) {
  const router = useRouter();

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1E293B] border border-gray-800 rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-[slideUp_0.4s_ease-out]">
        {/* Success Icon Badge */}
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <svg
            className="w-8 h-8 text-[#34D399]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Heading */}
        <h3 className="text-xl font-bold text-gray-100 mb-2">
          Account Created!
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          {role === "doctor"
            ? "Welcome, Doctor! Your profile is under review. We'll notify you once verified."
            : "Welcome to MediCare Connect. Your healthcare journey starts now."}
        </p>

        {/* Action Button */}
        <button
          onClick={() => {
            router.push("/");
            router.refresh();
          }}
          className="w-full py-3 px-6 rounded-[10px] font-semibold text-white text-sm bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(14,165,233,0.4)]"
        >
          Go to Home →
        </button>
      </div>
    </div>
  );
}
