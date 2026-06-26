"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import { FileText, Save, Plus, Trash2, Pill, Activity } from "lucide-react";
import { updatePrescriptionData } from "@/services/server/action";

export default function EditPrescriptionForm({ prescription }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // সার্ভার থেকে আসা ডাটা দিয়ে স্টেট ইনিশিয়ালাইজেশন
  const [diagnosis, setDiagnosis] = useState(prescription.diagnosis || "");
  const [notes, setNotes] = useState(prescription.notes || "");
  const [medications, setMedications] = useState(
    prescription.medications && prescription.medications.length > 0
      ? prescription.medications
      : [{ name: "", dosage: "", duration: "" }],
  );

  // নতুন মেডিসিন রো যোগ করা
  const addMedicationRow = () => {
    setMedications([...medications, { name: "", dosage: "", duration: "" }]);
  };

  // মেডিসিন রো মুছে ফেলা
  const removeMedicationRow = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  // মেডিসিন ইনপুট চেঞ্জ হ্যান্ডলার
  const handleMedicationChange = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!diagnosis.trim()) return toast.error("Please add a diagnosis!");

    startTransition(async () => {
      try {
        const res = await updatePrescriptionData({
          prescriptionId: prescription._id,
          diagnosis,
          medications,
          notes,
        });

        if (res?.modifiedCount === 1) {
          toast.success("Prescription updated successfully!");
          router.push("/dashboard/doctor/prescriptions"); // মেইন লিস্টে ব্যাক করবে
          router.refresh(); // সার্ভার কম্পোনেন্ট ডাটা রি-ভ্যালিডেট করবে
        } else {
          toast.error(res?.error || "Failed to update prescription");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while saving.");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#161D30] border border-gray-800 rounded-2xl p-6 shadow-xl space-y-6"
    >
      {/* ইনফো হেডার */}
      <div className="border-b border-gray-800 pb-4 flex items-center gap-3">
        <div className="p-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl">
          <FileText className="size-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">
            Prescription for {prescription.patientName}
          </h1>
          <p className="text-xs text-gray-500 font-mono mt-0.5">
            Appointment Date: {prescription.appointmentDate} (
            {prescription.appointmentSlot})
          </p>
        </div>
      </div>

      {/* Diagnosis */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <Activity className="size-4 text-sky-400" /> Diagnosis / Assessment
        </label>
        <textarea
          required
          rows={3}
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Enter diagnosis details..."
          className="w-full bg-[#0E121F] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-hidden focus:border-purple-500 transition-colors placeholder:text-gray-600"
        />
      </div>

      {/* Medications Dynamic Row */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Pill className="size-4 text-emerald-400" /> Medications
          </label>
          <button
            type="button"
            onClick={addMedicationRow}
            className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1 transition-colors"
          >
            <Plus className="size-3.5" /> Add Medicine
          </button>
        </div>

        {medications.map((med, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-3 items-end bg-[#0E121F]/30 p-3 rounded-xl border border-gray-800/40"
          >
            <div className="col-span-12 sm:col-span-5">
              <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">
                Medicine Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Napa Extend 665mg"
                value={med.name}
                onChange={(e) =>
                  handleMedicationChange(index, "name", e.target.value)
                }
                className="w-full bg-[#0E121F] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-hidden focus:border-purple-500"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">
                Dosage
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 1+0+1"
                value={med.dosage}
                onChange={(e) =>
                  handleMedicationChange(index, "dosage", e.target.value)
                }
                className="w-full bg-[#0E121F] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-hidden focus:border-purple-500"
              />
            </div>
            <div className="col-span-5 sm:col-span-3">
              <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">
                Duration
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 7 Days"
                value={med.duration}
                onChange={(e) =>
                  handleMedicationChange(index, "duration", e.target.value)
                }
                className="w-full bg-[#0E121F] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-hidden focus:border-purple-500"
              />
            </div>
            <div className="col-span-1 text-right">
              {medications.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMedicationRow(index)}
                  className="p-2 text-gray-500 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Special Notes */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
          Special Notes / Advice
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Advice for patient (e.g. Avoid cold food)..."
          className="w-full bg-[#0E121F] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-hidden focus:border-purple-500 transition-colors placeholder:text-gray-600"
        />
      </div>

      {/* সাবমিট বাটন */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full font-semibold text-white bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99]"
      >
        <Save className="size-5" />
        {isPending ? "Saving changes..." : "Save & Finalize Prescription"}
      </button>
    </form>
  );
}
