import { getUserSession } from "@/services/core/session";
import {
  getAppointmentByPatientId,
  getPaymentsByPatientId,
} from "@/services/server/api";
import React from "react";
import {
  CalendarDays,
  CreditCard,
  CheckCircle2,
  Clock,
  Star,
  User,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardBody } from "@heroui/react";

async function PatientDashboardPage() {
  const user = await getUserSession();
  const { totalPaid, history = [] } = await getPaymentsByPatientId(user?.id);
  const allAppointments = (await getAppointmentByPatientId(user?.id)) || [];

  // ১. অ্যাপয়েন্টমেন্ট ফিল্টারিং লজিক (Upcoming vs Past)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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

  // ২. রিচার্টস রিমুভ করে লাস্ট ৫টি পেমেন্ট ট্রানজেকশন ফিল্টার
  const recentPayments = history.slice(0, 5);

  // ৩. রিভিউ সেকশনের জন্য মক ডাটা
  const mockReviews = [
    {
      id: "1",
      doctorName: "Dr. Ariful Islam",
      rating: 5,
      comment:
        "Excellent consulting! The doctor explained the symptoms and treatment clearly.",
      date: "2026-06-20",
    },
    {
      id: "2",
      doctorName: "Dr. Nusrat Jahan",
      rating: 4,
      comment: "Very professional environment and the appointment was on time.",
      date: "2026-06-15",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-gray-100 p-6 space-y-8">
      {/* হেডার / ওয়েলকাম সেকশন */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111625] p-6 rounded-2xl border border-gray-800">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Welcome back, {user?.name || "Patient"}!
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Here is an overview of your healthcare activities and appointments.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-[#161D30] px-4 py-2.5 rounded-xl border border-gray-800">
          <User className="size-5 text-blue-500" />
          <span className="text-sm font-medium text-gray-300">
            {user?.email}
          </span>
        </div>
      </div>

      {/* স্ট্যাটিস্টিকস কার্ডস গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* কার্ড ১: Total Appointments */}
        <Card className="bg-[#111625] border border-gray-800 rounded-2xl shadow-sm">
          <Card.Content className="flex flex-row items-center gap-4 p-5">
            {" "}
            {/* 👈 এখানে Card.Content করুন */}
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
              <CalendarDays className="size-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Total Appointments
              </p>
              <h3 className="text-2xl font-bold mt-0.5">
                {allAppointments.length}
              </h3>
            </div>
          </Card.Content>
        </Card>

        {/* কার্ড ২: Upcoming Sessions */}
        <Card className="bg-[#111625] border border-gray-800 rounded-2xl shadow-sm">
          <Card.Content className="flex flex-row items-center gap-4 p-5">
            {" "}
            {/* 👈 এখানে Card.Content করুন */}
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
              <Clock className="size-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Upcoming Sessions
              </p>
              <h3 className="text-2xl font-bold mt-0.5">
                {upcomingAppointments.length}
              </h3>
            </div>
          </Card.Content>
        </Card>

        {/* কার্ড ৩: Total Amount Paid */}
        <Card className="bg-[#111625] border border-gray-800 rounded-2xl shadow-sm">
          <Card.Content className="flex flex-row items-center gap-4 p-5">
            {" "}
            {/* 👈 এখানে Card.Content করুন */}
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
              <CreditCard className="size-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Total Amount Paid
              </p>
              <h3 className="text-2xl font-bold mt-0.5">${totalPaid || 0}</h3>
            </div>
          </Card.Content>
        </Card>

        {/* র্ক্যাড ৪: My Total Reviews */}
        <Card className="bg-[#111625] border border-gray-800 rounded-2xl shadow-sm">
          <Card.Content className="flex flex-row items-center gap-4 p-5">
            {" "}
            {/* 👈 এখানে Card.Content করুন */}
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
              <Star className="size-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                My Total Reviews
              </p>
              <h3 className="text-2xl font-bold mt-0.5">
                {mockReviews.length}
              </h3>
            </div>
          </Card.Content>
        </Card>
      </div>
      {/* মিডেল সেকশন: রিসেন্ট পেমেন্টস (রিচার্টস এর বদলে) এবং আপকামিং অ্যাপয়েন্টমেন্ট */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 🛠️ চার্ট বাদ দিয়ে নতুন পেমেন্ট হিস্ট্রি টেবিল সেকশন */}
        <div className="lg:col-span-2 bg-[#111625] p-5 rounded-2xl border border-gray-800 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-lg font-semibold text-white">
                Recent Payments
              </h2>
              <span className="text-[11px] font-medium px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                Live Sync
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-5">
              Review history of your last 5 medical transaction receipts
            </p>
          </div>

          <div className="overflow-x-auto flex-1 flex flex-col justify-center">
            {recentPayments.length > 0 ? (
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="text-xs text-gray-400 uppercase bg-[#161D30] border border-gray-800">
                  <tr>
                    <th className="px-4 py-2.5 rounded-l-xl">Trx ID</th>
                    <th className="px-4 py-2.5">Paid Date</th>
                    <th className="px-4 py-2.5 text-right rounded-r-xl">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/40">
                  {recentPayments.map((pay, idx) => (
                    <tr
                      key={pay.transactionId || idx}
                      className="hover:bg-[#161D30]/30 transition-colors"
                    >
                      <td className="px-4 py-3.5 font-mono text-xs text-blue-400 tracking-tight">
                        {pay.transactionId ? (
                          <span className="flex items-center gap-1">
                            {pay.transactionId.substring(0, 12)}...
                            <ArrowUpRight className="size-3 opacity-60" />
                          </span>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-gray-300">
                        {pay.paymentDate
                          ? new Date(pay.paymentDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "N/A"}
                      </td>
                      <td className="px-4 py-3.5 text-right font-bold text-emerald-400">
                        ${pay.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center h-44 text-center">
                <CreditCard className="size-7 text-gray-600 mb-2" />
                <p className="text-sm text-gray-500">
                  No payment logs recorded yet.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* আপকামিং অ্যাপয়েন্টমেন্ট লিস্ট */}
        <div className="bg-[#111625] p-5 rounded-2xl border border-gray-800 flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-1">
            Upcoming Appointments
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            Your scheduled upcoming sessions
          </p>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-64">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((app) => (
                <div
                  key={app._id}
                  className="p-3.5 bg-[#161D30] rounded-xl border border-gray-800/60 hover:border-blue-500/30 transition-colors flex justify-between items-start"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200">
                      {app.doctorName}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                      <CalendarDays className="size-3.5 text-blue-400" />{" "}
                      {app.date} | {app.slot}
                    </p>
                    <span className="inline-block px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-medium rounded-md mt-2 capitalize">
                      {app.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <CheckCircle2 className="size-8 text-gray-600 mb-2" />
                <p className="text-sm text-gray-500">
                  No upcoming appointments found.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* নিচের সেকশন: পাস্ট অ্যাপয়েন্টমেন্ট এবং মক রিভিউ গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* অ্যাপয়েন্টমেন্ট হিস্ট্রি (Past Sessions) */}
        <div className="lg:col-span-2 bg-[#111625] p-5 rounded-2xl border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-1">
            Appointment History
          </h2>
          <p className="text-xs text-gray-400 mb-5">
            List of your completed and processed checkups
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="text-xs text-gray-400 uppercase bg-[#161D30] border border-gray-800">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Doctor Name</th>
                  <th className="px-4 py-3">Date & Slot</th>
                  <th className="px-4 py-3">Fee</th>
                  <th className="px-4 py-3 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {pastAppointments.length > 0 ? (
                  pastAppointments.slice(0, 5).map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-[#161D30]/40 transition-colors"
                    >
                      <td className="px-4 py-3.5 font-medium text-gray-200">
                        {app.doctorName}
                      </td>
                      <td className="px-4 py-3.5 text-xs">
                        <div>{app.date}</div>
                        <div className="text-gray-500 mt-0.5">{app.slot}</div>
                      </td>
                      <td className="px-4 py-3.5 text-gray-300">
                        ${app.consultationFee}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`px-2 py-0.5 text-[11px] font-medium rounded-md capitalize ${
                            app.status === "completed" ||
                            app.status === "confirmed"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-6 text-sm text-gray-500"
                    >
                      No past medical history available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* মক রিভিউ फीड সেকশন */}
        <div className="bg-[#111625] p-5 rounded-2xl border border-gray-800 flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-1">
            Recent Reviews Feedback
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            Your given ratings to the service providers
          </p>

          <div className="space-y-3 overflow-y-auto max-h-70 pr-1">
            {mockReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-3.5 bg-[#161D30] rounded-xl border border-gray-800/60"
              >
                <div className="flex justify-between items-center mb-1.5">
                  <h4 className="text-sm font-semibold text-gray-200">
                    {rev.doctorName}
                  </h4>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="size-3 fill-amber-500" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  {rev.comment}
                </p>
                <div className="text-[10px] text-gray-500 mt-2 text-right">
                  {rev.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboardPage;
