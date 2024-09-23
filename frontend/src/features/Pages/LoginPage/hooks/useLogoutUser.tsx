import { useCallback } from "react";
import { useNotificationContext } from "@/context/hooks/use-notification-context";
import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSelector } from "react-redux";

import { selectIsLoggedIn } from "@/common/store/reducers/user";

import { useLogoutUserMutation } from "@/common/store/api/user";

export const LogoutButton: React.FC = () => {
  const { openNotification } = useNotificationContext();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [logoutUser] = useLogoutUserMutation();

  const handleSuccess = useCallback(() => {
    openNotification("topRight", "success", "Logged out successfully!", true);
  }, [openNotification]);

  const handleError = useCallback(() => {
    openNotification(
      "topRight",
      "error",
      "An error occurred while logging out.",
      false
    );
  }, [openNotification]);

  const fetchBodyLogout = useCallback(async () => {
    logoutUser({
      onSuccess: handleSuccess,
      onError: handleError,
    }).unwrap();
  }, [logoutUser, handleSuccess, handleError]);

  return isLoggedIn ? (
    <Button
      style={{
        padding: "31px",
        borderRadius: "0px",
      }}
      icon={<LogoutOutlined />}
      onClick={fetchBodyLogout}
    >
      Logout
    </Button>
  ) : null;
};
