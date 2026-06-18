"use client";

import { useRouter } from "next/navigation";

export default function SuccessModal({ show, role }) {
  const router = useRouter();

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl animate-[slideUp_0.4s_ease-out]">
        <div className="w-16 h-16 bg-[#D1FAE5] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-[#10B981]"
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
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">
          Account Created!
        </h3>
        <p className="text-[#64748B] text-sm mb-6">
          {role === "doctor"
            ? "Welcome, Doctor! Your profile is under review. We'll notify you once verified."
            : "Welcome to MediCare Connect. Your healthcare journey starts now."}
        </p>
        <button
          onClick={() => router.push("/")}
          className="w-full py-3 px-6 rounded-[10px] font-semibold text-white text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(14,165,233,0.35)]"
          style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)" }}
        >
          Go to Dashboard →
        </button>
      </div>
    </div>
  );
}
