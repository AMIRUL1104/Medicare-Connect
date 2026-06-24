"use client";

import React, { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  CalendarSync,
  XCircle,
  FileText,
  User,
  Calendar,
  Clock,
  X,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { updateAppointmentStatus } from "@/services/server/action";

function AppointmentActionButtons({ appointment }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // 💡 ২টি আলাদা মোডালের জন্য ২টি স্টেট
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  // ১. Cancel Appointment ব্যাকএন্ড ট্রিগার
  const confirmCancelAppointment = async () => {
    setIsCancelOpen(false); // প্রথমে মোডাল বন্ধ হবে

    startTransition(async () => {
      try {
        // 💡 আপনার ব্যাকএন্ড ফাংশন এখানে কানেক্ট করুন:
        // await updateAppointmentStatus({ id: appointment._id, status: "cancelled" });

        const updateStatus = await updateAppointmentStatus({
          id: appointment._id,
          status: "cancelled",
        });

        if (updateStatus.modifiedCount === 1) {
          router.refresh();
          toast.success("Appointment successfully cancelled!");
        }
      } catch (error) {
        alert("Failed to cancel appointment. Try again.");
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        {/* বাটন ১: View Details */}
        <button
          onClick={() => setIsDetailOpen(true)}
          className="p-2 bg-[#161D30] hover:bg-blue-500/10 text-gray-400 hover:text-blue-400 border border-gray-800 rounded-lg transition-colors"
          title="View Details"
        >
          <Eye className="size-4" />
        </button>

        {appointment.status !== "cancelled" &&
          appointment.status !== "completed" && (
            <>
              {/* বাটন ২: Reschedule Link Button */}
              <Link
                href={`/doctors/${appointment.doctorId || "all"}`}
                className="p-2 bg-[#161D30] hover:bg-amber-500/10 text-gray-400 hover:text-amber-400 border border-gray-800 rounded-lg transition-colors flex items-center justify-center"
                title="Reschedule Session"
              >
                <CalendarSync className="size-4" />
              </Link>

              {/* বাটন ৩: Cancel Appointment (কাস্টম কনফার্ম মোডাল ওপেন করবে) */}
              <button
                onClick={() => setIsCancelOpen(true)}
                disabled={isPending}
                className={`p-2 bg-[#161D30] hover:bg-red-500/10 border border-gray-800 rounded-lg transition-colors ${
                  isPending
                    ? "opacity-40 cursor-not-allowed"
                    : "text-gray-400 hover:text-red-400"
                }`}
                title="Cancel Appointment"
              >
                <XCircle className="size-4" />
              </button>
            </>
          )}
      </div>

      {/* ── 🌟 ১. কাস্টম ডিটেইলস মোডাল ── */}
      <AnimatePresence>
        {isDetailOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-105 bg-[#111625] border border-gray-800 rounded-2xl shadow-2xl z-10 p-6 text-left"
            >
              <button
                onClick={() => setIsDetailOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <X className="size-4" />
              </button>

              <div className="flex flex-col items-center text-center pb-4 border-b border-gray-800/60">
                <div className="p-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl mb-3">
                  <FileText className="size-5" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Appointment Ticket
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  ID: {appointment._id || "N/A"}
                </p>
              </div>

              <div className="space-y-4 py-4">
                <div className="flex gap-3 items-start border-b border-gray-800/60 pb-3">
                  <User className="size-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">
                      Doctor
                    </h4>
                    <p className="text-sm font-bold text-gray-200 mt-0.5">
                      {appointment.doctorName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {appointment.specialization || "General Physician"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-b border-gray-800/60 pb-3">
                  <div className="flex gap-2.5 items-center">
                    <Calendar className="size-4 text-amber-400 shrink-0" />
                    <div>
                      <h4 className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">
                        Date
                      </h4>
                      <p className="text-xs font-medium text-gray-300 mt-0.5">
                        {appointment.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <Clock className="size-4 text-emerald-400 shrink-0" />
                    <div>
                      <h4 className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">
                        Time Slot
                      </h4>
                      <p className="text-xs font-medium text-gray-300 mt-0.5">
                        {appointment.slot}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#161D30] rounded-xl p-3.5 border border-gray-800/60">
                  <h4 className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-1">
                    Patient Symptoms
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed italic">
                    {appointment.symptoms || "No symptoms specified."}
                  </p>
                </div>

                <div className="flex justify-between items-center bg-[#0A0E1A] px-4 py-2.5 rounded-xl border border-gray-800/80">
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase block">
                      Fee Paid
                    </span>
                    <span className="text-sm font-bold text-emerald-400">
                      ${appointment.consultationFee}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md capitalize bg-emerald-500/10 text-emerald-400">
                    {appointment.status}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsDetailOpen(false)}
                className="w-full font-semibold text-white bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 py-2.5 rounded-xl transition-all"
              >
                Close Receipt
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 🌟 ২. নতুন কাস্টম ক্যানসেল কনফার্মেশন মোডাল ── */}
      <AnimatePresence>
        {isCancelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* ব্যাকড্রপ লেয়ার */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCancelOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            />

            {/* মোডাল কার্ড */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-95 bg-[#111625] border border-gray-800 rounded-2xl shadow-2xl z-10 p-6 text-center"
            >
              {/* ওয়ার্নিং আইকন */}
              <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 mb-4">
                <AlertTriangle className="size-6" />
              </div>

              {/* টেক্সট মেসেজ */}
              <h3 className="text-lg font-bold text-white">
                Cancel Appointment?
              </h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Are you sure you want to cancel your appointment with{" "}
                <span className="text-gray-200 font-semibold">
                  {appointment.doctorName}
                </span>
                ? This action cannot be undone.
              </p>

              {/* অ্যাকশন বাটন গ্রুপ */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {/* নো/ফিরে যাও বাটন */}
                <button
                  onClick={() => setIsCancelOpen(false)}
                  className="w-full py-2.5 text-xs font-semibold text-gray-300 bg-[#161D30] hover:bg-[#1c243c] border border-gray-800 rounded-xl transition-colors"
                >
                  No, Keep it
                </button>

                {/* হ্যাঁ/ক্যানসেল করো বাটন */}
                <button
                  onClick={confirmCancelAppointment}
                  className="w-full py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 active:scale-[0.98] rounded-xl transition-all shadow-lg shadow-red-600/10"
                >
                  Yes, Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AppointmentActionButtons;
