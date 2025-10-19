import type { Context } from "hono";
import { db, user, jwks } from "@repo/db";
import { eq } from "drizzle-orm";
import { jwtVerify, createRemoteJWKSet } from "jose";
import type { AuthResult } from "./types";
import { errorLog } from "./logger";
import { TokenErrors } from "./return-types";

// Cache per le chiavi JWKS per evitare query ripetute al database
let jwksCache: { keys: any[] } | null = null;
let jwksCacheTime = 0;
const JWKS_CACHE_TTL = 3600000; // 1 ora in millisecondi

/**
 * Recupera le chiavi JWKS dal database per la verifica dei JWT
 * Implementa una cache per migliorare le performance
 */
async function getJWKS(): Promise<{ keys: any[] } | undefined> {
  const now = Date.now();

  // Usa la cache se è ancora valida
  if (jwksCache && now - jwksCacheTime < JWKS_CACHE_TTL) {
    return jwksCache;
  }

  try {
    // Recupera tutte le chiavi pubbliche dal database
    const keys = await db.select().from(jwks);

    if (keys.length === 0) {
      throw new Error("No JWKS keys found in database");
    }

    const formattedKeys = keys
      .map((key, index) => {
        try {
          const publicKey = JSON.parse(key.publicKey);
          return publicKey;
        } catch (error) {
          errorLog(`Error parsing public key ${index + 1}`, error);
          return null;
        }
      })
      .filter(Boolean);

    jwksCache = { keys: formattedKeys };
    jwksCacheTime = now;

    return jwksCache;
  } catch (error) {
    // errorLog("Error fetching JWKS", error);
    console.log("error fetching JWKS", error);
    // throw error;
  }
}

/**
 * Verifica il JWT Bearer token e recupera l'utente corrente
 * Verifica la firma del token usando le chiavi JWKS dal database
 *
 * @param c - Context di Hono
 * @returns AuthResult con user se autenticato, error altrimenti
 */
export async function checkAuthorization(c: Context): Promise<AuthResult> {
  try {
    // Estrai il JWT Bearer token dall'header Authorization
    const authHeader = c.req.header("authorization");

    if (!authHeader) return TokenErrors.UNAUTHORIZED;
    if (!authHeader.startsWith("Bearer ")) return TokenErrors.INVALID_FORMAT;

    // Estrai il token JWT
    const token = authHeader.substring(7); // Rimuove "Bearer "

    if (!token) return TokenErrors.NO_TOKEN;

    // Recupera le chiavi JWKS dal database
    let jwksData;
    try {
      jwksData = await getJWKS();
    } catch (error) {
      console.error("Error getting JWKS:", error);
      return TokenErrors.JWKS_ERROR;
    }

    // Verifica la firma del JWT usando le chiavi pubbliche dal database
    try {
      const JWKS = createRemoteJWKSet(
        new URL(
          process.env.NEXT_PUBLIC_APP_URL ||
            "http://localhost:3000/api/auth/jwks"
        )
      );
      const { payload } = await jwtVerify(token, JWKS, {
        issuer: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        audience: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      });

      // Estrai l'userId dal payload verificato
      const userId = payload.sub || (payload as any).userId;
      if (!userId) {
        return TokenErrors.INVALID_PAYLOAD;
      }

      // Recupera l'utente dal database
      const [currentUser] = await db
        .select()
        .from(user)
        .where((eq as any)(user.id, userId))
        .limit(1);

      if (!currentUser) {
        return {
          success: false,
          error: "Unauthorized - User not found",
          status: 401,
        };
      }

      return {
        success: true,
        user: currentUser,
      };
    } catch (jwtError: any) {
      console.error("JWT verification failed:", jwtError.message);

      // Gestisci errori specifici di JWT
      if (jwtError.code === "ERR_JWT_EXPIRED") {
        return {
          success: false,
          error: "Unauthorized - Token expired",
          status: 401,
        };
      }

      return {
        success: false,
        error: "Unauthorized - Invalid token signature",
        status: 401,
      };
    }
  } catch (error) {
    console.error("Error in checkAuthorization:", error);
    return {
      success: false,
      error: "Internal server error during authentication",
      status: 500,
    };
  }
}

/**
 * Verifica che l'utente corrente sia un amministratore
 *
 * @param c - Context di Hono
 * @returns AuthResult con user se admin, error altrimenti
 */
export async function requireAdmin(c: Context): Promise<AuthResult> {
  const result = await checkAuthorization(c);

  if (!result.success) {
    return result;
  }

  // Verifica che l'utente sia admin
  if (result.user?.role !== "admin") {
    return {
      success: false,
      error: "Forbidden - Admin access required",
      status: 403,
    };
  }

  return result;
}
