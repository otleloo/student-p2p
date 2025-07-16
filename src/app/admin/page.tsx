"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AdminDashboardContentManager from "@/components/AdminDashboardContentManager";

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; 
    if (status !== "authenticated" || session.user.role !== "ADMIN") {
      router.push("/auth/signin"); 
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; 
  }

  if (status !== "authenticated" || session.user.role !== "ADMIN") {
    return <div>Access Denied. Redirecting...</div>; 
  }

  return (
    <AdminDashboardContentManager />
  );
}
