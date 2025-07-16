"use client"

import { useId, useState } from "react"
import Image from "next/image";
import { CheckIcon, ImagePlusIcon, XIcon } from "lucide-react"
import { useCharacterLimit } from "@/hooks/use-character-limit"
import { useFileUpload } from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateProfile } from "@/app/actions/updateProfile";
import { toast } from "sonner";

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

export default function Component({ initialData, isEditing, refreshProfile }: { initialData: UserProfileData; isEditing: boolean; refreshProfile: () => void }) {
  const id = useId()
  const [avatarFile, setAvatarFile] = useState<File | null | undefined>(undefined);
  const [profileBgFile, setProfileBgFile] = useState<File | null | undefined>(undefined);

  const maxLength = 180
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({
    maxLength,
    initialValue: initialData?.bio || "",
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    console.log("Client - avatarFile before append:", avatarFile);
    console.log("Client - profileBgFile before append:", profileBgFile);

    if (avatarFile instanceof File) {
      formData.append("avatar", avatarFile);
    } else if (avatarFile === null) {
      formData.append("avatar", "REMOVE_IMAGE");
    } else if (initialData?.avatar) { // If no new file and not removed, send current URL
      formData.append("avatar", initialData.avatar.startsWith("/") && !initialData.avatar.startsWith("/uploads/") ? `/uploads${initialData.avatar}` : initialData.avatar);
    }

    if (profileBgFile instanceof File) {
      formData.append("profileBg", profileBgFile);
    } else if (profileBgFile === null) {
      formData.append("profileBg", "REMOVE_IMAGE");
    } else if (initialData?.profileBg) { // If no new file and not removed, send current URL
      formData.append("profileBg", initialData.profileBg.startsWith("/") && !initialData.profileBg.startsWith("/uploads/") ? `/uploads${initialData.profileBg}` : initialData.profileBg);
    }

    console.log("Client - FormData before submit:", formData);
    for (const pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }

    const result = await updateProfile(formData);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Profile updated successfully!");
      refreshProfile();
    }
  };

  return (
    <>
      
      <div className="overflow-y-auto">
        <ProfileBg setProfileBgFile={setProfileBgFile} initialProfileBg={initialData?.profileBg} isEditing={isEditing} />
        <Avatar setAvatarFile={setAvatarFile} initialAvatar={initialData?.avatar} isEditing={isEditing} />
        <div className="px-6 pt-4 pb-6">
          {isEditing ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-username`}>Username</Label>
                <div className="relative">
                  <Input
                    id={`${id}-username`}
                    name="username"
                    className="peer pe-9"
                    placeholder="Username"
                    defaultValue={initialData?.username || ""}
                    type="text"
                    readOnly={!isEditing}
                  />
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                    <CheckIcon
                      size={16}
                      className="text-emerald-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-course`}>Course Code</Label>
                <div className="relative">
                  <Input
                    id={`${id}-course`}
                    name="courseCode"
                    className="peer pe-9"
                    placeholder="e.g., CS101"
                    defaultValue={initialData?.program?.courseCode || ""}
                    type="text"
                    readOnly={!isEditing}
                  />
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                    <CheckIcon
                      size={16}
                      className="text-emerald-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-bio`}>Biography</Label>
                <Textarea
                  id={`${id}-bio`}
                  name="bio"
                  placeholder="Write a few sentences about yourself"
                  defaultValue={initialData?.bio || value}
                  maxLength={maxLength}
                  onChange={handleChange}
                  aria-describedby={`${id}-description`}
                  readOnly={!isEditing}
                />
                <p
                  id={`${id}-description`}
                  className="text-muted-foreground mt-2 text-right text-xs"
                  role="status"
                  aria-live="polite"
                >
                  <span className="tabular-nums">{limit - characterCount}</span>{" "}
                  characters left
                </p>
              </div>
              {isEditing && (
              <DialogFooter className="border-t px-6 py-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            )}
            </form>
          ) : (
            <div className="space-y-4">
              <div className="*:not-first:mt-2">
                <Label>Username</Label>
                <p className="text-lg font-medium">{initialData?.username || "N/A"}</p>
              </div>
              <div className="*:not-first:mt-2">
                <Label>Course Code</Label>
                <p className="text-lg font-medium">{initialData?.program?.courseCode || "N/A"}</p>
              </div>
              <div className="*:not-first:mt-2">
                <Label>Biography</Label>
                <p className="text-lg font-medium">{initialData?.bio || "N/A"}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function ProfileBg({ setProfileBgFile, initialProfileBg, isEditing }: { setProfileBgFile: (file: File | null) => void; initialProfileBg?: string; isEditing: boolean }) {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
      initialFiles: initialProfileBg ? [{ url: initialProfileBg, name: "profile-bg.jpg", size: 0, type: "image/jpeg", id: "initial-bg" }] : [],
      onFilesChange: (newFiles) => {
        if (newFiles.length > 0) {
          setProfileBgFile(newFiles[0].file as File);
        } else {
          setProfileBgFile(null);
        }
      },
      onFileRemove: () => setProfileBgFile(null),
    })

  const currentImage = files[0]?.preview || initialProfileBg || null
  console.log("ProfileBg - files:", files);
  console.log("ProfileBg - currentImage:", currentImage);

  return (
    <div className="h-32">
      <div className="bg-muted relative flex size-full items-center justify-center overflow-hidden">
        {currentImage && (
          <Image
            className="size-full object-cover"
            src={currentImage}
            alt={
              files[0]?.preview
                ? "Preview of uploaded image"
                : "Default profile background"
            }
            width={512}
            height={96}
          />
        )}
        {isEditing && (
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={openFileDialog}
              aria-label={currentImage ? "Change image" : "Upload image"}
            >
              <ImagePlusIcon size={16} aria-hidden="true" />
            </button>
            {currentImage && (
              <button
                type="button"
                className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                onClick={() => removeFile(files[0]?.id)}
                aria-label="Remove image"
              >
                <XIcon size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>
      {isEditing && (
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
        />
      )}
    </div>
  )
}

function Avatar({ setAvatarFile, initialAvatar, isEditing }: { setAvatarFile: (file: File | null) => void; initialAvatar?: string; isEditing: boolean }) {
  const [{ files }, { openFileDialog, getInputProps }] = useFileUpload({
    accept: "image/*",
    initialFiles: initialAvatar ? [{ url: initialAvatar, name: "avatar.jpg", size: 0, type: "image/jpeg", id: "initial-avatar" }] : [],
    onFilesChange: (newFiles) => {
      if (newFiles.length > 0) {
        setAvatarFile(newFiles[0].file as File);
      } else {
        setAvatarFile(null);
      }
    },
    onFileRemove: () => setAvatarFile(null),
  })

  const currentImage = files[0]?.preview || initialAvatar || null
  console.log("Avatar - files:", files);
  console.log("Avatar - currentImage:", currentImage);

  return (
    <div className="-mt-10 px-6">
      <div className="border-background bg-muted relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 shadow-xs shadow-black/10">
        {currentImage && (
          <Image
            src={currentImage}
            className="size-full object-cover"
            width={80}
            height={80}
            alt="Profile image"
          />
        )}
        {isEditing && (
          <button
            type="button"
            className="focus-visible:border-ring focus-visible:ring-ring/50 absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
            onClick={openFileDialog}
            aria-label="Change profile picture"
          >
            <ImagePlusIcon size={16} aria-hidden="true" />
          </button>
        )}
        {isEditing && (
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload profile picture"
          />
        )}
      </div>
    </div>
  )
}
