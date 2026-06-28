import React from "react";
import { getUserSession } from "@/services/core/session";
import { getAppointmentsByDoctorId } from "@/services/server/api"; // আপনার তৈরি ফেচিং API
import AppointmentsClient from "./AppointmentsClient";

export const metadata = {
  title: "Patient Appointments | MediCare Connect",
  description:
    "Track upcoming consultations, approve patient bookings, and manage check-in pipelines.",
};

async function DoctorAppointmentsPage() {
  const user = await getUserSession();

  // ডক্টরের আইডি দিয়ে তার সব অ্যাপয়েন্টমেন্ট নিয়ে আসা
  const appointments = await getAppointmentsByDoctorId(user.id);

  return (
    <div className="min-h-screen bg-[#0E121F] text-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Appointment Management
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your patient requests, scheduling, and prescriptions.
          </p>
        </div>

        <AppointmentsClient initialAppointments={appointments || []} />
      </div>
    </div>
  );
}

export default DoctorAppointmentsPage;
