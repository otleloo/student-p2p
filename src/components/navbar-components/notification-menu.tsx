import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getNotifications } from "@/app/actions/getNotifications";
import { markAllNotificationsAsRead } from "@/app/actions/markAllNotificationsAsRead";

interface Notification {
  id: string;
  message: string;
  createdAt: Date;
  read: boolean;
}

export default function NotificationMenu() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    const result = await getNotifications();
    setNotifications(result);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async () => {
    await markAllNotificationsAsRead();
    fetchNotifications();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground size-8 rounded-full shadow-none"
          aria-label="Open notifications"
          onClick={handleMarkAsRead}
        >
          <BellIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id}>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${notification.read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                <div>
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-gray-500">{new Date(notification.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem>No new notifications</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
