import { Hono } from "hono";
import { db, user } from "@repo/db";
import { requireAdmin } from "../lib/auth";

const users = new Hono();

/**
 * GET /users - Recupera tutti gli utenti (solo admin)
 */
users.get("/", async (c) => {
  try {
    // Verifica che l'utente sia autenticato e sia admin
    const authResult = await requireAdmin(c);

    if (!authResult.success) {
      return c.json(
        { error: authResult.error },
        (authResult.status || 500) as any
      );
    }

    const userList = await db.select().from(user);

    return c.json({ users: userList });
  } catch (error) {
    console.error("Error fetching users:", error);
    return c.json(
      {
        error: "Failed to fetch users",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

// Esempio di route per singolo utente (commentata per ora)
// users.get("/:id", async (c) => {
//   const userId = c.req.param("id");
//
//   // Implementazione qui
//
//   return c.json({ user: {} });
// });

export default users;
