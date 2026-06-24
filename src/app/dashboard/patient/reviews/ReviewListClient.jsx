"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, Edit3, Trash2, MessageSquare, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { addNewReview, updateReview } from "@/services/server/action";
import { toast } from "react-toastify";

// 💡 আপনার সার্ভার অ্যাকশন বা এপিআই ফাংশনগুলো এখানে ইম্পোর্ট করুন
// import { addNewReview, updateReview } from "@/services/server/api";

function ReviewListClient({ initialReviews = [], user }) {
  const router = useRouter();
  const [reviews, setReviews] = useState(initialReviews);
  const [isPending, startTransition] = useTransition();

  // ── 🌟 MODAL STATES ──
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit'
  const [selectedReview, setSelectedReview] = useState(null);

  // ── 🌟 FORM STATES ──
  const [rating, setRating] = useState(5);
  const [testimonial, setTestimonial] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [editReviewId, setEditReviewId] = useState(null);

  // 'Add New Review' বাটনের গ্লোবাল অ্যাক্সেস নিশ্চিত করতে useEffect ব্যবহার করা হয়েছে
  useEffect(() => {
    const handleOpenAddModal = () => {
      setModalMode("add");
      setSelectedReview(null);
      setRating(5);
      setTestimonial("");
      setDoctorName("");
      setSpecialization("");
      setIsModalOpen(true);
    };

    // উইন্ডো অবজেক্টে ফাংশনটি পুশ করা হচ্ছে যাতে বাইরের বাটন এটিকে কল করতে পারে
    window.openAddReviewModal = handleOpenAddModal;

    return () => {
      delete window.openAddReviewModal;
    };
  }, []);

  // ── 🌟 CRUD HANDLERS ──

  // ১. Edit mode ওপেন করা
  const handleEditClick = (review) => {
    setModalMode("edit");
    setEditReviewId(review._id);
    setSelectedReview(review);
    setRating(review.rating);
    setTestimonial(review.testimonial);
    setDoctorName(review.doctorName);
    setSpecialization(review.specialization);
    setIsModalOpen(true);
  };

  // ২. Form Submit handler (Add এবং Update উভয়ই হ্যান্ডেল করবে)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id: editReviewId,
      rating,
      testimonial,
      doctorName,
      specialization,
      patientId: user?.id || "",
      patientName: user?.name || "Anonymous Patient",
      // 🛠️ ফিক্স: খালি স্ট্রিং ("") এর বদলে null পাস করুন
      patientPhoto: user?.photo || null,
      doctorId: modalMode === "edit" ? selectedReview?.doctorId : "",

      ...(modalMode === "edit" && { _id: selectedReview?._id }),
    };

    startTransition(async () => {
      try {
        if (modalMode === "add") {
          // 💡 database এ নতুন ডাটা পোস্ট করা
          const res = await addNewReview(formData);

          if (res?.success || res?.insertedId) {
            // 🛠️ ফিক্স ১: নতুন ডাটা লোকাল স্টেটে পুশ করা (ইনস্ট্যান্ট রিফ্রেশ ইফেক্ট)
            const newReviewObj = {
              ...formData,
              _id: res.insertedId || Date.now().toString(), // ব্যাকএন্ড আইডি না থাকলে সেফটি ফলব্যাক
            };
            setReviews((prev) => [newReviewObj, ...prev]);

            toast.success("Review added successfully!");
            setIsModalOpen(false);
            router.refresh(); // সার্ভার ডাটা সিঙ্ক
          } else {
            toast.error(res?.error || "Failed to add review.");
          }
        } else {
          // 💡 database এ ডাটা আপডেট করা
          const res = await updateReview(formData);
          console.log(res);

          if (
            res?.success ||
            res?.result?.modifiedCount > 0 ||
            res?.modifiedCount > 0
          ) {
            // 🛠️ ফিক্স ২: লোকাল স্টেট ম্যাপ করে এডিটেড ডাটা পুশ করা (স্ক্রিন সাথে সাথে আপডেট হবে)
            setReviews((prev) =>
              prev.map((item) =>
                item._id === (editReviewId || selectedReview?._id)
                  ? { ...item, ...formData }
                  : item,
              ),
            );

            toast.success(res?.message || "Review updated successfully!");
            setIsModalOpen(false);
            router.refresh(); // সার্ভার ডাটা সিঙ্ক
          } else {
            toast.error(res?.error || "No changes were made.");
          }
        }
      } catch (error) {
        console.error("Submission Error: ", error);
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  // ৩. Delete Review
  const handleDelete = async (reviewId) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this review?",
    );
    if (!confirmDelete) return;

    setReviews((prev) => prev.filter((r) => r._id !== reviewId));

    startTransition(async () => {
      try {
        // await deleteReviewById(reviewId);
        alert("Review deleted successfully!");
        router.refresh();
      } catch (error) {
        alert("Failed to delete review.");
        setReviews(initialReviews);
      }
    });
  };

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-[#161D30] border border-gray-800 rounded-2xl p-6">
        <div className="p-4 bg-sky-500/10 text-[#0EA5E9] border border-sky-500/20 rounded-full mb-4">
          <MessageSquare className="size-8" />
        </div>
        <h3 className="text-lg font-semibold text-gray-200">
          No reviews found
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          {` You haven't submitted any feedback yet.`}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ── 🌟 REVIEWS GRID LIST ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence>
          {reviews.map((review, index) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-[#161D30] border border-gray-800/70 rounded-2xl p-5 flex flex-col justify-between hover:border-gray-700/60 transition-all shadow-xl group relative overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-200 group-hover:text-white">
                      {review.doctorName}
                    </h3>
                    <p className="text-xs text-[#0EA5E9] font-medium mt-0.5">
                      {review.specialization}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-[#0E121F] px-2.5 py-1 rounded-lg border border-gray-800/80">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-gray-200">
                      {review.rating}.0
                    </span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed italic mt-4 pl-3 border-l-2 border-[#10B981]/40">
                  {review.testimonial}
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800/50">
                <div className="flex items-center gap-2.5">
                  {/* 🛠️ ফিক্স: শুধু তখনই <img> রেন্ডার হবে যদি photo এর মান থাকে এবং তা খালি স্ট্রিং না হয় */}
                  {review.patientPhoto && review.patientPhoto !== "" ? (
                    <Image
                      width={70}
                      height={70}
                      src={review.patientPhoto}
                      alt={review.patientName || "Patient"}
                      className="size-7 rounded-full border border-gray-700 object-cover"
                    />
                  ) : (
                    // ফটো না থাকলে এই ডিফল্ট ইউজার আইকনটি দেখাবে
                    <div className="size-7 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 border border-gray-700">
                      <User className="size-3.5" />
                    </div>
                  )}
                  <span className="text-xs text-gray-400 font-medium">
                    {review.patientName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditClick(review)}
                    className="p-2 bg-[#0E121F] hover:bg-sky-500/10 text-gray-400 hover:text-[#0EA5E9] border border-gray-800/80 rounded-xl transition-all"
                  >
                    <Edit3 className="size-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="p-2 bg-[#0E121F] hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-gray-800/80 rounded-xl transition-all"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── 🌟 DYNAMIC CUSTOM MODAL (ADD & EDIT) ── */}
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
              className="relative w-full max-w-112.5 bg-[#161D30] border border-gray-800 rounded-2xl shadow-2xl z-10 p-6 text-left"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <X className="size-4" />
              </button>

              <h3 className="text-xl font-bold text-white mb-4">
                {modalMode === "add"
                  ? "Write a New Review"
                  : "Edit Your Review"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* ডক্টরের নাম ইনপুট */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                    {` Doctor's Name`}
                  </label>
                  <input
                    type="text"
                    required
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="e.g. Dr. Chris Donovan"
                    className="w-full bg-[#0E121F] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-hidden focus:border-sky-500 transition-colors"
                  />
                </div>

                {/* স্পেশালাইজেশন ইনপুট */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                    Specialization
                  </label>
                  <input
                    type="text"
                    required
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    placeholder="e.g. Psychiatrist"
                    className="w-full bg-[#0E121F] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-hidden focus:border-sky-500 transition-colors"
                  />
                </div>

                {/* স্টার রেটিং সিলেক্টর */}
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

                {/* টেস্টমোনিয়াল ইনপুট */}
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

                {/* সাবমিট বোতাম */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full font-semibold text-white bg-linear-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 py-3 rounded-xl transition-all shadow-lg shadow-sky-500/10 active:scale-[0.99] disabled:opacity-50"
                >
                  {isPending
                    ? "Saving changes..."
                    : modalMode === "add"
                      ? "Submit Review"
                      : "Update Review"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ReviewListClient;
