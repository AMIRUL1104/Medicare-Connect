"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Shared/Logo";
import NavLinks from "@/components/Shared/NavLinks";
import UserMenu from "@/components/Navbar/UserMenu";
import MobileMenu from "@/components/Navbar/MobileMenu";

/**
 * Handles sticky positioning + transparent-to-white scroll transition.
 * Receives `user` from the server-side Navbar wrapper.
 */
export default function NavbarShell({ user }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-white border-b border-[#E2E8F0] shadow-sm"
          : "bg-white/0 border-b border-transparent",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[68px]">

          {/* Logo + desktop links */}
          <div className="flex items-center gap-9">
            <Logo size="md" />
            <nav className="hidden lg:block">
              <NavLinks />
            </nav>
          </div>

          {/* Right side — desktop */}
          <div className="hidden lg:flex items-center gap-5">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-[8px] text-sm font-semibold text-white transition-all duration-200 hover:shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:-translate-y-px"
                  style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)" }}
                >
                  Dashboard
                </Link>

                {/* Notification bell */}
                <button
                  aria-label="Notifications"
                  className="relative p-1.5 text-[#64748B] hover:text-[#0EA5E9] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#EF4444] rounded-full" />
                </button>

                <UserMenu user={user} />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-[#1E293B] hover:text-[#0EA5E9] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-[8px] text-sm font-semibold text-white transition-all duration-200 hover:shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:-translate-y-px"
                  style={{ background: "linear-gradient(135deg, #0EA5E9, #0284C7)" }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <MobileMenu user={user} />
        </div>
      </div>
    </header>
  );
}
