"use client";

import React, { useState } from "react";
import { Users, Search, Mail, Shield, ShieldCheck } from "lucide-react";
import UserActionButtons from "./UserActionButtons";
import RoleSelectorDropdown from "./RoleChange";

export default function UsersManageClient({ initialUsers = [] }) {
  const [searchQuery, setSearchQuery] = useState("");

  // ফ্রন্টএন্ড সার্চ ফিল্টার লজিক (নাম ও ইমেইল দিয়ে সার্চ করা যাবে)
  const filteredUsers = initialUsers.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#0E121F] text-gray-100 p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6">
      {/* ─── 🏛️ HEADER (Fully Responsive) ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#161D30] border border-gray-800/80 p-5 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-xl flex-shrink-0">
            <Users className="size-5 md:size-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg md:text-2xl font-bold text-white tracking-tight truncate">
              User Management
            </h1>
            <p className="text-xs md:text-sm text-gray-400 mt-0.5 max-w-sm sm:max-w-md md:max-w-none text-wrap">
              Control user access, roles, account suspension and deletions.
            </p>
          </div>
        </div>
        <span className="self-start sm:self-center px-3 py-1 text-xs font-semibold rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 whitespace-nowrap">
          Total Users: {filteredUsers.length}
        </span>
      </div>

      {/* ─── 🔍 SEARCH BAR SECTION ─── */}
      <div className="relative max-w-md w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="size-4 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-[#161D30] border border-gray-800/80 rounded-xl text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-sky-500/50 transition-colors"
        />
      </div>

      {/* ─── 📱 MOBILE CARD VIEW (ছোট ডিভাইস ও কমপ্যাক্ট ফন্ট) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((userItem) => (
            <div
              key={userItem._id}
              className="bg-[#161D30] border border-gray-800/80 rounded-xl p-3.5 space-y-3 shadow-md"
            >
              {/* ইউজার ডিটেইলস এবং স্ট্যাটাস */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="size-7 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 text-xs font-bold uppercase flex-shrink-0">
                    {userItem.name?.charAt(0) || "U"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {userItem.name}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
                      <Mail className="size-3 text-gray-600 flex-shrink-0" />
                      <span className="truncate">{userItem.email}</span>
                    </div>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border flex-shrink-0 ${
                    userItem.isSuspended
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  }`}
                >
                  <span
                    className={`size-1 rounded-full ${
                      userItem.isSuspended ? "bg-red-500" : "bg-emerald-500"
                    }`}
                  />
                  {userItem.isSuspended ? "Suspended" : "Active"}
                </span>
              </div>

              {/* রোল সিলেক্টর (ড্রপডাউন সাইজ ফিট করার জন্য) */}
              <div className="bg-[#0E121F]/40 p-2 rounded-lg border border-gray-800/40 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-[11px] text-gray-400">
                  <Shield className="size-3 text-gray-500" />
                  <span>Assign Role</span>
                </div>
                <div className="scale-90 origin-right">
                  <RoleSelectorDropdown
                    userId={userItem._id}
                    currentRole={userItem.role}
                  />
                </div>
              </div>

              {/* অ্যাকশন বাটনসমূহ */}
              <div className="pt-2 border-t border-gray-800/40 flex justify-end">
                <div className="scale-90 origin-right">
                  <UserActionButtons
                    userId={userItem._id}
                    isSuspended={userItem.isSuspended}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-8 text-center text-gray-500 text-xs bg-[#161D30] border border-gray-800/80 rounded-xl">
            No users matched your search criteria.
          </div>
        )}
      </div>

      {/* ─── 🖥️ DESKTOP TABLE VIEW (md স্ক্রিন থেকে দেখাবে) ─── */}
      <div className="hidden md:block bg-[#161D30] border border-gray-800/80 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          {filteredUsers.length > 0 ? (
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
                {filteredUsers.map((userItem) => (
                  <tr
                    key={userItem._id}
                    className="hover:bg-[#0E121F]/20 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-white flex items-center gap-3">
                      <div className="size-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 font-bold uppercase">
                        {userItem.name?.charAt(0) || "U"}
                      </div>
                      <span className="truncate max-w-[180px]">
                        {userItem.name}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-gray-300">
                      {userItem.email}
                    </td>

                    <td className="py-4 px-6">
                      <RoleSelectorDropdown
                        userId={userItem._id}
                        currentRole={userItem.role}
                      />
                    </td>

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
              No users matched your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
