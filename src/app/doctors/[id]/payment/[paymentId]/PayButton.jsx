"use client";
import React, { useState } from "react";

function PayButton({ appointment, doctor }) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // এখানে আপনার ডেটাবেস থেকে অ্যাপয়েন্টমেন্টের ডিটেইলস (appointmentId, doctorName, appointmentFee) থাকতে হবে
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentId: appointment._id, // আপনার অ্যাপয়েন্টমেন্ট আইডি
          doctorName: doctor.doctorName, // ডাক্তারের নাম
          appointmentFee: doctor.consultationFee, // ডাক্তারের ফি (যেমন: 50 বা 500)
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
        setIsLoading(false);
      } else {
        console.error("Backend Error Response:", data); // ব্যাকএন্ড থেকে কী এরর আসলো তা দেখতে
        alert(
          `Payment session creation failed: ${data.error || "Unknown error"}`,
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full py-3.5 px-6 rounded-xl font-semibold text-white text-[15px] flex items-center justify-center gap-2.5 transition-all duration-200 shadow-[0_4px_18px_rgba(14,165,233,0.25)] hover:shadow-[0_6px_24px_rgba(14,165,233,0.35)] hover:-translate-y-px active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      style={{
        background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
      }}
    >
      {isLoading ? (
        <>
          {/* loading spinner svg */}
          <svg
            className="animate-spin h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        <>
          {/* lock icon svg for trust badge */}
          <svg
            className="w-4 h-4 text-white/90"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <span className="capitalize">Confirm Checkout</span>
        </>
      )}
    </button>
  );
}

export default PayButton;
