import React from "react";
import Link from "next/link";
import { X, User, Calendar, Activity, Pill, FileText } from "lucide-react";

export default function PrescriptionModal({ data }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#161D30] border border-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* মোডাল হেডার */}
        <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-[#0E121F]/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
              <FileText className="size-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                Prescription Details
              </h2>
              <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                ID: {data._id}
              </p>
            </div>
          </div>
          {/* ক্লোজ লিঙ্ক বাটন (URL থেকে আইডি রিমুভ করে মোডাল অফ করবে) */}
          <Link
            href="?"
            scroll={false}
            className="p-1.5 text-gray-500 hover:text-white bg-[#0E121F] border border-gray-800 rounded-lg transition-colors"
          >
            <X className="size-4" />
          </Link>
        </div>

        {/* মোডাল বডি (স্ক্রোলযোগ্য) */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs md:text-sm">
          {/* ডাক্তার ও ডেটা ইনফো গ্রিড */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#0E121F]/40 p-4 rounded-xl border border-gray-800/60">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block">
                Doctor
              </span>
              <div className="flex items-center gap-2 text-white font-medium">
                <User className="size-4 text-purple-400" />
                <span>Dr. {data.doctorName}</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block">
                Date & Time
              </span>
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="size-4 text-sky-400" />
                <span>
                  {data.appointmentDate}{" "}
                  <span className="text-xs text-gray-500">
                    ({data.appointmentSlot})
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="space-y-1.5">
            <h4 className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <Activity className="size-3.5 text-rose-400" /> Diagnosis
            </h4>
            <div className="bg-[#0E121F]/60 border border-gray-800/80 p-3.5 rounded-xl text-gray-200 leading-relaxed font-medium">
              {data.diagnosis || "No diagnosis specified."}
            </div>
          </div>

          {/* Medications */}
          <div className="space-y-2">
            <h4 className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <Pill className="size-3.5 text-emerald-400" /> Medications /
              Medicines
            </h4>
            <div className="space-y-2">
              {data.medications && data.medications.length > 0 ? (
                data.medications.map((med, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-[#0E121F]/30 p-3 rounded-xl border border-gray-800/40"
                  >
                    <div className="font-semibold text-gray-200">
                      {med.name || "N/A"}
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-md font-mono">
                        {med.dosage}
                      </span>
                      <span className="text-gray-500 font-medium">
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
            <div className="space-y-1.5 pt-2 border-t border-gray-800/50">
              <h4 className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">
                Advice / Special Notes
              </h4>
              <p className="text-gray-400 italic bg-[#0E121F]/20 p-3 rounded-lg border border-dashed border-gray-800 text-xs">
                &ldquo;{data.notes}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* মোডাল ফুটার */}
        <div className="p-4 bg-[#0E121F]/40 border-t border-gray-800 text-right">
          <Link
            href="?"
            scroll={false}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold rounded-xl transition-all inline-block"
          >
            Close
          </Link>
        </div>
      </div>
    </div>
  );
}
