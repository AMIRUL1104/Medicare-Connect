"use client";

import React, { useState } from "react";
import { Loader2, UserCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { suspendUser } from "@/services/server/action"; // আপনার সার্ভার অ্যাকশন পাথ
import { toast } from "react-toastify";

export default function RoleSelectorDropdown({ userId, currentRole }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRoleChange = async (e) => {
    const newRole = e.target.value;
    if (!newRole || newRole === currentRole) return;

    if (
      !confirm(
        `Are you sure you want to change this user's role to "${newRole}"?`,
      )
    ) {
      e.target.value = currentRole; // ক্যানসেল করলে আগের রোলে ব্যাক করবে
      return;
    }

    setLoading(true);
    try {
      // রোল এবং সাসপেন্ড দুটোই এই ফাংশন হ্যান্ডেল করে
      const res = await suspendUser(userId, { role: newRole });
      if (res?.modifiedCount === 1) {
        toast.success(`User role updated to ${newRole} successfully!`);
        router.refresh();
      } else {
        toast.error("Failed to update user role.");
        e.target.value = currentRole;
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
      e.target.value = currentRole;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <div className="relative">
        <select
          defaultValue={currentRole}
          onChange={handleRoleChange}
          disabled={loading}
          className="appearance-none pl-8 pr-8 py-1.5 text-xs font-semibold rounded-lg bg-[#111827] text-gray-200 border border-gray-800 focus:border-[#0EA5E9] focus:outline-none cursor-pointer transition-all disabled:opacity-50"
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>

        {/* Left Icon (Changes to loader when API calls) */}
        <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none text-gray-400">
          {loading ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <UserCog className="size-3.5" />
          )}
        </div>

        {/* Custom Dropdown Arrow */}
        <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-400">
          <svg
            className="fill-current h-3 w-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
