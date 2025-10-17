import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Genera le iniziali da un nome (max 2 caratteri)
 */
export function getInitials(name: string | null | undefined): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Formatta una data in formato italiano
 */
export function formatDate(
  date: Date | string | null | undefined,
  locale: string = "it-IT"
): string {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Calcola i giorni trascorsi da una data
 */
export function getDaysSince(date: Date | string | null | undefined): number {
  if (!date) return 0;
  const startDate = new Date(date).getTime();
  const now = Date.now();
  return Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
}
