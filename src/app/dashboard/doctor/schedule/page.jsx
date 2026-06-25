import React from "react";
import { getUserSession } from "@/services/core/session";
import { getAppointmentsByDoctorId } from "@/services/server/api";
import ScheduleClient from "./ScheduleClient";

// Note: Doctors collection থেকে slots ডাটা আনার এপিআই আপনার প্রজেক্ট স্ট্রাকচার অনুযায়ী কল করে নেবেন।
// এখানে ডেমো হিসেবে `availableSlots` পাস করা হয়েছে।

async function ManageSchedulePage() {
  const user = await getUserSession();
  const allAppointments = await getAppointmentsByDoctorId(user.id);

  // Filter only 'confirmed' appointments as requested
  const confirmedAppointments =
    allAppointments?.filter(
      (app) =>
        app.appointmentStatus === "pending" ||
        app.paymentStatus === "confirmed",
    ) || [];

  // Demo availability slots (আপাতত হার্ডকোডেড, ডাটাবেজ থেকে আসলে এখানে পাস করবেন)
  const availableSlots = [
    { id: "1", day: "Saturday", time: "6:00 PM" },
    { id: "2", day: "Monday", time: "7:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-[#0E121F] text-gray-100 p-4 md:p-6">
      <ScheduleClient
        initialAppointments={confirmedAppointments}
        initialSlots={availableSlots}
      />
    </div>
  );
}

export default ManageSchedulePage;
