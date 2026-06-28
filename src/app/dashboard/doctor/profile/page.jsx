import React from "react";
import { getUserSession } from "@/services/core/session";
import { getDoctorById } from "@/services/server/api";
import DoctorProfileClient from "./DoctorProfileClient";

export const metadata = {
  title: "Doctor Profile | MediCare Connect",
  description:
    "Update your medical degrees, specializations, biography, and professional clinic details.",
};

async function DoctorProfilePage() {
  const user = await getUserSession();

  // ডক্টরের আইডি দিয়ে ডাটাবেজ থেকে তার প্রোফাইল নিয়ে আসা
  const doctorData = await getDoctorById(user.id, "userId");
  // console.log("doctor details : ", doctorData);

  // ডাটাবেজে রেকর্ড না থাকলে ক্র্যাশ এড়াতে ফলব্যাক অবজেক্ট
  const fallbackData = {
    userId: user?.id,
    doctorName: user?.name || "Dr. Professional",
    profileImage: user?.photo || null,
    specialization: "Not Set",
    qualifications: "Not Set",
    experience: 0,
    consultationFee: 0,
    hospitalName: "Not Set",
    verificationStatus: "pending",
  };

  const finalDoctorData = doctorData || fallbackData;

  return (
    <div className="min-h-screen bg-[#0E121F] text-gray-100 p-4 md:p-6">
      <DoctorProfileClient initialData={finalDoctorData} />
    </div>
  );
}

export default DoctorProfilePage;
