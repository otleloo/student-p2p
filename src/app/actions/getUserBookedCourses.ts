"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getUserBookedCourses() {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  const userId = session.user.id;

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: userId,
      },
      include: {
        course: true,
      },
    });

    return { bookings };
  } catch (error) {
    console.error("Error fetching user booked courses:", error);
    return { error: "Failed to fetch user booked courses." };
  }
}