// src/app/admin/appointments/page.js
import React from "react";
import { getAllAppointment } from "@/services/server/api";
import AppointmentManagementClient from "./AppointmentManagementClient";

export const metadata = {
  title: "Global Appointments Registry | MediCare Connect",
  description:
    "Monitor, track, and log all healthcare schedules and booking lifecycles in real-time.",
};

export default async function AdminAppointmentsPage() {
  const allAppointments = await getAllAppointment();

  return (
    <div className=" max-w-360 p-4 sm:p-6 bg-[#0B1120] min-h-screen text-gray-100">
      <div className="mb-6 border-b border-gray-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Manage Appointments
        </h1>
        <p className="text-sm sm:text-base text-gray-400 mt-1">
          Monitor, filter, and track all patient appointments for{" "}
          <span className="text-[#38BDF8] font-medium">MediCare Connect</span>.
        </p>
      </div>

      {/* ক্লায়েন্ট কম্পোনেন্ট */}
      <AppointmentManagementClient initialAppointments={allAppointments} />
    </div>
  );
}
