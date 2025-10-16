"use client";
import { useQuery } from "@tanstack/react-query";
import type { SelectUser } from "@repo/db";

async function fetchUsers(): Promise<SelectUser[]> {
  const response = await fetch("http://localhost:3001/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export default function Dashboard() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Error loading users: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Users: {users?.map((user) => user.name).join(", ")}</p>
    </div>
  );
}
