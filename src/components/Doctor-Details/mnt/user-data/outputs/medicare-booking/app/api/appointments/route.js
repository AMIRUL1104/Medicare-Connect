import { NextResponse } from "next/server";

/**
 * POST /api/appointments
 *
 * Creates a new appointment with status "pending". Replace the body
 * of this handler with your real DB insert.
 *
 * Expected payload:
 * { doctorId, patientId, date, slot, symptoms, status: "pending" }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { doctorId, patientId, date, slot, symptoms, status } = body;

    if (!doctorId || !patientId || !date || !slot || !symptoms) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Replace with your real DB insert, e.g.:
    // const result = await appointmentsCollection.insertOne({
    //   doctorId, patientId, date, slot, symptoms, status: status || "pending",
    //   createdAt: new Date(),
    // });
    // const appointmentId = result.insertedId;

    // Mock insert for now
    const appointmentId = `appt_${Date.now()}`;

    return NextResponse.json({
      success: true,
      appointmentId,
      doctorId,
      patientId,
      date,
      slot,
      symptoms,
      status: status || "pending",
    });
  } catch (error) {
    console.error("POST /api/appointments error:", error);
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}
