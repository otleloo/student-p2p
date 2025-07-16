"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function transferFunds(recipientId: string, amount: number) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  if (amount <= 0) {
    return { error: "Invalid amount" };
  }

  const sender = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!sender || sender.balance < amount) {
    return { error: "Insufficient funds" };
  }

  const recipient = await prisma.user.findUnique({
    where: { id: recipientId },
  });

  if (!recipient) {
    return { error: "Recipient not found" };
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: session.user.id },
      data: { balance: { decrement: amount } },
    }),
    prisma.user.update({
      where: { id: recipientId },
      data: { balance: { increment: amount } },
    }),
    prisma.notification.create({
      data: {
        userId: recipientId,
        message: `You received ${amount} coins from ${sender.username}`,
      },
    }),
    prisma.notification.create({
      data: {
        userId: session.user.id,
        message: `You sent ${amount} coins to ${recipient.username}`,
      },
    }),
  ]);

  return { success: true };
}