import React from "react";
import Link from "next/link";
import { X, User, Calendar, Activity, Pill, FileText } from "lucide-react";

export default function PrescriptionModal({ data }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#161D30] border border-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* মোডাল হেডার */}
        <div className="p-4 sm:p-5 border-b border-gray-800 flex items-center justify-between bg-[#0E121F]/40 gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20 shrink-0">
              <FileText className="size-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-sm font-bold text-white truncate">
                Prescription Details
              </h2>
              <p className="text-[9px] sm:text-[10px] text-gray-500 font-mono mt-0.5 truncate select-all">
                ID: {data._id}
              </p>
            </div>
          </div>
          <Link
            href="?"
            scroll={false}
            className="p-1.5 text-gray-500 hover:text-white bg-[#0E121F] border border-gray-800 rounded-lg transition-colors shrink-0"
          >
            <X className="size-4" />
          </Link>
        </div>

        {/* মোডাল বডি (স্ক্রোলযোগ্য) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 text-xs sm:text-sm scrollbar-thin">
          {/* ডাক্তার ও ডেটা ইনফো গ্রিড */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#0E121F]/40 p-3 sm:p-4 rounded-xl border border-gray-800/60">
            <div className="space-y-0.5">
              <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-bold tracking-wider block">
                Doctor
              </span>
              <div className="flex items-center gap-2 text-white font-medium truncate">
                <User className="size-4 text-purple-400 shrink-0" />
                <span className="truncate">Dr. {data.doctorName}</span>
              </div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-bold tracking-wider block">
                Date & Time
              </span>
              <div className="flex items-center gap-1.5 text-gray-300 flex-wrap">
                <Calendar className="size-4 text-sky-400 shrink-0" />
                <span className="text-[11px] sm:text-xs">
                  {data.appointmentDate}{" "}
                  <span className="text-gray-500">
                    ({data.appointmentSlot})
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="space-y-1.5">
            <h4 className="text-gray-400 font-semibold uppercase tracking-wider text-[9px] sm:text-[10px] flex items-center gap-1.5">
              <Activity className="size-3.5 text-rose-400" /> Diagnosis
            </h4>
            <div className="bg-[#0E121F]/60 border border-gray-800/80 p-3 sm:p-3.5 rounded-xl text-gray-200 leading-relaxed font-medium text-[11px] sm:text-xs break-words">
              {data.diagnosis || "No diagnosis specified."}
            </div>
          </div>

          {/* Medications */}
          <div className="space-y-2">
            <h4 className="text-gray-400 font-semibold uppercase tracking-wider text-[9px] sm:text-[10px] flex items-center gap-1.5">
              <Pill className="size-3.5 text-emerald-400" /> Medications
            </h4>
            <div className="space-y-2">
              {data.medications && data.medications.length > 0 ? (
                data.medications.map((med, index) => (
                  <div
                    key={index}
                    className="flex flex-col xs:flex-row xs:items-center justify-between bg-[#0E121F]/30 p-2.5 sm:p-3 rounded-xl border border-gray-800/40 gap-2"
                  >
                    <div className="font-semibold text-gray-200 text-[11px] sm:text-xs truncate">
                      {med.name || "N/A"}
                    </div>
                    <div className="flex items-center gap-2.5 text-[10px] sm:text-xs justify-between xs:justify-end">
                      <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-md font-mono whitespace-nowrap">
                        {med.dosage}
                      </span>
                      <span className="text-gray-500 font-medium whitespace-nowrap">
                        {med.duration}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-xs italic">
                  No medicines listed.
                </p>
              )}
            </div>
          </div>

          {/* Special Notes */}
          {data.notes && (
            <div className="space-y-1.5 pt-1.5 border-t border-gray-800/50">
              <h4 className="text-gray-500 font-semibold uppercase tracking-wider text-[9px] sm:text-[10px]">
                Advice / Special Notes
              </h4>
              <p className="text-gray-400 italic bg-[#0E121F]/20 p-3 rounded-lg border border-dashed border-gray-800 text-[11px] sm:text-xs break-words">
                &ldquo;{data.notes}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* মোডাল ফুটার */}
        <div className="p-3 sm:p-4 bg-[#0E121F]/40 border-t border-gray-800 text-right">
          <Link
            href="?"
            scroll={false}
            className="w-full sm:w-auto px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold rounded-xl transition-all inline-block text-center"
          >
            Close
          </Link>
        </div>
      </div>
    </div>
  );
}
