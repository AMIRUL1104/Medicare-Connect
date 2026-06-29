import React from "react";

import { getPrescriptionById } from "@/services/server/api";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { i } from "motion/react-client";
import EditPrescriptionForm from "./EditPrescriptionForm";

// 💡 এটি একটি Server Component
async function EditPrescriptionPage({ params }) {
  const { id } = await params; // URL থেকে prescriptionId নেওয়া হচ্ছে
  // console.log(id);

  // সার্ভার সাইড থেকে সরাসরি ডাটাবেজ ফেচ
  const prescriptionData = await getPrescriptionById(id); // আপনার তৈরি ফেচিং API
  // console.log(prescriptionData);
  // ডাটা না পাওয়া গেলে ফলব্যাক বা এরর মেসেজ
  if (!prescriptionData) {
    return (
      <div className="min-h-screen bg-[#0E121F] text-gray-100 flex flex-col items-center justify-center p-6">
        <p className="text-rose-500 font-medium mb-4">
          Prescription not found or has been deleted.
        </p>
        <Link
          href="/dashboard/prescription"
          className="text-sm text-sky-400 hover:underline"
        >
          Back to Prescription Management
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E121F] text-gray-100 p-4 md:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* ব্যাক বাটন */}
        <Link
          href="/dashboard/doctor/prescriptions"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors w-fit"
        >
          <ChevronLeft className="size-4" /> Cancel & Go Back
        </Link>

        {/* 📝 আলাদা করা ক্লায়েন্ট ফর্ম কম্পোনেন্ট */}
        <EditPrescriptionForm prescription={prescriptionData} />
      </div>
    </div>
  );
}

export default EditPrescriptionPage;
