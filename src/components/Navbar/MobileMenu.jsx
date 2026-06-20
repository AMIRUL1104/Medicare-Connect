"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Shared/Logo";
import NavLinks from "@/components/Shared/NavLinks";

export default function MobileMenu({ user }) {
  const [open, setOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="p-2 -mr-2 text-[#1E293B]"
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
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in panel */}
      <div
        className={[
          "fixed top-0 right-0 h-full w-[82%] max-w-85 bg-white z-50 shadow-2xl",
          "transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0]">
            <Logo size="sm" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-1 text-[#64748B]"
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

          {/* Profile card (if logged in) */}
          {user ? (
            <div className="p-5 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3 bg-[#F0F9FF] rounded-xl p-3.5">
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
                  <p className="text-sm font-semibold text-[#1E293B] truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-[#64748B] truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 border-b border-[#E2E8F0] flex gap-2">
              <Link
                href="/auth/signin"
                onClick={() => setOpen(false)}
                className="flex-1 text-center py-2.5 rounded-lg border border-[#E2E8F0] text-sm font-semibold text-[#1E293B]"
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

          {/* Links */}
          <nav className="flex-1 px-5 py-4 overflow-y-auto">
            <NavLinks
              direction="col"
              onLinkClick={() => setOpen(false)}
              linkClassName="block py-3 px-1 text-[15px] font-medium text-[#1E293B] hover:text-[#0EA5E9] border-b border-[#F1F5F9] transition-colors"
            />

            {user && (
              <Link
                href={`/dashboard/${user.role}`}
                onClick={() => setOpen(false)}
                className="block py-3 px-1 text-[15px] font-medium text-[#0EA5E9] border-b border-[#F1F5F9]"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* CTA footer */}
          <div className="p-5 border-t border-[#E2E8F0]">
            <Link
              href="/appointments/book"
              onClick={() => setOpen(false)}
              className="block w-full text-center py-3 rounded-[10px] text-sm font-semibold text-white transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
              }}
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
