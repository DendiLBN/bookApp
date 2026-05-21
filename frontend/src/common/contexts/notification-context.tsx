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

import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";

import { createNotificationHistoryItem } from "@/common/contexts/utils/create-notification-history-item";
import { mergeNotificationHistory } from "@/common/contexts/utils/merge-notification-history";

import { NOTIFICATION_VISIBLE_DURATION_MS } from "@/common/consts/notifications";

export type TNotificationType = "error" | "info" | "success" | "warning";
export type TNotificationPlacement =
  | "bottom"
  | "bottomLeft"
  | "bottomRight"
  | "top"
  | "topLeft"
  | "topRight";

export type TNotificationHistoryItem = {
  id: string;
  message: string;
  type: TNotificationType;
  createdAt: string;
  read: boolean;
  count: number;
};

type TActiveNotification = {
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

const notificationIcon = {
  error: XCircle,
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
} satisfies Record<TNotificationType, typeof Info>;

const notificationStyles = {
  error: "border-app-danger/40 bg-app-danger/10 text-app-danger",
  info: "border-app-brand/40 bg-app-brand-soft text-app-brand",
  success: "border-app-brand/40 bg-app-brand-soft text-app-brand",
  warning: "border-app-warning/40 bg-app-warning/10 text-app-warning",
} satisfies Record<TNotificationType, string>;

const notificationPlacementClassName = {
  bottom: "bottom-s left-1/2 -translate-x-1/2",
  bottomLeft: "bottom-s left-s",
  bottomRight: "right-s bottom-s",
  top: "top-s left-1/2 -translate-x-1/2",
  topLeft: "top-s left-s",
  topRight: "top-s right-s",
} satisfies Record<TNotificationPlacement, string>;

export const NotificationContext = createContext<TNotificationContext | undefined>(undefined);

export const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeNotification, setActiveNotification] = useState<TActiveNotification | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<TNotificationHistoryItem[]>([]);

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
      setActiveNotification({ message, placement, type });

      setTimeout(() => {
        setActiveNotification(null);
        setIsNotificationOpen(false);
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

  return (
    <NotificationContext.Provider value={memoizedValue}>
      {children}
      {activeNotification ? (
        <NotificationToast
          message={activeNotification.message}
          placement={activeNotification.placement}
          type={activeNotification.type}
        />
      ) : null}
    </NotificationContext.Provider>
  );
};

const NotificationToast = ({ message, placement, type }: TActiveNotification) => {
  const Icon = notificationIcon[type];

  return (
    <div
      className={`fixed z-[60] flex max-w-120 items-start gap-xs rounded-l border px-s py-xs shadow-app-m backdrop-blur ${notificationPlacementClassName[placement]} ${notificationStyles[type]}`}
      role="status"
    >
      <Icon className="mt-0.5 size-5 shrink-0" />
      <p className="m-0 text-sm font-semibold">{message}</p>
    </div>
  );
};
