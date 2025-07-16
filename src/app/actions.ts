"use server";

import { signIn } from "@/lib/auth";

export async function signInAction(prevState: undefined | { success: boolean } | { error: string }, formData: FormData) {
  try {
    // Manually extract credentials and specify redirectTo
    await signIn("credentials", {
      login: formData.get("login"),
      password: formData.get("password"),
      redirectTo: "/home",
    });
    return { success: true };
  } catch (error) {
    // The NEXT_REDIRECT error is expected, so we re-throw it
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    // Log other errors for debugging
    console.error("signInAction error:", error);
    return { error: "Invalid credentials." };
  }
}
