import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

import { AlertCircle, CheckCircle2, Info, X, XCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

import { createNotificationHistoryItem } from "@/common/contexts/utils/create-notification-history-item";
import { mergeNotificationHistory } from "@/common/contexts/utils/merge-notification-history";

import { NOTIFICATION_VISIBLE_DURATION_MS } from "@/common/consts/notifications";

export type TNotificationPlacement =
  | "bottom"
  | "bottomLeft"
  | "bottomRight"
  | "top"
  | "topLeft"
  | "topRight";
export type TNotificationType = "error" | "info" | "success" | "warning";

export type TNotificationHistoryItem = {
  id: string;
  message: string;
  type: TNotificationType;
  createdAt: string;
  read: boolean;
  count: number;
};

type TVisibleToast = {
  id: string;
  message: string;
  placement: TNotificationPlacement;
  type: TNotificationType;
};

export type TNotificationContext = {
  loading: boolean;
  error: string | null;
  notifications: TNotificationHistoryItem[];
  unreadNotificationsCount: number;
  clearNotifications: () => void;
  markNotificationsAsRead: () => void;
  setError: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  openNotification: (
    placement: TNotificationPlacement,
    type: TNotificationType,
    message: string,
    pauseOnHover: boolean,
  ) => void;
};

export const NotificationContext = createContext<TNotificationContext | undefined>(undefined);

const toastIcons = {
  error: XCircle,
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
} as const;

const toastClassNames = {
  error: "border-app-danger text-app-danger",
  info: "border-app-accent text-app-accent",
  success: "border-app-brand text-app-brand",
  warning: "border-app-warning text-app-warning",
} as const;

const getToastPositionClassName = (placement: TNotificationPlacement) => {
  if (placement.includes("bottom")) {
    return placement.includes("Left") ? "bottom-s left-s" : "right-s bottom-s";
  }

  return placement.includes("Left") ? "top-s left-s" : "top-s right-s";
};

export const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<TNotificationHistoryItem[]>([]);
  const [visibleToast, setVisibleToast] = useState<TVisibleToast | null>(null);

  const markNotificationsAsRead = useCallback(() => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((currentNotification) => ({
        ...currentNotification,
        read: true,
      })),
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const openNotification = useCallback(
    (placement: TNotificationPlacement, type: TNotificationType, message: string) => {
      const notificationHistoryItem = createNotificationHistoryItem({ message, type });

      setNotifications((currentNotifications) =>
        mergeNotificationHistory({
          currentNotifications,
          notificationHistoryItem,
        }),
      );

      if (isNotificationOpen) {
        return;
      }
      setIsNotificationOpen(true);
      setVisibleToast({
        id: notificationHistoryItem.id,
        message,
        placement,
        type,
      });

      setTimeout(() => {
        setIsNotificationOpen(false);
        setVisibleToast(null);
      }, NOTIFICATION_VISIBLE_DURATION_MS);
    },
    [isNotificationOpen],
  );

  const memoizedValue = useMemo(
    () => ({
      clearNotifications,
      error,
      loading,
      markNotificationsAsRead,
      notifications,
      openNotification,
      unreadNotificationsCount: notifications.filter(
        (currentNotification) => !currentNotification.read,
      ).length,
      setLoading,
      setError,
    }),
    [
      clearNotifications,
      error,
      loading,
      markNotificationsAsRead,
      notifications,
      openNotification,
      setLoading,
    ],
  );

  const ToastIcon = visibleToast ? toastIcons[visibleToast.type] : null;

  return (
    <NotificationContext.Provider value={memoizedValue}>
      {children}
      {visibleToast && ToastIcon ? (
        <Card
          aria-live="polite"
          className={`fixed z-50 flex w-[min(360px,calc(100vw-2rem))] items-start gap-xs p-s shadow-app-m ${getToastPositionClassName(
            visibleToast.placement,
          )} ${toastClassNames[visibleToast.type]}`}
          role="status"
        >
          <ToastIcon className="mt-0.5 size-5 shrink-0" />
          <p className="m-0 flex-1 text-sm font-semibold text-app-text">{visibleToast.message}</p>
          <Button
            aria-label="Close notification"
            onClick={() => {
              setIsNotificationOpen(false);
              setVisibleToast(null);
            }}
            size="icon"
            type="button"
            variant="ghost"
          >
            <X />
          </Button>
        </Card>
      ) : null}
    </NotificationContext.Provider>
  );
};
