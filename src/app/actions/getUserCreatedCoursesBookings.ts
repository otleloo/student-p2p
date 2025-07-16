"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getUserCreatedCoursesBookings() {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  const userId = session.user.id;

  try {
    const courses = await prisma.course.findMany({
      where: {
        creatorId: userId,
      },
      include: {
        bookings: {
          include: {
            user: {
              select: {
                username: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return { courses };
  } catch (error) {
    console.error("Error fetching user created courses bookings:", error);
    return { error: "Failed to fetch user created courses bookings." };
  }
}