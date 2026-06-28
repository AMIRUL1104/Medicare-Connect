import React from "react";

export default function DashboardLoading() {
  return (
    <div className="p-6 bg-[#0B1120] min-h-screen space-y-8 animate-pulse select-none">
      {/* ─── ১. হেডার স্কেলেটন ─── */}
      <div className="border-b border-gray-800 pb-5 space-y-2.5">
        <div className="h-8 w-56 bg-gray-800 rounded-lg" />
        <div className="h-4 w-96 bg-gray-800/60 rounded-md" />
      </div>

      {/* ─── ২. স্ট্যাটস কার্ডস স্কেলেটন (৪টা গ্রিড) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-[#111827] p-5 rounded-xl border border-gray-800/80 h-24 flex flex-col justify-between"
          >
            <div className="h-3 w-16 bg-gray-800 rounded" />
            <div className="h-6 w-24 bg-gray-800 rounded-md" />
          </div>
        ))}
      </div>

      {/* ─── ৩. চার্ট / অ্যানালিটিক্স স্কেলেটন ─── */}
      <div className="bg-[#111827] border border-gray-800/80 rounded-xl p-6 h-[350px] flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-800 rounded" />
          <div className="h-3 w-48 bg-gray-800/50 rounded" />
        </div>
        {/* ডামি গ্রাফ লাইন বা বার ফিলিং ফিল্ড */}
        <div className="w-full h-56 bg-gray-800/30 rounded-lg flex items-end p-4 space-x-4">
          <div className="w-full h-1/3 bg-gray-800/40 rounded-t" />
          <div className="w-full h-2/3 bg-gray-800/40 rounded-t" />
          <div className="w-full h-1/2 bg-gray-800/40 rounded-t" />
          <div className="w-full h-5/6 bg-gray-800/40 rounded-t" />
        </div>
      </div>

      {/* ─── ৪. টেবিল স্কেলেটন ─── */}
      <div className="bg-[#111827] rounded-xl border border-gray-800/80 overflow-hidden hidden md:block">
        {/* টেবিল হেডার */}
        <div className="bg-[#1F2937]/50 px-6 py-4 grid grid-cols-5 gap-4">
          {[1].map((i) => (
            <div key={i} className="h-3 bg-gray-800 rounded w-2/3" />
          ))}
        </div>
        {/* টেবিল বডি (৩টি ডামি রো) */}
        <div className="p-6 space-y-5 divide-y divide-gray-800/50">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="grid grid-cols-5 gap-4 pt-4 first:pt-0 items-center"
            >
              <div className="space-y-1.5">
                <div className="h-3.5 bg-gray-800 rounded w-3/4" />
                <div className="h-2.5 bg-gray-800/50 rounded w-1/2" />
              </div>
              <div className="h-3.5 bg-gray-800 rounded w-1/2" />
              <div className="h-3.5 bg-gray-800 rounded w-2/3" />
              <div className="h-3.5 bg-gray-800 rounded w-1/3" />
              <div className="h-6 bg-gray-800/60 rounded-md w-16 justify-self-end" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
