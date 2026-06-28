import { requireRole } from "@/services/core/session";

async function DoctorDashboardLayout({ children }) {
  await requireRole("doctor");
  return children;
}

export default DoctorDashboardLayout;
