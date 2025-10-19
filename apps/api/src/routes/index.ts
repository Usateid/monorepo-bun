import { Hono } from "hono";
import health from "./health";
import users from "./users";
import { db, jwks } from "@repo/db";

/**
 * Aggregatore di tutte le routes dell'API
 */
export function setupRoutes(app: Hono) {
  // Health check routes (non protette)
  app.route("/", health);

  // Users routes (protette)
  app.route("/users", users);
}
