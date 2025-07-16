"use server";

import { prisma } from "@/lib/prisma";

export async function getVenues() {
  const venues = await prisma.venue.findMany();
  return venues;
}
