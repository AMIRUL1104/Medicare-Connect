import React from "react";
import { getUserSession } from "@/services/core/session";
import { getReviewsByPatientId } from "@/services/server/api";
import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import ReviewListClient from "./ReviewListClient";

// মক ডাটা (আপনার দেওয়া ডাটা স্ট্রাকচার অনুযায়ী যদি API ডাউন থাকে)
const mockReviews = [
  {
    _id: "6a3bf150c8a6fff262107e9f",
    patientName: "Fatima Al-Rashid",
    patientPhoto: "https://i.pravatar.cc/80?img=41",
    rating: 5,
    testimonial:
      "I was skeptical about online healthcare, but the verification badge on every doctor's profile made me feel safe. The consultation was professional and thorough.",
    doctorName: "Dr. Chris Donovan",
    specialization: "Psychiatrist",
    patientId: "6a34257c6f84e13c1d72ad86",
    doctorId: "6a34448ebbd6946906b743df",
  },
];

async function MyReviewsPage() {
  const user = await getUserSession();

  const reviews = await getReviewsByPatientId(user.id);

  return (
    <div className="min-h-screen bg-[#0E121F] text-gray-100 p-4 md:p-6 space-y-8">
      {/* পেজ হেডার এবং অ্যাড নিউ রিভিউ বাটন */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800/60 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            My Reviews
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage and view all the feedback you have shared for our medical
            specialists.
          </p>
        </div>

        {/* HeroUI Button (Placeholder for modal) */}
        <Button
          color="primary"
          endContent={<Plus className="size-4" />}
          className="bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-semibold rounded-xl px-5 h-11 self-start sm:self-auto transition-all shadow-lg shadow-sky-500/10 active:scale-[0.98]"
        >
          Add New Review
        </Button>
      </div>

      {/* ক্লায়েন্ট লিস্ট কম্পোনেন্ট যেখানে অ্যানিমেশন ও CRUD বাটন থাকবে */}
      <ReviewListClient initialReviews={reviews} />
    </div>
  );
}

export default MyReviewsPage;
