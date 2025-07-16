

export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";
import { RetroCard } from "@/components/mvpblocks/retro-card";
import { HomeClientContent } from "@/components/HomeClientContent";
import { auth } from "@/lib/auth";
import { searchCourses } from "@/app/actions/searchCourses";

export default async function HomePage({ searchParams }: { searchParams?: { query?: string } }) {
  const session = await auth();
  const userId = session?.user?.id;
  const query = searchParams?.query;
  const searchQuery = query || "";

  let courses = [];
  if (searchQuery) {
    const result = await searchCourses(searchQuery);
    if (result?.courses) {
      courses = result.courses;
    }
  } else {
    courses = await prisma.course.findMany({
      include: {
        creator: {
          include: {
            program: true,
          },
        },
        venue: true,
      },
    });
  }

  const filteredCourses = courses.filter(course => course.creatorId !== userId);

  return (
    <>
      <HomeClientContent />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-6">Available Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <RetroCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              date={course.dateTime.toISOString()}
              createdAtDate={course.createdAt.toISOString()}
              unit={course.unit}
              creatorName={course.creator.username}
              creatorCourseCode={course.creator.program?.courseCode || "N/A"}
              tokenCost={`Cost: ${course.tokenCost * 2} Coins`}
              rawTokenCost={course.tokenCost}
              venueName={course.venue.name} 
            />
          ))}
        </div>
      </main>
    </>
  );
}
