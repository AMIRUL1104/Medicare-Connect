// src/app/admin/appointments/page.js
import React from "react";
import { getAllAppointment } from "@/services/server/api"; // আপনার API পাথ অনুযায়ী পরিবর্তন করুন
import AppointmentManagementClient from "./AppointmentManagementClient";

export default async function AdminAppointmentsPage() {
  const allAppointments = await getAllAppointment();

  return (
    <div className="p-6 bg-[#0B1120] min-h-screen text-gray-100">
      <div className="mb-8 border-b border-gray-800 pb-5">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Manage Appointments
        </h1>
        <p className="text-base text-gray-400 mt-1">
          Monitor, filter, and track all patient appointments for{" "}
          <span className="text-[#38BDF8] font-medium">MediCare Connect</span>.
        </p>
      </div>

      {/* ক্লায়েন্ট কম্পোনেন্ট */}
      <AppointmentManagementClient initialAppointments={allAppointments} />
    </div>
  );
}
