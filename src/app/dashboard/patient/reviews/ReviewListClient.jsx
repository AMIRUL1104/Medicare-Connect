"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, Edit3, Trash2, MessageSquare, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  addNewReview,
  deleteReviewById,
  updateReview,
} from "@/services/server/action";
import { toast } from "react-toastify";
import ReviewModal from "@/components/ui/ReviewModal";

function ReviewListClient({ initialReviews = [], user }) {
  const router = useRouter();
  const [reviews, setReviews] = useState(initialReviews);
  const [isPending, startTransition] = useTransition();

  // ── 🌟 MODAL STATES ──
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit'
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const handleOpenAddModal = () => {
      setModalMode("add");
      setSelectedReview(null);
      setIsModalOpen(true);
    };
    window.openAddReviewModal = handleOpenAddModal;
    return () => {
      delete window.openAddReviewModal;
    };
  }, []);

  const handleEditClick = (review) => {
    setModalMode("edit");
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  // মোডাল থেকে ডাটা নিয়ে ফাইনাল সাবমিট
  const handleModalSubmit = async (formData) => {
    startTransition(async () => {
      try {
        if (modalMode === "add") {
          const res = await addNewReview(formData);
          if (res?.insertedId) {
            const newReviewObj = {
              ...formData,
              _id: res.insertedId || Date.now().toString(),
            };
            setReviews((prev) => [newReviewObj, ...prev]);
            toast.success("Review added successfully!");
            setIsModalOpen(false);
            router.refresh();
          } else {
            toast.error(res?.error || "Failed to add review.");
          }
        } else {
          const res = await updateReview(formData);
          if (
            res?.success ||
            res?.result?.modifiedCount > 0 ||
            res?.modifiedCount > 0
          ) {
            setReviews((prev) =>
              prev.map((item) =>
                item._id === selectedReview?._id
                  ? { ...item, ...formData }
                  : item,
              ),
            );
            toast.success("Review updated successfully!");
            setIsModalOpen(false);
            router.refresh();
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

  const handleDelete = async (reviewId) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this review?",
    );
    if (!confirmDelete) return;

    setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    startTransition(async () => {
      try {
        const res = await deleteReviewById(reviewId);
        if (res?.deletedCount === 1) {
          toast.success("Review deleted successfully!");
          router.refresh();
        } else {
          toast.error("Failed to delete review.");
          setReviews(initialReviews);
        }
      } catch (error) {
        toast.error("Failed to delete review.");
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
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence>
          {reviews.map((review, index) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-[#161D30] border border-gray-800/70 rounded-2xl p-5 flex flex-col justify-between hover:border-gray-700/60 transition-all shadow-xl group"
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
                  {review.patientPhoto ? (
                    <Image
                      width={70}
                      height={70}
                      src={review.patientPhoto}
                      alt="Patient"
                      className="size-7 rounded-full object-cover"
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

      {/* ── 🌟 DYNAMIC CUSTOM MODAL CALL ── */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        isPending={isPending}
        user={user}
        mode={modalMode}
        initialData={selectedReview}
      />
    </>
  );
}

export default ReviewListClient;
