"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

// কাস্টম UI উপাদানসমূহ
import { FieldError } from "@/components/ui/FieldError";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import Logo from "@/components/shared/Logo";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/"; // ডিফল্ট হিসেবে ড্যাশবোর্ড

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // ── Email/Password Sign In Handler ──────────────────
  async function onSubmit(data) {
    try {
      const { email, password } = data;

      const { data: session, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        console.error("Authentication Error:", error.message);
        setError("root", { type: "manual", message: error.message });
        return;
      }

      if (session) {
        toast.success("Welcome back to MediCare Connect!");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("root", {
        type: "manual",
        message:
          err.message || "An unexpected error occurred. Please try again.",
      });
    }
  }

  return (
    <div className="w-full max-w-md bg-[#111827] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.3)] z-10">
      {/* ব্র্যান্ডিং লোগো */}
      <div className="flex items-center gap-2.5 mb-6 justify-center sm:justify-start">
        <Logo />
      </div>

      {/* হেডিং */}
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
          Sign in to continue your healthcare journey.
        </p>
      </div>

      {/* গুগল সাইন ইন বাটন */}

      {/* ডিভাইডার */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-800" />
        <span className="text-[11px] text-gray-500 font-medium font-mono uppercase tracking-wider whitespace-nowrap">
          or sign in manually
        </span>
        <div className="flex-1 h-px bg-gray-800" />
      </div>

      {/* গ্লোবাল ফর্ম এরর অ্যালার্ট */}
      {errors.root && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-5 text-xs text-red-400 font-medium flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
          {errors.root.message}
        </div>
      )}

      {/* ── সাইন ইন ফর্ম ── */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* ইমেইল অ্যাড্রেস */}
        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="text-gray-300 text-xs font-semibold"
          >
            Email Address <span className="text-red-400">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="sarah@hospital.com"
            autoComplete="email"
            className="bg-[#1F2937] border-gray-700 text-white placeholder-gray-500 focus:border-[#38BDF8] focus:ring-[#38BDF8]"
            hasError={!!errors.email}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address.",
              },
            })}
          />
          <FieldError error={errors.email} />
        </div>

        {/* পাসওয়ার্ড */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <Label
              htmlFor="password"
              className="text-gray-300 text-xs font-semibold mb-0"
            >
              Password <span className="text-red-400">*</span>
            </Label>
            <a
              href="/forgot-password"
              className="text-xs font-medium text-[#38BDF8] hover:text-[#0EA5E9] transition-colors"
            >
              Forgot Password?
            </a>
          </div>
          <PasswordInput
            id="password"
            name="password"
            register={register}
            hasError={!!errors.password}
            autoComplete="current-password"
            placeholder="Enter your password"
            validationRules={{
              required: "Password is required.",
            }}
          />
          <FieldError error={errors.password} />
        </div>

        {/* রিমেম্বার মি চেকবক্স */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="rememberMe"
            className="w-4 h-4 rounded border-gray-700 bg-[#1F2937] accent-[#38BDF8] cursor-pointer"
            {...register("rememberMe")}
          />
          <label
            htmlFor="rememberMe"
            className="text-xs text-gray-400 cursor-pointer select-none transition-colors hover:text-gray-300"
          >
            Remember me on this device
          </label>
        </div>

        {/* সাবমিট বাটন */}
        <button
          type="submit"
          disabled={isSubmitting || isGoogleLoading}
          className="w-full mt-2 bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0B1120] font-bold text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(56,189,248,0.15)] hover:shadow-[0_4px_25px_rgba(56,189,248,0.3)] active:scale-[0.99]"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-[#0B1120]/40 border-t-[#0B1120] rounded-full animate-spin" />
              Signing in…
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* সাইন আপ রিডাইরেক্ট */}
      <p className="text-center text-xs text-gray-400 mt-6 tracking-wide">
        Don&apos;t have an account?{" "}
        <a
          href="/auth/signup"
          className="text-[#38BDF8] font-semibold hover:underline transition-colors"
        >
          Create Account
        </a>
      </p>
    </div>
  );
}
