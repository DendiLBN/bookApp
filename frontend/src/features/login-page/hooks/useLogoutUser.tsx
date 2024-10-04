import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useLogOutUserMutation } from "@/store/api/auth";
import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

export const LogoutButton: React.FC = () => {
  const { openNotification } = useNotificationContext();

  const navigate = useNavigate();

  const [logOutUser] = useLogOutUserMutation();

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

  useEffect(() => {
    console.log("component mounted");

    return () => {
      console.log("component unmounted");
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logOutUser({
        onSuccess: handleSuccess,
        onError: handleError,
      }).unwrap();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Button
      style={{ padding: "31px", borderRadius: "0px" }}
      icon={<LogoutOutlined />}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};
