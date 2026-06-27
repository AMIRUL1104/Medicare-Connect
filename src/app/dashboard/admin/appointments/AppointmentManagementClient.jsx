// src/components/Admin/AppointmentManagementClientTheme.jsx
"use client";

import React, { useState, useMemo } from "react";
import { Calendar } from "lucide-react";

export default function AppointmentManagementClient({
  initialAppointments = [],
}) {
  const [appointments] = useState(initialAppointments);
  const [activeFilter, setActiveFilter] = useState("all");

  // ── ১. স্ট্যাটাস অনুসারে ক্যালকুলেশন (Stats Cards) ──────────────────
  const stats = useMemo(() => {
    const counts = {
      pending: 0,
      approved: 0,
      completed: 0,
      cancelled: 0,
      total: appointments.length,
    };
    appointments.forEach((app) => {
      if (counts[app.appointmentStatus] !== undefined) {
        counts[app.appointmentStatus]++;
      }
    });
    return counts;
  }, [appointments]);

  // ── ২. ফ্রন্ট-এন্ড ফিল্টারিং লজিক ──────────────────────────────────
  const filteredAppointments = useMemo(() => {
    if (activeFilter === "all") return appointments;
    return appointments.filter((app) => app.appointmentStatus === activeFilter);
  }, [appointments, activeFilter]);

  // ডার্ক মোডের জন্য স্ট্যাটাস ব্যাজ স্টাইল (ছবি মেলাতে)
  const statusStyles = {
    pending: "bg-[#2C2415] text-[#FBBF24] border-[#FBBF24]/20",
    approved: "bg-[#1E293B] text-[#38BDF8] border-[#38BDF8]/20",
    completed: "bg-[#1A333A] text-[#2DD4BF] border-[#2DD4BF]/20",
    cancelled: "bg-[#3B1E1E] text-[#F87171] border-[#F87171]/20",
  };

  return (
    <div className="space-y-6">
      {/* ─── STATS CARDS SECTION ─── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-[#111827] p-4 rounded-xl border border-gray-800 shadow-lg">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Total
          </p>
          <p className="text-2xl font-bold text-white mt-1.5">{stats.total}</p>
        </div>
        <div className="bg-[#111827] p-4 rounded-xl border border-gray-800 border-l-4 border-l-amber-500 shadow-lg">
          <p className="text-xs font-semibold text-amber-500/80 uppercase tracking-wider">
            Pending
          </p>
          <p className="text-2xl font-bold text-amber-400 mt-1.5">
            {stats.pending}
          </p>
        </div>
        <div className="bg-[#111827] p-4 rounded-xl border border-gray-800 border-l-4 border-l-[#38BDF8] shadow-lg">
          <p className="text-xs font-semibold text-[#38BDF8]/80 uppercase tracking-wider">
            Approved
          </p>
          <p className="text-2xl font-bold text-[#38BDF8] mt-1.5">
            {stats.approved}
          </p>
        </div>
        <div className="bg-[#111827] p-4 rounded-xl border border-gray-800 border-l-4 border-l-emerald-500 shadow-lg">
          <p className="text-xs font-semibold text-emerald-500/80 uppercase tracking-wider">
            Completed
          </p>
          <p className="text-2xl font-bold text-emerald-400 mt-1.5">
            {stats.completed}
          </p>
        </div>
        <div className="bg-[#111827] p-4 rounded-xl border border-gray-800 border-l-4 border-l-red-500 shadow-lg">
          <p className="text-xs font-semibold text-red-500/80 uppercase tracking-wider">
            cancelled
          </p>
          <p className="text-2xl font-bold text-red-400 mt-1.5">
            {stats.cancelled}
          </p>
        </div>
      </div>

      {/* ─── FILTER TABS ─── */}
      <div className="flex flex-wrap gap-2 border-b border-gray-800 pb-0.5">
        {["all", "pending", "approved", "completed", "cancelled"].map(
          (filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 capitalize tracking-wide ${
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

      {/* ─── APPOINTMENTS TABLE ─── */}
      <div className="bg-[#111827] rounded-xl border border-gray-800 shadow-xl overflow-hidden">
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
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-16 text-center text-gray-500 font-medium"
                  >
                    No appointments found matching this status.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-[#1F2937]/50 transition-colors"
                  >
                    {/* পেশেন্ট ডাটা */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-50">
                        {app.patientName}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {app.patientEmail}
                      </div>
                    </td>

                    {/* ডক্টর নাম */}
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-200">
                      {app.doctorName}
                    </td>

                    {/* ডেট এবং টাইম স্লট */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-100 font-medium flex items-center gap-1.5">
                        <Calendar className="text-gray-500" /> {app.date}
                      </div>
                      <div className="text-[11px] font-semibold text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-2 py-0.5 rounded inline-block mt-1.5">
                        {app.slot}
                      </div>
                    </td>

                    {/* সিম্পটম */}
                    <td
                      className="px-6 py-4 max-w-xs truncate text-gray-400 italic"
                      title={app.symptoms}
                    >
                      {app.symptoms}
                    </td>

                    {/* ফি এবং পেমেন্ট স্ট্যাটাস */}
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

                    {/* অ্যাপয়েন্টমেন্ট স্ট্যাটাস ব্যাজ */}
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
