"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  link?: string;
}

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      
      if (!data.success && data.error === "Not authenticated") {
        router.push("/login");
        return;
      }
      
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: "POST" });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch("/api/notifications/read-all", { method: "POST" });
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "match_reminder":
        return "🏏";
      case "contest_update":
        return "🎯";
      case "team_lock":
        return "🔒";
      case "result":
        return "🏆";
      case "achievement":
        return "🎖️";
      case "system":
        return "📢";
      default:
        return "🔔";
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22c55e]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-[#22c55e] hover:underline text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Notifications</h1>
              <p className="text-gray-300 mt-1">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[#22c55e] hover:text-[#22c55e] font-medium text-sm"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => {
                  if (!notification.is_read) markAsRead(notification.id);
                  if (notification.link) router.push(notification.link);
                }}
                className={`bg-[#1a2332] rounded-xl shadow-sm border p-4 cursor-pointer transition-all hover:shadow-md ${
                  notification.is_read
                    ? "border-[#22c55e]/20"
                    : "border-green-200 bg-[#22c55e]/10"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${notification.is_read ? "text-gray-300" : "text-white"}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-300">{formatTime(notification.created_at)}</span>
                    </div>
                    <p className={`text-sm mt-1 ${notification.is_read ? "text-gray-300" : "text-gray-300"}`}>
                      {notification.message}
                    </p>
                  </div>
                  {!notification.is_read && (
                    <div className="w-2 h-2 bg-[#22c55e]/100 rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#1a2332] rounded-xl shadow-sm border border-[#22c55e]/20 p-12 text-center">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-xl font-bold text-white mb-2">No Notifications</h3>
            <p className="text-gray-300">You&apos;re all caught up! Check back later for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}
