import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/app/actions/getUserProfile";
import { ProfileDialog } from "@/components/ProfileDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from "@/app/actions/changePassword";
import { toast } from "sonner";

interface UserProfile {
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
  totalWinnings?: number; // Optional, as it's calculated in the component
  totalLosses?: number; // Optional, as it's calculated in the component
  spinBalance: number;
}

export default function ProfileContent() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const fetchProfile = async () => {
    setLoading(true);
    const result = await getUserProfile();
    if (result?.user) {
      setUserProfile(result.user);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }
    const result = await changePassword(oldPassword, newPassword);
    if (result?.success) {
      toast.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      toast.error(result?.error || "Failed to change password");
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!userProfile) {
    return <div>Failed to load profile.</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* User Details Card */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
          <CardDescription>Your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          <p><strong>Username:</strong> {userProfile.username}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
          <p><strong>Registration Number:</strong> {userProfile.registrationNumber || 'N/A'}</p>
          <p><strong>Bio:</strong> {userProfile.bio || 'N/A'}</p>
          <Button onClick={() => setIsProfileDialogOpen(true)} className="mt-4">Edit Profile</Button>
        </CardContent>
      </Card>

      {/* Program Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Program Information</CardTitle>
          <CardDescription>Your academic program details.</CardDescription>
        </CardHeader>
        <CardContent>
          <p><strong>Program Name:</strong> {userProfile.program?.courseName || 'N/A'}</p>
          <p><strong>Course Code:</strong> {userProfile.program?.courseCode || 'N/A'}</p>
        </CardContent>
      </Card>

      {/* Gamification Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle>Gamification Stats</CardTitle>
          <CardDescription>Your in-game progress.</CardDescription>
        </CardHeader>
        <CardContent>
          <p><strong>Balance:</strong> {userProfile.balance} coins</p>
          <p><strong>Spins Left:</strong> {userProfile.spinBalance}</p>
          <p><strong>Total Winnings:</strong> {userProfile.totalWinnings || 0} coins</p>
          <p><strong>Total Losses:</strong> {userProfile.totalLosses || 0} coins</p>
        </CardContent>
      </Card>

      {/* Security Card */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Change your password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="old-password">Old Password</Label>
            <Input id="old-password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="confirm-new-password">Confirm New Password</Label>
            <Input id="confirm-new-password" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
          </div>
          <Button onClick={handleChangePassword}>Change Password</Button>
        </CardContent>
      </Card>

      <ProfileDialog
        open={isProfileDialogOpen}
        onOpenChange={setIsProfileDialogOpen}
        isEditing={true}
      />
    </div>
  );
}