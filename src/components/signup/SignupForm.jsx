"use client";

import { Controller, useForm } from "react-hook-form";

import RoleSelector from "@/components/Signup/RoleSelector";
import PhotoUpload from "@/components/Signup/PhotoUpload";
import DoctorFields from "@/components/Signup/DoctorFields";
import PasswordStrength from "@/components/Signup/PasswordStrength";
import SuccessModal from "@/components/Signup/SuccessModal";
import { Label } from "../ui/Label";
import { FieldError } from "../ui/FieldError";
import { Input } from "../ui/Input";
import { PasswordInput } from "../ui/PasswordInput";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { AddNewDoctor, AddNewPatient } from "@/services/server/action";
import GoogleSigninButton from "../ui/GoogleSigninButton";

// ─── Reusable field components ────────────────────────────────────

// ─── Main Form ─────────────────────────────────────────────────────

export default function SignupForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    control,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: undefined,
      photoUrl: "",
      terms: false,
    },
  });

  const role = watch("role");
  const password = watch("password");

  // ── Role handler ────────────────────────────────
  function handleRoleChange(value) {
    setValue("role", value, { shouldValidate: true });
    // রোল পরিবর্তন হলে ডক্টর স্পেসিফিক ট্রিগার বা এরর ক্লিয়ার করতে পারেন
  }

  // ── Photo upload handlers ───────────────────────
  function handlePhotoUploadComplete(url, uploadError) {
    if (uploadError) {
      setError("photoUrl", { type: "manual", message: uploadError });
      setValue("photoUrl", "");
    } else if (url) {
      clearErrors("photoUrl");
      setValue("photoUrl", url, { shouldValidate: true });
    } else {
      setValue("photoUrl", "");
    }
  }

  // ── Submit ──────────────────────────────────────
  async function onSubmit(userData) {
    try {
      const {
        fullName,
        email,
        password,
        photoUrl,
        experience,
        fee,
        gender,
        hospital,
        phone,
        qualifications,
        role,
        specialization,
      } = userData;

      // ১. প্রথমে Better Auth এ সাইন-আপ
      const { data, error } = await authClient.signUp.email({
        name: fullName,
        email,
        password,
        image: photoUrl,
        role,
      });

      // ২. কোনো এরর আসলে এখানেই আটকে দিন
      if (error) {
        console.error("Better Auth Error:", error.message);
        setError("root", { type: "manual", message: error.message });
        return;
      }

      // ৩. ডেটা সফলভাবে আসলে ডেটাবেজে সেভ করার লজিক
      if (data && data.user) {
        const userRole = data.user.role; // সঠিক রোল ট্র্যাক করার জন্য

        if (userRole === "patient") {
          const patientData = {
            userId: data.user.id,
            name: data.user.name,
            email: data.user.email,
            image: data.user.image,
            gender,
            phone,
            role: userRole,
          };
          const res = await AddNewPatient(patientData);
          console.log(res);
        }

        if (userRole === "doctor") {
          const doctorData = {
            userId: data.user.id,
            doctorName: data.user.name, // name -> doctorName
            email: data.user.email,
            profileImage: data.user.image, // image -> profileImage
            gender,
            phone,
            role: userRole,
            specialization,
            qualifications,
            experience: Number(experience), // ডেটাবেজ স্কিমা অনুযায়ী Number এ কনভার্ট করে নেওয়া নিরাপদ
            consultationFee: Number(fee), // fee -> consultationFee
            hospitalName: hospital, // hospital -> hospitalName

            // ডক্টর স্কিমার বাকি প্রয়োজনীয় ফিল্ডগুলো (যদি ফর্মে থাকে, নাহলে ডিফল্ট অ্যারে/ভ্যালু)
            availableDays: ["Saturday", "Monday", "Wednesday"],

            workingHours: [
              {
                start: "15:00",
                end: "19:00",
              },
            ],
            slotDuration: 30,

            verificationStatus: "pending", // সাইন-আপের সময় ডিফল্ট 'pending' বা 'verified' দিতে পারেন
          };

          const res = await AddNewDoctor(doctorData);
          console.log("Doctor db response:", res);
        }

        // সবকিছু সফল হলে সাকসেস মোডাল দেখান
        setShowSuccess(true);
      }
    } catch (err) {
      setError("root", {
        type: "manual",
        message: err.message || "Registration failed. Please try again.",
      });
    }
  }

  // ── Google Sign In ──────────────────────────────

  return (
    <>
      <SuccessModal show={showSuccess} role={role} />

      <div className="bg-white rounded-2xl p-7 lg:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_24px_rgba(14,165,233,0.08)]">
        {/* Mobile logo */}
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
          <h2 className="text-2xl font-bold text-[#1E293B]">
            Create Your Account
          </h2>
          <p className="text-[#64748B] text-sm mt-1">
            Start managing your healthcare journey.
          </p>
        </div>

        {/* Google button */}
        <GoogleSigninButton
          isGoogleLoading={isGoogleLoading}
          setIsGoogleLoading={setIsGoogleLoading}
        />

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#E2E8F0]" />
          <span className="text-xs text-[#94A3B8] font-medium whitespace-nowrap">
            or create account manually
          </span>
          <div className="flex-1 h-px bg-[#E2E8F0]" />
        </div>

        {/* Root error */}
        {errors.root && (
          <div className="bg-[#FFF5F5] border border-[#FECACA] rounded-lg px-4 py-3 mb-4 text-sm text-[#EF4444]">
            {errors.root.message}
          </div>
        )}

        {/* ── FORM ── */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName">
                Full Name <span className="text-[#EF4444]">*</span>
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Dr. Sarah Johnson"
                autoComplete="name"
                hasError={!!errors.fullName}
                {...register("fullName", {
                  required: "Full name is required.",
                })}
              />
              <FieldError error={errors.fullName} />
            </div>

            {/* Email */}
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

            {/* Phone + Gender */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="phone">
                  Phone <span className="text-[#EF4444]">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+880 1XXX-XXXXXX"
                  autoComplete="tel"
                  hasError={!!errors.phone}
                  {...register("phone", {
                    required: "Phone number is required.",
                  })}
                />
                <FieldError error={errors.phone} />
              </div>
              <div>
                <Label htmlFor="gender">
                  Gender <span className="text-[#EF4444]">*</span>
                </Label>
                <select
                  id="gender"
                  className={[
                    "w-full px-3.5 py-2.5 text-sm border-[1.5px] rounded-[10px] bg-white outline-none transition-all duration-200 cursor-pointer appearance-none",
                    "text-[#1E293B]",
                    errors.gender
                      ? "border-[#EF4444] shadow-[0_0_0_3px_rgba(239,68,68,0.10)]"
                      : "border-[#E2E8F0] focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.12)]",
                  ].join(" ")}
                  {...register("gender", {
                    required: "Please select your gender.",
                  })}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
                <FieldError error={errors.gender} />
              </div>
            </div>

            {/* Role Selector */}
            <Controller
              name="role"
              control={control}
              rules={{ required: "Selecting a role is required." }}
              render={({ fieldState }) => (
                <RoleSelector
                  value={role}
                  onChange={handleRoleChange}
                  error={fieldState.error}
                />
              )}
            />

            {/* Doctor-specific fields */}
            <DoctorFields
              register={register}
              errors={errors}
              visible={role === "doctor"}
            />

            {/* Profile Photo */}
            <Controller
              name="photoUrl"
              control={control}
              rules={{ required: "Profile photo is required." }}
              render={({ fieldState }) => (
                <PhotoUpload
                  onUploadComplete={handlePhotoUploadComplete}
                  error={fieldState.error}
                />
              )}
            />

            {/* Password */}
            <div>
              <Label htmlFor="password">
                Password <span className="text-[#EF4444]">*</span>
              </Label>
              <PasswordInput
                id="password"
                name="password"
                register={register}
                hasError={!!errors.password}
                autoComplete="new-password"
                placeholder="Min 6 chars, 1 number, 1 special"
                validationRules={{
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters.",
                  },
                  validate: {
                    hasNumber: (v) =>
                      /[0-9]/.test(v) || "Must contain at least one number.",
                    hasSpecial: (v) =>
                      /[^a-zA-Z0-9]/.test(v) ||
                      "Must contain at least one special character.",
                  },
                }}
              />
              <PasswordStrength password={password} />
              <FieldError error={errors.password} />
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword">
                Confirm Password <span className="text-[#EF4444]">*</span>
              </Label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                register={register}
                hasError={!!errors.confirmPassword}
                autoComplete="new-password"
                placeholder="Re-enter your password"
                validationRules={{
                  required: "Please confirm your password.",
                  validate: (value) =>
                    value === password || "Passwords do not match.",
                }}
              />
              <FieldError error={errors.confirmPassword} />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 mt-5">
            <input
              type="checkbox"
              id="terms"
              className="mt-0.5 w-4 h-4 rounded border-[#E2E8F0] accent-[#0EA5E9] cursor-pointer flex-shrink-0"
              {...register("terms", {
                required: "You must accept the terms and conditions.",
              })}
            />
            <label
              htmlFor="terms"
              className="text-xs text-[#64748B] cursor-pointer leading-relaxed"
            >
              I agree to the{" "}
              <a
                href="/terms"
                className="text-[#0EA5E9] font-medium hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-[#0EA5E9] font-medium hover:underline"
              >
                Privacy Policy
              </a>
              . Your data is protected under HIPAA compliance standards.
            </label>
          </div>
          <FieldError error={errors.terms} />

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-5 py-3 px-6 rounded-[10px] font-semibold text-white text-[15px] flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_4px_16px_rgba(14,165,233,0.35)] hover:-translate-y-px active:translate-y-0"
            style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)" }}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Creating account…
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Sign In link */}
        <p className="text-center text-sm text-[#64748B] mt-5">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#0EA5E9] font-semibold hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </>
  );
}
