"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  ShieldCheck,
  Edit3,
  X,
  Camera,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify"; // অথবা আপনার প্রজেক্টের কাস্টম টোস্ট

// 💡 আপনার সার্ভার অ্যাকশন বা এপিআই ফাংশনটি এখানে ইম্পোর্ট করুন
// import { updatePatientProfile } from "@/services/server/api";

function ProfileClientView({ initialData, user }) {
  const router = useRouter();
  const [profileData, setProfileData] = useState(initialData);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ── 🌟 MODAL FORM STATES ──
  const [name, setName] = useState(profileData?.name || "");
  const [phone, setPhone] = useState(profileData?.phone || "");
  const [gender, setGender] = useState(profileData?.gender || "male");
  const [image, setImage] = useState(profileData?.image || "");
  const [age, setAge] = useState(profileData?.age || "");
  const [city, setCity] = useState(profileData?.city || "");

  // ── 🌟 SUBMIT HANDLER ──
  const handleSave = async (e) => {
    e.preventDefault();

    const updatedForm = {
      id: profileData?._id,
      name,
      phone,
      gender,
      image,
      age: Number(age),
      city,
    };

    startTransition(async () => {
      try {
        // 💡 ডাটাবেস আপডেট এপিআই কল করুন
        // const res = await updatePatientProfile(updatedForm);

        // টেস্টিং এর জন্য লোকাল স্টেট আপডেট ট্রিক
        setProfileData((prev) => ({ ...prev, ...updatedForm }));

        toast.success("Profile updated successfully!");
        setIsModalOpen(false);
        router.refresh();
      } catch (error) {
        console.error("Update Error:", error);
        toast.error("Failed to update profile. Try again.");
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* হেডার সেকশন */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          My Profile
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage your personal information, contact details, and account
          settings.
        </p>
      </div>

      {/* ── 🌟 MAIN PROFILE CARD (FADE-IN & SLIDE-UP) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-[#161D30] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* ব্যানার ডেকোরেশন */}
        <div className="h-32 bg-gradient-to-r from-sky-600/20 to-emerald-600/20 border-b border-gray-800/50 relative" />

        {/* প্রোফাইল মেইন বডি */}
        <div className="px-6 pb-6 relative">
          {/* অবতার এবং এডিট বাটন এলাইনমেন্ট */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 mb-6 gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
              {profileData?.image ? (
                <img
                  src={profileData.image}
                  alt={profileData.name}
                  className="size-28 rounded-2xl border-4 border-[#161D30] bg-[#0E121F] object-cover shadow-xl"
                />
              ) : (
                <div className="size-28 rounded-2xl border-4 border-[#161D30] bg-[#0E121F] flex items-center justify-center text-gray-500 shadow-xl">
                  <User className="size-12" />
                </div>
              )}
              <div className="mb-2">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
                  {profileData?.name}
                </h2>
                <p className="text-xs text-sky-400 font-medium capitalize mt-0.5 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20 w-fit mx-auto sm:mx-0">
                  {profileData?.role || "Patient"}
                </p>
              </div>
            </div>

            {/* ওপেন মোডাল বাটন */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs rounded-xl transition-all shadow-lg shadow-sky-500/10 active:scale-[0.98] shrink-0"
            >
              <Edit3 className="size-3.5" />
              Edit Profile
            </button>
          </div>

          {/* ইনফরমেশন গ্রিড */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {/* ১. এডিটেবল ইনফো (Editable Fields Summary) */}
            <div className="space-y-4 p-4 rounded-xl bg-[#0E121F]/50 border border-gray-800/60">
              <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                Personal Information
              </h3>

              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Phone className="size-4 text-sky-400" />
                <div>
                  <span className="text-[10px] block text-gray-500 font-medium">
                    Phone Number
                  </span>
                  <span className="font-medium">
                    {profileData?.phone || "Not Provided"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-300">
                <User className="size-4 text-purple-400" />
                <div>
                  <span className="text-[10px] block text-gray-500 font-medium">
                    Gender
                  </span>
                  <span className="font-medium capitalize">
                    {profileData?.gender || "Not Provided"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Calendar className="size-4 text-amber-400" />
                <div>
                  <span className="text-[10px] block text-gray-500 font-medium">
                    Age
                  </span>
                  <span className="font-medium">
                    {profileData?.age
                      ? `${profileData.age} Years`
                      : "Not Provided"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-300">
                <MapPin className="size-4 text-emerald-400" />
                <div>
                  <span className="text-[10px] block text-gray-500 font-medium">
                    City / Location
                  </span>
                  <span className="font-medium">
                    {profileData?.city || "Not Provided"}
                  </span>
                </div>
              </div>
            </div>

            {/* ২. রিড-অনলি ইনফো (Read-Only Fields) */}
            <div className="space-y-4 p-4 rounded-xl bg-[#0E121F]/50 border border-gray-800/60">
              <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">
                Account Settings (Read-Only)
              </h3>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="size-4 text-gray-500" />
                <div>
                  <span className="text-[10px] block text-gray-500 font-medium">
                    Email Address
                  </span>
                  <span className="font-medium text-gray-300">
                    {profileData?.email}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <ShieldCheck className="size-4 text-emerald-500" />
                <div>
                  <span className="text-[10px] block text-gray-500 font-medium">
                    Account Status
                  </span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    Verified Account
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 🌟 DYNAMIC CUSTOM EDIT PROFILE MODAL ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* ব্যাকড্রপ ব্লার লেয়ার */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            />

            {/* মোডাল কার্ড কন্টেন্ট */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-[#161D30] border border-gray-800 rounded-2xl shadow-2xl z-10 p-6 text-left max-h-[90vh] overflow-y-auto"
            >
              {/* ক্রস বাটন */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <X className="size-4" />
              </button>

              <h3 className="text-xl font-bold text-white mb-1">
                Edit Profile Details
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Update your personalized health profile inputs below.
              </p>

              <form onSubmit={handleSave} className="space-y-4">
                {/* ইমেজ ইউআরএল ইনপুট */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                    Profile Photo URL
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://example.com/photo.png"
                      className="w-full bg-[#0E121F] border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-200 focus:outline-hidden focus:border-sky-500 transition-colors"
                    />
                    <Camera className="size-4 text-gray-500 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                {/* নাম ও ফোন নাম্বার গ্রিড */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0E121F] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-hidden focus:border-sky-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#0E121F] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-hidden focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>

                {/* বয়স ও জেন্ডার গ্রিড */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                      Age
                    </label>
                    <input
                      type="number"
                      required
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g. 24"
                      className="w-full bg-[#0E121F] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-hidden focus:border-sky-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-[#0E121F] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-hidden focus:border-sky-500 transition-colors capitalize"
                    >
                      <option value="male" className="bg-[#161D30]">
                        Male
                      </option>
                      <option value="female" className="bg-[#161D30]">
                        Female
                      </option>
                      <option value="other" className="bg-[#161D30]">
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                {/* সিটি/লোকেশন ইনপুট */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                    City / Location
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Dhaka"
                    className="w-full bg-[#0E121F] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-hidden focus:border-sky-500 transition-colors"
                  />
                </div>

                {/* সেভ চেঞ্জেস বাটন */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full font-semibold text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 py-3 rounded-xl transition-all shadow-lg shadow-sky-500/10 active:scale-[0.99] disabled:opacity-50"
                  >
                    {isPending ? "Saving changes..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfileClientView;
