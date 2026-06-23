"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { formatDateKey } from "./slotUtils";
import DateStep from "./DateStep";
import SlotStep from "./SlotStep";
import SymptwomsStep from "./SymptomsStep";
import SymptomsStep from "./SymptomsStep";
import { AddNewAppointment } from "@/services/server/action";

/**
 * BookingCard — the only "orchestrator" client component.
 *
 * Holds the multi-step booking state (date → slot → symptoms → confirm)
 * and renders each step progressively (progressive disclosure — slot
 * step only appears after date is picked, symptoms only after slot is
 * picked). Submits the final payload and redirects to /payment/:id.
 *
 * patientId would normally come from the authenticated session —
 * replace getCurrentPatientId() with your real auth lookup.
 */

export default function BookingCard({ doctor, user }) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle | submitting | error

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: { symptoms: "" },
  });

  const symptomsValue = watch("symptoms");

  function handleSelectDate(date) {
    setSelectedDate(date);
    setSelectedSlot(null); // reset slot when date changes
  }

  function handleSelectSlot(slot) {
    setSelectedSlot(slot === selectedSlot ? null : slot);
  }

  const canConfirm = Boolean(selectedDate && selectedSlot && isValid);

  // payment confirmation function
  async function onSubmit(formData) {
    if (!canConfirm) return;

    setSubmitStatus("submitting");

    const payload = {
      doctorId: doctor._id,
      patientId: user.id,
      doctorName: doctor.doctorName,
      patientName: user.name,
      patientEmail: user.email,
      date: formatDateKey(selectedDate),
      slot: selectedSlot,
      symptoms: formData.symptoms,
      status: "pending",
    };

    try {
      const data = await AddNewAppointment(payload);
      console.log(data);

      if (!data || data.success === false) {
        throw new Error("Failed to create appointment");
      }

      router.push(`/doctors/${doctor._id}/payment/${data.insertedId}`);
      // redirect to payment page
    } catch (error) {
      console.error("Booking error:", error);
      setSubmitStatus("error");
    }
    console.log(payload);
  }

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 lg:p-7 lg:sticky lg:top-[88px]">
      <h2 className="text-lg font-bold text-[#1E293B] mb-1">
        Book an Appointment
      </h2>
      <p className="text-[#64748B] text-xs mb-5">
        Follow the steps to confirm your booking.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Step 1: Date */}
        <DateStep
          availableDays={doctor.availableDays}
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
        />

        {/* Step 2: Slot — progressive disclosure */}
        <AnimatePresence mode="wait">
          {selectedDate && (
            <motion.div
              key="slot-step"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              <SlotStep
                doctor={doctor}
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                onSelectSlot={handleSelectSlot}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Symptoms — progressive disclosure */}
        <AnimatePresence mode="wait">
          {selectedSlot && (
            <motion.div
              key="symptoms-step"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              <SymptomsStep
                register={register}
                errors={errors}
                value={symptomsValue}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error state */}
        {submitStatus === "error" && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2.5 bg-[#FFF5F5] border border-[#FECACA] rounded-lg p-3"
          >
            <span className="text-[#EF4444] text-sm">⚠</span>
            <p className="text-xs text-[#EF4444]">
              Something went wrong while booking. Please try again.
            </p>
          </div>
        )}

        {/* Fee summary */}
        {selectedSlot && (
          <div className="mt-6 pt-5 border-t border-[#E2E8F0] flex items-center justify-between">
            <span className="text-sm text-[#64748B]">Consultation Fee</span>
            <span className="text-lg font-bold text-[#1E293B]">
              ৳{doctor.consultationFee}
            </span>
          </div>
        )}

        {/* Step 4: Confirm */}
        <button
          type="submit"
          disabled={!canConfirm || submitStatus === "submitting"}
          className="w-full mt-5 py-3 px-6 rounded-[10px] font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_4px_16px_rgba(14,165,233,0.35)] hover:-translate-y-px active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
          style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)" }}
        >
          {submitStatus === "submitting" ? (
            <>
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Confirming booking…
            </>
          ) : (
            "Confirm Appointment"
          )}
        </button>

        {!canConfirm && (
          <p className="text-[11px] text-[#94A3B8] text-center mt-2">
            Complete all steps above to confirm your appointment.
          </p>
        )}
      </form>
    </div>
  );
}
