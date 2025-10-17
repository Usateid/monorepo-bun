import { getSession } from "@/lib/auth";

export async function getLoggedUser() {
  const session = await getSession();

  return {
    user: session?.user,
    isAuthenticated: !!session,
  };
}
