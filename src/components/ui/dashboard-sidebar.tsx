"use client";

import Link from "next/link";
import { Home, BookOpen, Wallet, Bell, User, LogOut } from "lucide-react";

export default function DashboardSidebar({ setActiveMenuItem, activeMenuItem }) {
  return (
    <div className="hidden border-r bg-muted/70 backdrop-blur-lg md:block sticky top-0 h-screen">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 sticky top-0 bg-muted/70 backdrop-blur-lg">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span>User Dashboard</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <button
              onClick={() => setActiveMenuItem("dashboard")}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${activeMenuItem === "dashboard" ? "text-primary bg-muted" : "text-muted-foreground"}`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveMenuItem("profile")}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${activeMenuItem === "profile" ? "text-primary bg-muted" : "text-muted-foreground"}`}
            >
              <User className="h-4 w-4" />
              Profile
            </button>
            <button
              onClick={() => setActiveMenuItem("bookings")}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${activeMenuItem === "bookings" ? "text-primary bg-muted" : "text-muted-foreground"}`}
            >
              <BookOpen className="h-4 w-4" />
              Bookings
            </button>
            <button
              onClick={() => setActiveMenuItem("funds")}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${activeMenuItem === "funds" ? "text-primary bg-muted" : "text-muted-foreground"}`}
            >
              <Wallet className="h-4 w-4" />
              Funds
            </button>
            <button
              onClick={() => setActiveMenuItem("notifications")}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${activeMenuItem === "notifications" ? "text-primary bg-muted" : "text-muted-foreground"}`}
            >
              <Bell className="h-4 w-4" />
              Notifications
            </button>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}