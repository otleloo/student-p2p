"use server";

import { prisma } from "@/lib/prisma";

export async function getMostBookedCreator() {
  try {
    const creators = await prisma.user.findMany({
      where: {
        createdCourses: {
          some: {},
        }, // Only include users who have created at least one course
      },
      include: {
        createdCourses: {
          include: {
            bookings: true,
          },
        },
      },
    });

    const creatorsWithBookingCounts = creators.map((creator) => {
      const totalBookings = creator.createdCourses.reduce((sum, course) => sum + course.bookings.length, 0);
      return {
        id: creator.id,
        username: creator.username,
        totalBookings: totalBookings,
      };
    });

    creatorsWithBookingCounts.sort((a, b) => b.totalBookings - a.totalBookings);

    return { creators: creatorsWithBookingCounts.slice(0, 5) };
  } catch (error) {
    console.error("Error fetching most booked creators:", error);
    return { error: "Failed to fetch most booked creators." };
  }
}