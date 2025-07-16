
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Wallet, Download, BookText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BalanceComparisonChart from "@/components/BalanceComparisonChart";

export default function DashboardOverviewPage({
  totalBookings,
  totalFunds,
  createdResources,
  downloads,
  recentDownloads,
  highestBalance,
}: {
  totalBookings: number;
  totalFunds: number;
  createdResources: number;
  downloads: number;
  recentDownloads: { id: string; resourceTitle: string; downloadedAt: Date }[];
  highestBalance: number;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {/* First Row: Four Cards */}
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBookings}</div>
          <p className="text-xs text-muted-foreground">
            Courses booked by you
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Funds</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalFunds} coins</div>
          <p className="text-xs text-muted-foreground">
            Your current balance
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Created Resources</CardTitle>
          <BookText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{createdResources}</div>
          <p className="text-xs text-muted-foreground">
            Resources created by you
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Downloads</CardTitle>
          <Download className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{downloads}</div>
          <p className="text-xs text-muted-foreground">
            Downloads of your resources
          </p>
        </CardContent>
      </Card>

      {/* Second Row: Balance Comparison Chart */}
      <div className="col-span-full lg:col-span-3 row-span-2" x-chunk="dashboard-01-chunk-4">
        <BalanceComparisonChart userBalance={totalFunds} highestBalance={highestBalance} />
      </div>
      <Card className="col-span-full lg:col-span-1 row-span-2" x-chunk="dashboard-01-chunk-5">
        <CardHeader>
          <CardTitle>Recent Downloads</CardTitle>
          <CardDescription>
            Your most recent resource downloads.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recentDownloads.length > 0 ? (
              recentDownloads.map((download) => (
                <li key={download.id} className="flex justify-between items-center text-sm">
                  <span>{download.resourceTitle}</span>
                  <span className="text-muted-foreground">{new Date(download.downloadedAt).toLocaleDateString()}</span>
                </li>
              ))
            ) : (
              <p className="text-muted-foreground">No recent downloads.</p>
            )}
          </ul>
        </CardContent>
      </Card>

      {/* Third Row: Two Cards */}
      <Card className="col-span-full lg:col-span-2" x-chunk="dashboard-01-chunk-6">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Your latest notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for notifications list */}
          <div className="h-[100px] flex items-center justify-center text-muted-foreground">
            Notifications Placeholder
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-full lg:col-span-2" x-chunk="dashboard-01-chunk-7">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Perform common tasks quickly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/" passHref>
              <Button variant="outline" className="w-full">Go to Landing Page</Button>
            </Link>
            <Link href="/home" passHref>
              <Button variant="outline" className="w-full">Explore Courses</Button>
            </Link>
            <Link href="/resources" passHref>
              <Button variant="outline" className="w-full">Browse Resources</Button>
            </Link>
            <Button variant="outline" className="w-full">View Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
