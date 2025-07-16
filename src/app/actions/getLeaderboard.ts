"use server";

import { prisma } from "@/lib/prisma";

export async function getLeaderboard() {
  const users = await prisma.user.findMany({
    orderBy: {
      balance: "desc",
    },
    take: 10,
  });

  return users;
}