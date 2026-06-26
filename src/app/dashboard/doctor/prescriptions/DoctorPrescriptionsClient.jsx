"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Edit, User, Calendar, AlertCircle } from "lucide-react";

export default function PrescriptionTable({ prescriptions }) {
  const router = useRouter();

  if (prescriptions.length === 0) {
    return (
      <div className="bg-[#161D30] border border-gray-800 rounded-2xl p-12 text-center space-y-3 shadow-xl">
        <AlertCircle className="size-10 text-gray-500 mx-auto" />
        <p className="text-gray-400 font-medium">No prescriptions found.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#161D30] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-[#0E121F]/40">
              <th className="py-4 px-6">Patient</th>
              <th className="py-4 px-6">Date & Slot</th>
              <th className="py-4 px-6">Diagnosis / Status</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60 text-sm">
            {prescriptions.map((prescription) => (
              <tr
                key={prescription._id}
                className="hover:bg-[#1c243b]/40 transition-colors"
              >
                {/* Patient Name */}
                <td className="py-4 px-6 font-medium text-gray-200">
                  <div className="flex items-center gap-2.5">
                    <div className="size-7 rounded-md bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                      <User className="size-3.5" />
                    </div>
                    <span>{prescription.patientName}</span>
                  </div>
                </td>

                {/* Date & Slot */}
                <td className="py-4 px-6 text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-gray-600" />
                    <span>{prescription.appointmentDate}</span>
                    <span className="text-xs text-gray-600">
                      ({prescription.appointmentSlot})
                    </span>
                  </div>
                </td>

                {/* Diagnosis Status */}
                <td className="py-4 px-6">
                  {prescription.diagnosis ? (
                    <span className="text-gray-300 line-clamp-1 max-w-[200px]">
                      {prescription.diagnosis}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs rounded-md font-medium">
                      Pending Setup
                    </span>
                  )}
                </td>

                {/* Action Button */}
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() =>
                      router.push(
                        `/dashboard/doctor/prescriptions/edit/${prescription._id}`,
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md transition-all active:scale-[0.98]"
                  >
                    <Edit className="size-3.5" />
                    {prescription.diagnosis ? "Edit" : "Make Prescription"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
