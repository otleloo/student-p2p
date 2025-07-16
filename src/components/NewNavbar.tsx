"use client"

import { LayoutGridIcon, PlusIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import Comp333 from "@/components/comp-333";
import { useSession, signOut } from "next-auth/react";

import InfoMenu from "@/components/navbar-components/info-menu"
import NotificationMenu from "@/components/navbar-components/notification-menu"
import SettingsMenu from "@/components/navbar-components/settings-menu"
import { Button } from "@/components/ui/button"

export function NewNavbar({ setResourceDialogOpen, setCourseDialogOpen }: { setResourceDialogOpen: (open: boolean) => void; setCourseDialogOpen: (open: boolean) => void }) {
  const { data: session, status } = useSession();

  return (
    <TooltipProvider>
      <header className="border-b px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left side */}
          <div className="relative flex-1">
            <Comp333 />
          </div>
          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Layout button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground size-8 rounded-full shadow-none flex items-center justify-center"
                  aria-label="Open dashboard"
                >
                  <LayoutGridIcon size={16} aria-hidden="true" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Dashboard</TooltipContent>
            </Tooltip>
            {/* Info menu */}
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoMenu />
              </TooltipTrigger>
              <TooltipContent>Info</TooltipContent>
            </Tooltip>
            {/* Notification */}
            <Tooltip>
              <TooltipTrigger asChild>
                <NotificationMenu />
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
            {/* Settings */}
            <Tooltip>
              <TooltipTrigger asChild>
                <SettingsMenu />
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
            {/* Add button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="size-8 rounded-full"
                  size="icon"
                  aria-label="Add new item"
                >
                  <PlusIcon size={16} aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setResourceDialogOpen(true)}>
                  Add Resource
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setCourseDialogOpen(true)}>
                  Create Course
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/resources">View Resources</Link>
                </DropdownMenuItem>
                {session?.user?.role === "ADMIN" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            {status !== "loading" && !session && (
              <Button asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            )}
            {status !== "loading" && session && (
              <Button onClick={() => signOut()}>
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </header>
    </TooltipProvider>
  )
}