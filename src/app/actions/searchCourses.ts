"use server";

import { prisma } from "@/lib/prisma";

export async function searchCourses(query: string) {
  if (!query) {
    return { courses: [] };
  }

  try {
    const courses = await prisma.course.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
          { unit: { contains: query } },
        ],
      },
      include: {
        creator: {
          include: {
            program: true,
          },
        },
        venue: true,
      },
      take: 10, // Limit results
    });
    return { courses };
  } catch (error) {
    console.error("Error searching courses:", error);
    return { error: "Failed to search courses." };
  }
}
