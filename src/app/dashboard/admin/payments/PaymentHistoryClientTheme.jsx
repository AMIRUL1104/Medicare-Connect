"use client";

import React, { useState, useMemo } from "react";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Search,
  Calendar,
  Clock,
} from "lucide-react";

export default function PaymentHistoryClientTheme({ initialPayments = [] }) {
  const [payments] = useState(initialPayments);
  const [searchQuery, setSearchQuery] = useState("");

  // ── ১. পেমেন্ট ডেটা থেকে Stats ক্যালকুলেশন ──────────────────
  const stats = useMemo(() => {
    let totalRevenue = 0;
    const todayStr = new Date().toISOString().split("T")[0]; // "2026-06-27" এর মতো ফরম্যাট
    let todayTransactions = 0;

    payments.forEach((p) => {
      totalRevenue += p.amount || 0;
      if (p.paymentDate === todayStr) {
        todayTransactions++;
      }
    });

    const averageAmount =
      payments.length > 0 ? Math.round(totalRevenue / payments.length) : 0;

    return {
      totalRevenue,
      todayTransactions,
      averageAmount,
      totalCount: payments.length,
    };
  }, [payments]);

  // ── ২. সার্চ ফিল্টারিং লজিক (Transaction ID, Patient বা Doctor এর নাম দিয়ে) ──
  const filteredPayments = useMemo(() => {
    if (!searchQuery.trim()) return payments;
    const query = searchQuery.toLowerCase();
    return payments.filter(
      (p) =>
        p.transactionId?.toLowerCase().includes(query) ||
        p.patientName?.toLowerCase().includes(query) ||
        p.doctorName?.toLowerCase().includes(query),
    );
  }, [payments, searchQuery]);

  return (
    <div className="space-y-6">
      {/* ─── STATS CARDS SECTION ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* মোট রেভিনিউ */}
        <div className="bg-[#111827] p-5 rounded-xl border border-gray-800 border-l-4 border-l-emerald-500 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Total Revenue
            </p>
            <p className="text-2xl font-bold text-white mt-1.5">
              ৳{stats.totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <DollarSign className="text-2xl" />
          </div>
        </div>

        {/* মোট ট্রানজেকশন সংখ্যা */}
        <div className="bg-[#111827] p-5 rounded-xl border border-gray-800 border-l-4 border-l-[#38BDF8] shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#38BDF8]/80 uppercase tracking-wider">
              Total Payments
            </p>
            <p className="text-2xl font-bold text-white mt-1.5">
              {stats.totalCount}
            </p>
          </div>
          <div className="p-3 bg-[#38BDF8]/10 text-[#38BDF8] rounded-lg">
            <CreditCard className="text-2xl" />
          </div>
        </div>

        {/* এভারেজ পেমেন্ট */}
        <div className="bg-[#111827] p-5 rounded-xl border border-gray-800 border-l-4 border-l-purple-500 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
              Average Fee
            </p>
            <p className="text-2xl font-bold text-white mt-1.5">
              ৳{stats.averageAmount}
            </p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
            <TrendingUp className="text-2xl" />
          </div>
        </div>

        {/* আজকের ট্রানজেকশন */}
        <div className="bg-[#111827] p-5 rounded-xl border border-gray-800 border-l-4 border-l-amber-500 shadow-lg flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-amber-500/80 uppercase tracking-wider">
              {`Today's Sales`}
            </p>
            <p className="text-2xl font-bold text-white mt-1.5">
              {stats.todayTransactions}
            </p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <Calendar className="text-2xl" />
          </div>
        </div>
      </div>

      {/* ─── SEARCH CONTROLLER ─── */}
      <div className="flex items-center max-w-md bg-[#111827] rounded-xl border border-gray-800 px-3.5 py-2 group focus-within:border-[#38BDF8]/50 transition-all">
        <Search className="text-gray-500 group-focus-within:text-[#38BDF8] mr-2 text-lg" />
        <input
          type="text"
          placeholder="Search by TxID, Patient or Doctor..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-sm text-gray-200 placeholder-gray-500 focus:outline-none w-full"
        />
      </div>

      {/* ─── PAYMENT HISTORY TABLE ─── */}
      <div className="bg-[#111827] rounded-xl border border-gray-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800 text-left text-sm">
            <thead className="bg-[#1F2937] text-xs uppercase font-medium text-gray-400 tracking-wider">
              <tr>
                <th className="px-6 py-4.5">Transaction ID</th>
                <th className="px-6 py-4.5">Patient Name</th>
                <th className="px-6 py-4.5">Doctor Name</th>
                <th className="px-6 py-4.5">Appointment Schedule</th>
                <th className="px-6 py-4.5">Payment Date</th>
                <th className="px-6 py-4.5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-gray-300">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-16 text-center text-gray-500 font-medium"
                  >
                    No payment histories found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-[#1F2937]/50 transition-colors"
                  >
                    {/* ট্রানজেকশন আইডি */}
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-[#38BDF8] font-semibold tracking-wide">
                      {payment.transactionId}
                    </td>

                    {/* পেশেন্ট নাম */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-50">
                        {payment.patientName}
                      </div>
                    </td>

                    {/* ডক্টর নাম */}
                    <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                      {payment.doctorName}
                    </td>

                    {/* অ্যাপয়েন্টমেন্ট ডেট ও টাইম স্লট */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-300 text-xs font-medium flex items-center gap-1">
                        <Calendar className="text-gray-500" />{" "}
                        {payment.appointmentDate}
                      </div>
                      <div className="text-[10px] font-bold text-gray-400 bg-gray-800 border border-gray-700 px-1.5 py-0.5 rounded inline-block mt-1">
                        <Clock className="inline mr-1" />{" "}
                        {payment.appointmentTime}
                      </div>
                    </td>

                    {/* পেমেন্ট সাকসেস ডেট */}
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400">
                      {payment.paymentDate}
                    </td>

                    {/* অ্যামাউন্ট / টাকা */}
                    <td className="px-6 py-4 whitespace-nowrap text-right font-bold text-lg text-emerald-400">
                      ৳{payment.amount}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
