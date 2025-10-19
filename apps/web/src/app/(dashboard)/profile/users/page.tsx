import { getLoggedUser } from "@/app/hooks/logged-user";
import { redirect } from "next/navigation";
import UsersList from "./users-list";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export default async function UsersPage() {
  const { isAdmin } = await getLoggedUser();

  // Controllo accesso admin - reindirizza se non è admin
  if (!isAdmin) {
    redirect("/profile");
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl mb-20 space-y-6">
      <Link
        href="/profile"
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Torna al profilo
      </Link>
      <h1 className="text-2xl font-bold mb-6">Lista Utenti</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <UsersList />
      </Suspense>
    </div>
  );
}
