"use client"; // এরর এড়াতে এবং হুক ব্যবহারের জন্য এটি ক্লায়েন্ট বাউন্ডারি নিশ্চিত করে

import React from "react";
import { useSearchParams } from "next/navigation"; // 🛠️ হুক ইম্পোর্ট করা হলো
import { User, Calendar, AlertCircle } from "lucide-react";
import OpenModalButton from "./OpenModalButton";
import PrescriptionModal from "./PrescriptionModal";

export default function PrescriptionContainer({ prescriptions, view }) {
  // 🛠️ ক্লায়েন্ট সাইডে সেফলি কুয়েরি প্যারামিটার রিড করার উপায়
  const searchParams = useSearchParams();
  const activeModalId = searchParams.get("prescriptionId");

  if (prescriptions.length === 0) {
    return (
      <div className="bg-[#161D30] border border-gray-800 rounded-2xl p-12 text-center space-y-3">
        <AlertCircle className="size-10 text-gray-500 mx-auto" />
        <p className="text-gray-400 font-medium">No prescriptions found.</p>
      </div>
    );
  }

  const selectedPrescription = prescriptions.find(
    (p) => p._id === activeModalId,
  );

  return (
    <>
      {view === "table" ? (
        /* ================= TABLE VIEW ================= */
        <div className="bg-[#161D30] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-[#0E121F]/40">
                  <th className="py-4 px-6">Doctor Name</th>
                  <th className="py-4 px-6">Date & Slot</th>
                  <th className="py-4 px-6">Diagnosis</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-sm">
                {prescriptions.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-[#1c243b]/40 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-gray-200">
                      <div className="flex items-center gap-2">
                        <User className="size-4 text-purple-400" />
                        Dr. {item.doctorName}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-400">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="size-3.5 text-gray-600" />
                        {item.appointmentDate} ({item.appointmentSlot})
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-300 max-w-[200px] truncate">
                      {item.diagnosis}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <OpenModalButton id={item._id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ================= CARD VIEW ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prescriptions.map((item) => (
            <div
              key={item._id}
              className="bg-[#161D30] border border-gray-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 hover:border-gray-700 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-base">
                      Dr. {item.doctorName}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                      ID: {item._id.slice(-6)}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] rounded-md font-medium">
                    {item.appointmentSlot}
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-800/60 text-xs">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="size-3.5 text-gray-600" />
                    <span>{item.appointmentDate}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-wider">
                      Diagnosis
                    </span>
                    <p className="text-gray-300 line-clamp-2 bg-[#0E121F]/40 p-2 rounded-lg border border-gray-800/40">
                      {item.diagnosis}
                    </p>
                  </div>
                </div>
              </div>

              <OpenModalButton
                id={item._id}
                className="w-full justify-center"
              />
            </div>
          ))}
        </div>
      )}

      {/* ডাইনামিক মোডাল */}
      {selectedPrescription && (
        <PrescriptionModal data={selectedPrescription} />
      )}
    </>
  );
}
