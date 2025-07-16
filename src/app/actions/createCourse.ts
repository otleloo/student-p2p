"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { TokenType } from "@prisma/client";

export async function createCourse(data: FormData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "User not authenticated." };
  }

  const unit = data.get("unit") as string;
  const title = data.get("title") as string;
  const description = data.get("description") as string;
  const tokenType = data.get("tokenType") as TokenType;
  const dateTime = new Date(data.get("dateTime") as string);
  const durationHours = parseInt(data.get("durationHours") as string || "0");
  const durationMinutes = parseInt(data.get("durationMinutes") as string || "0");
  const venueId = data.get("venueId") as string;

  let tokenCost: number;
  switch (tokenType) {
    case TokenType.SILVER:
      tokenCost = 200;
      break;
    case TokenType.GOLD:
      tokenCost = 500;
      break;
    case TokenType.DIAMOND:
      tokenCost = 1000;
      break;
    default:
      return { error: "Invalid token type." };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.balance < tokenCost) {
    return { error: "Insufficient coins to create this course." };
  }

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: { balance: { decrement: tokenCost } },
    });

    // Find or create the CentralFund record
    let centralFund = await tx.centralFund.findFirst();
    if (!centralFund) {
      centralFund = await tx.centralFund.create({ data: {} }); // Create with default 0s
    }

    // Increment the appropriate coin type in CentralFund
    const updateData: { silverCoins?: { increment: number }; goldCoins?: { increment: number }; diamondCoins?: { increment: number } } = {};
    switch (tokenType) {
      case TokenType.SILVER:
        updateData.silverCoins = { increment: tokenCost };
        break;
      case TokenType.GOLD:
        updateData.goldCoins = { increment: tokenCost };
        break;
      case TokenType.DIAMOND:
        updateData.diamondCoins = { increment: tokenCost };
        break;
    }

    await tx.centralFund.update({
      where: { id: centralFund.id },
      data: updateData,
    });

    await tx.course.create({
      data: {
        unit,
        title,
        description,
        tokenCost,
        tokenType,
        dateTime,
        durationHours,
        durationMinutes,
        venue: { connect: { id: venueId } },
        creator: { connect: { id: userId } },
      },
    });
  });

  revalidatePath("/home");
  return { success: true };
}
