// packages/db/src/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

// Assicurati che DATABASE_URL sia disponibile nell'ambiente in cui il codice viene eseguito
const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client, { schema });

// Esporta tutto ciò che l'esterno deve usare
export * from "./schema";
export { db };
