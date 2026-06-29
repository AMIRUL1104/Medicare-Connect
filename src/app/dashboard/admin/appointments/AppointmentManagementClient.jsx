"use client";

import React, { useState, useMemo } from "react";
import { Calendar, Clock, DollarSign, User } from "lucide-react";

export default function AppointmentManagementClient({
  initialAppointments = [],
}) {
  const [appointments] = useState(initialAppointments);
  const [activeFilter, setActiveFilter] = useState("all");

  // ── ১. স্ট্যাটাস অনুসারে ক্যালকুলেশন এবং নতুন Stats (Earnings) যোগ ──
  const stats = useMemo(() => {
    const counts = {
      pending: 0,
      approved: 0,
      completed: 0,
      cancelled: 0,
      total: appointments.length,
      totalEarnings: 0,
    };
    appointments.forEach((app) => {
      if (counts[app.appointmentStatus] !== undefined) {
        counts[app.appointmentStatus]++;
      }
      // শুধুমাত্র নিশ্চিত পেমেন্ট থেকে আর্নিং হিসাব করা হলো
      if (app.paymentStatus === "confirmed") {
        counts.totalEarnings += Number(app.consultationFee || 0);
      }
    });
    return counts;
  }, [appointments]);

  // ── ২. ফিল্টারিং এবং লেটেস্ট ডেট ও টাইম স্লট অনুসারে সর্টিং লজিক ──
  const processedAppointments = useMemo(() => {
    // প্রথমে ফিল্টার করা হচ্ছে
    let result = [...appointments];
    if (activeFilter !== "all") {
      result = result.filter((app) => app.appointmentStatus === activeFilter);
    }

    // লেটেস্ট ডেট এবং স্লট অনুযায়ী ডিসেন্ডিং (Newest First) সর্ট
    return result.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.slot?.split("-") || ""}`);
      const dateB = new Date(`${b.date} ${b.slot?.split("-") || ""}`);
      return dateB - dateA;
    });
  }, [appointments, activeFilter]);

  // ডার্ক মোডের জন্য স্ট্যাটাস ব্যাজ স্টাইল
  const statusStyles = {
    pending: "bg-[#2C2415] text-[#FBBF24] border-[#FBBF24]/20",
    approved: "bg-[#1E293B] text-[#38BDF8] border-[#38BDF8]/20",
    completed: "bg-[#1A333A] text-[#2DD4BF] border-[#2DD4BF]/20",
    cancelled: "bg-[#3B1E1E] text-[#F87171] border-[#F87171]/20",
  };

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* ─── STATS CARDS SECTION (ছোট ডিভাইসেও ২ কলামে থাকবে) ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-[#111827] p-3 sm:p-4 rounded-xl border border-gray-800 shadow-lg">
          <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Total
          </p>
          <p className="text-xl sm:text-2xl font-bold text-white mt-1">
            {stats.total}
          </p>
        </div>
        <div className="bg-[#111827] p-3 sm:p-4 rounded-xl border border-gray-800 border-l-4 border-l-amber-500 shadow-lg">
          <p className="text-[10px] sm:text-xs font-semibold text-amber-500/80 uppercase tracking-wider">
            Pending
          </p>
          <p className="text-xl sm:text-2xl font-bold text-amber-400 mt-1">
            {stats.pending}
          </p>
        </div>
        <div className="bg-[#111827] p-3 sm:p-4 rounded-xl border border-gray-800 border-l-4 border-l-[#38BDF8] shadow-lg">
          <p className="text-[10px] sm:text-xs font-semibold text-[#38BDF8]/80 uppercase tracking-wider">
            Approved
          </p>
          <p className="text-xl sm:text-2xl font-bold text-[#38BDF8] mt-1">
            {stats.approved}
          </p>
        </div>
        <div className="bg-[#111827] p-3 sm:p-4 rounded-xl border border-gray-800 border-l-4 border-l-emerald-500 shadow-lg">
          <p className="text-[10px] sm:text-xs font-semibold text-emerald-500/80 uppercase tracking-wider">
            Completed
          </p>
          <p className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">
            {stats.completed}
          </p>
        </div>
        <div className="bg-[#111827] p-3 sm:p-4 rounded-xl border border-gray-800 border-l-4 border-l-red-500 shadow-lg">
          <p className="text-[10px] sm:text-xs font-semibold text-red-500/80 uppercase tracking-wider">
            Cancelled
          </p>
          <p className="text-xl sm:text-2xl font-bold text-red-400 mt-1">
            {stats.cancelled}
          </p>
        </div>
        {/* নতুন যোগ করা STATS: Total Earnings */}
        <div className="bg-[#111827] p-3 sm:p-4 rounded-xl border border-gray-800 border-l-4 border-l-purple-500 shadow-lg col-span-2 lg:col-span-1">
          <p className="text-[10px] sm:text-xs font-semibold text-purple-400 uppercase tracking-wider">
            Earnings
          </p>
          <p className="text-xl sm:text-2xl font-bold text-purple-400 mt-1">
            ৳{stats.totalEarnings}
          </p>
        </div>
      </div>

      {/* ─── FILTER TABS (৩২০ পিক্সেল স্ক্রিনে সুন্দরভাবে র‍্যাপ হবে) ─── */}
      <div className="flex flex-wrap gap-1.5 border-b border-gray-800 pb-1">
        {["all", "pending", "approved", "completed", "cancelled"].map(
          (filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-2 text-[11px] sm:text-xs font-semibold rounded-t-lg transition-all border-b-2 capitalize tracking-wide ${
                activeFilter === filter
                  ? "border-[#38BDF8] text-[#38BDF8] bg-[#38BDF8]/10"
                  : "border-transparent text-gray-400 hover:text-white hover:bg-[#1F2937]/50"
              }`}
            >
              {filter} ({filter === "all" ? stats.total : stats[filter]})
            </button>
          ),
        )}
      </div>

      {/* ─── ডাটা ডিসপ্লে এরিয়া ─── */}
      {processedAppointments.length === 0 ? (
        <div className="bg-[#111827] rounded-xl border border-gray-800 p-12 text-center text-gray-500 font-medium">
          No appointments found matching this status.
        </div>
      ) : (
        <>
          {/* ১. ছোট ডিভাইসের জন্য কার্ড ভিউ (md ব্রেকপয়েন্টের নিচে দেখাবে) */}
          <div className="block md:hidden space-y-4">
            {processedAppointments.map((app) => (
              <div
                key={app._id}
                className="bg-[#111827] p-4 rounded-xl border border-gray-800 shadow-md space-y-3"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-bold text-gray-50 text-sm sm:text-base">
                      {app.patientName}
                    </h3>
                    <p className="text-xs text-gray-500">{app.patientEmail}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${statusStyles[app.appointmentStatus]}`}
                  >
                    <span className="capitalize">{app.appointmentStatus}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-800 text-xs">
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase">
                      Doctor
                    </span>
                    <span className="text-gray-200 font-medium flex items-center gap-1 mt-0.5">
                      <User size={12} className="text-gray-400" />{" "}
                      {app.doctorName}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase">
                      Fee & Payment
                    </span>
                    <span className="text-gray-50 font-bold block mt-0.5">
                      ৳{app.consultationFee}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase flex items-center gap-1 ${app.paymentStatus === "confirmed" ? "text-emerald-400" : "text-amber-400"}`}
                    >
                      {app.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-800 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-300">
                    <Calendar size={14} className="text-gray-500" />
                    <span>{app.date}</span>
                    <span className="text-[10px] font-semibold text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Clock size={10} /> {app.slot}
                    </span>
                  </div>
                  {app.symptoms && (
                    <div
                      className="text-gray-400 italic bg-[#1F2937]/30 p-2 rounded text-[11px] truncate"
                      title={app.symptoms}
                    >
                      &ldquo;{app.symptoms}&rdquo;
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ২. বড় ডিভাইসের জন্য মূল টেবিল ভিউ (md ব্রেকপয়েন্ট থেকে দৃশ্যমান) */}
          <div className="hidden md:block bg-[#111827] rounded-xl border border-gray-800 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-800 text-left text-sm">
                <thead className="bg-[#1F2937] text-xs uppercase font-medium text-gray-400 tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Patient Info</th>
                    <th className="px-6 py-4">Doctor Name</th>
                    <th className="px-6 py-4">Schedule</th>
                    <th className="px-6 py-4">Symptoms</th>
                    <th className="px-6 py-4">Fee & Payment</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-gray-300">
                  {processedAppointments.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-[#1F2937]/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold text-gray-50">
                          {app.patientName}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {app.patientEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-200">
                        {app.doctorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-100 font-medium flex items-center gap-1.5">
                          <Calendar size={16} className="text-gray-500" />{" "}
                          {app.date}
                        </div>
                        <div className="text-[11px] font-semibold text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-2 py-0.5 rounded inline-block mt-1.5">
                          {app.slot}
                        </div>
                      </td>
                      <td
                        className="px-6 py-4 max-w-xs truncate text-gray-400 italic"
                        title={app.symptoms}
                      >
                        {app.symptoms}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-gray-50 text-base">
                          ৳{app.consultationFee}
                        </div>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5 ${app.paymentStatus === "confirmed" ? "text-emerald-400" : "text-amber-400"}`}
                        >
                          <span
                            className={`w-1 h-1 rounded-full ${app.paymentStatus === "confirmed" ? "bg-emerald-400" : "bg-amber-400"}`}
                          ></span>
                          {app.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold border ${statusStyles[app.appointmentStatus]}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
                          <span className="capitalize">
                            {app.appointmentStatus}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
