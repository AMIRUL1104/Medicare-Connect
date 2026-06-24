// src/components/Dashboard/shared/DashboardSidebar.jsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // অ্যাক্টিভ রুট ট্র্যাক করার জন্য

import { Button, Drawer } from "@heroui/react";
import {
  Bookmark,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  Users2,
  Calendar,
  ClipboardList,
  Stethoscope,
  BarChart3,
  User,
  Home,
  Menu,
} from "lucide-react";

export function DashboardSidebar({ user }) {
  const pathname = usePathname();

  const patientNavlinks = [
    { icon: Home, label: "Home", href: "/" },
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard/patient",
    },
    {
      icon: FileText,
      label: "My Appointments",
      href: "/dashboard/patient/appointments",
    },
    {
      icon: CreditCard,
      label: "Payment History",
      href: "/dashboard/patient/payments",
    },
    {
      icon: Bookmark,
      label: "My Reviews",
      href: "/dashboard/patient/reviews",
    },
    {
      icon: User,
      label: "Profile",
      href: "/dashboard/patient/profile",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/dashboard/patient/settings",
    },
  ];

  const doctorNavlinks = [
    { icon: Home, label: "Home", href: "/" },
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard/doctor",
    },
    {
      icon: Calendar,
      label: "Manage Schedule",
      href: "/dashboard/doctor/schedule",
    },
    {
      icon: ClipboardList,
      label: "Appointments",
      href: "/dashboard/doctor/appointments",
    },
    {
      icon: FileText,
      label: "Prescriptions",
      href: "/dashboard/doctor/prescriptions",
    },
    {
      icon: User,
      label: "Profile",
      href: "/dashboard/doctor/profile",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/dashboard/doctor/settings",
    },
  ];

  const adminNavlinks = [
    { icon: Home, label: "Home", href: "/" },
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard/admin",
    },
    {
      icon: Users2,
      label: "Users",
      href: "/dashboard/admin/users",
    },
    {
      icon: Stethoscope,
      label: "Doctors",
      href: "/dashboard/admin/doctors",
    },
    {
      icon: ClipboardList,
      label: "Appointments",
      href: "/dashboard/admin/appointments",
    },
    {
      icon: CreditCard,
      label: "Payments",
      href: "/dashboard/admin/payments",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      href: "/dashboard/admin/analytics",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/dashboard/admin/settings",
    },
  ];

  const navLinksMap = {
    patient: patientNavlinks,
    doctor: doctorNavlinks,
    admin: adminNavlinks,
  };

  // ব্যবহারকারীর রোল অনুযায়ী নেভিগেশন আইটেম নির্ধারণ (ডিফল্ট: patient)
  const navItems = navLinksMap[user?.role] || patientNavlinks;

  // সাইডবার আইটেম রেন্ডারার ফাংশন
  const renderNavItems = () => (
    <nav className="flex flex-col gap-1.5 w-full">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            href={item.href}
            key={item.label}
            className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 select-none group border ${
              isActive
                ? "bg-[#161D30] border-gray-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                : "bg-transparent border-transparent hover:bg-[#161D30]/50 hover:border-gray-800/40"
            }`}
          >
            <item.icon
              className={`w-5 h-5 transition-colors duration-200 ${
                isActive
                  ? "text-blue-500"
                  : "text-gray-400 group-hover:text-gray-200"
              }`}
            />
            <span
              className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                isActive
                  ? "bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-semibold"
                  : "text-gray-400 group-hover:text-gray-200"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* 🖥️ Desktop Aside View (Premium Dark Layout) */}
      <aside className="hidden w-64 shrink-0 border-r border-gray-800/80 md:block px-4 py-6 bg-[#0E121F] h-screen sticky top-0">
        {/* Logo/Brand Header */}
        <div className="px-4 pb-6 mb-4 border-b border-gray-800/50">
          <span className="text-xl font-bold tracking-wider bg-linear-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            MediCare <span className="text-blue-500">Connect</span>
          </span>
        </div>
        {renderNavItems()}
      </aside>

      {/* 📱 Mobile Drawer Trigger Button */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <Drawer>
          <Button
            className="bg-[#111625] border border-gray-800 text-gray-300 hover:text-white"
            size="sm"
          >
            <Menu className="w-4 h-4" />
            Menu
          </Button>

          <Drawer.Backdrop className="backdrop-blur-sm bg-black/60">
            <Drawer.Content placement="left">
              {/* Mobile Drawer Content Theme */}
              <Drawer.Dialog className="bg-[#0E121F] border-r border-gray-800 w-72 max-w-[80vw] h-full p-5 text-white">
                <Drawer.CloseTrigger className="text-gray-400 hover:text-white" />
                <Drawer.Header className="px-1 pb-4 mb-4 border-b border-gray-800/60">
                  <Drawer.Heading className="text-lg font-bold text-white tracking-wide">
                    Navigation
                  </Drawer.Heading>
                </Drawer.Header>
                <Drawer.Body className="px-0 py-2">
                  {renderNavItems()}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}
