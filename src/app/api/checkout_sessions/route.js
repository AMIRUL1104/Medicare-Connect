import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // ১. রিকোয়েস্ট বডি থেকে ডেটা নিন
    const body = await request.json();
    // console.log("Backend Received Body:", body); // টার্মিনালে চেক করার জন্য লগার

    const { appointmentId, doctorName, appointmentFee } = body;

    // ২. ফি-টি সঠিক নাম্বার কিনা নিশ্চিত করুন এবং সেন্টে কনভার্ট করুন
    const parsedFee = parseInt(appointmentFee, 10);

    if (isNaN(parsedFee)) {
      return NextResponse.json(
        {
          error: `Invalid or missing appointmentFee. Received: ${appointmentFee}`,
        },
        { status: 400 },
      );
    }

    // ৩. Stripe Checkout Session তৈরি করুন
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "bdt", // 'usd' পরিবর্তন করে 'bdt' করুন
            product_data: {
              name: doctorName || "Doctor Appointment",
            },
            // ৮০০ টাকা হলে ৮০০ * ১০০ = ৮০০০০ পয়সা স্ট্রাইপকে পাঠাচ্ছি
            unit_amount: parsedFee * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        appointmentId: appointmentId,
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/${appointmentId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Detailed Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
