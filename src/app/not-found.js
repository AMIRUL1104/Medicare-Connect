import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center p-6 text-gray-100 select-none relative overflow-hidden">
      {/* ─── BACKGROUND GLOW EFFECTS ─── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#38BDF8]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ─── MAIN CONTENT ─── */}
      <div className="text-center z-10 max-w-md space-y-6 flex flex-col items-center">
        {/* ─── PREMIUM MEDICAL-TECH 404 ILLUSTRATION ─── */}
        <div className="w-48 h-48 relative mb-2 animate-bounce [animation-duration:3s]">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_0_25px_rgba(56,189,248,0.2)]"
          >
            {/* ব্যাকগ্রাউন্ড পালস বা হার্টবিট লাইন */}
            <path
              d="M20 100H60L75 60L95 140L110 85L120 115L130 100H180"
              stroke="#38BDF8"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-20"
            />

            {/* Tailwind অ্যানিমেশন ক্লাস দিয়েই রান করানো লাইভ পালস ইফেক্ট */}
            <path
              d="M20 100H60L75 60L95 140L110 85L120 115L130 100H180"
              stroke="#38BDF8"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse opacity-80"
            />

            {/* মেডিকেল ক্রস সাইন */}
            <g transform="translate(85, 20)" className="opacity-80">
              <rect x="10" y="0" width="10" height="30" fill="#38BDF8" rx="2" />
              <rect x="0" y="10" width="30" height="10" fill="#38BDF8" rx="2" />
            </g>
          </svg>

          {/* ইলাস্ট্রেশনের নিচের গ্লো শ্যাডো */}
          <div className="absolute -bottom-2 left-1/4 w-1/2 h-2 bg-[#38BDF8]/10 blur-sm rounded-full animate-pulse" />
        </div>

        {/* বড় ডিজিটাল এরর কোড */}
        <div className="relative inline-block">
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-400 to-gray-800 tracking-tighter opacity-80">
            404
          </h1>
          {/* সায়ান কালারের ছোটো গ্লোয়িং ব্যাজ */}
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 px-3 py-0.5 rounded-full text-xs font-bold font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            Page Not Found
          </span>
        </div>

        {/* 메시지 텍스트 */}
        <div className="space-y-2 pt-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Oops! You&apos;ve drifted into space.
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable on{" "}
            <span className="text-[#38BDF8] font-medium">MediCare Connect</span>
            .
          </p>
        </div>

        {/* ─── ACTION BUTTONS ─── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 w-full">
          {/* হোম পেজে ব্যাক করার মেইন বাটন */}
          <Link
            href="/"
            className="w-full sm:w-auto bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0B1120] font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-[0_4px_20px_rgba(56,189,248,0.25)] hover:shadow-[0_4px_25px_rgba(56,189,248,0.4)] active:scale-[0.98] text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* ─── FOOTER BRANDING ─── */}
      <div className="absolute bottom-6 text-[11px] font-mono tracking-wider text-gray-600">
        MEDICARE CONNECT • CORE_SYSTEM_v2.0
      </div>
    </div>
  );
}
