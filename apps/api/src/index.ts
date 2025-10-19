import { Hono } from "hono";
import { corsMiddleware } from "./middleware/cors";
import { setupRoutes } from "./routes";

// Inizializza l'app Hono
const app = new Hono();

// Applica il middleware CORS globalmente
app.use("/*", corsMiddleware);

// Setup di tutte le routes
setupRoutes(app);

// Configurazione del server
const port = process.env.PORT || 3001;

// Avvia il server e memorizza l'istanza
const server = Bun.serve({
  port,
  fetch: app.fetch,
});

// Graceful shutdown handler
const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  try {
    // Stop accepting new connections
    server.stop();
    console.log("✅ Server stopped accepting new connections");

    // Give ongoing requests time to complete (max 1 second)
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
