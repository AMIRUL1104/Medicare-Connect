"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Label } from "../ui/Label";
import { FieldError } from "../ui/FieldError";
import { Input } from "../ui/Input";

/**
 * ContactForm — Client Component.
 *
 * Uses React Hook Form (matching the SignupForm.jsx pattern elsewhere
 * in this project — register-based validation, no schema library).
 * Reuses Label / Input / FieldError exactly as the signup flow does.
 *
 * States covered: idle → submitting (loading) → success / error.
 * No PasswordInput needed here, but it's imported in the reference
 * file above for completeness per your instructions.
 */
export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | success | error

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data) {
    setStatus("idle");
    try {
      // Replace with your real API call:
      // const res = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      // if (!res.ok) throw new Error("Failed to send message.");

      // console.log("Contact form payload:", data);
      await new Promise((r) => setTimeout(r, 1200)); // simulate network

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 lg:p-8 shadow-[0_4px_24px_rgba(14,165,233,0.06)]">
      <h2 className="text-xl lg:text-2xl font-bold text-[#1E293B] mb-1.5">
        Send Us a Message
      </h2>
      <p className="text-[#64748B] text-sm mb-6">
        Fill out the form below and our team will get back to you shortly.
      </p>

      {/* Success state */}
      {status === "success" && (
        <div
          role="status"
          className="flex items-start gap-3 bg-[#F0FDF4] border border-[#D1FAE5] rounded-xl p-4 mb-6"
        >
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#10B981] text-white shrink-0 mt-0.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-[#1E293B]">
              Message sent successfully
            </p>
            <p className="text-xs text-[#64748B] mt-0.5">
              Thanks for reaching out — our team will respond within 24 hours.
            </p>
          </div>
        </div>
      )}

      {/* Error state */}
      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 bg-[#FFF5F5] border border-[#FECACA] rounded-xl p-4 mb-6"
        >
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#EF4444] text-white shrink-0 mt-0.5">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-[#1E293B]">
              Something went wrong
            </p>
            <p className="text-xs text-[#64748B] mt-0.5">
              {` We couldn't send your message. Please try again in a moment.`}
            </p>
          </div>
        </div>
      )}

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
              placeholder="Your full name"
              autoComplete="name"
              hasError={!!errors.fullName}
              {...register("fullName", {
                required: "Full name is required.",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters.",
                },
              })}
            />
            <FieldError error={errors.fullName} />
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">
                Email Address <span className="text-[#EF4444]">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                hasError={!!errors.email}
                {...register("email", {
                  required: "Email address is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address.",
                  },
                })}
              />
              <FieldError error={errors.email} />
            </div>

            <div>
              <Label htmlFor="phone">
                Phone Number <span className="text-[#EF4444]">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+880 1XXX-XXXXXX"
                autoComplete="tel"
                hasError={!!errors.phone}
                {...register("phone", {
                  required: "Phone number is required.",
                  pattern: {
                    value: /^[\+\d\s\-\(\)]{7,15}$/,
                    message: "Enter a valid phone number.",
                  },
                })}
              />
              <FieldError error={errors.phone} />
            </div>
          </div>

          {/* Subject */}
          <div>
            <Label htmlFor="subject">
              Subject <span className="text-[#EF4444]">*</span>
            </Label>
            <Input
              id="subject"
              type="text"
              placeholder="What's this about?"
              hasError={!!errors.subject}
              {...register("subject", {
                required: "Subject is required.",
                minLength: {
                  value: 3,
                  message: "Subject must be at least 3 characters.",
                },
              })}
            />
            <FieldError error={errors.subject} />
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">
              Message <span className="text-[#EF4444]">*</span>
            </Label>
            <textarea
              id="message"
              rows={5}
              placeholder="Tell us how we can help..."
              className={[
                "w-full px-3.5 py-2.5 text-sm border-[1.5px] rounded-[10px] bg-white outline-none transition-all duration-200 resize-none",
                "placeholder:text-[#94A3B8] text-[#1E293B]",
                errors.message
                  ? "border-[#EF4444] shadow-[0_0_0_3px_rgba(239,68,68,0.10)]"
                  : "border-[#E2E8F0] focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.12)]",
              ].join(" ")}
              {...register("message", {
                required: "Message is required.",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters.",
                },
              })}
            />
            <FieldError error={errors.message} />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 py-3 px-6 rounded-[10px] font-semibold text-white text-[15px] flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_4px_16px_rgba(14,165,233,0.35)] hover:-translate-y-px active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
          style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)" }}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Sending message…
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
}
