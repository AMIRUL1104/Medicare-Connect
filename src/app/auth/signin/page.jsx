import React from "react";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Sign In | MediCare Connect",
  description:
    "Log in to your secure MediCare Connect account to manage your medical dashboard, appointments, and prescriptions.",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ক্লায়েন্ট ফর্ম কম্পোনেন্ট */}
      <LoginForm />
    </div>
  );
}
