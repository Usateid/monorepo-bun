"use server";
import { validatedAction } from "@/lib/auth-validation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { signUpSchema, signInSchema } from "@repo/validation";
import { redirect } from "next/navigation";
import errorHandler, { ErrorResponse } from "@/lib/error-handler";

export async function signUp(name: string, email: string, password: string) {
  const user = await auth.api.signUpEmail({
    body: { name, email, password, callbackURL: "/" },
  });
  return user;
}

export const signUpAction = validatedAction(
  signUpSchema,
  async (data, formData) => {
    const { email, password, name } = data;

    try {
      await auth.api.signUpEmail({
        body: { name, email, password, callbackURL: "/" },
      });
    } catch (error) {
      return {
        ...data,
        error: true,
        message: "Failed to create user. Please try again.",
      };
    }

    redirect("/");
  }
);

export const signInAction = validatedAction(
  signInSchema,
  async (data, formData) => {
    const { email, password } = data;

    try {
      await auth.api.signInEmail({ body: { email, password } });
    } catch (error) {
      return {
        ...data,
        ...errorHandler(error as ErrorResponse),
        error: true,
      };
    }
    redirect("/");
  }
);

// export async function signIn(email: string, password: string) {
//   try {
//     const signInEmailResponse = await auth.api.signInEmail({
//       body: { email, password },
//     });
//     return {
//       response: "success",
//       message: "User signed in successfully",
//       user: signInEmailResponse,
//     };
//   } catch (error) {
//     return {
//       response: "error",
//       message: (error as Error).message,
//       user: null,
//     };
//   }
// }

export async function signOut() {
  try {
    const response = await auth.api.signOut({ headers: await headers() });
    return {
      response: "success",
      message: "User signed out successfully",
    };
  } catch (error) {
    return {
      response: "error",
      message: (error as Error).message,
    };
  }
}
