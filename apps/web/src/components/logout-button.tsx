"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="w-full sm:w-auto"
    >
      Esci
    </Button>
  );
}
