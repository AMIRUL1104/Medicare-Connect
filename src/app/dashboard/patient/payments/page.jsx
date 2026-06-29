import React from "react";
import { getUserSession } from "@/services/core/session";
import { getPaymentsByPatientId } from "@/services/server/api";
import {
  CreditCard,
  Calendar,
  ArrowUpRight,
  DollarSign,
  CheckCircle2,
  Hash,
} from "lucide-react";

export const metadata = {
  title: "Payment History | MediCare Connect",
  description:
    "Track and review all your past transaction history and billing invoices securely.",
};

async function PaymentHistoryPage() {
  const user = await getUserSession();

  // API থেকে ডাটা ফেচিং
  const paymentData = await getPaymentsByPatientId(user?.id);

  // ডাটা ডিফাইন করা (সেফটি হিসেবে ফলব্যাক অ্যারে ও ভ্যালু রাখা হয়েছে)
  const paymentsList = paymentData?.history || [];
  const totalPaidAmount = paymentData?.totalPaid || 0;

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-gray-100 p-3 sm:p-4 md:p-6 space-y-6 md:space-y-8">
      {/* হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800/60 pb-5 sm:pb-6">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Payment History
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 leading-normal">
            View all your successful transactions and premium session receipts.
          </p>
        </div>

        {/* টোটাল পেইড স্ট্যাটাস কার্ড */}
        <div className="bg-[#111625] border border-gray-800 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 sm:gap-4 shrink-0 w-full sm:w-auto sm:min-w-[220px]">
          <div className="p-2.5 sm:p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl shrink-0">
            <DollarSign className="size-4 sm:size-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-wider truncate">
              Total Amount Paid
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-emerald-400 mt-0.5">
              ${totalPaidAmount}
            </h3>
          </div>
        </div>
      </div>

      {/* কন্টেন্ট লিস্টিং কন্টেইনার */}
      <div>
        {paymentsList.length > 0 ? (
          <>
            {/* 📱 ১. মোবাইল ভিউ (কার্ড লেআউট) - md ব্রেকপয়েন্টের নিচে দেখাবে */}
            <div className="grid grid-cols-1 gap-3.5 md:hidden">
              {paymentsList.map((payment) => (
                <div
                  key={payment._id}
                  className="bg-[#111625] border border-gray-800 rounded-2xl p-4 space-y-3.5 shadow-md"
                >
                  {/* ডক্টর এবং স্ট্যাটাস */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-gray-100 text-sm">
                        {payment.doctorName}
                      </h4>
                      <div className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="size-3 shrink-0" />
                        <span className="truncate">
                          {payment.appointmentDate} ({payment.appointmentTime})
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize shrink-0">
                      <CheckCircle2 className="size-2.5" />
                      Paid
                    </span>
                  </div>

                  {/* ট্রানজেকশন আইডি এবং অ্যামাউন্ট */}
                  <div className="flex items-center justify-between gap-4 pt-2.5 border-t border-gray-800/40">
                    <div className="flex items-center gap-1 font-mono text-[10px] text-gray-400 bg-[#0A0E1A] px-2 py-0.5 rounded border border-gray-800/80 min-w-0">
                      <Hash className="size-3 text-blue-400 shrink-0" />
                      <span className="truncate select-all">
                        {payment.transactionId}
                      </span>
                    </div>
                    <div className="font-bold text-emerald-400 flex items-center text-sm shrink-0">
                      <span>${payment.amount}</span>
                      <ArrowUpRight className="size-3 ml-0.5 text-emerald-500" />
                    </div>
                  </div>

                  {/* পেমেন্টের সুনির্দিষ্ট ডেট */}
                  <div className="text-[10px] text-gray-400 flex items-center gap-1 pt-1">
                    <CreditCard className="size-3.5 text-purple-400 shrink-0" />
                    <span>Paid on: {payment.paymentDate}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 💻 ২. ডেক্সটপ ভিউ (টেবিল লেআউট) - md ব্রেকপয়েন্ট থেকে দেখাবে */}
            <div className="hidden md:block bg-[#111625] border border-gray-800 rounded-2xl p-5 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400 border-collapse">
                  <thead className="text-xs text-gray-400 uppercase bg-[#161D30] border border-gray-800">
                    <tr>
                      <th className="px-5 py-3.5 rounded-l-xl">Doctor</th>
                      <th className="px-5 py-3.5">Transaction ID</th>
                      <th className="px-5 py-3.5">Amount</th>
                      <th className="px-5 py-3.5">Payment Date</th>
                      <th className="px-5 py-3.5 text-right rounded-r-xl">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/40">
                    {paymentsList.map((payment) => (
                      <tr
                        key={payment._id}
                        className="hover:bg-[#161D30]/30 transition-colors group"
                      >
                        <td className="px-5 py-4">
                          <div className="font-semibold text-gray-200 group-hover:text-white transition-colors">
                            {payment.doctorName}
                          </div>
                          <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-1">
                            <Calendar className="size-3" />
                            <span>
                              Session: {payment.appointmentDate} (
                              {payment.appointmentTime})
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 font-mono text-xs text-gray-400 bg-[#0A0E1A] px-2.5 py-1 rounded-md border border-gray-800 w-fit">
                            <Hash className="size-3 text-blue-400 shrink-0" />
                            <span className="select-all">
                              {payment.transactionId}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-gray-200 flex items-center text-sm">
                            <span>${payment.amount}</span>
                            <ArrowUpRight className="size-3 text-emerald-500 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </td>
                        <td className="px-5 py-4 text-xs text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <CreditCard className="size-3.5 text-purple-400" />
                            <span>{payment.paymentDate}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize tracking-wide">
                            <CheckCircle2 className="size-3" />
                            Paid
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* ট্রানজেকশন না থাকলে নো ডাটা অ্যালার্ট */
          <div className="bg-[#111625] border border-gray-800 rounded-2xl p-12 text-center text-gray-500">
            <div className="flex flex-col items-center justify-center gap-2">
              <CreditCard className="size-8 text-gray-600" />
              <p className="text-sm">No transaction statements found.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentHistoryPage;
