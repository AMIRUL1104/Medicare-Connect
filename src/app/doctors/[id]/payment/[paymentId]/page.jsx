import {
  getAppointmentByPaymentId,
  getDoctorById,
} from "@/services/server/api";
import React from "react";
import PayButton from "./PayButton";
import Link from "next/link";

async function PaymentPage({ params }) {
  const { paymentId, id } = await params;

  // ডেটা ফেচিং
  const appointment = await getAppointmentByPaymentId(paymentId);
  const doctor = await getDoctorById(id, "id");
  // console.log(id);
  // console.log(doctor);

  const { doctorName, consultationFee, date, slot, patientName } = appointment;
  // ডক্টরের এক্সট্রা ইনফো (যেমন স্পেশালাইজেশন বা ইমেজ) যদি অবজেক্টে থাকে, তা ডিস্ট্রাকচার করে নিতে পারেন
  const specialization = doctor?.specialization || "Specialist";
  const hospital = doctor?.hospitalName || "Medical Center";
  // const consultationFee = doctor?.consultationFee || "Free";

  return (
    <main className="bg-[#F8FAFC] min-h-screen py-10 lg:py-16 antialiased">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        {/* Back Button / Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#64748B] hover:text-[#0EA5E9] transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── LEFT COLUMN: APPOINTMENT & DOCTOR INFO ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Title */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#1E293B]">
                Checkout & Review
              </h1>
              <p className="text-[#64748B] text-sm mt-1">
                Please review your appointment schedule before proceeding to
                payment.
              </p>
            </div>

            {/* Doctor Info Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              {/* Doctor Avatar Placeholder */}
              <div className="w-14 h-14 rounded-xl bg-[#F0F9FF] border border-[#BEE3F8] text-[#0EA5E9] flex items-center justify-center font-bold text-xl shrink-0">
                {doctorName ? doctorName[0] : "D"}
              </div>
              <div className="space-y-1">
                <span className="inline-block bg-[#F0F9FF] text-[#0EA5E9] text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#BEE3F8]">
                  Selected Specialist
                </span>
                <h2 className="text-lg font-bold text-[#1E293B]">
                  {doctorName}
                </h2>
                <p className="text-xs text-[#64748B] font-medium">
                  {specialization} • {hospital}
                </p>
              </div>
            </div>

            {/* Schedule Details Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
              <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wider ">
                Appointment Schedule
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Date */}
                <div className="flex items-center gap-3.5 p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  <div className="p-2 bg-white rounded-lg border border-[#E2E8F0] text-[#64748B]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#64748B] uppercase">
                      Date
                    </p>
                    <p className="text-sm font-semibold text-[#1E293B]">
                      {date}
                    </p>
                  </div>
                </div>

                {/* Time Slot */}
                <div className="flex items-center gap-3.5 p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  <div className="p-2 bg-white rounded-lg border border-[#E2E8F0] text-[#64748B]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#64748B] uppercase">
                      Time Slot
                    </p>
                    <p className="text-sm font-semibold text-[#0EA5E9]">
                      {slot}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: ORDER SUMMARY & PAY BUTTON ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_20px_rgba(14,165,233,0.03)] p-6 sticky top-6 space-y-6">
              <h3 className="text-base font-bold text-[#1E293B]">
                Order Summary
              </h3>

              {/* Short Breakdown */}
              <div className="space-y-3 text-sm border-b border-[#E2E8F0] pb-4">
                <div className="flex justify-between text-[#64748B]">
                  <span>Patient Name</span>
                  <span className="font-semibold text-[#1E293B] max-w-37.5 truncate">
                    {patientName}
                  </span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Consultation Fee</span>
                  <span className="font-semibold text-[#1E293B]">
                    ${consultationFee}
                  </span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Service Charge</span>
                  <span className="font-semibold text-[#16A34A]">Free</span>
                </div>
              </div>

              {/* Total Price */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-[#1E293B]">
                  Total Amount
                </span>
                <span className="text-2xl font-black text-[#1E293B]">
                  ${consultationFee}
                </span>
              </div>

              {/* Secure Payment Note */}
              <div className="flex items-center gap-2.5 bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl text-xs text-[#64748B]">
                <svg
                  className="w-4 h-4 text-[#16A34A] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Secured and encrypted payment via Stripe.</span>
              </div>

              {/* Pay Button Integration */}
              <div className="pt-2">
                <PayButton appointment={appointment} doctor={doctor} />
              </div>

              {/* Payment ID Tracker Footer */}
              <p className="text-center text-[10px] font-mono text-[#94A3B8] tracking-tight">
                Ref ID: {paymentId}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PaymentPage;
