import { useContext } from "react";

import { NotificationContext, TNotificationContext } from "@/common/contexts/notification-context";

export const useNotificationContext = (): TNotificationContext => {
  const ctx = useContext(NotificationContext);
  if (ctx === undefined) {
    throw new Error("useNotificationContext must be used within an NotificationContextProvider");
  }

  return ctx;
};
