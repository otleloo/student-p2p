import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { username, email, password, registrationNumber, courseCode, avatar } = await request.json();

    // Check if user with email or username already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or username already exists." },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let programId = undefined;
    if (courseCode) {
      const program = await prisma.program.findUnique({
        where: { courseCode: courseCode },
      });
      if (program) {
        programId = program.id;
      }
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        registrationNumber: registrationNumber || null,
        programId: programId || null,
        avatar: avatar || null,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
