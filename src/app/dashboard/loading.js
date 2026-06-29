import React from "react";

export default function DashboardLoading() {
  return (
    <div className="p-3 sm:p-4 md:p-6 bg-[#0B1120] min-h-screen space-y-6 md:space-y-8 animate-pulse select-none">
      {/* ─── ১. হেডার স্কেলেটন ─── */}
      <div className="border-b border-gray-800 pb-5 space-y-2.5">
        <div className="h-7 sm:h-8 w-44 sm:w-56 bg-gray-800 rounded-lg" />
        <div className="h-4 w-full max-w-[320px] sm:max-w-md bg-gray-800/60 rounded-md" />
      </div>

      {/* ─── ২. স্ট্যাটস কার্ডস স্কেলেটন (৪টা গ্রিড) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-[#111827] p-4 sm:p-5 rounded-xl border border-gray-800/80 h-22 sm:h-24 flex flex-col justify-between"
          >
            <div className="h-3 w-16 bg-gray-800 rounded" />
            <div className="h-5 sm:h-6 w-24 bg-gray-800 rounded-md" />
          </div>
        ))}
      </div>

      {/* ─── ৩. চার্ট / অ্যানালিটিক্স স্কেলেটন ─── */}
      <div className="bg-[#111827] border border-gray-800/80 rounded-xl p-4 sm:p-6 h-[300px] sm:h-[350px] flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-800 rounded" />
          <div className="h-3 w-full max-w-[200px] bg-gray-800/50 rounded" />
        </div>
        {/* ডামি গ্রাফ লাইন বা বার ফিলিং ফিল্ড */}
        <div className="w-full h-44 sm:h-56 bg-gray-800/30 rounded-lg flex items-end p-3 sm:p-4 space-x-2 sm:space-x-4">
          <div className="w-full h-1/3 bg-gray-800/40 rounded-t" />
          <div className="w-full h-2/3 bg-gray-800/40 rounded-t" />
          <div className="w-full h-1/2 bg-gray-800/40 rounded-t" />
          <div className="w-full h-5/6 bg-gray-800/40 rounded-t" />
          <div className="w-full h-1/4 bg-gray-800/40 rounded-t sm:block hidden" />
          <div className="w-full h-3/4 bg-gray-800/40 rounded-t sm:block hidden" />
        </div>
      </div>

      {/* ─── ৪. টেবিল স্কেলেটন (মোবাইল ও ডেক্সটপ ফ্রেন্ডলি) ─── */}
      <div className="bg-[#111827] rounded-xl border border-gray-800/80 overflow-hidden">
        {/* 💻 ডেক্সটপ ভিউ: গ্রিড হেডার (md স্ক্রিন থেকে দেখাবে) */}
        <div className="bg-[#1F2937]/50 px-6 py-4 hidden md:grid grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-3 bg-gray-800 rounded w-2/3" />
          ))}
        </div>

        {/* 📱 মোবাইল ও ডেক্সটপ কম্বাইন্ড বডি */}
        <div className="p-4 sm:p-6 space-y-5 divide-y divide-gray-800/50">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="pt-4 first:pt-0">
              {/* 💻 ডেক্সটপ লেআউট (md+) */}
              <div className="hidden md:grid grid-cols-5 gap-4 items-center">
                <div className="space-y-1.5">
                  <div className="h-3.5 bg-gray-800 rounded w-3/4" />
                  <div className="h-2.5 bg-gray-800/50 rounded w-1/2" />
                </div>
                <div className="h-3.5 bg-gray-800 rounded w-1/2" />
                <div className="h-3.5 bg-gray-800 rounded w-2/3" />
                <div className="h-3.5 bg-gray-800 rounded w-1/3" />
                <div className="h-6 bg-gray-800/60 rounded-md w-16 justify-self-end" />
              </div>

              {/* 📱 মোবাইল লিস্ট লেআউট (৩২০ পিক্সেল থেকে md এর নিচ পর্যন্ত) */}
              <div className="flex md:hidden items-center justify-between gap-4">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="h-3.5 bg-gray-800 rounded w-3/4" />
                  <div className="h-2.5 bg-gray-800/50 rounded w-1/2" />
                  <div className="h-2.5 bg-gray-800/40 rounded w-2/3 mt-1" />
                </div>
                <div className="h-6 bg-gray-800/60 rounded-md w-14 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
