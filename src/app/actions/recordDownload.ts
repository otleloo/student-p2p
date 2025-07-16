
"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function recordDownload(resourceId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: "User not authenticated." };
  }

  const userId = session.user.id;

  try {
    // Check if the user has already downloaded this resource
    const existingDownload = await prisma.download.findUnique({
      where: {
        userId_resourceId: {
          userId: userId,
          resourceId: resourceId,
        },
      },
    });

    if (existingDownload) {
      return { success: true, message: "Resource already downloaded by this user." };
    }

    // Create a new download record
    await prisma.download.create({
      data: {
        userId: userId,
        resourceId: resourceId,
      },
    });

    return { success: true, message: "Download recorded successfully." };
  } catch (error) {
    console.error("Error recording download:", error);
    return { success: false, message: "Failed to record download." };
  }
}
