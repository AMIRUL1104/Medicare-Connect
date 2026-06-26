"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateDoctorProfile } from "@/services/server/action"; // আপনার তৈরি সার্ভার অ্যাকশন
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  GraduationCap,
  Briefcase,
  DollarSign,
  Building,
  BadgeCheck,
  Clock,
  X,
  Edit2,
} from "lucide-react";
import Image from "next/image";

export default function DoctorProfileClient({ initialData }) {
  const router = useRouter();
  const [doctor, setDoctor] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // মোডাল ফর্ম স্টেট
  const [formData, setFormData] = useState({
    qualifications: doctor.qualifications || "",
    experience: doctor.experience || 0,
    consultationFee: doctor.consultationFee || 0,
    specialization: doctor.specialization || "",
    hospitalName: doctor.hospitalName || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "experience" || name === "consultationFee"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        // ব্যাকএন্ডে ডাটা পাঠানোর জন্য পেলোড (userId সহ)
        const payload = {
          userId: doctor.userId,
          ...formData,
        };
        // console.log(payload);
        const res = await updateDoctorProfile(payload);
        // console.log(res);

        if (res.modifiedCount === 1) {
          setDoctor((prev) => ({ ...prev, ...formData }));
          toast.success("Profile updated successfully!");
          setIsModalOpen(false);
          router.refresh();
        } else {
          toast.error(res?.error || "Failed to update profile.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* প্রোফাইল হেডার কার্ড */}
        <div className="relative bg-[#161D30] border border-gray-800 rounded-2xl p-6 md:p-8 overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 p-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-sky-500/10"
            >
              <Edit2 className="size-4" /> Edit Profile
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            {/* ডক্টর ইমেজ */}
            <div className="relative size-24 md:size-28 rounded-2xl border-2 border-gray-800 overflow-hidden bg-[#0E121F] flex items-center justify-center">
              {doctor.profileImage ? (
                <Image
                  src={doctor.profileImage}
                  alt={doctor.doctorName}
                  fill
                  className="object-cover"
                />
              ) : (
                <User className="size-12 text-gray-500" />
              )}
            </div>

            {/* ডক্টর বেসিক ইনফো */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {doctor.doctorName}
                </h1>
                {doctor.verificationStatus === "verified" && (
                  <BadgeCheck className="size-6 text-emerald-500 fill-emerald-500/10" />
                )}
              </div>
              <p className="text-sky-400 font-medium text-sm md:text-base">
                {doctor.specialization}
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0E121F] text-xs font-semibold rounded-full border border-gray-800 text-gray-400">
                <span
                  className={`size-2 rounded-full ${doctor.verificationStatus === "verified" ? "bg-emerald-500" : "bg-amber-500"}`}
                />
                {doctor.verificationStatus === "verified"
                  ? "Verified Specialist"
                  : "Pending Verification"}
              </div>
            </div>
          </div>
        </div>

        {/* প্রোফাইল ডিটেইলস গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Qualifications */}
          <div className="bg-[#161D30] border border-gray-800/60 rounded-xl p-5 flex gap-4 items-start shadow-md">
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
              <GraduationCap className="size-5" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Qualifications
              </p>
              <p className="text-base font-semibold text-gray-200 mt-1">
                {doctor.qualifications}
              </p>
            </div>
          </div>

          {/* Hospital Name */}
          <div className="bg-[#161D30] border border-gray-800/60 rounded-xl p-5 flex gap-4 items-start shadow-md">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <Building className="size-5" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Current Hospital
              </p>
              <p className="text-base font-semibold text-gray-200 mt-1">
                {doctor.hospitalName}
              </p>
            </div>
          </div>

          {/* Experience */}
          <div className="bg-[#161D30] border border-gray-800/60 rounded-xl p-5 flex gap-4 items-start shadow-md">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
              <Briefcase className="size-5" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Experience
              </p>
              <p className="text-base font-semibold text-gray-200 mt-1">
                {doctor.experience} Years Practice
              </p>
            </div>
          </div>

          {/* Consultation Fee */}
          <div className="bg-[#161D30] border border-gray-800/60 rounded-xl p-5 flex gap-4 items-start shadow-md">
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl">
              <DollarSign className="size-5" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Consultation Fee
              </p>
              <p className="text-base font-semibold text-gray-200 mt-1">
                ৳ {doctor.consultationFee} BDT
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 🌟 DYNAMIC EDIT MODAL ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-[#161D30] border border-gray-800 rounded-2xl shadow-2xl z-10 p-6 text-left max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <X className="size-4" />
              </button>

              <h3 className="text-xl font-bold text-white mb-5">
                Update Profile Info
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Specialization */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    required
                    value={formData.specialization}
                    onChange={handleInputChange}
                    placeholder="e.g. Cardiology, Psychiatry"
                    className="w-full bg-[#0E121F] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-hidden focus:border-sky-500 transition-colors"
                  />
                </div>

                {/* Qualifications */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                    Qualifications
                  </label>
                  <input
                    type="text"
                    name="qualifications"
                    required
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    placeholder="e.g. MBBS, FCPS, MD"
                    className="w-full bg-[#0E121F] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-hidden focus:border-sky-500 transition-colors"
                  />
                </div>

                {/* Hospital Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                    Hospital Name
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    required
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    placeholder="e.g. Dhaka Medical College Hospital"
                    className="w-full bg-[#0E121F] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-hidden focus:border-sky-500 transition-colors"
                  />
                </div>

                {/* Experience & Fee row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      name="experience"
                      required
                      min="0"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder="e.g. 5"
                      className="w-full bg-[#0E121F] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-hidden focus:border-sky-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                      Consultation Fee (৳)
                    </label>
                    <input
                      type="number"
                      name="consultationFee"
                      required
                      min="0"
                      value={formData.consultationFee}
                      onChange={handleInputChange}
                      placeholder="e.g. 1000"
                      className="w-full bg-[#0E121F] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-hidden focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full font-semibold text-white bg-linear-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 py-3 rounded-xl transition-all shadow-lg shadow-sky-500/10 active:scale-[0.99] disabled:opacity-50 mt-2"
                >
                  {isPending ? "Saving changes..." : "Save Profile Changes"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
