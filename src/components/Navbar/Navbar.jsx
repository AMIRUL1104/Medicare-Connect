import { getUserSession } from "@/services/core/session";
import NavbarShell from "./NavbarShell";

async function Navbar() {
  const user = await getUserSession();

  // user is null/undefined when not logged in — NavbarShell handles both states
  return <NavbarShell user={user || null} />;
}

export default Navbar;
