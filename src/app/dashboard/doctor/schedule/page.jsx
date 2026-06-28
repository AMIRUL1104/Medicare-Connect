import React from "react";
import { getUserSession } from "@/services/core/session";
import { getDoctorById } from "@/services/server/api";
import ScheduleClient from "./ScheduleClient";

export const metadata = {
  title: "Manage Schedule | MediCare Connect",
  description:
    "Set your weekly availability, configure time slots, and optimize consultation hours.",
};

async function ManageSchedulePage() {
  // ১. সেশন থেকে লগইন করা ইউজারের ডাটা গেট করা
  const user = await getUserSession();

  // ২. ডক্টরের কালেকশন থেকে ডক্টরের স্পেসিফিক আইডি (বা userId) দিয়ে ডাটা ফেচ করা
  // আপনার এপিআই লজিক অনুযায়ী পাস করুন (এখানে user.id কে userId হিসেবে পাস করা হয়েছে)
  const doctorDetails = await getDoctorById(user.id, "userId");
  console.log(doctorDetails);

  // ৩. যদি ডাটাবেজে পূর্বে কোনো অবজেক্ট না থাকে, তবে ক্র্যাশ এড়াতে ফলব্যাক ডাটা
  const fallbackDoctorData = {
    userId: user?.id,
    availableDays: ["Saturday", "Monday", "Wednesday"],
    workingHours: [{ start: "10:00", end: "13:00" }],
    slotDuration: 30,
  };

  // ডাটাবেজে রেকর্ড থাকলে সেটি যাবে, না থাকলে ডিফল্ট স্ট্রাকচার পাস হবে
  const doctorData = doctorDetails || fallbackDoctorData;

  return (
    <div className="min-h-screen bg-[#0E121F] text-gray-100 p-4 md:p-6">
      <ScheduleClient doctorData={doctorData} />
    </div>
  );
}

export default ManageSchedulePage;
