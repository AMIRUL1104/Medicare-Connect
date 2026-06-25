import React from "react";
import { getUserSession } from "@/services/core/session";
import { getAppointmentsByDoctorId } from "@/services/server/api";
import AppointmentsClient from "./AppointmentsClient";

async function DoctorAppointmentsPage() {
  const user = await getUserSession();
  const allAppointments = (await getAppointmentsByDoctorId(user.id)) || [];

  // বর্তমান তারিখ (২০২৬-০৬-২৫ অনুযায়ী ফিল্টারিং)
  const today = new Date("2026-06-25");

  // ১. ফিল্টার: যেসব অ্যাপয়েন্টমেন্ট এখনও পেন্ডিং এবং পেমেন্ট কনফার্মড
  const pendingAppointments = allAppointments.filter(
    (app) =>
      app.appointmentStatus === "pending" && app.paymentStatus === "confirmed",
  );

  // ২. ফিল্টার: যেগুলোর ডেট পার হয়ে গেছে (Past / History)
  const pastAppointments = allAppointments.filter((app) => {
    const appDate = new Date(app.date);
    return appDate < today;
  });

  return (
    <div className="min-h-screen bg-[#0E121F] text-gray-100 p-4 md:p-6">
      <AppointmentsClient
        pendingAppointments={pendingAppointments}
        pastAppointments={pastAppointments}
      />
    </div>
  );
}

export default DoctorAppointmentsPage;
