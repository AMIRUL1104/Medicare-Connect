"use client";

import React, { useState } from "react";
import { updateDoctorProfile } from "@/services/server/action";
import { toast } from "react-toastify";
import {
  Clock,
  DollarSign,
  Award,
  CheckCircle,
  Star,
  User,
  Home,
  Search,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

export default function DoctorManagementTable({ initialDoctors = [] }) {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isMutating, setIsMutating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ফ্রন্টএন্ড সার্চ লজিক (নাম এবং হাসপাতাল দিয়ে সার্চ করা যাবে)
  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.doctorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospitalName?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
    "px-2.5 py-0.5 bg-[#1A333A] text-[#2DD4BF] rounded-full text-[11px] font-semibold border border-[#2DD4BF]/20 flex items-center gap-1";
  const pendingBadge =
    "px-2.5 py-0.5 bg-[#2C2415] text-[#FBBF24] rounded-full text-[11px] font-semibold border border-[#FBBF24]/20 flex items-center gap-1";

  return (
    <div className="space-y-4">
      {/* ─── 🔍 SEARCH BAR SECTION ─── */}
      <div className="relative max-w-md w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="size-4 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search by doctor or hospital name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-[#111827] border border-gray-800 rounded-xl text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#38BDF8]/40 transition-colors"
        />
      </div>

      {/* ─── 📱 MOBILE MINIMALIST CARD LAYOUT (md স্ক্রিনে হিডেন) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => {
            const isVerified = doctor.verificationStatus === "verified";
            return (
              <div
                key={doctor._id}
                className="bg-[#111827] rounded-xl border border-gray-800 p-3.5 space-y-3 shadow-md"
              >
                {/* প্রোফাইল এবং বেসিক ইনফো */}
                <div className="flex items-start gap-3 min-w-0">
                  <Image
                    width={36}
                    height={36}
                    src={doctor.profileImage || "https://placehold.co/100"}
                    alt={doctor.doctorName}
                    className="w-9 h-9 rounded-full object-cover border border-gray-700 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-100 text-xs truncate">
                      {doctor.doctorName}
                    </h3>
                    <p className="text-[10px] text-gray-500 truncate flex items-center gap-0.5">
                      <Home className="size-2.5" /> {doctor.hospitalName}
                    </p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 bg-[#38BDF8]/10 text-[#38BDF8] rounded text-[10px] font-medium border border-[#38BDF8]/10">
                      {doctor.specialization}
                    </span>
                  </div>
                </div>

                {/* এক্সপেরিয়েন্স ও ফি গ্রিড */}
                <div className="grid grid-cols-2 gap-2 bg-[#1F2937]/30 p-2 rounded-lg text-[11px] border border-gray-800/50">
                  <div className="text-gray-400">
                    <span className="block text-[9px] text-gray-500 uppercase">
                      Experience
                    </span>
                    <span className="font-medium text-gray-300">
                      {doctor.experience} Years
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[9px] text-gray-500 uppercase">
                      Fee
                    </span>
                    <span className="font-bold text-gray-100">
                      ৳{doctor.consultationFee}
                    </span>
                  </div>
                </div>

                {/* স্ট্যাটাস ও অ্যাকশন এরিয়া */}
                <div className="pt-2 border-t border-gray-800/60 flex items-center justify-between gap-2">
                  <span className={isVerified ? verifiedBadge : pendingBadge}>
                    {isVerified ? (
                      <CheckCircle className="size-3" />
                    ) : (
                      <Clock className="size-3" />
                    )}
                    <span>{isVerified ? "Verified" : "Pending"}</span>
                  </span>

                  <div className="flex gap-1.5">
                    <button
                      disabled={isMutating}
                      onClick={() =>
                        handleStatusToggle(
                          doctor.userId,
                          doctor.verificationStatus,
                        )
                      }
                      className={`px-2 py-1 rounded text-[10px] font-semibold transition-all border ${
                        isVerified
                          ? "text-red-400 border-red-500/20 hover:bg-red-500/10"
                          : "bg-[#38BDF8] text-[#0B1120] border-[#38BDF8]"
                      }`}
                    >
                      {isVerified ? "Revoke" : "Verify"}
                    </button>
                    <button
                      onClick={() => setSelectedDoctor(doctor)}
                      className="px-2 py-1 bg-[#1F2937] text-gray-300 border border-gray-700 rounded text-[10px] font-semibold"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full p-8 text-center text-gray-500 text-xs bg-[#111827] border border-gray-800 rounded-xl">
            No doctors found matching your criteria.
          </div>
        )}
      </div>

      {/* ─── 🖥️ DESKTOP TABLE LAYOUT (md স্ক্রিন থেকে ভিজিবল) ─── */}
      <div className="hidden md:block bg-[#111827] rounded-xl border border-gray-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          {filteredDoctors.length > 0 ? (
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
                {filteredDoctors.map((doctor) => {
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
                          src={
                            doctor.profileImage || "https://placehold.co/100"
                          }
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
                          {isVerified ? (
                            <CheckCircle className="size-3.5" />
                          ) : (
                            <Clock className="size-3.5" />
                          )}
                          <span className="capitalize">
                            {doctor.verificationStatus || "pending"}
                          </span>
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
          ) : (
            <div className="p-12 text-center text-gray-500 text-sm">
              No doctors found matching your criteria.
            </div>
          )}
        </div>
      </div>

      {/* ─── 🔔 DOCTOR DETAILS MODAL (RESPONSIVE) ─── */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#111827] rounded-2xl max-w-xl w-full border border-gray-800 p-5 md:p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white font-bold text-xl transition-colors"
            >
              &times;
            </button>

            {/* মোডাল হেডার */}
            <div className="flex items-center gap-4 border-b border-gray-800 pb-4 mb-4">
              <Image
                width={50}
                height={50}
                src={selectedDoctor.profileImage || "https://placehold.co/100"}
                alt={selectedDoctor.doctorName}
                className="w-14 h-14 rounded-full object-cover border border-gray-700"
              />
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-white tracking-tight truncate">
                  {selectedDoctor.doctorName}
                </h3>
                <p className="text-xs text-[#38BDF8] font-medium truncate">
                  {selectedDoctor.specialization}
                </p>
                <p className="text-[11px] text-gray-500 flex items-center gap-1 truncate mt-0.5">
                  <Home className="size-3" /> {selectedDoctor.hospitalName}
                </p>
              </div>
            </div>

            {/* মোডাল বডি */}
            <div className="space-y-4 text-xs text-gray-300">
              <div>
                <span className="font-semibold block text-gray-400 mb-1">
                  Qualifications:
                </span>
                <p className="bg-[#1F2937]/50 p-2.5 rounded-lg border border-gray-800 text-gray-200 italic text-[11px]">
                  {selectedDoctor.qualifications}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1F2937]/50 p-3 rounded-lg border border-gray-800 flex items-center gap-2">
                  <Award className="text-amber-400 size-4 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block text-[10px] text-gray-500">
                      Experience
                    </span>
                    <span className="text-gray-200">
                      {selectedDoctor.experience} Years
                    </span>
                  </div>
                </div>
                <div className="bg-[#1F2937]/50 p-3 rounded-lg border border-gray-800 flex items-center gap-2">
                  <DollarSign className="text-emerald-400 size-4 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block text-[10px] text-gray-500">
                      Consultation Fee
                    </span>
                    <span className="text-gray-200 font-bold">
                      ৳{selectedDoctor.consultationFee}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-semibold block text-gray-400 mb-1.5">
                  Available Days:
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedDoctor.availableDays?.map((day, idx) => (
                    <span
                      key={idx}
                      className="bg-[#1F2937] text-gray-300 px-2 py-0.5 rounded text-[10px] border border-gray-800"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-semibold block text-gray-400 mb-1">
                  Working Hours & Slots:
                </span>
                <p className="text-[10px] text-gray-500 mb-1.5">
                  Each slot duration: {selectedDoctor.slotDuration} mins
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDoctor.workingHours?.map((hour, idx) => (
                    <span
                      key={idx}
                      className="bg-[#1A333A] text-[#38BDF8] px-2.5 py-1 rounded text-[10px] font-semibold border border-[#38BDF8]/10"
                    >
                      {hour.start} - {hour.end}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-800 text-right">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="w-full sm:w-auto px-4 py-2 bg-[#1F2937] text-gray-300 hover:bg-[#1F2937]/70 border border-gray-700 rounded-lg text-xs font-semibold transition-all"
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
