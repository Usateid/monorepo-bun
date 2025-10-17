export * from "@repo/validation";
import { z } from "zod";
import type { User } from "./auth";
import { getSession } from "./auth";

export type ActionState = {
  error?: boolean;
  success?: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
  [key: string]: any;
};

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData) => {
    const formDataObj = Object.fromEntries(formData);
    const result = schema.safeParse(formDataObj);

    if (!result.success) {
      return {
        ...formDataObj,
        message: result.error.errors[0].message,
        error: true,
      };
    }

    return action(result.data, formData);
  };
}

type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData,
  user: User
) => Promise<T>;

export function validatedActionWithUser<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionWithUserFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData) => {
    const session = await getSession();
    const user = session?.user;
    if (!user) {
      return {
        error: "User is not authenticated",
      };
    }

    const formDataObj = Object.fromEntries(formData);
    const result = schema.safeParse(formDataObj);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error: z.ZodIssue) => {
        const fieldName = error.path.join(".");
        fieldErrors[fieldName] = error.message;
      });

      return {
        error: result.error.errors[0].message,
        fieldErrors,
      };
    }

    return action(result.data, formData, user);
  };
}

type ValidatedActionWithRoleFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData,
  user: User
) => Promise<T>;

export function validatedActionWithRole<S extends z.ZodType<any, any>, T>(
  schema: S,
  requiredRole: string | string[],
  action: ValidatedActionWithRoleFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData) => {
    const session = await getSession();
    const user = session?.user;
    if (!user) {
      return {
        error: "User is not authenticated",
      };
    }

    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    // Note: Better Auth user type doesn't have a role field by default
    // You may need to extend the user schema to add roles
    // if (!roles.includes(user.role)) {
    //   return {
    //     error: "You do not have permission to perform this action",
    //   };
    // }

    const formDataObj = Object.fromEntries(formData);
    const result = schema.safeParse(formDataObj);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error: z.ZodIssue) => {
        const fieldName = error.path.join(".");
        fieldErrors[fieldName] = error.message;
      });

      return {
        error: result.error.errors[0].message,
        fieldErrors,
      };
    }

    return action(result.data, formData, user);
  };
}
