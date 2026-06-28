import React from "react";
import { Users, UserCheck } from "lucide-react";
import { getAllUsers } from "@/services/server/api";
import UserActionButtons from "./UserActionButtons"; // সঠিক পাথে ইম্পোর্ট করুন

export const metadata = {
  title: "Manage Users | MediCare Connect",
  description:
    "View, moderate, and manage all registered patient accounts and user permissions across the platform.",
};

async function UsersManagePage() {
  const allUsers = await getAllUsers();

  return (
    <div className="min-h-screen bg-[#0E121F] text-gray-100 p-4 md:p-6 space-y-6">
      {/* ─── 🏛️ HEADER ─── */}
      <div className="flex items-center justify-between bg-[#161D30] border border-gray-800/80 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-xl">
            <Users className="size-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              User Management
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Control user access, roles, account suspension and deletions.
            </p>
          </div>
        </div>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
          Total Users: {allUsers.length}
        </span>
      </div>

      {/* ─── 📅 USERS TABLE SECTION ─── */}
      <div className="bg-[#161D30] border border-gray-800/80 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          {allUsers.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800/60 bg-[#0E121F]/40 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-6">User Details</th>
                  <th className="py-4 px-6">Email Address</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40 text-sm">
                {allUsers.map((userItem) => (
                  <tr
                    key={userItem._id}
                    className="hover:bg-[#0E121F]/20 transition-colors"
                  >
                    {/* নাম ও প্রোফাইল আইকন */}
                    <td className="py-4 px-6 font-medium text-white flex items-center gap-3">
                      <div className="size-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 font-bold uppercase">
                        {userItem.name?.charAt(0) || "U"}
                      </div>
                      <span className="truncate max-w-[180px]">
                        {userItem.name}
                      </span>
                    </td>

                    {/* ইমেইল */}
                    <td className="py-4 px-6 text-gray-300">
                      {userItem.email}
                    </td>

                    {/* রোল (Role) */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium uppercase tracking-wider ${
                          userItem.role === "admin"
                            ? "bg-purple-500/10 text-purple-400"
                            : userItem.role === "doctor"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-sky-500/10 text-sky-400"
                        }`}
                      >
                        {userItem.role}
                      </span>
                    </td>

                    {/* স্ট্যাটাস (Active / Suspended) */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          userItem.isSuspended
                            ? "bg-red-500/10 text-red-400"
                            : "bg-emerald-500/10 text-emerald-400"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            userItem.isSuspended
                              ? "bg-red-500"
                              : "bg-emerald-500"
                          }`}
                        />
                        {userItem.isSuspended ? "Suspended" : "Active"}
                      </span>
                    </td>

                    {/* ক্লায়েন্ট একশন বাটন সেকশন */}
                    <td className="py-4 px-6 text-right">
                      <UserActionButtons
                        userId={userItem._id}
                        isSuspended={userItem.isSuspended}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-gray-500 text-sm">
              No users found in the ecosystem.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsersManagePage;
