import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getUserCreatedCoursesBookings } from "@/app/actions/getUserCreatedCoursesBookings";
import { getUserBookedCourses } from "@/app/actions/getUserBookedCourses";
import { getTopBookedCourses } from "@/app/actions/getTopBookedCourses";
import { getMostBookedCreator } from "@/app/actions/getMostBookedCreator";

interface UserBooking {
  id: string;
  bookedAt: Date;
  user: { username: string; email: string };
}

interface CourseWithBookings {
  id: string;
  title: string;
  bookings: UserBooking[];
}

interface BookedCourse {
  id: string;
  bookedAt: Date;
  course: {
    id: string;
    title: string;
  };
}

interface TopCourse {
  id: string;
  title: string;
  _count: { bookings: number };
}

interface MostBookedCreator {
  id: string;
  username: string;
  totalBookings: number;
}

export default function BookingsContent() {
  const [createdCoursesBookings, setCreatedCoursesBookings] = useState<CourseWithBookings[]>([]);
  const [bookedCourses, setBookedCourses] = useState<BookedCourse[]>([]);
  const [topCourses, setTopCourses] = useState<TopCourse[]>([]);
  const [mostBookedCreators, setMostBookedCreators] = useState<MostBookedCreator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [created, booked, top, creators] = await Promise.all([
        getUserCreatedCoursesBookings(),
        getUserBookedCourses(),
        getTopBookedCourses(),
        getMostBookedCreator(),
      ]);

      if (created?.courses) setCreatedCoursesBookings(created.courses);
      if (booked?.bookings) setBookedCourses(booked.bookings);
      if (top?.topCourses) setTopCourses(top.topCourses);
      if (creators?.creators) setMostBookedCreators(creators.creators);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading bookings data...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Who booked my courses */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Who Booked My Courses</CardTitle>
          <CardDescription>Bookings for courses you created.</CardDescription>
        </CardHeader>
        <CardContent>
          {createdCoursesBookings.length > 0 ? (
            createdCoursesBookings.map((course) => (
              <div key={course.id} className="mb-4">
                <h3 className="font-semibold">{course.title}</h3>
                {course.bookings.length > 0 ? (
                  <ul>
                    {course.bookings.map((booking: UserBooking) => (
                      <li key={booking.id}>- {booking.user.username} ({booking.user.email}) on {new Date(booking.bookedAt).toLocaleDateString()}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No bookings for this course yet.</p>
                )}
              </div>
            ))
          ) : (
            <p>You haven&apos;t created any courses with bookings yet.</p>
          )}
        </CardContent>
      </Card>

      {/* You booked these courses */}
      <Card className="row-span-2">
        <CardHeader>
          <CardTitle>You Booked These Courses</CardTitle>
          <CardDescription>Courses you have enrolled in.</CardDescription>
        </CardHeader>
        <CardContent>
          {bookedCourses.length > 0 ? (
            <ul>
              {bookedCourses.map((booking) => (
                <li key={booking.id}>- {booking.course.title} on {new Date(booking.bookedAt).toLocaleDateString()}</li>
              ))}
            </ul>
          ) : (
            <p>You haven&apos;t booked any courses yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Top 5 Most Booked Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Most Booked Courses</CardTitle>
          <CardDescription>Courses with the most bookings.</CardDescription>
        </CardHeader>
        <CardContent>
          {topCourses.length > 0 ? (
            <ol>
              {topCourses.map((course, index) => (
                <li key={course.id}>{index + 1}. {course.title} ({course._count.bookings} bookings)</li>
              ))}
            </ol>
          ) : (
            <p>No courses found.</p>
          )}
        </CardContent>
      </Card>

      {/* Most Booked Creator */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Most Booked Creators</CardTitle>
          <CardDescription>Creators with the most course bookings.</CardDescription>
        </CardHeader>
        <CardContent>
          {mostBookedCreators.length > 0 ? (
            <ol>
              {mostBookedCreators.map((creator, index) => (
                <li key={creator.id}>{index + 1}. {creator.username} ({creator.totalBookings} bookings)</li>
              ))}
            </ol>
          ) : (
            <p>No creators found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}