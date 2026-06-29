import React from "react";

import { FileText } from "lucide-react";
import PrescriptionTable from "./DoctorPrescriptionsClient";
import { getUserSession } from "@/services/core/session";
import SearchPrescription from "./SearchPrescription";
import { getPrescriptionsByDoctorId } from "@/services/server/api";

export const metadata = {
  title: "Create & Manage Prescriptions | MediCare Connect",
  description:
    "Issue digital prescriptions, add medical guidelines, and view previous patient health histories.",
};

// 💡 এটি একটি Server Component
async function PrescriptionListPage({ searchParams }) {
  const user = await getUserSession();

  // URL থেকে সার্চ কুয়েরি নেওয়া (যেমন: ?search=Amirul)
  const query = searchParams?.search || "";

  // ডক্টরের আইডি ও সার্চ কুয়েরি দিয়ে ডাটাবেজ থেকে সরাসরি ডাটা ফেচ করা
  const prescriptions = await getPrescriptionsByDoctorId(user.id);

  return (
    <div className="min-h-screen bg-[#0E121F] text-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* হেডার ও সার্চ এরিয়া */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#161D30] border border-gray-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <FileText className="size-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Prescription Management
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Manage, write and update all patient prescriptions
              </p>
            </div>
          </div>

          {/* 🔍 আলাদা করা সার্চ কম্পোনেন্ট */}
          <SearchPrescription placeholder="Search by patient name..." />
        </div>

        {/* 📊 আলাদা করা টেবিল কম্পোনেন্ট */}
        <PrescriptionTable prescriptions={prescriptions || []} />
      </div>
    </div>
  );
}

export default PrescriptionListPage;
