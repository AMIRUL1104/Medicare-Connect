"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; // রুট ট্র্যাক করার জন্য
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";

import Logo from "../shared/Logo";
import NavLinks from "../shared/NavLinks";
import { authClient } from "@/lib/auth-client";

export default function MobileMenu({ user, onSignOut }) {
  const [open, setOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ড্যাশবোর্ড রুট ম্যাপ
  const dashboardRoutes = {
    patient: [
      { label: "Dashboard", href: "/dashboard/patient" },
      { label: "My Appointments", href: "/dashboard/patient/appointments" },
      { label: "Prescriptions", href: "/dashboard/patient/prescriptions" },
      { label: "Payment History", href: "/dashboard/patient/payments" },
      { label: "My Reviews", href: "/dashboard/patient/reviews" },
      { label: "Profile", href: "/dashboard/patient/profile" },
      { label: "Settings", href: "/dashboard/patient/settings" },
    ],
    doctor: [
      { label: "Dashboard", href: "/dashboard/doctor" },
      { label: "Manage Schedule", href: "/dashboard/doctor/schedule" },
      { label: "Appointments", href: "/dashboard/doctor/appointments" },
      { label: "Prescriptions", href: "/dashboard/doctor/prescriptions" },
      { label: "Profile", href: "/dashboard/doctor/profile" },
      { label: "Settings", href: "/dashboard/doctor/settings" },
    ],
    admin: [
      { label: "Dashboard", href: "/dashboard/admin" },
      { label: "Users", href: "/dashboard/admin/users" },
      { label: "Doctors", href: "/dashboard/admin/doctors" },
      { label: "Appointments", href: "/dashboard/admin/appointments" },
      { label: "Payments", href: "/dashboard/admin/payments" },
      { label: "Analytics", href: "/dashboard/admin/analytics" },
      { label: "Settings", href: "/dashboard/admin/settings" },
    ],
  };

  const currentDashboardLinks =
    dashboardRoutes[user?.role] || dashboardRoutes.patient;

  // 🎨 ডাইনামিক থিম ক্লাসেস
  const theme = {
    panelBg: isDashboardRoute ? "bg-[#0E121F]" : "bg-white",
    border: isDashboardRoute ? "border-gray-800/60" : "border-[#E2E8F0]",
    borderBottom: isDashboardRoute
      ? "border-b border-gray-800/60"
      : "border-b border-[#E2E8F0]",
    navBorderBottom: isDashboardRoute
      ? "border-b border-gray-800/40"
      : "border-b border-[#F1F5F9]",
    textMain: isDashboardRoute ? "text-gray-200" : "text-[#1E293B]",
    textMuted: isDashboardRoute ? "text-gray-400" : "text-[#64748B]",
    profileBg: isDashboardRoute ? "bg-[#161D30]" : "bg-[#F0F9FF]",
    hamburgerColor: isDashboardRoute ? "text-gray-300" : "text-[#1E293B]",
    signOutBg: isDashboardRoute
      ? "bg-red-950/30 text-red-400 border-red-900/50 hover:bg-red-950/50"
      : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100",
  };

  return (
    <div className="lg:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className={`p-2 -mr-2 ${theme.hamburgerColor}`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in panel */}
      <div
        className={[
          `fixed top-0 right-0 h-full w-[85%] max-w-85 ${theme.panelBg} z-50 shadow-2xl`,
          `transition-transform duration-300 ease-out lg:hidden border-l ${isDashboardRoute ? "border-gray-800" : "border-transparent"}`,
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className={`flex items-center justify-between p-5 ${theme.borderBottom}`}
          >
            <Logo size="sm" variant={isDashboardRoute ? "dark" : "light"} />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className={`p-1 ${theme.textMuted} hover:text-red-500`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 1. Profile Card / Auth Buttons */}
          {user ? (
            <div className={`p-5 ${theme.borderBottom}`}>
              <div
                className={`flex items-center gap-3 ${theme.profileBg} rounded-xl p-3.5`}
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#0EA5E9] flex items-center justify-center text-white font-bold">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
                <div className="min-w-0">
                  <p
                    className={`text-sm font-semibold ${theme.textMain} truncate`}
                  >
                    {user.name}
                  </p>
                  <p className={`text-xs ${theme.textMuted} truncate`}>
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className={`p-5 ${theme.borderBottom} flex gap-2`}>
              <Link
                href="/auth/signin"
                onClick={() => setOpen(false)}
                className={`flex-1 text-center py-2.5 rounded-lg border ${isDashboardRoute ? "border-gray-800 text-gray-300" : "border-[#E2E8F0] text-[#1E293B]"} text-sm font-semibold`}
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setOpen(false)}
                className="flex-1 text-center py-2.5 rounded-lg text-sm font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                }}
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Main Navigation Area */}
          <div className="flex-1 px-5 py-2 overflow-y-auto flex flex-col gap-2">
            {/* 2. Dashboard Dropdown (Only if logged in) */}
            {user && (
              <div className={`${theme.navBorderBottom} py-2`}>
                <button
                  onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                  className="flex items-center justify-between w-full py-2 px-1 text-[15px] font-semibold text-[#0EA5E9]"
                >
                  <span>{user.role.toUpperCase()} DASHBOARD</span>
                  {isDashboardOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {isDashboardOpen && (
                  <div
                    className={`mt-1 ml-3 pl-2 border-l-2 ${isDashboardRoute ? "border-gray-800" : "border-[#E0F2FE]"} flex flex-col gap-1`}
                  >
                    {currentDashboardLinks.map((link) => {
                      // কারেন্ট রুট চেক করা হচ্ছে
                      const isActive = pathname === link.href;

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={`block py-2 px-2 text-sm rounded-md transition-colors ${
                            isActive
                              ? "text-[#0EA5E9] font-semibold bg-[#0EA5E9]/10" // অ্যাক্টিভ রুট হলে ব্লু টেক্সট + লাইট ব্যাকগ্রাউন্ড
                              : isDashboardRoute
                                ? "text-gray-400 hover:text-gray-200 hover:bg-[#161D30]/60" // ড্যাশবোর্ড মোডে ইন-অ্যাক্টিভ লিংক
                                : "text-[#475569] hover:text-[#0EA5E9] hover:bg-[#F8FAFC]" // নরমাল মোডে ইন-অ্যাক্টিভ লিংক
                          }`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* 3. General Links Section (Home, Find Doctors, etc.) */}

            <nav className="pt-2">
              <NavLinks
                direction="col"
                activeHref={pathname} // কারেন্ট pathname এখানে পাস হবে
                isDashboardMode={isDashboardRoute} // ড্যাশবোর্ডে থাকলে ডার্ক থিম কালার মেইনটেইন করবে
                onLinkClick={() => setOpen(false)}
              />
            </nav>
          </div>

          {/* 4. Red SignOut Button */}
          {user && (
            <div className={`p-5 ${theme.border}`}>
              <button
                onClick={async () => {
                  setOpen(false);
                  await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.push("/auth/signin"); // redirect to login page
                        router.refresh();
                      },
                    },
                  });
                }}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold border ${theme.signOutBg} transition-colors duration-200`}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
