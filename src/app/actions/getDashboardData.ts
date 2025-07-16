
"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getDashboardData() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      totalBookings: 0,
      totalFunds: 0,
      createdResources: 0,
      downloads: 0,
      recentDownloads: [],
      highestBalance: 0,
      spinBalance: 0,
      todaysWinnings: 0,
      totalLosses: 0,
    };
  }

  const userId = session.user.id;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        winnings: true,
        losses: true,
        _count: {
          select: {
            bookings: true,
            createdResources: true,
          },
        },
        downloads: {
          orderBy: { downloadedAt: "desc" },
          take: 5,
          include: { resource: true },
        },
      },
    });

    if (!user) {
      return {
        totalBookings: 0,
        totalFunds: 0,
        createdResources: 0,
        downloads: 0,
        recentDownloads: [],
        highestBalance: 0,
        spinBalance: 0,
        todaysWinnings: 0,
        totalLosses: 0,
      };
    }

    const now = new Date();
    if (user.lastSpinDate && now.getTime() - user.lastSpinDate.getTime() > 24 * 60 * 60 * 1000) {
      user = await prisma.user.update({
        where: { id: userId },
        data: { spinBalance: { increment: 1 } },
        include: {
          winnings: {
            where: {
              createdAt: {
                gte: today,
              },
            },
          },
          losses: true,
          _count: {
            select: {
              bookings: true,
              createdResources: true,
            },
          },
          downloads: {
            orderBy: { downloadedAt: "desc" },
            take: 5,
            include: { resource: true },
          },
        },
      });
    }

    const todaysWinnings = user.winnings.filter(win => win.createdAt >= today).reduce((acc, win) => acc + win.amount, 0);
    const totalWinnings = user.winnings.reduce((acc, win) => acc + win.amount, 0);
    const totalLosses = user.losses.reduce((acc, loss) => acc + loss.amount, 0);

    const highestBalanceUser = await prisma.user.findFirst({
      orderBy: { balance: "desc" },
      select: { balance: true },
    });

    return {
      totalBookings: user._count.bookings,
      totalFunds: user.balance,
      createdResources: user._count.createdResources,
      downloads: user.downloads.length,
      recentDownloads: user.downloads.map(d => ({
        id: d.id,
        resourceTitle: d.resource.title,
        downloadedAt: d.downloadedAt,
      })),
      highestBalance: highestBalanceUser?.balance || 0,
      spinBalance: user.spinBalance,
      todaysWinnings,
      totalWinnings,
      totalLosses,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      totalBookings: 0,
      totalFunds: 0,
      createdResources: 0,
      downloads: 0,
      recentDownloads: [],
      highestBalance: 0,
      spinBalance: 0,
      todaysWinnings: 0,
      totalWinnings: 0,
      totalLosses: 0,
    };
  }
}
