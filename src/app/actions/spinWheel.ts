"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function spinWheel() {
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

  if (user.spinBalance <= 0) {
    return { error: "Not enough spins" };
  }

  const segments = [
    { id: 1, amount: 500 },
    { id: 2, amount: 100000 },
    { id: 3, amount: 200 },
    { id: 4, amount: 0 },
    { id: 5, amount: 20000 },
    { id: 6, amount: 20 },
    { id: 7, amount: 50 },
  ];
  const winningSegment = segments[Math.floor(Math.random() * segments.length)];

  await prisma.$transaction([
    prisma.user.update({
      where: { id: session.user.id },
      data: {
        spinBalance: {
          decrement: 1,
        },
        balance: {
          increment: winningSegment.amount,
        },
        lastSpinDate: new Date(),
      },
    }),
    prisma.winnings.create({
      data: {
        amount: winningSegment.amount,
        userId: session.user.id,
      },
    }),
  ]);

  return { success: true, winningAmount: winningSegment.amount, segmentId: winningSegment.id };
}