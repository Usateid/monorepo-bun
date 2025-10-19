import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  db,
  user,
  session,
  account,
  verification,
  jwks,
  SelectUser,
} from "@repo/db";
import { headers } from "next/headers";
import { nextCookies } from "better-auth/next-js";
import { jwt } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
      jwks,
    },
  }),
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  secret:
    process.env.BETTER_AUTH_SECRET || "your-secret-key-change-in-production",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {},
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
      },
    },
  },
  plugins: [nextCookies(), jwt()],
});

export type Session = typeof auth.$Infer.Session;
// Ora Better Auth include il campo role grazie a additionalFields
export type User = typeof auth.$Infer.Session.user;

// Funzione helper per ottenere la sessione server-side
export async function getSession() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  return session;
}
