import { PrismaClient, CourseCategory } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  const seedCourses = async (filePath: string, category: CourseCategory) => {
    const data = readFileSync(filePath, 'utf-8');
    const lines = data.split('\n').filter(Boolean).slice(1); // Skip header row and filter empty lines

    for (const line of lines) {
      let courseCode: string;
      let courseName: string;
      let school: string;

      if (category === CourseCategory.CERTIFICATE || category === CourseCategory.PHD) {
        // For Certificate and PhD, only courseName is available directly
        courseName = line.trim();
        courseCode = courseName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().substring(0, 10); // Generate code from name
        school = 'N/A'; // Default school for these categories
      } else {
        [courseCode, courseName, school] = line.split(',').map(s => s.trim());
      }

      if (courseCode && courseName) {
        await prisma.program.upsert({
          where: { courseCode: courseCode },
          update: {},
          create: {
            courseCode: courseCode,
            courseName: courseName,
            school: school || 'N/A', // Ensure school is not empty
            category,
          },
        });
      }
    }
  };

  await seedCourses(join(__dirname, '../courses/bachelors.csv'), CourseCategory.BACHELORS);
  await seedCourses(join(__dirname, '../courses/certificate_programs.csv'), CourseCategory.CERTIFICATE);
  await seedCourses(join(__dirname, '../courses/diplomas.csv'), CourseCategory.DIPLOMA);
  await seedCourses(join(__dirname, '../courses/masters.csv'), CourseCategory.MASTERS);
  await seedCourses(join(__dirname, '../courses/phd_programs.csv'), CourseCategory.PHD);

  const seedVenues = async () => {
    const venues = ["Villa", "CTA", "Engineering Lab", "Tennis Court", "Blaze Center"];
    for (const venueName of venues) {
      await prisma.venue.upsert({
        where: { name: venueName },
        update: {},
        create: { name: venueName },
      });
    }
    console.log('Venues seeded.');
  };

  await seedVenues();

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
