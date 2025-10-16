import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Carica .env dalla root del monorepo (assumendo che i comandi vengano eseguiti dalla root)
dotenv.config();

export default {
  schema: "./src/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
