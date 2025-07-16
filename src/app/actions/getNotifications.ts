"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getNotifications() {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  const notifications = await prisma.notification.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return notifications;
}