"use client";

import React, { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, ShieldCheck, Plus, Trash2, Save } from "lucide-react";
import { toast } from "react-toastify"; // অথবা আপনার প্রজেক্টের টোস্ট লাইব্রেরি
import { useRouter } from "next/navigation";

// আপনার নিজস্ব সার্ভার অ্যাকশন বা ডিরেক্ট এপিআই কল করার ফাংশন
// ধরি, এটি আপনার সার্ভার অ্যাকশন যা ব্যাকএন্ডের `/api/doctors/schedule`-কে কল করে
import { updateDoctorScheduleAction } from "@/services/server/action";

const DAYS_OF_WEEK = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export default function ScheduleClient({ doctorData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // ডাটাবেজের ডাটা অনুসারে স্টেট ইনিশিয়ালাইজেশন
  const [availableDays, setAvailableDays] = useState(
    doctorData?.availableDays || [],
  );
  const [slotDuration, setSlotDuration] = useState(
    doctorData?.slotDuration || 30,
  );
  const [workingHours, setWorkingHours] = useState(
    doctorData?.workingHours || [{ start: "10:00", end: "13:00" }],
  );

  // ১. হ্যান্ডেল: Days Checkbox Toggle
  const handleDayToggle = (day) => {
    setAvailableDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  // ২. হ্যান্ডেল: Working Hours Row পরিবর্তন
  const handleTimeChange = (index, field, value) => {
    const updated = [...workingHours];
    updated[index][field] = value;
    setWorkingHours(updated);
  };

  // ৩. হ্যান্ডেল: নতুন Time Block যোগ করা
  const addTimeBlock = () => {
    setWorkingHours([...workingHours, { start: "09:00", end: "12:00" }]);
  };

  // ৪. হ্যান্ডেল: Time Block মুছে ফেলা
  const removeTimeBlock = (index) => {
    if (workingHours.length === 1) {
      toast.error("At least one working hour block is required.");
      return;
    }
    setWorkingHours(workingHours.filter((_, i) => i !== index));
  };

  // ৫. সাবমিট: ডাটাবেজে সেভ করা
  const handleSaveSchedule = () => {
    if (availableDays.length === 0) {
      toast.error("Please select at least one available day.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await updateDoctorScheduleAction({
          userId: doctorData.userId,
          availableDays,
          workingHours,
          slotDuration,
        });

        if (res.modifiedCount === 1) {
          toast.success("Schedule structure updated successfully!");
          router.refresh();
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to update schedule.");
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="border-b border-gray-800 pb-5 flex max-sm:flex-col sm:justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Manage Schedule Structure
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Configure your weekly timeline and slot generation metrics.
          </p>
        </div>
        <button
          onClick={handleSaveSchedule}
          disabled={isPending}
          className="flex items-center gap-2 bg-[#0EA5E9] hover:bg-[#0284c7] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />{" "}
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Days Selection */}
        <div className="md:col-span-1 bg-[#161D30] rounded-2xl p-5 border border-gray-800/60 space-y-4">
          <h2 className="text-md font-semibold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0EA5E9]" /> Available Days
          </h2>
          <p className="text-xs text-gray-400">
            Select the repetitive days you render services.
          </p>

          <div className="space-y-2.5 pt-2">
            {DAYS_OF_WEEK.map((day) => {
              const isChecked = availableDays.includes(day);
              return (
                <label
                  key={day}
                  className={`flex items-center justify-between p-3 rounded-xl border text-sm cursor-pointer transition-all ${
                    isChecked
                      ? "bg-[#0EA5E9]/10 border-[#0EA5E9] text-white"
                      : "bg-[#0E121F] border-gray-800 text-gray-400 hover:border-gray-700"
                  }`}
                >
                  <span>{day}</span>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleDayToggle(day)}
                    className="w-4 h-4 rounded accent-[#0EA5E9] bg-transparent cursor-pointer"
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* Right Side: Working Hours & Slot Configuration */}
        <div className="md:col-span-2 space-y-6">
          {/* Slot Duration */}
          <div className="bg-[#161D30] rounded-2xl p-5 border border-gray-800/60 space-y-3">
            <h2 className="text-md font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" /> Slot
              Configuration
            </h2>
            <label className="block text-xs text-gray-400 uppercase">
              Per Patient Consultation Duration
            </label>
            <select
              value={slotDuration}
              onChange={(e) => setSlotDuration(Number(e.target.value))}
              className="w-full max-w-xs bg-[#0E121F] border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#0EA5E9]"
            >
              <option value={15}>15 Minutes</option>
              <option value={20}>20 Minutes</option>
              <option value={30}>30 Minutes</option>
              <option value={45}>45 Minutes</option>
              <option value={60}>60 Minutes</option>
            </select>
          </div>

          {/* Working Hours Blocks */}
          <div className="bg-[#161D30] rounded-2xl p-5 border border-gray-800/60 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-md font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" /> Working Hours
                (Shift Timings)
              </h2>
              <button
                type="button"
                onClick={addTimeBlock}
                className="flex items-center gap-1 text-xs text-[#0EA5E9] hover:underline bg-transparent border-none cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Shift
              </button>
            </div>
            <p className="text-xs text-gray-400">
              Define your daily active hours. System will divide these slots
              automatically.
            </p>

            <div className="space-y-3 pt-2">
              {workingHours.map((block, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-[#0E121F] p-3 rounded-xl border border-gray-800"
                >
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={block.start}
                        onChange={(e) =>
                          handleTimeChange(index, "start", e.target.value)
                        }
                        className="w-full bg-[#161D30] border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={block.end}
                        onChange={(e) =>
                          handleTimeChange(index, "end", e.target.value)
                        }
                        className="w-full bg-[#161D30] border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTimeBlock(index)}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-4"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
