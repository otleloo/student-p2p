
import DashboardContentManager from "@/components/DashboardContentManager";

export default function DashboardLayout() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardContentManager />
    </div>
  );
}
