"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function updateProfile(formData: FormData) {
  console.log("Server - Received formData:", formData);
  const avatarInput = formData.get("avatar");
  const profileBgInput = formData.get("profileBg");
  console.log("Server - avatarInput:", avatarInput, "typeof:", typeof avatarInput, "instanceof File:", avatarInput instanceof File);
  console.log("Server - profileBgInput:", profileBgInput, "typeof:", typeof profileBgInput, "instanceof File:", profileBgInput instanceof File);

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "User not authenticated." };
  }

  // Fetch current user data to get existing image URLs
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { avatar: true, profileBg: true },
  });

  if (!currentUser) {
    return { error: "User not found." };
  }

  const bio = formData.get("bio") as string;
  const username = formData.get("username") as string;
  const courseCode = formData.get("courseCode") as string;

  let programId: string | null = null;
  if (courseCode) {
    const program = await prisma.program.findUnique({
      where: { courseCode: courseCode },
    });
    if (program) {
      programId = program.id;
    }
  }

  const uploadDir = path.join(process.cwd(), "public/uploads");
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (err) {
    console.error("Failed to create upload directory:", err);
    return { error: "Failed to create upload directory." };
  }

  let avatarUrl: string | null = currentUser.avatar; // Start with current avatar
  if (avatarInput === "REMOVE_IMAGE") {
    avatarUrl = null;
  } else if (avatarInput instanceof File && avatarInput.size > 0) {
    const buffer = Buffer.from(await avatarInput.arrayBuffer());
    const filename = `${Date.now()}-${avatarInput.name}`;
    const filePath = path.join(uploadDir, filename);
    console.log(`Attempting to write avatar file to: ${filePath}`);
    try {
      await writeFile(filePath, buffer);
      console.log(`Successfully wrote avatar file to: ${filePath}`);
      avatarUrl = `/uploads/${filename}`;
    } catch (err) {
      console.error(`Failed to write avatar file to ${filePath}:`, err);
      return { error: "Failed to upload avatar." };
    }
  } else if (typeof avatarInput === 'string' && avatarInput !== "[object File]") { // If it's a string, it's the existing URL
    avatarUrl = avatarInput;
  }

  let profileBgUrl: string | null = currentUser.profileBg; // Start with current profileBg
  if (profileBgInput === "REMOVE_IMAGE") {
    profileBgUrl = null;
  } else if (profileBgInput instanceof File && profileBgInput.size > 0) {
    const buffer = Buffer.from(await profileBgInput.arrayBuffer());
    const filename = `${Date.now()}-${profileBgInput.name}`;
    const filePath = path.join(uploadDir, filename);
    console.log(`Attempting to write profile background file to: ${filePath}`);
    try {
      await writeFile(filePath, buffer);
      console.log(`Successfully wrote profile background file to: ${filePath}`);
      profileBgUrl = `/uploads/${filename}`;
    } catch (err) {
      console.error(`Failed to write profile background file to ${filePath}:`, err);
      return { error: "Failed to upload profile background." };
    }
  } else if (typeof profileBgInput === 'string' && profileBgInput !== "[object File]") { // If it's a string, it's the existing URL
    profileBgUrl = profileBgInput;
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        username: username || undefined,
        bio: bio || undefined,
        avatar: avatarUrl,
        profileBg: profileBgUrl,
        program: programId ? { connect: { id: programId } } : { disconnect: true },
      },
    });
    revalidatePath("/home");
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { error: "Failed to update profile." };
  }
}