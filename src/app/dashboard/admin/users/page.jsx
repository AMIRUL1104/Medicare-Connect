import React from "react";
import { getAllUsers } from "@/services/server/api";
import UsersManageClient from "./UsersManageClient"; // নিচের ২ নম্বর ফাইলটি ইম্পোর্ট করুন

export const metadata = {
  title: "Manage Users | MediCare Connect",
  description:
    "View, moderate, and manage all registered patient accounts and user permissions across the platform.",
};

export default async function UsersManagePage() {
  const allUsers = await getAllUsers();

  return <UsersManageClient initialUsers={allUsers} />;
}
