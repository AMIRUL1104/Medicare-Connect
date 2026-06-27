import React from "react";
import {
  Users2,
  Stethoscope,
  CalendarCheck2,
  DollarSign,
  Activity,
} from "lucide-react";
import { getAdminStats } from "@/services/server/api";
import { getUserSession } from "@/services/core/session";

async function AdminDashboardOverviewPage() {
  const user = await getUserSession();
  const stats = await getAdminStats();

  // API থেকে আসা ডেটা ডিস্ট্রাকচারিং
  const { totalAppointments, totalEarnings, totalDoctors, totalPatients } =
    stats.stats;

  // কার্ডগুলো সহজে রেন্ডার করার জন্য একটি কনফিগারেবল অ্যারে
  const cardItems = [
    {
      id: 1,
      title: "Total Doctors",
      value: totalDoctors,
      icon: Stethoscope,
      iconColor: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      id: 2,
      title: "Total Patients",
      value: totalPatients,
      icon: Users2,
      iconColor: "text-sky-400",
      bgColor: "bg-sky-500/10",
      borderColor: "border-sky-500/20",
    },
    {
      id: 3,
      title: "Total Appointments",
      value: totalAppointments,
      icon: CalendarCheck2,
      iconColor: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
    },
    {
      id: 4,
      title: "Total Earnings",
      value: `৳ ${totalEarnings}`,
      icon: DollarSign,
      iconColor: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0E121F] text-gray-100 p-4 md:p-6 space-y-8">
      {/* ─── 🏛️ HEADER SECTION ─── */}
      <div className="flex items-center gap-4 bg-[#161D30] border border-gray-800/80 p-6 rounded-2xl shadow-xl">
        <div className="p-3.5 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-xl hidden sm:block">
          <Activity className="size-6 animate-pulse" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Admin Control Center
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Welcome back! Here is the live status of your healthcare ecosystem.
          </p>
        </div>
      </div>

      {/* ─── 📊 SECTION 1: STATISTICS CARDS GRID ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardItems.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              className="bg-[#161D30] border border-gray-800/80 p-6 rounded-2xl shadow-lg flex items-center justify-between hover:border-gray-700/60 transition-all duration-200"
            >
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-400 tracking-wide">
                  {card.title}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {card.value}
                </h3>
              </div>

              {/* ডাইনামিক আইকন কন্টেইনার */}
              <div
                className={`p-3.5 rounded-xl border ${card.bgColor} ${card.iconColor} ${card.borderColor}`}
              >
                <IconComponent className="size-6" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboardOverviewPage;
