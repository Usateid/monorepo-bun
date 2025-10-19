import { cors } from "hono/cors";

/**
 * Configurazione CORS per permettere richieste dal frontend
 */
export const corsMiddleware = cors({
  origin: [
    process.env.FRONTEND_URL || "http://localhost:3000",
    "http://localhost:3000", // per sviluppo locale
  ],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: false, // Non servono più i cookie, usiamo JWT Bearer token
});
