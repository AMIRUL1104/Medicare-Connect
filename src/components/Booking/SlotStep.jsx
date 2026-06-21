"use client";

import { useEffect, useState } from "react";
import { formatDateKey, getAvailableSlots } from "./slotUtils";
import { getApointmentsByDoctorId } from "@/services/server/api";

/**
 * SlotStep — Step 2 of the booking flow.
 *
 * After a date is selected, calls YOUR existing getAppointmentsByDoctorId()
 * directly (no internal Next.js API route — your separate backend server
 * is the only source of truth for appointments). Slots themselves are
 * still derived client-side from doctor.workingHours + slotDuration,
 * never hardcoded, never fetched from anywhere.
 *
 * Note: getAppointmentsByDoctorId must be callable from a Client
 * Component. If it's a Server Action (has "use server" at the top,
 * like your serverFetch.js pattern), this works as-is — Next.js
 * handles the client→server call automatically. If it's a plain
 * server-only module (no "use server"), you'll get a build error;
 * in that case, add "use server" to that function, or call it from
 * a tiny Server Action wrapper instead.
 */
export default function SlotStep({
  doctor,
  selectedDate,
  selectedSlot,
  onSelectSlot,
}) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedDate) {
      setSlots([]);
      return;
    }

    let isCurrent = true;
    setLoading(true);
    setError(null);

    const dateKey = formatDateKey(selectedDate);

    getApointmentsByDoctorId(doctor._id, dateKey)
      .then((data) => {
        if (!isCurrent) return;

        const bookedSlots = data?.bookedSlots || [];

        // Derive slots client-side from doctor.workingHours + slotDuration,
        // then subtract bookedSlots — generatedSlots - bookedSlots = availableSlots
        const computed = getAvailableSlots(
          doctor.workingHours || [],
          doctor.slotDuration || 30,
          bookedSlots,
        );

        setSlots(computed);
      })
      .catch(() => {
        if (!isCurrent) return;
        setError("Couldn't load time slots. Please try again.");
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [doctor._id, doctor.workingHours, doctor.slotDuration, selectedDate]);

  if (!selectedDate) return null;

  return (
    <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
      <div className="flex items-center gap-2 mb-3">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0EA5E9] text-white text-xs font-bold">
          2
        </span>
        <h3 className="font-semibold text-[#1E293B] text-sm">
          Select a Time Slot
        </h3>
      </div>

      {loading && (
        <div
          className="grid grid-cols-3 sm:grid-cols-4 gap-2.5"
          aria-label="Loading time slots"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-10 rounded-lg bg-[#E2E8F0] animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="text-sm text-[#EF4444] py-2">{error}</p>
      )}

      {!loading && !error && slots.length === 0 && (
        <p className="text-sm text-[#64748B] py-2">
          No time slots are defined for this doctor on this date.
        </p>
      )}

      {!loading && !error && slots.length > 0 && (
        <>
          <div
            className="grid grid-cols-3 sm:grid-cols-4 gap-2.5"
            role="group"
            aria-label="Available time slots"
          >
            {slots.map(({ slot, isBooked }) => {
              const isSelected = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={isBooked}
                  onClick={() => onSelectSlot(slot)}
                  aria-pressed={isSelected}
                  className={[
                    "py-3 px-2 rounded-lg text-sm font-medium border-[1.5px] transition-all duration-200",
                    isBooked
                      ? "border-[#E2E8F0] bg-[#F8FAFC] text-[#CBD5E1] cursor-not-allowed line-through"
                      : isSelected
                        ? "border-[#0EA5E9] bg-[#0EA5E9] text-white shadow-[0_2px_8px_rgba(14,165,233,0.3)]"
                        : "border-[#E2E8F0] bg-white text-[#1E293B] hover:border-[#0EA5E9] hover:bg-[#F0F9FF]",
                  ].join(" ")}
                >
                  {slot}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#E2E8F0]" />
              Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0]" />
              Booked
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9]" />
              Selected
            </span>
          </div>
        </>
      )}
    </div>
  );
}
