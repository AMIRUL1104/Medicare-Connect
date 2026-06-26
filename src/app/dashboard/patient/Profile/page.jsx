import React from "react";
import { getUserSession } from "@/services/core/session";
import { getPatientById } from "@/services/server/api"; // আপনার API ফাংশন
import ProfileClientView from "./ProfileClientView";

async function ProfilePage() {
  const user = await getUserSession();
  // console.log(user);

  // ব্যাকএন্ড থেকে ডাটা ফেচিং
  let userDetails = await getPatientById(user.id);
  // console.log(userDetails);

  // try {
  //   userDetails = await getPatientById(user?.id);
  // } catch (error) {
  //   // এপিআই ডাউন থাকলে ফলব্যাক ব্যাকআপ অবজেক্ট
  //   userDetails = {
  //     _id: "6a342665c9bc21664fc4b28c",
  //     userId: user?.id || "6a3426656f84e13c1d72ad8c",
  //     name: user?.name || "Amirul Islam",
  //     email: user?.email || "sddscs@gmail.com",
  //     image:
  //       user?.photo ||
  //       "https://i.ibb.co/chCtHPgN/cff890d867f34c87a54b869dd28e65a8.png",
  //     gender: "male",
  //     phone: "01846153741",
  //     role: "patient",
  //     age: 24, // ডিফল্ট বা এক্সিস্টিং এক্সট্রা ফিল্ড
  //     city: "Dhaka", // ডিফল্ট বা এক্সিস্টিং এক্সট্রা ফিল্ড
  //   };
  // }

  return (
    <div className="min-h-screen bg-[#0E121F] text-gray-100 p-4 md:p-6">
      <ProfileClientView initialData={userDetails} user={user} />
    </div>
  );
}

export default ProfilePage;
