"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getInitials, formatDate } from "@/lib/utils";
import { SelectUser } from "@repo/db";
import { cn } from "@/lib/utils";
import { apiGet } from "@/lib/api-client";

type UserRole = "user" | "teacher" | "admin";

const roleLabels: Record<UserRole | "all", string> = {
  all: "Tutti",
  user: "Utenti",
  teacher: "Insegnanti",
  admin: "Amministratori",
};

const roleIcons: Record<UserRole | "all", string> = {
  all: "👥",
  user: "👤",
  teacher: "👨‍🏫",
  admin: "👑",
};

async function fetchUsers(): Promise<SelectUser[]> {
  const data = await apiGet<{ users: SelectUser[] }>("/users");
  return data.users;
}

export default function UsersList() {
  const [selectedRole, setSelectedRole] = useState<UserRole | "all">("all");

  // Usa TanStack Query per recuperare gli utenti
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    retry: 1,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Caricamento utenti...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-destructive">
            Errore nel caricamento degli utenti: {error.message}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Conta gli utenti per ogni ruolo
  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<UserRole, number>);

  // Filtra gli utenti in base al ruolo selezionato
  const filteredUsers =
    selectedRole === "all"
      ? users
      : users.filter((user) => user.role === selectedRole);

  const roles: (UserRole | "all")[] = ["all", "admin", "teacher", "user"];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <aside className="lg:w-64 flex-shrink-0">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtra per Ruolo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {roles.map((role) => {
              const count =
                role === "all"
                  ? users.length
                  : roleCounts[role as UserRole] || 0;
              const isSelected = selectedRole === role;

              return (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-lg transition-all",
                    "hover:bg-accent hover:text-accent-foreground",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{roleIcons[role]}</span>
                    <span className="font-medium">{roleLabels[role]}</span>
                  </div>
                  <Badge
                    variant={isSelected ? "secondary" : "outline"}
                    className={cn(
                      isSelected &&
                        "bg-primary-foreground/20 text-primary-foreground"
                    )}
                  >
                    {count}
                  </Badge>
                </button>
              );
            })}
          </CardContent>
        </Card>
      </aside>

      {/* Lista utenti */}
      <div className="flex-1">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {filteredUsers.length}{" "}
            {filteredUsers.length === 1 ? "utente" : "utenti"}
            {selectedRole !== "all" && (
              <span className="text-muted-foreground">
                {" "}
                con ruolo {roleLabels[selectedRole].toLowerCase()}
              </span>
            )}
          </h2>
        </div>

        {filteredUsers.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredUsers.map((u) => {
              const userInitials = getInitials(u.name);
              const registrationDate = formatDate(u.createdAt);

              return (
                <Card key={u.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 ring-2">
                        <AvatarFallback className="text-lg font-bold bg-primary text-white">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">
                          {u.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground truncate">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Ruolo
                        </span>
                        <Badge
                          variant={
                            u.role === "admin"
                              ? "default"
                              : u.role === "teacher"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {roleIcons[u.role]} {roleLabels[u.role]}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Email verificata
                        </span>
                        <span className="text-sm">
                          {u.emailVerified ? (
                            <span className="text-green-600 dark:text-green-400">
                              ✓ Sì
                            </span>
                          ) : (
                            <span className="text-orange-600 dark:text-orange-400">
                              ✗ No
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Registrato
                        </span>
                        <span className="text-sm">{registrationDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Nessun utente trovato con il ruolo selezionato
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
