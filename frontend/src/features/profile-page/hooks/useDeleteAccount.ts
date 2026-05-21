import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { removeTokens } from "@/common/utils/removeTokens";
import { useDeleteAccountMutation } from "@/store/api/users";
import { logOutUser } from "@/store/reducers/auth";

export const useDeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openNotification } = useNotificationContext();
  const [deleteAccount, { isLoading: isDeletingAccount }] = useDeleteAccountMutation();

  const handleDeleteAccount = async () => {
    const isConfirmed = window.confirm("Delete account? This action cannot be undone.");

    if (!isConfirmed) {
      return;
    }

    try {
      await deleteAccount().unwrap();
      removeTokens();
      dispatch(logOutUser());
      navigate("/auth/login", { replace: true });
    } catch {
      openNotification("topRight", "error", "Could not delete account.", false);
    }
  };

  return {
    isDeletingAccount,
    handleDeleteAccount,
  };
};
