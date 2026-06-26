"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, X, Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchDoctorsFromServer } from "@/services/server/api";

// নোট: আপনার প্রজেক্টের এপিআই পাথ অনুযায়ী searchDoctorsFromServer ইমপোর্ট করুন

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  isPending,
  user,
  initialData = null,
  mode = "add",
  predefinedDoctor = null, // ডক্টর ডিটেইলস পেজ থেকে আসলে এই ডাটা পাস হবে
}) {
  const [rating, setRating] = useState(5);
  const [testimonial, setTestimonial] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // সার্চ ড্রপডাউন স্টেট
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // মোডাল ওপেন বা ইডিটে ডাটা সিঙ্ক
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        setRating(initialData.rating);
        setTestimonial(initialData.testimonial);
        setSelectedDoctor({
          _id: initialData.doctorId,
          name: initialData.doctorName,
          specialization: initialData.specialization,
        });
        setSearchQuery(initialData.doctorName);
      } else if (predefinedDoctor) {
        setSelectedDoctor(predefinedDoctor);
        setSearchQuery(predefinedDoctor.name || predefinedDoctor.doctorName);
        setRating(5);
        setTestimonial("");
      } else {
        setRating(5);
        setTestimonial("");
        setSearchQuery("");
        setSelectedDoctor(null);
      }
    }
  }, [isOpen, mode, initialData, predefinedDoctor]);

  // ডক্টর সার্চ হ্যান্ডলার (Debounce লজিক বসালে আরও ভালো হয়)
  useEffect(() => {
    if (
      !searchQuery ||
      selectedDoctor?.name === searchQuery ||
      predefinedDoctor
    ) {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setIsSearching(true);
      setShowDropdown(true);
      try {
        // 💡 আপনার নিজস্ব এপিআই এর মাধ্যমে ব্যাকএন্ড থেকে ডক্টর লিস্ট আনুন
        // console.log("searchQuery", searchQuery);
        const res = await searchDoctorsFromServer(searchQuery);
        setSearchResults(res || []);
        // console.log("res", res);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, selectedDoctor, predefinedDoctor]);

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করার লজিক
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedDoctor) {
      alert("Please select a doctor from the list.");
      return;
    }

    const payload = {
      rating,
      testimonial,
      doctorId: selectedDoctor._id,
      doctorName: selectedDoctor.name || selectedDoctor.doctorName,
      specialization: selectedDoctor.specialization,
      patientId: user?.id || "",
      patientName: user?.name || "Anonymous Patient",
      patientPhoto: user?.image || null,
      ...(mode === "edit" && { id: initialData?._id }),
    };

    onSubmit(payload);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-[#161D30] border border-gray-800 rounded-2xl shadow-2xl z-10 p-6 text-left"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              <X className="size-4" />
            </button>

            <h3 className="text-xl font-bold text-white mb-4">
              {mode === "add" ? "Write a New Review" : "Edit Your Review"}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* ডক্টর সার্চ ফিল্ড */}
              <div className="relative" ref={dropdownRef}>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                  {` Doctor's Name`}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    disabled={predefinedDoctor !== null || mode === "edit"}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (selectedDoctor) setSelectedDoctor(null); // নতুন করে টাইপ করলে আগের সিলেকশন বাদ যাবে
                    }}
                    placeholder="Search doctor by name..."
                    className="w-full bg-[#0E121F] border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-200 focus:outline-hidden focus:border-sky-500 transition-colors disabled:opacity-60"
                  />
                  <Search className="absolute left-3.5 top-3 size-4 text-gray-500" />
                  {isSearching && (
                    <Loader2 className="absolute right-3 top-3 size-4 text-sky-500 animate-spin" />
                  )}
                </div>

                {/* ডক্টর সার্চ ড্রপডাউন */}
                {showDropdown && searchResults.length > 0 && (
                  <div className="absolute w-full mt-1 bg-[#0E121F] border border-gray-800 rounded-xl shadow-xl max-h-48 overflow-y-auto z-50">
                    {searchResults.map((doc) => (
                      <button
                        key={doc._id}
                        type="button"
                        onClick={() => {
                          setSelectedDoctor(doc);
                          setSearchQuery(doc.name);
                          setShowDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-[#161D30] text-sm border-b border-gray-800/50 last:border-b-0 flex flex-col"
                      >
                        <span className="font-medium text-gray-200">
                          {doc.name}
                        </span>
                        <span className="text-xs text-sky-400">
                          {doc.specialization}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* সিলেক্টেড ডক্টরের স্পেশালাইজেশন শো করা */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Specialization
                </label>
                <input
                  type="text"
                  readOnly
                  placeholder="Selected doctor's specialization"
                  value={selectedDoctor?.specialization || ""}
                  className="w-full bg-[#0E121F]/50 border border-gray-800/80 rounded-xl px-4 py-2.5 text-sm text-gray-400 focus:outline-hidden cursor-not-allowed"
                />
              </div>

              {/* রেটিং */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-2 bg-[#0E121F] w-fit p-2 rounded-xl border border-gray-800">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`size-5 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-600"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* ফিডব্যাক */}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                  Your Feedback
                </label>
                <textarea
                  required
                  rows={4}
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  placeholder="Share your experience with this doctor..."
                  className="w-full bg-[#0E121F] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-hidden focus:border-sky-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isPending || !selectedDoctor}
                className="w-full font-semibold text-white bg-linear-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 py-3 rounded-xl transition-all shadow-lg active:scale-[0.99] disabled:opacity-40"
              >
                {isPending
                  ? "Saving changes..."
                  : mode === "add"
                    ? "Submit Review"
                    : "Update Review"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
