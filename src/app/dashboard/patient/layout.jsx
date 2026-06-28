import { requireRole } from "@/services/core/session";

async function PatientDashboardLayout({ children }) {
  await requireRole("patient");
  return children;
}

export default PatientDashboardLayout;
