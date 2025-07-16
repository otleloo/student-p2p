"use client";

import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/ui/dashboard-sidebar";
import DashboardHeader from "@/components/ui/dashboard-header";
import DashboardOverview from "@/components/dashboard-content/DashboardOverview";
import ProfileContent from "@/components/dashboard-content/ProfileContent";
import BookingsContent from "@/components/dashboard-content/BookingsContent";
import FundsContent from "@/components/dashboard-content/FundsContent";
import NotificationsContent from "@/components/dashboard-content/NotificationsContent";
import { getDashboardData } from "@/app/actions/getDashboardData";
import { useRouter, useSearchParams } from "next/navigation";

interface DashboardData {
  totalBookings: number;
  totalFunds: number;
  createdResources: number;
  downloads: number;
  recentDownloads: { id: string; resourceTitle: string; downloadedAt: Date }[];
  highestBalance: number;
  spinBalance: number;
  todaysWinnings: number;
  totalWinnings: number;
  totalLosses: number;
}

export default function DashboardContentManager() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "dashboard";
  const [activeMenuItem, setActiveMenuItemState] = useState(initialTab);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalBookings: 0,
    totalFunds: 0,
    createdResources: 0,
    downloads: 0,
    recentDownloads: [],
    highestBalance: 0,
    spinBalance: 0,
    todaysWinnings: 0,
    totalWinnings: 0,
    totalLosses: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getDashboardData();
      setDashboardData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setActiveMenuItemState(initialTab);
  }, [initialTab]);

  const setActiveMenuItem = (item: string) => {
    setActiveMenuItemState(item);
    router.push(`/dashboard?tab=${item}`);
  };

  const renderContent = () => {
    if (loading) {
      return <p>Loading dashboard data...</p>;
    }

    switch (activeMenuItem) {
      case "dashboard":
        return <DashboardOverview {...dashboardData} />;
      case "profile":
        return <ProfileContent />;
      case "bookings":
        return <BookingsContent />;
      case "funds":
        return <FundsContent />;
      case "notifications":
        return <NotificationsContent />;
      default:
        return <DashboardOverview {...dashboardData} />;
    }
  };

  return (
    <>
      <DashboardSidebar setActiveMenuItem={setActiveMenuItem} activeMenuItem={activeMenuItem} />
      <div className="flex flex-col sticky top-0">
        <DashboardHeader setActiveMenuItem={setActiveMenuItem} activeMenuItem={activeMenuItem} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </>
  );
}
