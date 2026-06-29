import React, { useState } from "react";

export default function GoogleSigninButton({
  isGoogleLoading,
  setIsGoogleLoading,
}) {
  // ── Google Sign In ──────────────────────────────
  //   async function handleGoogleSignup() {
  //     setIsGoogleLoading(true);
  //     await signIn("google", { callbackUrl: "/dashboard" });
  //     setIsGoogleLoading(false);
  //   }

  // ── Google Sign In Handler ──────────────────────────
  async function handleGoogleLogin() {
    try {
      setIsGoogleLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackUrl: "/dashboard",
      });
    } catch (err) {
      toast.error("Google authentication failed.");
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={isGoogleLoading}
      className="w-full flex items-center justify-center gap-2.5 py-2.5 px-6 bg-white border-[1.5px] border-[#E2E8F0] rounded-[10px] text-[#1E293B] text-sm font-medium transition-all duration-200 hover:border-[#CBD5E1] hover:bg-[#F8FAFC] hover:shadow-md disabled:opacity-60"
    >
      {isGoogleLoading ? (
        <div className="w-4 h-4 border-2 border-[#CBD5E1] border-t-[#0EA5E9] rounded-full animate-spin" />
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.074 17.64 11.767 17.64 9.2z"
            fill="#4285F4"
          />
          <path
            d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
            fill="#34A853"
          />
          <path
            d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
            fill="#FBBC05"
          />
          <path
            d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.99C4.672 4.862 6.656 3.58 9 3.58z"
            fill="#EA4335"
          />
        </svg>
      )}
      Continue with Google
    </button>
  );
}
