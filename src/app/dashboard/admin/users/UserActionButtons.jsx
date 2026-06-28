"use client";

import React, { useState } from "react";
import { Trash2, ShieldAlert, ShieldCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteUser, suspendUser } from "@/services/server/action";
import { toast } from "react-toastify";

export default function UserActionButtons({
  userId,
  isSuspended,
  currentRole,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(null); // 'delete' or 'suspend'

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
      {/* 👑 Role Selector Dropdown Component */}

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
