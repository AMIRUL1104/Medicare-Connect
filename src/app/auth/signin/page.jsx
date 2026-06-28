"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// আপনার বিদ্যমান কাস্টম UI উপাদানসমূহ

import { FieldError } from "@/components/ui/FieldError";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { GoogleSigninButton } from "@/components/ui/GoogleSigninButton";

export const metadata = {
  title: "Sign In | MediCare Connect",
  description:
    "Log in to your secure MediCare Connect account to manage your medical dashboard, appointments, and prescriptions.",
};

export default function LoginForm() {
  const router = useRouter();
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
        router.push("/");
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
    <div className="bg-white rounded-2xl p-7 max-w-lg lg:p-8 mx-auto my-auto shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_24px_rgba(14,165,233,0.08)]">
      {/* Mobile Logo */}
      <div className="flex items-center gap-2 mb-5 lg:hidden">
        <div className="w-8 h-8 rounded-lg bg-[#0EA5E9] flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <span className="font-bold text-[#1E293B]">MediCare Connect</span>
      </div>

      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1E293B]">Welcome Back</h2>
        <p className="text-[#64748B] text-sm mt-1">
          Sign in to continue your healthcare journey.
        </p>
      </div>

      {/* Google Sign In Button */}

      <GoogleSigninButton
        isGoogleLoading={isGoogleLoading}
        setIsGoogleLoading={setIsGoogleLoading}
      />

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-[#E2E8F0]" />
        <span className="text-xs text-[#94A3B8] font-medium whitespace-nowrap">
          or sign in manually
        </span>
        <div className="flex-1 h-px bg-[#E2E8F0]" />
      </div>

      {/* Global Form/Root Error */}
      {errors.root && (
        <div className="bg-[#FFF5F5] border border-[#FECACA] rounded-lg px-4 py-3 mb-4 text-sm text-[#EF4444]">
          {errors.root.message}
        </div>
      )}

      {/* ── Sign In Form ── */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-4">
          {/* Email Address */}
          <div>
            <Label htmlFor="email">
              Email Address <span className="text-[#EF4444]">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="sarah@hospital.com"
              autoComplete="email"
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

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="password" className="!mb-0">
                Password <span className="text-[#EF4444]">*</span>
              </Label>
              <a
                href="/forgot-password"
                className="text-xs font-semibold text-[#0EA5E9] hover:underline"
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
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="rememberMe"
            className="w-4 h-4 rounded border-[#E2E8F0] accent-[#0EA5E9] cursor-pointer"
            {...register("rememberMe")}
          />
          <label
            htmlFor="rememberMe"
            className="text-xs text-[#64748B] cursor-pointer select-none"
          >
            Remember me on this device
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isGoogleLoading}
          className="w-full mt-5 py-3 px-6 rounded-[10px] font-semibold text-white text-[15px] flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_4px_16px_rgba(14,165,233,0.35)] hover:-translate-y-px active:translate-y-0"
          style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)" }}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Signing in…
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Redirect to Sign Up */}
      <p className="text-center text-sm text-[#64748B] mt-5">
        Don&apos;t have an account?{" "}
        <a
          href="/auth/signup"
          className="text-[#0EA5E9] font-semibold hover:underline"
        >
          Create Account
        </a>
      </p>
    </div>
  );
}
