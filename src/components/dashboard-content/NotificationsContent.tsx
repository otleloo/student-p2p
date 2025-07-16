import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotificationsContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>My Notifications</CardTitle>
          <CardDescription>View your recent notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>No new notifications.</p>
        </CardContent>
      </Card>
    </div>
  );
}