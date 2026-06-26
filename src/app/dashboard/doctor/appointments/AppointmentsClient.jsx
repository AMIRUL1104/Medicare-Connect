

"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateAppointmentStatus } from "@/services/server/action"; // আপনার তৈরি সার্ভার অ্যাকশন
import { toast } from "react-toastify";
import {
  Check,
  X,
  ClipboardCheck,
  Calendar,
  Clock,
  User,
  AlertCircle,
} from "lucide-react";

export default function AppointmentsClient({ initialAppointments }) {
  const router = useRouter();
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isPending, startTransition] = useTransition();

  // স্ট্যাটাস আপডেট হ্যান্ডলার
  const handleStatusChange = async (appointmentId, newStatus) => {
    startTransition(async () => {
      try {
        // ব্যাকএন্ড অ্যাকশনে আইডি এবং নতুন স্ট্যাটাস পাঠানো
        const res = await updateAppointmentStatus({
          id: appointmentId,
          appointmentStatus: newStatus, // যেমন: 'accepted', 'rejected', 'completed'
        });

        if (res?.modifiedCount === 1) {
          // লোকাল স্টেট আপডেট (appointmentStatus কী-তে সেট হবে)
          setAppointments((prev) =>
            prev.map((app) =>
              app._id === appointmentId
                ? { ...app, appointmentStatus: newStatus }
                : app,
            ),
          );

          toast.success(`Appointment marked as ${newStatus}!`);

          // 'completed' হলে প্রেসক্রিপশন রাউটে নিয়ে যাবে
          if (newStatus === "completed") {
            router.push(
              `/dashboard/doctor/prescription?appointmentId=${appointmentId}`,
            );
          } else {
            router.refresh();
          }
        } else {
          toast.error(res?.error || "Failed to update status.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  // স্ট্যাটাস কালার নির্ধারণের ফাংশন (আপনার ডাটাবেজের lowercase ভ্যালু অনুযায়ী)
  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 capitalize";
      case "rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20 capitalize";
      case "completed":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20 capitalize";
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/20 capitalize";
    }
  };

  return (
    <div className="bg-[#161D30] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
      {appointments.length === 0 ? (
        <div className="p-12 text-center space-y-3">
          <AlertCircle className="size-10 text-gray-500 mx-auto" />
          <p className="text-gray-400 font-medium">No appointments found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-[#0E121F]/50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Patient Info</th>
                <th className="px-6 py-4">Schedule</th>
                <th className="px-6 py-4">Symptoms</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-sm">
              {appointments.map((app) => (
                <tr
                  key={app._id}
                  className="hover:bg-[#0E121F]/20 transition-colors"
                >
                  {/* রোগীর তথ্য */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                        <User className="size-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-200">
                          {app.patientName}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          ID: {app.patientId}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* অ্যাপয়েন্টমেন্ট ডিটেইলস (date এবং slot) */}
                  <td className="px-6 py-4 space-y-1">
                    <div className="flex items-center gap-1.5 text-gray-300">
                      <Calendar className="size-3.5 text-gray-500" />
                      <span>{app.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock className="size-3.5 text-gray-500" />
                      <span>{app.slot}</span>
                    </div>
                  </td>

                  {/* রোগীর লক্ষণ (symptoms) */}
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-gray-300 line-clamp-2 bg-[#0E121F]/40 px-3 py-1.5 rounded-lg border border-gray-800/60 text-xs">
                      {app.symptoms || "No symptoms described."}
                    </p>
                  </td>

                  {/* পেমেন্ট স্ট্যাটাস (paymentStatus) */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize">
                      {app.paymentStatus || "Pending"}
                    </span>
                  </td>

                  {/* বর্তমান স্ট্যাটাস (appointmentStatus) */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(app.appointmentStatus)}`}
                    >
                      {app.appointmentStatus || "pending"}
                    </span>
                  </td>

                  {/* অ্যাকশন বাটন সমূহ */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* pending থাকলে Accept এবং Reject বাটন চালু থাকবে */}
                      {app.appointmentStatus === "pending" && (
                        <>
                          <button
                            disabled={isPending}
                            onClick={() =>
                              handleStatusChange(app._id, "accepted")
                            }
                            className="p-2 bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/20 hover:border-emerald-500 text-emerald-400 hover:text-white rounded-lg transition-all"
                            title="Accept Appointment"
                          >
                            <Check className="size-4" />
                          </button>
                          <button
                            disabled={isPending}
                            onClick={() =>
                              handleStatusChange(app._id, "rejected")
                            }
                            className="p-2 bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 hover:border-rose-500 text-rose-400 hover:text-white rounded-lg transition-all"
                            title="Reject Appointment"
                          >
                            <X className="size-4" />
                          </button>
                        </>
                      )}

                      {/* accepted থাকলে Mark Completed বাটন দেখাবে */}
                      {app.appointmentStatus === "accepted" && (
                        <button
                          disabled={isPending}
                          onClick={() =>
                            handleStatusChange(app._id, "completed")
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500 border border-purple-500/20 hover:border-purple-500 text-purple-400 hover:text-white text-xs font-medium rounded-lg transition-all shadow-sm"
                        >
                          <ClipboardCheck className="size-4" />
                          <span>Mark Completed</span>
                        </button>
                      )}

                      {/* completed অথবা rejected হলে কোনো অ্যাকশন থাকবে না */}
                      {(app.appointmentStatus === "completed" ||
                        app.appointmentStatus === "rejected") && (
                        <span className="text-xs text-gray-500 italic">
                          No actions needed
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
