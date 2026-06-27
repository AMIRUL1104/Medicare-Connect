// src/app/admin/doctors/page.js
import React from "react";
import { getAllDoctors } from "@/services/server/api";
import DoctorManagementTable from "./DoctorManagementTable";

export default async function DoctorsManagePage() {
  const allDoctors = await getAllDoctors();

  return (
    <div className="p-6 bg-[#0B1120] min-h-screen text-gray-100">
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Manage Doctors
          </h1>
          <p className="text-base text-gray-400 mt-1">
            Verify, reject, and monitor doctor profiles for{" "}
            <span className="text-[#38BDF8] font-medium">MediCare Connect</span>
            .
          </p>
        </div>
        <button className="px-5 py-2.5 bg-[#38BDF8] text-[#0B1120] rounded-lg text-sm font-semibold hover:bg-[#38BDF8]/90 transition-all shadow-md">
          + Add New Doctor
        </button>
      </div>

      <DoctorManagementTable initialDoctors={allDoctors} />
    </div>
  );
}
