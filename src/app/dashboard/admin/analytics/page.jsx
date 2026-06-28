import React from "react";
// ভবিষ্যতে ব্যবহারের জন্য আপনার তৈরি করা API বা সার্ভার অ্যাকশনগুলো এখানে ইম্পোর্ট করবেন
import {
  getPaymentHistory,
  getAllAppointment,
  getAllDoctors,
  getTopRatedDocors,
} from "@/services/server/api";
import PaymentAnalytics from "./PaymentAnalytics";
import TopDoctorsChart from "./TopDoctorsChart";

export const metadata = {
  title: "System Performance Analytics | MediCare Connect",
  description:
    "Deep data visualization, user growth matrices, and critical platform performance graphs.",
};

export default async function AnalyticsPage() {
  // ১. প্যারালালি সব প্রয়োজনীয় অ্যানালিটিক্স ডেটা সার্ভার থেকে ফেচ করা
  let payments = [];
  let appointments = [];
  let doctors = [];

  const topDoctors = await getTopRatedDocors();
  //   const topDoctors = data.data;
  console.log(topDoctors);

  try {
    // Promise.allSettled ব্যবহার করা নিরাপদ যাতে একটি API ফেইল করলেও পুরো পেজ ক্র্যাশ না করে
    const [paymentsRes, appointmentsRes, doctorsRes] = await Promise.allSettled(
      [getPaymentHistory(), getAllAppointment(), getAllDoctors()],
    );

    if (paymentsRes.status === "fulfilled") payments = paymentsRes.value;
    if (appointmentsRes.status === "fulfilled")
      appointments = appointmentsRes.value;
    if (doctorsRes.status === "fulfilled") doctors = doctorsRes.value;
  } catch (error) {
    console.error("Error fetching analytics data:", error);
  }

  return (
    <div className="p-6 bg-[#0B1120] min-h-screen text-gray-100 space-y-8">
      {/* ─── HEADER SECTION ─── */}
      <div className="border-b border-gray-800 pb-5">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="text-base text-gray-400 mt-1">
          Real-time insights, revenue reports, and platform performance for{" "}
          <span className="text-[#38BDF8] font-medium">MediCare Connect</span>.
        </p>
      </div>

      {/* ─── ANALYTICS COMPONENTS GRID ─── */}
      {/* ভবিষ্যতে নতুন চার্ট বা গ্রাফ অ্যাড করলে এই গ্রিডের ভেতরেই চমৎকারভাবে ফিট হয়ে যাবে */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ১. রেভিনিউ এবং পেমেন্ট অ্যানালিটিক্স চার্ট (Recharts) */}
        <div className="lg:col-span-2">
          <PaymentAnalytics payments={payments} />
        </div>

        {/* ২. নতুন টপ ৫ ডক্টর ট্রায়াঙ্গেল বার চার্ট */}
        <div className="lg:col-span-2">
          <TopDoctorsChart doctorsData={topDoctors} />
        </div>

        {/* উদাহরণ: ভবিষ্যতে অ্যাপয়েন্টমেন্ট বা ডক্টর অ্যানালিটিক্স অ্যাড করার জায়গা */}
        {/* 
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-xl h-72 flex items-center justify-center text-gray-500 text-sm">
          <p>Future Appointment Analytics Component goes here...</p>
        </div>
        
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-xl h-72 flex items-center justify-center text-gray-500 text-sm">
          <p>Future Doctor/Patient Growth Component goes here...</p>
        </div> 
        */}
      </div>
    </div>
  );
}
