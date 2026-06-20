"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function UserMenu({ user }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-[#E2E8F0] hover:border-[#0EA5E9] transition-colors duration-200"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#0EA5E9] flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
        <svg
          className={`w-3.5 h-3.5 text-[#64748B] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-[#E2E8F0] shadow-lg py-2 z-50 animate-[fadeIn_0.15s_ease-out]">
          <div className="px-4 py-2 border-b border-[#E2E8F0] mb-1">
            <p className="text-sm font-semibold text-[#1E293B] truncate">
              {user?.name}
            </p>
            <p className="text-xs text-[#64748B] truncate">{user?.email}</p>
          </div>

          <Link
            href="/dashboard"
            className="block px-4 py-2 text-sm text-[#1E293B] hover:bg-[#F0F9FF] hover:text-[#0EA5E9] transition-colors"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-[#1E293B] hover:bg-[#F0F9FF] hover:text-[#0EA5E9] transition-colors"
            onClick={() => setOpen(false)}
          >
            My Profile
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 text-sm text-[#1E293B] hover:bg-[#F0F9FF] hover:text-[#0EA5E9] transition-colors"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>

          <div className="border-t border-[#E2E8F0] mt-1 pt-1">
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
              className="w-full text-left px-4 py-2 text-sm text-[#EF4444] hover:bg-[#FFF5F5] transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
