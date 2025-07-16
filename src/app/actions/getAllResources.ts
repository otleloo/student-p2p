import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getAllResources(query?: string, fileType?: string, unit?: string) {
  const where: Prisma.ResourceWhereInput = {};

  if (query) {
    where.OR = [
      { title: { contains: query } },
      { description: { contains: query } },
      { unit: { contains: query } },
    ];
  }

  if (fileType) {
    where.fileType = fileType;
  }

  if (unit) {
    where.unit = unit;
  }

  try {
    const resources = await prisma.resource.findMany({
      where,
      include: {
        creator: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { resources, error: null };
  } catch (error) {
    console.error("Error fetching resources:", error);
    return { resources: [], error: "Failed to fetch resources." };
  }
}