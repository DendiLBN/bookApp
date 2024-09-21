import { notification } from "antd";
import {
  IconType,
  NotificationPlacement,
} from "antd/es/notification/interface";
import {
  useState,
  createContext,
  FC,
  ReactNode,
  useMemo,
  useCallback,
} from "react";

export type TNotificationContext = {
  openNotification: (
    placement: NotificationPlacement,
    type: IconType,
    message: string,
    pauseOnHover: boolean
  ) => void;
};

export const AntdNotificationContext = createContext<
  TNotificationContext | undefined
>(undefined);

export const AntdNotificationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const openNotification = useCallback(
    (
      placement: NotificationPlacement,
      type: IconType,
      message: string,
      pauseOnHover: boolean
    ) => {
      if (isNotificationOpen) {
        return;
      }
      setIsNotificationOpen(true);

      api.open({
        type,
        message,
        placement,
        showProgress: true,
        pauseOnHover,
        onClick: () => {
          setIsNotificationOpen(false);
        },
        onClose: () => {
          setIsNotificationOpen(false);
        },
      });

      setTimeout(() => {
        setIsNotificationOpen(false);
      }, 3000);
    },
    [isNotificationOpen, api]
  );

  const memoizedValue = useMemo(
    () => ({
      openNotification,
    }),
    [openNotification]
  );

  return (
    <AntdNotificationContext.Provider value={memoizedValue}>
      {contextHolder}
      {children}
    </AntdNotificationContext.Provider>
  );
};
