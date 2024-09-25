import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { selectIsLoggedIn } from "@/store/reducers/user";
import { useLogoutUserMutation } from "@/store/api/user/index";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

export const LogoutButton: React.FC = () => {
  const { openNotification } = useNotificationContext();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  const [logoutUser] = useLogoutUserMutation();

  const handleSuccess = useCallback(() => {
    openNotification("topRight", "success", "Logged out successfully!", true);

    navigate("/auth/login");
  }, [navigate, openNotification]);

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
