"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Star, Edit3, Trash2, MessageSquare, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ReviewListClient({ initialReviews = [] }) {
  const router = useRouter();
  const [reviews, setReviews] = useState(initialReviews);
  const [isPending, startTransition] = useTransition();

  // ১. ডিলিট রিভিউ ফাংশন (CRUD)
  const handleDelete = async (reviewId) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this review?",
    );
    if (!confirmDelete) return;

    // UI থেকে সাথে সাথে রিমুভ করার জন্য অপটিমিস্টিক আপডেট
    setReviews((prev) => prev.filter((r) => r._id !== reviewId));

    startTransition(async () => {
      try {
        // 💡 এখানে আপনার ব্যাকএন্ড ডিলিট API কল করবেন:
        // await deleteReviewById(reviewId);
        alert("Review deleted successfully!");
        router.refresh();
      } catch (error) {
        alert("Failed to delete review. Reverting changes.");
        setReviews(initialReviews); // ফেইল হলে আগের ডাটা ব্যাক করবে
      }
    });
  };

  // ২. এডিট রিভিউ ফাংশন (CRUD - Placeholder)
  const handleEdit = (review) => {
    alert(
      `Edit mode triggered for review ID: ${review._id}\nFeel free to connect your edit modal logic here!`,
    );
  };

  // খালি অবস্থার রেেন্ডারিং (Empty State)
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-[#161D30] border border-gray-800 rounded-2xl p-6">
        <div className="p-4 bg-sky-500/10 text-[#0EA5E9] border border-sky-500/20 rounded-full mb-4 animate-pulse">
          <MessageSquare className="size-8" />
        </div>
        <h3 className="text-lg font-semibold text-gray-200">
          No reviews found
        </h3>
        <p className="text-sm text-gray-400 mt-1 max-w-xs">
          {`You haven't submitted any feedback for doctors yet.`}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <AnimatePresence>
        {reviews.map((review, index) => (
          <motion.div
            key={review._id}
            // 🌟 Fade-in and Slide-up Entrance Animation (200ms - 400ms)
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
            className="bg-[#161D30] border border-gray-800/70 rounded-2xl p-5 flex flex-col justify-between hover:border-gray-700/60 transition-all shadow-xl group relative overflow-hidden"
          >
            {/* ডক্টর ইনফো ও রেটিং সেকশন */}
            <div>
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="text-base font-bold text-gray-200 group-hover:text-white transition-colors">
                    {review.doctorName}
                  </h3>
                  <p className="text-xs text-[#0EA5E9] font-medium mt-0.5">
                    {review.specialization}
                  </p>
                </div>

                {/* স্টার রেটিং */}
                <div className="flex items-center gap-1 bg-[#0E121F] px-2.5 py-1 rounded-lg border border-gray-800/80">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-gray-200">
                    {review.rating}.0
                  </span>
                </div>
              </div>

              {/* রিভিউ টেক্সট (Testimonial) */}
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed italic mt-4 relative z-10 pl-3 border-l-2 border-[#10B981]/40">
                {review.testimonial}
              </p>
            </div>

            {/* ফুটার: পেশেন্ট প্রোফাইল এবং CRUD অ্যাকশন বাটন */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800/50">
              {/* পেশেন্ট ইনফো */}
              <div className="flex items-center gap-2.5">
                {review.patientPhoto ? (
                  <img
                    src={review.patientPhoto}
                    alt={review.patientName}
                    className="size-7 rounded-full border border-gray-700 object-cover"
                  />
                ) : (
                  <div className="size-7 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                    <User className="size-3.5" />
                  </div>
                )}
                <span className="text-xs text-gray-400 font-medium">
                  {review.patientName}
                </span>
              </div>

              {/* অ্যাকশন বাটন সমূহ (Edit & Delete) */}
              <div className="flex items-center gap-2">
                {/* এডিট বাটন */}
                <button
                  onClick={() => handleEdit(review)}
                  className="p-2 bg-[#0E121F] hover:bg-sky-500/10 text-gray-400 hover:text-[#0EA5E9] border border-gray-800/80 rounded-xl transition-all"
                  title="Edit Review"
                >
                  <Edit3 className="size-3.5" />
                </button>

                {/* ডিলিট বাটন */}
                <button
                  onClick={() => handleDelete(review._id)}
                  className="p-2 bg-[#0E121F] hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-gray-800/80 rounded-xl transition-all"
                  title="Delete Review"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ReviewListClient;
