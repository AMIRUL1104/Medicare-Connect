import { requireRole } from "@/services/core/session";

async function AdminDashboardLayout({ children }) {
  await requireRole("admin");
  return children;
}

export default AdminDashboardLayout;
