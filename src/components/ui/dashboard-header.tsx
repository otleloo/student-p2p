"use client";

import { Menu, Search, CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Home, BookOpen, Wallet, User, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import NotificationMenu from "@/components/navbar-components/notification-menu";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardHeader({ setActiveMenuItem, activeMenuItem }) {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    router.push(`/dashboard?query=${query}`);
  };

  return (
    <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-muted/70 backdrop-blur-lg px-4 lg:h-[60px] lg:px-6 z-10">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <span>Student P2P</span>
            </Link>
            <button
              onClick={() => {
                setActiveMenuItem("dashboard");
              }}
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${activeMenuItem === "dashboard" ? "text-foreground" : "text-muted-foreground"}`}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </button>
            <button
              onClick={() => {
                setActiveMenuItem("profile");
              }}
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${activeMenuItem === "profile" ? "text-foreground" : "text-muted-foreground"}`}
            >
              <User className="h-5 w-5" />
              Profile
            </button>
            <button
              onClick={() => {
                setActiveMenuItem("bookings");
              }}
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${activeMenuItem === "bookings" ? "text-foreground" : "text-muted-foreground"}`}
            >
              <BookOpen className="h-5 w-5" />
              Bookings
            </button>
            <button
              onClick={() => {
                setActiveMenuItem("funds");
              }}
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${activeMenuItem === "funds" ? "text-foreground" : "text-muted-foreground"}`}
            >
              <Wallet className="h-5 w-5" />
              Funds
            </button>
            <Link
              href="/api/auth/signout"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </form>
      </div>
      <Link href="/home" passHref>
        <Button variant="ghost" size="icon" className="text-muted-foreground size-8 rounded-full shadow-none" aria-label="Go to Home">
          <Home className="h-4 w-4" />
        </Button>
      </Link>
      <NotificationMenu />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            {session?.user?.image ? (
              <Image src={session.user.image} alt="User Avatar" className="h-full w-full rounded-full object-cover" width={40} height={40} />
            ) : (
              <CircleUser className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}