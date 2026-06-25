"use client";

import React, { useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Check,
  X,
  History,
  User,
  FileText,
  Clock,
  Mail,
} from "lucide-react";
import { updateAppointmentStatus } from "@/services/server/action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AppointmentsClient({
  pendingAppointments,
  pastAppointments,
}) {
  const [pendingList, setPendingList] = useState(pendingAppointments);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  // Approve / Reject হ্যান্ডলার
  const handleStatusChange = async (appointmentId, newStatus) => {
    startTransition(async () => {
      try {
        const res = await updateAppointmentStatus({
          id: appointmentId,
          appointmentStatus: newStatus, // "approved" or "rejected"
        });
        if (res.modifiedCount === 1) {
          toast.success("Appointment Approved");

          setPendingList((prev) =>
            prev.filter((app) => app._id !== appointmentId),
          );
          router.refresh();
        }
      } catch (error) {
        console.error("Status update failed:", error);
        // প্রপার এরর হ্যান্ডলিং বা স্টেট রিভার্ট লজিক এখানে দিতে পারেন
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-10"
    >
      {/* Header */}
      <div className="border-b border-gray-800 pb-5">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Appointments
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Review and manage patient requests or check past consultation history.
        </p>
      </div>

      {/* Section 1: Pending Appointments Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-yellow-500 flex items-center gap-2">
          <Clock className="w-5 h-5" /> Pending Requests ({pendingList.length})
        </h2>

        {/* Desktop View */}
        <div className="bg-[#161D30] rounded-2xl border border-gray-800/60 overflow-hidden hidden md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase bg-[#121826]">
                <th className="p-4">Patient Details</th>
                <th className="p-4">Schedule</th>
                <th className="p-4">Symptoms</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-sm">
              {pendingList.map((app) => (
                <tr
                  key={app._id}
                  className="hover:bg-[#121826]/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="font-medium text-white">
                      {app.patientName}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3" /> {app.patientEmail}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white text-xs font-medium">
                      {app.date}
                    </div>
                    <div className="text-[11px] text-[#0EA5E9] mt-0.5">
                      {app.slot}
                    </div>
                  </td>
                  <td
                    className="p-4 text-gray-400 max-w-[220px] truncate"
                    title={app.symptoms}
                  >
                    {app.symptoms}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2 bg-[#0E121F] p-1 rounded-xl border border-gray-800 max-w-[140px] mx-auto">
                      <button
                        onClick={() => handleStatusChange(app._id, "approved")}
                        disabled={isPending}
                        className="flex-1 py-1.5 px-2 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition-colors flex justify-center"
                        title="Approve"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <div className="w-[1px] h-4 bg-gray-800" />
                      <button
                        onClick={() => handleStatusChange(app._id, "rejected")}
                        disabled={isPending}
                        className="flex-1 py-1.5 px-2 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors flex justify-center"
                        title="Reject"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pendingList.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-500 text-sm"
                  >
                    No pending appointment requests at the moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-3">
          {pendingList.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6 bg-[#161D30] rounded-2xl border border-gray-800/60">
              No pending requests.
            </p>
          ) : (
            pendingList.map((app) => (
              <div
                key={app._id}
                className="bg-[#161D30] p-4 rounded-2xl border border-gray-800/60 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-white text-sm">
                    {app.patientName}
                  </span>
                  <span className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full">
                    Pending
                  </span>
                </div>
                <div className="text-xs text-gray-400 space-y-0.5">
                  <p>
                    Date: {app.date} ({app.slot})
                  </p>
                  <p className="truncate">Symptoms: {app.symptoms}</p>
                </div>
                <div className="flex gap-2 pt-2 border-t border-gray-800/60">
                  <button
                    onClick={() => handleStatusChange(app._id, "approved")}
                    className="flex-1 py-2 bg-emerald-600/20 text-emerald-400 rounded-xl text-xs font-medium flex items-center justify-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(app._id, "rejected")}
                    className="flex-1 py-2 bg-rose-600/20 text-rose-400 rounded-xl text-xs font-medium flex items-center justify-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Section 2: Past / Overdue Appointments (Read Only) */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-400 flex items-center gap-2">
          <History className="w-5 h-5" /> History / Past Appointments
        </h2>

        <div className="bg-[#161D30]/60 rounded-2xl border border-gray-800/40 overflow-hidden">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-gray-800/60 text-xs font-semibold text-gray-500 uppercase bg-[#121826]/40">
                <th className="p-4">Patient</th>
                <th className="p-4">Date & Slot</th>
                <th className="p-4">Symptoms</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40 text-gray-400">
              {pastAppointments.map((app) => (
                <tr key={app._id} className="opacity-70">
                  <td className="p-4 font-medium text-gray-300">
                    {app.patientName}
                  </td>
                  <td className="p-4 text-xs">
                    <div>{app.date}</div>
                    <div className="text-gray-500 mt-0.5">{app.slot}</div>
                  </td>
                  <td
                    className="p-4 max-w-[250px] truncate"
                    title={app.symptoms}
                  >
                    {app.symptoms}
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-800 text-gray-500 border border-gray-700/40">
                      Overdue
                    </span>
                  </td>
                </tr>
              ))}
              {pastAppointments.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-gray-600">
                    No past records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
