import { useState } from "react";
import { createPortal } from "react-dom";

import { Bell, Trash2, X } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

const notificationTypeColor = {
  error: "destructive",
  info: "outline",
  success: "default",
  warning: "secondary",
} as const;

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { clearNotifications, markNotificationsAsRead, notifications, unreadNotificationsCount } =
    useNotificationContext();

  const handleOpen = () => {
    setIsOpen(true);
    markNotificationsAsRead();
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const notificationDrawer = isOpen
    ? createPortal(
        <div className="fixed inset-0 z-50 flex justify-end bg-black/35 backdrop-blur-sm">
          <aside className="h-dvh w-full max-w-95 overflow-y-auto border-l border-app-border bg-app-surface p-s shadow-app-m">
            <div className="mb-s flex items-center justify-between gap-xs">
              <div>
                <p className="m-0 text-xs font-bold text-app-brand uppercase">Activity</p>
                <h2 className="m-0 text-xl font-extrabold text-app-text">Notifications</h2>
              </div>
              <div className="flex gap-2">
                <Button
                  aria-label="Clear notifications"
                  disabled={notifications.length === 0}
                  onClick={clearNotifications}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <Trash2 />
                </Button>
                <Button
                  aria-label="Close notifications"
                  onClick={handleClose}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <X />
                </Button>
              </div>
            </div>

            {notifications.length > 0 ? (
              <div className="flex flex-col gap-xs">
                {notifications.map((notificationItem) => (
                  <article
                    className="rounded-m border border-app-border bg-app-surface-muted p-xs"
                    key={notificationItem.id}
                  >
                    <div className="mb-2 flex items-start justify-between gap-xs">
                      <p className="m-0 text-sm font-semibold text-app-text">
                        {notificationItem.message}
                        {notificationItem.count > 1 ? ` x${notificationItem.count}` : ""}
                      </p>
                      <Badge variant={notificationTypeColor[notificationItem.type]}>
                        {notificationItem.type}
                      </Badge>
                    </div>
                    <p className="m-0 text-xs text-app-text-muted">{notificationItem.createdAt}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="grid min-h-60 place-items-center rounded-l border border-dashed border-app-border bg-app-surface-muted p-s text-center text-app-text-muted">
                No notifications yet.
              </div>
            )}
          </aside>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <div className="relative">
        <Button
          aria-label="Open notifications"
          onClick={handleOpen}
          size="icon"
          type="button"
          variant="outline"
        >
          <Bell />
        </Button>
        {unreadNotificationsCount > 0 ? (
          <span className="absolute -top-1 -right-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-app-danger px-1 text-xs font-bold text-app-text-inverse">
            {unreadNotificationsCount}
          </span>
        ) : null}
      </div>

      {notificationDrawer}
    </>
  );
};
