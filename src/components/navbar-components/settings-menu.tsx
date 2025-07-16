import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SettingsIcon } from "lucide-react";
import { ProfileDialog } from "@/components/ProfileDialog";
import { useState } from "react";

export default function SettingsMenu() {
  const [viewProfileDialogOpen, setViewProfileDialogOpen] = useState(false);
  const [editProfileDialogOpen, setEditProfileDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="text-muted-foreground size-8 rounded-full shadow-none"
            aria-label="Open settings menu"
          >
            <SettingsIcon size={16} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setViewProfileDialogOpen(true)}>Profile</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setEditProfileDialogOpen(true)}>Edit Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProfileDialog open={viewProfileDialogOpen} onOpenChange={setViewProfileDialogOpen} isEditing={false} />
      <ProfileDialog open={editProfileDialogOpen} onOpenChange={setEditProfileDialogOpen} isEditing={true} />
    </>
  );
}
