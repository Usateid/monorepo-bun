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

const port = process.env.PORT || 3001;

// Start server and store server instance
const server = Bun.serve({
  port,
  fetch: app.fetch,
});

console.log(`🚀 Server is running on http://localhost:${port}`);

// Graceful shutdown handler
const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  try {
    // Stop accepting new connections
    server.stop();
    console.log("✅ Server stopped accepting new connections");

    // Give ongoing requests time to complete (max 10 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("✅ Graceful shutdown completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during graceful shutdown:", error);
    process.exit(1);
  }
};

// Handle termination signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
