"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { User, Calendar, AlertCircle, Hash, Activity } from "lucide-react";
import OpenModalButton from "./OpenModalButton";
import PrescriptionModal from "./PrescriptionModal";

export default function PrescriptionContainer({ prescriptions, view }) {
  const searchParams = useSearchParams();
  const activeModalId = searchParams.get("prescriptionId");

  if (prescriptions.length === 0) {
    return (
      <div className="bg-[#161D30] border border-gray-800 rounded-2xl p-8 sm:p-12 text-center space-y-3">
        <AlertCircle className="size-8 sm:size-10 text-gray-500 mx-auto" />
        <p className="text-gray-400 text-sm font-medium">
          No prescriptions found.
        </p>
      </div>
    );
  }

  const selectedPrescription = prescriptions.find(
    (p) => p._id === activeModalId,
  );

  // ৩২০ পিক্সেল মোবাইলের জন্য রিইউজেবল কার্ড আইটেম কম্পোনেন্ট
  const RenderCardItem = ({ item }) => (
    <div className="bg-[#161D30] border border-gray-800 rounded-2xl p-4 shadow-xl flex flex-col justify-between space-y-3.5 hover:border-gray-700 transition-colors">
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <h3 className="font-bold text-white text-sm sm:text-base truncate">
              Dr. {item.doctorName}
            </h3>
            <p className="text-[10px] text-gray-500 font-mono mt-0.5 flex items-center gap-0.5">
              <Hash className="size-2.5" />
              <span>ID: {item._id.slice(-6)}</span>
            </p>
          </div>
          <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] rounded-md font-medium shrink-0 whitespace-nowrap">
            {item.appointmentSlot}
          </span>
        </div>

        <div className="space-y-2.5 pt-2.5 border-t border-gray-800/60 text-xs">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="size-3.5 text-gray-600 shrink-0" />
            <span>{item.appointmentDate}</span>
          </div>
          <div className="space-y-1">
            <span className="text-gray-500 block text-[9px] uppercase font-bold tracking-wider flex items-center gap-1">
              <Activity className="size-3 text-rose-400" /> Diagnosis
            </span>
            <p className="text-gray-300 line-clamp-2 bg-[#0E121F]/40 p-2 rounded-lg border border-gray-800/40 min-w-0 text-[11px] sm:text-xs">
              {item.diagnosis}
            </p>
          </div>
        </div>
      </div>

      <OpenModalButton id={item._id} className="w-full justify-center" />
    </div>
  );

  return (
    <>
      {/* 📱 রেসপনসিভ হ্যান্ডেলিং: ছোট স্ক্রিনে (sm-এর নিচে) টেবিল ভিউ বন্ধ করে ডিরেক্ট কার্ড ভিউ ফোর্স করা হয়েছে */}
      <div className="sm:hidden grid grid-cols-1 gap-3.5">
        {prescriptions.map((item) => (
          <RenderCardItem key={item._id} item={item} />
        ))}
      </div>

      {/* 💻 বড় স্ক্রিনের লেআউট (sm ব্রেকপয়েন্ট থেকে চালু হবে) */}
      <div className="hidden sm:block">
        {view === "table" ? (
          /* ================= TABLE VIEW ================= */
          <div className="bg-[#161D30] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-[#0E121F]/40">
                    <th className="py-4 px-5">Doctor Name</th>
                    <th className="py-4 px-5">Date & Slot</th>
                    <th className="py-4 px-5">Diagnosis</th>
                    <th className="py-4 px-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 text-sm">
                  {prescriptions.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-[#1c243b]/40 transition-colors"
                    >
                      <td className="py-4 px-5 font-medium text-gray-200">
                        <div className="flex items-center gap-2">
                          <User className="size-4 text-purple-400" />
                          Dr. {item.doctorName}
                        </div>
                      </td>
                      <td className="py-4 px-5 text-gray-400">
                        <div className="flex items-center gap-1.5 text-xs">
                          <Calendar className="size-3.5 text-gray-600" />
                          {item.appointmentDate} ({item.appointmentSlot})
                        </div>
                      </td>
                      <td className="py-4 px-5 text-gray-300 max-w-[200px] truncate">
                        {item.diagnosis}
                      </td>
                      <td className="py-4 px-5 text-right">
                        <OpenModalButton id={item._id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* ================= CARD VIEW (sm+) ================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prescriptions.map((item) => (
              <RenderCardItem key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* ডাইনামিক মোডাল */}
      {selectedPrescription && (
        <PrescriptionModal data={selectedPrescription} />
      )}
    </>
  );
}
