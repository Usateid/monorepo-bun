import { Hono } from "hono";
import { cors } from "hono/cors";
// Importa il client e le definizioni dello schema dal pacchetto condiviso
import { db, users, type SelectUser } from "@repo/db";
import { eq } from "drizzle-orm";

const app = new Hono();

// Configura CORS per permettere richieste dal frontend
app.use(
  "/*",
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "http://localhost:3000", // per sviluppo locale
    ],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (c) => {
  return c.json({ message: "Alice" });
});

app.get("/users", async (c) => {
  try {
    const userList = await db.select().from(users);
    return c.json(userList);
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

// app.get("/users/:id", async (c) => {
//   const userId = parseInt(c.req.param("id"));

//   if (isNaN(userId)) {
//     return c.json({ error: "Invalid ID" }, 400);
//   }

//   // Esegui la query usando il client condiviso
//   //   const user: SelectUser[] = await db
//   //     .select()
//   //     .from(users)
//   //     .where(eq(users.id, userId));

//   //   if (user.length === 0) {
//   //     return c.json({ error: "User not found" }, 404);
//   //   }

//   //   return c.json(user[0]);
// });

export default {
  port: 3001,
  fetch: app.fetch,
};
