import { getUserSession } from "@/services/core/session";
import { DashboardSidebar } from "./DashboardSidebar";

const DashboardLayout = async ({ children }) => {
  const user = await getUserSession();
  return (
    <div className=" flex min-h-screen">
      <DashboardSidebar user={user} />
      <div className="flex-1 ">{children}</div>
    </div>
  );
};

export default DashboardLayout;
