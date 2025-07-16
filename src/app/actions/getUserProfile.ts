"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getUserProfile() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "User not authenticated." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
        registrationNumber: true,
        email: true,
        avatar: true,
        profileBg: true,
        bio: true,
        program: true,
        balance: true,
      },
    });
    return { user };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { error: "Failed to fetch user profile." };
  }
}
