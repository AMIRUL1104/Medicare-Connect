"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * HeroCTAButtons — the only client component in the Hero section.
 * Needs "use client" because it uses useRouter() for programmatic
 * navigation / click handling. Everything else in the Hero
 * (headline, illustration, badges) stays a Server Component.
 */
export default function HeroCTAButtons() {
  const router = useRouter();

  function handleFindDoctor() {
    router.push("/doctors");
  }

  function handleCreateAccount() {
    router.push("/auth/signup");
  }

  return (
    <div className="flex flex-wrap items-center gap-3 mt-8 animate__animated animate__fadeInUp animate__delay-1s">
      <button
        type="button"
        onClick={handleFindDoctor}
        className="px-6 py-3 rounded-[10px] text-sm font-semibold text-white transition-all duration-200 hover:shadow-[0_4px_16px_rgba(14,165,233,0.35)] hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
        style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)" }}
      >
        Find a Doctor
      </button>

      <button
        type="button"
        onClick={handleCreateAccount}
        className="px-6 py-3 rounded-[10px] text-sm font-semibold text-[#1E293B] border-[1.5px] border-[#E2E8F0] bg-white transition-all duration-200 hover:border-[#0EA5E9] hover:text-[#0EA5E9] hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:ring-offset-2"
      >
        Create Account
      </button>
    </div>
  );
}
