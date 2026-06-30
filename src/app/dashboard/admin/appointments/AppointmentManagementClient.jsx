"use client";

import React, { useState, useMemo } from "react";
import { Calendar } from "lucide-react";

export default function AppointmentManagementClient({
  initialAppointments = [],
}) {
  const [appointments] = useState(initialAppointments);
  const [activeFilter, setActiveFilter] = useState("all");

  // ── ১. লেটেস্ট ডেট এবং টাইম স্লট অনুসারে ডেটা সর্টিং ──────────────────
  const sortedAppointments = useMemo(() => {
    return [...appointments].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateB - dateA !== 0) {
        return dateB - dateA;
      }
      return a.slot?.localeCompare(b.slot);
    });
  }, [appointments]);

  // ── ২. স্ট্যাটাস অনুসারে ক্যালকুলেশন (Stats Cards) ──────────────────
  const stats = useMemo(() => {
    const counts = {
      pending: 0,
      approved: 0,
      completed: 0,
      cancelled: 0,
      total: sortedAppointments.length,
    };
    sortedAppointments.forEach((app) => {
      if (counts[app.appointmentStatus] !== undefined) {
        counts[app.appointmentStatus]++;
      }
    });
    return counts;
  }, [sortedAppointments]);

  // ── ৩. ফ্রন্ট-এন্ড ফিল্টারিং লজিক ──────────────────────────────────
  const filteredAppointments = useMemo(() => {
    if (activeFilter === "all") return sortedAppointments;
    return sortedAppointments.filter(
      (app) => app.appointmentStatus === activeFilter,
    );
  }, [sortedAppointments, activeFilter]);

  const statusStyles = {
    pending: "bg-[#2C2415] text-[#FBBF24] border-[#FBBF24]/20",
    approved: "bg-[#1E293B] text-[#38BDF8] border-[#38BDF8]/20",
    completed: "bg-[#1A333A] text-[#2DD4BF] border-[#2DD4BF]/20",
    cancelled: "bg-[#3B1E1E] text-[#F87171] border-[#F87171]/20",
  };

  return (
    <div className="space-y-5 w-full max-w-full overflow-hidden">
      {/* ─── STATS CARDS SECTION (৩২০px-এ ২ কলাম এবং xl স্ক্রিনে ১ রো) ─── */}
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-2.5 sm:gap-4 w-full">
        <div className="bg-[#111827] p-3 rounded-lg border border-gray-800 shadow-lg min-w-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">
            Total
          </p>
          <p className="text-lg sm:text-2xl font-black text-white mt-0.5">
            {stats.total}
          </p>
        </div>
        <div className="bg-[#111827] p-3 rounded-lg border border-gray-800 border-l-4 border-l-amber-500 shadow-lg min-w-0">
          <p className="text-[10px] font-bold text-amber-500/80 uppercase tracking-wider truncate">
            Pending
          </p>
          <p className="text-lg sm:text-2xl font-black text-amber-400 mt-0.5">
            {stats.pending}
          </p>
        </div>
        <div className="bg-[#111827] p-3 rounded-lg border border-gray-800 border-l-4 border-l-[#38BDF8] shadow-lg min-w-0">
          <p className="text-[10px] font-bold text-[#38BDF8]/80 uppercase tracking-wider truncate">
            Approved
          </p>
          <p className="text-lg sm:text-2xl font-black text-[#38BDF8] mt-0.5">
            {stats.approved}
          </p>
        </div>
        <div className="bg-[#111827] p-3 rounded-lg border border-gray-800 border-l-4 border-l-emerald-500 shadow-lg min-w-0">
          <p className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider truncate">
            Completed
          </p>
          <p className="text-lg sm:text-2xl font-black text-emerald-400 mt-0.5">
            {stats.completed}
          </p>
        </div>
        <div className="bg-[#111827] p-3 rounded-lg border border-gray-800 border-l-4 border-l-red-500 shadow-lg col-span-2 xl:col-span-1 min-w-0">
          <p className="text-[10px] font-bold text-red-500/80 uppercase tracking-wider truncate">
            Cancelled
          </p>
          <p className="text-lg sm:text-2xl font-black text-red-400 mt-0.5">
            {stats.cancelled}
          </p>
        </div>
      </div>

      {/* ─── FILTER TABS (হরাইজন্টাল স্ক্রোলযোগ্য, স্ক্রিন ব্রেক প্রতিরোধ করবে) ─── */}
      <div className="w-full overflow-x-auto flex gap-1 border-b border-gray-800 pb-0.5 whitespace-nowrap scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
        {["all", "pending", "approved", "completed", "cancelled"].map(
          (filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-2 text-[11px] font-bold rounded-t-md transition-all border-b-2 capitalize flex-shrink-0 ${
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

      {/* ─── 📱 MOBILE CARD LAYOUT (৩২০px ডিভাইসের জন্য বিশেষ অপ্টিমাইজড) ─── */}
      <div className="grid grid-cols-1 gap-3 md:hidden w-full">
        {filteredAppointments.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-xs bg-[#111827] border border-gray-800 rounded-xl">
            No appointments found matching this status.
          </div>
        ) : (
          filteredAppointments.map((app) => (
            <div
              key={app._id}
              className="bg-[#111827] rounded-xl border border-gray-800 p-3 space-y-3 shadow-md w-full max-w-full overflow-hidden"
            >
              {/* পেশেন্ট ও ডাক্তার ইনফো */}
              <div className="flex justify-between items-start gap-1">
                <div className="min-w-0 flex-1">
                  <span className="block text-[9px] font-bold text-gray-500 uppercase tracking-tight">
                    Patient
                  </span>
                  <p className="font-bold text-gray-50 text-[13px] truncate">
                    {app.patientName}
                  </p>
                  <p className="text-[10px] text-gray-400 truncate mt-0.5">
                    {app.patientEmail}
                  </p>
                </div>
                <div className="text-right min-w-0 flex-1">
                  <span className="block text-[9px] font-bold text-gray-500 uppercase tracking-tight">
                    Doctor
                  </span>
                  <p className="font-bold text-[#38BDF8] text-[13px] truncate">
                    {app.doctorName}
                  </p>
                </div>
              </div>

              {/* শিডিউল এবং স্লট */}
              <div className="bg-[#1F2937]/40 p-2 rounded-lg border border-gray-800/80 flex items-center justify-between gap-1.5 w-full">
                <div className="flex items-center gap-1 text-gray-300 min-w-0 flex-1">
                  <Calendar className="size-3 text-gray-500 flex-shrink-0" />
                  <span className="text-[11px] truncate">{app.date}</span>
                </div>
                <div className="px-1.5 py-0.5 bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] rounded font-bold text-[9px] whitespace-nowrap flex-shrink-0 max-w-full overflow-hidden truncate">
                  {app.slot}
                </div>
              </div>

              {/* সিম্পটম */}
              {app.symptoms && (
                <div className="bg-[#1F2937]/10 p-2 rounded border border-gray-800/40 text-[11px] italic text-gray-400">
                  <span className="text-[9px] font-bold text-gray-500 uppercase not-italic block mb-0.5">
                    Symptoms:
                  </span>
                  <span className="line-clamp-2 block">{app.symptoms}</span>
                </div>
              )}

              {/* ফি এবং স্ট্যাটাস */}
              <div className="pt-2.5 border-t border-gray-800/60 flex items-center justify-between gap-2 w-full">
                <div className="flex-shrink-0">
                  <div className="text-[13px] font-black text-gray-50">
                    ৳{app.consultationFee}
                  </div>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider block mt-0.5 ${
                      app.paymentStatus === "confirmed"
                        ? "text-emerald-400"
                        : "text-amber-400"
                    }`}
                  >
                    {app.paymentStatus}
                  </span>
                </div>

                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border flex-shrink-0 ${statusStyles[app.appointmentStatus]}`}
                >
                  <span className="w-1 h-1 rounded-full bg-current mr-1"></span>
                  <span className="capitalize">{app.appointmentStatus}</span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ─── 🖥️ DESKTOP TABLE LAYOUT (md স্ক্রিন থেকে দেখাবে) ─── */}
      <div className="hidden md:block bg-[#111827] rounded-xl border border-gray-800 shadow-xl overflow-hidden w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800 text-left text-sm">
            <thead className="bg-[#1F2937] text-xs uppercase font-medium text-gray-400 tracking-wider">
              <tr>
                <th className="px-6 py-4.5">Patient Info</th>
                <th className="px-6 py-4.5">Doctor Name</th>
                <th className="px-6 py-4.5">Schedule</th>
                <th className="px-6 py-4.5">Symptoms</th>
                <th className="px-6 py-4.5">Fee & Payment</th>
                <th className="px-6 py-4.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-gray-300">
              {filteredAppointments.map((app) => (
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
                      <Calendar className="size-4 text-gray-500" /> {app.date}
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
                      className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5 ${
                        app.paymentStatus === "confirmed"
                          ? "text-emerald-400"
                          : "text-amber-400"
                      }`}
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
    </div>
  );
}
