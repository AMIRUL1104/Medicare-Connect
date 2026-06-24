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

async function PaymentHistoryPage() {
  const user = await getUserSession();

  // API থেকে ডাটা ফেচিং
  const paymentData = await getPaymentsByPatientId(user?.id);

  // ডাটা ডিফাইন করা (সেফটি হিসেবে ফলব্যাক অ্যারে ও ভ্যালু রাখা হয়েছে)
  const paymentsList = paymentData?.history || [];
  const totalPaidAmount = paymentData?.totalPaid || 0;

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-gray-100 p-6 space-y-8">
      {/* হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-800/60 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Payment History
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            View all your successful transactions and premium session receipts.
          </p>
        </div>

        {/* টোটাল পেইড স্ট্যাটাস কার্ড */}
        <div className="bg-[#111625] border border-gray-800 rounded-2xl p-4 flex items-center gap-4 shrink-0 sm:min-w-[220px]">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl">
            <DollarSign className="size-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
              Total Amount Paid
            </p>
            <h3 className="text-xl font-bold text-emerald-400 mt-0.5">
              ${totalPaidAmount}
            </h3>
          </div>
        </div>
      </div>

      {/* পেমেন্ট হিস্ট্রি টেবিল কন্টেইনার */}
      <div className="bg-[#111625] border border-gray-800 rounded-2xl p-5 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-[#161D30] border border-gray-800">
              <tr>
                <th className="px-5 py-3.5 rounded-l-xl">Doctor</th>
                <th className="px-5 py-3.5">Transaction ID</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Payment Date</th>
                <th className="px-5 py-3.5 text-right rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40">
              {paymentsList.length > 0 ? (
                paymentsList.map((payment) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-[#161D30]/30 transition-colors group"
                  >
                    {/* ডাক্তারের নাম ও অ্যাপয়েন্টমেন্ট ইনফো */}
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

                    {/* Transaction ID */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 font-mono text-xs text-gray-400 bg-[#0A0E1A] px-2.5 py-1 rounded-md border border-gray-800 w-fit">
                        <Hash className="size-3 text-blue-400 shrink-0" />
                        <span className="select-all">
                          {payment.transactionId}
                        </span>
                      </div>
                    </td>

                    {/* টাকার পরিমাণ */}
                    <td className="px-5 py-4">
                      <div className="font-bold text-gray-200 flex items-center text-sm">
                        <span>${payment.amount}</span>
                        <ArrowUpRight className="size-3 text-emerald-500 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </td>

                    {/* পেমেন্টের তারিখ ও সময় */}
                    <td className="px-5 py-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="size-3.5 text-purple-400" />
                        <span>{payment.paymentDate}</span>
                      </div>
                    </td>

                    {/* পেমেন্ট স্ট্যাটাস */}
                    <td className="px-5 py-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize tracking-wide">
                        <CheckCircle2 className="size-3" />
                        Paid
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                /* যদি কোনো ট্রানজেকশন না থাকে */
                <tr>
                  <td colSpan="5" className="text-center py-12 text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <CreditCard className="size-8 text-gray-600" />
                      <p className="text-sm">
                        No transaction statements found.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PaymentHistoryPage;
