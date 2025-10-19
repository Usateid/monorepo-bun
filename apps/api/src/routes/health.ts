import { db, jwks, user } from "@repo/db";
import { Hono } from "hono";

const health = new Hono();

/**
 * Route di base per verificare che il server sia attivo
 */
health.get("/", (c) => {
  return c.json({ message: "Welcome!" });
});

/**
 * Health check endpoint
 */
health.get("/health", async (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default health;
