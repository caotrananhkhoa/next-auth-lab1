"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export type LoginStatusType = {
  status: number;
  message: string;
};
export const login = async (value: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(value);
  if (!validatedFields.success) {
    return {
      status: 1,
      message: "Invalid fields!",
    };
  }
  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { status: 0, message: "Login success!" };
  } catch (error) {
    // Catch error from signIn
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: 1, message: "Invalid credentials!" };
        default:
          return { status: 1, message: "Something went wrong!" };
      }
    }

    // Next.js will process this error
    throw error
  }
};
