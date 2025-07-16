"use client";

import { useState } from "react";
import DashboardHeader from "@/components/ui/dashboard-header";
import { AdminSidebar } from "@/components/mvpblocks/ui/admin-sidebar";

export default function AdminDashboardContentManager() {
  const [activeMenuItem, setActiveMenuItem] = useState("overview");

  const renderContent = () => {
    switch (activeMenuItem) {
      case "overview":
        return <div>Admin Overview Content</div>; // Placeholder
      case "users":
        return <div>User Management Content</div>; // Placeholder
      case "courses":
        return <div>Course Management Content</div>; // Placeholder
      case "settings":
        return <div>Admin Settings Content</div>; // Placeholder
      default:
        return <div>Admin Overview Content</div>; // Default
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40 group/sidebar-wrapper">
      <AdminSidebar setActiveMenuItem={setActiveMenuItem} activeMenuItem={activeMenuItem} className="peer" />
      <div className="flex flex-1 flex-col sm:gap-4 sm:py-4 md:pl-[var(--sidebar-width)] peer-[[data-collapsible=icon]]/sidebar-wrapper:md:pl-[var(--sidebar-width-icon)] transition-[padding-left] duration-200 ease-linear">
        <DashboardHeader setActiveMenuItem={setActiveMenuItem} activeMenuItem={activeMenuItem} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
