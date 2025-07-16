"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getBookingNotifications() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "User not authenticated." };
  }

  try {
    const notifications = await prisma.booking.findMany({
      where: {
        course: {
          creatorId: userId,
        },
      },
      include: {
        user: {
          select: { username: true, avatar: true },
        },
        course: {
          select: { title: true, dateTime: true },
        },
      },
      orderBy: {
        bookedAt: "desc",
      },
    });

    return { notifications };
  } catch (error) {
    console.error("Error fetching booking notifications:", error);
    return { error: "Failed to fetch notifications." };
  }
}
