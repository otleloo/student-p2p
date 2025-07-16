"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getUserResources() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "User not authenticated." };
  }

  try {
    const resources = await prisma.resource.findMany({
      where: {
        creatorId: userId,
      },
      select: {
        id: true,
        unit: true,
        title: true,
        description: true,
        fileUrl: true,
        fileType: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { resources };
  } catch (error) {
    console.error("Error fetching user resources:", error);
    return { error: "Failed to fetch resources." };
  }
}
