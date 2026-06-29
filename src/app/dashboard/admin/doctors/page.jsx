import React from "react";
import { getAllDoctors } from "@/services/server/api";
import DoctorManagementTable from "./DoctorManagementTable";

export const metadata = {
  title: "Doctor Verification & Management | MediCare Connect",
  description:
    "Approve medical credentials, onboard new practitioners, and monitor doctor profiles.",
};

export default async function DoctorsManagePage() {
  const allDoctors = await getAllDoctors();

  return (
    <div className="p-4 md:p-6 bg-[#0B1120] min-h-screen text-gray-100">
      {/* ─── RESPONSIVE HEADER ─── */}
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <h1 className="text-xl md:text-3xl font-extrabold text-white tracking-tight">
            Manage Doctors
          </h1>
          <p className="text-xs md:text-base text-gray-400 mt-1">
            Verify, reject, and monitor doctor profiles for{" "}
            <span className="text-[#38BDF8] font-medium">MediCare Connect</span>
            .
          </p>
        </div>
        <button className="w-full sm:w-auto px-4 py-2 bg-[#38BDF8] text-[#0B1120] rounded-lg text-xs md:text-sm font-semibold hover:bg-[#38BDF8]/90 transition-all shadow-md">
          + Add New Doctor
        </button>
      </div>

      <DoctorManagementTable initialDoctors={allDoctors} />
    </div>
  );
}
