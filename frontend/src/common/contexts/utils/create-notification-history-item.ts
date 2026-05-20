import type {
  TNotificationHistoryItem,
  TNotificationType,
} from "@/common/contexts/notification-context";

type TCreateNotificationHistoryItemParams = {
  message: string;
  type: TNotificationType;
};

export const createNotificationHistoryItem = ({
  message,
  type,
}: TCreateNotificationHistoryItemParams): TNotificationHistoryItem => ({
  id: `${Date.now()}-${message}`,
  message,
  type,
  createdAt: new Date().toLocaleString(),
  read: false,
  count: 1,
});
