import { getUserSession } from "@/services/core/session";
import { getPrescriptionsByPatientId } from "@/services/server/api";
import React from "react";
import Link from "next/link";
import { FileText, LayoutGrid, List } from "lucide-react";
import PrescriptionContainer from "./PrescriptionContainer";

async function PrescriptionPage({ searchParams }) {
  const user = await getUserSession();
  const prescriptions = await getPrescriptionsByPatientId(user.id);

  // 🛠️ এখানে searchParams-কে await করে আনর্যাপ করা হলো
  const resolvedSearchParams = await searchParams;
  const currentView = resolvedSearchParams?.view || "table";
  return (
    <div className="min-h-screen bg-[#0E121F] text-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* হেডার এবং ভিউ টগল বাটন */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#161D30] border border-gray-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
              <FileText className="size-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">My Prescriptions</h1>
              <p className="text-xs text-gray-400 mt-0.5">
                View and track all prescriptions given by doctors
              </p>
            </div>
          </div>

          {/* 🔄 ইউনিক টগল সিস্টেম (সার্ভার সাইড লিঙ্ক টগল) */}
          <div className="flex items-center bg-[#0E121F] p-1 rounded-xl border border-gray-800 self-start sm:self-auto">
            <Link
              href="?view=table"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                currentView === "table"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <List className="size-3.5" />
              Table View
            </Link>
            <Link
              href="?view=card"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                currentView === "card"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <LayoutGrid className="size-3.5" />
              Card View
            </Link>
          </div>
        </div>

        {/* ডাইনামিক কন্টেইনার (ডাটা পাস করা হচ্ছে) */}
        <PrescriptionContainer
          prescriptions={prescriptions || []}
          view={currentView}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
}

export default PrescriptionPage;
