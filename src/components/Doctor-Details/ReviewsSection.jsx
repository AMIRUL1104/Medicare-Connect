// Pure Server Component placeholder. Wire to your real Reviews
"use client";
import AddNewReviewBtn from "@/app/dashboard/patient/reviews/AddNewReviewBtn";
import { useState } from "react";
import ReviewModal from "../ui/ReviewModal";

// collection later — same pattern as the homepage testimonials section.
export default function ReviewsSection({ doctorDetails }) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  // ডক্টরের নিজস্ব ডাটা স্ট্রাকচার
  const currentDoctorInfo = {
    _id: doctorDetails._id,
    name: doctorDetails.name,
    specialization: doctorDetails.specialization,
  };
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 lg:p-8 mt-6">
      <h2 className="text-lg font-bold text-[#1E293B] mb-1">Patient Reviews</h2>

      <AddNewReviewBtn />
      {/* <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit} // আপনার সার্ভার অ্যাকশন হ্যান্ডলার ফাংশন
        user={loggedInUser} // লগইন থাকা পেশেন্ট ইউজার অবজেক্ট
        predefinedDoctor={currentDoctorInfo} // এটি দিলে ডক্টরের নাম লক থাকবে এবং সার্চ করার ঝামেলা থাকবে না
        mode="add"
      /> */}
    </div>
  );
}
