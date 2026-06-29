import { getUserSession } from "@/services/core/session";
import { getAppointmentByPatientId } from "@/services/server/api";
import React from "react";

import { Calendar, Clock, Activity, DollarSign } from "lucide-react";
import AppointmentActionButtons from "./AppointmentActionButtons";

export const metadata = {
  title: "My Appointments | MediCare Connect",
  description:
    "View and manage your scheduled doctor appointments and consultation history.",
};

async function MyAppointmentsPage() {
  const user = await getUserSession();

  // সার্ভার সাইড ডাটা ফেচিং
  const allAppointments = (await getAppointmentByPatientId(user?.id)) || [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ১. সোর্সের রিকোয়ারমেন্ট অনুযায়ী অ্যাপয়েন্টমেন্ট ফিল্টারিং (Upcoming vs Past)
  const upcomingAppointments = allAppointments.filter((app) => {
    const appDate = new Date(app.date);
    return appDate >= today && app.status !== "cancelled";
  });

  const pastAppointments = allAppointments.filter((app) => {
    const appDate = new Date(app.date);
    return (
      appDate < today ||
      app.status === "completed" ||
      app.status === "cancelled"
    );
  });

  // অ্যাপয়েন্টমেন্ট কার্ড/রো রেন্ডার করার হেল্পার ফাংশন
  // const renderAppointmentRow = (app) => (
  //   <tr
  //     key={app._id}
  //     className="border-b border-gray-800/50 hover:bg-[#161D30]/30 transition-colors"
  //   >
  //     {/* ডাক্তারের তথ্য */}
  //     <td className="px-5 py-4">
  //       <div className="font-semibold text-gray-200">{app.doctorName}</div>
  //       <div className="text-xs text-gray-400 mt-0.5">
  //         {app.specialization || "General Physician"}
  //       </div>
  //     </td>

  //     {/* তারিখ ও স্লট */}
  //     <td className="px-5 py-4 text-sm text-gray-300">
  //       <div className="flex items-center gap-1.5">
  //         <Calendar className="size-3.5 text-blue-400" />
  //         {app.date}
  //       </div>
  //       <div className="flex items-center gap-1.5 text-gray-500 mt-1 text-xs">
  //         <Clock className="size-3.5" />
  //         {app.slot}
  //       </div>
  //     </td>

  //     {/* লক্ষণসমূহ (Symptoms) */}
  //     <td className="px-5 py-4 text-sm text-gray-400 max-w-50 truncate">
  //       <div className="flex items-center gap-1.5">
  //         <Activity className="size-3.5 text-purple-400" />
  //         <span>{app.symptoms || "No symptoms mentioned"}</span>
  //       </div>
  //     </td>

  //     {/* ফি ও পements */}
  //     <td className="px-5 py-4 text-sm font-medium text-gray-300">
  //       <div className="flex items-center gap-1 text-emerald-400">
  //         <DollarSign className="size-3.5" />
  //         {app.consultationFee}
  //       </div>
  //       <span className="text-[10px] text-emerald-500 font-semibold uppercase tracking-wider block mt-0.5">
  //         Paid
  //       </span>
  //     </td>

  //     {/* বর্তমান স্ট্যাটাস */}
  //     <td className="px-5 py-4">
  //       <span
  //         className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full capitalize ${
  //           app.appointmentStatus === "confirmed" ||
  //           app.appointmentStatus === "completed"
  //             ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
  //             : app.appointmentStatus === "pending"
  //               ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
  //               : "bg-red-500/10 text-red-400 border border-red-500/20"
  //         }`}
  //       >
  //         {app.appointmentStatus}
  //       </span>
  //     </td>

  //     {/* CRUD অ্যাকশন বাটন সমূহ (Client Component) */}
  //     <td className="px-5 py-4 text-right">
  //       <AppointmentActionButtons appointment={app} />
  //     </td>
  //   </tr>
  // );

  // return (
  //   <div className="min-h-screen bg-[#0A0E1A] text-gray-100 p-6 space-y-10">
  //     <div>
  //       <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
  //         My Appointments
  //       </h1>
  //       <p className="text-sm text-gray-400 mt-1">
  //         Manage, reschedule, or review your scheduled medical sessions.
  //       </p>
  //     </div>

  //     {/* ১. Upcoming Appointments Section */}
  //     <div className="bg-[#111625] p-5 rounded-2xl border border-gray-800 space-y-4">
  //       <h2 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
  //         <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
  //         Upcoming Sessions
  //       </h2>
  //       <div className="overflow-x-auto">
  //         <table className="w-full text-left text-sm text-gray-400">
  //           <thead className="text-xs text-gray-400 uppercase bg-[#161D30] border border-gray-800">
  //             <tr>
  //               <th className="px-5 py-3 rounded-l-xl">Doctor</th>
  //               <th className="px-5 py-3">Date & Slot</th>
  //               <th className="px-5 py-3">Symptoms</th>
  //               <th className="px-5 py-3">Fee</th>
  //               <th className="px-5 py-3">Status</th>
  //               <th className="px-5 py-3 text-right rounded-r-xl">Actions</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {upcomingAppointments.length > 0 ? (
  //               upcomingAppointments.map(renderAppointmentRow)
  //             ) : (
  //               <tr>
  //                 <td colSpan="6" className="text-center py-10 text-gray-500">
  //                   No upcoming appointments scheduled.
  //                 </td>
  //               </tr>
  //             )}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>

  //     {/* ২. Past / Completed Appointments Section */}
  //     <div className="bg-[#111625] p-5 rounded-2xl border border-gray-800 space-y-4">
  //       <h2 className="text-lg font-semibold text-gray-400 flex items-center gap-2">
  //         <span className="size-2 rounded-full bg-gray-500" />
  //         History & Past Sessions
  //       </h2>
  //       <div className="overflow-x-auto">
  //         <table className="w-full text-left text-sm text-gray-400">
  //           <thead className="text-xs text-gray-400 uppercase bg-[#161D30] border border-gray-800">
  //             <tr>
  //               <th className="px-5 py-3 rounded-l-xl">Doctor</th>
  //               <th className="px-5 py-3">Date & Slot</th>
  //               <th className="px-5 py-3">Symptoms</th>
  //               <th className="px-5 py-3">Fee</th>
  //               <th className="px-5 py-3">Status</th>
  //               <th className="px-5 py-3 text-right rounded-r-xl">Actions</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {pastAppointments.length > 0 ? (
  //               pastAppointments.map(renderAppointmentRow)
  //             ) : (
  //               <tr>
  //                 <td colSpan="6" className="text-center py-10 text-gray-500">
  //                   No history of past medical checkups.
  //                 </td>
  //               </tr>
  //             )}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </div>
  // );

  // অ্যাপয়েন্টমেন্ট কার্ড/রো রেন্ডার করার হেল্পার ফাংশন
  const renderAppointmentRow = (app) => (
    <tr
      key={app._id}
      className="border-b border-gray-800/50 hover:bg-[#161D30]/30 transition-colors"
    >
      {/* ডাক্তারের তথ্য */}
      <td className="px-5 py-4">
        <div className="font-semibold text-gray-200 whitespace-nowrap">
          {app.doctorName}
        </div>
        <div className="text-xs text-gray-400 mt-0.5">
          {app.specialization || "General Physician"}
        </div>
      </td>

      {/* তারিখ ও স্লট */}
      <td className="px-5 py-4 text-sm text-gray-300">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <Calendar className="size-3.5 text-blue-400" />
          {app.date}
        </div>
        <div className="flex items-center gap-1.5 text-gray-500 mt-1 text-xs whitespace-nowrap">
          <Clock className="size-3.5" />
          {app.slot}
        </div>
      </td>

      {/* লক্ষণসমূহ (Symptoms) */}
      <td className="px-5 py-4 text-sm text-gray-400 max-w-50 truncate">
        <div className="flex items-center gap-1.5">
          <Activity className="size-3.5 text-purple-400" />
          <span className="truncate">
            {app.symptoms || "No symptoms mentioned"}
          </span>
        </div>
      </td>

      {/* ফি ও পেমেন্ট */}
      <td className="px-5 py-4 text-sm font-medium text-gray-300">
        <div className="flex items-center gap-1 text-emerald-400">
          <DollarSign className="size-3.5" />
          {app.consultationFee}
        </div>
        <span className="text-[10px] text-emerald-500 font-semibold uppercase tracking-wider block mt-0.5">
          Paid
        </span>
      </td>

      {/* বর্তমান স্ট্যাটাস */}
      <td className="px-5 py-4">
        <span
          className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full capitalize ${
            app.appointmentStatus === "confirmed" ||
            app.appointmentStatus === "completed"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : app.appointmentStatus === "pending"
                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {app.appointmentStatus}
        </span>
      </td>

      {/* CRUD অ্যাকশন বাটন সমূহ */}
      <td className="px-5 py-4 text-right">
        <AppointmentActionButtons appointment={app} />
      </td>
    </tr>
  );

  // মোবাইল ডিভাইসের (320px+) জন্য রেসপন্সিভ কার্ড ভিউ
  const renderMobileCard = (app) => (
    <div
      key={app._id}
      className="bg-[#161D30]/40 border border-gray-800 rounded-xl p-4 space-y-3.5 text-sm"
    >
      {/* কার্ড হেডার: ডক্টর নেম ও স্ট্যাটাস */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-bold text-gray-200 text-base">
            {app.doctorName}
          </h4>
          <p className="text-xs text-gray-400 mt-0.5">
            {app.specialization || "General Physician"}
          </p>
        </div>
        <span
          className={`inline-block px-2.5 py-0.5 text-[11px] font-medium rounded-full capitalize shrink-0 ${
            app.appointmentStatus === "confirmed" ||
            app.appointmentStatus === "completed"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : app.appointmentStatus === "pending"
                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {app.appointmentStatus}
        </span>
      </div>

      {/* মেটা ইনফো গ্রিড (তারিখ, সময়, ফি ও সিম্পটম) */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-800/60 text-xs">
        <div className="space-y-1.5">
          <span className="text-gray-500 block">Date & Time</span>
          <div className="flex items-center gap-1 text-gray-300">
            <Calendar className="size-3 text-blue-400 shrink-0" />
            <span className="truncate">{app.date}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Clock className="size-3 text-gray-500 shrink-0" />
            <span className="truncate">{app.slot}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-gray-500 block">Payment & Fee</span>
          <div className="flex items-center gap-0.5 text-emerald-400 font-semibold text-sm">
            <DollarSign className="size-3.5" />
            {app.consultationFee}
          </div>
          <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider block">
            Paid
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-800/60 text-xs space-y-1">
        <span className="text-gray-500 block">Symptoms</span>
        <div className="flex items-center gap-1.5 text-gray-400">
          <Activity className="size-3.5 text-purple-400 shrink-0" />
          <p className="line-clamp-2">
            {app.symptoms || "No symptoms mentioned"}
          </p>
        </div>
      </div>

      {/* মোবাইল অ্যাকশন বাটন এরিয়া */}
      <div className="pt-3 border-t border-gray-800 flex justify-end">
        <AppointmentActionButtons appointment={app} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-gray-100 p-4 sm:p-6 space-y-8 max-w-7xl mx-auto w-full overflow-hidden">
      {/* পেজ হেডার */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          My Appointments
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Manage, reschedule, or review your scheduled medical sessions.
        </p>
      </div>

      {/* ১. Upcoming Appointments Section */}
      <div className="bg-[#111625] p-4 sm:p-5 rounded-2xl border border-gray-800 space-y-4">
        <h2 className="text-base sm:text-lg font-semibold text-blue-400 flex items-center gap-2">
          <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
          Upcoming Sessions
        </h2>

        {/* মোবাইল ডিভাইস ভিউ (কার্ড লেআউট) - md এর নিচে দেখাবে */}
        <div className="block md:hidden space-y-3">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map(renderMobileCard)
          ) : (
            <p className="text-center py-6 text-xs text-gray-500">
              No upcoming appointments scheduled.
            </p>
          )}
        </div>

        {/* ডেস্কটপ টেবিল ভিউ - md স্ক্রিন এবং তার ওপরে দেখাবে */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-800/60">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-[#161D30]">
              <tr>
                <th className="px-5 py-3.5">Doctor</th>
                <th className="px-5 py-3.5">Date & Slot</th>
                <th className="px-5 py-3.5">Symptoms</th>
                <th className="px-5 py-3.5">Fee</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40 bg-[#111625]">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map(renderAppointmentRow)
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    No upcoming appointments scheduled.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ২. Past / Completed Appointments Section */}
      <div className="bg-[#111625] p-4 sm:p-5 rounded-2xl border border-gray-800 space-y-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-400 flex items-center gap-2">
          <span className="size-2 rounded-full bg-gray-500" />
          History & Past Sessions
        </h2>

        {/* মোবাইল ডিভাইস ভিউ (কার্ড লেআউট) - md এর নিচে দেখাবে */}
        <div className="block md:hidden space-y-3">
          {pastAppointments.length > 0 ? (
            pastAppointments.map(renderMobileCard)
          ) : (
            <p className="text-center py-6 text-xs text-gray-500">
              No history of past medical checkups.
            </p>
          )}
        </div>

        {/* ডেস্কটপ টেবিল ভিউ - md স্ক্রিন এবং তার ওপরে দেখাবে */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-800/60">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-[#161D30]">
              <tr>
                <th className="px-5 py-3.5">Doctor</th>
                <th className="px-5 py-3.5">Date & Slot</th>
                <th className="px-5 py-3.5">Symptoms</th>
                <th className="px-5 py-3.5">Fee</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40 bg-[#111625]">
              {pastAppointments.length > 0 ? (
                pastAppointments.map(renderAppointmentRow)
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    No history of past medical checkups.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyAppointmentsPage;
