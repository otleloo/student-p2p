"use server";

import { prisma } from "@/lib/prisma";

export async function searchUsers(query: string) {
  if (!query) {
    return [];
  }

  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: query,
      },
    },
    take: 10,
  });

  return users;
}