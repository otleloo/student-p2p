"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Comp331 from "@/components/comp-331";
import { useEffect, useState, useCallback } from "react";
import { getUserProfile } from "@/app/actions/getUserProfile";

interface UserProfileData {
  id: string;
  username: string | null;
  registrationNumber: string | null;
  email: string;
  avatar: string | null;
  profileBg: string | null;
  bio: string | null;
  program: {
    courseCode: string;
    courseName: string;
  } | null;
  balance: number;
  spinBalance: number;
  lastSpinDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  role: 'USER' | 'ADMIN';
}

export function ProfileDialog({ open, onOpenChange, isEditing }: { open: boolean; onOpenChange: (open: boolean) => void; isEditing: boolean }) {
  const [userData, setUserData] = useState<UserProfileData | null>(null);

  const fetchUserProfile = useCallback(async () => {
    const result = await getUserProfile();
    if (result?.user) {
      setUserData(result.user);
    }
  }, []);

  useEffect(() => {
    if (open) {
      fetchUserProfile();
    }
  }, [open, fetchUserProfile]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            {isEditing ? "Edit profile" : "Profile"}
          </DialogTitle>
        </DialogHeader>
        {userData && <Comp331 initialData={userData} isEditing={isEditing} refreshProfile={fetchUserProfile} />}
      </DialogContent>
    </Dialog>
  );
}
