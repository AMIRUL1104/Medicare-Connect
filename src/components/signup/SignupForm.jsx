"use client";

import { Controller, useForm } from "react-hook-form";

import { Label } from "../ui/Label";
import { FieldError } from "../ui/FieldError";
import { Input } from "../ui/Input";
import { PasswordInput } from "../ui/PasswordInput";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { AddNewDoctor, AddNewPatient } from "@/services/server/action";

import DoctorFields from "./DoctorFields";
import SuccessModal from "./SuccessModal";
import RoleSelector from "./RoleSelector";
import PhotoUpload from "./PhotoUpload";
import PasswordStrength from "./PasswordStrength";

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

  function handleRoleChange(value) {
    setValue("role", value, { shouldValidate: true });
  }

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

      const { data, error } = await authClient.signUp.email({
        name: fullName,
        email,
        password,
        image: photoUrl,
        role,
        isSuspended: false,
      });

      if (error) {
        console.error("Better Auth Error:", error.message);
        setError("root", { type: "manual", message: error.message });
        return;
      }

      if (data && data.user) {
        const userRole = data.user.role;

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
          // console.log(res);
        }

        if (userRole === "doctor") {
          const doctorData = {
            userId: data.user.id,
            doctorName: data.user.name,
            email: data.user.email,
            profileImage: data.user.image,
            gender,
            phone,
            role: userRole,
            specialization,
            qualifications,
            experience: Number(experience),
            consultationFee: Number(fee),
            hospitalName: hospital,
            availableDays: ["Saturday", "Monday", "Wednesday"],
            workingHours: [
              {
                start: "15:00",
                end: "19:00",
              },
            ],
            slotDuration: 30,
            verificationStatus: "pending",
          };

          const res = await AddNewDoctor(doctorData);
          // console.log("Doctor db response:", res);
        }

        setShowSuccess(true);
      }
    } catch (err) {
      setError("root", {
        type: "manual",
        message: err.message || "Registration failed. Please try again.",
      });
    }
  }

  return (
    <>
      <SuccessModal show={showSuccess} role={role} />

      {/* রেসপন্সিভ চেঞ্জ: p-4 থেকে শুরু করে md/lg স্ক্রিনে প্যাডিং বাড়ানো হয়েছে */}
      <div className="w-full max-w-md mx-auto bg-[#111827] border border-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative overflow-hidden backdrop-blur-md">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-5 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-[#0EA5E9] flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.4)] flex-shrink-0">
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
          <span className="font-bold text-gray-100 text-sm sm:text-base whitespace-nowrap">
            MediCare Connect
          </span>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-100">
            Create Your Account
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Start managing your healthcare journey.
          </p>
        </div>

        {/* Divider */}
        {/* রেসপন্সিভ চেঞ্জ: whitespace-normal ব্যবহার করা হয়েছে যাতে অতি ক্ষুদ্র স্ক্রিনে টেক্সট ভেঙে না যায় */}
        <div className="flex items-center gap-2 my-5">
          <div className="flex-1 h-px bg-gray-800" />
          <span className="text-[10px] sm:text-xs text-gray-400 font-medium text-center px-1">
            or create account manually
          </span>
          <div className="flex-1 h-px bg-gray-800" />
        </div>

        {/* Root error */}
        {errors.root && (
          <div className="bg-red-950/40 border border-red-500/40 rounded-lg px-4 py-3 mb-4 text-sm text-red-400 break-words">
            {errors.root.message}
          </div>
        )}

        {/* ── FORM ── */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName" className="text-gray-100 text-sm">
                Full Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Dr. Sarah Johnson"
                autoComplete="name"
                hasError={!!errors.fullName}
                className="bg-[#1E293B] border-gray-800 text-gray-100 placeholder-gray-500 focus:border-[#0EA5E9]"
                {...register("fullName", {
                  required: "Full name is required.",
                })}
              />
              <FieldError error={errors.fullName} />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-100 text-sm">
                Email Address <span className="text-red-400">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="sarah@hospital.com"
                autoComplete="email"
                hasError={!!errors.email}
                className="bg-[#1E293B] border-gray-800 text-gray-100 placeholder-gray-500 focus:border-[#0EA5E9]"
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
            {/* রেসপন্সিভ চেঞ্জ: ৩২০px স্ক্রিনে grid-cols-1 এবং sm স্ক্রিন থেকে grid-cols-2 হবে */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="phone" className="text-gray-100 text-sm">
                  Phone <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+880 1XXX-XXXXXX"
                  autoComplete="tel"
                  hasError={!!errors.phone}
                  className="bg-[#1E293B] border-gray-800 text-gray-100 placeholder-gray-500 focus:border-[#0EA5E9]"
                  {...register("phone", {
                    required: "Phone number is required.",
                  })}
                />
                <FieldError error={errors.phone} />
              </div>
              <div>
                <Label htmlFor="gender" className="text-gray-100 text-sm">
                  Gender <span className="text-red-400">*</span>
                </Label>
                <select
                  id="gender"
                  className={[
                    "w-full px-3.5 py-2.5 text-sm border rounded-[10px] bg-[#1E293B] outline-none transition-all duration-200 cursor-pointer appearance-none text-gray-100",
                    errors.gender
                      ? "border-red-500/50 shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                      : "border-gray-800 focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.15)]",
                  ].join(" ")}
                  {...register("gender", {
                    required: "Please select your gender.",
                  })}
                >
                  <option value="" className="bg-[#111827]">
                    Select gender
                  </option>
                  <option value="male" className="bg-[#111827]">
                    Male
                  </option>
                  <option value="female" className="bg-[#111827]">
                    Female
                  </option>
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
              <Label htmlFor="password" className="text-gray-100 text-sm">
                Password <span className="text-red-400">*</span>
              </Label>
              <PasswordInput
                id="password"
                name="password"
                register={register}
                hasError={!!errors.password}
                autoComplete="new-password"
                placeholder="Min 6 chars, 1 number, 1 special"
                className="bg-[#1E293B] border-gray-800 text-gray-100 placeholder-gray-500 focus:border-[#0EA5E9]"
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
              <Label
                htmlFor="confirmPassword"
                className="text-gray-100 text-sm"
              >
                Confirm Password <span className="text-red-400">*</span>
              </Label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                register={register}
                hasError={!!errors.confirmPassword}
                autoComplete="new-password"
                placeholder="Re-enter your password"
                className="bg-[#1E293B] border-gray-800 text-gray-100 placeholder-gray-500 focus:border-[#0EA5E9]"
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
          <div className="flex items-start gap-2.5 mt-5">
            <input
              type="checkbox"
              id="terms"
              className="mt-0.5 w-4 h-4 rounded border-gray-800 bg-[#1E293B] text-[#0EA5E9] focus:ring-offset-0 focus:ring-1 focus:ring-[#0EA5E9] cursor-pointer flex-shrink-0"
              {...register("terms", {
                required: "You must accept the terms and conditions.",
              })}
            />
            <label
              htmlFor="terms"
              className="text-[11px] sm:text-xs text-gray-400 cursor-pointer leading-relaxed"
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
            className="w-full mt-5 py-3 px-4 sm:px-6 rounded-[10px] font-semibold text-white text-[14px] sm:text-[15px] flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_4px_20px_rgba(14,165,233,0.4)] hover:-translate-y-px active:translate-y-0"
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
        <p className="text-center text-xs sm:text-sm text-gray-400 mt-5">
          Already have an account?{" "}
          <a
            href="/auth/signup"
            className="text-[#0EA5E9] font-semibold hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </>
  );
}
