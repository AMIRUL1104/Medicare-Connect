import { NextResponse } from "next/server";
import { auth } from "./lib/auth"; // আপনার প্রজেক্ট অনুযায়ী পাথ ঠিক রাখুন
import { headers } from "next/headers";

/**
 * MIDDLEWARE CONFIG
 * - /doctor/:path+ দেওয়ার কারণে শুধু /doctor এর ভেতরের সাব-পাথগুলো ইন্টারসেপ্ট হবে।
 * - /dashboard/:path* আগের মতোই /dashboard এবং এর ভেতরের সব পাথ সিকিউর রাখবে।
 */
export const config = {
  matcher: ["/doctors/:path+", "/dashboard/:path*"],
};

/**
 * MAIN MIDDLEWARE FUNCTION
 */
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // STEP 1: Skip JSON file requests (Next.js data/assets fetches)
  if (pathname.endsWith(".json")) {
    return NextResponse.next();
  }

  // STEP 2: Get user's session data from authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // STEP 3: If no session, user is not authenticated
  // Redirect to login page
  if (!session) {
    const signinUrl = new URL("/auth/signin", request.url);

    // লগইন করার পর যাতে ইউজার আবার এই পেজেই ফেরত আসতে পারে
    signinUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signinUrl);
  }

  // STEP 4: User has valid session - allow access to protected route
  return NextResponse.next();
}
