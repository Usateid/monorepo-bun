import { z } from "zod";

/**
 * Schema per la registrazione (sign up)
 */
export const signUpSchema = z
  .object({
    email: z.string().email("Email non valida"),
    password: z
      .string()
      .min(8, "La password deve essere di almeno 8 caratteri"),
    name: z.string().min(1, "Il nome è obbligatorio"),
    confirmPassword: z
      .string()
      .min(8, "Conferma password deve essere di almeno 8 caratteri"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Le password non coincidono",
    path: ["confirmPassword"],
  });

/**
 * Schema per il login (sign in)
 */
export const signInSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(8, "La password deve essere di almeno 8 caratteri"),
});

/**
 * Tipi TypeScript derivati dagli schemi
 */
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
