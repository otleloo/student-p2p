import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-white shadow-sm dark:bg-gray-950">
      <Link className="flex items-center justify-center" href="#">
        <BookIcon className="h-6 w-6" />
        <span className="sr-only">P2P Learning Platform</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Courses
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Resources
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          About
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Contact
        </Link>
        <Button asChild>
          <Link href="/auth/signin">Sign In</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/auth/register">Sign Up</Link>
        </Button>
      </nav>
    </header>
  );
}

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}
