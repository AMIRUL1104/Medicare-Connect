"use client";

import React, { useState } from "react";
import {
  Trash2,
  ShieldAlert,
  ShieldCheck,
  Loader2,
  UserCog,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteUser, suspendUser } from "@/services/server/action";
import { toast } from "react-toastify";

export default function UserActionButtons({
  userId,
  isSuspended,
  currentRole,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(null); // 'delete', 'suspend', or 'role'

  // ─── 🔄 ROLE CHANGE HANDLER ───
  const handleRoleChange = async (e) => {
    const newRole = e.target.value;
    if (!newRole || newRole === currentRole) return;

    if (
      !confirm(
        `Are you sure you want to change this user's role to "${newRole}"?`,
      )
    ) {
      // ইউজার বাতিল করলে ড্রপডাউন আগের রোলে ব্যাক করবে
      e.target.value = currentRole;
      return;
    }

    setLoading("role");
    try {
      // রোল চেঞ্জের জন্য suspendUser ফাংশনটি কল করা হচ্ছে
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
      setLoading(null);
    }
  };

  // ─── 🚫 SUSPEND TOGGLE HANDLER ───
  const handleToggleSuspend = async () => {
    const actionText = isSuspended ? "unsuspend" : "suspend";
    if (!confirm(`Are you sure you want to ${actionText} this user?`)) return;

    setLoading("suspend");
    try {
      const res = await suspendUser(userId, { isSuspended: !isSuspended });
      if (res?.modifiedCount === 1) {
        toast.success(
          isSuspended
            ? "User Account unsuspended successfully!"
            : "User Account suspended successfully!",
        );
        router.refresh();
      } else {
        toast.error(`Failed to ${actionText} user account.`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(null);
    }
  };

  // ─── 🗑️ DELETE HANDLER ───
  const handleDelete = async () => {
    if (
      !confirm(
        "Are you absolutely sure you want to delete this user? This cannot be undone.",
      )
    )
      return;

    setLoading("delete");
    try {
      const res = await deleteUser(userId);
      if (res?.deletedCount === 1) {
        toast.success("User Account deleted successfully!");
        router.refresh();
      } else {
        toast.error("Failed to delete User Account.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex items-center justify-end gap-3">
      {/* 👑 Role Selector Dropdown */}
      <div className="relative inline-flex items-center gap-1.5">
        <label className="text-gray-400 text-xs font-medium sr-only">
          Role:
        </label>
        <div className="relative">
          <select
            defaultValue={currentRole}
            onChange={handleRoleChange}
            disabled={loading !== null}
            className="appearance-none pl-8 pr-8 py-1.5 text-xs font-semibold rounded-lg bg-[#111827] text-gray-200 border border-gray-800 focus:border-[#0EA5E9] focus:outline-none cursor-pointer transition-all disabled:opacity-50"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>

          {/* Left Icon */}
          <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none text-gray-400">
            {loading === "role" ? (
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

      {/* 🛑 Suspend/Unsuspend Button */}
      <button
        onClick={handleToggleSuspend}
        disabled={loading !== null}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
          isSuspended
            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
            : "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20"
        } disabled:opacity-50`}
      >
        {loading === "suspend" ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : isSuspended ? (
          <>
            <ShieldCheck className="size-3.5" />
            Unsuspend
          </>
        ) : (
          <>
            <ShieldAlert className="size-3.5" />
            Suspend
          </>
        )}
      </button>

      {/* 🗑️ Delete Button */}
      <button
        onClick={handleDelete}
        disabled={loading !== null}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all disabled:opacity-50"
      >
        {loading === "delete" ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <>
            <Trash2 className="size-3.5" />
            Delete
          </>
        )}
      </button>
    </div>
  );
}
