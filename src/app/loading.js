import React from "react";

export default function Loading() {
  return (
    <div className="w-full h-screen bg-[#0B1120] flex flex-col items-center justify-center p-6 select-none relative overflow-hidden">
      {/* ─── BACKGROUND GLOW EFFECT ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#38BDF8]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* ─── LOADER & BRANDING ─── */}
      <div className="flex flex-col items-center space-y-6 z-10">
        {/* মডার্ন ডাবল-রিং স্পিনার */}
        <div className="relative w-16 h-16">
          {/* বাইরের সায়ান রিং (ক্লকওয়াইজ ঘুরবে) */}
          <div className="absolute inset-0 border-4 border-t-[#38BDF8] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>

          {/* ভেতরের এমারেল্ড/গ্রিন রিং (অ্যান্টি-ক্লকওয়াইজ ঘুরবে) */}
          <div className="absolute inset-1.5 border-4 border-b-emerald-400 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-[spin_1s_linear_infinite_reverse] opacity-80"></div>

          {/* সেন্ট্রাল গ্লোয়িং ডট */}
          <div className="absolute inset-5 bg-[#38BDF8] rounded-full animate-pulse shadow-[0_0_15px_rgba(56,189,248,0.6)]"></div>
        </div>

        {/* লোডিং টেক্সট */}
        <div className="text-center space-y-1.5">
          <h3 className="text-sm font-bold tracking-[0.2em] text-white uppercase font-mono">
            Loading...
          </h3>
          <p className="text-xs text-gray-500 font-medium tracking-wide animate-pulse">
            Fetching secure data from server...
          </p>
        </div>
      </div>

      {/* ─── BOTTOM SYSTEM TAG ─── */}
      <div className="absolute bottom-6 flex items-center space-x-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-[10px] font-mono tracking-widest text-gray-600 uppercase">
          MediCare Connect Secure Link
        </span>
      </div>
    </div>
  );
}
