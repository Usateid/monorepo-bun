import type { SelectUser } from "@repo/db";

/**
 * Risultato dell'autenticazione utente
 */
export interface AuthResult {
  success: boolean;
  user?: SelectUser;
  error?: string;
  status?: number;
}
