"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export async function bookCourse(courseId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "User not authenticated." };
  }

  // Check if user has already booked this course
  const existingBooking = await prisma.booking.findUnique({
    where: {
      userId_courseId: {
        userId: userId,
        courseId: courseId,
      },
    },
  });

  if (existingBooking) {
    return { error: "You have already booked this course." };
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: { creator: true },
  });

  if (!course) {
    return { error: "Course not found." };
  }

  if (course.creatorId === userId) {
    return { error: "You cannot book your own course." };
  }

  const bookingCost = course.tokenCost * 2;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.balance < bookingCost) {
    return { error: "Insufficient coins to book this course." };
  }

  await prisma.$transaction(async (tx) => {
    // Deduct coins from the booker
    await tx.user.update({
      where: { id: userId },
      data: { balance: { decrement: bookingCost } },
    });

    // Add coins to the creator
    await tx.user.update({
      where: { id: course.creatorId },
      data: { balance: { increment: bookingCost } },
    });

    // You might want to add a Booking model here to track bookings
    // For now, we'll just handle the coin transfer.
    await tx.booking.create({
      data: {
        userId: userId,
        courseId: courseId,
      },
    });
  });

  revalidatePath("/home");
  return { success: true };
}
