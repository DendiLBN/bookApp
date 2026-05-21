import { useNavigate } from "react-router-dom";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/Button";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { useLogOutUserMutation } from "@/store/api/auth";

export const LogoutButton: React.FC = () => {
  const { openNotification } = useNotificationContext();

  const navigate = useNavigate();

  const [logOutUser] = useLogOutUserMutation();

  const handleSuccess = () => {
    openNotification("topRight", "success", "Logged out successfully!", true);
    navigate("/auth/login");
  };

  const handleError = () => {
    openNotification("topRight", "error", "An error occurred while logging out.", false);
  };

  const handleLogout = async () => {
    try {
      await logOutUser({
        onSuccess: handleSuccess,
        onError: handleError,
      }).unwrap();
    } catch {
      // Mutation callbacks already surface the user-facing error.
    }
  };

  return (
    <Button onClick={handleLogout} type="button" variant="outline">
      <LogOut />
      Logout
    </Button>
  );
};
