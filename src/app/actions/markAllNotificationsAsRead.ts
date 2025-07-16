"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function markAllNotificationsAsRead() {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  await prisma.notification.updateMany({
    where: {
      userId: session.user.id,
      read: false,
    },
    data: {
      read: true,
    },
  });

  return { success: true };
}