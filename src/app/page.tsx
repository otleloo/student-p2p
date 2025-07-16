import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section id="hero" className="w-full py-4 sm:py-8 md:py-12 lg:py-16 xl:py-24 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center" style={{ backgroundImage: "url('/Asset 2cd.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-6">
              Unlock Your Potential<br />with Peer-to-Peer<br />Learning
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-10 max-w-3xl mx-auto">
              Connect with fellow students, create and book courses, and share resources in a centralized hub.
            </p>
            <div className="space-x-4">
              <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
                <Link href="/auth/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
                <Link href="#key-features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our platform offers a comprehensive suite of tools to enhance your learning experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="grid place-items-center">
                  <UsersIcon className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Connect with Peers</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Find and connect with students who share your academic interests and goals.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center border-l border-r border-gray-300 dark:border-gray-600">
                <div className="grid place-items-center">
                  <BookOpenIcon className="h-12 w-12 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold">Create & Book Courses</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Design your own courses or enroll in those created by other students.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="grid place-items-center">
                  <Share2Icon className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="text-xl font-bold">Share Resources</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Access and contribute to a centralized hub of learning materials and study aids.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Getting started with our platform is simple. Follow these steps to begin your learning journey.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="grid place-items-center">
                  <UserPlusIcon className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">1. Sign Up</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Create your free account to access all the features of our platform.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center border-l border-r border-gray-300 dark:border-gray-600">
                <div className="grid place-items-center">
                  <SearchIcon className="h-12 w-12 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold">2. Discover Courses</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Browse through a wide range of courses created by your peers.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="grid place-items-center">
                  <GraduationCapIcon className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="text-xl font-bold">3. Start Learning</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Enroll in courses, connect with instructors, and begin your learning journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Students Say</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Hear from students who have transformed their learning experience with our platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="bg-transparent border-none shadow-none">
                <CardContent className="flex flex-col justify-center space-y-4 text-center p-0">
                  <div className="grid place-items-center">
                    <QuoteIcon className="h-12 w-12 text-blue-500" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    &quot;This platform has revolutionized the way I learn. Connecting with peers and sharing resources has been invaluable.&quot;
                  </p>
                  <p className="text-sm font-semibold">- Jane Doe, University of Example</p>
                </CardContent>
              </Card>
              <Card className="bg-transparent border-none shadow-none">
                <CardContent className="flex flex-col justify-center space-y-4 text-center p-0">
                  <div className="grid place-items-center">
                    <QuoteIcon className="h-12 w-12 text-purple-500" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    &quot;I love the ability to create and book courses. It&apos;s so easy to find exactly what I need to learn.&quot;
                  </p>
                  <p className="text-sm font-semibold">- John Smith, College of Academia</p>
                </CardContent>
              </Card>
              <Card className="bg-transparent border-none shadow-none">
                <CardContent className="flex flex-col justify-center space-y-4 text-center p-0">
                  <div className="grid place-items-center">
                    <QuoteIcon className="h-12 w-12 text-green-500" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    &quot;The resource hub is a game-changer. I&apos;ve found so many helpful materials that I wouldn&apos;t have otherwise.&quot;
                  </p>
                  <p className="text-sm font-semibold">- Emily White, Institute of Knowledge</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="get-started" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Get Started?</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join our community of learners today and unlock your full potential.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
                  <Link href="/auth/register">Sign Up Now</Link>
                </Button>
                <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
                  <Link href="#get-started">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function BookOpenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function Share2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  );
}

function UserPlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function GraduationCapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-6" />
      <path d="M12 15a6 6 0 0 0 6-6V3H6v6a6 6 0 0 0 6 6Z" />
      <path d="M6 3v6a6 6 0 0 0 6 6v-6a6 6 0 0 0-6-6Z" />
    </svg>
  );
}

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h3c1 0 1 1 1 2v3c0 1.1-.9 2-2 2H3c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2Z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h3c1 0 1 1 1 2v3c0 1.1-.9 2-2 2h-3c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2Z" />
    </svg>
  );
}
