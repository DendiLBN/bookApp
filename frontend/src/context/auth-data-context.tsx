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
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

import { TFetchBodyRegister } from "@/types/types";

export type TAuthContextForm = {
  loading: boolean;
  error: string | null;
  user: TFetchBodyRegister | null;
  setError: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<TFetchBodyRegister | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  openNotification: (
    placement: NotificationPlacement,
    type: IconType,
    message: string,
    pauseOnHover: boolean
  ) => void;
};

export const AuthContext = createContext<TAuthContextForm | undefined>(
  undefined
);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<TFetchBodyRegister | null>(null);
  const [api, contextHolder] = notification.useNotification();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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
      isAuthenticated,
      setIsAuthenticated,
      error,
      loading,
      user,
      setLoading,
      setError,
      setUser,

      openNotification,
    }),

    [error, isAuthenticated, loading, openNotification, user]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {contextHolder}
      {children}
    </AuthContext.Provider>
  );
};
