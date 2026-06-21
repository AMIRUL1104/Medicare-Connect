import { NextResponse } from "next/server";
import { getDoctorById } from "@/lib/getDoctorById";
import { getAppointmentsByDoctorId } from "@/lib/getAppointmentsByDoctorId";
import { getAvailableSlots } from "@/lib/slotUtils";

/**
 * GET /api/doctors/[id]/slots?date=YYYY-MM-DD
 *
 * Internal Next.js route the client calls when the patient picks a
 * date (Step 2 of the booking flow). Combines:
 *   - doctor.workingHours + doctor.slotDuration (generates all possible slots)
 *   - appointments collection's bookedSlots for that date
 * → returns { slot, isBooked }[] so the UI can render available vs booked.
 *
 * This route itself does NOT store or hardcode slots — it derives them
 * fresh on every request, per the "never store slots in DB" rule.
 */
export async function GET(request, { params }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "date query param is required" }, { status: 400 });
  }

  try {
    const doctor = await getDoctorById(id);

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    const { bookedSlots } = await getAppointmentsByDoctorId(id, date);

    const slots = getAvailableSlots(
      doctor.workingHours || [],
      doctor.slotDuration || 30,
      bookedSlots || []
    );

    return NextResponse.json({ success: true, date, slots });
  } catch (error) {
    console.error(`GET /api/doctors/${id}/slots error:`, error);
    return NextResponse.json({ error: "Failed to fetch slots" }, { status: 500 });
  }
}
