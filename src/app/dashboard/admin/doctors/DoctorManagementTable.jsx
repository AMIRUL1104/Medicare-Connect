// src/components/Admin/DoctorManagementTableTheme.jsx
"use client";

import React, { useState } from "react";
import { updateDoctorProfile } from "@/services/server/action";
import { toast } from "react-toastify";
import {
  Clock,
  DollarSign,
  Award,
  CheckCircle,
  XCircle,
  Star,
  User,
  Home,
} from "lucide-react";
import Image from "next/image";

export default function DoctorManagementTable({ initialDoctors = [] }) {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isMutating, setIsMutating] = useState(false);

  async function handleStatusToggle(id, currentStatus) {
    const newStatus = currentStatus === "verified" ? "pending" : "verified";
    const previousDoctors = [...doctors];

    try {
      setIsMutating(true);
      const res = await updateDoctorProfile({
        userId: id,
        verificationStatus: newStatus,
      });
      if (res.modifiedCount === 1) {
        setDoctors((prev) =>
          prev.map((doc) =>
            doc.userId === id ? { ...doc, verificationStatus: newStatus } : doc,
          ),
        );
        toast.success(`Status updated to ${newStatus} successfully!`);
      }
    } catch (error) {
      toast.error("Failed to update status. Rolling back...", {
        theme: "dark",
      });
      setDoctors(previousDoctors);
    } finally {
      setIsMutating(false);
    }
  }

  const verifiedBadge =
    "px-3 py-1 bg-[#1A333A] text-[#2DD4BF] rounded-full text-xs font-semibold border border-[#2DD4BF]/20 flex items-center gap-1.5";
  const pendingBadge =
    "px-3 py-1 bg-[#2C2415] text-[#FBBF24] rounded-full text-xs font-semibold border border-[#FBBF24]/20 flex items-center gap-1.5";

  return (
    <div className="space-y-6">
      {/* ─── DOCTORS TABLE CONTAINER ─── */}
      <div className="bg-[#111827] rounded-xl border border-gray-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800 text-left text-sm">
            <thead className="bg-[#1F2937] text-xs uppercase font-medium text-gray-400 tracking-wider">
              <tr>
                <th className="px-6 py-4.5">Doctor Info</th>
                <th className="px-6 py-4.5">Specialization</th>
                <th className="px-6 py-4.5">Fee (BDT)</th>
                <th className="px-6 py-4.5">Experience</th>
                <th className="px-6 py-4.5">Verification</th>
                <th className="px-6 py-4.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-gray-300">
              {doctors.map((doctor) => {
                const isVerified = doctor.verificationStatus === "verified";
                return (
                  <tr
                    key={doctor._id}
                    className="hover:bg-[#1F2937]/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3.5">
                      <Image
                        width={40}
                        height={40}
                        src={doctor.profileImage || "https://placehold.co/100"}
                        alt={doctor.doctorName}
                        className="w-11 h-11 rounded-full object-cover border border-gray-700"
                      />
                      <div>
                        <div className="font-semibold text-gray-50">
                          {doctor.doctorName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {doctor.hospitalName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-[#38BDF8]/10 text-[#38BDF8] rounded text-xs font-medium border border-[#38BDF8]/20">
                        {doctor.specialization}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-lg text-gray-100">
                      ৳{doctor.consultationFee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {doctor.experience} Years
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={isVerified ? verifiedBadge : pendingBadge}
                      >
                        {isVerified ? <CheckCircle /> : <Clock />}
                        {isVerified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2.5">
                      <button
                        disabled={isMutating}
                        onClick={() =>
                          handleStatusToggle(
                            doctor.userId,
                            doctor.verificationStatus,
                          )
                        }
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all border ${
                          isVerified
                            ? "bg-transparent text-red-500 border-red-500/30 hover:bg-red-500/10"
                            : "bg-[#38BDF8] text-[#0B1120] border-[#38BDF8] hover:bg-[#38BDF8]/90"
                        }`}
                      >
                        {isVerified ? "Revoke / Reject" : "Verify Doctor"}
                      </button>
                      <button
                        onClick={() => setSelectedDoctor(doctor)}
                        className="px-3 py-1.5 bg-[#1F2937] text-gray-300 hover:bg-[#1F2937]/70 rounded-md text-xs font-semibold transition-all border border-gray-700"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── DOCTOR DETAILS MODAL (THEMED) ─── */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-5 z-50 animate-fade-in">
          <div className="bg-[#111827] rounded-2xl max-w-2xl w-full border border-gray-800 p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-5 right-5 text-gray-500 hover:text-white font-bold text-2xl transition-colors"
            >
              &times;
            </button>
            <div className="flex items-center gap-5 border-b border-gray-800 pb-5 mb-6">
              <Image
                width={40}
                height={40}
                src={selectedDoctor.profileImage}
                alt={selectedDoctor.doctorName}
                className="w-20 h-20 rounded-full object-cover border border-gray-700 p-1"
              />
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {selectedDoctor.doctorName}
                </h3>
                <p className="text-base text-[#38BDF8] font-medium">
                  {selectedDoctor.specialization}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1.5">
                  <Home /> {selectedDoctor.hospitalName}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
              <div className="md:col-span-2">
                <span className="font-semibold block text-gray-400 mb-2.5">
                  Qualifications:
                </span>
                <p className="bg-[#1F2937] p-3.5 rounded-lg border border-gray-700 text-gray-200 text-xs italic">
                  {selectedDoctor.qualifications}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1F2937] p-4 rounded-lg border border-gray-700 flex items-center gap-3">
                  <Award className="text-amber-400 text-xl" />
                  <div>
                    <span className="font-semibold block text-gray-400">
                      Experience:
                    </span>
                    {selectedDoctor.experience} Years
                  </div>
                </div>
                <div className="bg-[#1F2937] p-4 rounded-lg border border-gray-700 flex items-center gap-3">
                  <DollarSign className="text-emerald-400 text-xl" />
                  <div>
                    <span className="font-semibold block text-gray-400">
                      Fee:
                    </span>
                    <p className="font-bold text-gray-50 text-base">
                      ৳{selectedDoctor.consultationFee}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <span className="font-semibold block text-gray-400 mb-2">
                  Available Days:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedDoctor.availableDays.map((day, idx) => (
                    <span
                      key={idx}
                      className="bg-[#1F2937] text-gray-200 px-3 py-1 rounded text-xs border border-gray-700"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <span className="font-semibold block text-gray-400 mb-2.5">
                  Working Hours & Slots:
                </span>
                <p className="text-xs text-gray-500 mb-2">
                  Each slot: {selectedDoctor.slotDuration} mins
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor.workingHours.map((hour, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-[#1A333A] text-[#38BDF8] px-3.5 py-1.5 rounded-md text-xs font-semibold border border-[#38BDF8]/20"
                    >
                      {hour.start} - {hour.end}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 pt-5 border-t border-gray-800 text-right">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="px-6 py-2.5 bg-[#1F2937] text-gray-200 hover:bg-[#1F2937]/70 border border-gray-700 rounded-lg text-sm font-semibold transition-all"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
