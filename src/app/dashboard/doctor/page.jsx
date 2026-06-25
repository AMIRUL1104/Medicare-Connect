import React from "react";
import {
  CalendarCheck2,
  Clock3,
  DollarSign,
  Users2,
  Star,
  BadgeCheck,
  ShieldAlert,
  Eye,
  Activity,
} from "lucide-react";
import { getDoctorById, getDoctorStats } from "@/services/server/api";
import { getUserSession } from "@/services/core/session";

// 💡 আপাতত আপনার রিকোয়ারমেন্ট অনুযায়ী মক ডাটা ব্যবহার করা হয়েছে
const mockDoctorData = {
  profile: {
    name: "Dr. Chris Donovan",
    specialization: "Psychiatrist",
    isVerified: true, // true = Verified, false = Pending
    isAvailable: true,
  },
  stats: {
    totalAppointments: 148,
    pendingRequests: 12,
    totalEarnings: 8400,
    patientCount: 94,
    averageRating: 4.9,
  },
};

async function DoctorDashboardOverview() {
  const user = await getUserSession();

  const profile = await getDoctorById(user.id, "userId");
  console.log("profile", profile);
  console.log("user", user);

  const allStats = await getDoctorStats(user.id);
  const {
    totalAppointments,
    pendingRequests,
    totalEarnings,
    patientCount,
    averageRating,
  } = allStats.stats;
  console.log(allStats);

  return (
    <div className="min-h-screen bg-[#0E121F] text-gray-100 p-4 md:p-6 space-y-8">
      {/* ─── 🌟 SECTION 1: PROFILE & VERIFICATION STATUS HEADER ─── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-[#161D30] border border-gray-800/80 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-4">
          {/* ডেকোরেটিভ মেডিকেল পালস আইকন */}
          <div className="p-3.5 bg-sky-500/10 text-[#0EA5E9] border border-sky-500/20 rounded-xl hidden sm:block">
            <Activity className="size-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Welcome Back, {profile.doctorName}
              </h1>

              {/* ভেরিফিকেশন ব্যাজ লজিক */}
              {profile?.verificationStatus ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-[#10B981] border border-emerald-500/20">
                  <BadgeCheck className="size-3.5" />
                  {profile?.verificationStatus}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <ShieldAlert className="size-3.5" />
                  Pending
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {profile.specialization} • Here is your practice performance
              summary for today.
            </p>
          </div>
        </div>

        {/* কুইক স্ট্যাটাস ডিসপ্লে (সার্ভার কম্পোনেন্ট ভিউ) */}
        <div className="flex items-center gap-3 bg-[#0E121F] px-4 py-3 rounded-xl border border-gray-800/60 w-fit">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${profile?.isAvailable ? "bg-[#10B981]" : "bg-red-500"}`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${profile?.isAvailable ? "bg-[#10B981]" : "bg-red-500"}`}
            ></span>
          </span>
          <p className="text-xs font-semibold text-gray-300">
            Current Status:{" "}
            <span
              className={
                profile?.isAvailable ? "text-[#10B981]" : "text-red-400"
              }
            >
              {profile?.isAvailable ? "Available for Patients" : "Offline"}
            </span>
          </p>
        </div>
      </div>

      {/* ─── 🌟 SECTION 2: STATISTICS CARDS GRID ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* কার্ড ১: Total Appointments */}
        <div className="bg-[#161D30] border border-gray-800/60 rounded-xl p-5 shadow-xs flex flex-col justify-between group hover:border-gray-700/60 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Bookings
            </span>
            <div className="p-2 bg-sky-500/10 text-[#0EA5E9] rounded-lg border border-sky-500/10">
              <CalendarCheck2 className="size-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-100 group-hover:text-white">
              {totalAppointments}
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Lifetime sessions
            </p>
          </div>
        </div>

        {/* কার্ড ২: Pending Requests */}
        <div className="bg-[#161D30] border border-gray-800/60 rounded-xl p-5 shadow-xs flex flex-col justify-between group hover:border-gray-700/60 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Pending Req.
            </span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/10">
              <Clock3 className="size-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-amber-400">
              {pendingRequests}
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Requires attention
            </p>
          </div>
        </div>

        {/* カード ৩: Total Earnings */}
        <div className="bg-[#161D30] border border-gray-800/60 rounded-xl p-5 shadow-xs flex flex-col justify-between group hover:border-gray-700/60 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Earnings
            </span>
            <div className="p-2 bg-emerald-500/10 text-[#10B981] rounded-lg border border-emerald-500/10">
              <DollarSign className="size-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-[#10B981]">
              ${totalEarnings}
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Net revenue generated
            </p>
          </div>
        </div>

        {/* কার্ড ৪: Unique Patients */}
        <div className="bg-[#161D30] border border-gray-800/60 rounded-xl p-5 shadow-xs flex flex-col justify-between group hover:border-gray-700/60 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Patients
            </span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/10">
              <Users2 className="size-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-100 group-hover:text-white">
              {patientCount}
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Unique individuals
            </p>
          </div>
        </div>

        {/* কার্ড ৫: Average Rating */}
        <div className="bg-[#161D30] border border-gray-800/60 rounded-xl p-5 shadow-xs flex flex-col justify-between group hover:border-gray-700/60 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Avg. Rating
            </span>
            <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg border border-rose-500/10">
              <Star className="size-4 fill-rose-500/20" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-rose-400 flex items-center gap-1">
              {averageRating}{" "}
              <span className="text-xs text-gray-500 font-medium">/ 5.0</span>
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5">
              From patient reviews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboardOverview;
