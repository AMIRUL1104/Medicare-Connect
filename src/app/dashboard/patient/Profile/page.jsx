import React from "react";
import { getUserSession } from "@/services/core/session";
import { getPatientById } from "@/services/server/api"; // আপনার API ফাংশন
import ProfileClientView from "./ProfileClientView";

export const metadata = {
  title: "My Profile | MediCare Connect",
  description:
    "Update your personal health record, medical details, and avatar configuration.",
};

async function ProfilePage() {
  const user = await getUserSession();
  // console.log(user);

  // ব্যাকএন্ড থেকে ডাটা ফেচিং
  let userDetails = await getPatientById(user.id);

  return (
    <div className="min-h-screen bg-[#0E121F] text-gray-100 p-4 md:p-6">
      <ProfileClientView initialData={userDetails} user={user} />
    </div>
  );
}

export default ProfilePage;
