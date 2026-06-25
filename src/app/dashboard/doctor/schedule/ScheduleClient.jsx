"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Trash2,
  Plus,
  User,
  FileText,
  CheckCircle,
} from "lucide-react";
import { updateAppointmentStatus } from "@/services/server/action";

export default function ScheduleClient({ initialAppointments, initialSlots }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [slots, setSlots] = useState(initialSlots);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSlot, setNewSlot] = useState({ day: "Saturday", time: "" });

  // Handle Add Slot
  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newSlot.time) return;

    const id = Date.now().toString();
    setSlots([...slots, { id, ...newSlot }]);
    setNewSlot({ day: "Saturday", time: "" });
    setIsModalOpen(false);
  };

  // Handle Delete Slot
  const handleDeleteSlot = (id) => {
    setSlots(slots.filter((slot) => slot.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Manage Schedule
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Set your availability and monitor confirmed appointments.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#0EA5E9] hover:bg-[#0284c7] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg shadow-sky-500/10 active:scale-95 w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" /> Add Available Slot
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Section A: Availability Slots */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#0EA5E9]" /> Active Slots
          </h2>

          <div className="bg-[#161D30] rounded-2xl p-4 border border-gray-800/60 space-y-3">
            {slots.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-6">
                No active slots found.
              </p>
            ) : (
              slots.map((slot) => (
                <div
                  key={slot.id}
                  className="flex justify-between items-center bg-[#0E121F] p-3 rounded-xl border border-gray-800/40 hover:border-gray-700/60 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{slot.day}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{slot.time}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteSlot(slot.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Section B: Booked Appointments Table/List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#10B981]" /> Confirmed Bookings
          </h2>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-[#161D30] rounded-2xl border border-gray-800/60 overflow-hidden">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-[#121826]">
                  <th className="p-4">Patient</th>
                  <th className="p-4">Schedule</th>
                  <th className="p-4">Symptoms</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-sm">
                {appointments.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-[#121826]/50 transition-colors"
                  >
                    <td className="p-4 font-medium text-white">
                      {app.patientName}
                    </td>
                    <td className="p-4">
                      <div className="text-white">{app.date}</div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {app.slot}
                      </div>
                    </td>
                    <td
                      className="p-4 text-gray-400 max-w-[200px] truncate"
                      title={app.symptoms}
                    >
                      {app.symptoms}
                    </td>
                    <td className="p-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#10B981]/10 text-[#10B981] border border--[#10B981]/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />{" "}
                        {app.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden space-y-3">
            {appointments.map((app) => (
              <div
                key={app._id}
                className="bg-[#161D30] p-4 rounded-2xl border border-gray-800/60 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#0EA5E9]" />
                    <span className="font-medium text-white text-sm">
                      {app.patientName}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#10B981]/10 text-[#10B981]">
                    Paid
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs border-t border-b border-gray-800 py-2">
                  <div className="text-gray-400">
                    Date:{" "}
                    <span className="text-white font-medium">{app.date}</span>
                  </div>
                  <div className="text-gray-400">
                    Time:{" "}
                    <span className="text-white font-medium">{app.slot}</span>
                  </div>
                </div>
                <div className="flex gap-2 items-start text-xs text-gray-400">
                  <FileText className="w-4 h-4 shrink-0 text-gray-500" />
                  <p className="line-clamp-2">{app.symptoms}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Slot Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#161D30] border border-gray-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
          >
            <div className="p-5 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">
                Add Available Slot
              </h3>
            </div>
            <form onSubmit={handleAddSlot} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase mb-1.5">
                  Select Day
                </label>
                <select
                  value={newSlot.day}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, day: e.target.value })
                  }
                  className="w-full bg-[#0E121F] border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#0EA5E9]"
                >
                  {[
                    "Saturday",
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ].map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase mb-1.5">
                  Time Slot
                </label>
                <input
                  type="text"
                  placeholder="e.g., 6:00 PM"
                  value={newSlot.time}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, time: e.target.value })
                  }
                  className="w-full bg-[#0E121F] border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#0EA5E9]"
                  required
                />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0EA5E9] hover:bg-[#0284c7] text-white rounded-xl text-sm font-medium transition-colors"
                >
                  Save Slot
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
