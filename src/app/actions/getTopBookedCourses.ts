"use server";

import { prisma } from "@/lib/prisma";

export async function getTopBookedCourses() {
  try {
    const topCourses = await prisma.course.findMany({
      orderBy: {
        bookings: {
          _count: "desc",
        },
      },
      take: 5,
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });

    return { topCourses };
  } catch (error) {
    console.error("Error fetching top booked courses:", error);
    return { error: "Failed to fetch top booked courses." };
  }
}