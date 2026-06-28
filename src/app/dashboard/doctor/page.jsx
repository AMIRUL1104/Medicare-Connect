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
  User,
} from "lucide-react";
import {
  getAppointmentsByDoctorId,
  getDoctorById,
  getDoctorStats,
  getReviewsByDoctorId,
} from "@/services/server/api";
import { getUserSession } from "@/services/core/session";
import ReviewCard from "@/components/Home/reviews/ReviewCard";
import Image from "next/image";

export const metadata = {
  title: "Doctor Dashboard | MediCare Connect",
  description:
    "Comprehensive overview of your daily medical practices, appointment analytics, and patient inflow.",
};

async function DoctorDashboardOverview() {
  const user = await getUserSession();

  const profile = await getDoctorById(user.id, "userId");
  const reviews = await getReviewsByDoctorId(user.id);
  const allAppointments = await getAppointmentsByDoctorId(user.id);

  // ─── 📅 TODAY'S APPOINTMENTS FILTER ───
  // আজকের ডেট (YYYY-MM-DD ফরম্যাটে) বের করার লজিক
  const todayStr = new Date().toISOString().split("T");
  const todayAppointments = allAppointments.filter(
    (appointment) => appointment.date === todayStr,
  );

  // ─── ⭐ LATEST 5 REVIEWS ───
  // স্লাইস করে লেটেস্ট ৫টি রিভিউ নেওয়া হলো
  const latestReviews = reviews.slice(0, 5);

  const allStats = await getDoctorStats(user.id);
  const {
    totalAppointments,
    pendingRequests,
    totalEarnings,
    patientCount,
    averageRating,
  } = allStats.stats;

  return (
    <div className="min-h-screen bg-[#0E121F] text-gray-100 p-4 md:p-6 space-y-8">
      {/* ─── 🌟 SECTION 1: PROFILE & VERIFICATION STATUS HEADER ─── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-[#161D30] border border-gray-800/80 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-sky-500/10 text-[#0EA5E9] border border-sky-500/20 rounded-xl hidden sm:block">
            <Activity className="size-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Welcome Back, {profile?.doctorName}
              </h1>

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
              {profile?.specialization} • Here is your practice performance
              summary for today.
            </p>
          </div>
        </div>

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
              Total Appointments
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

      {/* ─── 📅 SECTION 3: TODAY'S APPOINTMENTS TABLE ─── */}
      <div className="bg-[#161D30] border border-gray-800/80 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarCheck2 className="size-5 text-sky-400" />
            <h2 className="text-lg font-bold text-white">{`Today's Appointments`}</h2>
          </div>
          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
            {todayAppointments.length} Total
          </span>
        </div>

        <div className="overflow-x-auto">
          {todayAppointments.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800/60 bg-[#0E121F]/40 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-6">Patient Name</th>
                  <th className="py-4 px-6">Time Slot</th>
                  <th className="py-4 px-6">Fee</th>
                  <th className="py-4 px-6">Payment</th>
                  <th className="py-4 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40 text-sm">
                {todayAppointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="hover:bg-[#0E121F]/20 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-white flex items-center gap-2">
                      <div className="p-1.5 bg-gray-800 rounded-lg text-gray-400">
                        <User className="size-4" />
                      </div>
                      {appointment.patientName}
                    </td>
                    <td className="py-4 px-6 text-gray-300">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="size-3.5 text-gray-500" />
                        {appointment.slot}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-300">
                      ৳{appointment.consultationFee}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase ${
                          appointment.paymentStatus === "paid"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {appointment.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          appointment.appointmentStatus === "completed"
                            ? "bg-emerald-500/10 text-[#10B981]"
                            : appointment.appointmentStatus === "cancelled"
                              ? "bg-red-500/10 text-red-400"
                              : "bg-sky-500/10 text-sky-400"
                        }`}
                      >
                        {appointment.appointmentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-500 text-sm">
              No appointments scheduled for today.
            </div>
          )}
        </div>
      </div>

      {/* ─── ⭐ SECTION 4: LATEST 5 REVIEWS ─── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Star className="size-5 text-amber-400 fill-amber-400/10" />
          <h2 className="text-lg font-bold text-white">
            Patient Reviews (Latest 5)
          </h2>
        </div>

        {latestReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestReviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#161D30] border border-gray-800/80 p-5 rounded-2xl shadow-lg flex flex-col justify-between space-y-4 hover:border-gray-700/80 transition-colors"
              >
                {/* পেশেন্ট ইনফো এবং রেটিং */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {review.patientPhoto ? (
                      <Image
                        width={10}
                        height={10}
                        src={review.patientPhoto}
                        alt={review.patientName}
                        className="size-10 rounded-full object-cover border border-gray-700"
                      />
                    ) : (
                      <div className="size-10 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-semibold text-sm">
                        {review.patientName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-semibold text-white tracking-wide">
                        {review.patientName}
                      </h4>
                      {/* ডাইনামিক স্টার রেটিং */}
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`size-3.5 ${
                              index < review.rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* পেশেন্টের মন্তব্য */}
                  <p className="text-sm text-gray-300 italic leading-relaxed">
                    {review.testimonial}
                  </p>
                </div>

                {/* ডেট বা টাইমস্ট্যাম্প (নিচের দিকে হালকা করে দেখানোর জন্য) */}
                <div className="pt-2 border-t border-gray-800/60 flex items-center justify-between text-xs text-gray-500">
                  <span>{review.specialization}</span>
                  <span>
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#161D30] border border-gray-800/80 p-8 rounded-2xl text-center text-gray-500 text-sm">
            No reviews received yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorDashboardOverview;
