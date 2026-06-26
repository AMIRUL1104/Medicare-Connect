import { redirect } from "next/navigation";
import Link from "next/link";
import { stripe } from "@/lib/stripe"; // আপনার পাথ ঠিক আছে
import { newPayment, updateAppointmentStatus } from "@/services/server/action";
import { getAppointmentByPaymentId } from "@/services/server/api";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  // ১. Stripe checkout session রিট্রিভ করা
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  // ২. সেশন অবজেক্ট থেকে স্ট্যাটাস চেক করা
  if (checkoutSession.status === "open") {
    return redirect("/");
  }

  if (checkoutSession.status === "complete") {
    const appointmentId = checkoutSession.metadata?.appointmentId;
    const customerEmail = checkoutSession.customer_details?.email;

    // ৩. ডেটাবেস আপডেট লজিক
    const updatedPayment = await updateAppointmentStatus({
      paymentStatus: "confirmed",
      id: appointmentId,
    });

    if (updatedPayment.modifiedCount === 1) {
      // ৪. অ্যাপয়েন্টমেন্ট ডেটা ফেচ করা
      const appointment = await getAppointmentByPaymentId(appointmentId);
      const {
        doctorName,
        consultationFee,
        date,
        slot,
        patientName,
        patientId,
        doctorId,
      } = appointment;

      const paymentHistory = {
        appointmentId: appointmentId,
        patientId: patientId,
        doctorId: doctorId,
        amount: consultationFee,
        transactionId: checkoutSession.payment_intent.id,
        paymentDate: date,
        doctorName: doctorName,
        patientName: patientName,
        appointmentDate: date,
        appointmentTime: slot,
      };

      const res = await newPayment(paymentHistory);
      // console.log("Payment db response:", res);

      return (
        <main className="bg-[#F8FAFC] min-h-screen flex items-center justify-center p-4 antialiased">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-[0_4px_30px_rgba(14,165,233,0.05)] border border-[#E2E8F0] overflow-hidden p-6 lg:p-8 text-center">
            {/* Success Icon Animated Box */}
            <div className="mx-auto my-4 w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center border border-[#DCFCE7]">
              <svg
                className="w-8 h-8 text-[#16A34A]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Header Text */}
            <h1 className="text-2xl font-bold text-[#1E293B] mt-4">
              Payment Successful!
            </h1>
            <p className="text-sm text-[#64748B] mt-2 leading-relaxed">
              Your appointment has been successfully scheduled. A confirmation
              email has been sent to{" "}
              <span className="font-semibold text-[#1E293B]">
                {customerEmail}
              </span>
              .
            </p>

            {/* Receipt Divider Line */}
            <div className="flex items-center gap-2 my-6">
              <div className="flex-1 h-px bg-[#E2E8F0] border-dashed border-t" />
              <span className="text-[11px] uppercase font-bold text-[#94A3B8] tracking-wider">
                Appointment Details
              </span>
              <div className="flex-1 h-px bg-[#E2E8F0] border-dashed border-t" />
            </div>

            {/* Info Cards / Details List */}
            <div className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-4 text-left space-y-3.5">
              <div className="flex justify-between items-start">
                <span className="text-xs font-medium text-[#64748B]">
                  Doctor
                </span>
                <span className="text-sm font-semibold text-[#1E293B] text-right">
                  {doctorName}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-[#64748B]">
                  Patient
                </span>
                <span className="text-sm font-semibold text-[#1E293B]">
                  {patientName}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-[#64748B]">Date</span>
                <span className="text-sm font-semibold text-[#1E293B]">
                  {date}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-[#64748B]">
                  Time Slot
                </span>
                <span className="text-sm font-semibold text-[#0EA5E9] bg-[#F0F9FF] px-2.5 py-1 rounded-md text-xs border border-[#BEE3F8]">
                  {slot}
                </span>
              </div>

              <div className="h-px bg-[#E2E8F0] pt-1" />

              <div className="flex justify-between items-center pt-1">
                <span className="text-xs font-bold text-[#1E293B]">
                  Amount Paid
                </span>
                <span className="text-base font-bold text-[#16A34A]">
                  ${consultationFee}
                </span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="mt-8 space-y-3">
              <Link
                href="/dashboard/patient"
                className="w-full py-3 px-6 rounded-[12px] font-semibold text-white text-[15px] flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_4px_16px_rgba(14,165,233,0.2)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.3)] hover:-translate-y-px active:translate-y-0"
                style={{
                  background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                }}
              >
                Go to Dashboard
              </Link>

              <Link
                href="/"
                className="block text-xs font-medium text-[#64748B] hover:text-[#0EA5E9] transition-colors py-1"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      );
    }
  }

  // যদি কন্ডিশন না মিলে, তবে সেফটি রিডাইরেক্ট বা একটি ফলব্যাক মেসেজ
  return redirect("/");
}
