"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // রুট ট্র্যাক করার জন্য ইমপোর্ট
import Logo from "../shared/Logo";
import NavLinks from "../shared/NavLinks";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";

/**
 * Handles fixed dark layout navbar with current route highlighting.
 * Receives `user` from the server-side Navbar wrapper.
 */
export default function NavbarShell({ user }) {
  const pathname = usePathname();
  // ড্যাশবোর্ড রুটে আছে কিনা চেক করা (প্রয়োজনে মোবাইল মেনু বা অন্য লজিকে ব্যবহারের জন্য)
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  return (
    <header className="sticky top-0 z-40 w-full bg-[#1E293B] border-b border-gray-800 shadow-md">
      <div className="max-w-360 mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-17">
          {/* Left side: Logo + Desktop links */}
          <div className="flex items-center gap-9">
            {/* ডার্ক ব্যাকগ্রাউন্ডের কারণে লোগো ভেরিয়েন্ট ডার্ক করা হয়েছে */}
            <Logo size="md" variant="dark" />

            <nav className="hidden lg:block">
              <NavLinks
                direction="row"
                activeHref={pathname} // কারেন্ট পাথপাস করা হলো অ্যাক্টিভ লিংক কালার ব্লু করার জন্য
                isDashboardMode={true} // যেহেতু ব্যাকগ্রাউন্ড সবসময় ডার্ক (#1E293B)
              />
            </nav>
          </div>

          {/* Right side — Desktop profile/auth action buttons */}
          <div className="hidden lg:flex items-center gap-5">
            {user ? (
              <>
                <Link
                  href={`/dashboard/${user.role}`}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:-translate-y-px"
                  style={{
                    background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                  }}
                >
                  Dashboard
                </Link>

                {/* Notification bell */}
                <button
                  aria-label="Notifications"
                  className="relative p-1.5 text-gray-400 hover:text-[#0EA5E9] transition-colors"
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
                  href="/auth/signin"
                  className="text-sm font-medium text-gray-300 hover:text-[#0EA5E9] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:-translate-y-px"
                  style={{
                    background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                  }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger menu content */}
          <MobileMenu user={user} />
        </div>
      </div>
    </header>
  );
}
