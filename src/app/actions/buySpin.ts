"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function buySpin() {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return { error: "User not found" };
  }

  if (user.balance < 500) {
    return { error: "Not enough balance" };
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: session.user.id },
      data: {
        balance: {
          decrement: 500,
        },
        spinBalance: {
          increment: 1,
        },
      },
    }),
    prisma.loss.create({
      data: {
        amount: 500,
        userId: session.user.id,
      },
    }),
  ]);

  return { success: true };
}