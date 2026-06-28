import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return;
  }
  const user = session.user;
  return user;
}

export const getUserToken = async () => {
  const sessionData = await auth.api.getSession({ headers: await headers() });
  return sessionData?.session?.token || null;
};

export const requireRole = async (role) => {
  const user = await getUserSession();
  if (user.role !== role) {
    return redirect("/unauthorized");
  }
};
