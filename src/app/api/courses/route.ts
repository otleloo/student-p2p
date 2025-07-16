import { NextResponse } from "next/server";
import { PrismaClient, CourseCategory } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    if (!category) {
      return NextResponse.json(
        { error: "Course category is required." },
        { status: 400 }
      );
    }

    const programs = await prisma.program.findMany({
      where: {
        category: category as CourseCategory,
      },
      select: {
        id: true,
        courseCode: true,
        courseName: true,
      },
      orderBy: {
        courseName: "asc",
      },
    });

    return NextResponse.json(programs, { status: 200 });

    
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
