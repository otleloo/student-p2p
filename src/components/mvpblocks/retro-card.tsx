"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { bookCourse } from "@/app/actions/bookCourse";

interface RetroCardProps {
  id: string;
  title: string;
  description: string;
  date: string; // This is now course.dateTime
  createdAtDate: string; // New prop for course.createdAt
  unit: string;
  tokenCost: string;
  rawTokenCost: number; // New prop for original token cost
  creatorName: string;
  creatorCourseCode: string;
  venueName: string;
}

export function RetroCard({
  id,
  title,
  description,
  date,
  createdAtDate,
  unit,
  tokenCost,
  rawTokenCost,
  creatorName,
  creatorCourseCode,
  venueName,
}: RetroCardProps) {
  const handleBookCourse = async () => {
    const result = await bookCourse(id);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(`Successfully booked ${title} for ${rawTokenCost * 2} coins!`);
    }
  };

  const formattedDate = new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });
  const formattedTime = new Date(date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h24' });
  const formattedCreatedAt = new Date(createdAtDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <article className="flex w-full max-w-sm flex-col items-start justify-between border-4 border-black bg-background p-6 shadow-[8px_8px_0_0_#000] transition-shadow duration-300 hover:shadow-[12px_12px_0_0_#000] dark:border-white dark:shadow-[8px_8px_0_0_#fff] dark:hover:shadow-[12px_12px_0_0_#fff]">
      <div className="mb-2 flex items-center gap-x-2 text-xs">
        <div className="border-2 border-black bg-red-500 px-3 py-1 font-bold text-foreground dark:border-white">
          {formattedCreatedAt}
        </div>
        <a
          href="#"
          className="relative z-10 border-2 border-border bg-red-500 px-3 py-1 font-bold text-foreground transition-colors duration-300 hover:bg-blue-700"
        >
          {unit}
        </a>
      </div>
      <div className="group relative">
        <h3 className="group-hover:text-red-5-0 mt-3 text-2xl font-black uppercase leading-6 text-foreground">
          <a href="#">
            <span className="absolute inset-0 max-w-xs"></span>{title}
          </a>
        </h3>
        <p className="text-md mt-5 border-l-4 border-red-500 pl-4 leading-6 text-gray-800 dark:text-gray-100">
          {description}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-2">
        <div className="text-sm leading-6">
          <div className="flex items-center gap-x-2">
            <p className="font-black text-foreground">
              <a href="#" className="hover:underline">
                <span className="absolute inset-0"></span>{creatorName}
              </a>
            </p>
            <Badge variant="secondary" className="font-bold">
              {creatorCourseCode}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Venue: {venueName}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Time: {formattedDate} | {formattedTime}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between w-full">
        <span className="text-lg font-bold">{tokenCost}</span>
        <Button onClick={handleBookCourse}>Book Course</Button>
      </div>
    </article>
  );
}
