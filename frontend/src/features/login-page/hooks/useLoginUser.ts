import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import type { TLoginUserRequestBody } from "@/features/auth/types";
import { useLoginUserMutation } from "@/store/api/auth";

export const useLoginUser = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const { openNotification } = useNotificationContext();

  const handleSuccess = () => {
    openNotification("top", "success", "You are logged in successfully.", true);
  };

  const handleError = () => {
    openNotification("top", "error", "Could not log in. Check your email and password.", false);
  };

  const submitLogin = ({ email, password }: TLoginUserRequestBody) => {
    loginUser({
      data: { email, password },
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return { submitLogin, loading: isLoading };
};
