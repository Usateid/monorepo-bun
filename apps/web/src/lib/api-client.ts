/**
 * API Client configurato con baseURL
 * Fornisce funzioni helper per fare chiamate all'API backend
 */

import { token } from "./auth-client";

// Configurazione del base URL dell'API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/**
 * Opzioni per le chiamate API
 */
interface ApiRequestInit extends RequestInit {
  // Le opzioni standard di RequestInit sono sufficienti
}

/**
 * Fetch wrapper con baseURL configurato
 *
 * @param endpoint - L'endpoint API (es. "/users", "/health")
 * @param options - Opzioni per la richiesta fetch
 * @returns Response della fetch
 *
 * @example
 * ```ts
 * // GET request
 * const response = await apiFetch('/users');
 * const data = await response.json();
 *
 * // POST request
 * const response = await apiFetch('/users', {
 *   method: 'POST',
 *   body: JSON.stringify({ name: 'John' })
 * });
 * ```
 */
export async function apiFetch(
  endpoint: string,
  options: ApiRequestInit = {}
): Promise<Response> {
  const { headers = {}, ...restOptions } = options;
  const { data } = await token();
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  // Configura le opzioni di default con JWT Bearer token
  const fetchOptions: RequestInit = {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...headers,
      ...(data && { Authorization: `Bearer ${data.token}` }),
    },
  };

  return fetch(url, fetchOptions);
}

/**
 * Helper per GET request
 *
 * @example
 * ```ts
 * const data = await apiGet('/users');
 * ```
 */
export async function apiGet<T = any>(
  endpoint: string,
  options?: ApiRequestInit
): Promise<T> {
  const response = await apiFetch(endpoint, {
    ...options,
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API Error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Helper per POST request
 *
 * @example
 * ```ts
 * const data = await apiPost('/users', { name: 'John', email: 'john@example.com' });
 * ```
 */
export async function apiPost<T = any>(
  endpoint: string,
  body?: any,
  options?: ApiRequestInit
): Promise<T> {
  const response = await apiFetch(endpoint, {
    ...options,
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API Error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Helper per PUT request
 *
 * @example
 * ```ts
 * const data = await apiPut('/users/1', { name: 'John Updated' });
 * ```
 */
export async function apiPut<T = any>(
  endpoint: string,
  body?: any,
  options?: ApiRequestInit
): Promise<T> {
  const response = await apiFetch(endpoint, {
    ...options,
    method: "PUT",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API Error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Helper per DELETE request
 *
 * @example
 * ```ts
 * await apiDelete('/users/1');
 * ```
 */
export async function apiDelete<T = any>(
  endpoint: string,
  options?: ApiRequestInit
): Promise<T> {
  const response = await apiFetch(endpoint, {
    ...options,
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API Error: ${response.statusText}`);
  }

  // Alcune DELETE potrebbero non restituire contenuto
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return {} as T;
}

/**
 * Esporta il baseURL per utilizzi personalizzati
 */
export { API_BASE_URL };
