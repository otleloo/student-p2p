"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function addResource(data: FormData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "User not authenticated." };
  }

  const unit = data.get("unit") as string;
  const title = data.get("title") as string;
  const description = data.get("description") as string;

  const uploadDir = path.join(process.cwd(), "public/uploads");
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (err) {
    console.error("Failed to create upload directory:", err);
    return { error: "Failed to create upload directory." };
  }

  const filesToUpload: File[] = [];
  for (const [key, value] of data.entries()) {
    console.log(`Server - FormData entry: ${key}, value: ${value}, typeof: ${typeof value}, instanceof File: ${value instanceof File}`);
    if (key.startsWith("file-") && value instanceof File) {
      filesToUpload.push(value);
    }
  }

  if (filesToUpload.length === 0) {
    return { error: "No files selected for upload." };
  }

  for (const file of filesToUpload) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, filename);

    try {
      await writeFile(filePath, buffer);
      const fileUrl = `/uploads/${filename}`;
      const fileType = file.type;

      await prisma.resource.create({
        data: {
          unit,
          title,
          description,
          fileUrl,
          fileType,
          creatorId: userId,
        },
      });
    } catch (err) {
      console.error(`Failed to write file ${filename}:`, err);
      return { error: `Failed to upload file ${file.name}.` };
    }
  }

  revalidatePath("/home");
  return { success: true };
}
