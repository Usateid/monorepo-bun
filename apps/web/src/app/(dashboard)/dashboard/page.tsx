"use client";
import { useQuery } from "@tanstack/react-query";
import type { SelectUser } from "@repo/db";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

async function fetchUsers(): Promise<SelectUser[]> {
  const response = await fetch("http://localhost:3001/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export default function Dashboard() {
  const { data: session, isPending: sessionLoading } = useSession();
  const router = useRouter();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  if (sessionLoading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Verifica sessione...</p>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-red-600">Error loading users: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Benvenuto, {session.user?.name || session.user?.email}!
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <p>Users: {users?.map((user) => user.name).join(", ")}</p>
      </div>
    </div>
  );
}
