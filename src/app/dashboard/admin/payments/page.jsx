// src/app/admin/payments/page.js
import React from "react";
import { getPaymentHistory } from "@/services/server/api"; // আপনার API পাথ অনুযায়ী পরিবর্তন করুন
import PaymentHistoryClientTheme from "./PaymentHistoryClientTheme";
import PaymentAnalytics from "../analytics/PaymentAnalytics";

export default async function AdminPaymentsPage() {
  const allPayments = await getPaymentHistory();

  return (
    <div className="p-6 bg-[#0B1120] min-h-screen text-gray-100">
      <div className="mb-8 border-b border-gray-800 pb-5">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Payment History
        </h1>
        <p className="text-base text-gray-400 mt-1">
          Monitor revenue, transaction logs, and incoming payments for{" "}
          <span className="text-[#38BDF8] font-medium">MediCare Connect</span>.
        </p>
      </div>

      <PaymentAnalytics payments={allPayments} />
      {/* ক্লায়েন্ট কম্পোনেন্ট */}
      <PaymentHistoryClientTheme initialPayments={allPayments} />
    </div>
  );
}
