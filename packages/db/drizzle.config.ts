import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
import * as path from "path";

// Carica .env dalla root del monorepo
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export default {
  schema: "./src/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
